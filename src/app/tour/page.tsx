'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wind, Moon, Sparkles, Baby, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Worry = 'breathing' | 'crying' | 'sleep';

const WORRIES = [
  { id: 'breathing' as Worry, icon: <Wind className="w-6 h-6" />, label: 'Is she breathing?', sub: 'The fear at 3 AM', color: '#4a7c6f' },
  { id: 'crying'    as Worry, icon: <Baby className="w-6 h-6" />, label: 'Why is he crying?', sub: 'Hunger? Pain? Gas?',   color: '#d4784a' },
  { id: 'sleep'     as Worry, icon: <Moon className="w-6 h-6" />, label: 'Is she sleeping enough?', sub: 'Deep sleep matters', color: '#5a7fa8' },
];

// ── Step content ──────────────────────────────────────────────────────────────
type Step = {
  heading: string;
  body: string;
  cta: string;
  screen: 'vitals' | 'device' | 'alert' | 'ai' | 'morning';
  highlight: string;   // what to focus on in the screen label
  tip: { title: string; body: string };
};

const STEPS: Record<Worry, Step[]> = {
  breathing: [
    { heading: '3:02 AM. She hasn\'t made a sound in 40 minutes.', body: 'The silence that should feel peaceful — doesn\'t. You start to wonder.', cta: 'What\'s Anvaya doing?', screen: 'vitals', highlight: 'breathing', tip: { title: 'Checked 12,840 times', body: 'Every breath tracked contactlessly since she fell asleep. Each one: normal.' } },
    { heading: 'A small clip. No wires. No patches.', body: 'Radar and AI working silently in the dark — so you don\'t have to stay awake.', cta: 'Show me what it sees', screen: 'device', highlight: 'radar', tip: { title: '6 sensors in 1', body: 'Breathing, SpO₂, temperature, sound, motion, cry type — all contactless.' } },
    { heading: 'Breathing: 42/min. Normal. Safe.', body: 'You\'re looking at proof she\'s okay. Not a guess — 9 hours of data.', cta: 'What if something changes?', screen: 'vitals', highlight: 'rate', tip: { title: 'Normal range', body: '30–60 breaths/min for newborns. Anvaya alerts instantly if it dips or spikes.' } },
    { heading: 'At 3:47 AM — an alert fires.', body: 'Before you\'re fully awake, your phone already tells you what\'s happening.', cta: 'What did it say?', screen: 'alert', highlight: 'spo2', tip: { title: 'In 3 seconds', body: 'SpO₂ dipped briefly. Anvaya notified you and you were at her side in 18 seconds.' } },
    { heading: 'Morning. 6:14 AM. She\'s smiling.', body: 'Every breath logged. Share with your pediatrician — or just know she was safe.', cta: 'Get Anvaya for my baby', screen: 'morning', highlight: 'summary', tip: { title: 'Night summary', body: '9h 12m tracked. 0 apnea events. Avg breathing: 41/min. Score: 8.4/10.' } },
  ],
  crying: [
    { heading: '2:58 AM. Third time tonight.', body: 'You\'ve fed, changed, held. Still crying. And you don\'t know why.', cta: 'What does Anvaya hear?', screen: 'vitals', highlight: 'sound', tip: { title: 'Detected in 0.4s', body: 'Anvaya heard him before your phone buzzed. Already analyzing.' } },
    { heading: 'Every cry has a signature.', body: 'Hunger cries are rhythmic. Pain is sudden and high-pitched. Anvaya reads the pattern.', cta: 'Show me the analysis', screen: 'device', highlight: 'mic', tip: { title: 'Trained on 50,000+ cries', body: 'Real recordings. Hunger, pain, discomfort, fatigue — including Indian acoustic environments.' } },
    { heading: 'Hunger. 94% confidence.', body: 'Not pain. Not gas. You pick him up knowing exactly what he needs.', cta: 'How accurate is this?', screen: 'alert', highlight: 'verdict', tip: { title: '91% accuracy', body: 'Matched pediatrician assessments in field tests. Reduces guessing time from 20 min to 8 seconds.' } },
    { heading: 'Patterns emerge over days.', body: 'By week 3 you\'ll know he always cries hungry at 3 AM. By week 6 — it stops.', cta: 'Show me the bigger picture', screen: 'ai', highlight: 'trend', tip: { title: 'Last 7 days', body: '23 hunger, 4 discomfort, 1 pain. Hunger peaks 2–4 AM. Try moving evening feed 30 min later.' } },
    { heading: '7:00 AM. He\'s peaceful. You slept 4 hours.', body: 'Because at 3 AM, instead of a 20-minute spiral, you knew in 8 seconds.', cta: 'Get Anvaya for my baby', screen: 'morning', highlight: 'saved', tip: { title: 'Sleep rescued', body: '3 nights ago: 5 wake-ups. Last night: 2. Parents report 38% fewer unnecessary wake-ups by week 2.' } },
  ],
  sleep: [
    { heading: '11 PM. Is she in deep sleep?', body: 'Or just quiet? Her brain is developing. Her sleep matters more right now than yours.', cta: 'What is Anvaya tracking?', screen: 'vitals', highlight: 'stage', tip: { title: 'Deep sleep detected', body: 'Started 18 minutes ago. Brain development is happening right now.' } },
    { heading: 'Light sleep vs deep sleep vs REM.', body: 'Anvaya maps every cycle without touching her — the same metrics used in sleep labs.', cta: 'Show me the map', screen: 'device', highlight: 'stages', tip: { title: 'Sleep science', body: 'Newborns spend 50% of sleep in REM. Anvaya tracks all 3 stages contactlessly.' } },
    { heading: 'Deep sleep: 3.8h. REM: 2.1h. Optimal.', body: 'Not an average. Her specific night. Mapped in real time.', cta: 'What does optimal mean?', screen: 'ai', highlight: 'score', tip: { title: 'AAP guidelines', body: '14–16h total + 4h+ deep sleep per night supports healthy cognitive development at this age.' } },
    { heading: 'At 2:14 AM she stirs — and settles.', body: 'Anvaya notices. Waits 90 seconds. She self-settles. It doesn\'t wake you. You sleep through it.', cta: 'How does it decide?', screen: 'alert', highlight: 'settle', tip: { title: 'Smart alerts', body: '90-second window before alerting — gives her a chance to self-settle. Reduces parent wake-ups by 61%.' } },
    { heading: '6:48 AM. She woke up smiling.', body: '9.2 hours total. 4.1 hours deep sleep. Her brain had exactly what it needed. So did yours.', cta: 'Get Anvaya for my baby', screen: 'morning', highlight: 'sleep', tip: { title: 'Last night', body: 'Total: 9h 14m · Deep: 4.1h · REM: 2.3h · Night wakings: 1 (self-settled) · Score: 9.1/10' } },
  ],
};

