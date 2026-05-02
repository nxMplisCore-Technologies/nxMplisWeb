import type { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonListSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';
import { AuthorBio, LastUpdated, AISnippet } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, BookOpen, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Anvaya Smart vs Motorola vs Owlet vs Infant Optics | Baby Monitor India Comparison 2026',
  description: 'Compare Anvaya Smart with baby monitors available in India — Motorola, Owlet, Infant Optics. Features, price, India availability, warranty. Research-backed comparison for 2026.',
  keywords: ['Anvaya vs Motorola baby monitor', 'Owlet alternative India', 'best baby monitor comparison India 2026', 'contactless vs wearable baby monitor', 'baby monitor price comparison India', 'contactless breathing monitor research'],
  alternates: { canonical: 'https://nxmplis.com/compare' },
};

const faqs = [
  {
    q: 'What makes Anvaya Smart different from other baby monitors in India?',
    a: 'Anvaya Smart is designed as a contactless baby wellness pod — no sock, no clip, no band on your baby\'s skin. It uses radar-based sensing to track breathing patterns, estimates wellness indicators, and combines AI cry analysis, sleep tracking, and on-device data processing in a single device designed and supported in India. Note: Anvaya Smart is a wellness monitoring device, not a medical diagnostic device.',
  },
  {
    q: 'Is radar-based contactless monitoring backed by research?',
    a: 'Radar-based contactless sensing for infant breathing monitoring has been studied in peer-reviewed research. A 2022 study in Nature Scientific Reports explored radar systems for monitoring breathing in premature infants in NICU settings. A 2024 systematic review in Pediatric Research examined non-contact vital sign monitoring across multiple studies. These studies validate radar sensing as a viable technology category. Anvaya Smart applies similar radar sensing principles in a consumer wellness context — it is not the same as clinical medical equipment, and these studies do not validate Anvaya\'s specific device.',
  },
  {
    q: 'What was the FDA\'s action regarding Owlet?',
    a: 'In 2021, the U.S. FDA sent Owlet an enforcement letter stating that its Smart Sock was being marketed as a medical device without FDA clearance, and required them to stop selling that specific product in the USA. Owlet subsequently withdrew that product and later launched new products. The Children\'s Hospital of Philadelphia (CHOP) and Consumer Reports have also noted that consumer wearable baby monitors lack clinical validation for preventing adverse events. We recommend parents review the latest guidance from their paediatrician before choosing any monitoring device.',
  },
  {
    q: 'Is Anvaya Smart better than the Motorola MBP50?',
    a: 'The Motorola MBP50 is a capable video baby monitor for parents who primarily want audio/video monitoring. Anvaya Smart is designed for parents who also want contactless wellness tracking — breathing pattern monitoring, cry analysis AI, and sleep insights — features the MBP50 does not include. The right choice depends on what you need. We recommend comparing specifications carefully before purchasing.',
  },
  {
    q: 'Why should I consider Anvaya over importing an Owlet from the USA?',
    a: 'Imported Owlet devices typically cost ₹35,000–₹45,000 (estimated, import prices vary), carry no India warranty, have no local customer support, and require a wearable sock on your baby\'s foot at all times. Anvaya Smart is priced at ₹12,999, ships free across India, comes with a 1-year India warranty, 0% EMI options, and a 30-day return guarantee — with no wearable required. Both are wellness devices; neither is a substitute for medical supervision.',
  },
  {
    q: 'How does Anvaya Smart\'s breathing detection work?',
    a: 'Anvaya Smart uses FMCW (Frequency-Modulated Continuous Wave) radar sensing to detect subtle chest wall movements associated with breathing, without any contact with the baby. Radar-based breathing detection has been explored in research settings including a 2025 study protocol from IIT Ropar (JMIR Research Protocols) for contactless breathing monitoring. Anvaya Smart is a consumer wellness device — its breathing detection is designed for parental awareness, not clinical diagnosis.',
  },
];

