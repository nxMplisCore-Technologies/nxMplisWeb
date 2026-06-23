import type { Metadata } from 'next';
import CryAnalyzerClient from './_client';

export const metadata: Metadata = {
  title: 'AI Baby Cry Analyzer — Free Online Tool | Anvaya Smart India',
  description: "Upload or record your baby's cry and get an instant AI analysis. Identifies hungry, tired, discomfort, belly pain and burping cries. Free demo — no sign-up required.",
  keywords: ['baby cry analyzer India', 'AI cry analysis', 'what does baby cry mean', 'baby cry detector online', 'baby cry interpreter free India', 'infant cry analysis AI'],
  alternates: { canonical: 'https://nxmplis.com/cry-analyzer' },
  openGraph: {
    title: 'Free AI Baby Cry Analyzer | Anvaya Smart',
    description: 'Know what your baby needs in 8 seconds. Upload a recording — our AI identifies 5 cry types instantly.',
    url: 'https://nxmplis.com/cry-analyzer',
    type: 'website',
  },
};

export default function CryAnalyzerPage() {
  return <CryAnalyzerClient />;
}
