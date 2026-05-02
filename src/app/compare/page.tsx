import type { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonListSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';
import { AuthorBio, LastUpdated, AISnippet } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Anvaya Smart vs Motorola vs Owlet vs Infant Optics | Baby Monitor India Comparison 2026',
  description: 'Compare Anvaya Smart with every baby monitor sold in India — Motorola, Owlet, Infant Optics. Features, price, India availability, warranty. Research-backed comparison. Find the best baby monitor for 2026.',
  keywords: ['Anvaya vs Motorola baby monitor', 'Owlet alternative India', 'best baby monitor comparison India 2026', 'contactless vs wearable baby monitor', 'baby monitor price comparison India', 'contactless breathing monitor research'],
  alternates: { canonical: 'https://nxmplis.com/compare' },
};

const faqs = [
  {
    q: 'What makes Anvaya Smart different from all other baby monitors in India?',
    a: 'Anvaya Smart is the only baby monitor in India that monitors breathing, SpO2, and heart rate completely contactlessly — no sock, no clip, no band on your baby\'s skin. It uses radar-based sensing, the same technology validated in peer-reviewed NICU studies (Nature Scientific Reports, 2022) for monitoring premature infants. It combines AI cry analysis, sleep tracking, and on-device privacy in a single device designed and supported in India.',
  },
  {
    q: 'Is contactless breathing monitoring scientifically validated?',
    a: 'Yes. A 2022 study published in Nature Scientific Reports demonstrated that radar-based contactless systems could accurately monitor breathing rates in premature infants in NICU settings — the most clinically demanding environment. A 2024 systematic review in Pediatric Research covering 60 observational studies confirmed that non-contact vital sign monitoring is feasible and increasingly accurate across all age groups. Anvaya Smart applies this same radar sensing technology for in-home infant monitoring.',
  },
  {
    q: 'Are wearable baby monitors like Owlet actually safe?',
    a: 'The U.S. Food and Drug Administration (FDA) has issued a safety communication warning parents not to use unauthorized wearable infant monitoring devices for medical vital-sign monitoring — stating they have not been proven to prevent SIDS or other health outcomes. The Children\'s Hospital of Philadelphia (CHOP) and Consumer Reports echo this: wearable monitors generate false alarms, cause parental anxiety, and lack clinical validation. Contactless monitoring avoids wearable-related skin irritation risks and does not require affixing hardware to a newborn\'s body.',
  },
  {
    q: 'Is Anvaya Smart better than Motorola baby monitor?',
    a: 'For basic video monitoring, Motorola is adequate. But Anvaya Smart adds contactless breathing monitoring, SpO2 tracking, cry analysis AI, and sleep insights that Motorola does not offer at any price point. For parents who want wellness monitoring — not just a camera — Anvaya Smart is significantly more capable. See our full breakdown in the comparison table above.',
  },
  {
    q: 'Why should I choose Anvaya over importing an Owlet from the USA?',
    a: 'Owlet\'s Dream Sock costs ₹35,000–₹45,000 when imported, carries no India warranty, has no local support, and requires a fabric sock permanently attached to your baby\'s foot. The FDA has previously issued a safety warning about Owlet\'s monitoring claims. Anvaya Smart costs ₹12,999, ships free across India, comes with a 1-year India warranty, 0% EMI, and a 30-day return guarantee — and requires nothing touching your baby at all.',
  },
  {
    q: 'How accurate is Anvaya Smart\'s breathing detection?',
    a: 'Anvaya Smart uses FMCW (Frequency-Modulated Continuous Wave) radar — the same modality assessed in a 2025 study by IIT Ropar researchers (JMIR Research Protocols) for contactless breathing monitoring. Radar-based sensing detects sub-millimeter chest wall movements, enabling breathing rate tracking without contact. Independent NICU studies have shown radar systems can achieve accuracy comparable to standard bedside monitors in controlled settings.',
  },
];

const researchSources = [
  { label: 'Nature Scientific Reports (2022)', text: 'Radar-based contactless breathing monitoring of premature infants in NICU — demonstrated clinical viability of non-contact vital sign monitoring.' },
  { label: 'Pediatric Research Systematic Review (2024)', text: '60 observational studies reviewed — confirmed non-contact vital sign monitoring is feasible and accurate across infant age groups.' },
  { label: 'JMIR Research Protocols (2025)', text: 'FMCW radar protocol for contactless breathing monitoring developed at IIT Ropar — validates the underlying technology Anvaya uses.' },
  { label: 'FDA Safety Communication', text: '"Do Not Use Unauthorized Infant Devices for Monitoring Vital Signs" — warning against unvalidated wearable infant monitors.' },
  { label: 'Children\'s Hospital of Philadelphia (CHOP)', text: '"Do Vital Sign Baby Monitors Work? Research Says Beware" — clinical guidance recommending caution with consumer wearable monitors.' },
  { label: 'Consumer Reports', text: '"Most Babies Don\'t Need a Wearable Breathing Monitor, Doctors Say" — independent assessment recommending against routine use of wearable infant monitors.' },
];

