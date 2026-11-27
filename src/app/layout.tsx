import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TopBar } from '@/components/layout/top-bar';
import { MobileTabBar } from '@/components/layout/mobile-tab-bar';
import { MobileLiveBar } from '@/components/layout/mobile-live-bar';
import { SiteChrome } from '@/components/layout/site-chrome';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/JsonLd';
import { GoogleAnalytics, MetaPixel } from '@/components/seo/Analytics';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });

const BASE_URL = 'https://nxmplis.com';

export const viewport: Viewport = {
  themeColor: '#4a7c6f',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Anvaya Smart — AI Baby Monitor India | Breathing & Heart Rate',
    template: '%s | Anvaya Smart',
  },
  description: 'AI baby monitors designed in India. CORE ₹5,999, PULSE (AI face-cover alerts) from ₹8,900, OMNI (contactless breathing & heart rate) from ₹12,999. COD.',
  keywords: [
    // Zero-competition category terms — own these
    'baby wellness pod', 'baby wellness pod India', 'baby wellness pod monitor',
    'infant wellness pod', 'newborn wellness pod', 'baby wellness monitoring system India',
    'contactless baby wellness pod India 2026', 'AI baby wellness monitoring',
    'contactless baby monitor India', 'baby breathing monitor without wearable India',
    'baby monitor without wearable', 'non contact baby monitor India',
    'baby monitor face cover alert', 'baby rollover alert monitor',
    'AI baby monitor India', 'AI baby monitor night vision',
    'baby cry analyzer India', 'AI baby cry analysis device India',
    'contactless breathing baby monitor', 'infant breathing monitor India',
    // High-volume commercial terms
    'baby monitor India', 'smart baby monitor India', 'best baby monitor India 2026',
    'baby breathing monitor India', 'baby breathing and heart rate monitor',
    'AI baby monitor', 'baby cry analysis monitor', 'baby sleep monitor India',
    'baby wellness monitor', 'Anvaya Smart', 'Anvaya baby monitor',
    'baby heart rate monitor India', 'newborn monitor India', 'infant wellness monitoring',
    'baby vital signs monitor India', 'baby pod monitor India',
    'best baby camera India', 'baby monitor price India',
    // Informational long-tail
    'what does baby cry mean', 'baby cry types India',
    'how to monitor baby breathing at night India',
    'best baby monitor for newborn India', 'premium baby monitor India',
  ],
  authors: [{ name: 'Anvaya Smart', url: BASE_URL }],
  applicationName: 'Anvaya Smart',
  creator: 'Anvaya Smart by Nxmpliscore',
  publisher: 'Nxmpliscore',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Anvaya Smart',
    title: 'Anvaya Smart — AI Baby Monitors | Contactless Breathing & Heart Rate',
    description: 'CORE from ₹5,999 · PULSE from ₹8,900 · OMNI from ₹12,999. AI safety alerts, 4MP night vision and contactless breathing & heart rate. Free shipping, COD, 7-day returns.',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart AI baby monitor in a nursery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvaya Smart — AI Baby Monitors',
    description: 'AI safety alerts, 4MP night vision and contactless breathing & heart rate. CORE from ₹5,999. Free shipping, COD, 7-day returns.',
    images: ['/anvaya-nursery.jpg'],
    creator: '@anvayasmart',
  },
  alternates: { canonical: BASE_URL },
  verification: { google: 'K3fhVMXAF3uPfhDutppwFmh3ZCDBLbeIh8lzUDIoUvw' },
  category: 'baby products',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <GoogleAnalytics />
        <SiteChrome><MetaPixel /></SiteChrome>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={cn('min-h-screen bg-background antialiased', poppins.variable)} style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        <OrganizationSchema />
        <WebsiteSchema />
        <div className="relative flex min-h-screen flex-col">
          <SiteChrome>
            <div className="hidden md:block"><TopBar /></div>
            <Header />
            <MobileLiveBar />
          </SiteChrome>
          <main className="flex-1 md:mb-0 mb-[68px]">{children}</main>
          <SiteChrome>
            <Footer className="hidden md:block" />
            <MobileTabBar />
          </SiteChrome>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
