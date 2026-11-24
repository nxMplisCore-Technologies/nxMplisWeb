import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, AISnippet, TrustBar } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, AlertCircle, ShieldCheck, Wifi, Brain, Baby, Thermometer, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Best Baby Monitor India 2026: Complete Buying Guide | Anvaya Smart',
  description: 'How to choose the best baby monitor in India in 2026: night vision, AI safety alerts, contactless breathing & heart rate, room temperature and local support. Honest buying guide with prices.',
  keywords: ['best baby monitor India 2026', 'baby monitor buying guide India', 'contactless baby monitor India', 'baby monitor features India', 'smart baby monitor India 2026'],
  alternates: { canonical: 'https://nxmplis.com/blog/best-baby-monitor-india-2026' },
  openGraph: {
    title: 'Best Baby Monitor India 2026: Complete Buying Guide',
    description: 'What features really matter when choosing a baby monitor for your Indian home. An honest guide.',
    url: 'https://nxmplis.com/blog/best-baby-monitor-india-2026',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630 }],
  },
};

const criteria = [
  {
    icon: Baby,
    title: 'Nothing on your baby\'s skin',
    why: 'In Indian heat and humidity, socks, clips and bands can be uncomfortable and need fitting every night. A monitor that watches from beside the cot avoids this.',
    lookFor: 'A camera-based or contactless monitor that works from a distance.',
  },
  {
    icon: ShieldCheck,
    title: 'AI safety alerts, not just video',
    why: 'Nobody can watch a screen all night. AI alerts tell you when something needs checking, such as a covered face or your baby rolling onto their tummy.',
    lookFor: 'Face-cover and tummy-sleep (prone) alerts, danger zones and cry alerts.',
  },
  {
    icon: Brain,
    title: 'Breathing and heart rate (if you want more peace of mind)',
    why: 'Some parents also want to see breathing and heart rate without a wearable. Remember that consumer monitors are wellness devices, not medical monitors.',
    lookFor: 'Contactless breathing and heart-rate tracking with a clear sleep report.',
  },
  {
    icon: Wifi,
    title: 'A clear picture at night',
    why: 'Most checking happens in a dark room. A sharp night-vision camera with pan and tilt means fewer blind spots and fewer trips into the room.',
    lookFor: '1080P or better (4MP is sharper), infrared night vision, pan and tilt.',
  },
  {
    icon: Thermometer,
    title: 'Room temperature for Indian conditions',
    why: 'Room temperature and humidity matter in India, from Delhi summers to Chennai monsoons. Overheating disturbs sleep.',
    lookFor: 'Temperature and humidity readings in the app.',
  },
  {
    icon: Lock,
    title: 'Local support, easy returns',
    why: 'Imported monitors can mean complex returns, no local repairs and customs duties. A brand that sells in India offers local support.',
    lookFor: 'Free shipping, Cash on Delivery, an easy return window and WhatsApp support.',
  },
];

const faqs = [
  { q: 'Which is the best baby monitor in India in 2026?', a: 'It depends on what you want. For a clear camera with cry alerts, Anvaya CORE (₹5,999) is great value. For AI face-cover and tummy-sleep alerts, choose Anvaya PULSE (from ₹8,900). For contactless breathing and heart-rate tracking plus every PULSE feature, choose Anvaya OMNI (from ₹12,999).' },
  { q: 'Do I need a wearable baby monitor?', a: 'No. Wearables (socks, clips, bands) need fitting every night and can be uncomfortable in Indian heat. A contactless monitor like Anvaya OMNI tracks breathing and heart rate from beside the cot instead. Neither type is a medical device.' },
  { q: 'Is a basic video baby monitor enough?', a: 'For many parents, yes: a good night-vision camera with cry alerts covers most needs. If you want alerts without watching the screen, AI monitors like Anvaya PULSE add face-cover and tummy-sleep alerts.' },
  { q: 'What features should I look for in a baby monitor for India?', a: 'Prioritise (1) a sharp night-vision camera with pan and tilt, (2) cry alerts and two-way talk, (3) AI safety alerts such as face cover and tummy sleep, (4) room temperature and humidity, and (5) local support with easy returns. Add contactless breathing and heart rate if you want more peace of mind.' },
  { q: 'Can a baby monitor prevent SIDS?', a: 'No. No consumer baby monitor has been shown to prevent SIDS. The AAP advises safe-sleep practices instead: baby on their back, on a firm flat surface, with nothing else in the cot. A monitor is a convenience that helps you check on your baby.' },
];