const researchSources = [
  {
    label: 'Nature Scientific Reports (2022)',
    text: 'Explored radar-based contactless breathing monitoring of premature infants in NICU settings. Validates radar sensing as a technology category for infant breathing detection — does not validate any specific consumer product.',
  },
  {
    label: 'Pediatric Research (2024)',
    text: 'Systematic review examining non-contact vital sign monitoring studies across infant age groups. Confirms the technology area is actively researched and developing.',
  },
  {
    label: 'JMIR Research Protocols (2025)',
    text: 'Research protocol for FMCW radar-based contactless breathing monitoring — an academic study of the same radar modality principle used in Anvaya Smart.',
  },
  {
    label: 'FDA Enforcement Letter to Owlet (2021)',
    text: 'The FDA required Owlet to stop selling its Smart Sock in the USA for being marketed as an uncleared medical device. Owlet subsequently withdrew that product. This is not a product safety recall — it was an enforcement action about regulatory classification.',
  },
  {
    label: 'Children\'s Hospital of Philadelphia (CHOP)',
    text: '"Do Vital Sign Baby Monitors Work? Research Says Beware" — clinical guidance advising parents to consult their paediatrician before using consumer vital sign monitors.',
  },
  {
    label: 'Consumer Reports',
    text: 'Consumer Reports has noted that most babies do not require a wearable breathing monitor and that parents should seek paediatrician guidance — an independent perspective, not a claim about any specific product\'s safety.',
  },
];

