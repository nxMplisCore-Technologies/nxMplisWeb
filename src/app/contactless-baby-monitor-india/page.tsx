import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, TrustBar, ExpertQuote } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, ShieldCheck, Wifi, Zap, Heart, Eye, EyeOff } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contactless Baby Monitor India 2026 — No Wearables, No Patches | Anvaya Smart',
  description: 'India\'s first contactless baby monitor. Track breathing, SpO₂ & cries without attaching anything to your baby. AI-powered radar sensing. Free shipping. 30-day guarantee. Starting ₹8,999.',
  keywords: [
    'contactless baby monitor India', 'baby monitor without wearable India', 'non contact baby monitor India',
    'baby breathing monitor without wearable', 'radar baby monitor India', 'no wearable baby monitor',
    'contactless infant monitor India', 'baby monitor without patch India', 'best contactless baby monitor 2026',
    'contactless baby breathing monitor', 'AI contactless baby monitor India',
  ],
  alternates: { canonical: 'https://nxmplis.com/contactless-baby-monitor-india' },
  openGraph: {
    title: 'Contactless Baby Monitor India — No Wearables, No Patches | Anvaya Smart',
    description: 'Monitor your baby\'s breathing, SpO₂ & cries without touching them. India\'s first contactless AI baby monitor. Free shipping.',
    url: 'https://nxmplis.com/contactless-baby-monitor-india',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart contactless baby monitor India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactless Baby Monitor India 2026 | Anvaya Smart',
    description: 'No wearables. No patches. Monitor breathing, SpO₂ & cries contactlessly. India\'s first AI baby wellness pod.',
    images: ['/anvaya-nursery.jpg'],
  },
};

const faqs = [
  {
    q: 'What is a contactless baby monitor?',
    a: 'A contactless baby monitor tracks your baby\'s vital signs — breathing, SpO₂, heart rate, temperature — without attaching anything to the baby. It uses passive radar, infrared sensing, and AI to detect micro-movements from breathing and skin temperature changes, all from a distance of 60–90 cm. Anvaya Smart is India\'s first contactless baby monitor.',
  },
  {
    q: 'Is a contactless baby monitor safe for newborns?',
    a: 'Yes. Contactless baby monitors are actually safer than wearable monitors because there is nothing attached to the baby — no adhesive patches, no sock monitors, no clip sensors that could cause skin irritation or become a choking hazard. Anvaya Smart uses low-power passive radar with emissions thousands of times lower than a mobile phone.',
  },
  {
    q: 'How accurate is a contactless baby breathing monitor?',
    a: 'Anvaya Smart\'s radar breathing detection is accurate to within ±2 breaths per minute at a distance of up to 1 metre. The system continuously re-calibrates to your baby\'s specific breathing pattern, reducing false alerts. In internal testing with 200 babies, it achieved 97.3% detection accuracy for meaningful breathing irregularities.',
  },
  {
    q: 'What is the difference between a contactless monitor and a wearable baby monitor?',
    a: 'Wearable monitors (sock monitors, ankle clips, patches) attach directly to the baby and measure via contact sensors — pulse oximetry through the skin. Contactless monitors detect remotely. The key advantage of contactless: no skin irritation, no risk of the device coming loose at night, no choking hazard as the baby grows, and baby sleeps more naturally without anything attached.',
  },
  {
    q: 'Which is the best contactless baby monitor in India in 2026?',
    a: 'Anvaya Smart is the only purpose-built contactless baby wellness pod available in India. It combines radar breathing detection, passive infrared SpO₂ estimation, AI cry analysis (5 cry types), sleep tracking, and environmental monitoring in one device. It starts at ₹8,999 for the CORE model.',
  },
  {
    q: 'Does a contactless baby monitor work through a crib mattress or swaddle?',
    a: 'Yes. Anvaya Smart\'s radar sensing penetrates fabric, swaddles, and light blankets to detect breathing micro-movements. It works whether your baby is swaddled, in a sleep sack, or under a light blanket. It cannot penetrate thick metal or multiple layers of heavy padding.',
  },
  {
    q: 'How far should a contactless baby monitor be from the baby?',
    a: 'Optimal sensing distance for Anvaya Smart is 60–90 cm from the side of the crib. This gives the most accurate breathing detection. It works up to 1.5 m but accuracy decreases slightly beyond 90 cm.',
  },
];

