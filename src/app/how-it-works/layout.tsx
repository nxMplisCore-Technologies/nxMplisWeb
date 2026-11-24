import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Anvaya Baby Monitors Work',
  description: 'How Anvaya baby monitors work: night-vision camera, cry alerts, AI face-cover and tummy-sleep alerts, and contactless breathing & heart rate on OMNI.',
  alternates: { canonical: 'https://nxmplis.com/how-it-works' },
  openGraph: {
    title: 'How Anvaya Baby Monitors Work',
    description: 'How Anvaya baby monitors work: night-vision camera, cry alerts, AI face-cover and tummy-sleep alerts, and contactless breathing & heart rate on OMNI.',
    url: 'https://nxmplis.com/how-it-works',
    images: [{ url: '/anvaya-omni-09-vitals-heart-breathing.png', width: 1200, height: 630, alt: 'How Anvaya Baby Monitors Work' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
