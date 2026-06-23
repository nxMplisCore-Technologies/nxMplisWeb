import type { Metadata } from 'next';
import PreorderClient from './_client';

export const metadata: Metadata = {
  title: 'Preorder Anvaya Smart Baby Monitor India | Founding Family Pricing',
  description: "Preorder Anvaya Smart and lock in founding family pricing — ₹2,000 off, free shipping, 30-day guarantee. India's first contactless AI baby wellness pod. Limited early batch.",
  alternates: { canonical: 'https://nxmplis.com/preorder' },
  openGraph: { title: 'Preorder Anvaya Smart — Founding Family Pricing', description: 'Lock in ₹2,000 off. Free shipping across India. 30-day guarantee.', url: 'https://nxmplis.com/preorder', type: 'website' },
};

export default function PreorderPage() {
  return <PreorderClient />;
}