// ── Phone screens ─────────────────────────────────────────────────────────────
function ScreenVitals({ worry, highlight }: { worry: Worry; highlight: string }) {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const v = 30 + Math.sin(i * 0.7) * 55 + Math.sin(i * 1.9) * 15;
    return Math.max(8, v);
  });
  const isBreathing = worry === 'breathing';
  const isSleep = worry === 'sleep';
  const color = isBreathing ? '#4ade80' : isSleep ? '#a78bfa' : '#fb923c';
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2" style={{ background: '#0d1a14' }}>
      <div className="flex justify-between items-center">
        <span className="text-[8px] text-white/40 uppercase tracking-widest">Live · Anvaya</span>
        <motion.div className="flex items-center gap-1" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
          <span className="text-[8px]" style={{ color }}>LIVE</span>
        </motion.div>
      </div>
      {/* Key metric highlighted */}
      <div className="rounded-xl p-3 border" style={{ background: color + '15', borderColor: color + '40' }}>
        <div className="text-[8px] text-white/40 mb-1">{isBreathing ? 'Breathing Rate' : isSleep ? 'Sleep Stage' : 'Sound Level'}</div>
        <div className="text-2xl font-bold" style={{ color }}>{isBreathing ? '42/min' : isSleep ? 'Deep Sleep' : 'Analyzing…'}</div>
        <div className="text-[8px] mt-0.5" style={{ color: color + 'aa' }}>{isBreathing ? 'Normal · 30–60 range' : isSleep ? 'Started 18 min ago' : 'Cry pattern detected'}</div>
      </div>
      {/* Other vitals small */}
      <div className="grid grid-cols-3 gap-1.5">
        {[{ l: 'SpO₂', v: '98%', c: '#60a5fa' }, { l: 'Temp', v: '36.7°', c: '#f9a8d4' }, { l: 'Motion', v: 'Still', c: '#94a3b8' }].map(m => (
          <div key={m.l} className="bg-white/5 rounded-lg p-1.5 text-center border border-white/5">
            <div className="text-[7px] text-white/30">{m.l}</div>
            <div className="text-xs font-semibold" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
      {/* Waveform */}
      <div className="flex-1 flex flex-col justify-end gap-1">
        <div className="flex items-end gap-0.5 h-10">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: color, opacity: 0.7 + (i / bars.length) * 0.3 }} />
          ))}
        </div>
        <div className="text-[7px] text-white/20 text-center">Live waveform — last 20s</div>
      </div>
    </div>
  );
}

