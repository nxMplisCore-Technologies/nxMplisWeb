import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Anvaya Smart | Contactless Baby Monitor | Smart Care. Gentle Beginnings.',
  description: 'Anvaya Smart monitors your baby\'s breathing, cry patterns, SpO2, heart rate and temperature — completely contactlessly. No wearables. No stress. Just peace of mind. Shop CORE, SENSE, PULSE & OMNI. Free shipping across India.',
  keywords: 'baby monitor India, smart baby monitor, contactless baby monitor, baby breathing monitor, baby cry analysis, SpO2 baby monitor, AI baby monitor India, baby wellness monitor, best baby monitor India 2025',
  openGraph: {
    title: 'Anvaya Smart — Because Every Breath Matters',
    description: 'Contactless AI baby monitor. Tracks breathing, cries, SpO2 & temperature. No wearables. Made for Indian parents.',
    url: 'https://nxmplis.com',
    siteName: 'Anvaya Smart by Nxmliscore',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-body antialiased", poppins.variable)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
