'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

type Worry = 'breathing' | 'crying' | 'sleep';

const WORRIES = [
  { id: 'breathing' as Worry, icon: '🫁', label: 'Is she breathing?',       sub: 'The silence at 3 AM',     color: '#4ade80', dim: '#1a3d2e' },
  { id: 'crying'    as Worry, icon: '😢', label: 'Why is he crying?',        sub: 'Hunger? Pain? Nothing?',  color: '#fb923c', dim: '#3d1a0a' },
  { id: 'sleep'     as Worry, icon: '🌙', label: 'Is she sleeping enough?',  sub: 'Deep sleep = brain growth', color: '#a78bfa', dim: '#1a1040' },
];

// ── Pod recommendation per worry ──────────────────────────────────────────────
type PodRec = {
  name: string; price: string; originalPrice: string;
  badge: string; why: string;
  features: string[];
  href: string;
};

const POD_REC: Record<Worry, PodRec> = {
  breathing: {
    name: 'Anvaya SENSE', price: '₹10,999', originalPrice: '₹12,999',
    badge: '🫁 Best for breathing & SpO₂',
    why: 'SENSE is built for exactly what you just experienced — contactless breathing rate + SpO₂ oxygen monitoring, 24/7, with instant alerts.',
    features: ['✅ Contactless breathing rate (radar)', '✅ SpO₂ oxygen monitoring', '✅ Instant alert under 3 seconds', '✅ 9-hour overnight report', '✅ Nothing touches your baby'],
    href: '/preorder?pod=sense',
  },
  crying: {
    name: 'Anvaya SENSE', price: '₹10,999', originalPrice: '₹12,999',
    badge: '🍼 Best for cry analysis',
    why: 'SENSE includes the full AI cry classifier — hunger, pain, discomfort, fatigue — plus breathing and SpO₂ so you see the complete picture.',
    features: ['✅ AI cry classifier (5 types)', '✅ Real-time cry pattern analysis', '✅ 7-day cry history & trends', '✅ Breathing + SpO₂ included', '✅ Nothing touches your baby'],
    href: '/preorder?pod=sense',
  },
  sleep: {
    name: 'Anvaya PULSE', price: '₹13,999', originalPrice: '₹15,999',
    badge: '💜 Best for sleep tracking',
    why: 'PULSE maps deep sleep, REM, and light sleep cycles all night — plus smart alerts that wait for self-settling so you\'re not woken unnecessarily.',
    features: ['✅ Deep / REM / light sleep staging', '✅ Smart 90s self-settle window', '✅ Sleep quality score nightly', '✅ 30-day sleep trend reports', '✅ Nothing touches your baby'],
    href: '/preorder?pod=pulse',
  },
};

// ── Step data ─────────────────────────────────────────────────────────────────
type Step = {
  scene: 'midnight' | 'radar' | 'data' | 'alert' | 'morning' | 'decide';
  timeTag?: string;
  heading: string;
  body: string;
  cta: string;
  stat: { value: string; label: string };
  tip: string;
};

