// Shopify Admin → Settings → Customer events → Add custom pixel → paste this file.
// Sends every storefront + checkout step (including anonymous drop-offs and checkout error alerts)
// to the track-checkout Supabase edge function.

const ENDPOINT = 'https://wsipzsldxxvlvlgrmtly.supabase.co/functions/v1/track-checkout?k=anvaya-funnel-v1';
const UTM_KEY = 'anvaya_utm';
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

async function getUtm(event) {
  const search = event.context?.document?.location?.search || '';
  const params = new URLSearchParams(search);
  const fresh = {};
  UTM_FIELDS.forEach(f => { if (params.get(f)) fresh[f] = params.get(f); });
  if (Object.keys(fresh).length) {
    try { await browser.localStorage.setItem(UTM_KEY, JSON.stringify(fresh)); } catch (_) {}
    return fresh;
  }
  try { return JSON.parse((await browser.localStorage.getItem(UTM_KEY)) || '{}'); } catch (_) { return {}; }
}

async function send(event) {
  const payload = {
    id: event.id,
    name: event.name,
    timestamp: event.timestamp,
    clientId: event.clientId,
    data: event.data,
    context: { document: { location: { href: event.context?.document?.location?.href } } },
    utm: await getUtm(event),
  };
  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (_) {}
}

[
  'page_viewed',
  'product_viewed',
  'product_added_to_cart',
  'cart_viewed',
  'checkout_started',
  'checkout_contact_info_submitted',
  'checkout_address_info_submitted',
  'checkout_shipping_info_submitted',
  'payment_info_submitted',
  'checkout_completed',
  'alert_displayed',
  'ui_extension_errored',
].forEach(name => analytics.subscribe(name, send));
