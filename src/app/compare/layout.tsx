import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Baby Monitors: CORE vs PULSE vs OMNI',
  description: 'Compare Anvaya CORE, PULSE and OMNI side by side: camera, AI safety alerts, breathing & heart rate, display options and prices. Choose in a minute.',
  alternates: { canonical: 'https://nxmplis.com/compare' },
  openGraph: {
    title: 'Compare Baby Monitors: CORE vs PULSE vs OMNI',
    description: 'Compare Anvaya CORE, PULSE and OMNI side by side: camera, AI safety alerts, breathing & heart rate, display options and prices. Choose in a minute.',
    url: 'https://nxmplis.com/compare',
    images: [{ url: '/anvaya-pulse-02-ai-safety-alerts.png', width: 1200, height: 630, alt: 'Compare Baby Monitors: CORE vs PULSE vs OMNI' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
