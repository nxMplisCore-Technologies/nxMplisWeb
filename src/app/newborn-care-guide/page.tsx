import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FAQSchema, BreadcrumbSchema, ArticleSchema } from '@/components/seo/JsonLd';
import { AuthorBio, AISnippet, TrustBar, PediatricianBadge, LastUpdated } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Newborn Care Guide India: First Month',
  description: 'Newborn care guide for Indian parents: feeding, sleep, room temperature, bathing and when to call the doctor, for Indian family setups.',
  keywords: ['newborn care India', 'newborn baby guide India', 'first month baby care India', 'newborn care tips India', 'how to take care of newborn India', 'baby care guide first week'],
  alternates: { canonical: 'https://nxmplis.com/newborn-care-guide' },
  openGraph: { title: 'Newborn Care Guide India 2026 | Anvaya Smart', description: 'Complete guide to caring for your newborn in India — feeding, sleep, temperature, safety and monitoring.', url: 'https://nxmplis.com/newborn-care-guide', images: [{ url: '/anvaya-lifestyle.webp' }] },
};

const faqs = [
  { q: 'How often should a newborn feed in India?', a: 'Newborns should feed 8–12 times per 24 hours, roughly every 2–3 hours. Breastfed babies may feed more frequently than formula-fed babies. Feed on demand — look for hunger cues (rooting, sucking on hands) before crying starts.' },
  { q: 'What is the ideal room temperature for a newborn in India?', a: 'The ideal room temperature for a newborn is 20–22°C. Indian parents often over-bundle babies due to cultural tradition, but overheating is a risk factor. Use lightweight cotton clothing and a single cotton sheet in summer.' },
  { q: 'How do I know if my newborn is breathing normally?', a: 'Normal newborn breathing is 40–60 breaths per minute and may be irregular. Brief pauses of 5–10 seconds (periodic breathing) are normal. Alert signs: breathing rate above 60 consistently, ribs visible during breathing, blue lips, or pauses longer than 20 seconds.' },
  { q: 'When should a newborn first see a paediatrician in India?', a: 'The first paediatrician visit should ideally be within 2–3 days of discharge from hospital, then at 1 month, 2 months, 4 months and 6 months for routine checks and vaccinations per the IAP schedule.' },
];

