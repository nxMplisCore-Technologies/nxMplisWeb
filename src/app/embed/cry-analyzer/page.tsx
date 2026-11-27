import type { Metadata } from 'next';
import CryAnalyzerWidget from '@/components/cry-analyzer/CryAnalyzerWidget';

// Shown inside an iframe on other websites. Kept out of Google's index so it
// never competes with /cry-analyzer; the links in it still count.
export const metadata: Metadata = {
  title: 'Baby Cry Analyzer (embed)',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://nxmplis.com/cry-analyzer' },
};

export default function EmbedCryAnalyzerPage() {
  return (
    <div className="min-h-screen bg-white p-2 -mb-[68px] md:mb-0">
      <div className="max-w-md mx-auto">
        <CryAnalyzerWidget embedded />
      </div>
    </div>
  );
}
