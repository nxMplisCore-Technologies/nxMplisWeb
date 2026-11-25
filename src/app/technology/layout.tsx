import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Technology — AI & Contactless Sensing',
  description: 'The technology inside Anvaya Smart baby monitors: night-vision cameras, on-camera AI safety alerts and contactless breathing & heart-rate sensing.',
  alternates: { canonical: 'https://nxmplis.com/technology' },
  openGraph: {
    title: 'Our Technology — AI & Contactless Sensing',
    description: 'The technology inside Anvaya Smart baby monitors: night-vision cameras, on-camera AI safety alerts and contactless breathing & heart-rate sensing.',
    url: 'https://nxmplis.com/technology',
    images: [{ url: '/anvaya-omni-11-product-hero-specs.jpg', width: 1200, height: 630, alt: 'Our Technology — AI & Contactless Sensing' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
