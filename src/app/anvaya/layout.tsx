import type { Metadata } from 'next';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Buy Anvaya Baby Monitor India | CORE, PULSE & OMNI — Compare Models',
  description: 'Compare Anvaya Smart baby monitors: CORE 1080P (₹5,999), PULSE 4MP with AI face-cover & tummy-sleep alerts (from ₹8,900), OMNI with contactless breathing & heart rate (from ₹12,999). Free shipping, COD.',
  keywords: ['Anvaya CORE baby monitor', 'Anvaya PULSE', 'Anvaya OMNI', 'buy smart baby monitor India', 'baby monitor price India 2026', 'contactless baby monitor buy', 'AI baby monitor buy India'],
  alternates: { canonical: 'https://nxmplis.com/anvaya' },
  openGraph: {
    title: 'Anvaya Smart — CORE, PULSE & OMNI | Buy Baby Monitor India',
    description: 'CORE ₹5,999 · PULSE from ₹8,900 · OMNI from ₹12,999. Free shipping, Cash on Delivery, 7-day returns.',
    url: 'https://nxmplis.com/anvaya',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby monitor lineup — CORE, PULSE and OMNI' }],
  },
};

const faqs = [
  { q: 'How does Anvaya Smart monitor my baby without touching them?', a: 'Every Anvaya monitor watches from beside the cot with a camera and microphone. OMNI also senses breathing and heart rate contactlessly. Nothing is strapped to your baby.' },
  { q: 'Is Anvaya Smart safe to use near a newborn?', a: 'Yes. The monitor sits at a distance from the cot, with no wearables, straps or wires on your baby. Keep cables out of reach as with any nursery device. It is a wellness and convenience monitor, not a medical device.' },
  { q: 'What is the difference between Anvaya CORE, PULSE and OMNI?', a: 'CORE is a 1080P pan-tilt camera with cry alerts, two-way talk and room temperature. PULSE upgrades to 4MP and adds AI face-cover and tummy-sleep alerts plus danger zones. OMNI has everything in PULSE plus contactless breathing and heart-rate tracking and a nightly sleep report.' },
  { q: 'Does Anvaya Smart work in complete darkness?', a: 'Yes. All models have infrared night vision, so you get a clear picture in a dark room.' },
  { q: 'What happens to my baby\'s health data?', a: 'You view video and readings in your own password-protected Anvaya app account. Only people you invite can see your baby.' },
  { q: 'Which Anvaya model is best for a newborn?', a: 'For newborns, parents most often choose OMNI for contactless breathing and heart-rate tracking, or PULSE for AI face-cover and tummy-sleep alerts. CORE suits parents who mainly want a clear camera and cry alerts.' },
];

export default function AnvayaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductSchema name="Anvaya CORE" description="1080P pan-tilt baby monitor with app, cry alerts, two-way talk, lullabies and room temperature" price="₹5,999" sku="ANVAYA-CORE" image="https://nxmplis.com/anvaya-core-01-hero-1080p-day-night.png" url="https://nxmplis.com/anvaya/core" />
      <ProductSchema name="Anvaya PULSE" description="4MP baby monitor with AI face-cover and tummy-sleep alerts, danger zones and night vision" price="₹8,900" sku="ANVAYA-PULSE" image="https://nxmplis.com/anvaya-pulse-07-product-hero.png" url="https://nxmplis.com/anvaya/pulse" />
      <ProductSchema name="Anvaya OMNI" description="Baby monitor with contactless breathing and heart-rate tracking, 4MP camera, AI safety alerts and nightly sleep report" price="₹12,999" sku="ANVAYA-OMNI" image="https://nxmplis.com/anvaya-omni-11-product-hero-specs.png" url="https://nxmplis.com/anvaya/omni" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Products', url: 'https://nxmplis.com/anvaya' }]} />
      {children}
    </>
  );
}
