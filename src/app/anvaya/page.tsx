import { getProductsByHandles } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import { AnvayaProductPage } from './AnvayaProductPage';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

// Static product config — marketing copy, colors, features (lives on website)
// Prices + variants + availability come live from Shopify; fallbackVariants used when Shopify is unreachable
// 3-product lineup on the website: CORE → PULSE → OMNI
export const productConfig = [
  {
    id: 'core',
    name: 'CORE',
    fullName: 'Anvaya CORE',
    tagline: 'Simple. Smart. Reliable.',
    desc: 'Your first step into smart baby monitoring. A crisp 1080P camera, 5-inch parent display, pan & tilt coverage — reliable all night, simple to set up.',
    color: '#d97706',
    bgLight: '#fffbeb',
    badge: null as string | null,
    handle: 'anvaya-smart-core-audio-and-video-baby-monitor',
    specs: '5" · 1080P · 3200mAh · Pan 355° Tilt 120°',
    fallbackVariants: [
      { id: 'fallback-core-1', numericId: '50746014892255', title: 'Without Display', price: '5999.00', compareAtPrice: null, availableForSale: true },
    ],
    localImages: ['/anvaya-core-05-room-comfort-lullaby.png', '/anvaya-core-06-monitor-anywhere.png', '/anvaya-core-01-hero-1080p-day-night.png', '/anvaya-core-02-pan-tilt-whole-home.png', '/anvaya-core-04-two-way-talk.png', '/anvaya-core-07-feeding-reminder.png'],
    features: [
      { icon: 'Video', text: 'Crystal-clear 1080P', sub: 'See every detail, day or night' },
      { icon: 'RotateCcw', text: 'No blind spots', sub: '355° pan · 120° tilt, full room' },
      { icon: 'Baby', text: 'Cry alert in seconds', sub: 'Noise + motion detection' },
      { icon: 'Volume2', text: 'Talk back instantly', sub: 'Two-way audio + 8 lullabies' },
      { icon: 'Thermometer', text: 'Room conditions', sub: 'Temp & humidity at a glance' },
      { icon: 'Smartphone', text: 'App and monitor', sub: 'Watch your way, any time' },
    ],
  },
  {
    id: 'pulse',
    name: 'PULSE',
    fullName: 'Anvaya PULSE',
    tagline: 'AI Safety That Never Blinks.',
    desc: 'Upgraded to 4MP clarity, AI detects face covering and prone sleep — automatically. Danger zones, geofencing, and timeline album. Safety beyond basic monitoring.',
    color: '#3b82f6',
    bgLight: '#eff6ff',
    badge: null as string | null,
    handle: 'anvaya-smart-pulse-video-and-audio-baby-monitor',
    specs: '5.5" · 4MP · 4000mAh · AI Safety Detection',
    fallbackVariants: [
      { id: 'fallback-pulse-1', numericId: '50745881690335', title: 'Without Display', price: '8900.00', compareAtPrice: null, availableForSale: true },
      { id: 'fallback-pulse-2', numericId: '50817349419231', title: 'With 5.5" Display', price: '15999.00', compareAtPrice: null, availableForSale: true },
    ],
    localImages: ['/anvaya-pulse-02-ai-safety-alerts.png', '/anvaya-pulse-07-product-hero.png', '/anvaya-pulse-01-hero-anywhere.png', '/anvaya-pulse-04-danger-zone-fence.png', '/anvaya-pulse-03-room-comfort-lullaby.png', '/anvaya-pulse-05-feeding-reminder.png', '/anvaya-pulse-06-night-light.png'],
    features: [
      { icon: 'Shield', text: 'Face covered — alert sent', sub: 'AI detects the moment it happens' },
      { icon: 'Baby', text: 'Rolled onto tummy — you know', sub: 'Prone sleep auto-detected' },
      { icon: 'Zap', text: 'Draw a danger zone', sub: 'Baby crosses it, you\'re notified' },
      { icon: 'Video', text: 'Ultra-sharp 4MP view', sub: '355° pan · 120° tilt clarity' },
      { icon: 'Heart', text: 'Milestones, captured', sub: 'Auto timeline album as they grow' },
      { icon: 'Thermometer', text: 'Environment on watch', sub: 'Temp & humidity alerts' },
    ],
  },
  {
    id: 'omni',
    name: 'OMNI',
    fullName: 'Anvaya OMNI',
    tagline: 'Breathes. Heart beats. You sleep.',
    desc: 'Contactless breathing and heart-rate tracking, a deep sleep report every morning, one-tap calling and every PULSE feature. Nothing on your baby.',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    badge: '⭐ Most Popular' as string | null,
    handle: 'anvaya-smart-omni-baby-monitor',
    specs: '5.5" · 4MP · 4000mAh · Respiration + Heart Rate',
    fallbackVariants: [
      { id: 'fallback-omni-1', numericId: '50744670486751', title: 'Without Display', price: '12999.00', compareAtPrice: null, availableForSale: true },
      { id: 'fallback-omni-2', numericId: '50817578696927', title: 'With 5.5" Display', price: '18999.00', compareAtPrice: null, availableForSale: true },
    ],
    localImages: ['/anvaya-omni-09-vitals-heart-breathing.png', '/anvaya-omni-01-hero-nursery.jpg', '/anvaya-omni-10-ai-safety-alerts.png', '/anvaya-omni-05-sleep-report.png', '/anvaya-omni-07-monitor-anywhere.png', '/anvaya-omni-06-danger-zones.png', '/anvaya-omni-11-product-hero-specs.png'],
    features: [
      { icon: 'Activity', text: 'Breathing, watched live', sub: 'Contactless — nothing on your baby' },
      { icon: 'Heart', text: 'Heart rate, always on', sub: 'No chest strap. No wearable. Ever.' },
      { icon: 'BrainCircuit', text: 'Sleep decoded nightly', sub: 'Deep report, every morning' },
      { icon: 'Phone', text: 'One tap, partner\'s phone rings', sub: '3am? No fumbling.' },
      { icon: 'Shield', text: 'Face cover + tummy roll', sub: 'AI catches both — you just sleep' },
      { icon: 'Zap', text: 'Invisible fence, real alerts', sub: 'Set zones, get notified instantly' },
    ],
  },
];

