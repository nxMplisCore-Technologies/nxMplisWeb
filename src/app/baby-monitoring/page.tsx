import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FAQSchema, HowToSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, ResearchCitations, TrustBar, AISnippet } from '@/components/trust/EEATSignals';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Baby Monitoring India: Complete Guide 2026 | Which Monitor to Choose',
  description: 'The complete guide to baby monitoring in India — what to monitor, how it works, and which baby monitor is best for Indian parents. Written by IIT engineers, reviewed against AAP guidelines. Updated 2025.',
  keywords: ['baby monitoring India', 'how to monitor baby', 'baby monitor guide India', 'what is baby monitoring', 'best way to monitor baby India', 'infant monitoring guide', 'contactless baby monitor India'],
  alternates: { canonical: 'https://nxmplis.com/baby-monitoring' },
  openGraph: {
    title: 'Baby Monitoring India: Complete Guide 2025',
    description: 'Everything Indian parents need to know about baby monitors — cameras, AI safety alerts, contactless breathing & heart rate, cry alerts. India guide 2026.',
    url: 'https://nxmplis.com/baby-monitoring',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630 }],
  },
};

const faqs = [
  { q: 'What is baby monitoring?', a: 'Baby monitoring means using a device to keep an eye on your baby when you are not in the room. A basic monitor streams video and sound. Smart monitors add alerts: Anvaya PULSE and OMNI send AI face-cover and tummy-sleep alerts, and OMNI also tracks breathing and heart rate contactlessly.' },
  { q: 'What should a baby monitor have in India?', a: 'Look for a clear night-vision camera, cry alerts, two-way talk and room temperature (important in Indian summers). If you want more peace of mind, AI face-cover and tummy-sleep alerts (Anvaya PULSE and OMNI) and contactless breathing and heart-rate tracking (Anvaya OMNI) are the next step up.' },
  { q: 'Is baby monitoring safe for newborns?', a: 'Anvaya monitors watch from beside the cot with nothing attached to your baby. Keep the device and cable out of reach. A monitor is a convenience, not a substitute for safe-sleep practices: the AAP advises placing babies on their back, on a firm flat surface, with nothing else in the cot, and says home breathing monitors should not be relied on to reduce SIDS risk.' },
  { q: 'What is the difference between a baby camera and a smart baby monitor?', a: 'A baby camera only shows video and sound. A smart baby monitor like Anvaya PULSE or OMNI also understands what it sees and alerts you when your baby\'s face is covered or they roll onto their tummy. OMNI adds contactless breathing and heart-rate tracking and a nightly sleep report.' },
  { q: 'What is a normal breathing rate for a baby?', a: 'Newborns breathe at 40–60 breaths per minute. Infants 6–12 months typically breathe at 25–40 breaths per minute. Brief pauses of 5–10 seconds are normal (periodic breathing) — Anvaya Smart distinguishes these from genuinely concerning pauses.' },
  { q: 'How does contactless baby monitoring work?', a: 'A contactless monitor senses your baby\'s tiny breathing movements from beside the cot instead of using a sock or band. Anvaya OMNI shows breathing and heart-rate readings live in the app and gives a sleep report every morning.' },
];

const howToSteps = [
  { name: 'Place Anvaya Smart on a surface 60–90cm from the crib', text: 'Position the pod on a nightstand or shelf at baby\'s chest height. This is the optimal sensing distance for all 6 monitoring signals.' },
  { name: 'Plug in via USB-C and wait 30 seconds', text: 'The pod initialises its baseline sensors and connects to your home WiFi. The status indicator turns solid green when ready.' },
  { name: 'Download the Anvaya Smart app and create your baby\'s profile', text: 'Enter your baby\'s name, age and any relevant health notes. This helps the AI personalise alerts to your baby\'s specific patterns.' },
  { name: 'Run the 5-minute baseline calibration', text: 'Place baby in the crib and tap "Start Calibration." Anvaya learns your baby\'s unique breathing rhythm, cry signature and baseline temperature.' },
  { name: 'Review your first night\'s report in the morning', text: 'The app shows sleep stages, breathing chart, temperature log, and any cry events. Your first report establishes the baseline for all future AI insights.' },
];