const STEPS: Record<Worry, Step[]> = {
  breathing: [
    { scene: 'midnight', timeTag: '3:02 AM', heading: '😶 She hasn\'t made a sound\nin 40 minutes.', body: 'The silence that should feel peaceful — doesn\'t.', cta: 'What\'s Anvaya doing? →', stat: { value: '12,840', label: 'breaths checked tonight' }, tip: '✅ Every single one: normal.' },
    { scene: 'radar',    heading: '📡 A small clip. No wires.\nNothing on baby.', body: 'Like a baby monitor — but instead of a camera, it reads the air your baby breathes. Completely contactless.', cta: 'Show me what it sees →', stat: { value: '6', label: 'sensors. Zero contact.' }, tip: '🫁 Breathing · SpO₂ · Temp · Sound · Motion · Cry' },
    { scene: 'data',     heading: '✅ 42 breaths per minute.\nNormal. Safe.', body: 'Not a guess. Real data — checked while you slept, 12,840 times tonight.', cta: 'What if something changes? →', stat: { value: '98%', label: 'SpO₂ oxygen — perfect' }, tip: '⚡ Alerts fire in under 3 seconds if anything deviates.' },
    { scene: 'alert',    timeTag: '3:47 AM', heading: '⚡ SpO₂ dipped briefly.\nAnvaya was already on it.', body: 'Before you were fully awake — your phone already knew and woke you.', cta: 'What happened next? →', stat: { value: '18s', label: 'until you were there' }, tip: '💚 You were at her side in 18 seconds. She was fine.' },
    { scene: 'morning',  timeTag: '6:14 AM', heading: '☀️ She woke up smiling.\nYou both made it.', body: 'Every breath logged. Every pattern recorded. You have 9 hours of proof she was safe.', cta: 'Which Anvaya is right for us? →', stat: { value: '8.4', label: 'sleep quality score' }, tip: '📋 Share the full report with your pediatrician.' },
    { scene: 'decide',   heading: '🎯 Made for your worry.\nBuilt for your baby.', body: 'Based on what you just saw, here\'s the pod we\'d recommend for you.', cta: '', stat: { value: '₹2,000', label: 'founding family saving' }, tip: '🔒 No payment now. Reserve your spot.' },
  ],
  crying: [
    { scene: 'midnight', timeTag: '2:58 AM', heading: '😭 Third time tonight.\nYou don\'t know why.', body: 'Fed, changed, held. Still crying. The helplessness is the hardest part.', cta: 'What does Anvaya hear? →', stat: { value: '0.4s', label: 'to detect the cry' }, tip: '👂 Heard him before your phone even buzzed.' },
    { scene: 'radar',    heading: '🎙️ Every cry has a signature.\nAnvaya reads it.', body: 'Think of it like Shazam — but for baby cries. It recognises the pattern, not just the sound.', cta: 'Show me the analysis →', stat: { value: '50K+', label: 'cry recordings trained on' }, tip: '🇮🇳 Tuned to Indian acoustic environments.' },
    { scene: 'data',     heading: '🍼 Hunger. 94% confidence.\nFeed him. Rest easy.', body: 'Not pain. Not gas. You pick him up knowing exactly what he needs — no guessing.', cta: 'How accurate is this? →', stat: { value: '94%', label: 'classification confidence' }, tip: '👨‍⚕️ Matched pediatrician assessments 91% of the time.' },
    { scene: 'alert',    heading: '⏱️ The guessing spiral — gone.\n20 minutes → 8 seconds.', body: 'At 3 AM, certainty is everything. You know what he needs before you\'re even standing.', cta: 'What does the pattern show? →', stat: { value: '8s', label: 'average response time' }, tip: '📊 23 hunger · 4 discomfort · 1 pain this week.' },
    { scene: 'morning',  timeTag: '7:00 AM', heading: '😴 He\'s peaceful.\nYou slept 4 hours straight.', body: 'Because when it mattered, you knew in seconds. You both went right back to sleep.', cta: 'Which Anvaya is right for us? →', stat: { value: '+3.1h', label: 'extra sleep per night' }, tip: '🌟 38% fewer wake-ups reported by week 2.' },
    { scene: 'decide',   heading: '🎯 Made for your worry.\nBuilt for your baby.', body: 'Based on what you just saw, here\'s the pod we\'d recommend for you.', cta: '', stat: { value: '₹2,000', label: 'founding family saving' }, tip: '🔒 No payment now. Reserve your spot.' },
  ],
  sleep: [
    { scene: 'midnight', timeTag: '11:00 PM', heading: '🌙 Is she in deep sleep?\nOr just quiet?', body: 'Her brain is building itself right now. The quality of this sleep matters more than you know.', cta: 'What is Anvaya tracking? →', stat: { value: '18 min', label: 'in deep sleep now' }, tip: '🧠 Brain development is happening right now.' },
    { scene: 'radar',    heading: '🔬 No chest clip.\nNo wrist band. Nothing.', body: 'Like a sleep lab — but at home. Same data, zero discomfort. She sleeps better because nothing\'s on her.', cta: 'Show me the sleep map →', stat: { value: '3', label: 'stages: deep · REM · light' }, tip: '💤 Newborns spend 50% of sleep in REM.' },
    { scene: 'data',     heading: '💜 Deep sleep: 3.8h.\nREM: 2.1h. Optimal.', body: 'Not an average. Not a guess. Her actual sleep, mapped in real time while you rest.', cta: 'What does optimal mean? →', stat: { value: '9.1', label: 'sleep quality score' }, tip: '👶 4h+ deep sleep = healthy cognitive development (AAP).' },
    { scene: 'alert',    timeTag: '2:14 AM', heading: '🤫 She stirred.\nAnvaya waited. She settled.', body: 'Anvaya gave her 90 seconds to self-soothe. She did. You slept through it — because you could.', cta: 'How does it decide? →', stat: { value: '90s', label: 'smart wait before alerting' }, tip: '😴 Reduces unnecessary parent wake-ups by 61%.' },
    { scene: 'morning',  timeTag: '6:48 AM', heading: '☀️ She woke up smiling.\n9.2 hours of great sleep.', body: 'Her brain had exactly what it needed. So did yours. Both of you, well-rested.', cta: 'Which Anvaya is right for us? →', stat: { value: '4.1h', label: 'deep sleep — optimal' }, tip: '📋 Total: 9h 14m · REM: 2.3h · 1 self-settled waking.' },
    { scene: 'decide',   heading: '🎯 Made for your worry.\nBuilt for your baby.', body: 'Based on what you just saw, here\'s the pod we\'d recommend for you.', cta: '', stat: { value: '₹2,000', label: 'founding family saving' }, tip: '🔒 No payment now. Reserve your spot.' },
  ],
};