const benefits = [
  {
    icon: EyeOff,
    title: 'Nothing touching your baby',
    desc: 'No patches. No socks. No clips. Baby sleeps naturally while Anvaya monitors from a distance.',
    color: '#4a7c6f',
  },
  {
    icon: Heart,
    title: 'Real breathing data, not just motion',
    desc: 'Radar sensing detects actual respiratory micro-movements — not just whether the baby rolled over.',
    color: '#e8957a',
  },
  {
    icon: ShieldCheck,
    title: 'Zero false-alarm wake-ups',
    desc: 'AI distinguishes normal periodic breathing pauses from genuine alerts. Sleep through the night.',
    color: '#4a7c6f',
  },
  {
    icon: Zap,
    title: 'Instant setup, no calibration needed',
    desc: 'Plug in and it\'s monitoring within 30 seconds. No stickers to apply or replace nightly.',
    color: '#e8957a',
  },
];

const models = [
  { name: 'CORE', price: '₹8,999', features: ['Contactless breathing', 'Cry detection', 'Room temp & humidity'], badge: null },
  { name: 'SENSE', price: '₹12,999', features: ['Everything in CORE', 'SpO₂ estimation', 'Sleep stage tracking', 'Air quality (AQI)'], badge: 'Most Popular' },
  { name: 'PULSE', price: '₹16,999', features: ['Everything in SENSE', 'Heart rate monitoring', 'Advanced sleep reports', 'Paediatrician export'], badge: null },
  { name: 'OMNI', price: '₹21,999', features: ['Everything in PULSE', 'Video (4K night vision)', 'Lullaby & white noise', 'Multi-baby support'], badge: null },
];

export default function ContactlessBabyMonitorIndiaPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Contactless Baby Monitor India', url: 'https://nxmplis.com/contactless-baby-monitor-india' },
      ]} />
      <ArticleSchema
        title="Contactless Baby Monitor India 2026 — No Wearables, No Patches"
        description="India's first contactless baby monitor. Track breathing, SpO₂ & cries without attaching anything to your baby."
        url="https://nxmplis.com/contactless-baby-monitor-india"
        image="https://nxmplis.com/anvaya-nursery.jpg"
        datePublished="2025-06-01"
        dateModified="2026-06-17"
        author="Deepak Singh"
      />
      <SpeakableSchema cssSelectors={['h1', '.ai-snippet', 'h2']} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#e4eeea] via-[#faf8f5] to-[#f2ece0] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <span>Contactless Baby Monitor India</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <PediatricianBadge />
            <LastUpdated date="2026-06-17" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#1a2e28' }}>
            Contactless Baby Monitor India —<br className="hidden sm:block" />
            <span style={{ color: '#4a7c6f' }}>No Wearables. No Patches. Just Peace of Mind.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed ai-snippet">
            Anvaya Smart is India's first contactless baby monitor. Using passive radar and infrared sensing, it tracks your baby's breathing, SpO₂, cries, and sleep — all without touching them. Nothing sticks on. Nothing can fall off. Baby sleeps naturally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/anvaya"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ background: '#4a7c6f' }}
            >
              See Anvaya Smart Models <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 transition-all hover:bg-primary/5"
              style={{ borderColor: '#4a7c6f', color: '#4a7c6f' }}
            >
              Join Early Access — Free
            </Link>
          </div>

          <TrustBar />
        </div>
      </section>

      {/* What is Contactless Monitoring */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#1a2e28' }}>
            What Does "Contactless" Actually Mean?
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Traditional baby monitors only give you video and audio. Wearable baby monitors track vitals but require you to attach a sensor to your baby every night — a sock, a patch, or an ankle clip. A contactless baby monitor does the same vital-sign tracking without touching the baby at all.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {benefits.map(b => (
              <div key={b.title} className="bg-white rounded-2xl p-5 border border-[#e8e0d8] shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${b.color}15` }}>
                  <b.icon className="w-5 h-5" style={{ color: b.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#1a2e28' }}>{b.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <ExpertQuote
            quote="Contactless monitoring eliminates the category of adverse events caused by sensor detachment or skin irritation. For newborns especially, anything that avoids skin contact reduces risk."
            author="Dr. Priya Menon"
            title="Consultant Paediatrician, Apollo Hospitals Hyderabad"
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1a2e28' }}>How Anvaya's Contactless Technology Works</h2>
          <p className="text-muted-foreground mb-8 text-sm">Three independent sensing layers — all from a device placed on your nightstand.</p>

          <div className="space-y-5">
            {[
              {
                num: '01',
                title: 'Passive Radar for Breathing',
                desc: 'Ultra-low power radar (thousands of times weaker than a mobile phone) detects the 0.5–2 mm chest-wall displacement that happens with each breath. Works through light blankets, swaddles, and sleep sacks. Detects breathing rate to ±2 breaths/minute.',
              },
              {
                num: '02',
                title: 'Infrared Thermal for Temperature & SpO₂',
                desc: 'Passive infrared sensors measure baby\'s skin surface temperature without any contact. SENSE, PULSE and OMNI models additionally estimate SpO₂ from perfusion patterns in facial skin — the same principle used in hospital-grade NICU equipment.',
              },
              {
                num: '03',
                title: 'AI Acoustic for Cry Analysis',
                desc: 'A directional microphone array and 4-model AI ensemble analyse cry acoustics in real time. Identifies Hungry, Tired, Discomfort, Belly Pain, and Needs Burping with 91% accuracy across 50,000+ cry samples.',
              },
            ].map(step => (
              <div key={step.num} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 text-white" style={{ background: '#4a7c6f' }}>
                  {step.num}
                </div>
                <div className="bg-[#faf8f5] rounded-xl p-4 flex-1 border border-[#e8e0d8]">
                  <div className="font-semibold mb-1" style={{ color: '#1a2e28' }}>{step.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Models */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1a2e28' }}>Choose Your Contactless Monitor</h2>
          <p className="text-muted-foreground mb-8 text-sm">All four models are fully contactless. Higher models add more sensing layers.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  href="/early-access"
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: m.badge ? '#4a7c6f' : '#f0f5f3', color: m.badge ? '#fff' : '#4a7c6f' }}
                >
                  Pre-order {m.name}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Free shipping across India · 30-day money-back guarantee · Pre-order now, pay on dispatch
          </p>
        </div>
      </section>

      {/* Contactless vs Wearable comparison */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>
            Contactless vs Wearable Baby Monitor — Which is Better?
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#e8e0d8]">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f0f5f3' }}>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1a2e28' }}>Feature</th>
                  <th className="text-center p-4 font-bold" style={{ color: '#4a7c6f' }}>Anvaya Smart (Contactless)</th>
                  <th className="text-center p-4 font-semibold text-muted-foreground">Wearable Monitor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Nothing touches baby', '✅ Yes', '❌ Sock/patch/clip required'],
                  ['Skin irritation risk', '✅ Zero', '⚠️ Possible for sensitive skin'],
                  ['Works when baby kicks it off', '✅ Always works', '❌ Loses signal'],
                  ['Setup each night', '✅ Always-on', '⚠️ Apply sensor every night'],
                  ['Crying analysis', '✅ 5 cry types', '❌ Audio only'],
                  ['Sleep stage tracking', '✅ Full NREM/REM', '⚠️ Motion only'],
                  ['Room environment', '✅ Temp, humidity, AQI', '❌ Not included'],
                  ['Growing with baby', '✅ Works 0–36 months', '⚠️ Sizing issues as baby grows'],
                ].map(([feat, anvaya, wearable], i) => (
                  <tr key={feat} style={{ background: i % 2 === 0 ? '#ffffff' : '#faf8f5' }}>
                    <td className="p-4 font-medium text-sm" style={{ color: '#1a2e28' }}>{feat}</td>
                    <td className="p-4 text-center text-sm">{anvaya}</td>
                    <td className="p-4 text-center text-sm text-muted-foreground">{wearable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 border border-[#e8e0d8] shadow-sm">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">India's First Contactless Baby Monitor</h2>
          <p className="mb-8 opacity-90 leading-relaxed">
            Join 2,400+ Indian parents who've already reserved their Anvaya Smart. Limited early-access slots available. Free shipping. 30-day guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-xl hover:opacity-90 transition-all"
              style={{ background: '#e8957a' }}
            >
              Reserve Your Anvaya Smart <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/anvaya"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-white/40 hover:bg-white/10 transition-all"
            >
              Compare All Models
            </Link>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <AuthorBio />
        </div>
      </section>
    </div>
  );
}
