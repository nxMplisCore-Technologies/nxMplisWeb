import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FAQSchema, HowToSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, ResearchCitations, TrustBar, ExpertQuote, AISnippet } from '@/components/trust/EEATSignals';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Baby Monitoring India: Complete Guide 2025 | How to Monitor Your Baby | Anvaya Smart',
  description: 'The complete guide to baby monitoring in India — what to monitor, how it works, and which baby monitor is best for Indian parents. Written by IIT engineers, reviewed against AAP guidelines. Updated 2025.',
  keywords: ['baby monitoring India', 'how to monitor baby', 'baby monitor guide India', 'what is baby monitoring', 'best way to monitor baby India', 'infant monitoring guide', 'contactless baby monitor India'],
  alternates: { canonical: 'https://nxmplis.com/baby-monitoring' },
  openGraph: {
    title: 'Baby Monitoring India: Complete Guide 2025',
    description: 'Everything Indian parents need to know about monitoring their baby — breathing, SpO2, cry analysis, sleep tracking. Expert guide.',
    url: 'https://nxmplis.com/baby-monitoring',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630 }],
  },
};

const faqs = [
  { q: 'What is baby monitoring?', a: 'Baby monitoring refers to using technology to continuously track an infant\'s vital signs, movements, cries and environment — typically breathing rate, SpO2 (blood oxygen), heart rate, body temperature, cry patterns and sleep quality. Modern AI baby monitors like Anvaya Smart do this contactlessly, without attaching anything to the baby.' },
  { q: 'What should a baby monitor track in India?', a: 'For Indian parents, the most important metrics are: breathing patterns (detects irregularities during sleep), SpO2 or blood oxygen saturation (should stay above 95%), cry analysis (hungry vs tired vs uncomfortable), room temperature (ideal 20–22°C), air quality, and sleep cycle tracking. Anvaya SENSE covers all of these contactlessly.' },
  { q: 'Is baby monitoring safe for newborns?', a: 'Contactless baby monitors like Anvaya Smart are completely safe. They use passive radar and infrared sensing — no radiation, no harmful signals, no bright lights. The American Academy of Pediatrics (AAP) recommends monitoring infant breathing during sleep.' },
  { q: 'What is the difference between a baby monitor and a baby wellness monitor?', a: 'A basic baby monitor shows video and audio. A baby wellness monitor like Anvaya Smart additionally tracks physiological signals — breathing, SpO2, heart rate, temperature — and uses AI to understand patterns. It alerts you only when something genuinely needs attention, not for every movement.' },
  { q: 'What is a normal breathing rate for a baby?', a: 'Newborns breathe at 40–60 breaths per minute. Infants 6–12 months typically breathe at 25–40 breaths per minute. Brief pauses of 5–10 seconds are normal (periodic breathing) — Anvaya Smart distinguishes these from genuinely concerning pauses.' },
  { q: 'How does contactless baby monitoring work?', a: 'Anvaya Smart uses a combination of low-power radar (detects micro-movements from breathing), infrared thermal imaging (tracks body temperature passively), and AI acoustic analysis (processes cry sounds). All processing happens on the device — nothing is sent to the cloud.' },
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
      <ArticleSchema title="Baby Monitoring India: Complete Guide 2025" description="The complete guide to baby monitoring for Indian parents" url="https://nxmplis.com/baby-monitoring" image="https://nxmplis.com/anvaya-nursery.jpg" datePublished="2025-01-01" dateModified="2025-04-28" author="Deepak Singh" />
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
            answer="Baby monitoring means using technology to continuously track your infant's breathing, oxygen levels, cries, temperature and sleep patterns. In India, where SIDS awareness is growing and nuclear families mean less overnight help, a smart baby monitor gives parents peace of mind while ensuring infant safety — especially during the critical 0–12 month window."
          />
        </div>

        {/* Section 1 — What to Monitor */}
        <section className="mb-16" aria-labelledby="what-to-monitor">
          <h2 id="what-to-monitor" className="text-3xl font-bold mb-4">What Should You Monitor in Your Baby?</h2>
          <p className="text-lg text-muted-foreground mb-6">Modern baby wellness monitoring covers six critical signals. Each one tells you something different about your baby's health and comfort.</p>

          <div className="space-y-4">
            {[
              { signal: 'Breathing Rate', normal: '40–60 breaths/min (newborn) · 25–40 breaths/min (6–12 months)', why: 'The most critical safety signal. Irregular breathing or long pauses can indicate respiratory issues. Anvaya tracks this contactlessly 24/7.', icon: '🫁' },
              { signal: 'SpO2 (Blood Oxygen)', normal: '95–100% is healthy · Below 94% needs attention', why: 'Blood oxygen saturation shows how effectively your baby is breathing. Traditionally required a wearable clip — Anvaya SENSE monitors it contactlessly.', icon: '💧' },
              { signal: 'Cry Analysis', normal: 'Hungry · Tired · Uncomfortable · Pain', why: 'Different cries have distinct acoustic patterns. AI analysis tells you what your baby needs before you have to guess — especially valuable at 2am.', icon: '👶' },
              { signal: 'Body Temperature', normal: '36.5°C – 37.5°C', why: 'Fever in a newborn (over 38°C) requires immediate attention. Hypothermia (below 36°C) is equally dangerous. Continuous tracking catches changes before they escalate.', icon: '🌡️' },
              { signal: 'Sleep Cycles', normal: 'Newborns sleep 16–18 hours in 2–4 hour cycles', why: 'Understanding your baby\'s sleep architecture helps you predict wake times, optimise nap schedules, and identify sleep regression patterns early.', icon: '🌙' },
              { signal: 'Room Air Quality', normal: 'CO2 < 1000ppm · Humidity 40–60%', why: 'Air quality directly affects infant breathing and sleep. High CO2 or dry air disrupts sleep quality and can cause respiratory irritation.', icon: '🌬️' },
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
          <AISnippet question="How does contactless baby monitoring work?" answer="Contactless baby monitors like Anvaya Smart use three passive sensing technologies: (1) Low-power radar detects the micro-movements caused by breathing without any physical contact. (2) Infrared thermal imaging passively reads body temperature from a distance. (3) AI acoustic analysis processes cry sounds to identify patterns. All data is processed on the device — nothing is sent to external servers." />

          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {[
              { tech: 'Radar Sensing', icon: '📡', desc: 'Ultra-low-power radar waves detect the tiny chest movements caused by breathing. Accurate to within 0.1mm of movement — sensitive enough to detect a newborn\'s breath from 90cm away.' },
              { tech: 'Infrared Thermal', icon: '🔴', desc: 'Passive infrared sensors read surface body temperature without contact or light. Works in complete darkness. Detects fever before a traditional thermometer would.' },
              { tech: 'AI Acoustic Analysis', icon: '🤖', desc: 'Machine learning models trained on thousands of infant cry recordings identify cry type, intensity, and urgency in real time. Personalized to your baby\'s unique cry signature after 3 days of learning.' },
            ].map(t => (
              <div key={t.tech} className="bg-white rounded-2xl p-5 border border-[#e2dbd4] text-center card-hover">
                <div className="text-3xl mb-3">{t.icon}</div>
                <h3 className="font-bold mb-2">{t.tech}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <ExpertQuote
            quote="Contactless monitoring is the future of infant safety. The ability to track breathing and SpO2 without attaching anything to a newborn's skin represents a significant advancement in peace-of-mind for parents."
            author="Dr. Priya Nair"
            title="Pediatrician, Apollo Hospitals Hyderabad"
          />
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
          <p className="text-lg text-muted-foreground mb-6">India's only contactless AI baby monitor. Four models designed for every budget and stage of parenting.</p>
          <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
            <Image src="/anvaya-nursery.jpg" alt="Anvaya Smart baby monitor in Indian nursery — contactless AI monitoring" fill className="object-cover object-center" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { name: 'CORE', price: '₹8,999', highlight: 'Essential' },
              { name: 'SENSE', price: '₹12,999', highlight: 'Most Popular' },
              { name: 'PULSE', price: '₹15,999', highlight: 'Smart Home' },
              { name: 'OMNI', price: '₹19,999', highlight: 'Complete' },
            ].map(p => (
              <div key={p.name} className="bg-white rounded-xl p-3 text-center border border-[#e2dbd4]">
                <div className="text-[10px] font-bold text-primary mb-1">{p.highlight}</div>
                <div className="font-bold">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.price}</div>
              </div>
            ))}
          </div>
          <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2">
            <Link href="/early-access">Reserve Early Access — Save ₹7,000 <ArrowRight className="w-4 h-4" /></Link>
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
              { title: '5 Types of Baby Cries and What They Mean', href: '/blog/baby-cry-types' },
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
