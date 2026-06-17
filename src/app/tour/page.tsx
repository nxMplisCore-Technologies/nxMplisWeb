'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wind, Moon, Sparkles, X, ChevronRight, Heart, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';

type Worry = 'breathing' | 'crying' | 'sleep';

// ── Worry config ─────────────────────────────────────────────────────────────
const WORRIES: { id: Worry; icon: React.ReactNode; label: string; sub: string; color: string; glow: string }[] = [
  {
    id: 'breathing',
    icon: <Wind className="w-7 h-7" />,
    label: 'Is she breathing?',
    sub: 'The silent fear at 3 AM',
    color: '#4a7c6f',
    glow: 'rgba(74,124,111,0.4)',
  },
  {
    id: 'crying',
    icon: <Baby className="w-7 h-7" />,
    label: 'Why is he crying?',
    sub: 'Hunger? Pain? Discomfort?',
    color: '#e8957a',
    glow: 'rgba(232,149,122,0.4)',
  },
  {
    id: 'sleep',
    icon: <Moon className="w-7 h-7" />,
    label: 'Is she sleeping enough?',
    sub: 'Deep sleep matters for the brain',
    color: '#5a7fa8',
    glow: 'rgba(90,127,168,0.4)',
  },
];

// ── Per-step, per-worry content ───────────────────────────────────────────────
type StepContent = {
  bg: string;
  heading: string;
  body: string;
  cta: string;
  hotspot: { top: string; left: string; title: string; body: string };
  screen: 'home' | 'alert' | 'sleep' | 'ai' | 'morning' | 'device';
};

