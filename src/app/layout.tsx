import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { TopBar } from '@/components/layout/top-bar';
import { MobileTabBar } from '@/components/layout/mobile-tab-bar';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { OrganizationSchema, WebsiteSchema } from '@/components/seo/JsonLd';
import { GoogleAnalytics } from '@/components/seo/Analytics';

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
    default: 'Anvaya Smart | Baby Wellness Pod India | AI Contactless Baby Monitor',
    template: '%s | Anvaya Smart — Baby Wellness Pod India',
  },
  description: 'Anvaya Smart is India\'s most advanced AI baby wellness pod. Contactless breathing, SpO₂, cry analysis & sleep tracking. No wearables. Free shipping. 30-day guarantee. Shop CORE, SENSE, PULSE & OMNI.',
  keywords: [
    // Zero-competition category terms — own these
    'baby wellness pod', 'baby wellness pod India', 'baby wellness pod monitor',
    'infant wellness pod', 'newborn wellness pod', 'baby wellness monitoring system India',
    'contactless baby wellness pod India 2026', 'AI baby wellness monitoring',
    'contactless baby monitor India', 'baby breathing monitor without wearable India',
    'baby monitor without wearable', 'non contact baby monitor India',
    'baby SpO2 monitor India', 'baby oxygen monitor without wearable India',
    'AI baby monitor India', 'radar baby monitor India',
    'baby cry analyzer India', 'AI baby cry analysis device India',
    'contactless breathing baby monitor', 'infant breathing monitor India',
    // High-volume commercial terms
    'baby monitor India', 'smart baby monitor India', 'best baby monitor India 2026',
    'baby breathing monitor India', 'baby SpO2 monitor',
    'AI baby monitor', 'baby cry analysis monitor', 'baby sleep monitor India',
    'baby wellness monitor', 'Anvaya Smart', 'Anvaya baby monitor',
    'baby heart rate monitor India', 'newborn monitor India', 'infant wellness monitoring',
    'baby vital signs monitor India', 'baby pod monitor India',
    'best baby camera India', 'baby monitor price India',
    // Informational long-tail
    'what does baby cry mean', 'baby cry types India',
    'how to monitor baby breathing at night India',
    'best baby monitor for newborn India', 'paediatrician recommended baby monitor India',
  ],
  authors: [{ name: 'Nxmliscore', url: BASE_URL }],
  creator: 'Nxmliscore',
  publisher: 'Nxmliscore',
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Anvaya Smart by Nxmliscore',
    title: 'Anvaya Smart — India\'s Best Baby Wellness Pod | AI Contactless Monitor',
    description: 'India\'s most trusted baby wellness pod. Monitor breathing, SpO₂, cries & sleep contactlessly. No wearables. No stress. Free shipping across India. Starting ₹8,999.',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby wellness pod in nursery — AI-powered contactless monitoring India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvaya Smart — India\'s Best Baby Wellness Pod',
    description: 'India\'s most trusted baby wellness pod. Contactless monitoring for breathing, SpO₂, cries & sleep. No wearables. Free shipping India.',
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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={cn('min-h-screen bg-background antialiased', poppins.variable)} style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
        <OrganizationSchema />
        <WebsiteSchema />
        <div className="relative flex min-h-screen flex-col">
          <div className="hidden md:block"><TopBar /></div>
          <Header />
          <main className="flex-1 md:mb-0 mb-[68px]">{children}</main>
          <Footer className="hidden md:block" />
          <MobileTabBar />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
