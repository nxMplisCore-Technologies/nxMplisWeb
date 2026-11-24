import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import { sections } from '@/lib/compare-data';
import type { RowValue } from '@/lib/compare-data';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

const TITLE = 'Compare Baby Monitors: CORE vs PULSE vs OMNI';
const DESC = 'Compare Anvaya CORE, PULSE and OMNI side by side: camera, AI safety alerts, breathing & heart rate, display options and prices. Choose in a minute.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: 'https://nxmplis.com/compare' },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: 'https://nxmplis.com/compare',
    images: [{ url: '/anvaya-pulse-02-ai-safety-alerts.png', width: 1200, height: 630, alt: TITLE }],
  },
};

const models = [
  { key: 'core' as const, name: 'CORE', href: '/anvaya/core', price: '₹5,999' },
  { key: 'pulse' as const, name: 'PULSE', href: '/anvaya/pulse', price: 'from ₹8,900 (₹15,999 with display)' },
  { key: 'omni' as const, name: 'OMNI', href: '/anvaya/omni', price: 'from ₹12,999 (₹18,999 with display)' },
];

const faqs = [
  { q: 'What is the difference between Anvaya CORE, PULSE and OMNI?', a: 'CORE is a 1080P pan-tilt camera with cry and motion alerts, two-way talk and room temperature. PULSE upgrades to a 4MP camera and adds AI face-cover and tummy-sleep (prone) alerts, danger zones and a timeline album. OMNI has everything in PULSE plus contactless breathing and heart-rate tracking, a nightly sleep report and one-tap partner calling.' },
  { q: 'Which Anvaya baby monitor tracks breathing?', a: 'Only OMNI. It tracks breathing and heart rate contactlessly from beside the cot, with nothing attached to your baby. CORE and PULSE are camera monitors and do not measure breathing.' },
  { q: 'Is PULSE worth it over CORE?', a: 'Choose PULSE if you want the monitor to alert you when your baby\'s face is covered or they roll onto their tummy, or if you want a sharper 4MP picture. If you mainly want to see and hear your baby, CORE is enough.' },
  { q: 'Do all models work with the app?', a: 'Yes. CORE, PULSE and OMNI all work with the Anvaya app on Android and iPhone. PULSE and OMNI are also sold with a 5.5-inch parent display so you can watch without your phone.' },
  { q: 'What about delivery and returns?', a: 'All models ship free across India, Cash on Delivery is available, and there is a 7-day return window.' },
];

function cell(v: RowValue) {
  if (v === true) return '✓ Yes';
  if (v === false) return '—';
  return v;
}

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Compare Models', url: 'https://nxmplis.com/compare' }]} />
      <FAQSchema faqs={faqs} />
      {children}

      <article className="bg-[#faf8f5] border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl py-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#1a2e28' }}>CORE vs PULSE vs OMNI: Full Comparison</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed max-w-3xl">
            Every Anvaya baby monitor has a pan-tilt night-vision camera, cry and motion alerts, two-way talk and the Anvaya app. The difference is what each model can tell you while you sleep: CORE shows you your baby, PULSE adds AI safety alerts, and OMNI also tracks breathing and heart rate without anything on your baby.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-[#e8e0d8] bg-white">
            <table className="w-full text-sm">
              <caption className="sr-only">Feature comparison of Anvaya CORE, PULSE and OMNI baby monitors</caption>
              <thead className="bg-[#f0f5f3]">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold" style={{ color: '#1a2e28' }}>Feature</th>
                  {models.map(m => (
                    <th key={m.key} scope="col" className="text-left p-3 font-semibold" style={{ color: '#1a2e28' }}>
                      <Link href={m.href} className="underline">Anvaya {m.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-t border-[#e8e0d8]">
                  <th scope="row" className="text-left p-3 font-medium" style={{ color: '#1a2e28' }}>Price</th>
                  {models.map(m => <td key={m.key} className="p-3">{m.price}</td>)}
                </tr>
                {sections.map(sec => (
                  <Fragment key={sec.title}>
                    <tr className="border-t border-[#e8e0d8] bg-[#faf8f5]">
                      <th scope="rowgroup" colSpan={4} className="text-left p-3 text-xs font-bold uppercase tracking-widest" style={{ color: '#4a7c6f' }}>{sec.title}</th>
                    </tr>
                    {sec.rows.map(r => (
                      <tr key={sec.title + r.label} className="border-t border-[#e8e0d8]">
                        <th scope="row" className="text-left p-3 font-medium" style={{ color: '#1a2e28' }}>{r.label}</th>
                        <td className="p-3">{cell(r.core)}</td>
                        <td className="p-3">{cell(r.pulse)}</td>
                        <td className="p-3">{cell(r.omni)}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-14 mb-6" style={{ color: '#1a2e28' }}>Who Should Buy Which?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <section className="bg-white rounded-2xl p-5 border border-[#e8e0d8]">
              <h3 className="font-bold mb-2" style={{ color: '#1a2e28' }}>Choose CORE if…</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">you mainly want to see and hear your baby from another room, get cry alerts and talk back. It is the most affordable smart monitor in the range at ₹5,999.</p>
              <Link href="/anvaya/core" className="text-sm font-semibold text-primary underline">See Anvaya CORE</Link>
            </section>
            <section className="bg-white rounded-2xl p-5 border border-[#e8e0d8]">
              <h3 className="font-bold mb-2" style={{ color: '#1a2e28' }}>Choose PULSE if…</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">you want the monitor to watch for you: AI alerts when the face is covered or your baby rolls onto their tummy, danger zones, and a sharper 4MP camera.</p>
              <Link href="/anvaya/pulse" className="text-sm font-semibold text-primary underline">See Anvaya PULSE</Link>
            </section>
            <section className="bg-white rounded-2xl p-5 border border-[#e8e0d8]">
              <h3 className="font-bold mb-2" style={{ color: '#1a2e28' }}>Choose OMNI if…</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">you also want breathing and heart-rate readings without a sock or band, plus a sleep report every morning. It includes every PULSE feature.</p>
              <Link href="/anvaya/omni" className="text-sm font-semibold text-primary underline">See Anvaya OMNI</Link>
            </section>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Still deciding? Read our <Link href="/blog/best-baby-monitor-india-2025" className="text-primary underline">best baby monitor India buying guide</Link>, or learn how a <Link href="/contactless-baby-monitor-india" className="text-primary underline">contactless baby monitor</Link> and an <Link href="/ai-baby-monitor-india" className="text-primary underline">AI baby monitor</Link> work.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-14 mb-6" style={{ color: '#1a2e28' }}>Comparison FAQ</h2>
          <div className="space-y-4">
            {faqs.map(f => (
              <div key={f.q} className="rounded-2xl p-5 border border-[#e8e0d8] bg-white">
                <h3 className="font-semibold mb-2 text-sm" style={{ color: '#1a2e28' }}>{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">Anvaya monitors are wellness and convenience devices, not medical devices.</p>
        </div>
      </article>
    </>
  );
}