const STEPS: Record<Worry, StepContent[]> = {
  breathing: [
    {
      bg: 'linear-gradient(135deg,#080e14 0%,#0d1a14 100%)',
      heading: 'It\'s 3:02 AM. She hasn\'t made a sound in 40 minutes.',
      body: 'You lie still, ears straining. Nothing. The silence that should feel peaceful — doesn\'t. You start to wonder.',
      cta: 'What\'s Anvaya doing right now?',
      hotspot: { top: '28%', left: '68%', title: 'Always Watching', body: 'Anvaya has checked her breathing 12,840 times in the last 4 hours. Every single one: normal.' },
      screen: 'home',
    },
    {
      bg: 'linear-gradient(135deg,#060d10 0%,#0a1a14 100%)',
      heading: 'A small device. Clipped to the crib. No wires. No patches.',
      body: 'Just radar, AI, and 6 sensors working silently in the dark — so you don\'t have to stay awake to watch.',
      cta: 'Show me what it sees',
      hotspot: { top: '42%', left: '22%', title: '6 Sensors, 1 Device', body: 'Breathing rate, SpO₂, temperature, sound, motion, cry type — contactless. No chest patches. No wrist clips.' },
      screen: 'device',
    },
    {
      bg: 'linear-gradient(135deg,#06100d 0%,#0d2018 100%)',
      heading: 'Her breathing: 42 breaths per minute. Normal. Safe.',
      body: 'Anvaya has tracked every breath tonight. 42/min is perfect for a 3-month-old. You\'re looking at proof she\'s okay.',
      cta: 'What if something changes?',
      hotspot: { top: '36%', left: '72%', title: 'Breathing Rate', body: 'Normal range: 30–60/min for newborns. Anvaya alerts you instantly if it drops or spikes — before it becomes an emergency.' },
      screen: 'home',
    },
    {
      bg: 'linear-gradient(135deg,#0e0800 0%,#1a1000 100%)',
      heading: 'At 3:47 AM — her breathing slows. An alert fires.',
      body: 'Before you\'re fully awake, your phone is already telling you what\'s happening. You know in 3 seconds. Not 3 minutes.',
      cta: 'What did the alert say?',
      hotspot: { top: '24%', left: '65%', title: 'Instant Alert', body: 'SpO₂ dipped to 91%. Anvaya fired a push notification and a bedside sound — you were at her side in 18 seconds.' },
      screen: 'alert',
    },
    {
      bg: 'linear-gradient(135deg,#050810 0%,#0a0e20 100%)',
      heading: 'Anvaya doesn\'t just detect. It understands.',
      body: 'AI trained on thousands of breathing patterns. It knows the difference between a normal pause and something that needs your attention.',
      cta: 'Show me the morning report',
      hotspot: { top: '50%', left: '25%', title: 'Pattern AI', body: 'Detects periodic breathing (normal) vs. apnea events (needs attention). Reduces false alarms by 94%.' },
      screen: 'ai',
    },
    {
      bg: 'linear-gradient(135deg,#0f0c06 0%,#1a1408 100%)',
      heading: '6:14 AM. She\'s awake. She\'s smiling. You have 9 hours of data.',
      body: 'Every breath logged. Every pattern recorded. Share it with your pediatrician at the next visit — or just know, deeply, that last night was safe.',
      cta: 'I want this for my baby →',
      hotspot: { top: '44%', left: '68%', title: 'Breathing Summary', body: '9h 12m tracked. 0 apnea events. Average breathing rate: 41/min. Sleep quality: 8.4/10.' },
      screen: 'morning',
    },
  ],
  crying: [
    {
      bg: 'linear-gradient(135deg,#100808 0%,#1a0e0e 100%)',
      heading: 'It\'s 2:58 AM. The crying starts again.',
      body: 'Third time tonight. You\'ve fed him, changed him, held him. He\'s still crying. And you don\'t know why.',
      cta: 'What does Anvaya hear?',
      hotspot: { top: '30%', left: '65%', title: 'Cry Detected', body: 'Anvaya heard him 0.4 seconds before your phone buzzed. It\'s already analyzing.' },
      screen: 'home',
    },
    {
      bg: 'linear-gradient(135deg,#0e0a06 0%,#1a1208 100%)',
      heading: 'A tiny device with a very trained ear.',
      body: 'Anvaya\'s microphone captures the cry. Its AI — trained on 50,000+ real recordings — starts decoding within seconds.',
      cta: 'What is it trained on?',
      hotspot: { top: '40%', left: '22%', title: 'Cry Dataset', body: '50,000+ cry samples. Hunger, pain, discomfort, fatigue, overstimulation. Trained specifically on Indian environmental acoustics.' },
      screen: 'device',
    },
    {
      bg: 'linear-gradient(135deg,#0e0c06 0%,#1a1608 100%)',
      heading: 'The waveform tells a story. Every cry has a signature.',
      body: 'Hunger cries are rhythmic. Pain cries are sudden, high-pitched. Discomfort cries trail off. Anvaya reads the pattern — not just the volume.',
      cta: 'What\'s it saying right now?',
      hotspot: { top: '38%', left: '70%', title: 'Cry Waveform', body: 'Rhythmic pattern detected. Peak frequency: 440Hz. Duration: 2.1s per burst. This is a hunger signature.' },
      screen: 'alert',
    },
    {
      bg: 'linear-gradient(135deg,#0a0e06 0%,#121a08 100%)',
      heading: 'Hunger. 94% confidence. Not pain. Not gas.',
      body: 'You pick him up knowing exactly what he needs. No guessing. No cycling through every possibility at 3 AM with a foggy brain.',
      cta: 'How accurate is this?',
      hotspot: { top: '26%', left: '66%', title: 'Verdict: Hunger', body: '94% confidence. In field tests, Anvaya\'s cry classifier matched pediatrician assessments 91% of the time.' },
      screen: 'alert',
    },
    {
      bg: 'linear-gradient(135deg,#060810 0%,#0a0e1a 100%)',
      heading: 'Every cry is logged. Patterns emerge over days.',
      body: 'By week 3, you\'ll know: he always cries from hunger at 3 AM. By week 6, you\'ll adjust his feed schedule — and the 3 AM wake-ups will stop.',
      cta: 'Show me the bigger picture',
      hotspot: { top: '52%', left: '24%', title: 'Cry History', body: 'Last 7 days: 23 hunger, 4 discomfort, 1 pain. Hunger peaks at 2–4 AM. Adjusting evening feed by 30 min could eliminate this.' },
      screen: 'ai',
    },
    {
      bg: 'linear-gradient(135deg,#0f0c06 0%,#1a1408 100%)',
      heading: '7:00 AM. He\'s peaceful. You slept 4 hours in a row.',
      body: 'Because at 3 AM, instead of a 20-minute guessing spiral, you knew in 8 seconds. You fed him. You both went back to sleep.',
      cta: 'I want this for my baby →',
      hotspot: { top: '44%', left: '68%', title: 'Sleep Saved', body: '3 nights ago: 5 wake-ups. Last night: 2. With cry analysis, parents report 38% fewer unnecessary wake-ups by week 2.' },
      screen: 'morning',
    },
  ],
  sleep: [
    {
      bg: 'linear-gradient(135deg,#060810 0%,#0a0e1a 100%)',
      heading: 'It\'s 11 PM. You put her down 45 minutes ago.',
      body: 'Is she in deep sleep? Or just quiet? Her brain is developing. Her sleep matters more right now than yours.',
      cta: 'What is Anvaya tracking?',
      hotspot: { top: '28%', left: '66%', title: 'Sleep Stage', body: 'Deep sleep detected. Started 18 minutes ago. Brain development is happening right now.' },
      screen: 'sleep',
    },
    {
      bg: 'linear-gradient(135deg,#080a10 0%,#0c1018 100%)',
      heading: 'A device that knows the difference between sleep and rest.',
      body: 'Anvaya tracks micro-movements, breathing patterns, and sound to map every sleep cycle — without touching her.',
      cta: 'Show me the sleep map',
      hotspot: { top: '40%', left: '22%', title: 'Sleep Science', body: 'Newborns spend 50% of sleep in REM. Anvaya tracks REM, light, and deep sleep — the same metrics used in pediatric sleep studies.' },
      screen: 'device',
    },
    {
      bg: 'linear-gradient(135deg,#060a10 0%,#0a1018 100%)',
      heading: 'Deep sleep: 3.8 hours. REM: 2.1 hours. That\'s optimal.',
      body: 'You\'re looking at her actual sleep architecture. Not a guess. Not an average. Her specific night, mapped in real time.',
      cta: 'What does "optimal" mean?',
      hotspot: { top: '50%', left: '70%', title: 'Sleep Quality: 8.7/10', body: 'For a 4-month-old, 14–16h total sleep with 4+ hours of deep sleep per night supports healthy cognitive development (AAP guidelines).' },
      screen: 'sleep',
    },
    {
      bg: 'linear-gradient(135deg,#100a06 0%,#1a1208 100%)',
      heading: 'At 2:14 AM — she stirs. Anvaya catches it first.',
      body: 'A brief wake-up. She self-settles in 4 minutes. Anvaya notes it — but doesn\'t wake you. You sleep through it, because you can.',
      cta: 'How does it decide when to alert?',
      hotspot: { top: '24%', left: '65%', title: 'Smart Alerts', body: 'Anvaya waits 90 seconds before alerting for night wakings — giving her a chance to self-settle. Reduces unnecessary parent wake-ups by 61%.' },
      screen: 'alert',
    },
    {
      bg: 'linear-gradient(135deg,#060810 0%,#0a0e1a 100%)',
      heading: 'Sleep trends across 30 days. Show your pediatrician.',
      body: 'Month 1 vs month 3. Are naps consolidating? Is night sleep stretching? You\'ll see it before your doctor asks.',
      cta: 'Show me the morning report',
      hotspot: { top: '50%', left: '24%', title: '30-Day Trend', body: 'Night sleep: +42 min vs last month. Naps: consolidating from 5 to 3. On track for sleep schedule milestone at 6 months.' },
      screen: 'ai',
    },
    {
      bg: 'linear-gradient(135deg,#0f0c06 0%,#1a1a10 100%)',
      heading: '6:48 AM. She woke up smiling. You know why.',
      body: 'Last night she got 9.2 hours of total sleep and 4.1 hours of deep sleep. Her brain had exactly what it needed. So did yours.',
      cta: 'I want this for my baby →',
      hotspot: { top: '44%', left: '68%', title: 'Last Night', body: 'Total sleep: 9h 14m. Deep sleep: 4.1h. REM: 2.3h. Night wakings: 1 (self-settled). Sleep score: 9.1/10.' },
      screen: 'morning',
    },
  ],
};

