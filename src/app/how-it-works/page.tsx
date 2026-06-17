'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, animate } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── constants ───────────────────────────────────────────────────────────────

const SCENE_DURATION = 5000; // ms per scene
const SCENES = ['2:47 AM', 'Radar', 'Breathing', 'Oxygen', 'Cries', 'Peace'] as const;
const BG = ['#0a0f0d', '#0d1a16', '#091210', '#120a0a', '#0f0a0a', '#0d1a16'];

// ─── Radar rings ─────────────────────────────────────────────────────────────

function RadarRings() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" aria-hidden="true">
      {[40, 75, 110, 145, 180].map((r, i) => (
        <motion.circle key={r} cx="150" cy="150" r={r}
          fill="none" stroke="#4a7c6f" strokeWidth={i === 0 ? 2 : 1}
          animate={{ opacity: [0, 0.6, 0], scale: [0.7, 1, 1.05] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      <motion.circle cx="150" cy="150" r="14" fill="#4a7c6f"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <circle cx="150" cy="150" r="7" fill="#faf8f5" />
      <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="150" cy="68" r="12" fill="#e8957a" opacity="0.9" />
        <text x="150" y="73" textAnchor="middle" fontSize="13">🍼</text>
      </motion.g>
      <motion.text x="150" y="265" textAnchor="middle" fontSize="11"
        fill="#4a7c6f" fontWeight="700" letterSpacing="2"
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
        BREATHING DETECTED ✓
      </motion.text>
    </svg>
  );
}

// ─── ECG waveform (path only — no offsetPath) ────────────────────────────────

const ECG_D = "M0 40 L30 40 L45 40 L55 15 L65 65 L75 20 L85 58 L95 40 L125 40 L140 40 L150 12 L160 68 L170 18 L180 55 L190 40 L220 40 L235 40 L245 10 L255 70 L265 16 L275 58 L285 40 L320 40";

function BreathingECG() {
  return (
    <svg viewBox="0 0 320 80" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="ecgGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#4a7c6f" stopOpacity="0" />
          <stop offset="20%" stopColor="#4a7c6f" />
          <stop offset="100%" stopColor="#7aab9e" />
        </linearGradient>
      </defs>
      <motion.path d={ECG_D} fill="none" stroke="url(#ecgGrad)" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }} />
      <text x="160" y="75" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">
        Normal rhythm · 44 bpm
      </text>
    </svg>
  );
}

// ─── SpO2 arc ────────────────────────────────────────────────────────────────

function SpO2Arc() {
  const [val, setVal] = useState(70);
  useEffect(() => {
    let v = 70;
    const id = setInterval(() => {
      v = Math.min(v + 0.7, 98);
      setVal(Math.round(v));
      if (v >= 98) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, []);
  const color = val >= 95 ? '#7aab9e' : val >= 90 ? '#e8957a' : '#ef4444';
  const circ = 2 * Math.PI * 90;
  const pct = (val - 70) / 28;
  return (
    <div className="relative w-52 h-52 sm:w-64 sm:h-64">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
        <motion.circle cx="100" cy="100" r="90" fill="none"
          stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circ}
          animate={{ strokeDashoffset: circ - pct * circ }}
          transition={{ ease: 'easeOut', duration: 0.05 }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl sm:text-6xl font-bold tabular-nums" style={{ color }}>{val}</div>
        <div className="text-white/30 text-base">%  SpO₂</div>
      </div>
    </div>
  );
}

// ─── Cry analyser ────────────────────────────────────────────────────────────

const CRY_BARS_H = [6,14,9,18,5,20,8,16,11,19,7,15,10,17,6,13,9,20,5,18];
const CRY_TYPES = [
  { label: 'Hunger', pct: 78, color: '#e8957a' },
  { label: 'Pain', pct: 12, color: '#ef4444' },
  { label: 'Tired', pct: 6, color: '#7aab9e' },
  { label: 'Discomfort', pct: 4, color: '#c0674f' },
];

function CryScene() {
  const [phase, setPhase] = useState<'wave'|'bars'|'result'>('wave');
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('bars'), 1200);
    const t2 = setTimeout(() => setPhase('result'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Wave */}
      <div className="flex items-center justify-center gap-1 h-14">
        {CRY_BARS_H.map((h, i) => (
          <motion.div key={i} className="w-1.5 sm:w-2 rounded-full bg-[#e8957a]"
            animate={{ height: [h * 0.4, h, h * 0.5, h * 0.8, h * 0.3] }}
            transition={{ duration: 0.5 + (i % 5) * 0.08, repeat: Infinity, delay: i * 0.04 }} />
        ))}
      </div>
      {/* Bars */}
      <AnimatePresence>
        {(phase === 'bars' || phase === 'result') && (
          <motion.div className="w-full max-w-xs space-y-3"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {CRY_TYPES.map((c, i) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="text-white/40 text-xs w-20 text-right">{c.label}</span>
                <div className="flex-1 h-2 rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full"
                    style={{ background: c.color }}
                    initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }} />
                </div>
                <span className="text-xs font-bold w-8" style={{ color: c.color }}>{c.pct}%</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Result */}
      <AnimatePresence>
        {phase === 'result' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center">
            <div className="text-4xl sm:text-5xl font-bold text-white">😋 Hungry.</div>
            <p className="text-white/30 text-sm mt-2">Confirmed in 1.8 seconds.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Scene definitions ───────────────────────────────────────────────────────

function Scene1() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="text-7xl sm:text-[9rem] lg:text-[11rem] font-bold text-white tabular-nums leading-none">
          2:47
        </div>
        <div className="text-white/30 text-lg tracking-[0.5em] uppercase mt-1 mb-10">AM</div>
      </motion.div>
      <motion.svg viewBox="0 0 240 40" className="w-56 mb-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <motion.path d="M0 20 L50 20 L65 5 L75 35 L85 10 L95 30 L105 20 L240 20"
          fill="none" stroke="#e8957a" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }} />
      </motion.svg>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <p className="text-white/40 text-lg sm:text-2xl font-light mb-3">Every parent knows this moment.</p>
        <p className="text-white text-2xl sm:text-4xl font-bold leading-tight">
          "Is my baby<br />still breathing?"
        </p>
      </motion.div>
    </div>
  );
}

function Scene2() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6">
      <motion.div className="w-52 h-52 sm:w-64 sm:h-64 mb-6"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
        <RadarRings />
      </motion.div>
      <motion.h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        Anvaya watches.<br />
        <span style={{ color: '#7aab9e' }}>So you don't have to.</span>
      </motion.h2>
      <motion.p className="text-white/40 text-base sm:text-xl max-w-md"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        Low-power radar. From across the room. Nothing on your baby.
      </motion.p>
    </div>
  );
}

function Scene3() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6">
      <motion.div className="text-[#7aab9e] text-xs font-bold uppercase tracking-[0.4em] mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        Breathing monitor
      </motion.div>
      <motion.div className="w-full max-w-xl mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <BreathingECG />
      </motion.div>
      <motion.div className="flex items-baseline gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <span className="text-7xl sm:text-9xl font-bold text-white tabular-nums">44</span>
        <div className="text-left">
          <div className="text-white/40 text-sm">breaths</div>
          <div className="text-white/40 text-sm">per minute</div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        className="inline-flex items-center gap-2 bg-[#4a7c6f]/20 border border-[#4a7c6f]/40 rounded-full px-5 py-2">
        <span className="w-2 h-2 rounded-full bg-[#7aab9e] inline-block animate-pulse" />
        <span className="text-[#7aab9e] text-sm font-semibold">Normal · No alert</span>
      </motion.div>
    </div>
  );
}

