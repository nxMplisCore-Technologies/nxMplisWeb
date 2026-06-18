'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Radio, Thermometer, Mic } from 'lucide-react';

/* ─────────────────── ANIMATION VARIANTS ─────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 0.68, 0, 1.2] } }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1.2] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1.2] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 0.68, 0, 1.2] } }),
};

/* ─────────────────── SECTION WRAPPER ─────────────────── */
function Reveal({ children, variant = fadeUp, custom = 0, className = '' }: {
  children: React.ReactNode;
  variant?: typeof fadeUp;
  custom?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variant} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}

const principles = [
  {
    tag: '01 — Contactless',
    name: 'Contactless & Non-Intrusive',
    desc: 'Our technology gathers insights without ever touching the skin or disrupting natural routines. Radar-based motion sensing, infrared thermal imaging, and AI acoustic analysis — all passive, all invisible to your baby.',
    accent: '#4a7c6f',
    bg: 'from-[#e8f2ee] to-[#f5ede0]',
    illustration: `<svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <ellipse cx="160" cy="130" rx="55" ry="65" fill="#fff" stroke="#4a7c6f" stroke-width="1.5" opacity="0.9"/>
      <ellipse cx="160" cy="110" rx="28" ry="32" fill="#e8f2ee"/>
      <circle cx="160" cy="95" r="14" fill="#4a7c6f" opacity="0.15"/>
      <path d="M148 100 Q160 88 172 100 Q164 112 160 115 Q156 112 148 100Z" fill="#4a7c6f" opacity="0.4"/>
      <ellipse cx="160" cy="130" rx="55" ry="65" stroke="#4a7c6f" stroke-width="1" stroke-dasharray="4 4" opacity="0.3"/>
      <ellipse cx="160" cy="130" rx="80" ry="90" stroke="#4a7c6f" stroke-width="1" stroke-dasharray="4 6" opacity="0.2"/>
      <ellipse cx="160" cy="130" rx="108" ry="118" stroke="#4a7c6f" stroke-width="0.8" stroke-dasharray="4 8" opacity="0.12"/>
      <rect x="60" y="60" width="36" height="28" rx="8" fill="#4a7c6f" opacity="0.9"/>
      <circle cx="78" cy="74" r="9" fill="#1a2e28"/>
      <circle cx="78" cy="74" r="5" fill="#0d1612"/>
      <circle cx="75" cy="71" r="2" fill="#4a7c6f" opacity="0.6"/>
      <text x="78" y="102" text-anchor="middle" font-size="8" fill="#4a7c6f" font-family="Poppins,sans-serif" font-weight="600">ANVAYA</text>
      <line x1="96" y1="74" x2="130" y2="90" stroke="#4a7c6f" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5"/>
      <line x1="96" y1="74" x2="125" y2="74" stroke="#4a7c6f" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.4"/>
      <line x1="96" y1="74" x2="128" y2="60" stroke="#4a7c6f" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.3"/>
      <circle cx="78" cy="165" r="6" fill="#e8957a" opacity="0.8"/>
      <text x="78" y="182" text-anchor="middle" font-size="7" fill="#e8957a" font-family="Poppins,sans-serif">Breathing ✓</text>
      <circle cx="240" cy="80" r="6" fill="#4a7c6f" opacity="0.8"/>
      <text x="240" y="97" text-anchor="middle" font-size="7" fill="#4a7c6f" font-family="Poppins,sans-serif">SpO2 ✓</text>
      <circle cx="252" cy="148" r="6" fill="#4a7c6f" opacity="0.6"/>
      <text x="252" y="165" text-anchor="middle" font-size="7" fill="#4a7c6f" font-family="Poppins,sans-serif">Temp ✓</text>
    </svg>`,
  },
  {
    tag: '02 — Privacy',
    name: 'Baby-Safe & Privacy-First',
    desc: 'Safety is our highest priority. All data processing happens locally on the device. No cloud streaming. No data ever leaves your home. Your family\'s most intimate moments stay completely private — by design.',
    accent: '#e8957a',
    bg: 'from-[#fdf0ea] to-[#faf8f5]',
    illustration: `<svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M160 30 L220 58 L220 120 Q220 168 160 192 Q100 168 100 120 L100 58 Z" fill="#fff" stroke="#e8957a" stroke-width="1.5"/>
      <path d="M160 48 L204 70 L204 118 Q204 154 160 172 Q116 154 116 118 L116 70 Z" fill="#fdf0ea" stroke="#e8957a" stroke-width="0.8"/>
      <rect x="144" y="95" width="32" height="28" rx="5" fill="#e8957a" opacity="0.9"/>
      <rect x="150" y="88" width="20" height="16" rx="10" fill="none" stroke="#e8957a" stroke-width="2"/>
      <circle cx="160" cy="109" r="4" fill="#fff"/>
      <line x1="160" y1="113" x2="160" y2="118" stroke="#fff" stroke-width="2"/>
      <text x="160" y="148" text-anchor="middle" font-size="8" fill="#e8957a" font-family="Poppins,sans-serif" font-weight="600">On-device only</text>
      <text x="160" y="160" text-anchor="middle" font-size="7" fill="#9aaba7" font-family="Poppins,sans-serif">No cloud · No streaming</text>
      <line x1="60" y1="80" x2="100" y2="90" stroke="#e2dbd4" stroke-width="1" stroke-dasharray="4 4"/>
      <rect x="30" y="68" width="30" height="24" rx="4" fill="#f0ece6" stroke="#e2dbd4" stroke-width="1"/>
      <text x="45" y="83" text-anchor="middle" font-size="7" fill="#9aaba7" font-family="Poppins,sans-serif">Cloud</text>
      <line x1="45" y1="78" x2="45" y2="65" stroke="#e8957a" stroke-width="1.5"/>
      <line x1="40" y1="65" x2="50" y2="75" stroke="#e8957a" stroke-width="1.5"/>
      <line x1="50" y1="65" x2="40" y2="75" stroke="#e8957a" stroke-width="1.5"/>
      <text x="45" y="58" text-anchor="middle" font-size="7" fill="#e8957a" font-family="Poppins,sans-serif" font-weight="600">Blocked</text>
    </svg>`,
  },
  {
    tag: '03 — Intelligence',
    name: 'Calm by Design',
    desc: 'We believe technology should reduce anxiety, not create it. Anvaya Smart learns your baby\'s unique patterns over time and only alerts you when something truly needs attention — not for every rustle, every pause, every sound.',
    accent: '#4a7c6f',
    bg: 'from-[#e8f2ee] to-[#faf8f5]',
    illustration: `<svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="40" y="70" width="240" height="90" rx="12" fill="#fff" stroke="#e2dbd4" stroke-width="1"/>
      <text x="160" y="95" text-anchor="middle" font-size="8" fill="#9aaba7" font-family="Poppins,sans-serif">Breathing pattern — Normal</text>
      <polyline points="55,140 75,138 90,135 105,140 115,128 125,140 140,138 155,140 165,136 175,140 185,130 195,140 210,138 225,140 250,138 265,140" stroke="#4a7c6f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <line x1="40" y1="140" x2="280" y2="140" stroke="#e2dbd4" stroke-width="0.5"/>
      <circle cx="190" cy="130" r="5" fill="#e8957a"/>
      <text x="210" y="120" font-size="7" fill="#e8957a" font-family="Poppins,sans-serif" font-weight="600">Alert only here</text>
      <rect x="95" y="170" width="130" height="30" rx="15" fill="#4a7c6f"/>
      <text x="160" y="190" text-anchor="middle" font-size="9" fill="#fff" font-family="Poppins,sans-serif" font-weight="600">Baby is sleeping soundly ✓</text>
      <circle cx="75" cy="48" r="16" fill="#e8f2ee" stroke="#4a7c6f" stroke-width="1"/>
      <text x="75" y="52" text-anchor="middle" font-size="9" fill="#4a7c6f" font-family="Poppins,sans-serif" font-weight="600">AI</text>
      <text x="160" y="52" text-anchor="middle" font-size="7" fill="#9aaba7" font-family="Poppins,sans-serif">Learning your baby since Day 1</text>
      <circle cx="245" cy="48" r="6" fill="#e8f2ee"/>
      <circle cx="260" cy="48" r="6" fill="#e8f2ee"/>
      <circle cx="275" cy="48" r="6" fill="#4a7c6f" opacity="0.4"/>
    </svg>`,
  },
];

