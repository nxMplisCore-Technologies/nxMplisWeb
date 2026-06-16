'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Microscope, Heart, Shield, Brain } from 'lucide-react';

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

const team = [
  { initials: 'DS', name: 'Deepak Singh', role: 'Founder & CEO', bg: '#4a7c6f' },
  { initials: 'RK', name: 'Research Lead', role: 'Head of Sensing Technology', bg: '#e8957a' },
  { initials: 'AM', name: 'AI & ML Lead', role: 'Head of AI & Signal Processing', bg: '#7aab9e' },
  { initials: 'PV', name: 'Design Lead', role: 'Head of Product Design', bg: '#c17a5e' },
];

const partners = [
  { name: 'BITS Hyderabad', desc: 'Partnering on flexible sensor materials and advanced biosensing technologies.', icon: Microscope },
  { name: 'SASTRA University, Thanjavur', desc: 'Home to our R&D lab, supporting long-term research in wellness sensing and signal interpretation.', icon: Brain },
];

const values = [
  { icon: Heart, title: 'Care first', desc: 'Every feature exists because it helps a parent care better — not because it\'s technically impressive.' },
  { icon: Shield, title: 'Privacy by default', desc: 'On-device processing. No cloud streaming. No data ever leaves your home.' },
  { icon: Brain, title: 'Calm intelligence', desc: 'Technology should reduce parental anxiety, never amplify it.' },
  { icon: Microscope, title: 'Science-backed', desc: 'Built on published research, academic partnerships, and rigorous testing.' },
];

function PersonSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://nxmplis.com/about#deepak-singh',
      name: 'Deepak Singh',
      url: 'https://nxmplis.com/about',
      jobTitle: 'Founder & CEO',
      description: 'Engineer and parent. Built Anvaya Smart after experiencing first-hand the anxiety of monitoring a newborn. 7+ years in AI sensing systems. IIT Hyderabad alumni.',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'IIT Hyderabad', url: 'https://iith.ac.in' },
      worksFor: { '@id': 'https://nxmplis.com/#organization' },
      knowsAbout: ['Radar Sensing', 'AI Signal Processing', 'Infant Wellness Monitoring', 'Baby Health Technology', 'Contactless Vital Sign Detection'],
      sameAs: ['https://www.linkedin.com/company/nxmliscore'],
    })}} />
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen overflow-x-hidden">

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
                  Built by parents,<br />engineers, and<br />researchers.
                </h1>
              </Reveal>
              <Reveal variant={fadeUp} custom={2}>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Nxmliscore is a wellness technology company focused on understanding human signals across every stage of life. Founded by IIT alumni, we combine deep engineering expertise, applied research, and human-centered design.
                </p>
              </Reveal>
              <Reveal variant={fadeUp} custom={3}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We build intelligent, non-intrusive systems that listen to subtle physiological cues — transforming them into insights that support care, confidence, and well-being.
                </p>
              </Reveal>
              <Reveal variant={fadeUp} custom={4}>
                <div className="mt-8 inline-flex items-center gap-3 bg-white/70 border border-primary/15 rounded-full px-5 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-sm">
                  Founded 2023 · IIT Alumni · Hyderabad · Mission: Calm parenting
                </div>
              </Reveal>
            </div>
            <Reveal variant={fadeRight}>
              <div className="relative rounded-2xl overflow-hidden shadow-md" style={{ minHeight: '320px' }}>
                <Image
                  src="/anvaya-product.webp"
                  alt="Nxmliscore team — IIT alumni building Anvaya Smart, India's best AI baby monitor"
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

      {/* ════════════ TEAM ════════════ */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>The Team</p>
              <h2 className="text-3xl md:text-4xl font-bold">People who care about the problem.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {team.map((t, i) => (
              <Reveal key={t.initials} variant={scaleIn} custom={i}>
                <div className="text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 shadow-lg"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${t.bg}cc, ${t.bg})`,
                      boxShadow: `0 8px 24px -4px ${t.bg}44`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal variant={fadeUp} custom={1}>
            <div className="text-center mt-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-xs font-bold text-primary">
                We&apos;re hiring — join us in building calm parenting
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ RESEARCH PARTNERS ════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>Research Partners</p>
              <h2 className="text-3xl font-bold">Built on strong research foundations.</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Our products are built on science, not assumptions — backed by active academic collaboration.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {partners.map((p, i) => (
              <Reveal key={p.name} variant={i % 2 === 0 ? fadeLeft : fadeRight}>
                <div className="bg-[#faf8f5] rounded-2xl p-6 border border-[#e2dbd4] flex gap-4 border-l-4" style={{ borderLeftColor: '#4a7c6f' }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