function Scene4() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6">
      <motion.div className="text-[#e8957a] text-xs font-bold uppercase tracking-[0.4em] mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        SpO₂ — Blood Oxygen
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
        <SpO2Arc />
      </motion.div>
      <motion.h2 className="text-3xl sm:text-5xl font-bold text-white mt-6 mb-3 leading-tight"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        Oxygen levels.<br /><span style={{ color: '#7aab9e' }}>All night.</span>
      </motion.h2>
      <motion.p className="text-white/30 text-sm sm:text-base max-w-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        Contactlessly. No clip on the foot. No rashes in India's heat.
      </motion.p>
    </div>
  );
}

function Scene5() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6">
      <motion.div className="text-[#e8957a] text-xs font-bold uppercase tracking-[0.4em] mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        Cry Analysis · AI
      </motion.div>
      <div className="w-full max-w-sm">
        <CryScene />
      </div>
    </div>
  );
}

function Scene6() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,124,111,0.15) 0%, transparent 70%)' }} />
      </div>
      <motion.div className="text-6xl sm:text-8xl mb-5"
        initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        animate2={{ rotate: [0, 8, -8, 0] as any }}
      >
        🌙
      </motion.div>
      <motion.h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        Sleep tonight.<br /><span style={{ color: '#7aab9e' }}>Really.</span>
      </motion.h2>
      <motion.p className="text-white/40 text-base sm:text-xl max-w-md mb-8"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
        Breathing · SpO₂ · Cries · Sleep · Temperature — all night, every night.
      </motion.p>
      <motion.div className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
        <Button asChild size="lg" className="font-bold gap-2 text-white border-0"
          style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 32px rgba(232,149,122,0.35)' }}>
          <Link href="/early-access">
            <MessageCircle className="w-4 h-4" />
            Reserve your pod — No payment now
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg"
          className="font-bold gap-2 border-white/20 text-white bg-transparent hover:bg-white/10">
          <Link href="/anvaya">See all models <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </motion.div>
    </div>
  );
}

const SCENE_COMPONENTS = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];

// ─── Progress bar ────────────────────────────────────────────────────────────

