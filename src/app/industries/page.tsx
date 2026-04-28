import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Baby Care, Adult Care & Elder Care | Anvaya Smart Wellness Technology',
  description: 'From newborn monitoring to elder care — Nxmliscore builds contactless AI wellness monitoring for every stage of life. Starting with Anvaya Smart baby monitor.',
  keywords: ["baby wellness India", "elder care technology India", "adult health monitoring India", "contactless wellness monitor"],
  alternates: { canonical: 'https://nxmplis.com/industries' },
  openGraph: { title: 'Baby Care, Adult Care & Elder Care | Anvaya Smart Wellness Technology', description: 'From newborn monitoring to elder care — Nxmliscore builds contactless AI wellness monitoring for every stage of life. Starting with Anvaya Smart baby monitor.', url: 'https://nxmplis.com/industries', images: [{ url: '/anvaya-lifestyle.png' }] },
};

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Baby, User, HeartHandshake, CheckCircle } from 'lucide-react';

const industries = [
  {
    icon: Baby,
    tag: 'Available now',
    tagColor: '#4a7c6f',
    tagBg: '#e8f2ee',
    name: 'Baby Care',
    headline: 'Understanding our youngest.',
    desc: 'Our journey starts with baby care, where non-verbal cues are the only form of communication. Anvaya Smart translates breathing patterns, cry signals, SpO2, and temperature into actionable insights — giving parents confidence, not just data.',
    features: ['Contactless cry analysis', 'Breathing & SpO2 monitoring', 'Sleep pattern learning', 'Temperature tracking'],
    bg: 'from-[#e8f2ee] to-[#f5ede0]',
    accent: '#4a7c6f',
    useImage: true,
    imagePosition: 'object-right-top',
    cta: { label: 'Explore Anvaya Smart', href: '/anvaya' },
  },
  {
    icon: User,
    tag: 'Coming soon',
    tagColor: '#9aaba7',
    tagBg: '#f0ece6',
    name: 'Adult Care',
    headline: 'Proactive & dignified wellness.',
    desc: 'For adults, our focus shifts to proactive wellness and maintaining independence. We are developing non-intrusive systems to monitor vital patterns, promoting early awareness of potential health shifts without compromising lifestyle or privacy.',
    features: ['Passive vitals monitoring', 'Sleep quality insights', 'Activity pattern tracking', 'Early anomaly detection'],
    bg: 'from-[#f0ece6] to-[#faf8f5]',
    accent: '#9aaba7',
    useImage: false,
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="140" cy="80" r="40" fill="#f0ece6" stroke="#9aaba7" stroke-width="1.5"/>
      <circle cx="140" cy="65" r="16" fill="#e2dbd4"/>
      <path d="M105 120 Q140 100 175 120 L180 180 Q140 195 100 180 Z" fill="#e2dbd4"/>
      <polyline points="50,140 70,130 90,135 110,125 130,135 150,120 170,135 190,128 210,135 230,130 250,140" stroke="#9aaba7" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="140" y="170" text-anchor="middle" font-size="9" fill="#9aaba7" font-family="Poppins,sans-serif">Adult wellness monitoring — coming 2026</text>
    </svg>`,
    cta: { label: 'Join Waitlist', href: '/contact' },
  },
  {
    icon: HeartHandshake,
    tag: 'Coming soon',
    tagColor: '#9aaba7',
    tagBg: '#f0ece6',
    name: 'Elder Care',
    headline: 'Supporting graceful aging.',
    desc: 'Our technology aims to support the elderly by providing a safety net that respects their dignity and independence. From fall detection to monitoring daily routines, we help families provide better support — whether near or far.',
    features: ['Fall detection', 'Daily routine monitoring', 'Emergency alert system', 'Remote family updates'],
    bg: 'from-[#fdf0ea] to-[#faf8f5]',
    accent: '#e8957a',
    useImage: false,
    svg: `<svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="140" cy="75" r="35" fill="#fdf0ea" stroke="#e8957a" stroke-width="1.5"/>
      <circle cx="140" cy="62" r="14" fill="#f5c4a8"/>
      <path d="M108 112 Q140 95 172 112 L176 170 Q140 184 104 170 Z" fill="#f5c4a8"/>
      <path d="M80 145 L90 130 L100 145" stroke="#e8957a" stroke-width="2" stroke-linecap="round" fill="none"/>
      <line x1="90" y1="130" x2="90" y2="170" stroke="#e8957a" stroke-width="2" stroke-linecap="round"/>
      <path d="M100 152 L80 152" stroke="#e8957a" stroke-width="2" stroke-linecap="round"/>
      <circle cx="210" cy="140" r="20" fill="#fdf0ea" stroke="#e8957a" stroke-width="1"/>
      <path d="M204 140 L208 144 L216 136" stroke="#e8957a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="210" y="170" text-anchor="middle" font-size="8" fill="#e8957a" font-family="Poppins,sans-serif">Safe ✓</text>
      <text x="140" y="172" text-anchor="middle" font-size="9" fill="#9aaba7" font-family="Poppins,sans-serif">Elder care monitoring — coming 2027</text>
    </svg>`,
    cta: { label: 'Learn More', href: '/contact' },
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <section className="bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{color:'#e8957a'}}>A Lifetime of Care</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Wellness at every stage of life.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Wellness is not a single moment — it's a lifelong journey. Our technology adapts to support individuals from infancy through the golden years.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20 space-y-20">
        {industries.map((ind, i) => (
          <section key={ind.name} className="grid lg:grid-cols-2 gap-10 items-center">
            <div className={`${i % 2 === 1 ? 'lg:order-last' : ''} rounded-2xl overflow-hidden h-72 lg:h-80 bg-gradient-to-br ${ind.bg} flex items-center justify-center`}>
              {ind.useImage ? (
                <div className="relative w-full h-full">
                  <Image src="/anvaya-lifestyle.png" alt={`${ind.name} wellness monitoring — Anvaya Smart contactless AI monitor India`} fill className={`object-cover ${ind.imagePosition}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ) : (
                <div className="w-full h-full p-6" dangerouslySetInnerHTML={{ __html: ind.svg! }} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background: `${ind.accent}18`}}>
                  <ind.icon className="w-5 h-5" style={{color: ind.accent}} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{background: ind.tagBg, color: ind.tagColor}}>{ind.tag}</span>
              </div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{color: ind.accent}}>{ind.name}</p>
              <h2 className="text-3xl font-bold mb-4">{ind.headline}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{ind.desc}</p>
              <ul className="space-y-2 mb-8">
                {ind.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{color: ind.accent}} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="gap-2" style={{background: ind.accent, color: '#fff'}}>
                <Link href={ind.cta.href}>{ind.cta.label} <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
