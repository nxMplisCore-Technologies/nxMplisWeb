import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQSchema, BreadcrumbSchema, ArticleSchema, SpeakableSchema } from '@/components/seo/JsonLd';
import { AuthorBio, PediatricianBadge, LastUpdated, TrustBar } from '@/components/trust/EEATSignals';
import { ArrowRight, CheckCircle, Heart, Activity, Moon, EyeOff } from 'lucide-react';

const UPDATED = '2026-11-24';

export const metadata: Metadata = {
  title: 'Contactless Baby Monitor India — No Wearables',
  description: 'How contactless baby monitors track breathing and heart rate with no sock or band, contactless vs wearable vs video, and Anvaya OMNI. From ₹12,999.',
  keywords: [
    'contactless baby monitor India', 'contactless baby monitor', 'baby breathing monitor India',
    'baby breathing monitor without wearable', 'non contact baby monitor', 'baby heart rate monitor',
    'baby breathing and heart rate monitor', 'baby monitor without sock', 'baby movement monitor',
    'baby sleep tracker India', 'baby monitor for breathing and heart rate',
  ],
  alternates: { canonical: 'https://nxmplis.com/contactless-baby-monitor-india' },
  openGraph: {
    title: 'Contactless Baby Monitor India — Breathing & Heart Rate | Anvaya OMNI',
    description: 'Breathing and heart-rate tracking with nothing on your baby. 4MP camera, AI safety alerts, nightly sleep report.',
    url: 'https://nxmplis.com/contactless-baby-monitor-india',
    images: [{ url: '/anvaya-omni-09-vitals-heart-breathing.jpg', width: 1200, height: 630, alt: 'Anvaya OMNI contactless breathing and heart rate baby monitor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactless Baby Monitor India | Anvaya OMNI',
    description: 'Breathing and heart-rate tracking with nothing on your baby. From ₹12,999.',
    images: ['/anvaya-omni-09-vitals-heart-breathing.jpg'],
  },
};

const faqs = [
  {
    q: 'Which baby monitor detects breathing without a wearable?',
    a: 'A contactless monitor. Anvaya OMNI detects breathing and heart rate from beside the cot, with no sock, band or clip, and also has a 4MP night-vision camera and AI face-cover and tummy-sleep alerts. Anvaya CORE and PULSE are camera monitors and do not track breathing.',
  },
  {
    q: 'What is a contactless baby monitor?',
    a: 'A contactless baby monitor tracks things like breathing and heart rate from beside the cot, without anything attached to your baby. There is no sock, band, clip or patch to fit every night. Anvaya OMNI is a contactless monitor that also includes a 4MP camera and AI safety alerts.',
  },
  {
    q: 'What does Anvaya OMNI track?',
    a: 'OMNI shows your baby\'s breathing and heart rate live in the app, gives a sleep report every morning, and includes every PULSE feature: 4MP night-vision camera, AI face-cover and tummy-sleep alerts, danger zones, cry alerts, two-way talk and one-tap calling to your partner\'s phone.',
  },
  {
    q: 'Contactless or wearable baby monitor: which is better?',
    a: 'Wearables (sock or band monitors) sit on the baby\'s skin and need to be fitted and charged every night. A contactless monitor watches from a distance, so there is nothing to fit, nothing that can slip off, and nothing on delicate newborn skin. Both are consumer wellness devices, not medical monitors.',
  },
  {
    q: 'Is a contactless baby monitor safe for newborns?',
    a: 'Nothing touches your baby, so there are no straps, wires or adhesive on their skin. Place the monitor and its cable well out of the baby\'s reach, as with any nursery device, and always follow safe-sleep advice from your paediatrician.',
  },
  {
    q: 'Is Anvaya OMNI a medical device?',
    a: 'No. OMNI is a wellness and convenience monitor. It is not a medical device and does not diagnose, treat or prevent any medical condition, including SIDS. Speak to your paediatrician about any health concerns.',
  },
  {
    q: 'What is the price of a contactless baby monitor in India?',
    a: 'Anvaya OMNI costs ₹12,999, or ₹18,999 with a dedicated 5.5-inch parent display. Free shipping across India, Cash on Delivery and 7-day returns.',
  },
];

const benefits = [
  { icon: EyeOff, title: 'Nothing on your baby', desc: 'No sock, band, clip or patch. Nothing to fit at bedtime and nothing that can fall off.', color: '#4a7c6f' },
  { icon: Activity, title: 'Breathing, live', desc: 'See your baby\'s breathing in the app, without going into the room and waking them.', color: '#e8957a' },
  { icon: Heart, title: 'Heart rate, always on', desc: 'Heart-rate readings in the app, all night, with no chest strap or wearable.', color: '#4a7c6f' },
  { icon: Moon, title: 'Sleep report every morning', desc: 'A simple report of how the night went, so you can spot patterns over the weeks.', color: '#e8957a' },
];


export default function ContactlessBabyMonitorIndiaPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Contactless Baby Monitor India', url: 'https://nxmplis.com/contactless-baby-monitor-india' },
      ]} />
      <ArticleSchema
        title="Contactless Baby Monitor India 2026 — Breathing & Heart Rate, No Wearables"
        description="How contactless baby monitors work, contactless vs wearable, and what Anvaya OMNI tracks."
        url="https://nxmplis.com/contactless-baby-monitor-india"
        image="https://nxmplis.com/anvaya-omni-09-vitals-heart-breathing.jpg"
        datePublished="2025-06-01"
        dateModified={UPDATED}
        author="Anvaya Smart Team"
      />
      <SpeakableSchema cssSelectors={['h1', '.ai-snippet', 'h2']} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#e4eeea] via-[#faf8f5] to-[#f2ece0] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <span>Contactless Baby Monitor India</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <PediatricianBadge />
            <LastUpdated date={UPDATED} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5" style={{ color: '#1a2e28' }}>
            Contactless Baby Monitor —<br className="hidden sm:block" />
            <span style={{ color: '#4a7c6f' }}>Breathing &amp; Heart Rate, Nothing on Your Baby</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed ai-snippet">
            Anvaya OMNI tracks your baby&apos;s breathing and heart rate from beside the cot, with no sock, band or patch. It shows the readings live in the app and gives you a sleep report every morning. From ₹12,999, with free shipping and Cash on Delivery across India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href="/anvaya/omni"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ background: '#4a7c6f' }}
            >
              See Anvaya OMNI <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/anvaya"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 transition-all hover:bg-primary/5"
              style={{ borderColor: '#4a7c6f', color: '#4a7c6f' }}
            >
              Compare All Models
            </Link>
          </div>

          <TrustBar />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#1a2e28' }}>
            Why Parents Choose Contactless
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Wearable monitors have to be fitted, charged and checked every night. A contactless monitor simply sits beside the cot and watches.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map(b => (
              <div key={b.title} className="bg-white rounded-2xl p-5 border border-[#e8e0d8] shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${b.color}15` }}>
                  <b.icon className="w-5 h-5" style={{ color: b.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: '#1a2e28' }}>{b.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contactless vs wearable */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#1a2e28' }}>Contactless vs Wearable vs Video Baby Monitor</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#e8e0d8]">
            <table className="w-full text-sm">
              <thead className="bg-[#f0f5f3]">
                <tr>
                  <th className="text-left p-3 font-semibold" style={{ color: '#1a2e28' }}></th>
                  <th className="text-left p-3 font-semibold" style={{ color: '#1a2e28' }}>Contactless (Anvaya OMNI)</th>
                  <th className="text-left p-3 font-semibold" style={{ color: '#1a2e28' }}>Wearable (sock / band)</th>
                  <th className="text-left p-3 font-semibold" style={{ color: '#1a2e28' }}>Video-only camera</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ['On the baby', 'Nothing', 'Sensor on foot, chest or arm', 'Nothing'],
                  ['Breathing & heart rate', 'Yes, from beside the cot', 'Yes, through the skin', 'No'],
                  ['Nightly setup', 'None, it stays in place', 'Fit and position every night', 'None'],
                  ['Charging', 'Plugged in beside the cot', 'Wearable battery to charge', 'Plugged in'],
                  ['Comfort in Indian heat', 'Nothing on the skin', 'Can feel warm or irritate skin', 'Nothing on the skin'],
                  ['See your baby', '4MP night-vision camera included', 'Often needs a separate camera', 'Yes'],
                  ['Medical device?', 'No, wellness monitor', 'Consumer versions: no', 'No'],
                ].map(row => (
                  <tr key={row[0]} className="border-t border-[#e8e0d8]">
                    <td className="p-3 font-medium" style={{ color: '#1a2e28' }}>{row[0]}</td>
                    <td className="p-3">{row[1]}</td>
                    <td className="p-3">{row[2]}</td>
                    <td className="p-3">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How contactless sensing works */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#1a2e28' }}>How Contactless Breathing Tracking Works</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Every breath moves your baby&apos;s chest and tummy by a few millimetres. A contactless monitor picks up these tiny, repeating movements from beside the cot and turns them into a breathing rate, without anything touching your baby. Anvaya OMNI does this with radar-based sensing. OMNI tracks heart rate contactlessly as well.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Anvaya OMNI shows these readings live in the app, so you can check on your baby from the next room without opening the door. In the morning it gives a sleep report, so you can see how the night went instead of guessing from memory.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Newborn breathing is naturally irregular. A typical newborn breathes about 30–60 times a minute, often with short pauses of a few seconds, which is normal (NHS). Read more in our guide to <Link href="/blog/baby-breathing-patterns" className="text-primary underline">normal baby breathing patterns</Link>.
          </p>

          <h3 className="text-xl font-bold mb-3" style={{ color: '#1a2e28' }}>Setting it up for the best readings</h3>
          <ul className="space-y-2 bg-white rounded-xl border border-[#e8e0d8] p-5 mb-8">
            {[
              'Place the monitor beside or above the cot with a clear view of your baby, and keep the cable well out of reach.',
              'Readings work best when your baby is lying still and asleep. Movement, feeding or being held will interrupt them.',
              'Use one monitor per cot: a contactless monitor is designed to watch one sleeping baby.',
              'Keep following safe-sleep basics: baby on their back, on a firm flat mattress, with nothing else in the cot.',
            ].map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4a7c6f' }} />{t}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mb-3" style={{ color: '#1a2e28' }}>What a contactless monitor can and can&apos;t do</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            A contactless monitor gives you a window into your baby&apos;s breathing and heart rate at night, which many parents find reassuring. It is a wellness and convenience device, not a medical monitor: it does not diagnose illness, and no consumer baby monitor has been shown to prevent SIDS. If you notice warning signs such as laboured breathing, flaring nostrils or a blue tinge to the lips, call your doctor straight away, whatever the monitor shows.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Want alerts for a covered face or tummy sleeping too? Those come from the camera&apos;s AI, explained on our <Link href="/ai-baby-monitor-india" className="text-primary underline">AI baby monitor</Link> page. OMNI has both. To see every model side by side, <Link href="/compare" className="text-primary underline">compare CORE, PULSE and OMNI</Link>, or read the <Link href="/blog/best-baby-monitor-india-2025" className="text-primary underline">best baby monitor India buying guide</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: '#1a2e28' }}>Contactless Baby Monitor FAQ</h2>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Nothing on Your Baby. Everything in Your App.</h2>
          <p className="mb-8 opacity-90 leading-relaxed">
            Anvaya OMNI from ₹12,999. Free shipping, Cash on Delivery and 7-day returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anvaya/omni"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white shadow-xl hover:opacity-90 transition-all"
              style={{ background: '#e8957a' }}
            >
              Buy Anvaya OMNI <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 border-white/40 hover:bg-white/10 transition-all"
            >
              Types of Baby Monitors Explained
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
