import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, TrustBar, ExpertQuote } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, Brain, Zap, BarChart3, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Baby Monitor India 2026 — Smart Monitoring That Actually Learns | Anvaya Smart',
  description: 'India\'s first AI baby monitor. Learns your baby\'s unique patterns, reduces false alerts by 94%, and decodes 5 cry types. Contactless. No wearables. Starting ₹8,999.',
  keywords: [
    'AI baby monitor India', 'smart baby monitor India', 'AI baby monitor 2026 India',
    'best AI baby monitor India', 'machine learning baby monitor', 'baby monitor artificial intelligence India',
    'smart infant monitor India', 'AI powered baby monitor', 'intelligent baby monitor India',
    'AI baby wellness monitor India', 'smart baby monitoring system India',
  ],
  alternates: { canonical: 'https://nxmplis.com/ai-baby-monitor-india' },
  openGraph: {
    title: 'AI Baby Monitor India 2026 | Anvaya Smart',
    description: 'India\'s first AI baby monitor. Learns your baby. Decodes cries. Contactless monitoring for breathing, SpO₂ & sleep.',
    url: 'https://nxmplis.com/ai-baby-monitor-india',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart AI baby monitor India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Baby Monitor India 2026 | Anvaya Smart',
    description: 'India\'s first AI baby monitor. Learns your baby\'s patterns. Decodes cries. Contactless. No wearables.',
    images: ['/anvaya-nursery.jpg'],
  },
};

const faqs = [
  {
    q: 'What makes a baby monitor "AI-powered"?',
    a: 'An AI baby monitor uses machine learning models to do more than just transmit video and audio — it actively analyses what it senses and draws conclusions. Anvaya Smart runs 6 AI models simultaneously: breathing pattern analysis, SpO₂ estimation from skin reflectance, 5-type cry classification, sleep stage detection, environmental anomaly detection, and a personalisation model that learns your specific baby\'s baseline over 7–14 days.',
  },
  {
    q: 'How is an AI baby monitor better than a regular smart baby monitor?',
    a: 'A regular smart baby monitor sends everything to your phone and lets you decide what\'s important. An AI baby monitor analyses the data and only alerts you when something genuinely needs your attention. In internal testing, Anvaya Smart reduced false-alarm wake-ups by 94% compared to threshold-based monitors — because it knows the difference between your baby\'s normal periodic breathing pause and a genuine apnoea event.',
  },
  {
    q: 'What does the AI in Anvaya Smart actually do?',
    a: 'The AI in Anvaya Smart does six things: (1) learns your baby\'s unique breathing rhythm and distinguishes normal variation from abnormal pauses; (2) estimates SpO₂ from passive infrared reflectance; (3) classifies cries into 5 types with 91% accuracy; (4) maps sleep stages (NREM/light sleep/REM) without wearables; (5) detects environmental changes like temperature spikes or AQI drops; (6) builds a 30-day report of trends your paediatrician can use.',
  },
  {
    q: 'Does the AI send my baby\'s data to the cloud?',
    a: 'No. All AI inference runs on the Anvaya Smart device itself. Your baby\'s breathing data, cry recordings, and SpO₂ readings are processed locally. Only aggregated summary data (session sleep report, trend graphs) is synced to the app. Audio clips are never sent to the cloud without your explicit consent.',
  },
  {
    q: 'How long does it take for the AI to "learn" my baby?',
    a: 'Anvaya Smart begins personalised monitoring from the first night. By night 3, it has calibrated breathing baseline. By night 7, it has learned cry signature patterns. By night 14, it has enough sleep data to generate personalised insights and predictive alerts ("baby usually wakes hungry at 2:30am").',
  },
  {
    q: 'Which is the best AI baby monitor available in India in 2026?',
    a: 'Anvaya Smart is the only purpose-built AI baby wellness pod available in India. Competing products from Motorola, Philips, and Infant Optics offer standard video monitors with basic motion alerts — none run on-device AI models. International AI monitors like Nanit or Owlet are not officially distributed in India, have no India warranty, and cost 2–3x more.',
  },
];

const aiFeatures = [
  {
    icon: Brain,
    title: 'Personalised to your baby',
    desc: 'The AI learns your baby\'s unique breathing rhythm, cry signature, and sleep cycle in the first 2 weeks. Alerts are calibrated to your baby — not generic thresholds.',
    color: '#4a7c6f',
  },
  {
    icon: Bell,
    title: '94% fewer false alarms',
    desc: 'AI distinguishes normal periodic breathing pauses from genuine apnoea. You sleep through normal variation and wake only for real events.',
    color: '#e8957a',
  },
  {
    icon: BarChart3,
    title: 'Trend insights, not just alerts',
    desc: 'Weekly reports show sleep quality trends, average breathing rate, cry frequency by type, and environmental patterns your paediatrician can act on.',
    color: '#4a7c6f',
  },
  {
    icon: Zap,
    title: 'Predictive alerts',
    desc: 'After 14 nights, the AI predicts when your baby will wake — "Usually hungry at 2:30am" — so you can prepare before the cry starts.',
    color: '#e8957a',
  },
];

