// Central attribution + funnel event tracking.
// Captures where a visitor came from (Instagram/Meta ads, Google, direct, etc.)
// once on first touch, then stamps every GA4 + Meta Pixel event with it so
// Ads Manager / GA4 can be sliced by source, not just aggregate counts.

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    dataLayer?: unknown[];
  }
}

export interface Attribution {
  source: string;        // instagram, facebook, google, direct, referral...
  medium: string;        // paid_social, organic, cpc, referral, none
  campaign: string | null;
  content: string | null;
  term: string | null;
  fbclid: string | null;
  gclid: string | null;
  referrer: string;
  landingPage: string;
  firstSeen: string;     // ISO timestamp
}

const FIRST_TOUCH_KEY = 'anvaya_attribution_first';
const LAST_TOUCH_KEY = 'anvaya_attribution_last';

function detectSourceFromReferrer(referrer: string): { source: string; medium: string } {
  if (!referrer) return { source: 'direct', medium: 'none' };
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '');
    if (host.includes('instagram.com')) return { source: 'instagram', medium: 'organic_social' };
    if (host.includes('facebook.com') || host.includes('fb.com')) return { source: 'facebook', medium: 'organic_social' };
    if (host.includes('l.instagram.com')) return { source: 'instagram', medium: 'organic_social' };
    if (host.includes('google.')) return { source: 'google', medium: 'organic' };
    if (host.includes('youtube.com')) return { source: 'youtube', medium: 'organic_social' };
    if (host.includes('whatsapp.com')) return { source: 'whatsapp', medium: 'referral' };
    return { source: host, medium: 'referral' };
  } catch {
    return { source: 'direct', medium: 'none' };
  }
}

function buildAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || '';
  const fbclid = params.get('fbclid');
  const gclid = params.get('gclid');

  let source = params.get('utm_source');
  let medium = params.get('utm_medium');

  if (!source) {
    // No explicit UTM — infer from click IDs and referrer.
    if (fbclid) {
      source = 'instagram_or_facebook';
      medium = 'paid_social';
    } else if (gclid) {
      source = 'google';
      medium = 'cpc';
    } else {
      const guess = detectSourceFromReferrer(referrer);
      source = guess.source;
      medium = medium || guess.medium;
    }
  }

  return {
    source: source || 'direct',
    medium: medium || 'none',
    campaign: params.get('utm_campaign'),
    content: params.get('utm_content'),
    term: params.get('utm_term'),
    fbclid,
    gclid,
    referrer,
    landingPage: window.location.pathname,
    firstSeen: new Date().toISOString(),
  };
}

function hasRealSignal(a: Attribution): boolean {
  return a.source !== 'direct' || !!a.campaign || !!a.fbclid || !!a.gclid;
}

/** Call once on app load (client only). Idempotent. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  const current = buildAttribution();

  // Last-touch: overwrite every session so "what brought them back today" is fresh.
  try { sessionStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(current)); } catch {}

  // First-touch: set once, and only upgrade a blank "direct" first-touch if this
  // visit actually carries real UTM/click-id signal (e.g. first visit was direct,
  // came back later from an Instagram ad before ever converting).
  try {
    const existingRaw = localStorage.getItem(FIRST_TOUCH_KEY);
    const existing = existingRaw ? (JSON.parse(existingRaw) as Attribution) : null;
    if (!existing || (!hasRealSignal(existing) && hasRealSignal(current))) {
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current));
    }
  } catch {}
}

export function getAttribution(): { first: Attribution | null; last: Attribution | null } {
  if (typeof window === 'undefined') return { first: null, last: null };
  try {
    const first = localStorage.getItem(FIRST_TOUCH_KEY);
    const last = sessionStorage.getItem(LAST_TOUCH_KEY);
    return {
      first: first ? JSON.parse(first) : null,
      last: last ? JSON.parse(last) : null,
    };
  } catch {
    return { first: null, last: null };
  }
}

/** Flat params merged into every event so GA4/Meta reports can break out by source. */
function attributionParams(): Record<string, string> {
  const { first, last } = getAttribution();
  const a = last || first;
  if (!a) return {};
  return {
    traffic_source: a.source,
    traffic_medium: a.medium,
    traffic_campaign: a.campaign || '(none)',
    first_touch_source: first?.source || a.source,
    landing_page: a.landingPage,
  };
}

interface EventOptions {
  productId?: string;
  productName?: string;
  value?: number;
  currency?: string;
  extra?: Record<string, unknown>;
}

/**
 * Fires a funnel event to GA4 + Meta Pixel with attribution stamped on.
 * `metaEvent` should be a Meta standard event name (ViewContent, AddToCart,
 * InitiateCheckout, Lead, Purchase) when one applies, or null for a custom-only event.
 */
export function trackEvent(gaEventName: string, metaEvent: string | null, opts: EventOptions = {}): void {
  if (typeof window === 'undefined') return;
  const attrs = attributionParams();
  const { productId, productName, value, currency = 'INR', extra } = opts;

  window.gtag?.('event', gaEventName, {
    ...attrs,
    ...(productId ? { item_id: productId } : {}),
    ...(productName ? { item_name: productName } : {}),
    ...(value !== undefined ? { value, currency } : {}),
    ...extra,
  });

  if (window.fbq && metaEvent) {
    const fbPayload: Record<string, unknown> = { ...attrs, ...extra };
    if (productId) fbPayload.content_ids = [productId];
    if (productName) fbPayload.content_name = productName;
    if (value !== undefined) { fbPayload.value = value; fbPayload.currency = currency; }
    fbPayload.content_type = 'product';
    window.fbq('track', metaEvent, fbPayload);
  } else if (window.fbq) {
    window.fbq('trackCustom', gaEventName, attrs);
  }
}

export const trackViewContent = (opts: EventOptions) => trackEvent('view_item', 'ViewContent', opts);
export const trackAddToCart = (opts: EventOptions) => trackEvent('add_to_cart', 'AddToCart', opts);
export const trackInitiateCheckout = (opts: EventOptions) => trackEvent('begin_checkout', 'InitiateCheckout', opts);
export const trackLead = (opts: EventOptions = {}) => trackEvent('generate_lead', 'Lead', opts);
export const trackCtaClick = (label: string, extra?: Record<string, unknown>) =>
  trackEvent('cta_click', null, { extra: { label, ...extra } });
export const trackSectionView = (section: string) =>
  trackEvent('section_view', null, { extra: { section } });
export const trackScrollDepth = (percent: number) =>
  trackEvent('scroll_depth', null, { extra: { percent } });

/** Appends current attribution as UTM params onto the Shopify cart/checkout URL
 *  so Shopify's own order attribution matches what GA4/Meta recorded. */
export function withAttribution(url: string): string {
  if (typeof window === 'undefined') return url;
  const { first, last } = getAttribution();
  const a = last || first;
  if (!a) return url;
  const u = new URL(url);
  u.searchParams.set('utm_source', a.source);
  u.searchParams.set('utm_medium', a.medium);
  if (a.campaign) u.searchParams.set('utm_campaign', a.campaign);
  return u.toString();
}
