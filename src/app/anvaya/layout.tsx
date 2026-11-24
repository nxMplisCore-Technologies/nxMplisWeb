import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Anvaya Baby Monitor | CORE, PULSE & OMNI',
  description: 'Compare and buy Anvaya baby monitors: CORE ₹5,999, PULSE from ₹8,900 with AI alerts, OMNI from ₹12,999 with breathing & heart rate. Free shipping, COD.',
  keywords: ['Anvaya CORE baby monitor', 'Anvaya PULSE', 'Anvaya OMNI', 'buy smart baby monitor India', 'baby monitor price India 2026', 'contactless baby monitor buy', 'AI baby monitor buy India'],
  alternates: { canonical: 'https://nxmplis.com/anvaya' },
  openGraph: {
    title: 'Anvaya Smart — CORE, PULSE & OMNI | Buy Baby Monitor India',
    description: 'CORE ₹5,999 · PULSE from ₹8,900 · OMNI from ₹12,999. Free shipping, Cash on Delivery, 7-day returns.',
    url: 'https://nxmplis.com/anvaya',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby monitor lineup — CORE, PULSE and OMNI' }],
  },
};

export default function AnvayaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
