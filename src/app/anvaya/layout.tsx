import type { Metadata } from 'next';
import { FAQSchema, ProductSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Anvaya Smart Products | CORE SENSE PULSE OMNI | Buy Baby Monitor India',
  description: 'Compare all Anvaya Smart baby monitors — CORE (₹8,999), SENSE (₹12,999), PULSE (₹15,999), OMNI (₹19,999). Contactless AI monitoring. Breathing, SpO2, cry analysis & sleep tracking.',
  keywords: ['Anvaya CORE baby monitor', 'Anvaya SENSE', 'Anvaya PULSE', 'Anvaya OMNI', 'buy smart baby monitor India', 'best baby monitor price India 2025', 'contactless baby monitor buy'],
  alternates: { canonical: 'https://nxmplis.com/anvaya' },
  openGraph: {
    title: 'Anvaya Smart — 4 Models, One Promise | Buy Baby Monitor India',
    description: 'CORE ₹8,999 · SENSE ₹12,999 · PULSE ₹15,999 · OMNI ₹19,999. India\'s best AI baby monitor. Free shipping. 30-day guarantee.',
    url: 'https://nxmplis.com/anvaya',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby monitor lineup — CORE SENSE PULSE OMNI' }],
  },
};

const faqs = [
  { q: 'How does Anvaya Smart monitor my baby without touching them?', a: 'Anvaya uses radar-based motion sensing, infrared thermal imaging, and AI acoustic analysis — all passive, from beside the crib. Nothing touches your baby.' },
  { q: 'Is Anvaya Smart safe to use near a newborn?', a: 'Completely safe. Anvaya emits no radiation, no harmful signals, and no bright lights. It is designed to be completely invisible to your baby.' },
  { q: 'What is the difference between Anvaya SENSE and OMNI?', a: 'SENSE covers breathing, SpO2, heart rate, cry analysis and air quality. OMNI adds Predictive AI, 360° room coverage and detailed weekly health reports.' },
  { q: 'Does Anvaya Smart work in complete darkness?', a: 'Yes. Anvaya uses infrared and radar sensing — not cameras. Darkness is no barrier at all.' },
  { q: 'What happens to my baby\'s health data?', a: 'All processing is on-device. No video, audio, or health data ever leaves your home. Privacy is a design principle, not a feature.' },
  { q: 'Which Anvaya model is best for a newborn?', a: 'We recommend Anvaya SENSE for newborns — it covers breathing, SpO2, cry analysis and air quality at ₹12,999. OMNI is ideal for maximum peace of mind.' },
];

export default function AnvayaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductSchema name="Anvaya SENSE" description="Advanced contactless baby monitor with breathing, SpO2, heart rate, cry analysis and air quality monitoring" price="₹12,999" sku="ANVAYA-SENSE-001" image="https://nxmplis.com/anvaya-lifestyle.webp" />
      <ProductSchema name="Anvaya CORE" description="Essential AI baby monitor with HD video, cry detection, lullabies and temperature monitoring" price="₹8,999" sku="ANVAYA-CORE-001" image="https://nxmplis.com/anvaya-product.webp" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Products', url: 'https://nxmplis.com/anvaya' }]} />
      {children}
    </>
  );
}
