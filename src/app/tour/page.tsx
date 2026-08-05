import type { Metadata } from 'next';
import TourClient from './_client';

export const metadata: Metadata = {
  title: 'Interactive Product Tour | Anvaya Smart AI Baby Monitor India',
  description: 'Take an interactive 2-minute tour of Anvaya Smart. Pick your biggest parenting worry — breathing, crying, or sleep — and see exactly how Anvaya handles it. Real app screens.',
  alternates: { canonical: 'https://nxmplis.com/tour' },
  openGraph: { title: 'Anvaya Smart Product Tour — See It Handle Your Worry', description: 'Interactive 2-minute tour. Pick your worry, see the solution. Live app screens.', url: 'https://nxmplis.com/tour', type: 'website' },
};

export default function TourPage() {
  return <TourClient />;
}