export default function BabyMonitoringPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <FAQSchema faqs={faqs} />
      <HowToSchema name="How to Set Up Anvaya Smart Baby Monitor" steps={howToSteps} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Baby Monitoring Guide', url: 'https://nxmplis.com/baby-monitoring' }]} />
      <ArticleSchema title="Baby Monitoring India: Complete Guide 2025" description="The complete guide to baby monitoring for Indian parents" url="https://nxmplis.com/baby-monitoring" image="https://nxmplis.com/anvaya-nursery.jpg" datePublished="2025-01-01" dateModified="2025-04-28" author="Anvaya Smart Team" />
      <SpeakableSchema cssSelectors={['h1', '.ai-snippet', 'h2']} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Baby Monitoring India Guide', url: 'https://nxmplis.com/baby-monitoring' }]} />
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <span>Baby Monitoring Guide</span>
          </nav>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <PediatricianBadge />
            <LastUpdated date="2025-04-28" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" id="main-heading">
            Baby Monitoring India:<br />
            <span style={{color:'#4a7c6f'}}>The Complete Guide (2025)</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            Everything Indian parents need to know about monitoring their baby — what to track, how it works, what's normal, and which baby monitor is best for Indian conditions.
          </p>
          <AuthorBio compact />
        </div>
      </section>

      <article className="container mx-auto px-4 max-w-4xl py-12" itemScope itemType="https://schema.org/Article">
        <meta itemProp="datePublished" content="2025-01-01" />
        <meta itemProp="dateModified" content="2025-04-28" />

        {/* AI Snippet — structured for Google AI Overviews */}
        <div className="ai-snippet">
          <AISnippet
            question="What is baby monitoring and why do Indian parents need it?"
            answer="Baby monitoring means using a device to keep an eye on your baby when you are not in the room. In India, where nuclear families often mean less overnight help, a smart monitor with a night-vision camera, cry alerts and AI safety alerts lets parents check on their baby without opening the door and waking them."
          />
        </div>

        {/* Section 1 — What to Monitor */}
        <section className="mb-16" aria-labelledby="what-to-monitor">
          <h2 id="what-to-monitor" className="text-3xl font-bold mb-4">What Should You Monitor in Your Baby?</h2>
          <p className="text-lg text-muted-foreground mb-6">These are the things parents most often want to keep an eye on at night.</p>

          <div className="space-y-4">
            {[
              { signal: 'Breathing', normal: '30–60 breaths/min is typical for newborns (NHS)', why: 'Newborn breathing is often irregular, with short pauses, which can worry new parents. Anvaya OMNI shows breathing live in the app without anything on your baby.', icon: '🫁' },
              { signal: 'Cry Analysis', normal: 'Hungry · Tired · Uncomfortable · Pain', why: 'Different cries have distinct acoustic patterns. AI analysis tells you what your baby needs before you have to guess — especially valuable at 2am.', icon: '👶' },
              { signal: 'Room Temperature', normal: 'Keep the room comfortable, not hot', why: 'Overheating disturbs sleep, especially in Indian summers. All Anvaya models show room temperature and humidity in the app.', icon: '🌡️' },
              { signal: 'Sleep Cycles', normal: 'Newborns sleep 16–18 hours in 2–4 hour cycles', why: 'Understanding your baby\'s sleep architecture helps you predict wake times, optimise nap schedules, and identify sleep regression patterns early.', icon: '🌙' },
            ].map(item => (
              <div key={item.signal} className="bg-white rounded-2xl p-5 border border-[#e2dbd4] flex gap-4" itemScope itemType="https://schema.org/MedicalSignOrSymptom">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-base mb-1" itemProp="name">{item.signal}</h3>
                  <div className="text-xs bg-primary/8 text-primary px-3 py-1 rounded-full inline-block mb-2 font-medium">Normal: {item.normal}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — How Contactless Monitoring Works */}
        <section className="mb-16" aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="text-3xl font-bold mb-4">How Does Contactless Baby Monitoring Work?</h2>
          <AISnippet question="How does contactless baby monitoring work?" answer="A contactless baby monitor senses your baby's breathing movements from beside the cot, so there is no sock or band to fit. Anvaya OMNI shows breathing and heart rate live in the app, alongside a 4MP night-vision camera and AI face-cover and tummy-sleep alerts." />

          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {[
              { tech: 'Camera & Night Vision', icon: '📹', desc: 'All Anvaya models have a pan-tilt camera with infrared night vision: 1080P on CORE, 4MP on PULSE and OMNI.' },
              { tech: 'AI Safety Alerts', icon: '🛡️', desc: 'PULSE and OMNI recognise when your baby\'s face is covered or they roll onto their tummy, and alert you. You can also draw danger zones.' },
              { tech: 'Contactless Breathing & Heart Rate', icon: '🫁', desc: 'OMNI tracks breathing and heart rate from beside the cot, with nothing on your baby, and gives a sleep report every morning.' },
            ].map(t => (
              <div key={t.tech} className="bg-white rounded-2xl p-5 border border-[#e2dbd4] text-center card-hover">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold mb-2">{t.tech}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

        </section>

        {/* Section 3 — How to Set Up */}
        <section className="mb-16" aria-labelledby="setup-guide">
          <h2 id="setup-guide" className="text-3xl font-bold mb-4">How to Set Up Baby Monitoring at Home</h2>
          <p className="text-lg text-muted-foreground mb-6">Setting up Anvaya Smart takes under 3 minutes. Here's the step-by-step process:</p>
          <div className="space-y-4">
            {howToSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-[#e2dbd4]">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">{i + 1}</div>
                <div>
                  <h3 className="font-bold mb-1">{step.name}</h3>
                  <p className="text-sm text-muted-foreground">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product section */}
        <section className="mb-16 bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-3xl p-8" aria-labelledby="anvaya-product">
          <h2 id="anvaya-product" className="text-3xl font-bold mb-3">Anvaya Smart — Built for Indian Parents</h2>
          <p className="text-lg text-muted-foreground mb-6">Three models for every budget: a clear camera, AI safety alerts, or contactless breathing and heart rate.</p>
          <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
            <Image src="/anvaya-nursery.jpg" alt="Anvaya Smart baby monitor in Indian nursery — contactless AI monitoring" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { name: 'CORE', price: '₹5,999', highlight: '1080P camera' },
              { name: 'PULSE', price: 'from ₹8,900', highlight: 'AI safety alerts' },
              { name: 'OMNI', price: 'from ₹12,999', highlight: 'Breathing & heart rate' },
            ].map(p => (
              <div key={p.name} className="bg-white rounded-xl p-3 text-center border border-[#e2dbd4]">
                <div className="text-[10px] font-bold text-primary mb-1">{p.highlight}</div>
                <div className="font-bold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.price}</div>
              </div>
            ))}
          </div>
          <Button asChild className="text-white font-bold gap-2 w-full sm:w-auto" style={{background:'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow:'0 4px 20px rgba(232,149,122,0.4)'}}>
            <Link href="/anvaya">Compare &amp; Buy <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </section>

        {/* FAQ Section */}
        <section className="mb-16" aria-labelledby="faq">
          <h2 id="faq" className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e2dbd4] p-5" itemScope itemType="https://schema.org/Question">
                <h3 className="font-bold mb-2 text-foreground" itemProp="name">{faq.q}</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-muted-foreground text-sm leading-relaxed" itemProp="text">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Citations */}
        <ResearchCitations />
        <div className="mt-8">
          <TrustBar />
        </div>

        {/* Internal links */}
        <section className="mt-12 bg-white rounded-2xl p-6 border border-[#e2dbd4]">
          <h2 className="text-lg font-bold mb-4">Learn More About Baby Monitoring</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { title: 'Baby Breathing Patterns: What\'s Normal and What\'s Not', href: '/blog/baby-breathing-patterns' },
              { title: '5 Types of Baby Cries and What They Mean', href: '/blog/types-of-baby-cries' },
              { title: 'Best Baby Monitor India 2025: Complete Comparison', href: '/blog/best-baby-monitor-india-2025' },
              { title: 'How Anvaya Smart Technology Works', href: '/technology' },
              { title: 'Compare Anvaya vs Motorola vs Owlet', href: '/compare' },
              { title: 'Explore All Anvaya Smart Models', href: '/anvaya' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-primary hover:underline">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />{l.title}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
