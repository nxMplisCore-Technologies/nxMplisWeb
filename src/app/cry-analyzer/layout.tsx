import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Baby Cry Analyzer — What Is Your Baby Crying About?',
  description: 'Upload a 10-second recording or record live. Our AI identifies 5 cry types — Hungry, Tired, Discomfort, Belly Pain, Needs Burping — instantly and free. Powered by Anvaya Smart\'s 4-model ensemble.',
  keywords: [
    'baby cry analyzer India', 'AI baby cry analysis', 'baby cry decoder India',
    'what does baby cry mean', 'baby cry types', 'hungry cry vs tired cry',
    'baby cry analyzer free', 'infant cry analysis AI', 'baby cry translator India',
    'why is my baby crying', 'baby cry meaning India', 'Anvaya cry analyzer',
    'baby cry detector India', 'AI baby care India',
  ],
  openGraph: {
    title: 'Free AI Baby Cry Analyzer — Anvaya Smart',
    description: 'Instantly decode your baby\'s cry — Hungry, Tired, Discomfort & more. Upload audio or record live. Free. No sign-up.',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya AI Baby Cry Analyzer — free tool for Indian parents' }],
    url: 'https://nxmplis.com/cry-analyzer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Baby Cry Analyzer — What Is Baby Saying?',
    description: 'AI decodes your baby\'s cry in seconds. Hungry, Tired, Discomfort & more. Free tool by Anvaya Smart India.',
    images: ['/anvaya-nursery.jpg'],
  },
  alternates: { canonical: 'https://nxmplis.com/cry-analyzer' },
};

export default function CryAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
