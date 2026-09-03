import { getProductsByHandles } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import { AnvayaProductPage } from './AnvayaProductPage';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

// Static product config — marketing copy, colors, features (lives on website)
// Prices + variants + availability come live from Shopify; fallbackVariants used when Shopify is unreachable
export const productConfig = [
  {
    id: 'core',
    name: 'CORE',
    fullName: 'Anvaya CORE',
    tagline: 'Simple. Smart. Reliable.',
    desc: 'Everything a new parent needs. HD video, cry detection, lullabies and temperature monitoring — in one quietly intelligent baby wellness pod.',
    color: '#d97706',
    bgLight: '#fffbeb',
    badge: null as string | null,
    handle: 'anvaya-smart-core-audio-and-video-baby-monitor',
    fallbackVariants: [
      { id: 'fallback-core-1', numericId: '50746014892255', title: 'Without Display', price: '8999.00', compareAtPrice: '14999.00', availableForSale: true },
      { id: 'fallback-core-2', numericId: '50817486258399', title: 'With 5" Display', price: '12999.00', compareAtPrice: '14999.00', availableForSale: true },
    ],
    localImages: ['/anvaya-core-1.jpg', '/anvaya-core-2.jpg', '/anvaya-core-3.jpg', '/anvaya-core-4.jpg', '/anvaya-core-5.jpg'],
    features: [
      { icon: 'Video', text: 'HD Video', sub: 'Live view from anywhere' },
      { icon: 'Baby', text: 'Cry Detection', sub: '5 cry types identified' },
      { icon: 'Music', text: 'Lullabies', sub: 'Built-in & white noise' },
      { icon: 'Thermometer', text: 'Temperature', sub: 'Room monitoring' },
      { icon: 'Wifi', text: 'Remote Access', sub: 'Anywhere via app' },
      { icon: 'Shield', text: 'Contactless', sub: 'Nothing touches baby' },
    ],
  },
  {
    id: 'sense',
    name: 'SENSE',
    fullName: 'Anvaya SENSE',
    tagline: 'The Wellness Pod That Watches Every Breath.',
    desc: 'India\'s most loved baby wellness pod. Tracks breathing, SpO₂, heart rate and cry type — completely contactlessly.',
    color: '#4a7c6f',
    bgLight: '#f0faf6',
    badge: '⭐ Best Seller' as string | null,
    handle: 'anvaya-smart-sense-audio-and-video-baby-monitor',
    localImages: ['/anvaya-sense.jpg', '/anvaya-nursery.jpg', '/anvaya-device-baby.webp', '/anvaya-nursery-center.webp', '/anvaya-lifestyle.webp'],
    fallbackVariants: [
      { id: 'fallback-sense-1', numericId: '50745192939743', title: 'Without Display', price: '14999.00', compareAtPrice: '19999.00', availableForSale: true },
      { id: 'fallback-sense-2', numericId: '50817450934495', title: 'With 5" Display', price: '17999.00', compareAtPrice: '19999.00', availableForSale: true },
    ],
    features: [
      { icon: 'Activity', text: 'Breathing Rate', sub: 'Contactless monitoring' },
      { icon: 'Heart', text: 'Heart Rate', sub: 'Real-time tracking' },
      { icon: 'Baby', text: 'Cry Analysis', sub: 'Hungry / tired / pain' },
      { icon: 'Wind', text: 'Air Quality', sub: 'Humidity alerts' },
      { icon: 'Shield', text: 'Face Cover Alert', sub: 'Safety detection' },
      { icon: 'Wifi', text: 'SpO₂ Monitoring', sub: 'Oxygen saturation' },
    ],
  },
  {
    id: 'pulse',
    name: 'PULSE',
    fullName: 'Anvaya PULSE',
    tagline: 'Stay Connected to Every Moment.',
    desc: 'Advanced environment and wellness monitoring. Know your baby\'s complete world — temperature, humidity, movement and real-time safety alerts.',
    color: '#3b82f6',
    bgLight: '#eff6ff',
    badge: null as string | null,
    handle: 'anvaya-smart-pulse-video-and-audio-baby-monitor',
    localImages: ['/anvaya-pulse.jpg', '/anvaya-room.webp', '/anvaya-nursery-center.webp', '/anvaya-device-baby.webp', '/anvaya-lifestyle.webp'],
    fallbackVariants: [
      { id: 'fallback-pulse-1', numericId: '50745881690335', title: 'Without Display', price: '17999.00', compareAtPrice: '22999.00', availableForSale: true },
      { id: 'fallback-pulse-2', numericId: '50817349419231', title: 'With 5" Display', price: '21999.00', compareAtPrice: '22999.00', availableForSale: true },
    ],
    features: [
      { icon: 'Activity', text: 'Movement Tracking', sub: 'Activity detection' },
      { icon: 'Thermometer', text: 'Temperature', sub: 'Perfect sleep env' },
      { icon: 'Wind', text: 'Humidity', sub: 'Air quality alerts' },
      { icon: 'Shield', text: 'Safety Alerts', sub: 'Instant notifications' },
      { icon: 'Zap', text: 'Push Alerts', sub: 'Real-time on phone' },
      { icon: 'Wifi', text: 'Remote View', sub: 'HD video anywhere' },
    ],
  },
  {
    id: 'omni',
    name: 'OMNI',
    fullName: 'Anvaya OMNI',
    tagline: 'Total Awareness. Complete Peace of Mind.',
    desc: 'India\'s most advanced baby wellness pod. 360° intelligent monitoring with Predictive AI — weekly health reports, SpO₂ tracking, and alerts before problems arise.',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    badge: '🏆 Most Advanced' as string | null,
    handle: 'anvaya-smart-omni-baby-monitor',
    localImages: ['/anvaya-omni.jpg', '/anvaya-core-6.jpg', '/anvaya-core-7.jpg', '/anvaya-nursery.jpg', '/anvaya-room.webp'],
    fallbackVariants: [
      { id: 'fallback-omni-1', numericId: '50744670486751', title: 'Without Display', price: '20999.00', compareAtPrice: '29999.00', availableForSale: true },
      { id: 'fallback-omni-2', numericId: '50817578696927', title: 'With 5" Display', price: '24999.00', compareAtPrice: '29999.00', availableForSale: true },
    ],
    features: [
      { icon: 'Activity', text: 'Breathing + SpO₂', sub: 'All contactless' },
      { icon: 'Heart', text: 'Heart Rate', sub: 'Continuous tracking' },
      { icon: 'BrainCircuit', text: 'Predictive AI', sub: 'Alerts before risk' },
      { icon: 'GitBranch', text: '360° Coverage', sub: 'Full room awareness' },
      { icon: 'Heart', text: 'Weekly Reports', sub: 'AI health insights' },
      { icon: 'Shield', text: 'Smart Alerts', sub: 'Before problems arise' },
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