// ── Atmospheric backgrounds ───────────────────────────────────────────────────
function BgMidnight({ color, timeTag }: { color: string; timeTag?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#030507' }}>
      {/* Slow heartbeat rings */}
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 200, height: 200, border: `1px solid ${color}18` }}
          animate={{ scale: [0.5, 3], opacity: [0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: 'easeOut' }} />
      ))}
      {/* Giant dim time watermark */}
      {timeTag && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-bold text-white/[0.025] leading-none" style={{ fontSize: 'clamp(80px, 28vw, 220px)' }}>
            {timeTag}
          </span>
        </div>
      )}
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, #030507 85%)' }} />
    </div>
  );
}

function BgRadar({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#04080c' }}>
      {/* Radar sweep rings */}
      {[1, 2, 3, 4].map(i => (
        <motion.div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ width: i * 120, height: i * 120, borderColor: `${color}12` }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }} />
      ))}
      {/* Rotating sweep line */}
      <motion.div className="absolute left-1/2 top-1/2 origin-left"
        style={{ width: '35vmax', height: 1, background: `linear-gradient(to right, ${color}40, transparent)`, marginTop: 0 }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
        style={{ background: color, boxShadow: `0 0 40px 20px ${color}30` }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #04080c 80%)' }} />
    </div>
  );
}

function BgData({ color }: { color: string }) {
  const bars = Array.from({ length: 40 }, (_, i) => ({ h: 20 + Math.sin(i * 0.6) * 60 + Math.sin(i * 1.4) * 20, i }));
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#040a07' }}>
      {/* Full-width breathing bars as background */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-0.5 opacity-15" style={{ height: '60%' }}>
        {bars.map(b => (
          <motion.div key={b.i} className="flex-1 rounded-t-sm" style={{ background: color }}
            animate={{ height: [`${Math.max(5, b.h)}%`, `${Math.max(5, b.h + 15)}%`, `${Math.max(5, b.h)}%`] }}
            transition={{ duration: 3 + b.i * 0.05, repeat: Infinity, ease: 'easeInOut', delay: b.i * 0.04 }} />
        ))}
      </div>
      {/* Color bloom */}
      <div className="absolute left-1/2 bottom-1/3 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: color }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, #040a07 75%)' }} />
    </div>
  );
}

function BgAlert({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#080402' }}>
      {/* Urgent pulse */}
      {[0, 1].map(i => (
        <motion.div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 160, height: 160 }}
          animate={{ scale: [1, 3.5], opacity: [0.25, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.9, ease: 'easeOut' }}
          >
          <div className="w-full h-full rounded-full" style={{ background: '#fb923c' }} />
        </motion.div>
      ))}
      {/* Edge glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(251,146,60,0.06) 0%, #080402 65%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #080402 90%)' }} />
    </div>
  );
}

function BgMorning({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#0d0c06' }}>
      {/* Sunrise gradient rising */}
      <motion.div className="absolute bottom-0 left-0 right-0"
        style={{ height: '70%', background: `linear-gradient(to top, ${color}18 0%, ${color}06 50%, transparent 100%)` }}
        animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 4, repeat: Infinity }} />
      {/* Warm central glow */}
      <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: color }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 25%, #0d0c06 80%)' }} />
    </div>
  );
}