const sensorStats = [
  {
    icon: Radio,
    label: 'Radar Sensing',
    stats: [
      { value: '60 GHz', desc: 'Millimetre-wave frequency' },
      { value: 'Sub-mm', desc: 'Motion resolution' },
      { value: 'Zero radiation', desc: 'Safe for newborns' },
    ],
    accent: '#4a7c6f',
    bg: 'from-[#e8f2ee] to-[#f5ede0]',
  },
  {
    icon: Thermometer,
    label: 'Infrared Thermal',
    stats: [
      { value: '±0.2°C', desc: 'Temperature accuracy' },
      { value: 'Passive', desc: 'Detection — no emission' },
      { value: 'Dark-ready', desc: 'Works without any light' },
    ],
    accent: '#e8957a',
    bg: 'from-[#fdf0ea] to-[#faf8f5]',
  },
  {
    icon: Mic,
    label: 'AI Acoustic',
    stats: [
      { value: '5 types', desc: 'Cry pattern recognition' },
      { value: 'On-device', desc: 'All AI runs locally' },
      { value: 'No storage', desc: 'Audio never recorded' },
    ],
    accent: '#7aab9e',
    bg: 'from-[#e8f2ee] to-[#eaf4f0]',
  },
];

export default function TechnologyPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen overflow-x-hidden">

      {/* ════════════ HERO ════════════ */}
      <section className="relative mesh-hero py-24 text-center overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] -left-32 -top-16 bg-primary/15" style={{ animationDelay: '0s' }} />
        <div className="glow-orb w-[300px] h-[300px] -right-16 top-8 bg-accent/10" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />

        <div className="container mx-auto px-4 max-w-3xl relative">
          <Reveal variant={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
              Responsible AI · Contactless Sensing · Privacy-First
            </div>
          </Reveal>
          <Reveal variant={fadeUp} custom={1}>
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#e8957a' }}>Our Approach</p>
          </Reveal>
          <Reveal variant={fadeUp} custom={2}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Technology that cares.
            </h1>
          </Reveal>
          <Reveal variant={fadeUp} custom={3}>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nxmliscore is built on responsible innovation. Every decision — from sensor choice to alert logic — is guided by one question: does this make parents calmer, not more anxious?
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════ PRINCIPLES ════════════ */}
      <div className="container mx-auto px-4 py-20 space-y-20">
        {principles.map((p, i) => (
          <Reveal key={p.name} variant={i % 2 === 0 ? fadeLeft : fadeRight}>
            <section className="grid lg:grid-cols-2 gap-8 items-center">
              <div
                className={`${i % 2 === 1 ? 'lg:order-last' : ''} rounded-2xl overflow-hidden bg-gradient-to-br ${p.bg} h-64 lg:h-80 flex items-center justify-center p-6`}
                dangerouslySetInnerHTML={{ __html: p.illustration }}
              />
              <div>
                <div
                  className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                  style={{ background: `${p.accent}18`, color: p.accent }}
                >
                  {p.tag}
                </div>
                <h2 className="text-3xl font-bold mb-4">{p.name}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* ════════════ HOW THE SENSORS WORK ════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>Under the Hood</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">How the sensors work.</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three complementary sensing modalities working in concert — covering every dimension of your baby&apos;s wellness.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sensorStats.map((sensor, si) => (
              <Reveal key={sensor.label} variant={scaleIn} custom={si}>
                <div className={`rounded-2xl bg-gradient-to-br ${sensor.bg} p-6 border border-white/60 shadow-sm h-full`}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${sensor.accent}18` }}>
                    <sensor.icon className="w-6 h-6" style={{ color: sensor.accent }} />
                  </div>
                  <h3 className="font-bold text-lg mb-4" style={{ color: sensor.accent }}>{sensor.label}</h3>
                  <div className="space-y-3">
                    {sensor.stats.map((s) => (
                      <div key={s.value} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: sensor.accent }} />
                        <div>
                          <span className="font-bold text-sm text-foreground">{s.value}</span>
                          <span className="text-xs text-muted-foreground ml-2">{s.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CLOSING CTA ════════════ */}
      <section className="py-24 bg-[#0d1f18] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #4a7c6f 0%, transparent 60%), radial-gradient(circle at 75% 50%, #e8957a 0%, transparent 60%)' }} />
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 max-w-2xl text-center relative">
          <Reveal variant={fadeUp} custom={0}>
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Nxmliscore Research</p>
          </Reveal>
          <Reveal variant={fadeUp} custom={1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Science you can trust.<br />Care you can feel.
            </h2>
          </Reveal>
          <Reveal variant={fadeUp} custom={2}>
            <p className="text-white/60 text-lg mb-10">Built in partnership with BITS Hyderabad and SASTRA University. Grounded in research, designed for real families.</p>
          </Reveal>
          <Reveal variant={fadeUp} custom={3}>
            <Button asChild className="bg-primary text-white hover:bg-primary/90 font-semibold gap-2 px-7 py-6 text-base rounded-xl shadow-lg shadow-primary/30">
              <Link href="/about">About Nxmliscore <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
