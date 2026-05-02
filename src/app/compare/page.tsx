import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { AuthorBio, LastUpdated, AISnippet } from '@/components/trust/EEATSignals';
import { ArrowRight, BookOpen, CheckCircle, AlertTriangle, Wifi, Watch, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Types of Baby Monitors Explained — Video, Wearable & Contactless | India Guide 2026',
  description: 'Understand every type of baby monitor technology available to Indian parents in 2026 — video monitors, wearable trackers, and contactless radar-based systems. Research-backed, unbiased guide.',
  keywords: ['types of baby monitors India', 'contactless baby monitor technology', 'wearable baby monitor vs contactless', 'radar baby monitor India', 'best baby monitor technology 2026', 'how baby monitors work'],
  alternates: { canonical: 'https://nxmplis.com/compare' },
};

const faqs = [
  {
    q: 'What are the different types of baby monitors available in India?',
    a: 'There are three main categories: (1) Video monitors — camera and audio only, no health tracking. (2) Wearable monitors — a sock, clip, or band attached to the baby that measures movements or estimated vitals. (3) Contactless monitors — use radar or camera-based sensing to track breathing patterns and movement without touching the baby. Each has different capabilities, price points, and trade-offs.',
  },
  {
    q: 'Is radar-based contactless monitoring scientifically studied?',
    a: 'Yes. Radar sensing for infant breathing detection has been explored in peer-reviewed research. A 2022 study in Nature Scientific Reports examined radar-based contactless breathing monitoring of premature infants in NICU settings. A 2024 systematic review in Pediatric Research analysed non-contact vital sign monitoring across multiple infant studies. A 2025 research protocol from IIT Ropar (JMIR Research Protocols) explored FMCW radar for contactless breathing monitoring. These studies validate radar sensing as a viable technology category for infant breathing detection.',
  },
  {
    q: 'What did the FDA say about wearable infant monitors?',
    a: 'In 2021, the U.S. FDA sent an enforcement letter to a major wearable baby monitor manufacturer requiring them to stop selling a specific device that was being marketed as a medical monitor without FDA clearance. The FDA clarified that consumer wearable devices have not been proven to prevent SIDS or other medical events. The Children\'s Hospital of Philadelphia (CHOP) and Consumer Reports have both advised parents to consult their paediatrician before relying on any consumer infant monitor for health decisions.',
  },
  {
    q: 'Are wearable baby monitors safe for newborns?',
    a: 'Most consumer wearable baby monitors are not classified as medical devices and are not designed for medical diagnosis. Concerns noted by researchers and clinicians include: skin irritation from prolonged wearable contact on delicate newborn skin, false alarms causing parental anxiety, and the inconvenience of keeping a device attached to a moving baby during sleep. Parents should consult their paediatrician about what level of monitoring is appropriate for their baby.',
  },
  {
    q: 'What should I look for when choosing a baby monitor in India?',
    a: 'Key factors for Indian parents: (1) India warranty and local customer support — many imported devices have no India service. (2) Technology type — decide whether you need video only, wearable tracking, or contactless monitoring. (3) Price and EMI options — imported devices can cost 3x–4x more once customs and shipping are added. (4) Privacy — check whether video or data is processed on the device or sent to foreign cloud servers. (5) Ease of setup and ongoing use — consider whether a wearable needs to be reapplied every night.',
  },
  {
    q: 'Is a contactless baby monitor better than a wearable one?',
    a: 'It depends on your priorities. Contactless monitors require nothing attached to the baby, which eliminates skin contact concerns and the nightly task of fitting a wearable. They use radar or camera sensing to detect breathing patterns from a distance. Wearable monitors maintain close physical contact with the baby, which can improve signal quality in some conditions but introduces the challenges of fit, skin contact, and battery management on the wearable itself. Neither technology type is a substitute for medical monitoring — both are wellness devices.',
  },
];