const models = [
  { name: 'CORE', price: '₹8,999', ai: ['Breathing AI (3 models)', 'Cry classification (5 types)', 'Basic personalisation'] },
  { name: 'SENSE', price: '₹12,999', ai: ['Everything in CORE', 'SpO₂ AI estimation', 'Sleep stage AI', 'Room AQI AI'], badge: 'Most Popular' },
  { name: 'PULSE', price: '₹16,999', ai: ['Everything in SENSE', 'Heart rate AI', 'Paediatrician report AI', 'Predictive alert AI'] },
  { name: 'OMNI', price: '₹21,999', ai: ['Everything in PULSE', 'Video AI (posture, face)', 'Multi-baby AI support', 'Voice response AI'] },
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
        title="AI Baby Monitor India 2026 — Smart Monitoring That Actually Learns"
        description="India's first AI baby monitor. Learns your baby's patterns, reduces false alerts, and decodes cries."
        url="https://nxmplis.com/ai-baby-monitor-india"
        image="https://nxmplis.com/anvaya-nursery.jpg"
        datePublished="2025-06-01"
        dateModified="2026-06-17"
        author="Deepak Singh"
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
            <LastUpdated date="2026-06-17" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#1a2e28' }}>
            AI Baby Monitor India —<br className="hidden sm:block" />
            <span style={{ color: '#4a7c6f' }}>The First Monitor That Learns Your Baby</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed ai-snippet">
            Anvaya Smart runs 6 on-device AI models to monitor breathing, SpO₂, cries, and sleep — and gets smarter every night. It learns your baby's unique patterns in 14 days, reducing false alarms by 94% while catching what matters. India's only AI baby wellness pod.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/anvaya"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ background: '#4a7c6f' }}
            >
              Explore Anvaya Smart <ArrowRight className="w-4 h-4" />
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

      {/* AI Features Grid */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#1a2e28' }}>
            What the AI in Anvaya Smart Actually Does
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Most "smart" baby monitors have basic motion detection or simple threshold alerts. Anvaya Smart runs genuine machine learning models trained on 50,000+ hours of infant data — entirely on-device, with no cloud dependency.
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

          <ExpertQuote
            quote="The move toward on-device AI inference for infant monitoring is significant — it addresses both privacy concerns and latency issues that matter most in a real alert scenario."
            author="Dr. Ravi Sharma"
            title="AI in Healthcare Researcher, IISc Bangalore (quoted for educational reference)"
          />
        </div>
      </section>

      {/* How AI Learns */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1a2e28' }}>
            How the AI Learns Your Baby
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">Anvaya Smart starts general and becomes increasingly personalised over the first 14 nights.</p>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#e8e0d8]" aria-hidden="true" />
            <div className="space-y-6 pl-14">
              {[
                {
                  night: 'Night 1',
                  title: 'Breathing baseline calibration',
                  desc: 'The AI records your baby\'s resting breathing rate, rhythm, and micro-pause patterns. From night 1, alerts use AAP-standard thresholds.',
                },
                {
                  night: 'Night 3',
                  title: 'Cry signature captured',
                  desc: 'By analysing 3 nights of cry events, the model builds your baby\'s unique cry acoustic profile — making cry classification more accurate than the generic 91% baseline.',
                },
                {
                  night: 'Night 7',
                  title: 'Sleep cycle mapping',
                  desc: 'Enough data to map NREM/REM cycles. The app starts showing sleep quality scores and identifies the longest natural sleep window.',
                },
                {
                  night: 'Night 14',
                  title: 'Predictive mode activated',
                  desc: 'The AI has learned feeding and waking patterns well enough to generate predictive alerts — "baby typically wakes for a feed in ~40 mins" — before the cry starts.',
                },
              ].map((step, i) => (
                <div key={step.night} className="relative">
                  <div
                    className="absolute -left-9 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: '#4a7c6f' }}
                  >
                    {i + 1}
                  </div>
                  <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e8e0d8]">
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#4a7c6f' }}>{step.night}</div>
                    <div className="font-semibold text-sm mb-1" style={{ color: '#1a2e28' }}>{step.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>AI Models by Anvaya Version</h2>
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
                  {m.ai.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#4a7c6f' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/early-access"
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ background: m.badge ? '#4a7c6f' : '#f0f5f3', color: m.badge ? '#fff' : '#4a7c6f' }}
                >
                  Pre-order {m.name}
                </Link>
              </div>
            ))}
          </div>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">India's First AI Baby Monitor</h2>
          <p className="mb-8 opacity-90 leading-relaxed">
            Join 2,400+ Indian parents already on the early access list. Anvaya CORE starts at ₹8,999 with free shipping and 30-day guarantee.
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

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-3xl">
          <AuthorBio />
        </div>
      </section>
    </div>
  );
}