// ── Phone screens ─────────────────────────────────────────────────────────────
function ScreenHome({ worry }: { worry: Worry | null }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 1200);
    return () => clearInterval(t);
  }, []);
  const breathVal = 42 + Math.sin(tick * 0.7) * 3;
  const spo2Val = 98 - Math.abs(Math.sin(tick * 0.4));
  return (
    <div className="w-full h-full bg-[#0d1a14] flex flex-col p-4 gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[9px] text-emerald-400/60 uppercase tracking-widest">Live Monitor</div>
          <div className="text-xs text-white font-semibold">Anvaya Smart</div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <span className="text-[9px] text-emerald-400">LIVE</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[
          { label: 'Breathing', val: `${breathVal.toFixed(0)}/min`, sub: 'Normal', color: worry === 'breathing' ? '#4ade80' : '#6ee7b7', highlight: worry === 'breathing' },
          { label: 'SpO₂', val: `${spo2Val.toFixed(1)}%`, sub: 'Optimal', color: '#60a5fa', highlight: false },
          { label: 'Temp', val: '36.7°C', sub: 'Normal', color: '#f9a8d4', highlight: false },
          { label: 'Sleep', val: 'Deep', sub: '2h 14m', color: worry === 'sleep' ? '#a78bfa' : '#c4b5fd', highlight: worry === 'sleep' },
        ].map(v => (
          <div key={v.label} className={cn('rounded-xl p-2.5 border flex flex-col justify-between',
            v.highlight ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10')}>
            <div className="text-[8px] text-white/50 uppercase tracking-widest">{v.label}</div>
            <div className="text-lg font-bold leading-tight" style={{ color: v.color }}>{v.val}</div>
            <div className="text-[8px]" style={{ color: v.color + 'aa' }}>{v.sub}</div>
          </div>
        ))}
      </div>
      {/* Mini breathing bars */}
      <div className="flex items-end gap-0.5 h-8">
        {Array.from({ length: 28 }, (_, i) => {
          const h = 30 + Math.sin((i + tick) * 0.6) * 55 + Math.sin((i + tick) * 1.4) * 15;
          return (
            <motion.div key={i} className="flex-1 rounded-sm"
              style={{ height: `${Math.max(6, h)}%`, background: worry === 'breathing' ? '#4ade80' : '#34d399' }}
              animate={{ height: `${Math.max(6, h)}%` }} transition={{ duration: 0.3 }} />
          );
        })}
      </div>
      <div className="text-[8px] text-center text-white/30">Live breathing — last 30 seconds</div>
    </div>
  );
}

