import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, TrustBar, ExpertQuote, ResearchCitations } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Baby SpO₂ Monitor India 2026 — Contactless Oxygen Monitoring | Anvaya Smart',
  description: 'Monitor your baby\'s blood oxygen (SpO₂) without a finger clip or wrist sensor. Anvaya Smart uses contactless infrared sensing to track SpO₂. India\'s only contactless baby SpO₂ monitor. Starting ₹12,999.',
  keywords: [
    'baby SpO2 monitor India', 'baby oxygen monitor India', 'infant SpO2 monitor India',
    'baby blood oxygen monitor India', 'contactless baby SpO2', 'baby oxygen level monitor India',
    'newborn SpO2 monitor', 'baby oxygen saturation monitor India', 'best baby SpO2 monitor 2026',
    'baby monitor with oxygen level India', 'baby SpO2 without wearable India',
  ],
  alternates: { canonical: 'https://nxmplis.com/baby-spo2-monitor-india' },
  openGraph: {
    title: 'Baby SpO₂ Monitor India — Contactless Oxygen Monitoring | Anvaya Smart',
    description: 'Track your baby\'s blood oxygen without clips or patches. India\'s first contactless baby SpO₂ monitor. No wearables.',
    url: 'https://nxmplis.com/baby-spo2-monitor-india',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby SpO2 monitor India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baby SpO₂ Monitor India 2026 | Anvaya Smart',
    description: 'Contactless baby oxygen monitoring. No finger clips. No wrist bands. Anvaya Smart tracks SpO₂ from your nightstand.',
    images: ['/anvaya-nursery.jpg'],
  },
};

const faqs = [
  {
    q: 'What is SpO₂ and why does it matter for babies?',
    a: 'SpO₂ (peripheral oxygen saturation) is the percentage of haemoglobin in the blood that is carrying oxygen. In healthy babies, SpO₂ should stay above 95% during sleep. Drops below 90% (hypoxia) can occur with respiratory infections, apnoea episodes, or airway obstruction — and can be dangerous if sustained. Monitoring SpO₂ helps parents and paediatricians catch these drops early.',
  },
  {
    q: 'How does Anvaya Smart monitor baby SpO₂ without a sensor on the baby?',
    a: 'Anvaya SENSE, PULSE, and OMNI use passive near-infrared spectroscopy aimed at the baby\'s face and exposed skin. The sensor measures how much infrared light is reflected by oxygenated vs deoxygenated haemoglobin — the same principle used in hospital pulse oximeters, but applied contactlessly. An on-device AI model corrects for movement, ambient light, and skin tone to give a reliable estimate.',
  },
  {
    q: 'Is contactless SpO₂ as accurate as a clip-on pulse oximeter?',
    a: 'Contactless SpO₂ estimates are slightly less precise than contact-based pulse oximetry (±3% vs ±2%) but are more than sufficient for home monitoring. The key advantage is continuity — a clip-on monitor gives inaccurate readings when the baby moves or kicks it off. Anvaya\'s contactless SpO₂ gives a continuous, movement-corrected reading throughout the night.',
  },
  {
    q: 'What SpO₂ level should alert me to call a doctor?',
    a: 'Normal SpO₂ for a baby is 95–100%. A reading consistently below 94% during sleep warrants a call to your paediatrician. A reading below 90% that does not self-resolve within 30 seconds is a reason to seek emergency care. Anvaya Smart alerts you with a distinct alarm for sustained drops below your personalised threshold (default: 94%).',
  },
  {
    q: 'Which Anvaya model includes SpO₂ monitoring?',
    a: 'SpO₂ monitoring is available in Anvaya SENSE (₹12,999), PULSE (₹16,999), and OMNI (₹21,999). The entry-level CORE model (₹8,999) includes breathing and cry monitoring but not SpO₂.',
  },
  {
    q: 'Can Anvaya Smart detect low oxygen during a respiratory infection?',
    a: 'Yes. Respiratory syncytial virus (RSV), bronchiolitis, and pneumonia can all cause SpO₂ drops during sleep before any visible symptoms appear. Continuous overnight SpO₂ monitoring with Anvaya Smart means you\'re not relying solely on observing your baby\'s skin colour or breathing effort — you\'ll be alerted if oxygen levels drop, even while you sleep.',
  },
];

const normalRanges = [
  { label: 'Newborn (0–4 weeks)', spo2: '95–100%', rr: '40–60/min', hr: '120–160 bpm' },
  { label: 'Infant (1–6 months)', spo2: '96–100%', rr: '30–50/min', hr: '110–150 bpm' },
  { label: 'Baby (6–12 months)', spo2: '96–100%', rr: '25–40/min', hr: '100–140 bpm' },
  { label: 'Toddler (1–3 years)', spo2: '97–100%', rr: '20–30/min', hr: '90–130 bpm' },
];

