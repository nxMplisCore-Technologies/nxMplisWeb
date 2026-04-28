import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baby Wellness Blog | Sleep, Cry Analysis & Parenting Tips | Anvaya Smart',
  description: 'Expert guides on baby sleep patterns, cry analysis, breathing monitoring, and infant wellness. From the team at Anvaya Smart — India\'s leading AI baby monitor.',
  keywords: ['baby sleep tips India', 'newborn breathing guide', 'baby cry types meaning', 'infant wellness India', 'new parent tips India', 'baby monitor blog'],
  alternates: { canonical: 'https://nxmplis.com/blog' },
  openGraph: {
    title: 'Baby Wellness Blog | Anvaya Smart',
    description: 'Guides on baby sleep, cry analysis and infant wellness from India\'s AI baby monitor experts.',
    url: 'https://nxmplis.com/blog',
    images: [{ url: '/anvaya-lifestyle.png', alt: 'Baby wellness blog by Anvaya Smart India' }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
