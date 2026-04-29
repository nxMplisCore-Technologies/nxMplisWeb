import type { Metadata } from 'next';
import Link from 'next/link';
import { ComparisonListSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';
import { AuthorBio, LastUpdated, AISnippet } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Anvaya Smart vs Motorola vs Owlet vs Infant Optics | Baby Monitor India Comparison 2025',
  description: 'Compare Anvaya Smart with every baby monitor sold in India — Motorola, Owlet, Infant Optics. Features, price, India availability, warranty. Find the best baby monitor for you.',
  keywords: ['Anvaya vs Motorola baby monitor', 'Owlet alternative India', 'best baby monitor comparison India 2025', 'contactless vs wearable baby monitor', 'baby monitor price comparison India'],
  alternates: { canonical: 'https://nxmplis.com/compare' },
};

const faqs = [
  { q: 'What makes Anvaya Smart different from all other baby monitors in India?', a: 'Anvaya Smart is the only baby monitor in India that monitors breathing, SpO2, and heart rate completely contactlessly — no sock, no clip, no band on your baby\'s skin. It combines AI cry analysis, sleep tracking, and on-device privacy in a single device designed and supported in India.' },
  { q: 'Is Anvaya Smart better than Motorola baby monitor?', a: 'For basic video monitoring, Motorola is adequate. But Anvaya Smart adds breathing monitoring, SpO2 tracking, cry analysis AI, and sleep insights that Motorola does not offer at any price point. For parents who want wellness monitoring — not just a camera — Anvaya Smart is significantly more capable.' },
];

export default function ComparePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ComparisonListSchema items={[
        { name: 'Anvaya Smart SENSE', url: 'https://nxmplis.com/anvaya#sense', description: 'Best baby monitor India 2025 — contactless breathing, SpO2, cry analysis' },
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
          <div className="flex items-center gap-3 mb-4"><LastUpdated date="2025-04-28" /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Baby Monitor Comparison India 2025</h1>
          <p className="text-xl text-muted-foreground mb-6">Anvaya Smart vs every alternative available to Indian parents — honest, detailed, feature-by-feature.</p>
          <AuthorBio compact />
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <AISnippet question="Anvaya Smart vs Motorola vs Owlet — which is best for India?" answer="For Indian parents in 2025, Anvaya Smart is the best choice. It is the only monitor offering contactless breathing and SpO2 monitoring with full India support, free shipping, 0% EMI and a 30-day guarantee. Motorola offers only video/audio. Owlet must be imported at ₹35,000+ with no India support." />

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
                ['Breathing monitor', '✓', '✗', '✗', '✗'],
                ['SpO2 tracking', '✓ No wearable', '✗', '✓ Wearable', '✗'],
                ['Cry AI analysis', '✓', '✗', '✗', '✗'],
                ['Sleep analysis', '✓', '✗', '✓ Basic', '✗'],
                ['HD Video', '✓', '✓', '✗', '✓'],
                ['India warranty', '✓ 1 Year', '✓ Limited', '✗', '✗'],
                ['Free shipping India', '✓', '✗', '✗', '✗'],
                ['0% EMI India', '✓', '✗', '✗', '✗'],
                ['On-device privacy', '✓', '✗', '✗', '✓'],
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
        </div>

        <div className="mt-10 bg-gradient-to-br from-[#e8f2ee] to-white rounded-2xl p-8 border-2 border-primary/30 text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Our Recommendation</div>
          <h2 className="text-3xl font-bold mb-3">Anvaya Smart SENSE</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">India's only contactless AI baby monitor. Built in India. Supported in India. The only option offering breathing + SpO2 + cry analysis + sleep tracking — without attaching anything to your baby.</p>
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
      </div>
    </div>
  );
}
