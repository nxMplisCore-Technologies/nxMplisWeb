'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  AnimatePresence, useMotionValue, useAnimationFrame,
} from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── helpers ────────────────────────────────────────────────────────────────

function useScrollScene(scrollYProgress: any, start: number, end: number) {
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const smooth = useSpring(progress, { stiffness: 60, damping: 20 });
  return smooth;
}

// ─── Scene 1: 2:47 AM ───────────────────────────────────────────────────────

function Scene1({ p }: { p: any }) {
  const opacity = useTransform(p, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(p, [0, 0.15], [60, 0]);
  const clockOpacity = useTransform(p, [0.1, 0.3], [0, 1]);
  const questionOpacity = useTransform(p, [0.35, 0.55, 0.85, 1], [0, 1, 1, 0]);
  const questionY = useTransform(p, [0.35, 0.55], [30, 0]);
  const heartScale = useTransform(p, [0.4, 1], [1, 1.25]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      {/* Time */}
      <motion.div style={{ opacity: clockOpacity, y }} className="mb-8">
        <div className="text-8xl sm:text-[10rem] font-bold text-white tabular-nums tracking-tight leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
          2:47
        </div>
        <div className="text-white/40 text-xl tracking-[0.4em] uppercase mt-2">AM</div>
      </motion.div>

      {/* Heartbeat line */}
      <motion.svg style={{ opacity: questionOpacity }} viewBox="0 0 240 40" className="w-60 mb-8" aria-hidden="true">
        <motion.path
          d="M0 20 L50 20 L65 5 L75 35 L85 10 L95 30 L105 20 L240 20"
          fill="none" stroke="#e8957a" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </motion.svg>

      {/* Question */}
      <motion.div style={{ opacity: questionOpacity, y: questionY }}>
        <p className="text-white/50 text-lg sm:text-2xl font-light mb-3 tracking-wide">
          Every parent knows this moment.
        </p>
        <p className="text-white text-2xl sm:text-4xl font-bold leading-tight">
          "Is my baby<br />still breathing?"
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Scene 2: Anvaya watches ─────────────────────────────────────────────────

function RadarRings({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" aria-hidden="true">
      {[40, 75, 110, 145, 180].map((r, i) => (
        <motion.circle key={r} cx="150" cy="150" r={r}
          fill="none" stroke="#4a7c6f" strokeWidth={i === 0 ? 2 : 1}
          opacity={active ? undefined : 0}
          animate={active ? { opacity: [0, 0.6, 0], scale: [0.7, 1, 1.05] } : { opacity: 0 }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      {/* Device */}
      <motion.circle cx="150" cy="150" r="14" fill="#4a7c6f"
        animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <circle cx="150" cy="150" r="7" fill="#faf8f5" />
      {/* Baby */}
      <motion.g animate={active ? { y: [0, -4, 0] } : { y: 0 }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="150" cy="72" r="10" fill="#e8957a" opacity="0.9" />
        <text x="150" y="76" textAnchor="middle" fontSize="11">🍼</text>
      </motion.g>
      {/* Detection label */}
      <motion.text x="150" y="260" textAnchor="middle" fontSize="11" fill="#4a7c6f" fontWeight="700" letterSpacing="2"
        animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        BREATHING DETECTED ✓
      </motion.text>
    </svg>
  );
}

function Scene2({ p }: { p: any }) {
  const opacity = useTransform(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const headlineY = useTransform(p, [0.05, 0.2], [50, 0]);
  const headlineOp = useTransform(p, [0.05, 0.2], [0, 1]);
  const subOp = useTransform(p, [0.25, 0.45], [0, 1]);
  const radarOp = useTransform(p, [0.05, 0.25], [0, 1]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = radarOp.on('change', v => setShow(v > 0.3));
    return unsub;
  }, [radarOp]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <motion.div style={{ opacity: radarOp }} className="w-56 h-56 sm:w-72 sm:h-72 mb-8">
        <RadarRings active={show} />
      </motion.div>
      <motion.h2 style={{ y: headlineY, opacity: headlineOp }}
        className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
      >
        Anvaya watches.<br />
        <span style={{ color: '#7aab9e' }}>So you don't have to.</span>
      </motion.h2>
      <motion.p style={{ opacity: subOp }}
        className="text-white/50 text-base sm:text-xl max-w-lg leading-relaxed"
      >
        Low-power radar. From across the room. Nothing on your baby.
      </motion.p>
    </motion.div>
  );
}

// ─── Scene 3: Breathing ──────────────────────────────────────────────────────

function BreathingECG({ progress }: { progress: any }) {
  const pathLen = useTransform(progress, [0.2, 0.8], [0, 1]);
  return (
    <svg viewBox="0 0 320 80" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ecgGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#4a7c6f" stopOpacity="0" />
          <stop offset="30%" stopColor="#4a7c6f" stopOpacity="1" />
          <stop offset="100%" stopColor="#7aab9e" stopOpacity="1" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 40 L30 40 L45 40 L55 15 L65 65 L75 20 L85 58 L95 40 L125 40 L140 40 L150 12 L160 68 L170 18 L180 55 L190 40 L220 40 L235 40 L245 10 L255 70 L265 16 L275 58 L285 40 L320 40"
        fill="none" stroke="url(#ecgGrad)" strokeWidth="2.5" strokeLinecap="round"
        style={{ pathLength: pathLen } as any}
      />
      {/* Scanning dot */}
      <motion.circle r="4" fill="#4a7c6f"
        style={{
          offsetPath: "path('M0 40 L30 40 L45 40 L55 15 L65 65 L75 20 L85 58 L95 40 L125 40 L140 40 L150 12 L160 68 L170 18 L180 55 L190 40 L220 40 L235 40 L245 10 L255 70 L265 16 L275 58 L285 40 L320 40')",
          offsetDistance: pathLen as any,
        }}
      />
    </svg>
  );
}

function Scene3({ p }: { p: any }) {
  const opacity = useTransform(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const labelOp = useTransform(p, [0.15, 0.35], [0, 1]);
  const rateOp = useTransform(p, [0.45, 0.65], [0, 1]);
  const noteOp = useTransform(p, [0.6, 0.8], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl mx-auto text-center">
        <motion.div style={{ opacity: labelOp }}
          className="text-[#7aab9e] text-xs font-bold uppercase tracking-[0.4em] mb-6"
        >
          Breathing monitor
        </motion.div>
        <div className="mb-6">
          <BreathingECG progress={p} />
        </div>
        <motion.div style={{ opacity: rateOp }} className="flex items-baseline justify-center gap-3 mb-8">
          <span className="text-7xl sm:text-9xl font-bold text-white tabular-nums">44</span>
          <div className="text-left">
            <div className="text-white/60 text-sm">breaths</div>
            <div className="text-white/60 text-sm">per minute</div>
          </div>
        </motion.div>
        <motion.div style={{ opacity: noteOp }}
          className="inline-flex items-center gap-2 bg-[#4a7c6f]/20 border border-[#4a7c6f]/40 rounded-full px-5 py-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#7aab9e] inline-block animate-pulse" />
          <span className="text-[#7aab9e] text-sm font-semibold">Normal · No alert</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Scene 4: SpO2 ──────────────────────────────────────────────────────────

function Scene4({ p }: { p: any }) {
  const opacity = useTransform(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const gaugeProgress = useTransform(p, [0.1, 0.7], [0, 0.87]);
  const [displayVal, setDisplayVal] = useState(70);

  useEffect(() => {
    const unsub = gaugeProgress.on('change', v => {
      setDisplayVal(Math.round(70 + v * 32.2));
    });
    return unsub;
  }, [gaugeProgress]);

  const color = displayVal >= 95 ? '#7aab9e' : displayVal >= 90 ? '#e8957a' : '#ef4444';
  const circumference = 2 * Math.PI * 90;

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[#e8957a] text-xs font-bold uppercase tracking-[0.4em] mb-8">SpO₂ — Blood Oxygen</div>

      <div className="relative w-56 h-56 sm:w-72 sm:h-72 mb-8">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" aria-hidden="true">
          {/* Track */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          {/* Progress */}
          <motion.circle cx="100" cy="100" r="90" fill="none"
            stroke={color} strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: useTransform(gaugeProgress, v => circumference - v * circumference) as any }}
            transition={{ ease: 'easeOut' }}
          />
        </svg>
        {/* Centre value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div className="text-6xl sm:text-7xl font-bold tabular-nums" style={{ color }}>
            {displayVal}
          </motion.div>
          <div className="text-white/40 text-lg font-light">%</div>
        </div>
      </div>

      <motion.h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
        {displayVal >= 95 ? <>Oxygen normal.<br /><span style={{ color }}>All good.</span></> :
         displayVal >= 90 ? <>Oxygen dropping.<br /><span style={{ color }}>Watching closely.</span></> :
         <>Oxygen low.<br /><span style={{ color }}>Alert sent.</span></>}
      </motion.h2>
      <p className="text-white/40 text-base sm:text-lg max-w-sm">Measured contactlessly. No clip on the foot. No rashes in the heat.</p>
    </motion.div>
  );
}

// ─── Scene 5: Cry Analysis ───────────────────────────────────────────────────

const CRY_BARS = [6, 14, 9, 18, 5, 20, 8, 16, 11, 19, 7, 15, 10, 17, 6, 13, 9, 20, 5, 18];
const CRY_RESULTS = [
  { label: 'Hunger', pct: 78, color: '#e8957a' },
  { label: 'Pain', pct: 12, color: '#ef4444' },
  { label: 'Tired', pct: 6, color: '#7aab9e' },
  { label: 'Discomfort', pct: 4, color: '#c0674f' },
];

function Scene5({ p }: { p: any }) {
  const opacity = useTransform(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const waveOp = useTransform(p, [0.05, 0.2], [0, 1]);
  const barsOp = useTransform(p, [0.3, 0.5], [0, 1]);
  const resultOp = useTransform(p, [0.6, 0.75], [0, 1]);
  const resultY = useTransform(p, [0.6, 0.75], [20, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[#e8957a] text-xs font-bold uppercase tracking-[0.4em] mb-8">Cry Analysis · AI</div>

      {/* Sound wave */}
      <motion.div style={{ opacity: waveOp }} className="flex items-center justify-center gap-1 h-16 mb-10">
        {CRY_BARS.map((h, i) => (
          <motion.div key={i}
            className="w-1.5 sm:w-2 rounded-full"
            style={{ background: '#e8957a' }}
            animate={{ height: [h * 0.5, h, h * 0.6, h * 0.8, h * 0.4] }}
            transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* Classification bars */}
      <motion.div style={{ opacity: barsOp }} className="w-full max-w-sm mb-8 space-y-3">
        {CRY_RESULTS.map((c, i) => (
          <div key={c.label} className="flex items-center gap-3">
            <span className="text-white/50 text-xs w-20 text-right">{c.label}</span>
            <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: c.color }}
                initial={{ width: 0 }}
                animate={{ width: `${c.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: 'easeOut' }}
              />
            </div>
            <span className="text-xs font-bold w-8 text-left" style={{ color: c.color }}>{c.pct}%</span>
          </div>
        ))}
      </motion.div>

      {/* Verdict */}
      <motion.div style={{ opacity: resultOp, y: resultY }}>
        <div className="text-4xl sm:text-6xl font-bold text-white mb-3">😋 Hungry.</div>
        <p className="text-white/40 text-sm sm:text-base">Confirmed in 1.8 seconds. Before you even got up.</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Scene 6: Peace ──────────────────────────────────────────────────────────

function Scene6({ p }: { p: any }) {
  const opacity = useTransform(p, [0, 0.15], [0, 1]);
  const headlineOp = useTransform(p, [0.05, 0.25], [0, 1]);
  const headlineY = useTransform(p, [0.05, 0.25], [40, 0]);
  const statsOp = useTransform(p, [0.25, 0.45], [0, 1]);
  const ctaOp = useTransform(p, [0.45, 0.65], [0, 1]);
  const ctaY = useTransform(p, [0.45, 0.65], [30, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {/* Soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(74,124,111,0.15) 0%, transparent 70%)' }} />
      </div>

      <motion.div style={{ opacity: headlineOp, y: headlineY }} className="relative z-10 mb-10">
        <motion.div className="text-6xl sm:text-8xl mb-6"
          animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
        >
          🌙
        </motion.div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
          Sleep tonight.<br />
          <span style={{ color: '#7aab9e' }}>Really.</span>
        </h2>
        <p className="text-white/40 text-base sm:text-xl max-w-md mx-auto">
          Anvaya watches breathing, oxygen, cries, and temperature — all night, every night.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div style={{ opacity: statsOp }} className="flex gap-8 sm:gap-16 mb-10 relative z-10">
        {[['73', 'families monitoring'], ['0', 'wires or wearables'], ['₹8,999', 'starting price']].map(([val, label]) => (
          <div key={val} className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">{val}</div>
            <div className="text-white/40 text-xs mt-1 max-w-[80px]">{label}</div>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div style={{ opacity: ctaOp, y: ctaY }} className="flex flex-col sm:flex-row gap-3 relative z-10">
        <Button asChild size="lg" className="font-bold gap-2 text-white border-0"
          style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 32px rgba(232,149,122,0.35)' }}
        >
          <Link href="/early-access">
            <MessageCircle className="w-4 h-4" />
            Reserve your pod — No payment now
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="font-bold border-white/20 text-white hover:bg-white/10">
          <Link href="/anvaya">See all models <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ─── Scene background colours ────────────────────────────────────────────────

const BG_COLORS = [
  '#0a0f0d',  // scene 1: near-black
  '#0d1a16',  // scene 2: deep forest
  '#091210',  // scene 3: darker
  '#120a0a',  // scene 4: deep maroon tint
  '#0f0a0a',  // scene 5: warm dark
  '#0d1a16',  // scene 6: back to forest
];

// ─── Chapter indicator ────────────────────────────────────────────────────────

const CHAPTERS = ['2:47 AM', 'Radar', 'Breathing', 'Oxygen', 'Cries', 'Peace'];

function ChapterDots({ activeScene }: { activeScene: number }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {CHAPTERS.map((ch, i) => (
        <div key={ch} className="flex items-center gap-2 group">
          <motion.span
            className="text-[10px] text-white/40 font-medium hidden sm:block text-right"
            animate={{ opacity: i === activeScene ? 1 : 0 }}
          >
            {ch}
          </motion.span>
          <motion.div
            className="rounded-full"
            animate={{
              width: i === activeScene ? 20 : 6,
              height: 6,
              background: i === activeScene ? '#4a7c6f' : 'rgba(255,255,255,0.2)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Post-cinema detail sections ─────────────────────────────────────────────

function DetailSection() {
  return (
    <div className="bg-[#faf8f5]">
      {/* Pull quote bridge */}
      <div className="bg-[#0d1a16] py-16 text-center px-6">
        <p className="text-white/30 text-sm uppercase tracking-[0.4em] mb-4">What parents say</p>
        <blockquote className="text-white text-xl sm:text-3xl font-light max-w-2xl mx-auto leading-relaxed italic">
          "I checked on her once in the whole night.<br className="hidden sm:block" />
          That's the first time in four months."
        </blockquote>
        <p className="text-white/30 text-sm mt-5">— Priya R., Bengaluru · Anvaya SENSE</p>
      </div>

      {/* Features grid */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">What's inside</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-14">Six sensors. One device.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🫁', title: 'Breathing', desc: 'Radar detects every chest movement. Rate, rhythm, pattern. Alerts on apnea > 20 sec.' },
            { icon: '💉', title: 'SpO₂', desc: 'Contactless optical oxygen sensing. Normal is 95–100%. Alert below 94% for > 60 sec.' },
            { icon: '❤️', title: 'Heart Rate', desc: 'PULSE & OMNI models. Resting rate, variability, sleep-stage correlation.' },
            { icon: '😢', title: 'Cry Analysis', desc: '5 cry types. Hunger, pain, tired, discomfort, overstimulation. 92% accuracy after 3 nights.' },
            { icon: '😴', title: 'Sleep Stages', desc: 'Deep, light, REM — mapped every night. Spot patterns. End the guesswork.' },
            { icon: '🌡️', title: 'Room Temp', desc: 'Critical for India summers. Alert when room exceeds 26°C during sleep.' },
          ].map((f, i) => (
            <motion.div key={f.title}
              className="bg-white rounded-2xl border border-[#e2dbd4] p-6 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(74,124,111,0.1)' }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-bold text-foreground mb-2">{f.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* India-specific strip */}
      <div className="bg-primary/5 border-y border-primary/15 py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-primary mb-10">Built for India</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: '⚡', label: 'Works during power cuts', sub: 'On-device AI — no internet needed' },
              { icon: '🥵', label: 'Made for 40°C summers', sub: 'Nothing on baby\'s skin — no rashes' },
              { icon: '🛡️', label: 'India warranty', sub: '1 year · Free shipping' },
              { icon: '💳', label: '0% EMI available', sub: '₹8,999 starting · No subscription' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm text-foreground mb-1">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 text-center px-6">
        <p className="text-muted-foreground text-sm mb-2">27 founding family spots remaining</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Ready to sleep tonight?</h2>
        <Button asChild size="lg" className="text-white font-bold gap-2"
          style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 24px rgba(232,149,122,0.4)' }}
        >
          <Link href="/early-access">
            <MessageCircle className="w-4 h-4" />
            Reserve your Anvaya pod — No payment now
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-4">No payment today · Pay on delivery · 30-day returns</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // 6 scenes across 0→1 scroll progress
  const sceneSize = 1 / 6;
  const p1 = useScrollScene(scrollYProgress, 0 * sceneSize, 1 * sceneSize);
  const p2 = useScrollScene(scrollYProgress, 1 * sceneSize, 2 * sceneSize);
  const p3 = useScrollScene(scrollYProgress, 2 * sceneSize, 3 * sceneSize);
  const p4 = useScrollScene(scrollYProgress, 3 * sceneSize, 4 * sceneSize);
  const p5 = useScrollScene(scrollYProgress, 4 * sceneSize, 5 * sceneSize);
  const p6 = useScrollScene(scrollYProgress, 5 * sceneSize, 6 * sceneSize);

  // Active scene for chapter dots
  const [activeScene, setActiveScene] = useState(0);
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      setActiveScene(Math.min(5, Math.floor(v * 6)));
    });
  }, [scrollYProgress]);

  // Background colour interpolation
  const bgColor = useTransform(
    scrollYProgress,
    [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1],
    BG_COLORS
  );

  return (
    <>
      {/* ── Cinematic scroll section ── */}
      <div ref={containerRef} style={{ height: '600vh' }} className="relative">
        <motion.div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
            aria-hidden="true"
          />

          {/* Scenes — layered, each fades in/out */}
          <Scene1 p={p1} />
          <Scene2 p={p2} />
          <Scene3 p={p3} />
          <Scene4 p={p4} />
          <Scene5 p={p5} />
          <Scene6 p={p6} />

          {/* Chapter dots nav */}
          <ChapterDots activeScene={activeScene} />

          {/* Scroll cue (scene 1 only) */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs flex flex-col items-center gap-1"
            animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
            style={{ opacity: useTransform(p1, [0, 0.3, 0.7, 1], [0, 1, 1, 0]) }}
          >
            scroll
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <rect x="5" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <motion.rect x="7" y="3" width="2" height="3" rx="1" fill="currentColor"
                animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
              <path d="M2 15 L8 19 L14 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Detail content below the film ── */}
      <DetailSection />
    </>
  );
}
