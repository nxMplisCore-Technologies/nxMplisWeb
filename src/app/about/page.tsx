'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Microscope, Heart, Shield, Brain, Radar, Activity, Flame, Volume2 } from 'lucide-react';

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

const credentials = [
  { stat: '2025', label: 'Founded', sub: 'By alumni of IIT Kanpur & IIT Bombay' },
  { stat: '30+', label: 'US Patents', sub: 'Held across the founding team' },
  { stat: 'Intel · AMD · IBM', label: 'Prior Experience', sub: 'Decades of industry & research background' },
  { stat: 'SASTRA', label: 'Incubated At', sub: 'SASTRA University' },
];

const technology = [
  { icon: Radar, title: 'mmWave Radar Sensing', desc: 'Medically-adopted radar technology captures heart rate, breathing, and movement — with zero physical contact.' },
  { icon: Activity, title: 'Ballistocardiography (BCG)', desc: 'An ultra-sensitive flexible sensor detects micro-vibrations from the body, validated in medical and hospital settings.' },
  { icon: Flame, title: 'Graphene Far-Infrared Therapy', desc: 'Flexible graphene heating film emits far-infrared wavelengths matching the body\'s natural radiation — clinically linked to better circulation and pain relief.' },
  { icon: Volume2, title: 'Bone Conduction Audio', desc: 'Delivers soothing sound without blocking the ears, paired with AI-driven soundscapes for deeper rest.' },
];

const certifications = ['CE Certified', 'FCC Compliant', 'RoHS Compliant', 'ISO 13485', 'BIS Compliant', 'Make in India', 'DPIIT Recognized'];

const values = [
  { icon: Heart, title: 'Care first', desc: 'Every feature exists because it helps a parent care better — not because it\'s technically impressive.' },
  { icon: Shield, title: 'Privacy by default', desc: 'On-device processing. No cloud streaming. No data ever leaves your home.' },
  { icon: Brain, title: 'Calm intelligence', desc: 'Technology should reduce parental anxiety, never amplify it.' },
  { icon: Microscope, title: 'Science-backed', desc: 'Built on published research, academic partnerships, and rigorous testing.' },
];

function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://nxmplis.com/#organization',
      name: 'Nxmpliscore Technologies Pvt. Ltd.',
      url: 'https://nxmplis.com',
      foundingDate: '2025',
      founder: { '@type': 'Organization', name: 'Alumni of IIT Kanpur and IIT Bombay' },
      description: 'A deep-tech company building intelligent, contactless sensing solutions for sleep and wellness across every stage of life — from newborn care to elderly care.',
      knowsAbout: ['Radar Sensing', 'Ballistocardiography', 'AI Signal Processing', 'Contactless Vital Sign Detection', 'Infant Wellness Monitoring', 'Elder Care Monitoring'],
    })}} />
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen overflow-x-hidden">
      <OrganizationSchema />

      {/* ════════════ HERO ════════════ */}
      <section className="bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal variant={fadeUp} custom={0}>
                <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#e8957a' }}>Who We Are</p>
              </Reveal>
              <Reveal variant={fadeUp} custom={1}>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                  Deep tech for a<br />healthier tomorrow.
                </h1>
              </Reveal>
              <Reveal variant={fadeUp} custom={2}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Nxmpliscore Technologies Pvt. Ltd. was founded in 2025 by alumni from IIT Kanpur and IIT Bombay, with a team bringing decades of industry and research experience — including prior work at Intel, AMD, and IBM — and 30+ US patents held across the founding team.
                </p>
              </Reveal>
              <Reveal variant={fadeUp} custom={3}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We build intelligent, contactless sensing systems — combining AI, ML, sensor technologies, and computing architecture — that support care across every stage of life, from a newborn&apos;s first breath to healthy ageing.
                </p>
              </Reveal>
              <Reveal variant={fadeUp} custom={4}>
                <div className="mt-8 inline-flex items-center gap-3 bg-white/70 border border-primary/15 rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                  Founded 2025 · IIT Kanpur & IIT Bombay Alumni · Incubated at SASTRA University
                </div>
              </Reveal>
            </div>
            <Reveal variant={fadeRight}>
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ minHeight: '320px' }}>
                <Image
                  src="/anvaya-product.webp"
                  alt="Nxmpliscore Technologies — building Anvaya Smart, India's best AI baby monitor"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ VALUES ════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>What We Stand For</p>
              <h2 className="text-3xl md:text-4xl font-bold">Values that guide everything we build.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} variant={scaleIn} custom={i}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -8px rgba(74,124,111,0.15)' }}
                  className="bg-[#faf8f5] rounded-2xl p-6 border border-[#e2dbd4] h-full cursor-default transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CREDENTIALS ════════════ */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>Research, Innovation, Impact</p>
              <h2 className="text-3xl md:text-4xl font-bold">A foundation built on deep expertise.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {credentials.map((c, i) => (
              <Reveal key={c.label} variant={scaleIn} custom={i}>
                <div className="text-center bg-white rounded-2xl p-6 border border-[#e2dbd4] h-full">
                  <div className="text-xl font-bold text-primary mb-1">{c.stat}</div>
                  <div className="font-semibold text-sm">{c.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">{c.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TECHNOLOGY ════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>Technology</p>
              <h2 className="text-3xl font-bold">Science. Innovation. Real impact.</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Medically-validated sensing technology, built on published research and academic collaboration — not assumptions.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {technology.map((t, i) => (
              <Reveal key={t.title} variant={i % 2 === 0 ? fadeLeft : fadeRight}>
                <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#e2dbd4] flex gap-4 border-l-4" style={{ borderLeftColor: '#4a7c6f' }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <t.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal variant={fadeUp} custom={1}>
            <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
              {certifications.map(c => (
                <span key={c} className="text-xs font-semibold text-muted-foreground bg-[#faf8f5] border border-[#e2dbd4] rounded-full px-3.5 py-1.5">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ CLOSING CTA ════════════ */}
      <section className="py-24 bg-[#0d1f18] relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #4a7c6f 0%, transparent 60%), radial-gradient(circle at 75% 50%, #e8957a 0%, transparent 60%)' }} />
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 max-w-2xl relative">
          <Reveal variant={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Join us in building<br />something meaningful.
            </h2>
          </Reveal>
          <Reveal variant={fadeUp} custom={1}>
            <p className="text-white/60 text-lg mb-10">We&apos;re always looking for engineers, researchers, and designers who care about the problem as much as we do.</p>
          </Reveal>
          <Reveal variant={fadeUp} custom={2}>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild className="bg-primary text-white hover:bg-primary/90 font-semibold gap-2 px-7 py-6 text-base rounded-xl shadow-lg shadow-primary/30">
                <Link href="/careers">See Open Roles <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="ghost" className="text-white border border-white/30 hover:bg-white/10 px-7 py-6 text-base rounded-xl">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