export const faqs = [
  { q: 'Does anything touch my baby?', a: 'No. Every Anvaya monitor sits beside the cot on a shelf, table or wall mount. OMNI tracks breathing and heart rate contactlessly — nothing attaches to your baby\'s skin.' },
  { q: 'When will I receive my order?', a: 'CORE, PULSE and OMNI ship within 1–2 days and reach you in 3–7 working days. Free shipping across India, with Cash on Delivery available.' },
  { q: 'What if I\'m not happy?', a: '7-day return policy. If Anvaya isn\'t right for you, message us on WhatsApp and we\'ll arrange the return.' },
  { q: 'Which model should I buy?', a: 'OMNI is our most popular: contactless breathing and heart rate plus every PULSE feature. PULSE is best if you want AI face-cover and tummy-sleep alerts at a lower price. CORE is the simple 1080P camera with cry alerts.' },
  { q: 'Is my data private?', a: 'You view video and readings in your own password-protected Anvaya app account. Only people you invite can see your baby.' },
];

export default async function AnvayaPage() {
  // Fetch all 4 products from Shopify in parallel
  const shopifyProducts = await getProductsByHandles(
    productConfig.map(p => p.handle)
  );

  // Merge: static config (copy/features/colors) + live Shopify data (prices/variants/availability)
  // When Shopify is unreachable, shopify is null and the client uses fallbackVariants
  const products = productConfig.map((cfg, i) => ({
    ...cfg,
    shopify: shopifyProducts[i],
  }));

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Baby Wellness Pods', url: 'https://nxmplis.com/anvaya' },
      ]} />
      <AnvayaProductPage products={products} faqs={faqs} />
    </>
  );
}
