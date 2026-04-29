import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ProductSchema, FAQSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/JsonLd';
import { AuthorBio, AISnippet, TrustBar, PediatricianBadge } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Baby Wellness App India | Anvaya Smart — AI Baby Health Tracking',
  description: 'The Anvaya Smart app tracks your baby\'s breathing, sleep score, cry patterns, SpO2 and daily timeline — all from one screen. Free with Anvaya Smart pod. iOS & Android.',
  keywords: ['baby wellness app India', 'baby health tracking app India', 'baby monitor app India', 'baby sleep tracker app', 'AI baby app India', 'baby breathing app India'],
  alternates: { canonical: 'https://nxmplis.com/baby-wellness-app' },
  openGraph: { title: 'Anvaya Smart App — Baby Wellness Tracking India', description: 'Track breathing, sleep, cries, SpO2 and daily milestones. Free with Anvaya Smart.', url: 'https://nxmplis.com/baby-wellness-app', images: [{ url: '/app-home.jpg' }] },
};

const features = [
  { screen: 'Live Dashboard', img: '/app-home.jpg', title: 'Everything at a glance', desc: 'Real-time breathing, temperature, humidity and baby status. One tap to view the live stream. Instant alerts delivered silently.' },
  { screen: 'Daily Timeline', img: '/app-timeline.jpg', title: 'Your baby\'s full day, logged', desc: 'Every sleep, feed, wake-up and cry event automatically captured and displayed chronologically. Sleep score, feeding log, activity patterns.' },
  { screen: 'Health Trends', img: '/app-trends.jpg', title: 'Weekly health charts', desc: 'Heart rate trends, temperature history, SpO2 patterns — visualised over days and weeks. Share directly with your paediatrician.' },
  { screen: 'Live Monitoring', img: '/app-live.jpg', title: 'Breathing and sound monitoring', desc: 'Real-time breathing rate (brpm), cry detection, decibel level, playback history. Cross and cry event counters tracked automatically.' },
];

const faqs = [
  { q: 'Is the Anvaya Smart app free?', a: 'The app is free to download on iOS and Android. A 1-year premium subscription (including sleep analysis, health trends, and AI insights) is included free with every Anvaya Smart pod purchase.' },
  { q: 'Does the Anvaya app work without the pod?', a: 'The app requires the Anvaya Smart pod to receive monitoring data. The pod does all the sensing; the app displays the data and sends alerts to your phone.' },
  { q: 'Can multiple family members use the app?', a: 'Yes. The Anvaya Smart app supports family sharing — grandparents, the other parent, or a caregiver can all receive alerts and view the dashboard in real time.' },
  { q: 'Does the app store my baby\'s health data in the cloud?', a: 'No. All sensing and processing happens on the Anvaya Smart pod. The app receives only the data needed to display your dashboard. Health data is never uploaded to external servers.' },
];

export default function BabyWellnessAppPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ProductSchema name="Anvaya Smart Baby Wellness App" description="AI baby wellness tracking app for iOS and Android. Breathing, sleep, cry analysis, SpO2, daily timeline and health trends." price="₹0" sku="ANVAYA-APP-FREE" />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Baby Wellness App', url: 'https://nxmplis.com/baby-wellness-app' }]} />

      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5">
            <Link href="/">Home</Link> <span className="mx-2">›</span> <span>Baby Wellness App</span>
          </nav>
          <div className="flex items-center gap-3 mb-5"><PediatricianBadge /></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            India's most complete<br /><span style={{color:'#4a7c6f'}}>baby wellness app.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-6">Breathing. Sleep. Cries. SpO2. Temperature. Daily timeline. AI insights. All in one app — free with every Anvaya Smart pod.</p>
          <div className="flex gap-3 flex-wrap">
            <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2">
              <Link href="/early-access">Get Anvaya Smart — App Included Free <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-16">
        <AISnippet question="What does the Anvaya Smart baby wellness app track?" answer="The Anvaya Smart app tracks breathing rate, SpO2, body and room temperature, cry type and frequency, sleep cycles and sleep score, activity events, and daily timeline — all displayed in real time on iOS and Android. A 1-year premium subscription is included free with the pod." />

        <div className="space-y-20 mt-12">
          {features.map((f, i) => (
            <div key={f.screen} className={`grid md:grid-cols-2 gap-10 items-center`}>
              <div className={`flex justify-center ${i % 2 === 1 ? 'md:order-last' : ''}`}>
                <div className="phone-frame relative" style={{width: 220}}>
                  <div className="phone-screen bg-gray-100 rounded-[30px] overflow-hidden" style={{height: 440}}>
                    <Image src={f.img} alt={`Anvaya Smart app — ${f.screen}`} fill className="object-cover object-top" />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-accent mb-2" style={{color:'#e8957a'}}>{f.screen}</div>
                <h2 className="text-3xl font-bold mb-4">{f.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e2dbd4] p-5">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10"><TrustBar /></div>
      </div>
    </div>
  );
}