export default function BestBabyMonitorPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ArticleSchema title="Best Baby Monitor India 2026: Complete Buying Guide" description="What features really matter when choosing a baby monitor for Indian homes in 2026" url="https://nxmplis.com/blog/best-baby-monitor-india-2026" image="https://nxmplis.com/anvaya-nursery.jpg" datePublished="2026-04-28" dateModified="2026-05-01" author="Anvaya Smart Team" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Blog', url: 'https://nxmplis.com/blog' }, { name: 'Best Baby Monitor India 2026', url: 'https://nxmplis.com/blog/best-baby-monitor-india-2026' }]} />

      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
            <Link href="/">Home</Link> <span className="mx-2">›</span>
            <Link href="/blog">Blog</Link> <span className="mx-2">›</span>
            <span>Best Baby Monitor India 2026</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <PediatricianBadge />
            <LastUpdated date="2026-05-01" />
            <span className="text-xs text-muted-foreground bg-white px-2 py-0.5 rounded-full border border-[#e2dbd4]">10 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Best Baby Monitor India 2026:<br />
            <span style={{color:'#4a7c6f'}}>What Actually Matters</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">Most baby monitors sold in India were designed for Western homes, Western climates, and Western problems. Here's what Indian parents actually need — and why it matters.</p>
          <AuthorBio compact />
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-4xl py-12">

        <AISnippet question="What is the best baby monitor in India in 2026?" answer="The best baby monitor depends on what you want to know at night. Anvaya CORE (₹5,999) is a 1080P pan-tilt camera with cry alerts. Anvaya PULSE (from ₹8,900) adds a 4MP camera and AI face-cover and tummy-sleep alerts. Anvaya OMNI (from ₹12,999) adds contactless breathing and heart-rate tracking. All ship free across India with Cash on Delivery." />

        {/* Intro */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <strong>Why this guide exists:</strong> 90% of baby monitors available on Indian e-commerce are designed for Western climates — with wearables that cause rashes in Indian heat, no India warranty, and no support. We wrote this guide to help Indian parents choose what actually works here.
          </div>
        </div>

        {/* 6 criteria */}
        <h2 className="text-3xl font-bold mb-2 mt-4">6 Features Every Indian Parent Should Demand</h2>
        <p className="text-muted-foreground mb-8">Before you buy any baby monitor, ask whether it covers each of these. Most do not.</p>

        <div className="space-y-6 mb-12">
          {criteria.map((c, i) => (
            <div key={c.title} className="bg-white rounded-2xl border border-[#e2dbd4] p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <c.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                    <h3 className="font-bold text-base">{c.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{c.why}</p>
                  <div className="flex items-start gap-1.5 bg-[#e8f2ee] rounded-lg px-3 py-2">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs font-medium text-primary">{c.lookFor}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Anvaya section */}
        <div className="bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-2xl border-2 border-primary p-8 mb-12">
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">⭐ Our Top Pick for India 2026</div>
          <h2 className="text-2xl font-bold mb-2">Anvaya Smart — CORE, PULSE &amp; OMNI</h2>
          <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
            Designed in India for Indian homes. Choose the model that fits what you want to know at night: a clear camera, AI safety alerts, or contactless breathing and heart rate.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              'CORE: 1080P pan-tilt camera, cry alerts',
              'PULSE: 4MP, AI face-cover & tummy-sleep alerts',
              'OMNI: contactless breathing & heart rate',
              'Danger zones (PULSE & OMNI)',
              'Room temperature & humidity',
              'Free shipping + Cash on Delivery',
              '7-day returns',
              'WhatsApp support',
            ].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-3xl font-bold text-primary">From ₹5,999</span>
              <div className="text-xs text-muted-foreground mt-0.5">CORE ₹5,999 · PULSE from ₹8,900 · OMNI from ₹12,999</div>
            </div>
            <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2">
              <Link href="/anvaya">Compare &amp; Buy <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>

        {/* What to avoid */}
        <h2 className="text-3xl font-bold mb-4">What to Avoid When Buying in India</h2>
        <div className="space-y-3 mb-12">
          {[
            { flag: 'No India warranty', detail: 'If a product is listed as "import only" or has no Indian customer support number, returns and repairs are your problem — at your cost.' },
            { flag: 'Wearable-only monitoring', detail: 'Socks, clips and ankle bands have to be fitted every night and can be uncomfortable in Indian summers. A monitor that watches from beside the cot is simpler.' },
            { flag: 'No account security', detail: 'Choose a monitor whose app needs a password-protected account, and change any default passwords. Only share access with people you trust.' },
            { flag: '"Prevents SIDS" claims', detail: 'No consumer baby monitor has been shown to prevent SIDS. Be wary of any brand that claims it does, and follow safe-sleep advice from your paediatrician.' },
          ].map(item => (
            <div key={item.flag} className="flex gap-3 bg-white rounded-xl border border-[#e2dbd4] p-4">
              <div className="text-red-500 font-bold text-sm shrink-0 w-5">✗</div>
              <div>
                <div className="font-semibold text-sm">{item.flag}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-4">
          <h2 className="text-3xl font-bold mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e2dbd4] p-5">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <TrustBar />

        <div className="mt-10 bg-white rounded-2xl p-6 border border-[#e2dbd4]">
          <h3 className="font-bold mb-4">Related Guides</h3>
          <div className="space-y-2">
            {[
              { title: 'Baby Monitoring India: The Complete Guide', href: '/baby-monitoring' },
              { title: 'Baby Breathing Patterns: What\'s Normal and What\'s Not', href: '/blog/baby-breathing-patterns' },
              { title: 'Explore Anvaya Smart Models', href: '/anvaya' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />{l.title}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