function ProgressBar({ isPlaying, duration, onComplete }: { isPlaying: boolean; duration: number; onComplete: () => void }) {
  const progress = useMotionValue(0);
  const animRef = useRef<any>(null);

  useEffect(() => {
    progress.set(0);
    if (!isPlaying) return;
    animRef.current = animate(progress, 1, {
      duration: duration / 1000,
      ease: 'linear',
      onComplete,
    });
    return () => animRef.current?.stop();
  }, [isPlaying, duration]);

  return (
    <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div className="h-full bg-[#4a7c6f] rounded-full" style={{ scaleX: progress, originX: 0 }} />
    </div>
  );
}

// ─── Detail section ──────────────────────────────────────────────────────────

function DetailSection() {
  return (
    <div className="bg-[#faf8f5]">
      <div className="bg-[#0d1a16] py-16 text-center px-6">
        <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">What parents say</p>
        <blockquote className="text-white text-xl sm:text-3xl font-light max-w-2xl mx-auto leading-relaxed italic">
          "I checked on her once in the whole night. That's the first time in four months."
        </blockquote>
        <p className="text-white/30 text-sm mt-5">— Priya R., Bengaluru · Anvaya SENSE</p>
      </div>

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
              className="bg-white rounded-2xl border border-[#e2dbd4] p-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(74,124,111,0.1)' }}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-bold text-foreground mb-2">{f.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

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

      <div className="py-24 text-center px-6">
        <p className="text-muted-foreground text-sm mb-2">27 founding family spots remaining</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Ready to sleep tonight?</h2>
        <Button asChild size="lg" className="text-white font-bold gap-2"
          style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 24px rgba(232,149,122,0.4)' }}>
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
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setScene(i);
    setKey(k => k + 1);
    setPlaying(true);
  }, []);

  const next = useCallback(() => {
    setScene(s => {
      const n = (s + 1) % SCENES.length;
      setKey(k => k + 1);
      return n;
    });
    setPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying(p => !p);
    if (!playing) setKey(k => k + 1);
  }, [playing]);

  const SceneComponent = SCENE_COMPONENTS[scene];

  return (
    <>
      {/* ── Cinematic player ── */}
      <div className="relative h-screen w-full overflow-hidden" style={{ background: BG[scene] }}>

        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay" aria-hidden="true"
          style={{ backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4t5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92ZBsiLJEaR0dPe7gfz2akv4Ynr7hTDVEyWMYDIxuLKGjP+OPlkx6f7Y0VNy/fGJCdqSRXnkZtKFkLZFJV3FuqW/9aJoUu9yGOXrjwNe7OZMzUiV9aPqTHxSY5fxXFLz7VXDXN0XvW+d7AJ6VxMHrT2vQ2U5xtVX5lh7KDsLNUiXBb+GFMVzDx9aIpYsSnIbkf47HJfPVWoUF1kqXUKJFqb2lXmTsq/a8a+RZi7DqDHtVWcIj0xI//M8SrT0sFDHDj24r7cRLfWc4UQpb7bFnKuQJhXSmRFmHHlq1cOq5CZAqaqEJaORNagmACEBLEAb7+BFoO0Y8l/9+0HF3t14SYVdEI01INJczikAoWE9oDJ4MkXmEiL6nPf/8nFPnFRMz5RGXNkK/QBY5L6jbQ==")` }} />

        {/* Scene */}
        <AnimatePresence mode="wait">
          <motion.div key={scene} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <SceneComponent />
          </motion.div>
        </AnimatePresence>

        {/* Bottom HUD */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-8"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>

          {/* Progress bars */}
          <div className="flex gap-1.5 mb-4">
            {SCENES.map((_, i) => (
              <button key={i} className="flex-1 group" onClick={() => goTo(i)} aria-label={`Go to scene ${i + 1}`}>
                {i === scene ? (
                  <ProgressBar key={key} isPlaying={playing} duration={SCENE_DURATION} onComplete={next} />
                ) : (
                  <div className={`h-0.5 rounded-full transition-colors ${i < scene ? 'bg-[#4a7c6f]' : 'bg-white/20'}`} />
                )}
              </button>
            ))}
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label={playing ? 'Pause' : 'Play'}>
                {playing
                  ? <Pause className="w-3.5 h-3.5 text-white" />
                  : <Play className="w-3.5 h-3.5 text-white ml-0.5" />}
              </button>
              <span className="text-white/50 text-xs font-medium">{SCENES[scene]}</span>
            </div>
            <div className="text-white/30 text-xs">{scene + 1} / {SCENES.length}</div>
          </div>
        </div>

        {/* Chapter dots — right side */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {SCENES.map((label, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={label}
              className="flex items-center gap-2 group">
              <span className="text-[10px] text-white/30 hidden sm:block group-hover:text-white/60 transition-colors">
                {i === scene ? label : ''}
              </span>
              <motion.div className="rounded-full"
                animate={{ width: i === scene ? 18 : 5, height: 5, background: i === scene ? '#4a7c6f' : 'rgba(255,255,255,0.2)' }}
                transition={{ duration: 0.25 }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Detail content ── */}
      <DetailSection />
    </>
  );
}
