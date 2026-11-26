import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, TrustBar } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, Shield, Baby, Zap, Moon } from 'lucide-react';
import { cartUrl } from '@/lib/shopify';

// Buy button goes straight to Shopify checkout (PULSE, no display)
const BUY_PULSE = cartUrl('50745881690335') ?? '/anvaya/pulse';

const UPDATED = '2026-11-24';

export const metadata: Metadata = {
  title: 'AI Baby Monitor India 2026 — Smart Safety Alerts',
  description: 'AI baby monitors with 4MP night vision, face-cover and tummy-sleep alerts, danger zones and cry alerts. OMNI adds breathing & heart rate. From ₹5,999.',
  keywords: [
    'AI baby monitor India', 'AI baby monitor', 'smart baby monitor India', 'AI baby monitor night vision',
    'best AI baby monitor India', 'baby monitor face cover alert', 'baby rollover alert',
    'baby tummy sleep alert', 'cry detection baby monitor', 'AI baby camera India', 'baby monitor with AI',
  ],
  alternates: { canonical: 'https://nxmplis.com/ai-baby-monitor-india' },
  openGraph: {
    title: 'AI Baby Monitor India 2026 | Anvaya Smart',
    description: 'AI face-cover and tummy-sleep alerts, danger zones, 4MP night vision. OMNI adds contactless breathing & heart rate.',
    url: 'https://nxmplis.com/ai-baby-monitor-india',
    images: [{ url: '/anvaya-pulse-02-ai-safety-alerts.jpg', width: 1200, height: 630, alt: 'Anvaya Smart AI baby monitor safety alerts' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Baby Monitor India 2026 | Anvaya Smart',
    description: 'AI face-cover and tummy-sleep alerts, danger zones, 4MP night vision. From ₹5,999.',
    images: ['/anvaya-pulse-02-ai-safety-alerts.jpg'],
  },
};

const faqs = [
  {
    q: 'What does an AI baby monitor do that a normal camera does not?',
    a: 'A normal baby camera only streams video and sound, so you have to keep watching. An AI baby monitor looks at the picture for you and sends an alert when something needs your attention. On Anvaya PULSE and OMNI, the AI recognises when your baby\'s face is covered, when they roll onto their tummy, and when they move into a danger zone you have drawn in the app.',
  },
  {
    q: 'Which Anvaya models have AI alerts?',
    a: 'PULSE and OMNI have AI face-cover and tummy-sleep (prone) alerts and danger zones. OMNI also tracks breathing and heart rate contactlessly and gives a nightly sleep report. CORE is a 1080P pan-tilt camera with cry and motion alerts, two-way talk and room temperature.',
  },
  {
    q: 'Does the AI baby monitor work at night?',
    a: 'Yes. All Anvaya models have infrared night vision, so the camera and AI alerts work in a dark room. PULSE and OMNI use a 4MP camera for a sharper night picture.',
  },
  {
    q: 'Is an AI baby monitor a medical device?',
    a: 'No. Anvaya monitors are wellness and convenience monitors that help you keep an eye on your baby. They are not medical devices and do not diagnose, treat or prevent any condition. Always follow safe-sleep advice from your paediatrician.',
  },
  {
    q: 'What is the price of an AI baby monitor in India?',
    a: 'Anvaya CORE is ₹5,999. PULSE (AI safety alerts) is ₹8,900, or ₹15,999 with a 5.5-inch parent display. OMNI (AI alerts plus contactless breathing and heart rate) is ₹12,999, or ₹18,999 with the display. Free shipping across India, Cash on Delivery and 7-day returns.',
  },
  {
    q: 'Can I use the monitor on my phone and on a separate screen?',
    a: 'Yes. Every model works with the Anvaya app on Android and iPhone. PULSE and OMNI are also available with a dedicated 5.5-inch parent display, so you can watch without your phone.',
  },
];

const aiFeatures = [
  { icon: Shield, title: 'Face-cover alert', desc: 'If a blanket or toy covers your baby\'s face, PULSE and OMNI send an alert to your phone or parent display.', color: '#4a7c6f' },
  { icon: Baby, title: 'Tummy-sleep alert', desc: 'The AI notices when your baby rolls onto their tummy, so you can check on them.', color: '#e8957a' },
  { icon: Zap, title: 'Danger zones', desc: 'Draw a zone in the app, such as the edge of the bed. If your baby moves into it, you are notified.', color: '#4a7c6f' },
  { icon: Moon, title: 'Breathing, heart rate & sleep (OMNI)', desc: 'OMNI tracks breathing and heart rate without anything on your baby, and gives a sleep report every morning.', color: '#e8957a' },
];

const models = [
  { name: 'CORE', slug: 'core', price: '₹5,999', features: ['1080P pan-tilt camera (355° / 120°)', 'Cry and motion alerts', 'Two-way talk + lullabies', 'Room temperature & humidity'] },
  { name: 'PULSE', slug: 'pulse', price: 'from ₹8,900', features: ['4MP camera with night vision', 'AI face-cover alert', 'AI tummy-sleep alert', 'Danger zones + timeline album'] },
  { name: 'OMNI', slug: 'omni', price: 'from ₹12,999', features: ['Everything in PULSE', 'Contactless breathing tracking', 'Contactless heart-rate tracking', 'Nightly sleep report + one-tap calling'], badge: 'Most Popular' },
];

export default function AIBabyMonitorIndiaPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'AI Baby Monitor India', url: 'https://nxmplis.com/ai-baby-monitor-india' },
      ]} />
      <ArticleSchema
        title="AI Baby Monitor India 2026 — Face-Cover, Tummy-Sleep & Cry Alerts"
        description="What an AI baby monitor does, which Anvaya model has which AI alerts, and prices in India."
        url="https://nxmplis.com/ai-baby-monitor-india"
        image="https://nxmplis.com/anvaya-pulse-02-ai-safety-alerts.jpg"
        datePublished="2025-06-01"
        dateModified={UPDATED}
        author="Anvaya Smart Team"
      />
      <SpeakableSchema cssSelectors={['h1', '.ai-snippet', 'h2']} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0f5f3] via-[#faf8f5] to-[#f2ece0] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <span>AI Baby Monitor India</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <PediatricianBadge />
            <LastUpdated date={UPDATED} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#1a2e28' }}>
            AI Baby Monitor India —<br className="hidden sm:block" />
            <span style={{ color: '#4a7c6f' }}>Alerts When It Matters, Not Just Video</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed ai-snippet">
            Anvaya Smart AI baby monitors watch the cot for you. PULSE and OMNI alert you when your baby&apos;s face is covered, when they roll onto their tummy, or when they move into a danger zone. OMNI also tracks breathing and heart rate without anything touching your baby. Prices start at ₹5,999, with free shipping and Cash on Delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href={BUY_PULSE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ background: '#4a7c6f' }}
            >
              Buy PULSE · from ₹8,900 <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/anvaya/pulse"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 transition-all hover:bg-primary/5"
              style={{ borderColor: '#4a7c6f', color: '#4a7c6f' }}
            >
              See PULSE details
            </Link>
          </div>

          <TrustBar />
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#1a2e28' }}>
            What the AI in Anvaya Actually Does
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Most baby cameras only stream video and beep at loud sounds. Anvaya&apos;s AI looks at what the camera sees and tells you about the moments worth checking. Looking for breathing and heart-rate tracking without a wearable instead? See how a <Link href="/contactless-baby-monitor-india" className="text-primary underline">contactless baby monitor</Link> works.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {aiFeatures.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 border border-[#e8e0d8] shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${f.color}15` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#1a2e28' }}>{f.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to choose */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1a2e28' }}>
            Which AI Baby Monitor Is Right for You?
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">A quick way to choose, based on what you want to know at night.</p>
          <div className="space-y-4">
            {[
              { title: 'I mainly want to see and hear my baby', desc: 'Choose CORE: a clear 1080P pan-tilt camera, cry alerts and two-way talk, at ₹5,999.' },
              { title: 'I worry about the face getting covered or tummy sleeping', desc: 'Choose PULSE: AI face-cover and tummy-sleep alerts, danger zones and a sharper 4MP camera.' },
              { title: 'I want breathing and heart-rate readings too', desc: 'Choose OMNI: everything in PULSE plus contactless breathing and heart-rate tracking and a sleep report every morning.' },
            ].map(step => (
              <div key={step.title} className="bg-[#faf8f5] rounded-xl p-4 border border-[#e8e0d8]">
                <div className="font-semibold text-sm mb-1" style={{ color: '#1a2e28' }}>{step.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>Anvaya Models &amp; Prices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {models.map(m => (
              <div
                key={m.name}
                className="bg-white rounded-2xl p-5 border shadow-sm flex flex-col relative"
                style={{ borderColor: m.badge ? '#4a7c6f' : '#e8e0d8', borderWidth: m.badge ? 2 : 1 }}
              >
                {m.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: '#4a7c6f' }}>
                    {m.badge}
                  </span>
                )}
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#4a7c6f' }}>ANVAYA</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#1a2e28' }}>{m.name}</div>
                <div className="text-xl font-bold mb-4" style={{ color: '#e8957a' }}>{m.price}</div>
                <ul className="space-y-2 flex-1 mb-5">
                  {m.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#4a7c6f' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/anvaya/${m.slug}`}
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ background: m.badge ? '#4a7c6f' : '#f0f5f3', color: m.badge ? '#fff' : '#4a7c6f' }}
                >
                  View {m.name}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">PULSE and OMNI are also available with a 5.5-inch parent display. Free shipping across India.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>AI Baby Monitor FAQ</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-2xl p-5 border border-[#e8e0d8] bg-[#faf8f5]">
                <h3 className="font-semibold mb-2 text-sm" style={{ color: '#1a2e28' }}>{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-br from-[#4a7c6f] to-[#3a6a5e] text-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let the AI Watch the Cot With You</h2>
          <p className="mb-8 opacity-90 leading-relaxed">
            CORE from ₹5,999 · PULSE from ₹8,900 · OMNI from ₹12,999. Free shipping, Cash on Delivery and 7-day returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anvaya"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-xl hover:opacity-90 transition-all"
              style={{ background: '#e8957a' }}
            >
              Shop Anvaya Smart <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-white/40 hover:bg-white/10 transition-all"
            >
              Types of Baby Monitors Explained
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <AuthorBio />
        </div>
      </section>
    </div>
  );
}