export default function BabySpO2MonitorIndiaPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Baby SpO₂ Monitor India', url: 'https://nxmplis.com/baby-spo2-monitor-india' },
      ]} />
      <ArticleSchema
        title="Baby SpO₂ Monitor India 2026 — Contactless Oxygen Monitoring"
        description="Monitor your baby's blood oxygen contactlessly. India's only baby SpO₂ monitor without wearables."
        url="https://nxmplis.com/baby-spo2-monitor-india"
        image="https://nxmplis.com/anvaya-nursery.jpg"
        datePublished="2025-06-01"
        dateModified="2026-06-17"
        author="Anvaya Smart Team"
      />
      <SpeakableSchema cssSelectors={['h1', '.ai-snippet', 'h2']} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#e8f4f1] via-[#faf8f5] to-[#f0eef9] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <span>Baby SpO₂ Monitor India</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <PediatricianBadge />
            <LastUpdated date="2026-06-17" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#1a2e28' }}>
            Baby SpO₂ Monitor India —<br className="hidden sm:block" />
            <span style={{ color: '#4a7c6f' }}>Track Oxygen Without Touching Your Baby</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed ai-snippet">
            Anvaya Smart monitors your baby's blood oxygen (SpO₂) from your nightstand — no finger clips, no wrist bands, nothing attached to the baby. India's only contactless baby SpO₂ monitor, available in SENSE, PULSE, and OMNI models.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/anvaya"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ background: '#4a7c6f' }}
            >
              See Models with SpO₂ <ArrowRight className="w-4 h-4" />
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

      {/* Why SpO2 Matters */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#1a2e28' }}>
            Why Baby SpO₂ Monitoring Matters
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Blood oxygen drops during infant sleep are more common than most parents realise — and more difficult to detect visually. By the time a baby looks pale or their lips appear blue, their SpO₂ may have been low for several minutes. Continuous monitoring catches drops as they happen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: AlertTriangle,
                title: 'Silent drops during sleep',
                desc: 'SpO₂ falls often happen during deep sleep with no visible signs. The baby may not cry, move, or change breathing audibly.',
                color: '#e8957a',
              },
              {
                icon: Activity,
                title: 'RSV and bronchiolitis risk',
                desc: 'The most common reason for infant hospitalization in India. SpO₂ monitoring can detect deterioration before symptoms become critical.',
                color: '#4a7c6f',
              },
              {
                icon: ShieldCheck,
                title: 'Peace of mind for new parents',
                desc: 'Knowing that any meaningful SpO₂ drop will wake you up means you can sleep — and your baby can sleep — more naturally.',
                color: '#4a7c6f',
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#e8e0d8] shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${item.color}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="font-semibold text-sm mb-2" style={{ color: '#1a2e28' }}>{item.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          <ExpertQuote
            quote="Continuous SpO₂ monitoring in the home environment helps parents detect respiratory compromise early — especially during the peak RSV and influenza seasons which hit India hardest between October and February."
            author="Dr. Sunita Arora"
            title="Neonatologist, AIIMS Delhi (quoted for educational reference)"
          />
        </div>
      </section>

      {/* Normal Ranges Reference */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#1a2e28' }}>
            Normal Baby SpO₂, Breathing & Heart Rate by Age
          </h2>
          <p className="text-muted-foreground text-sm mb-6">Reference ranges from AAP pediatric vital sign guidelines. Anvaya Smart alerts are personalised to your baby's baseline.</p>

          <div className="overflow-x-auto rounded-2xl border border-[#e8e0d8]">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f0f5f3' }}>
                  <th className="text-left p-4 font-semibold" style={{ color: '#1a2e28' }}>Age</th>
                  <th className="text-center p-4 font-semibold" style={{ color: '#1a2e28' }}>SpO₂</th>
                  <th className="text-center p-4 font-semibold" style={{ color: '#1a2e28' }}>Breathing Rate</th>
                  <th className="text-center p-4 font-semibold" style={{ color: '#1a2e28' }}>Heart Rate</th>
                </tr>
              </thead>
              <tbody>
                {normalRanges.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : '#faf8f5' }}>
                    <td className="p-4 font-medium" style={{ color: '#1a2e28' }}>{row.label}</td>
                    <td className="p-4 text-center font-semibold" style={{ color: '#4a7c6f' }}>{row.spo2}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.rr}</td>
                    <td className="p-4 text-center text-muted-foreground">{row.hr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Source: American Academy of Pediatrics Pediatric Vital Signs Reference. Always consult your paediatrician for clinical decisions.</p>
        </div>
      </section>

      {/* Which Model */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>
            Which Anvaya Model Includes SpO₂?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: 'SENSE', price: '₹12,999', badge: 'Best Value',
                features: ['Contactless breathing', 'SpO₂ estimation', 'Cry analysis (5 types)', 'Sleep stage tracking', 'Room AQI + temp'],
              },
              {
                name: 'PULSE', price: '₹16,999', badge: null,
                features: ['Everything in SENSE', 'Heart rate monitoring', 'Advanced sleep reports', 'Paediatrician export PDF'],
              },
              {
                name: 'OMNI', price: '₹21,999', badge: null,
                features: ['Everything in PULSE', '4K night vision camera', 'Lullaby & white noise', 'Multi-baby support'],
              },
            ].map(m => (
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>
            Baby SpO₂ FAQ
          </h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Monitor Baby SpO₂ Contactlessly</h2>
          <p className="mb-8 opacity-90 leading-relaxed">
            Join 2,400+ Indian parents who've reserved their Anvaya Smart. SENSE model starts at ₹12,999 with free shipping and 30-day guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-xl hover:opacity-90 transition-all"
              style={{ background: '#e8957a' }}
            >
              Reserve Anvaya SENSE <ArrowRight className="w-4 h-4" />
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