function BgDecide({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#08080e' }}>
      {/* Soft radial bloom */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl"
        style={{ background: color, opacity: 0.07 }} />
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(${color}40 1px, transparent 1px), linear-gradient(90deg, ${color}40 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #08080e 80%)' }} />
    </div>
  );
}

const SCENE_BACKGROUNDS: Record<Step['scene'], (props: { color: string; timeTag?: string }) => React.ReactNode> = {
  midnight: ({ color, timeTag }) => <BgMidnight color={color} timeTag={timeTag} />,
  radar:    ({ color }) => <BgRadar color={color} />,
  data:     ({ color }) => <BgData color={color} />,
  alert:    ({ color }) => <BgAlert color={color} />,
  morning:  ({ color }) => <BgMorning color={color} />,
  decide:   ({ color }) => <BgDecide color={color} />,
};

// ── Phone screens — cinematic, minimal, one big thing ────────────────────────
function PhoneScreenMidnight({ color, worry }: { color: string; worry: Worry }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(p => p + 1), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="w-full h-full flex flex-col" style={{ background: '#030507' }}>
      {/* Status bar */}
      <div className="flex justify-between px-4 pt-2 pb-1">
        <span className="text-[8px] text-white/30">9:41</span>
        <motion.span className="text-[8px] font-bold" style={{ color }}
          animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>● LIVE</motion.span>
      </div>
      {/* Time */}
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="text-white/20 text-[9px] uppercase tracking-widest">Anvaya · Baby Room</div>
        <div className="text-white font-bold leading-none" style={{ fontSize: 52 }}>3:02</div>
        <div className="text-white/20 text-xs">AM</div>
        <div className="mt-4 flex flex-col items-center gap-1">
          <motion.div className="flex items-center gap-1.5" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-[9px]" style={{ color }}>Watching</span>
          </motion.div>
          <span className="text-[8px] text-white/20">{worry === 'breathing' ? '42 br/min · all clear' : worry === 'sleep' ? 'Deep sleep detected' : 'Silent mode'}</span>
        </div>
      </div>
      {/* Bottom heartbeat line */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-0.5 h-6">
          {Array.from({ length: 30 }, (_, i) => {
            const v = i === 10 || i === 11 ? 90 : i === 12 ? 100 : i === 13 ? 30 : i === 14 ? 70 : 20 + Math.sin(i * 0.3) * 15;
            return <div key={i} className="flex-1 rounded-sm" style={{ height: `${Math.max(4, v)}%`, background: color, opacity: 0.5 + (i / 30) * 0.5 }} />;
          })}
        </div>
        <div className="text-[7px] text-white/20 text-center mt-1">Heartbeat baseline</div>
      </div>
    </div>
  );
}

function PhoneScreenRadar({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: '#04080c' }}>
      <div className="text-[8px] text-white/25 uppercase tracking-widest">Anvaya Smart · Active</div>
      <div className="relative w-28 h-28">
        {[0.5, 1, 1.5, 2].map((s, i) => (
          <motion.div key={i} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ width: 30 * s * 2, height: 30 * s * 2, borderColor: `${color}25` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }} />
        ))}
        <motion.div className="absolute left-1/2 top-1/2 origin-left rounded-full"
          style={{ width: 56, height: 1, background: `linear-gradient(to right, ${color}60, transparent)` }}
          animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
          style={{ background: color, boxShadow: `0 0 20px 8px ${color}40` }} />
      </div>
      <div className="text-sm font-bold" style={{ color }}>Crib mounted</div>
      <div className="grid grid-cols-3 gap-1 px-3 w-full">
        {['Radar', 'SpO₂', 'Temp', 'Audio', 'Motion', 'AI'].map((s, i) => (
          <motion.div key={s} className="rounded-lg py-1 flex flex-col items-center gap-0.5 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            animate={{ borderColor: [`rgba(255,255,255,0.08)`, `${color}50`, `rgba(255,255,255,0.08)`] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
            <div className="w-1 h-1 rounded-full" style={{ background: color }} />
            <span className="text-[7px] text-white/40">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PhoneScreenData({ color, worry }: { color: string; worry: Worry }) {
  const primary = worry === 'breathing' ? { label: 'Breathing', value: '42', unit: '/min', sub: 'Normal range: 30–60' }
    : worry === 'crying' ? { label: 'Cry Type', value: '94%', unit: '', sub: 'Hunger — feed now' }
    : { label: 'Deep Sleep', value: '3.8', unit: 'hrs', sub: 'Optimal for age' };
  const bars = Array.from({ length: 24 }, (_, i) => Math.max(8, 30 + Math.sin(i * 0.65) * 55 + Math.sin(i * 1.7) * 15));
  return (
    <div className="w-full h-full flex flex-col p-3" style={{ background: '#040a07' }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[7px] text-white/25 uppercase tracking-wider">Anvaya Live</span>
        <motion.span className="text-[7px] font-bold" style={{ color }}
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>● LIVE</motion.span>
      </div>
      {/* BIG stat */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-[8px] text-white/30 uppercase tracking-widest mb-1">{primary.label}</div>
        <div className="flex items-end gap-1 leading-none">
          <span className="font-bold text-white" style={{ fontSize: 52 }}>{primary.value}</span>
          {primary.unit && <span className="text-lg font-semibold mb-2" style={{ color }}>{primary.unit}</span>}
        </div>
        <div className="text-[9px] mt-1.5 font-semibold" style={{ color }}>{primary.sub}</div>
      </div>
      {/* Waveform */}
      <div className="flex items-end gap-0.5" style={{ height: 40 }}>
        {bars.map((h, i) => (
          <motion.div key={i} className="flex-1 rounded-t-sm" style={{ background: color, opacity: 0.4 + i / bars.length * 0.6 }}
            animate={{ height: [`${h}%`, `${Math.min(100, h + 12)}%`, `${h}%`] }}
            transition={{ duration: 2 + i * 0.05, repeat: Infinity, delay: i * 0.04 }} />
        ))}
      </div>
    </div>
  );
}

function PhoneScreenAlert({ worry }: { worry: Worry }) {
  const isCry = worry === 'crying';
  const isSleep = worry === 'sleep';
  return (
    <div className="w-full h-full flex flex-col" style={{ background: isSleep ? '#04060e' : '#0a0402' }}>
      {/* Alert banner */}
      <motion.div className="px-3 py-2.5 border-b"
        style={{ borderColor: 'rgba(251,146,60,0.3)', background: 'rgba(251,146,60,0.1)' }}
        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <div className="text-[8px] text-orange-400/70 uppercase tracking-wider">{isSleep ? '2:14 AM · Night waking' : isCry ? '3:47 AM · Cry detected' : '3:47 AM · Alert'}</div>
        <div className="text-sm font-bold text-white mt-0.5">{isCry ? 'Analyzing cry pattern' : isSleep ? 'Baby stirred — monitoring' : 'SpO₂ brief dip'}</div>
      </motion.div>
      {isCry ? (
        <div className="flex-1 flex flex-col p-3 gap-2">
          {/* Waveform */}
          <div className="flex items-end gap-0.5" style={{ height: 36 }}>
            {Array.from({ length: 22 }, (_, i) => {
              const h = Math.max(6, 15 + Math.sin(i * 0.9) * 65 + Math.sin(i * 2.1) * 18);
              return <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: '#fb923c' }} />;
            })}
          </div>
          {/* Bars */}
          <div className="space-y-1.5 flex-1">
            {[{ l: 'Hunger', v: 94 }, { l: 'Discomfort', v: 4 }, { l: 'Pain', v: 2 }].map((b, i) => (
              <div key={b.l} className="flex items-center gap-2">
                <span className="text-[7px] text-white/30 w-14">{b.l}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: i === 0 ? '#4ade80' : '#334155' }}
                    initial={{ width: 0 }} animate={{ width: `${b.v}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} />
                </div>
                <span className="text-[7px] font-bold w-5" style={{ color: i === 0 ? '#4ade80' : '#475569' }}>{b.v}%</span>
              </div>
            ))}
          </div>
          {/* Verdict */}
          <div className="rounded-xl p-2.5 text-center border border-emerald-400/25" style={{ background: 'rgba(74,222,128,0.08)' }}>
            <div className="text-[7px] text-emerald-400/60 uppercase tracking-wider">Verdict</div>
            <div className="text-base font-bold text-emerald-300">Hunger · Feed now</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4">
          <motion.div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)' }}
            animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div className="text-2xl">⚡</div>
          </motion.div>
          <div className="text-xs font-bold text-white text-center">{isSleep ? 'Self-settling…\n60 second window' : 'Alert sent\nYou were notified'}</div>
          <div className="text-[9px] text-white/30 text-center">{isSleep ? 'No action needed yet' : 'SpO₂ returned to 97%'}</div>
        </div>
      )}
    </div>
  );
}

function PhoneScreenMorning({ color, worry }: { color: string; worry: Worry }) {
  const rows = worry === 'breathing'
    ? [{ l: 'Avg breathing', v: '41/min' }, { l: 'Apnea events', v: 'None' }, { l: 'Sleep score', v: '8.4/10' }]
    : worry === 'crying'
    ? [{ l: 'Cry episodes', v: '2 total' }, { l: 'Classified', v: '2 / 2 ✓' }, { l: 'Extra sleep', v: '+3.1 hrs' }]
    : [{ l: 'Total sleep', v: '9h 14m' }, { l: 'Deep sleep', v: '4.1 hrs' }, { l: 'Score', v: '9.1 / 10' }];
  return (
    <div className="w-full h-full flex flex-col p-3" style={{ background: '#0a0d06' }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <div className="text-[8px] text-white/25 uppercase tracking-widest">Morning Report</div>
        <div className="font-bold text-white leading-none" style={{ fontSize: 44 }}>6:14</div>
        <div className="text-[8px] text-white/25">AM · Baby doing great</div>
        <div className="w-12 h-0.5 rounded-full mt-2" style={{ background: color + '60' }} />
      </div>
      <div className="space-y-1.5">
        {rows.map(r => (
          <div key={r.l} className="flex justify-between px-3 py-1.5 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span className="text-[8px] text-white/30">{r.l}</span>
            <span className="text-[8px] font-bold" style={{ color }}>{r.v}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[7px] text-white/15 mt-2">Share with pediatrician · PDF export</div>
    </div>
  );
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneScreenDecide({ color, worry }: { color: string; worry: Worry }) {
  const rec = POD_REC[worry];
  return (
    <div className="w-full h-full flex flex-col p-3" style={{ background: '#08080e' }}>
      {/* Badge */}
      <div className="rounded-xl px-2.5 py-1.5 text-center mb-2 border" style={{ background: color + '12', borderColor: color + '30' }}>
        <div className="text-[8px] font-bold" style={{ color }}>{rec.badge}</div>
      </div>
      {/* Pod name + price */}
      <div className="text-center mb-2">
        <div className="text-sm font-bold text-white">{rec.name}</div>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <span className="text-lg font-bold" style={{ color }}>{rec.price}</span>
          <span className="text-[9px] text-white/25 line-through">{rec.originalPrice}</span>
        </div>
        <div className="text-[7px] text-white/25 mt-0.5">Founding family price · Limited spots</div>
      </div>
      {/* Features */}
      <div className="flex-1 space-y-1.5 overflow-hidden">
        {rec.features.map((f, i) => (
          <motion.div key={f} className="text-[8px] text-white/60 leading-relaxed"
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}>
            {f}
          </motion.div>
        ))}
      </div>
      {/* Guarantee strip */}
      <div className="rounded-lg p-1.5 text-center border border-white/8 mt-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="text-[7px] text-white/30">🔒 No payment now · 30-day guarantee · Free shipping</div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, shake, color }: { children: React.ReactNode; shake?: boolean; color: string }) {
  return (
    <motion.div className="relative mx-auto"
      style={{ width: 'min(190px, 52vw)', height: 'min(380px, 48vh)' }}
      animate={shake ? { x: [0, -8, 8, -5, 5, -2, 2, 0], rotate: [0, -1, 1, 0] } : {}}
      transition={shake ? { duration: 0.6 } : {}}>
      {/* Glow */}
      <motion.div className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{ background: color, scale: 1.6, opacity: 0.12 }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 3, repeat: Infinity }} />
      {/* Shell */}
      <div className="absolute inset-0 rounded-[34px] shadow-2xl overflow-hidden"
        style={{ border: `1px solid rgba(255,255,255,0.12)`, background: 'linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))' }}>
        {/* Side buttons */}
        <div className="absolute -right-0.5 top-16 w-0.5 h-7 rounded-r-sm bg-white/10" />
        <div className="absolute -left-0.5 top-12 w-0.5 h-5 rounded-l-sm bg-white/10" />
        <div className="absolute -left-0.5 top-20 w-0.5 h-5 rounded-l-sm bg-white/10" />
        {/* Screen */}
        <div className="absolute inset-1 rounded-[28px] overflow-hidden bg-black">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <div className="w-4 h-0.5 rounded-full bg-white/8" />
          </div>
          <div className="absolute top-4 left-3 right-3 flex justify-between z-10">
            <span className="text-[6px] text-white/25">9:41</span>
            <div className="flex gap-0.5 items-end">
              {[2, 4, 6, 8].map((h, i) => <div key={i} className="w-0.5 rounded-sm bg-white/30" style={{ height: h }} />)}
            </div>
          </div>
          <div className="absolute inset-0 pt-7">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Welcome ───────────────────────────────────────────────────────────────────
function WelcomeScreen({ onSelect }: { onSelect: (w: Worry) => void }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#07080d' }}>
      {/* Single soft neutral glow — no color mixing */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'rgba(180,160,255,0.05)' }} />
      {/* Subtle star dots */}
      {[...Array(18)].map((_, i) => (
        <motion.div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white"
          style={{ left: `${10 + (i * 37) % 80}%`, top: `${8 + (i * 53) % 60}%`, opacity: 0.15 + (i % 4) * 0.08 }}
          animate={{ opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.4 }} />
      ))}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #07080d 85%)' }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div className="w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          {/* Title */}
          <div className="text-center mb-6">
            <motion.div className="text-[9px] text-white/20 uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              ✨ Anvaya Smart · Interactive Tour
            </motion.div>
            <motion.h1 className="text-[26px] font-bold text-white leading-tight mb-2"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              What keeps you<br />up at night? 🌙
            </motion.h1>
            <motion.p className="text-white/30 text-xs leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Pick your worry — we'll walk you through exactly<br />how Anvaya handles it. 5 scenes. No scroll.
            </motion.p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-2.5">
            {WORRIES.map((w, i) => (
              <motion.button key={w.id} onClick={() => onSelect(w.id)}
                className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-left w-full border transition-all duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 160 }}
                whileHover={{ borderColor: w.color + '50', background: w.color + '12', x: 4 }}
                whileTap={{ scale: 0.97 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                  style={{ background: 'rgba(255,255,255,0.06)' }}>
                  {w.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{w.label}</div>
                  <div className="text-[10px] mt-0.5 text-white/40">{w.sub}</div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 text-white/20 group-hover:text-white/60 transition-colors" />
              </motion.button>
            ))}
          </div>

          {/* Safety analogy strip */}
          <motion.div className="mt-5 rounded-xl px-4 py-3 border border-white/8 text-center"
            style={{ background: 'rgba(255,255,255,0.03)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <div className="text-[10px] text-white/50 leading-relaxed">
              🛡️ <span className="text-white/70 font-medium">Nothing ever touches your baby.</span><br />
              Think of it like a night-vision guard — but made of light and sound, not wires or patches.
            </div>
          </motion.div>

          <motion.p className="text-center text-white/15 text-[9px] mt-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            5 scenes · swipe or tap · no scrolling
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

// ── Tour step ─────────────────────────────────────────────────────────────────
function TourStep({ stepIdx, totalSteps, step, worry, color, onNext, onPrev, onRestart }: {
  stepIdx: number; totalSteps: number; step: Step; worry: Worry; color: string;
  onNext: () => void; onPrev: () => void; onRestart: () => void;
}) {
  const [tipVisible, setTipVisible] = useState(false);
  const touchX = useRef(0);

  // Auto-hide tip after 4 seconds
  useEffect(() => {
    if (!tipVisible) return;
    const t = setTimeout(() => setTipVisible(false), 4000);
    return () => clearTimeout(t);
  }, [tipVisible, stepIdx]);

  // Reset tip on step change
  useEffect(() => { setTipVisible(false); }, [stepIdx]);

  const isDecide = step.scene === 'decide';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const phoneScreens: Record<Step['scene'], React.ReactNode> = {
    midnight: <PhoneScreenMidnight color={color} worry={worry} />,
    radar:    <PhoneScreenRadar color={color} />,
    data:     <PhoneScreenData color={color} worry={worry} />,
    alert:    <PhoneScreenAlert worry={worry} />,
    morning:  <PhoneScreenMorning color={color} worry={worry} />,
    decide:   <PhoneScreenDecide color={color} worry={worry} />,
  };

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden"
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const dx = touchX.current - e.changedTouches[0].clientX;
        if (dx > 50) onNext();
        else if (dx < -50 && stepIdx > 0) onPrev();
      }}>

      {/* Scene background */}
      <AnimatePresence mode="wait">
        <motion.div key={`bg-${stepIdx}`} className="absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}>
          {SCENE_BACKGROUNDS[step.scene]({ color, timeTag: step.timeTag })}
        </motion.div>
      </AnimatePresence>

      {/* Top bar — sits below main site header (header is ~56-64px) */}
      <div className="relative z-10 shrink-0 flex items-center justify-between px-5 pb-2" style={{ paddingTop: 'max(env(safe-area-inset-top, 12px), 12px)' }}>
        <button onClick={onRestart} className="text-[9px] text-white/25 hover:text-white/50 uppercase tracking-widest transition-colors flex items-center gap-1">
          ← Worries
        </button>
        {/* Progress pills */}
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div key={i} className="h-0.5 rounded-full"
              animate={{ width: i === stepIdx ? 22 : 5, background: i <= stepIdx ? color : 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.25 }} />
          ))}
        </div>
        <span className="text-[9px] text-white/20">{stepIdx + 1}/{totalSteps}</span>
      </div>

      {/* Main composition */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 gap-3 min-h-0 overflow-hidden">

        {/* Scene time tag */}
        {step.timeTag && (
          <motion.div key={`tag-${stepIdx}`}
            className="text-[9px] font-bold uppercase tracking-[0.3em]"
            style={{ color: color + '60' }}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {step.timeTag}
          </motion.div>
        )}

        {/* Phone */}
        <motion.div key={`phone-${stepIdx}`} className="shrink-0"
          initial={{ opacity: 0, scale: 0.88, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, type: 'spring', stiffness: 140, damping: 20 }}>
          <PhoneFrame color={color} shake={step.scene === 'alert' && worry !== 'sleep'}>
            {phoneScreens[step.scene]}
          </PhoneFrame>
        </motion.div>

        {/* Stat badge — appears on phone tap / hotspot */}
        <AnimatePresence>
          {tipVisible && (
            <motion.div className="absolute z-20 rounded-2xl px-4 py-2.5 text-center border"
              style={{ background: color + '15', borderColor: color + '40', bottom: '30%' }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
              <div className="text-xs font-bold" style={{ color }}>{step.stat.value} {step.stat.label}</div>
              <div className="text-[9px] text-white/40 mt-0.5">{step.tip}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heading text */}
        <motion.div key={`text-${stepIdx}`} className="text-center w-full max-w-xs"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
          <h2 className="text-lg font-bold text-white leading-snug whitespace-pre-line">{step.heading}</h2>
          <p className="text-xs text-white/35 mt-2 leading-relaxed">{step.body}</p>
          {/* Tap for stat hint */}
          <motion.button onClick={() => setTipVisible(v => !v)}
            className="mt-2 text-[9px] flex items-center gap-1 mx-auto"
            style={{ color: color + '60' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[7px] font-bold shrink-0"
              style={{ borderColor: color + '50', color }}>?</span>
            {step.stat.value} {step.stat.label}
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom nav */}
      <div className="relative z-10 shrink-0 px-5 pb-7 pt-2">
        {isDecide ? (
          /* Decide step — rich CTA */
          <div className="flex flex-col gap-2">
            {/* Why this pod — one sentence */}
            <p className="text-[10px] text-white/35 text-center leading-relaxed px-2">{POD_REC[worry].why}</p>
            <Button asChild className="w-full h-12 font-bold text-sm gap-2 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 4px 24px ${color}40` }}>
              <Link href={POD_REC[worry].href}><Sparkles className="w-4 h-4" />Reserve {POD_REC[worry].name} — {POD_REC[worry].price}</Link>
            </Button>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1 h-10 text-xs border-white/10 text-white/50 hover:text-white bg-transparent hover:bg-white/5">
                <Link href="/compare">Compare all pods →</Link>
              </Button>
              <button onClick={onPrev}
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/25 hover:text-white/50 transition-colors shrink-0"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[9px] text-white/20">🔒 No payment now · 30-day money-back · Free shipping</p>
          </div>
        ) : (
          /* Normal steps */
          <div className="flex items-center gap-3">
            {stepIdx > 0 && (
              <button onClick={onPrev}
                className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 shrink-0 transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <motion.button onClick={onNext}
              className="flex-1 h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${color}dd, ${color}99)`, boxShadow: `0 4px 20px ${color}35` }}
              whileTap={{ scale: 0.97 }}>
              {step.cta} <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TourPage() {
  const [worry, setWorry] = useState<Worry | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [dir, setDir] = useState(1);

  // Lock body scroll so mobile browser address bar can't shift the layout
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = '';
    };
  }, []);

  const worryConfig = WORRIES.find(w => w.id === worry);
  const steps = worry ? STEPS[worry] : [];

  const go = (next: number) => { setDir(next > stepIdx ? 1 : -1); setStepIdx(next); };
  const handleSelect = (w: Worry) => { setWorry(w); setStepIdx(0); setDir(1); };
  const handleRestart = () => { setWorry(null); setStepIdx(0); };

  return (
    // 100dvh = dynamic viewport height — accounts for iOS address bar correctly
    <div className="fixed inset-0 overflow-hidden z-[100] touch-none"
      style={{ background: '#030507', height: '100dvh' }}>
      <AnimatePresence initial={false}>
        {!worry
          ? <motion.div key="welcome" className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              <WelcomeScreen onSelect={handleSelect} />
            </motion.div>
          : <motion.div key={`${worry}-${stepIdx}`} className="absolute inset-0"
              initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}>
              {worryConfig && (
                <TourStep
                  stepIdx={stepIdx} totalSteps={steps.length}
                  step={steps[stepIdx]} worry={worry} color={worryConfig.color}
                  onNext={() => stepIdx < steps.length - 1 && go(stepIdx + 1)}
                  onPrev={() => stepIdx > 0 && go(stepIdx - 1)}
                  onRestart={handleRestart} />
              )}
            </motion.div>
        }
      </AnimatePresence>
    </div>
  );
}
