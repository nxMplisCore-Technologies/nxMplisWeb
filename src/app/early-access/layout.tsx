import type { Metadata } from 'next';
import { ProductSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Early Access | Anvaya Smart Baby Monitor | Save ₹7,000 | Limited 100 Spots',
  description: 'Reserve Anvaya Smart at early access price — ₹12,999 (was ₹19,999). India\'s best contactless AI baby monitor. No payment now. Free shipping. 30-day guarantee. Only 47 spots left.',
  keywords: ['buy Anvaya Smart', 'baby monitor early access India', 'Anvaya Smart price', 'baby monitor offer India', 'best baby monitor deal India 2025'],
  alternates: { canonical: 'https://nxmplis.com/early-access' },
  openGraph: {
    title: 'Reserve Anvaya Smart — Save ₹7,000 | Early Access India',
    description: '₹12,999 early access price (was ₹19,999). Contactless AI baby monitor. Free shipping. 30-day guarantee. Only 47 spots left.',
    url: 'https://nxmplis.com/early-access',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby monitor early access India' }],
  },
};

export default function EarlyAccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductSchema name="Anvaya Smart" description="AI-powered contactless baby monitor. Breathing, SpO2, cry analysis, sleep tracking. No wearables." price="₹12,999" sku="ANVAYA-SENSE-001" />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Early Access', url: 'https://nxmplis.com/early-access' }]} />
      {children}
    </>
  );
}