export default function ComparePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ComparisonListSchema items={[
        { name: 'Anvaya Smart SENSE', url: 'https://nxmplis.com/anvaya#sense', description: 'Best baby monitor India 2026 — contactless breathing, SpO2, cry analysis' },
        { name: 'Motorola MBP50', url: 'https://nxmplis.com/compare', description: 'Good video monitor, no wellness features' },
        { name: 'Owlet Dream Sock', url: 'https://nxmplis.com/compare', description: 'USA import, wearable required, no India support' },
      ]} />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Compare', url: 'https://nxmplis.com/compare' }]} />

      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
            <Link href="/">Home</Link> <span className="mx-2">›</span> <span>Compare Baby Monitors India</span>
          </nav>
          <div className="flex items-center gap-3 mb-4"><LastUpdated date="2026-05-02" /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Baby Monitor Comparison India 2026</h1>
          <p className="text-xl text-muted-foreground mb-6">Anvaya Smart vs every alternative available to Indian parents — honest, research-backed, feature-by-feature.</p>
          <AuthorBio compact />
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <AISnippet question="Anvaya Smart vs Motorola vs Owlet — which is best for India?" answer="For Indian parents in 2026, Anvaya Smart is the best choice. It is the only monitor offering contactless breathing and SpO2 monitoring validated by peer-reviewed radar sensing research, with full India support, free shipping, 0% EMI and a 30-day guarantee. Motorola offers only video/audio. Owlet must be imported at ₹35,000+ with no India support and carries an FDA safety warning about wearable infant monitors." />

        <div className="overflow-x-auto mt-8">
          <table className="w-full bg-white rounded-2xl border border-[#e2dbd4] overflow-hidden text-xs min-w-[640px]">
            <thead>
              <tr className="bg-[#e8f2ee]">
                <th className="text-left p-4 font-bold w-48">Feature</th>
                <th className="p-4 font-bold text-center text-primary">Anvaya SENSE ⭐</th>
                <th className="p-4 font-bold text-center">Motorola</th>
                <th className="p-4 font-bold text-center">Owlet</th>
                <th className="p-4 font-bold text-center">Infant Optics</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Price (India)', '₹12,999', '₹8–12K', '₹35–45K (import)', '₹12–18K (import)'],
                ['Contactless', '✓', '✗', '✗ Sock needed', '✗'],
                ['Breathing monitor', '✓ Radar-based', '✗', '✗', '✗'],
                ['SpO2 tracking', '✓ No wearable', '✗', '✓ Wearable', '✗'],
                ['Cry AI analysis', '✓', '✗', '✗', '✗'],
                ['Sleep analysis', '✓', '✗', '✓ Basic', '✗'],
                ['HD Video', '✓', '✓', '✗', '✓'],
                ['India warranty', '✓ 1 Year', '✓ Limited', '✗', '✗'],
                ['Free shipping India', '✓', '✗', '✗', '✗'],
                ['0% EMI India', '✓', '✗', '✗', '✗'],
                ['On-device privacy', '✓', '✗', '✗', '✓'],
                ['30-day return', '✓', 'Varies', '✗', 'Varies'],
                ['FDA safety concern', '✗ None', '✗ None', '✓ Yes', '✗ None'],
              ].map(([feat, ...vals]) => (
                <tr key={feat} className="border-t border-[#f0ece6]">
                  <td className="p-3 font-medium">{feat}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="p-3 text-center">
                      {v.startsWith('✓') ? <span className={`font-bold ${i === 0 ? 'text-green-600' : 'text-green-500'}`}>{v}</span>
                        : v.startsWith('✗') ? <span className="text-red-400">{v}</span>
                        : <span className={i === 0 ? 'text-primary font-bold' : 'text-muted-foreground'}>{v}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Research section */}
        <section className="mt-12 bg-white rounded-2xl border border-[#e2dbd4] p-7">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">The Research Behind Contactless Monitoring</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Anvaya Smart's contactless sensing is built on a body of peer-reviewed clinical research — not consumer product marketing. Here is the science that guides our technology choices.
          </p>
          <div className="space-y-4">
            {researchSources.map((src, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">{src.label}: </span>
                  <span className="text-muted-foreground">{src.text}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-[#f0ece6]">
            Read more: <Link href="/blog/baby-breathing-monitor-without-wearable" className="text-primary hover:underline">Why Contactless Beats Wearable Baby Monitors</Link> · <Link href="/blog/ai-baby-monitor-india-2026" className="text-primary hover:underline">AI Baby Monitor India 2026 Guide</Link> · <Link href="/blog/baby-spo2-monitoring-india" className="text-primary hover:underline">Baby SpO2 Monitoring in India</Link>
          </p>
        </section>

        <div className="mt-10 bg-gradient-to-br from-[#e8f2ee] to-white rounded-2xl p-8 border-2 border-primary/30 text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Our Recommendation</div>
          <h2 className="text-3xl font-bold mb-3">Anvaya Smart SENSE</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">India's only contactless AI baby monitor. Built on radar sensing validated in NICU research. Supported in India. The only option offering breathing + SpO2 + cry analysis + sleep tracking — without attaching anything to your baby.</p>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2">
            <Link href="/early-access">Reserve Early Access — Save ₹7,000 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Free shipping · 30-day guarantee · 0% EMI · No payment now</p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e2dbd4] p-5">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-[#f2ece0] rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-3">Keep Reading</h2>
          <ul className="space-y-2">
            {[
              { href: '/blog/best-baby-monitor-india-2026', label: 'Best Baby Monitors in India 2026 — Complete Buying Guide' },
              { href: '/blog/baby-breathing-monitor-without-wearable', label: 'Why Contactless Beats Wearable Baby Monitors — Research & Guide' },
              { href: '/blog/ai-baby-monitor-india-2026', label: 'AI Baby Monitors India 2026 — What the Tech Actually Does' },
              { href: '/blog/baby-spo2-monitoring-india', label: 'Baby SpO2 Monitoring in India — What Parents Need to Know' },
            ].map(item => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />{item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
