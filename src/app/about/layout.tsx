import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Nxmpliscore, Makers of Anvaya',
  description: 'Nxmpliscore designs Anvaya Smart baby monitors in Hyderabad, India, for Indian parents: AI safety alerts and contactless breathing & heart rate.',
  alternates: { canonical: 'https://nxmplis.com/about' },
  openGraph: {
    title: 'About Us — Nxmpliscore, Makers of Anvaya',
    description: 'Nxmpliscore designs Anvaya Smart baby monitors in Hyderabad, India, for Indian parents: AI safety alerts and contactless breathing & heart rate.',
    url: 'https://nxmplis.com/about',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'About Us — Nxmpliscore, Makers of Anvaya' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