const technologies = [
  {
    icon: Wifi,
    title: 'Video & Audio Monitors',
    subtitle: 'The most common type in India',
    description: 'Video monitors provide a live camera feed and audio from the baby\'s room to a parent unit or smartphone app. They are the most widely available and affordable category.',
    pros: ['Simple to set up and use', 'Wide price range (₹3,000–₹15,000)', 'Many India-available options with local warranty', 'No contact with the baby needed', 'Night vision typically included'],
    cons: ['No health or breathing tracking', 'No cry analysis or sleep data', 'Video-only — parent must watch actively', 'Cloud video can raise privacy concerns'],
    note: null,
  },
  {
    icon: Watch,
    title: 'Wearable Monitors',
    subtitle: 'Socks, clips, or bands attached to the baby',
    description: 'Wearable monitors attach a small sensor — usually a sock, ankle clip, or fabric band — directly to the baby. They estimate movement, heart rate, and in some cases blood oxygen levels via the skin.',
    pros: ['Close skin contact can give strong signal', 'Movement and heart rate estimation available', 'Some models offer smartphone alerts'],
    cons: ['Sensor must be fitted correctly every night', 'Skin irritation risk with prolonged use on newborns', 'Most are imported — limited India warranty or support', 'Import cost adds ₹15,000–₹25,000 on top of product price', 'Consumer versions are not medical-grade devices'],
    note: 'Regulatory note: In 2021, the U.S. FDA issued an enforcement letter to a leading wearable baby monitor brand for marketing a consumer device as a medical monitor without clearance. The FDA has stated these devices have not been proven to prevent SIDS. Consult your paediatrician before relying on any consumer wearable monitor for health decisions.',
  },
  {
    icon: Radio,
    title: 'Contactless Radar-Based Monitors',
    subtitle: 'Emerging technology — no contact needed',
    description: 'Contactless monitors use radar or advanced camera sensing to detect subtle movements — like the chest rising and falling during breathing — from a distance, without any device touching the baby.',
    pros: ['Nothing attached to the baby at any time', 'No skin irritation risk', 'No nightly fitting routine', 'Radar sensing studied in peer-reviewed NICU research (Nature, 2022)', 'Can run continuously without disturbing sleep'],
    cons: ['Newer technology with fewer consumer options', 'Requires careful positioning for best accuracy', 'Premium price point compared to basic video monitors', 'Consumer devices are wellness tools, not medical-grade equipment'],
    note: 'Research context: Radar-based contactless breathing monitoring has been studied in academic and clinical settings. A 2022 Nature Scientific Reports study and a 2025 IIT Ropar research protocol (JMIR) both explored FMCW radar for infant breathing detection. These studies validate the technology category — consumer radar monitors apply similar principles in a home wellness context.',
  },
];

