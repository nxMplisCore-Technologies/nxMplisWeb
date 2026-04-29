import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, ResearchCitations, AISnippet, ExpertQuote } from '@/components/trust/EEATSignals';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Baby Breathing Patterns: What\'s Normal and What\'s Not | Anvaya Smart India',
  description: 'New parents guide to normal baby breathing patterns — rates, sounds, periodic breathing, and when to call a doctor. Written by IIT engineers, reviewed against AAP guidelines. India-specific.',
  keywords: ['baby breathing patterns India', 'normal baby breathing rate', 'newborn breathing', 'baby breathing monitor India', 'infant breathing irregular', 'baby periodic breathing', 'SIDS prevention India'],
  alternates: { canonical: 'https://nxmplis.com/blog/baby-breathing-patterns' },
  openGraph: {
    title: 'Baby Breathing Patterns: What\'s Normal and What\'s Not',
    description: 'Everything Indian parents need to know about normal — and not normal — baby breathing. Expert guide updated 2025.',
    url: 'https://nxmplis.com/blog/baby-breathing-patterns',
    images: [{ url: '/anvaya-lifestyle.png', width: 1200, height: 630 }],
  },
};

const faqs = [
  { q: 'What is a normal breathing rate for a newborn?', a: 'A healthy newborn breathes 40–60 times per minute. This can seem fast compared to adults (12–20 breaths/min) but is completely normal. The rate typically slows to 25–40 breaths/min by 6–12 months.' },
  { q: 'What is periodic breathing in babies?', a: 'Periodic breathing is when a baby\'s breathing briefly pauses for 5–10 seconds, then resumes normally. It is completely normal in newborns and does not require any intervention. Anvaya Smart distinguishes periodic breathing from true apnea events.' },
  { q: 'When should I worry about my baby\'s breathing?', a: 'Seek immediate medical attention if: breathing pauses last more than 20 seconds, breathing rate is consistently above 60 or below 20, breathing is laboured (nostrils flaring, ribs visible), SpO2 drops below 94%, or baby changes colour (blue lips, pale skin).' },
  { q: 'Can a baby monitor detect breathing problems?', a: 'Yes. Anvaya Smart\'s contactless radar sensing detects micro-movements from breathing 24/7. It learns your baby\'s unique baseline and alerts you when patterns deviate meaningfully — not for every normal variation.' },
];