export default function ComparePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ComparisonListSchema items={[
        { name: 'Anvaya Smart SENSE', url: 'https://nxmplis.com/anvaya#sense', description: 'Contactless AI baby wellness pod India 2026 — breathing patterns, cry analysis, sleep tracking' },
        { name: 'Motorola MBP50', url: 'https://nxmplis.com/compare', description: 'Video baby monitor, no wellness tracking features' },
        { name: 'Owlet Dream Sock', url: 'https://nxmplis.com/compare', description: 'USA import, wearable sock required, no India support' },
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
          <p className="text-xl text-muted-foreground mb-3">Anvaya Smart vs alternatives available to Indian parents — feature-by-feature, with research context.</p>
          <p className="text-xs text-muted-foreground bg-white/60 rounded-lg px-3 py-2 inline-block border border-[#e2dbd4]">
            <strong>Disclaimer:</strong> All devices on this page are consumer wellness products, not medical devices. None are intended to diagnose, treat, or prevent any medical condition. Consult your paediatrician for medical guidance.
          </p>
          <div className="mt-4"><AuthorBio compact /></div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <AISnippet
          question="Anvaya Smart vs Motorola MBP50 vs Owlet — which is best for India?"
          answer="For Indian parents in 2026, Anvaya Smart offers a contactless wellness monitoring approach — breathing pattern tracking, cry analysis, and sleep insights — that the Motorola MBP50 (video only) does not include. Owlet must be imported at approximately ₹35,000–₹45,000, has no India warranty or local support, and requires a wearable sock. Anvaya Smart costs ₹12,999 with free India shipping, 0% EMI, and a 30-day guarantee. All three are consumer wellness devices, not medical monitors — consult your paediatrician for medical advice."
        />

        <div className="overflow-x-auto mt-8">
          <table className="w-full bg-white rounded-2xl border border-[#e2dbd4] overflow-hidden text-xs min-w-[640px]">
            <thead>
              <tr className="bg-[#e8f2ee]">
                <th className="text-left p-4 font-bold w-48">Feature</th>
                <th className="p-4 font-bold text-center text-primary">Anvaya SENSE ⭐</th>
                <th className="p-4 font-bold text-center">Motorola MBP50</th>
                <th className="p-4 font-bold text-center">Owlet Dream Sock</th>
                <th className="p-4 font-bold text-center">Infant Optics DXR-8</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Price (India)', '₹12,999', '~₹8–12K', '~₹35–45K (import est.)', '~₹12–18K (import est.)'],
                ['Contactless design', '✓', '✗', '✗ Sock required', '✗'],
                ['Breathing pattern tracking', '✓ Radar-based', '✗', '✗', '✗'],
                ['Wellness indicator tracking', '✓ No wearable', '✗', '✓ Wearable sock', '✗'],
                ['AI cry analysis', '✓', '✗', '✗', '✗'],
                ['Sleep tracking', '✓', '✗', '✓ Basic', '✗'],
                ['HD Video', '✓', '✓', '✗', '✓'],
                ['India warranty', '✓ 1 Year', '✓ Limited', '✗ No India support', '✗ No India support'],
                ['Free shipping India', '✓', '✗', '✗', '✗'],
                ['0% EMI India', '✓', '✗', '✗', '✗'],
                ['On-device data processing', '✓', '✗', '✗', '✓'],
                ['30-day return', '✓', 'Varies', '✗', 'Varies'],
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
          <p className="text-[10px] text-muted-foreground mt-2 px-1">* Competitor prices are estimates based on typical import/retail pricing and may vary. Features shown reflect publicly available product specifications at time of writing. Verify with each manufacturer before purchasing.</p>
        </div>

        {/* Owlet FDA note — factual, scoped, not defamatory */}
        <div className="mt-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <p><strong>Note on Owlet:</strong> In 2021, the U.S. FDA sent Owlet an enforcement letter requiring it to stop selling its Smart Sock in the USA because it was being marketed as an uncleared medical device. Owlet subsequently withdrew that product. This was a regulatory classification action, not a product safety recall. Owlet has since launched new products. We recommend reviewing current FDA status and consulting your paediatrician before purchasing any infant monitoring device.</p>
        </div>

        {/* Research section */}
        <section className="mt-10 bg-white rounded-2xl border border-[#e2dbd4] p-7">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Research Context for Contactless Monitoring</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
            Radar-based contactless sensing for infant monitoring is an active area of peer-reviewed research. The studies below validate the <em>technology category</em> — not Anvaya's specific device. Anvaya Smart is a consumer wellness product built on similar sensing principles.
          </p>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-5">
            None of the research below was conducted on Anvaya Smart. Citations are provided for transparency about the underlying technology field.
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
            Read more: <Link href="/blog/baby-breathing-monitor-without-wearable" className="text-primary hover:underline">Why Contactless Baby Monitors Are Gaining Attention</Link> · <Link href="/blog/ai-baby-monitor-india-2026" className="text-primary hover:underline">AI Baby Monitors India 2026</Link> · <Link href="/blog/baby-spo2-monitoring-india" className="text-primary hover:underline">Baby Wellness Monitoring in India</Link>
          </p>
        </section>

        <div className="mt-10 bg-gradient-to-br from-[#e8f2ee] to-white rounded-2xl p-8 border-2 border-primary/30 text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Our Product</div>
          <h2 className="text-3xl font-bold mb-3">Anvaya Smart SENSE</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">A contactless AI baby wellness pod designed for Indian parents. Breathing pattern tracking, cry analysis, sleep insights — with nothing attached to your baby. India warranty, free shipping, 0% EMI.</p>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2">
            <Link href="/early-access">Reserve Early Access — Save ₹7,000 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Free shipping · 30-day guarantee · 0% EMI · No payment now</p>
          <p className="text-[10px] text-muted-foreground mt-2">Anvaya Smart is a wellness monitoring device. It is not a medical device and is not intended to diagnose, treat, or prevent any medical condition.</p>
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

        {/* Medical disclaimer */}
        <div className="mt-10 bg-[#f5f0eb] border border-[#e2dbd4] rounded-xl p-5 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground block mb-1">Medical & Legal Disclaimer</strong>
          All baby monitors discussed on this page — including Anvaya Smart — are consumer wellness devices. They are not medical devices and are not approved, cleared, or intended to diagnose, treat, cure, or prevent any medical condition, including Sudden Infant Death Syndrome (SIDS) or breathing disorders. Competitor information is based on publicly available data at the time of writing and may change. Always consult a qualified paediatrician for medical decisions regarding your baby's health.
        </div>

        <section className="mt-10 bg-[#f2ece0] rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-3">Keep Reading</h2>
          <ul className="space-y-2">
            {[
              { href: '/blog/best-baby-monitor-india-2026', label: 'Best Baby Monitors in India 2026 — Complete Buying Guide' },
              { href: '/blog/baby-breathing-monitor-without-wearable', label: 'Contactless vs Wearable Baby Monitors — Research & Guide' },
              { href: '/blog/ai-baby-monitor-india-2026', label: 'AI Baby Monitors India 2026 — What the Tech Actually Does' },
              { href: '/blog/baby-spo2-monitoring-india', label: 'Baby Wellness Monitoring in India — What Parents Need to Know' },
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