function ScreenDevice({ highlight }: { highlight: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4" style={{ background: '#080e14' }}>
      <div className="text-[8px] text-white/30 uppercase tracking-widest">Device · Crib mounted</div>
      {/* Device visual */}
      <div className="relative w-20 h-20">
        {[1, 1.6, 2.2].map((s, i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border border-emerald-400/25"
            animate={{ scale: [s * 0.8, s], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }} />
        ))}
        <div className="absolute inset-0 rounded-full bg-emerald-900/30 border border-emerald-400/40 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-emerald-800/60 border border-emerald-400/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>
      <div className="text-sm font-bold text-emerald-400">No contact needed</div>
      {/* 6 sensors grid */}
      <div className="grid grid-cols-3 gap-1.5 w-full">
        {['Radar', 'SpO₂', 'Temp', 'Audio', 'Motion', 'AI'].map((s, i) => (
          <motion.div key={s} className="bg-white/5 border border-white/10 rounded-lg py-2 flex flex-col items-center gap-1"
            animate={{ borderColor: ['rgba(255,255,255,0.1)', 'rgba(74,222,128,0.3)', 'rgba(255,255,255,0.1)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[7px] text-white/50">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScreenAlert({ worry, highlight }: { worry: Worry; highlight: string }) {
  const isCry = worry === 'crying';
  const isSleep = worry === 'sleep';
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2.5" style={{ background: isSleep ? '#070a14' : '#12080a' }}>
      <motion.div className="rounded-xl p-3 border"
        style={{ background: isSleep ? 'rgba(90,127,168,0.15)' : 'rgba(212,120,74,0.15)', borderColor: isSleep ? 'rgba(90,127,168,0.5)' : 'rgba(212,120,74,0.5)' }}
        animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="text-[8px] uppercase tracking-widest mb-0.5" style={{ color: isSleep ? '#7bafd4' : '#e8957a' }}>
          {isSleep ? 'Night waking · 2:14 AM' : isCry ? 'Cry detected · 3:47 AM' : 'Alert · 3:47 AM'}
        </div>
        <div className="text-sm font-bold text-white">
          {isSleep ? 'Baby stirred — monitoring' : isCry ? 'Cry detected' : 'SpO₂ brief dip'}
        </div>
      </motion.div>
      {isCry && (
        <>
          <div className="flex items-end gap-0.5 h-8">
            {Array.from({ length: 20 }, (_, i) => {
              const h = 20 + Math.sin(i * 0.9) * 60 + Math.sin(i * 2.3) * 15;
              return <div key={i} className="flex-1 rounded-sm" style={{ height: `${Math.max(6, h)}%`, background: '#e8957a' }} />;
            })}
          </div>
          <div className="space-y-1.5">
            {[{ l: 'Hunger', v: 94, c: '#4ade80' }, { l: 'Discomfort', v: 4, c: '#475569' }, { l: 'Pain', v: 2, c: '#475569' }].map(b => (
              <div key={b.l} className="flex items-center gap-2">
                <span className="text-[8px] text-white/40 w-16">{b.l}</span>
                <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: b.c }}
                    initial={{ width: 0 }} animate={{ width: `${b.v}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                </div>
                <span className="text-[8px] font-bold w-6 text-right" style={{ color: b.c }}>{b.v}%</span>
              </div>
            ))}
          </div>
          <div className="bg-emerald-900/30 border border-emerald-400/30 rounded-xl p-2 text-center mt-auto">
            <div className="text-[8px] text-emerald-400/70 uppercase tracking-widest">Verdict</div>
            <div className="text-sm font-bold text-emerald-300">Hunger · Feed now</div>
          </div>
        </>
      )}
      {!isCry && (
        <div className="space-y-2 mt-1">
          {['Monitoring closely', 'No action needed yet', isSleep ? 'Self-settling… (60s)' : 'Parent notified', 'Event logged'].map((s, i) => (
            <motion.div key={s} className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.25 }}>
              <div className="w-5 h-5 rounded-full bg-emerald-900/50 border border-emerald-400/40 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[9px] text-white/50">{s}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenAI({ worry, highlight }: { worry: Worry; highlight: string }) {
  const color = worry === 'breathing' ? '#4ade80' : worry === 'sleep' ? '#a78bfa' : '#fb923c';
  const rows = worry === 'crying'
    ? [{ l: 'Cry frequency', v: 91 }, { l: 'Temporal pattern', v: 87 }, { l: 'Acoustic match', v: 94 }]
    : worry === 'sleep'
    ? [{ l: 'Movement pattern', v: 96 }, { l: 'Breathing rhythm', v: 93 }, { l: 'Sound baseline', v: 88 }]
    : [{ l: 'Breathing rate', v: 99 }, { l: 'Rhythm regularity', v: 95 }, { l: 'Apnea detection', v: 97 }];
  return (
    <div className="w-full h-full flex flex-col p-3 gap-3" style={{ background: '#06080f' }}>
      <div className="text-[8px] text-indigo-400/60 uppercase tracking-widest">AI Pattern Analysis</div>
      {/* Simple neural viz */}
      <div className="flex items-center justify-center flex-1">
        <svg width="130" height="90" viewBox="0 0 130 90">
          {[[10], [10, 35, 60], [10, 35, 60], [35]].map((ys, col) =>
            ys.map((y, i) => {
              const x = 15 + col * 30;
              const nextYs = col < 3 ? [[10, 35, 60], [10, 35, 60], [35], [35]][col] : [];
              return (
                <g key={`${col}-${i}`}>
                  {nextYs.map((ny: number, j: number) => (
                    <motion.line key={j} x1={x} y1={y + 15} x2={x + 30} y2={ny + 15}
                      stroke="rgba(99,102,241,0.25)" strokeWidth="0.8"
                      animate={{ opacity: [0.15, 0.55, 0.15] }}
                      transition={{ duration: 2, repeat: Infinity, delay: (col + i + j) * 0.18 }} />
                  ))}
                  <motion.circle cx={x} cy={y + 15} r={col === 0 || col === 3 ? 6 : 5}
                    fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: (col + i) * 0.2 }} />
                </g>
              );
            })
          )}
        </svg>
      </div>
      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.l} className="flex items-center gap-2">
            <span className="text-[8px] text-white/35 w-24 shrink-0">{r.l}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: color }}
                initial={{ width: 0 }} animate={{ width: `${r.v}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
            <span className="text-[8px] font-bold w-5 text-right" style={{ color }}>{r.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenMorning({ worry }: { worry: Worry }) {
  const rows = worry === 'breathing'
    ? [{ l: 'Avg breathing', v: '41/min' }, { l: 'Apnea events', v: 'None' }, { l: 'SpO₂ min', v: '97.2%' }, { l: 'Sleep score', v: '8.4 / 10' }]
    : worry === 'crying'
    ? [{ l: 'Cry episodes', v: '2 total' }, { l: 'Classified correctly', v: '2 / 2' }, { l: 'Avg response', v: '8 sec' }, { l: 'Extra sleep gained', v: '+3.1 hrs' }]
    : [{ l: 'Total sleep', v: '9h 14m' }, { l: 'Deep sleep', v: '4.1 hrs' }, { l: 'Night wakings', v: '1 (settled)' }, { l: 'Sleep score', v: '9.1 / 10' }];
  return (
    <div className="w-full h-full flex flex-col p-3 gap-3" style={{ background: '#0d0c08' }}>
      <div className="text-center pt-1">
        <div className="text-[8px] text-amber-400/50 uppercase tracking-widest">Morning Report</div>
        <div className="text-2xl font-bold text-white mt-1">6:14 AM</div>
        <div className="text-[8px] text-white/30">She woke up smiling</div>
      </div>
      <div className="space-y-1.5 flex-1">
        {rows.map(r => (
          <div key={r.l} className="flex justify-between items-center bg-white/5 rounded-xl px-3 py-2 border border-white/8">
            <span className="text-[9px] text-white/40">{r.l}</span>
            <span className="text-[9px] font-bold text-emerald-400">{r.v}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[7px] text-white/20">Export PDF · Share with pediatrician</div>
    </div>
  );
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children, shake }: { children: React.ReactNode; shake?: boolean }) {
  return (
    <motion.div className="relative mx-auto" style={{ width: 200, height: 400 }}
      animate={shake ? { x: [0, -7, 7, -5, 5, -2, 2, 0] } : { x: 0 }}
      transition={shake ? { duration: 0.5 } : {}}>
      <div className="absolute inset-0 rounded-[36px] border border-white/15 shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}>
        {/* Side buttons */}
        <div className="absolute -right-0.5 top-20 w-0.5 h-7 rounded-r-sm bg-white/15" />
        <div className="absolute -left-0.5 top-16 w-0.5 h-5 rounded-l-sm bg-white/15" />
        <div className="absolute -left-0.5 top-24 w-0.5 h-5 rounded-l-sm bg-white/15" />
        {/* Screen */}
        <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 rounded-[30px] overflow-hidden bg-black">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/15" />
            <div className="w-5 h-0.5 rounded-full bg-white/10" />
          </div>
          {/* Status bar */}
          <div className="absolute top-4 left-3 right-3 flex justify-between z-10">
            <span className="text-[6px] text-white/40">9:41</span>
            <div className="flex gap-1 items-center">
              {[3, 5, 7, 9].map((h, i) => <div key={i} className="w-0.5 rounded-sm bg-white/40" style={{ height: h }} />)}
            </div>
          </div>
          <div className="absolute inset-0 pt-8">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Tip card (replaces floating hotspot) ─────────────────────────────────────
function TipCard({ title, body, color, visible, onClose }: { title: string; body: string; color: string; visible: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="mx-auto max-w-xs rounded-2xl p-4 border relative"
          style={{ background: color + '12', borderColor: color + '35' }}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
          <button onClick={onClose} className="absolute top-3 right-3 text-white/30 hover:text-white/60">
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color }}>{title}</div>
          <p className="text-[11px] text-white/55 leading-relaxed pr-4">{body}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Hotspot dot on phone ──────────────────────────────────────────────────────
function HotspotDot({ color, onClick }: { color: string; onClick: () => void }) {
  return (
    <motion.button onClick={onClick}
      className="absolute z-20"
      style={{ top: '30%', right: '-14px' }}
      aria-label="What does this mean?">
      {[1.5, 2.2].map((s, i) => (
        <motion.div key={i} className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${color}` }}
          animate={{ scale: [1, s], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }} />
      ))}
      <div className="relative w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-[10px] font-bold shadow-lg"
        style={{ background: color, borderColor: color }}>?</div>
    </motion.button>
  );
}

// ── Welcome ───────────────────────────────────────────────────────────────────
function WelcomeScreen({ onSelect }: { onSelect: (w: Worry) => void }) {
  return (
    <motion.div className="fixed inset-0 flex flex-col items-center justify-center px-5 z-50"
      style={{ background: '#060a0e' }}
      exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.div className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-[9px] text-white/25 uppercase tracking-[0.3em] mb-5">Anvaya Smart · Interactive Tour</div>
        <h1 className="text-2xl font-bold text-white mb-2 leading-tight">What keeps you up<br />at night?</h1>
        <p className="text-white/35 text-xs mb-8">We'll show you exactly how Anvaya helps — in 5 steps.</p>
        <div className="flex flex-col gap-3">
          {WORRIES.map((w, i) => (
            <motion.button key={w.id} onClick={() => onSelect(w.id)}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl border text-left w-full transition-all"
              style={{ borderColor: w.color + '30', background: w.color + '0d' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              whileTap={{ scale: 0.97 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: w.color + '20', color: w.color }}>
                {w.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{w.label}</div>
                <div className="text-[10px] mt-0.5" style={{ color: w.color + 'aa' }}>{w.sub}</div>
              </div>
              <ChevronRight className="w-4 h-4 shrink-0" style={{ color: w.color + '60' }} />
            </motion.button>
          ))}
        </div>
        <p className="text-white/15 text-[9px] mt-6">5 steps · tap to advance · no scrolling</p>
      </motion.div>
    </motion.div>
  );
}

// ── Tour step ─────────────────────────────────────────────────────────────────
const SCREENS: Record<Step['screen'], (props: { worry: Worry; highlight: string }) => React.ReactNode> = {
  vitals:  ({ worry, highlight }) => <ScreenVitals worry={worry} highlight={highlight} />,
  device:  ({ worry, highlight }) => <ScreenDevice highlight={highlight} />,
  alert:   ({ worry, highlight }) => <ScreenAlert worry={worry} highlight={highlight} />,
  ai:      ({ worry, highlight }) => <ScreenAI worry={worry} highlight={highlight} />,
  morning: ({ worry }) => <ScreenMorning worry={worry} />,
};

function TourStep({ stepIdx, totalSteps, step, worry, color, onNext, onPrev, onRestart }: {
  stepIdx: number; totalSteps: number; step: Step; worry: Worry; color: string;
  onNext: () => void; onPrev: () => void; onRestart: () => void;
}) {
  const [tipOpen, setTipOpen] = useState(false);
  const isLast = stepIdx === totalSteps - 1;
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx > 50) onNext();
    if (dx < -50 && stepIdx > 0) onPrev();
  };

  return (
    <motion.div className="fixed inset-0 flex flex-col overflow-hidden"
      style={{ background: '#070c10' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

      {/* Top bar */}
      <div className="shrink-0 px-5 pt-5 pb-2 flex items-center justify-between">
        <button onClick={onRestart} className="text-[9px] text-white/25 hover:text-white/50 transition-colors uppercase tracking-widest">
          ← Restart
        </button>
        {/* Progress pills */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div key={i} className="h-1 rounded-full"
              animate={{ width: i === stepIdx ? 20 : 6, background: i <= stepIdx ? color : 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }} />
          ))}
        </div>
        <span className="text-[9px] text-white/25">{stepIdx + 1}/{totalSteps}</span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto px-5 pb-24 gap-5 pt-2">

        {/* Heading */}
        <motion.div className="w-full max-w-sm text-center"
          key={`h-${stepIdx}`}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="text-[8px] uppercase tracking-[0.2em] mb-2" style={{ color: color + 'aa' }}>Step {stepIdx + 1}</div>
          <h2 className="text-lg font-bold text-white leading-snug">{step.heading}</h2>
          <p className="text-xs text-white/40 mt-2 leading-relaxed">{step.body}</p>
        </motion.div>

        {/* Phone + hotspot */}
        <motion.div className="relative shrink-0"
          key={`p-${stepIdx}`}
          initial={{ opacity: 0, scale: 0.94, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 160, damping: 22 }}>
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-full blur-3xl opacity-15 scale-150 pointer-events-none" style={{ background: color }} />
          <PhoneFrame shake={step.screen === 'alert' && worry !== 'sleep'}>
            {SCREENS[step.screen]({ worry, highlight: step.highlight })}
          </PhoneFrame>
          <HotspotDot color={color} onClick={() => setTipOpen(o => !o)} />
        </motion.div>

        {/* Tip card (below phone) */}
        <div className="w-full max-w-sm">
          <TipCard title={step.tip.title} body={step.tip.body} color={color} visible={tipOpen} onClose={() => setTipOpen(false)} />
          {!tipOpen && (
            <motion.button onClick={() => setTipOpen(true)}
              className="mx-auto flex items-center gap-1.5 text-[9px] mt-1"
              style={{ color: color + '80' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[8px] font-bold" style={{ borderColor: color + '60', color }}>?</span>
              Tap for more detail
            </motion.button>
          )}
        </div>
      </div>

      {/* Fixed bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3 flex items-center gap-3"
        style={{ background: 'linear-gradient(to top, #070c10 70%, transparent)' }}>
        {stepIdx > 0 && (
          <button onClick={onPrev}
            className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {isLast ? (
          <Button asChild className="flex-1 h-12 font-bold text-sm gap-2" style={{ background: color }}>
            <Link href="/preorder"><Sparkles className="w-4 h-4" />Reserve Anvaya Smart</Link>
          </Button>
        ) : (
          <motion.button onClick={onNext}
            className="flex-1 h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ background: color, color: '#fff' }}
            whileTap={{ scale: 0.97 }}>
            {step.cta} <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TourPage() {
  const [worry, setWorry] = useState<Worry | null>(null);
  const [stepIdx, setStepIdx] = useState(0);

  const worryConfig = WORRIES.find(w => w.id === worry);
  const steps = worry ? STEPS[worry] : [];

  const handleSelect = (w: Worry) => { setWorry(w); setStepIdx(0); };
  const handleNext = () => { if (stepIdx < steps.length - 1) setStepIdx(s => s + 1); };
  const handlePrev = () => { if (stepIdx > 0) setStepIdx(s => s - 1); };
  const handleRestart = () => { setWorry(null); setStepIdx(0); };

  return (
    <div className="relative bg-[#070c10] min-h-screen">
      <AnimatePresence mode="wait">
        {!worry && <WelcomeScreen key="welcome" onSelect={handleSelect} />}
        {worry && worryConfig && (
          <TourStep
            key={`${worry}-${stepIdx}`}
            stepIdx={stepIdx}
            totalSteps={steps.length}
            step={steps[stepIdx]}
            worry={worry}
            color={worryConfig.color}
            onNext={handleNext}
            onPrev={handlePrev}
            onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
}