export default function BabyBreathingPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ArticleSchema title="Baby Breathing Patterns: What's Normal and What's Not" description="Complete guide to normal baby breathing patterns for Indian parents" url="https://nxmplis.com/blog/baby-breathing-patterns" image="https://nxmplis.com/anvaya-lifestyle.png" datePublished="2025-04-28" dateModified="2025-04-28" author="Deepak Singh" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Blog', url: 'https://nxmplis.com/blog' }, { name: 'Baby Breathing Patterns', url: 'https://nxmplis.com/blog/baby-breathing-patterns' }]} />

      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
            <Link href="/">Home</Link> <span className="mx-2">›</span>
            <Link href="/blog">Blog</Link> <span className="mx-2">›</span>
            <span>Baby Breathing Patterns</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <PediatricianBadge />
            <LastUpdated date="2025-04-28" />
            <span className="text-xs text-muted-foreground bg-white px-2 py-0.5 rounded-full border border-[#e2dbd4]">8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Baby Breathing Patterns:<br />
            <span style={{color:'#4a7c6f'}}>What's Normal and What's Not</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">The complete parent's guide — breathing rates, normal sounds, when to worry, and how to monitor your baby safely.</p>
          <AuthorBio compact />
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-3xl py-12">

        <AISnippet question="What is a normal breathing rate for a baby in India?" answer="Healthy newborns breathe 40–60 times per minute. Infants 6–12 months breathe 25–40 times per minute. These rates are faster than adults and completely normal. Brief pauses of 5–10 seconds (periodic breathing) are also normal and not cause for concern." />

        <div className="relative h-56 rounded-2xl overflow-hidden my-8 shadow-md">
          <Image src="/anvaya-lifestyle.png" alt="Baby sleeping peacefully — Anvaya Smart monitors breathing contactlessly" fill className="object-cover object-center" />
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-10">Normal Baby Breathing Rates by Age</h2>
        <p className="text-muted-foreground mb-5 leading-relaxed">One of the most common fears for new Indian parents is not knowing whether their baby is breathing normally. Here are the clinically established benchmarks:</p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full bg-white rounded-xl border border-[#e2dbd4] overflow-hidden text-sm">
            <thead><tr className="bg-[#e8f2ee]"><th className="text-left p-3 font-semibold">Age</th><th className="text-left p-3 font-semibold">Normal Rate</th><th className="text-left p-3 font-semibold">What It Feels Like</th></tr></thead>
            <tbody>
              {[
                ['Newborn (0–4 weeks)', '40–60 breaths/min', 'Fast, may be irregular — completely normal'],
                ['1–3 months', '35–55 breaths/min', 'Periodic pauses (5–10 sec) are normal'],
                ['3–6 months', '30–45 breaths/min', 'More regular, smoother pattern'],
                ['6–12 months', '25–40 breaths/min', 'Closer to toddler rate'],
                ['Adult (for reference)', '12–20 breaths/min', '—'],
              ].map(([age, rate, note]) => (
                <tr key={age} className="border-t border-[#f0ece6]">
                  <td className="p-3 font-medium">{age}</td>
                  <td className="p-3 text-primary font-bold">{rate}</td>
                  <td className="p-3 text-muted-foreground">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold mb-4">What Is Periodic Breathing?</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">Periodic breathing is one of the most common causes of parental panic — and one of the most normal things a baby can do. Here's what actually happens:</p>
        <div className="bg-white rounded-xl p-5 border border-[#e2dbd4] mb-6">
          <p className="text-muted-foreground leading-relaxed">Your baby breathes rapidly for a few seconds, then <strong className="text-foreground">pauses for 5–10 seconds</strong>, then breathes normally again. This cycle can repeat several times. <strong className="text-foreground">This is completely normal</strong> and is caused by immaturity in the brainstem's breathing control centre. It typically resolves by 3 months.</p>
        </div>

        <ExpertQuote quote="Periodic breathing in newborns is a normal developmental phenomenon. The brainstem's respiratory control is still maturing. Parents should be educated about this so they don't panic unnecessarily — but should absolutely monitor continuously during the newborn phase." author="Dr. Suresh Reddy" title="Neonatologist, AIIMS Delhi" />

        <h2 className="text-3xl font-bold mb-4 mt-10">Warning Signs to Watch For</h2>
        <p className="text-muted-foreground mb-5">While most baby breathing variations are normal, these signs require immediate medical attention:</p>
        <div className="space-y-3 mb-8">
          {[
            { sign: 'Breathing pauses longer than 20 seconds', action: 'Call emergency services immediately' },
            { sign: 'Consistent rate above 60 or below 20 breaths/min', action: 'Call your pediatrician immediately' },
            { sign: 'Nostrils flaring with each breath', action: 'Go to emergency — sign of respiratory distress' },
            { sign: 'Ribs visible during breathing (retractions)', action: 'Emergency — severe breathing difficulty' },
            { sign: 'SpO2 consistently below 94%', action: 'Call pediatrician immediately' },
            { sign: 'Blue or pale lips/fingertips (cyanosis)', action: 'Emergency — call 112 immediately' },
          ].map(w => (
            <div key={w.sign} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <span className="text-red-500 text-lg shrink-0">⚠️</span>
              <div>
                <div className="font-semibold text-sm text-red-800">{w.sign}</div>
                <div className="text-xs text-red-700 mt-0.5">{w.action}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4">How Anvaya Smart Monitors Baby Breathing</h2>
        <p className="text-muted-foreground mb-5 leading-relaxed">Unlike traditional monitors that need a wearable sensor attached to your baby, Anvaya Smart monitors breathing contactlessly from beside the crib using radar and infrared sensing.</p>
        <div className="bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-2xl p-6 border border-primary/20 mb-8">
          <h3 className="font-bold mb-3">What Anvaya tracks:</h3>
          <ul className="space-y-2">
            {['Breathing rate (breaths per minute) — continuously', 'Breathing pattern (regular, periodic, or irregular)', 'SpO2 blood oxygen saturation — contactlessly', 'Detects apnea events (pauses >15 seconds)', 'Learns your baby\'s personal baseline over 3 days'].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">✓</span>{f}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-4 bg-primary text-white hover:bg-primary/90 gap-2" size="sm">
            <Link href="/early-access">Reserve Anvaya Smart — Free Shipping <ArrowRight className="w-3.5 h-3.5" /></Link>
          </Button>
        </div>

        <section>
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

        <ResearchCitations />

        {/* Internal linking */}
        <div className="mt-10 bg-white rounded-2xl p-6 border border-[#e2dbd4]">
          <h3 className="font-bold mb-4">Related Articles</h3>
          <div className="space-y-2">
            {[
              { title: 'Baby Cry Types: Hungry vs Tired vs Uncomfortable', href: '/blog/baby-cry-types' },
              { title: 'Baby Monitoring India: The Complete Guide', href: '/baby-monitoring' },
              { title: 'Best Baby Monitor India 2025', href: '/blog/best-baby-monitor-india-2025' },
              { title: 'Anvaya Smart SENSE — Breathing & SpO2 Monitor', href: '/anvaya#sense' },
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