function ScreenDevice() {
  const [ring, setRing] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRing(p => (p + 1) % 4), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#080e14] flex flex-col items-center justify-center p-4 gap-3">
      <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Device Status</div>
      <div className="relative w-24 h-24">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="absolute inset-0 rounded-full border border-emerald-400/30"
            animate={{ scale: ring > i ? [1, 1.6, 2.0] : 1, opacity: ring > i ? [0.6, 0.3, 0] : 0.15 }}
            transition={{ duration: 1.8, ease: 'easeOut' }} />
        ))}
        <div className="absolute inset-0 rounded-full bg-emerald-900/30 border border-emerald-400/40 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-emerald-800/50 border border-emerald-400/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>
      <div className="text-xs font-semibold text-emerald-400">Anvaya Smart</div>
      <div className="text-[8px] text-white/40">Active · Crib mounted · No contact</div>
      <div className="grid grid-cols-3 gap-1.5 w-full mt-2">
        {['Radar', 'SpO₂', 'Temp', 'Audio', 'Motion', 'AI'].map(s => (
          <div key={s} className="bg-white/5 border border-white/10 rounded-lg py-1.5 flex flex-col items-center gap-0.5">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1 + Math.random(), repeat: Infinity }} />
            <span className="text-[7px] text-white/50">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenAlert({ worry }: { worry: Worry | null }) {
  const isCry = worry === 'crying';
  return (
    <div className="w-full h-full bg-[#12080a] flex flex-col p-4 gap-3">
      <motion.div className="rounded-xl p-3 border border-orange-400/40 bg-orange-900/20"
        animate={{ borderColor: ['rgba(251,146,60,0.4)', 'rgba(251,146,60,0.8)', 'rgba(251,146,60,0.4)'] }}
        transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="text-[9px] text-orange-400 uppercase tracking-widest mb-1">Alert · {isCry ? '3:47 AM' : '2:14 AM'}</div>
        <div className="text-sm font-bold text-white">{isCry ? 'Cry Detected' : worry === 'sleep' ? 'Sleep Disruption' : 'Breathing Changed'}</div>
        <div className="text-[9px] text-orange-300/70 mt-0.5">{isCry ? 'Analyzing cry pattern…' : 'Monitoring closely…'}</div>
      </motion.div>
      {isCry && (
        <>
          <div className="flex items-end gap-0.5 h-10">
            {Array.from({ length: 24 }, (_, i) => {
              const h = 20 + Math.sin(i * 0.8) * 60 + Math.sin(i * 2.1) * 20;
              return <div key={i} className="flex-1 rounded-sm" style={{ height: `${Math.max(8, h)}%`, background: '#f97316' }} />;
            })}
          </div>
          <div className="text-[8px] text-white/30 -mt-1 mb-1">Cry waveform</div>
          <div className="space-y-1.5">
            {[{ l: 'Hunger', v: 94, c: '#4ade80' }, { l: 'Discomfort', v: 4, c: '#94a3b8' }, { l: 'Pain', v: 2, c: '#94a3b8' }].map(b => (
              <div key={b.l} className="flex items-center gap-2">
                <div className="text-[8px] text-white/50 w-16">{b.l}</div>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: b.c }}
                    initial={{ width: 0 }} animate={{ width: `${b.v}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                </div>
                <div className="text-[8px] font-bold w-6 text-right" style={{ color: b.c }}>{b.v}%</div>
              </div>
            ))}
          </div>
          <div className="mt-1 bg-emerald-900/30 border border-emerald-400/30 rounded-xl p-2.5 text-center">
            <div className="text-[9px] text-emerald-400/70 uppercase tracking-widest">Verdict</div>
            <div className="text-sm font-bold text-emerald-300">Hunger · Feed now</div>
          </div>
        </>
      )}
      {!isCry && (
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-[8px] text-white/30 uppercase tracking-widest">Response</div>
          <div className="space-y-2">
            {['Notified parent', 'Monitoring breathing', 'Logging event', 'Self-settling…'].map((s, i) => (
              <motion.div key={s} className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}>
                <div className="w-4 h-4 rounded-full bg-emerald-900/50 border border-emerald-400/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[9px] text-white/60">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenSleep() {
  return (
    <div className="w-full h-full bg-[#070a14] flex flex-col p-4 gap-3">
      <div>
        <div className="text-[9px] text-violet-400/60 uppercase tracking-widest">Sleep Report</div>
        <div className="text-xs font-semibold text-white">Last Night</div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[{ l: 'Total', v: '9h 14m', c: '#a78bfa' }, { l: 'Deep', v: '4.1h', c: '#818cf8' }, { l: 'Score', v: '9.1', c: '#c084fc' }].map(s => (
          <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
            <div className="text-[7px] text-white/40 uppercase">{s.l}</div>
            <div className="text-sm font-bold" style={{ color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>
      {/* Sleep timeline */}
      <div>
        <div className="text-[8px] text-white/30 mb-1.5">Sleep stages · 9 PM → 7 AM</div>
        <div className="space-y-1">
          {[
            { l: 'Awake', segs: [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], c: '#fbbf24' },
            { l: 'Light', segs: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], c: '#60a5fa' },
            { l: 'Deep', segs: [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1], c: '#818cf8' },
            { l: 'REM', segs: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0], c: '#c084fc' },
          ].map(row => (
            <div key={row.l} className="flex items-center gap-1">
              <span className="text-[7px] text-white/40 w-8">{row.l}</span>
              <div className="flex-1 flex gap-0.5">
                {row.segs.map((on, i) => (
                  <div key={i} className="flex-1 h-2.5 rounded-sm" style={{ background: on ? row.c : 'rgba(255,255,255,0.05)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[7px] text-white/25">9 PM</span>
          <span className="text-[7px] text-white/25">7 AM</span>
        </div>
      </div>
    </div>
  );
}

function ScreenAI({ worry }: { worry: Worry | null }) {
  return (
    <div className="w-full h-full bg-[#060810] flex flex-col p-4 gap-3">
      <div>
        <div className="text-[9px] text-indigo-400/60 uppercase tracking-widest">AI Analysis</div>
        <div className="text-xs font-semibold text-white">Pattern Recognition</div>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        {/* Neural net SVG */}
        <svg width="140" height="120" viewBox="0 0 140 120">
          {[[20], [20, 50, 80], [20, 50, 80], [50]].map((ys, col) =>
            ys.map((y, i) => {
              const x = 20 + col * 34;
              const nextYs = [[20, 50, 80], [20, 50, 80], [50], [50]][col] || [];
              return (
                <g key={`${col}-${i}`}>
                  {nextYs.map((ny, j) => (
                    <motion.line key={j} x1={x} y1={y + 10} x2={x + 34} y2={ny + 10}
                      stroke="rgba(99,102,241,0.3)" strokeWidth="0.8"
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: (col + i + j) * 0.15 }} />
                  ))}
                  <motion.circle cx={x} cy={y + 10} r="5" fill="none" stroke="#6366f1" strokeWidth="1"
                    animate={{ opacity: [0.5, 1, 0.5], r: [5, 6, 5] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: (col + i) * 0.2 }} />
                </g>
              );
            })
          )}
        </svg>
      </div>
      <div className="space-y-1.5">
        {(worry === 'crying'
          ? [{ l: 'Cry frequency', v: '91%' }, { l: 'Temporal pattern', v: '87%' }, { l: 'Acoustic signature', v: '94%' }]
          : worry === 'sleep'
          ? [{ l: 'Movement pattern', v: '96%' }, { l: 'Breathing rhythm', v: '93%' }, { l: 'Sound baseline', v: '88%' }]
          : [{ l: 'Breathing rate', v: '99%' }, { l: 'Rhythm regularity', v: '95%' }, { l: 'Apnea detection', v: '97%' }]
        ).map(row => (
          <div key={row.l} className="flex items-center gap-2">
            <span className="text-[8px] text-white/40 w-28">{row.l}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div className="h-full rounded-full bg-indigo-400"
                initial={{ width: 0 }} animate={{ width: row.v }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
            <span className="text-[8px] text-indigo-300 w-6 text-right">{row.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenMorning({ worry }: { worry: Worry | null }) {
  return (
    <div className="w-full h-full bg-[#0e0c08] flex flex-col p-4 gap-3">
      <div className="text-center pt-2">
        <div className="text-[9px] text-amber-400/60 uppercase tracking-widest">Morning Report</div>
        <div className="text-2xl font-bold text-white mt-1">6:14 AM</div>
        <div className="text-[9px] text-white/40">She just woke up happy</div>
      </div>
      <div className="flex-1 space-y-2">
        {(worry === 'breathing'
          ? [{ l: 'Avg breathing', v: '41/min', ok: true }, { l: 'Apnea events', v: 'None', ok: true }, { l: 'SpO₂ low', v: '97.2%', ok: true }, { l: 'Sleep score', v: '8.4/10', ok: true }]
          : worry === 'crying'
          ? [{ l: 'Night cry episodes', v: '2', ok: true }, { l: 'Identified hunger', v: '2/2', ok: true }, { l: 'Response time', v: '8 seconds', ok: true }, { l: 'Sleep rescued', v: '+3.1 hours', ok: true }]
          : [{ l: 'Total sleep', v: '9h 14m', ok: true }, { l: 'Deep sleep', v: '4.1 hours', ok: true }, { l: 'Night wakings', v: '1 (self-settled)', ok: true }, { l: 'Sleep score', v: '9.1/10', ok: true }]
        ).map(row => (
          <div key={row.l} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
            <span className="text-[9px] text-white/50">{row.l}</span>
            <span className={cn('text-[9px] font-bold', row.ok ? 'text-emerald-400' : 'text-orange-400')}>{row.v}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[8px] text-white/25">Share with pediatrician · PDF export</div>
    </div>
  );
}

// ── Phone frame component ─────────────────────────────────────────────────────
function PhoneFrame({ children, shake }: { children: React.ReactNode; shake?: boolean }) {
  return (
    <motion.div className="relative mx-auto" style={{ width: 220, height: 440 }}
      animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
      transition={shake ? { duration: 0.6, ease: 'easeInOut' } : {}}>
      {/* Outer shell */}
      <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-2xl overflow-hidden">
        {/* Side buttons */}
        <div className="absolute -right-1 top-24 w-1 h-8 rounded-r-sm bg-white/20" />
        <div className="absolute -left-1 top-20 w-1 h-6 rounded-l-sm bg-white/20" />
        <div className="absolute -left-1 top-28 w-1 h-6 rounded-l-sm bg-white/20" />
        {/* Screen area */}
        <div className="absolute top-2 left-2 right-2 bottom-2 rounded-[30px] overflow-hidden bg-black">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-6 h-1 rounded-full bg-white/10" />
          </div>
          {/* Status bar */}
          <div className="absolute top-5 left-4 right-4 flex justify-between items-center z-10">
            <span className="text-[7px] text-white/50 font-medium">9:41</span>
            <div className="flex gap-1 items-center">
              <div className="flex gap-0.5 items-end h-2">
                {[3, 5, 7, 9].map((h, i) => (
                  <div key={i} className="w-0.5 rounded-sm bg-white/50" style={{ height: h }} />
                ))}
              </div>
              <div className="text-[7px] text-white/50">●●●</div>
            </div>
          </div>
          {/* Content */}
          <div className="absolute inset-0 pt-10">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Hotspot dot ───────────────────────────────────────────────────────────────
function Hotspot({ top, left, title, body, color }: { top: string; left: string; title: string; body: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute" style={{ top, left, transform: 'translate(-50%,-50%)' }}>
      <motion.button onClick={() => setOpen(o => !o)} className="relative w-7 h-7 flex items-center justify-center"
        aria-label="Learn more">
        {/* Pulsing rings */}
        {[1, 1.8, 2.5].map((s, i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border"
            style={{ borderColor: color + '66' }}
            animate={{ scale: [s * 0.7, s], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }} />
        ))}
        <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-white font-bold text-[9px]"
          style={{ background: color, borderColor: color }}>?</div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="absolute z-50 w-52 rounded-2xl p-3 shadow-2xl border"
            style={{
              background: '#0f1a14',
              borderColor: color + '40',
              top: '50%', left: '110%', transform: 'translateY(-50%)',
            }}
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <div className="flex justify-between items-start mb-1.5">
              <div className="text-[9px] font-bold" style={{ color }}>{title}</div>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/60">
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[9px] text-white/60 leading-relaxed">{body}</p>
            {/* Arrow pointing left */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0"
              style={{ borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: `8px solid ${color + '40'}` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Welcome screen ────────────────────────────────────────────────────────────
function WelcomeScreen({ onSelect }: { onSelect: (w: Worry) => void }) {
  return (
    <motion.div className="fixed inset-0 flex flex-col items-center justify-center z-50 px-6"
      style={{ background: 'linear-gradient(135deg, #060a0e 0%, #0a0e14 100%)' }}
      exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #4a7c6f, transparent)' }} />
      </div>

      <motion.div className="text-center max-w-lg relative z-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-6">Anvaya Smart · Interactive Tour</div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
          What keeps you up<br />at night?
        </h1>
        <p className="text-white/40 text-sm mb-10">We'll show you exactly how Anvaya handles it.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {WORRIES.map((w, i) => (
            <motion.button key={w.id} onClick={() => onSelect(w.id)}
              className="group relative flex flex-col items-center gap-3 px-6 py-5 rounded-2xl border transition-all duration-300"
              style={{ borderColor: w.color + '30', background: w.color + '10' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12 }}
              whileHover={{ scale: 1.04, borderColor: w.color + '80', background: w.color + '20' }}
              whileTap={{ scale: 0.97 }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: w.color + '25', color: w.color }}>
                {w.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{w.label}</div>
                <div className="text-[10px] mt-0.5" style={{ color: w.color + 'aa' }}>{w.sub}</div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: w.color }} />
            </motion.button>
          ))}
        </div>

        <p className="text-white/20 text-[10px] mt-8">6 steps · 2 minutes · No scroll needed</p>
      </motion.div>
    </motion.div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressDots({ total, current, color }: { total: number; current: number; color: string }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: total }, (_, i) => (
        <motion.div key={i} className="h-1 rounded-full"
          animate={{ width: i === current ? 24 : 6, background: i <= current ? color : 'rgba(255,255,255,0.2)' }}
          transition={{ duration: 0.3 }} />
      ))}
    </div>
  );
}

// ── Main tour step ────────────────────────────────────────────────────────────
function TourStep({ step, worry, stepData, onNext, onRestart, isLast, worryColor }: {
  step: number; worry: Worry; stepData: StepContent; onNext: () => void;
  onRestart: () => void; isLast: boolean; worryColor: string;
}) {
  const screens: Record<string, React.ReactNode> = {
    home: <ScreenHome worry={worry} />,
    device: <ScreenDevice />,
    alert: <ScreenAlert worry={worry} />,
    sleep: <ScreenSleep />,
    ai: <ScreenAI worry={worry} />,
    morning: <ScreenMorning worry={worry} />,
  };

  return (
    <motion.div className="fixed inset-0 flex flex-col"
      style={{ background: stepData.bg }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0 relative z-20">
        <button onClick={onRestart} className="text-[10px] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">
          ← Change worry
        </button>
        <ProgressDots total={6} current={step - 1} color={worryColor} />
        <div className="text-[10px] text-white/30">{step}/6</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 lg:px-16 min-h-0 overflow-hidden">
        {/* Text side */}
        <motion.div className="max-w-sm lg:max-w-xs text-center lg:text-left order-2 lg:order-1"
          key={`text-${step}`}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="text-[9px] uppercase tracking-[0.25em] mb-3" style={{ color: worryColor + 'aa' }}>
            Step {step} of 6
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            {stepData.heading}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            {stepData.body}
          </p>

          {isLast ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="font-bold gap-2 px-6" style={{ background: worryColor }}>
                <Link href="/preorder"><Sparkles className="w-4 h-4" />Reserve Anvaya Smart</Link>
              </Button>
              <Button variant="outline" onClick={onRestart}
                className="border-white/20 text-white/60 hover:text-white hover:border-white/40 bg-transparent">
                Explore another worry
              </Button>
            </div>
          ) : (
            <motion.button onClick={onNext}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: worryColor + '20', border: `1px solid ${worryColor + '40'}`, color: worryColor }}
              whileHover={{ scale: 1.03, background: worryColor + '30' }}
              whileTap={{ scale: 0.97 }}>
              {stepData.cta}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </motion.div>

        {/* Phone side */}
        <motion.div className="relative order-1 lg:order-2 shrink-0"
          key={`phone-${step}`}
          initial={{ opacity: 0, y: 20, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: 'spring', stiffness: 120, damping: 20 }}>
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-full blur-3xl opacity-20 scale-150 pointer-events-none"
            style={{ background: worryColor }} />
          <PhoneFrame shake={stepData.screen === 'alert' && worry !== 'sleep'}>
            {screens[stepData.screen]}
          </PhoneFrame>
          {/* Hotspot */}
          <Hotspot
            top={stepData.hotspot.top}
            left={stepData.hotspot.left}
            title={stepData.hotspot.title}
            body={stepData.hotspot.body}
            color={worryColor} />
        </motion.div>
      </div>

      {/* Hint */}
      {step === 1 && (
        <motion.div className="text-center pb-4 text-[10px] text-white/20"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          Tap the <span style={{ color: worryColor }}>?</span> on the phone to learn more
        </motion.div>
      )}
      {step !== 1 && <div className="pb-4" />}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TourPage() {
  const [worry, setWorry] = useState<Worry | null>(null);
  const [step, setStep] = useState(0); // 0 = welcome, 1-6 = steps

  const worryConfig = worry ? WORRIES.find(w => w.id === worry)! : WORRIES[0];
  const steps = worry ? STEPS[worry] : [];
  const currentStepData = step > 0 ? steps[step - 1] : null;

  const handleSelect = (w: Worry) => {
    setWorry(w);
    setStep(1);
  };

  const handleNext = () => {
    if (step < 6) setStep(s => s + 1);
  };

  const handleRestart = () => {
    setStep(0);
    setWorry(null);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <WelcomeScreen key="welcome" onSelect={handleSelect} />
        )}
        {step > 0 && worry && currentStepData && (
          <TourStep
            key={`step-${step}-${worry}`}
            step={step}
            worry={worry}
            stepData={currentStepData}
            onNext={handleNext}
            onRestart={handleRestart}
            isLast={step === 6}
            worryColor={worryConfig.color} />
        )}
      </AnimatePresence>
    </div>
  );
}