export default function ComparePage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Baby Monitor Types', url: 'https://nxmplis.com/compare' }]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
            <Link href="/">Home</Link> <span className="mx-2">›</span> <span>Baby Monitor Technology Guide</span>
          </nav>
          <div className="flex items-center gap-3 mb-4"><LastUpdated date="2026-05-02" /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Baby Monitor Technologies Explained</h1>
          <p className="text-xl text-muted-foreground mb-3">Video monitors, wearable trackers, contactless radar systems — what each technology does, what the research says, and what Indian parents should know before buying.</p>
          <p className="text-xs text-muted-foreground bg-white/60 rounded-lg px-3 py-2 inline-block border border-[#e2dbd4]">
            <strong>Disclaimer:</strong> All consumer baby monitors are wellness devices, not medical devices. None are approved to diagnose, treat, or prevent any medical condition including SIDS. Always consult your paediatrician.
          </p>
          <div className="mt-4"><AuthorBio compact /></div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-12">

        <AISnippet
          question="What types of baby monitors are available in India and how do they differ?"
          answer="Indian parents in 2026 can choose from three technology categories: (1) Video monitors — camera and audio only, widely available, no health tracking. (2) Wearable monitors — sock or clip sensors that track movement and estimated vitals, mostly imported with limited India support. (3) Contactless radar monitors — use radar sensing to track breathing patterns from a distance with nothing attached to the baby, a technology studied in peer-reviewed research. All three are consumer wellness devices, not medical monitors."
        />

        {/* Technology cards */}
        <div className="mt-10 space-y-8">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.title} className="bg-white rounded-2xl border border-[#e2dbd4] overflow-hidden">
                <div className="p-6 border-b border-[#f0ece6]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold leading-tight">{tech.title}</h2>
                      <p className="text-xs text-muted-foreground">{tech.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#f0ece6]">
                  <div className="p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-green-600 mb-3">Advantages</h3>
                    <ul className="space-y-2">
                      {tech.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">Limitations</h3>
                    <ul className="space-y-2">
                      {tech.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400 font-bold text-xs leading-none">✕</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {tech.note && (
                  <div className="mx-5 mb-5 mt-1 flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-lg p-3.5 text-xs text-amber-800 leading-relaxed">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    <span>{tech.note}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Research section */}
        <section className="mt-10 bg-white rounded-2xl border border-[#e2dbd4] p-7">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">What the Research Says</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Contactless infant monitoring is an active area of academic research. Here are key studies that have examined this technology — all are independent research, not product endorsements.
          </p>
          <div className="space-y-4">
            {[
              { label: 'Nature Scientific Reports (2022)', text: 'Studied radar-based contactless breathing monitoring of premature infants in clinical NICU settings. Demonstrated the viability of radar sensing for detecting infant breathing without physical contact.' },
              { label: 'Pediatric Research Systematic Review (2024)', text: 'Reviewed multiple studies on non-contact vital sign monitoring across infant age groups. Confirmed that the technology area is feasible and increasingly accurate.' },
              { label: 'JMIR Research Protocols (2025)', text: 'Research protocol by IIT Ropar exploring FMCW radar for contactless breathing monitoring — an Indian academic institution studying this technology for local application.' },
              { label: 'FDA Enforcement Letter (2021)', text: 'The U.S. FDA required a major consumer wearable baby monitor brand to stop selling a device marketed as a medical monitor without clearance. FDA guidance: consumer devices are not proven to prevent SIDS.' },
              { label: "Children's Hospital of Philadelphia (CHOP)", text: '"Do Vital Sign Baby Monitors Work? Research Says Beware" — CHOP advises parents to consult their paediatrician before using consumer infant monitors for health decisions.' },
              { label: 'Consumer Reports', text: 'Independent assessment noting that most babies do not need a wearable breathing monitor and that parents should seek paediatrician guidance rather than relying on consumer devices.' },
            ].map((src, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground">{src.label}: </span>
                  <span className="text-muted-foreground">{src.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anvaya natural mention — no competitor comparison */}
        <div className="mt-10 bg-gradient-to-br from-[#e8f2ee] to-white rounded-2xl p-8 border-2 border-primary/30">
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Made for Indian Parents</div>
          <h2 className="text-2xl font-bold mb-3">Anvaya Smart — India's Contactless Baby Wellness Pod</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
            If you're interested in the contactless radar monitoring category, Anvaya Smart is designed for exactly that — tracking your baby's breathing patterns and sleep from a distance, with nothing attached to your baby. Built and supported in India, with India warranty, free shipping, and 0% EMI.
          </p>
          <p className="text-xs text-muted-foreground mb-5 bg-white/60 rounded-lg px-3 py-2 border border-[#e2dbd4]">
            Anvaya Smart is a consumer wellness device. It is not a medical device and is not intended to diagnose, treat, or prevent any medical condition.
          </p>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2">
            <Link href="/early-access">Reserve Early Access — Save ₹7,000 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">Free shipping · 30-day guarantee · 0% EMI · No payment now</p>
        </div>

        {/* FAQs */}
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

        {/* Legal disclaimer */}
        <div className="mt-10 bg-[#f5f0eb] border border-[#e2dbd4] rounded-xl p-5 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground block mb-1">Disclaimer</strong>
          All baby monitor types discussed on this page are consumer wellness products. None are medical devices approved to diagnose, treat, cure, or prevent any medical condition including SIDS or breathing disorders. Research cited is independent peer-reviewed work about technology categories — it does not constitute endorsement of any specific consumer product. Always consult a qualified paediatrician for medical decisions about your baby's health.
        </div>

        {/* Internal links */}
        <section className="mt-10 bg-[#f2ece0] rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-3">Further Reading</h2>
          <ul className="space-y-2">
            {[
              { href: '/blog/best-baby-monitor-india-2026', label: 'Best Baby Monitors in India 2026 — Complete Buying Guide' },
              { href: '/blog/baby-breathing-monitor-without-wearable', label: 'Contactless Baby Monitoring — How It Works & What Research Says' },
              { href: '/blog/ai-baby-monitor-india-2026', label: 'AI Baby Monitors India 2026 — What the Technology Actually Does' },
              { href: '/blog/baby-breathing-patterns', label: 'Baby Breathing Patterns — What Is Normal for Newborns' },
              { href: '/blog/baby-spo2-monitoring-india', label: 'Baby Wellness Monitoring in India — A Parent\'s Guide' },
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
