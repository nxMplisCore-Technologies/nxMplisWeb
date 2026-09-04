import { getProductsByHandles } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import { AnvayaProductPage } from './AnvayaProductPage';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

// Static product config — marketing copy, colors, features (lives on website)
// Prices + variants + availability come live from Shopify; fallbackVariants used when Shopify is unreachable
// 3-product lineup: CORE → PULSE → OMNI (SENSE retired)
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
      { id: 'fallback-core-1', numericId: '50746014892255', title: 'Without Display', price: '8999.00', compareAtPrice: '14999.00', availableForSale: true },
      { id: 'fallback-core-2', numericId: '50817486258399', title: 'With 5" Display', price: '12999.00', compareAtPrice: '14999.00', availableForSale: true },
    ],
    localImages: ['/anvaya-core-1.jpg', '/anvaya-core-2.jpg', '/anvaya-core-3.jpg', '/anvaya-core-4.jpg', '/anvaya-core-5.jpg', '/anvaya-core-6.jpg', '/anvaya-core-7.jpg'],
    features: [
      { icon: 'Video', text: '1080P Camera', sub: 'Pan 355° · Tilt 120°' },
      { icon: 'Baby', text: 'Cry & Noise', sub: 'Instant detection' },
      { icon: 'Music', text: 'Two-way Audio', sub: 'Lullaby play built-in' },
      { icon: 'Thermometer', text: 'Temp & Humidity', sub: 'Room monitoring' },
      { icon: 'Activity', text: 'Motion Detection', sub: 'Instant alerts' },
      { icon: 'Wifi', text: 'App + Monitor', sub: 'View both ways' },
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
    badge: '⭐ Most Popular' as string | null,
    handle: 'anvaya-smart-pulse-video-and-audio-baby-monitor',
    specs: '5.5" · 4MP · 4000mAh · AI Safety Detection',
    fallbackVariants: [
      { id: 'fallback-pulse-1', numericId: '50745881690335', title: 'Without Display', price: '17999.00', compareAtPrice: '22999.00', availableForSale: true },
      { id: 'fallback-pulse-2', numericId: '50817349419231', title: 'With 5.5" Display', price: '21999.00', compareAtPrice: '22999.00', availableForSale: true },
    ],
    localImages: ['/anvaya-pulse.jpg', '/anvaya-room.webp', '/anvaya-nursery-center.webp', '/anvaya-device-baby.webp', '/anvaya-lifestyle.webp'],
    features: [
      { icon: 'Shield', text: 'Face Cover Alert', sub: 'AI detects instantly' },
      { icon: 'Activity', text: 'Prone Sleep Alert', sub: 'Auto tummy detection' },
      { icon: 'Zap', text: 'Danger Zone', sub: 'Electronic geofence' },
      { icon: 'Video', text: '4MP Camera', sub: 'Pan 355° · Tilt 120°' },
      { icon: 'Heart', text: 'Timeline Album', sub: 'Auto milestone capture' },
      { icon: 'Thermometer', text: 'Temp & Humidity', sub: 'Environment alerts' },
    ],
  },
  {
    id: 'omni',
    name: 'OMNI',
    fullName: 'Anvaya OMNI',
    tagline: 'Breathes. Heart beats. You sleep.',
    desc: 'India\'s only baby monitor with contactless respiration and heart rate detection. Deep sleep analysis, one-click calling, and every PULSE feature — the complete picture.',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    badge: '🏆 Most Advanced' as string | null,
    handle: 'anvaya-smart-omni-baby-monitor',
    specs: '5.5" · 4MP · 4000mAh · Respiration + Heart Rate',
    fallbackVariants: [
      { id: 'fallback-omni-1', numericId: '50744670486751', title: 'Without Display', price: '20999.00', compareAtPrice: '29999.00', availableForSale: true },
      { id: 'fallback-omni-2', numericId: '50817578696927', title: 'With 5.5" Display', price: '24999.00', compareAtPrice: '29999.00', availableForSale: true },
    ],
    localImages: ['/anvaya-omni-01-hero-nursery.jpg', '/anvaya-omni-09-vitals-heart-breathing.png', '/anvaya-omni-10-ai-safety-alerts.png', '/anvaya-omni-05-sleep-report.png', '/anvaya-omni-07-monitor-anywhere.png', '/anvaya-omni-06-danger-zones.png', '/anvaya-omni-11-product-hero-specs.png', '/anvaya-omni-08-trust-certifications.png'],
    features: [
      { icon: 'Activity', text: 'Respiration Monitor', sub: 'Contactless, real-time' },
      { icon: 'Heart', text: 'Heart Rate', sub: 'No wearable needed' },
      { icon: 'BrainCircuit', text: 'Sleep Analysis', sub: 'Nightly report' },
      { icon: 'Phone', text: 'One-click Calling', sub: 'Reach partner instantly' },
      { icon: 'Shield', text: 'Face Cover + Prone', sub: 'AI safety detection' },
      { icon: 'Zap', text: 'Danger Zone', sub: 'Electronic geofence' },
    ],
  },
];

const faqs = [
  { q: 'Does anything touch my baby?', a: 'No. Anvaya is completely contactless. The wellness pod sits beside the crib on a shelf or table. It uses radar and infrared sensing — nothing attaches to your baby\'s skin.' },
  { q: 'When will I receive my order?', a: 'Anvaya Smart is currently in pre-order. Delivery across India takes 3–7 working days after dispatch. Free shipping on all orders.' },
  { q: 'What if I\'m not happy?', a: '30-day money-back guarantee — no questions asked. If Anvaya doesn\'t give you peace of mind, we\'ll refund every rupee including return shipping.' },
  { q: 'Which model should I buy?', a: 'SENSE is our most popular for new parents — it covers breathing, SpO₂, cry analysis and sleep. For the complete picture with AI health reports, go with OMNI.' },
  { q: 'Is my data private?', a: 'All processing happens on the device. No health data, video or audio is ever sent to external servers. Your family\'s privacy is a design principle.' },
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