export default function NewbornCareGuidePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ArticleSchema title="Newborn Care Guide India 2026" description="Complete guide to newborn care for Indian parents" url="https://nxmplis.com/newborn-care-guide" image="https://nxmplis.com/anvaya-lifestyle.webp" datePublished="2025-04-28" dateModified="2026-11-24" author="Anvaya Smart Team" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Newborn Care Guide', url: 'https://nxmplis.com/newborn-care-guide' }]} />

      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
            <Link href="/">Home</Link> <span className="mx-2">›</span><span>Newborn Care Guide India</span>
          </nav>
          <div className="flex items-center gap-3 mb-5 flex-wrap"><PediatricianBadge /><LastUpdated date="2026-11-24" /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Newborn Care Guide India 2026</h1>
          <p className="text-xl text-muted-foreground mb-6">Everything Indian parents need to know about caring for their newborn — feeding, sleep, temperature, breathing, and safety. India-specific advice throughout.</p>
          <AuthorBio compact />
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <AISnippet question="How do you take care of a newborn baby in India?" answer="Key newborn care basics for India: Feed on demand 8–12 times per 24 hours. Maintain room temperature 20–22°C (avoid over-bundling). Place baby on back to sleep on a firm, flat surface. Monitor breathing — normal rate is 40–60 breaths/min. First paediatrician visit within 48–72 hours of discharge." />

        <div className="relative rounded-2xl overflow-hidden my-8 shadow-md" style={{minHeight:"240px"}}>
          <Image src="/anvaya-lifestyle.webp" alt="Newborn baby in Indian nursery — Anvaya Smart contactless monitoring" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">The First 24 Hours at Home: What to Expect</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">The first day home with your newborn is a mix of joy and uncertainty. Most newborns sleep 16–18 hours a day in short stretches, feed every 2–3 hours, and breathe in an irregular rhythm that can alarm new parents. All of this is normal.</p>
          <ul className="space-y-2 bg-white rounded-xl border border-[#e2dbd4] p-5">
            {['Expect short sleep stretches of 2–4 hours, day and night', 'Feed on demand, at least 8 times in 24 hours', 'Keep the room comfortable, not hot: one more layer than you are wearing is enough', 'Note wet and dirty nappies, your paediatrician will ask about them at the first visit', 'Ask family to wash hands before holding the baby'].map(p => (
              <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />{p}
              </li>
            ))}
          </ul>
        </section>

        {[
          { title: 'Feeding Your Newborn', content: 'Feed on demand — 8–12 times per 24 hours. Look for hunger cues before crying: rooting, sucking on hands, increased alertness. Crying is a late hunger cue.', points: ['Breastfed: feed every 1.5–3 hours', 'Formula-fed: 60–90ml every 3–4 hours for newborns', 'Look for 6+ wet nappies per day as a feeding adequacy sign', 'Weight gain of 150–200g/week after initial drop is normal'] },
          { title: 'Safe Sleep for Indian Newborns', content: 'India has specific challenges: warm climate, multi-generational households, and cultural traditions around swaddling and co-sleeping. Here\'s what current paediatric guidelines recommend:', points: ['Back to sleep — every time, every sleep', 'Firm, flat surface — no soft mattresses, pillows or positioners', 'Room temperature 20–22°C — avoid over-bundling', 'No co-sleeping on adult bed with pillows, duvets or heavy blankets', 'Pacifier after breastfeeding is established (reduces SIDS risk)'] },
          { title: 'Newborn Temperature & Warmth', content: 'Indian cultural practice often leads to over-bundling newborns. Overheating is a genuine risk factor for SIDS. The rule of thumb: your baby needs one more layer than you are comfortable in — not three more.', points: ['Normal body temperature: 36.5°C–37.5°C', 'Fever in newborn: above 38°C — call paediatrician immediately', 'Hypothermia: below 36°C — also dangerous', 'All Anvaya monitors show room temperature and humidity in the app'] },
          { title: 'Understanding Newborn Breathing', content: 'Newborn breathing is naturally irregular and often alarms first-time parents. Here is what is normal and what requires attention:', points: ['Normal: 40–60 breaths/min, may be irregular', 'Normal: brief pauses of 5–10 seconds (periodic breathing)', 'Normal: grunting, snuffling from narrow nasal passages', 'Call paediatrician: rate above 60 consistently, ribs visible, blue lips', 'Anvaya OMNI shows breathing and heart rate in the app, with nothing on your baby'] },
        ].map((section, i) => (
          <section key={i} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
            <ul className="space-y-2 bg-white rounded-xl border border-[#e2dbd4] p-5">
              {section.points.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />{p}
                </li>
              ))}
            </ul>
          </section>
        ))}


        <section className="mb-12">
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

        <div className="bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-2xl p-7 border border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-2">Monitor your newborn with confidence</h2>
          <p className="text-muted-foreground mb-5 max-w-xl mx-auto">Night-vision camera and cry alerts on every model, AI face-cover alerts on PULSE, and contactless breathing & heart rate on OMNI.</p>
          <Button asChild className="text-white font-bold gap-2 w-full sm:w-auto" style={{background:'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow:'0 4px 20px rgba(232,149,122,0.4)'}}>
            <Link href="/anvaya">Explore Anvaya Smart <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="mt-10"><TrustBar /></div>

        <div className="mt-8 bg-white rounded-2xl p-6 border border-[#e2dbd4]">
          <h3 className="font-bold mb-4">Continue Reading</h3>
          <div className="space-y-2">
            {[
              { title: 'Baby Breathing Patterns: What\'s Normal and What\'s Not', href: '/blog/baby-breathing-patterns' },
              { title: '5 Types of Baby Cries and What They Mean', href: '/blog/types-of-baby-cries' },
              { title: 'Baby Sleep Guide India: 0–12 Month Schedule', href: '/blog/baby-sleep-guide-india' },
              { title: 'Baby Monitoring India: The Complete Guide', href: '/baby-monitoring' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />{l.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
