'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wind, Moon, Sparkles, Baby, ChevronRight, ChevronLeft, X } from 'lucide-react';

type Worry = 'breathing' | 'crying' | 'sleep';

const WORRIES = [
  { id: 'breathing' as Worry, icon: <Wind className="w-5 h-5" />, label: 'Is she breathing?',      sub: 'The fear at 3 AM',   color: '#4a7c6f' },
  { id: 'crying'    as Worry, icon: <Baby className="w-5 h-5" />, label: 'Why is he crying?',      sub: 'Hunger? Pain? Gas?', color: '#d4784a' },
  { id: 'sleep'     as Worry, icon: <Moon className="w-5 h-5" />, label: 'Is she sleeping enough?', sub: 'Deep sleep matters', color: '#5a7fa8' },
];

type Step = {
  heading: string; body: string; cta: string;
  screen: 'vitals' | 'device' | 'alert' | 'ai' | 'morning';
  highlight: string;
  tip: { title: string; body: string };
};

const STEPS: Record<Worry, Step[]> = {
  breathing: [
    { heading: '3:02 AM. She hasn\'t made a sound in 40 minutes.', body: 'The silence feels wrong. You wonder.', cta: 'What\'s Anvaya doing?', screen: 'vitals', highlight: 'breathing', tip: { title: 'Checked 12,840 times', body: 'Every breath tracked contactlessly since she fell asleep. All normal.' } },
    { heading: 'A small clip. No wires. No patches.', body: 'Radar + AI working silently so you don\'t have to stay awake.', cta: 'Show me what it sees', screen: 'device', highlight: 'radar', tip: { title: '6 sensors in 1', body: 'Breathing, SpO₂, temperature, sound, motion, cry — all contactless.' } },
    { heading: 'Breathing: 42/min. Normal. Safe.', body: 'Not a guess — 9 hours of data, every breath tracked.', cta: 'What if something changes?', screen: 'vitals', highlight: 'rate', tip: { title: 'Normal range', body: '30–60 breaths/min for newborns. Anvaya alerts if it dips or spikes.' } },
    { heading: 'At 3:47 AM — an alert fires.', body: 'Before you\'re fully awake, your phone already knows.', cta: 'What did it say?', screen: 'alert', highlight: 'spo2', tip: { title: 'In 3 seconds', body: 'SpO₂ dipped briefly. You were at her side in 18 seconds.' } },
    { heading: '6:14 AM. She\'s smiling.', body: '9 hours of data. Every breath logged. She was safe all night.', cta: 'Reserve Anvaya Smart', screen: 'morning', highlight: 'summary', tip: { title: 'Night summary', body: '9h 12m tracked · 0 apnea events · Avg 41/min · Score 8.4/10' } },
  ],
  crying: [
    { heading: '2:58 AM. Third time tonight.', body: 'Fed, changed, held. Still crying. You don\'t know why.', cta: 'What does Anvaya hear?', screen: 'vitals', highlight: 'sound', tip: { title: 'Detected in 0.4s', body: 'Anvaya heard him before your phone buzzed. Already analyzing.' } },
    { heading: 'Every cry has a signature.', body: 'Hunger is rhythmic. Pain is sudden and high-pitched. Anvaya reads the pattern.', cta: 'Show me the analysis', screen: 'device', highlight: 'mic', tip: { title: 'Trained on 50,000+ cries', body: 'Real recordings — hunger, pain, discomfort, fatigue. Tuned to Indian environments.' } },
    { heading: 'Hunger. 94% confidence.', body: 'Not pain. Not gas. You pick him up knowing exactly what he needs.', cta: 'How accurate is this?', screen: 'alert', highlight: 'verdict', tip: { title: '91% accuracy', body: 'Matched pediatrician assessments in field tests. Cuts guessing from 20 min to 8 sec.' } },
    { heading: 'Patterns emerge over days.', body: 'By week 3 you\'ll know he\'s always hungry at 3 AM. By week 6 — it stops.', cta: 'Show me the pattern', screen: 'ai', highlight: 'trend', tip: { title: 'Last 7 days', body: '23 hunger · 4 discomfort · 1 pain. Move evening feed 30 min later to cut night wake-ups.' } },
    { heading: '7 AM. He\'s peaceful. You slept 4 hours.', body: 'At 3 AM you knew in 8 seconds. You both went back to sleep.', cta: 'Reserve Anvaya Smart', screen: 'morning', highlight: 'saved', tip: { title: 'Sleep rescued', body: '5 wake-ups 3 nights ago → 2 last night. Parents gain ~3h sleep/night by week 2.' } },
  ],
  sleep: [
    { heading: '11 PM. Is she in deep sleep?', body: 'Or just quiet? Her brain development depends on sleep quality right now.', cta: 'What is Anvaya tracking?', screen: 'vitals', highlight: 'stage', tip: { title: 'Deep sleep detected', body: 'Started 18 minutes ago. Brain development is happening right now.' } },
    { heading: 'Light · Deep · REM — all tracked.', body: 'No chest clip. No wrist band. Same metrics as a pediatric sleep lab.', cta: 'Show me the map', screen: 'device', highlight: 'stages', tip: { title: 'Sleep science', body: 'Newborns spend 50% in REM. Anvaya tracks all 3 stages contactlessly.' } },
    { heading: 'Deep sleep: 3.8h. REM: 2.1h. Optimal.', body: 'Her specific night mapped in real time — not an average.', cta: 'What does optimal mean?', screen: 'ai', highlight: 'score', tip: { title: 'AAP guideline', body: '14–16h total + 4h+ deep sleep per night supports healthy cognitive development.' } },
    { heading: '2:14 AM — she stirs, then settles.', body: 'Anvaya waits 90 seconds. She self-settles. You sleep through it.', cta: 'How does it decide?', screen: 'alert', highlight: 'settle', tip: { title: 'Smart alerts', body: '90s window before alerting. Reduces unnecessary parent wake-ups by 61%.' } },
    { heading: '6:48 AM. She woke up smiling.', body: '9.2h total. 4.1h deep sleep. Her brain got exactly what it needed.', cta: 'Reserve Anvaya Smart', screen: 'morning', highlight: 'sleep', tip: { title: 'Last night', body: 'Total 9h 14m · Deep 4.1h · REM 2.3h · 1 self-settled waking · Score 9.1/10' } },
  ],
};

// ── Phone screens (compact, dark bg matches outer) ────────────────────────────
function ScreenVitals({ worry }: { worry: Worry }) {
  const color = worry === 'breathing' ? '#4ade80' : worry === 'sleep' ? '#a78bfa' : '#fb923c';
  const label = worry === 'breathing' ? 'Breathing Rate' : worry === 'sleep' ? 'Sleep Stage' : 'Sound';
  const value = worry === 'breathing' ? '42 / min' : worry === 'sleep' ? 'Deep Sleep' : 'Analyzing…';
  const sub   = worry === 'breathing' ? 'Normal · 30–60 range' : worry === 'sleep' ? 'Started 18 min ago' : 'Cry pattern detected';
  const bars  = Array.from({ length: 18 }, (_, i) => Math.max(8, 30 + Math.sin(i * 0.7) * 55 + Math.sin(i * 1.9) * 12));
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2" style={{ background: '#0a1410' }}>
      <div className="flex justify-between items-center">
        <span className="text-[7px] text-white/30 uppercase tracking-wider">Live · Anvaya</span>
        <motion.div className="flex items-center gap-1" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <div className="w-1 h-1 rounded-full" style={{ background: color }} />
          <span className="text-[7px]" style={{ color }}>LIVE</span>
        </motion.div>
      </div>
      <div className="rounded-xl p-2.5 border" style={{ background: color + '12', borderColor: color + '35' }}>
        <div className="text-[7px] text-white/30 mb-0.5">{label}</div>
        <div className="text-xl font-bold leading-tight" style={{ color }}>{value}</div>
        <div className="text-[7px] mt-0.5" style={{ color: color + '99' }}>{sub}</div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[{ l: 'SpO₂', v: '98%', c: '#60a5fa' }, { l: 'Temp', v: '36.7°', c: '#f9a8d4' }, { l: 'Motion', v: 'Still', c: '#64748b' }].map(m => (
          <div key={m.l} className="rounded-lg p-1.5 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="text-[6px] text-white/25">{m.l}</div>
            <div className="text-xs font-semibold" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-end gap-1">
        <div className="flex items-end gap-0.5" style={{ height: 36 }}>
          {bars.map((h, i) => <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: color, opacity: 0.5 + i / bars.length * 0.5 }} />)}
        </div>
        <div className="text-[6px] text-white/20 text-center">Live waveform</div>
      </div>
    </div>
  );
}

function ScreenDevice() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 p-3" style={{ background: '#080e14' }}>
      <div className="text-[7px] text-white/25 uppercase tracking-wider">Crib mounted · No contact</div>
      <div className="relative w-16 h-16">
        {[1.4, 2.0].map((s, i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border border-emerald-400/20"
            animate={{ scale: [1, s], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }} />
        ))}
        <div className="absolute inset-0 rounded-full bg-emerald-900/30 border border-emerald-400/40 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-emerald-400/80" />
        </div>
      </div>
      <div className="text-xs font-semibold text-emerald-400">Anvaya Smart</div>
      <div className="grid grid-cols-3 gap-1 w-full">
        {['Radar', 'SpO₂', 'Temp', 'Audio', 'Motion', 'AI'].map((s, i) => (
          <motion.div key={s} className="rounded-lg py-1.5 flex flex-col items-center gap-0.5 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.04)' }}
            animate={{ borderColor: ['rgba(255,255,255,0.08)', 'rgba(74,222,128,0.3)', 'rgba(255,255,255,0.08)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-[6px] text-white/40">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScreenAlert({ worry }: { worry: Worry }) {
  const isCry = worry === 'crying';
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2" style={{ background: '#0e0a08' }}>
      <motion.div className="rounded-xl p-2.5 border"
        style={{ background: 'rgba(212,120,74,0.12)', borderColor: 'rgba(212,120,74,0.4)' }}
        animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <div className="text-[7px] text-orange-400/70 uppercase tracking-wider mb-0.5">{isCry ? 'Cry detected · 3:47 AM' : 'Night waking · 2:14 AM'}</div>
        <div className="text-sm font-bold text-white">{isCry ? 'Analyzing cry…' : 'Baby stirred'}</div>
      </motion.div>
      {isCry ? (
        <>
          <div className="flex items-end gap-0.5" style={{ height: 28 }}>
            {Array.from({ length: 18 }, (_, i) => {
              const h = Math.max(6, 20 + Math.sin(i * 0.9) * 60 + Math.sin(i * 2.3) * 15);
              return <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: '#d4784a' }} />;
            })}
          </div>
          <div className="space-y-1.5">
            {[{ l: 'Hunger', v: 94, c: '#4ade80' }, { l: 'Discomfort', v: 4, c: '#334155' }, { l: 'Pain', v: 2, c: '#334155' }].map(b => (
              <div key={b.l} className="flex items-center gap-1.5">
                <span className="text-[7px] text-white/35 w-14">{b.l}</span>
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: b.c }}
                    initial={{ width: 0 }} animate={{ width: `${b.v}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
                </div>
                <span className="text-[7px] font-bold w-5 text-right" style={{ color: b.c }}>{b.v}%</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-2 text-center mt-auto border border-emerald-400/25" style={{ background: 'rgba(74,222,128,0.08)' }}>
            <div className="text-[7px] text-emerald-400/60 uppercase tracking-wider">Verdict</div>
            <div className="text-sm font-bold text-emerald-300">Hunger · Feed now</div>
          </div>
        </>
      ) : (
        <div className="space-y-2 mt-1">
          {['Monitoring', 'No action needed', 'Self-settling… (60s)', 'Event logged'].map((s, i) => (
            <motion.div key={s} className="flex items-center gap-2"
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.25 }}>
              <div className="w-4 h-4 rounded-full border border-emerald-400/35 flex items-center justify-center shrink-0" style={{ background: 'rgba(74,222,128,0.08)' }}>
                <div className="w-1 h-1 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[8px] text-white/40">{s}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenAI({ worry }: { worry: Worry }) {
  const color = worry === 'breathing' ? '#4ade80' : worry === 'sleep' ? '#a78bfa' : '#fb923c';
  const rows = worry === 'crying'
    ? [{ l: 'Cry frequency', v: 91 }, { l: 'Temporal pattern', v: 87 }, { l: 'Acoustic match', v: 94 }]
    : worry === 'sleep'
    ? [{ l: 'Movement', v: 96 }, { l: 'Breathing rhythm', v: 93 }, { l: 'Sound baseline', v: 88 }]
    : [{ l: 'Breathing rate', v: 99 }, { l: 'Regularity', v: 95 }, { l: 'Apnea detect', v: 97 }];
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2" style={{ background: '#06080f' }}>
      <div className="text-[7px] text-indigo-400/50 uppercase tracking-wider">AI Analysis</div>
      <div className="flex-1 flex items-center justify-center">
        <svg width="110" height="80" viewBox="0 0 110 80">
          {[[10], [10, 30, 50], [10, 30, 50], [30]].map((ys, col) =>
            ys.map((y, i) => {
              const x = 12 + col * 26;
              const nextYs: number[] = col < 3 ? ([[10, 30, 50], [10, 30, 50], [30], [30]] as number[][])[col] : [];
              return (
                <g key={`${col}-${i}`}>
                  {nextYs.map((ny, j) => (
                    <motion.line key={j} x1={x} y1={y + 12} x2={x + 26} y2={ny + 12}
                      stroke="rgba(99,102,241,0.2)" strokeWidth="0.7"
                      animate={{ opacity: [0.1, 0.5, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: (col + i + j) * 0.2 }} />
                  ))}
                  <motion.circle cx={x} cy={y + 12} r="4.5" fill="rgba(99,102,241,0.12)" stroke="#6366f1" strokeWidth="0.8"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: (col + i) * 0.2 }} />
                </g>
              );
            })
          )}
        </svg>
      </div>
      <div className="space-y-1.5">
        {rows.map(r => (
          <div key={r.l} className="flex items-center gap-2">
            <span className="text-[7px] text-white/30 w-20 shrink-0">{r.l}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div className="h-full rounded-full" style={{ background: color }}
                initial={{ width: 0 }} animate={{ width: `${r.v}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
            <span className="text-[7px] font-bold w-4 text-right" style={{ color }}>{r.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenMorning({ worry }: { worry: Worry }) {
  const rows = worry === 'breathing'
    ? [{ l: 'Avg breathing', v: '41/min' }, { l: 'Apnea events', v: 'None' }, { l: 'SpO₂ min', v: '97.2%' }, { l: 'Sleep score', v: '8.4/10' }]
    : worry === 'crying'
    ? [{ l: 'Cry episodes', v: '2' }, { l: 'Classified', v: '2/2' }, { l: 'Avg response', v: '8 sec' }, { l: 'Extra sleep', v: '+3.1h' }]
    : [{ l: 'Total sleep', v: '9h 14m' }, { l: 'Deep sleep', v: '4.1h' }, { l: 'Night wakings', v: '1 (settled)' }, { l: 'Score', v: '9.1/10' }];
  return (
    <div className="w-full h-full flex flex-col p-3 gap-2" style={{ background: '#0d0c08' }}>
      <div className="text-center">
        <div className="text-[7px] text-amber-400/40 uppercase tracking-wider">Morning Report</div>
        <div className="text-xl font-bold text-white mt-0.5">6:14 AM</div>
        <div className="text-[7px] text-white/25">She woke up smiling</div>
      </div>
      <div className="flex-1 space-y-1.5">
        {rows.map(r => (
          <div key={r.l} className="flex justify-between items-center px-2.5 py-1.5 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <span className="text-[8px] text-white/35">{r.l}</span>
            <span className="text-[8px] font-bold text-emerald-400">{r.v}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-[6px] text-white/15">Share with pediatrician · PDF export</div>
    </div>
  );
}

// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneFrame({ children, shake }: { children: React.ReactNode; shake?: boolean }) {
  return (
    <motion.div className="relative" style={{ width: 180, height: 360 }}
      animate={shake ? { x: [0, -6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
      transition={shake ? { duration: 0.5 } : {}}>
      <div className="absolute inset-0 rounded-[32px] border border-white/12 shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(160deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)' }}>
        <div className="absolute -right-0.5 top-16 w-0.5 h-6 rounded-r-sm bg-white/12" />
        <div className="absolute -left-0.5 top-12 w-0.5 h-5 rounded-l-sm bg-white/12" />
        <div className="absolute -left-0.5 top-20 w-0.5 h-5 rounded-l-sm bg-white/12" />
        <div className="absolute top-1 left-1 right-1 bottom-1 rounded-[28px] overflow-hidden bg-black">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-white/12" />
            <div className="w-4 h-0.5 rounded-full bg-white/8" />
          </div>
          {/* Status */}
          <div className="absolute top-3.5 left-2.5 right-2.5 flex justify-between z-10">
            <span className="text-[5px] text-white/30">9:41</span>
            <div className="flex gap-0.5 items-end">
              {[2, 4, 6, 8].map((h, i) => <div key={i} className="w-0.5 rounded-sm bg-white/35" style={{ height: h }} />)}
            </div>
          </div>
          <div className="absolute inset-0 pt-7">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Tip card ──────────────────────────────────────────────────────────────────
function TipCard({ title, body, color, onClose }: { title: string; body: string; color: string; onClose: () => void }) {
  return (
    <motion.div className="rounded-xl p-3 border relative"
      style={{ background: color + '10', borderColor: color + '30' }}
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}>
      <button onClick={onClose} className="absolute top-2.5 right-2.5 text-white/25 hover:text-white/50">
        <X className="w-3 h-3" />
      </button>
      <div className="text-[8px] font-bold uppercase tracking-wider mb-1 pr-4" style={{ color }}>{title}</div>
      <p className="text-[10px] leading-relaxed text-white/45 pr-4">{body}</p>
    </motion.div>
  );
}

// ── Welcome ───────────────────────────────────────────────────────────────────
function WelcomeScreen({ onSelect }: { onSelect: (w: Worry) => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
      <motion.div className="w-full max-w-sm"
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-[9px] text-white/20 uppercase tracking-[0.25em] mb-4 text-center">Anvaya Smart · Interactive Tour</div>
        <h1 className="text-2xl font-bold text-white mb-1.5 text-center leading-tight">What keeps you up<br/>at night?</h1>
        <p className="text-white/30 text-xs mb-7 text-center">Pick your worry — we'll show you how Anvaya handles it.</p>
        <div className="flex flex-col gap-2.5">
          {WORRIES.map((w, i) => (
            <motion.button key={w.id} onClick={() => onSelect(w.id)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left w-full"
              style={{ borderColor: w.color + '25', background: w.color + '0c' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1 }}
              whileTap={{ scale: 0.97 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: w.color + '20', color: w.color }}>
                {w.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{w.label}</div>
                <div className="text-[10px] mt-0.5" style={{ color: w.color + '99' }}>{w.sub}</div>
              </div>
              <ChevronRight className="w-4 h-4 shrink-0" style={{ color: w.color + '50' }} />
            </motion.button>
          ))}
        </div>
        <p className="text-white/12 text-[9px] mt-5 text-center">5 steps · tap to advance · swipe to go back</p>
      </motion.div>
    </div>
  );
}

// ── Tour step ─────────────────────────────────────────────────────────────────
function TourStep({ stepIdx, totalSteps, step, worry, color, onNext, onPrev, onRestart }: {
  stepIdx: number; totalSteps: number; step: Step; worry: Worry; color: string;
  onNext: () => void; onPrev: () => void; onRestart: () => void;
}) {
  const [tipOpen, setTipOpen] = useState(false);
  const isLast = stepIdx === totalSteps - 1;
  const touchStartX = useRef(0);

  const screens = {
    vitals:  <ScreenVitals worry={worry} />,
    device:  <ScreenDevice />,
    alert:   <ScreenAlert worry={worry} />,
    ai:      <ScreenAI worry={worry} />,
    morning: <ScreenMorning worry={worry} />,
  };

  return (
    <div className="absolute inset-0 flex flex-col"
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const dx = touchStartX.current - e.changedTouches[0].clientX;
        if (dx > 50) onNext();
        else if (dx < -50 && stepIdx > 0) onPrev();
      }}>

      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-5 pt-5 pb-3">
        <button onClick={onRestart} className="text-[9px] text-white/20 hover:text-white/40 uppercase tracking-widest transition-colors">
          ← Back
        </button>
        <div className="flex gap-1.5 items-center">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div key={i} className="h-0.5 rounded-full"
              animate={{ width: i === stepIdx ? 18 : 5, background: i <= stepIdx ? color : 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.25 }} />
          ))}
        </div>
        <span className="text-[9px] text-white/20">{stepIdx + 1}/{totalSteps}</span>
      </div>

      {/* Content — centered, no inner scroll */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 min-h-0">

        {/* Heading */}
        <motion.div className="w-full max-w-xs text-center"
          key={`h-${stepIdx}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <h2 className="text-base font-bold text-white leading-snug">{step.heading}</h2>
          <p className="text-[11px] text-white/35 mt-1.5 leading-relaxed">{step.body}</p>
        </motion.div>

        {/* Phone */}
        <motion.div className="shrink-0 relative"
          key={`p-${stepIdx}`}
          initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.05, type: 'spring', stiffness: 180, damping: 22 }}>
          {/* Soft glow only — no color block behind phone */}
          <div className="absolute inset-0 rounded-full blur-2xl opacity-12 scale-125 pointer-events-none" style={{ background: color }} />
          <PhoneFrame shake={step.screen === 'alert' && worry !== 'sleep'}>
            {screens[step.screen]}
          </PhoneFrame>
          {/* Hotspot dot */}
          <motion.button
            className="absolute z-20 -right-3 top-1/4 w-6 h-6 rounded-full border-2 flex items-center justify-center text-white text-[9px] font-bold shadow-lg"
            style={{ background: color, borderColor: color }}
            onClick={() => setTipOpen(o => !o)}
            animate={{ boxShadow: [`0 0 0 0 ${color}50`, `0 0 0 6px ${color}00`] }}
            transition={{ duration: 1.6, repeat: Infinity }}>
            ?
          </motion.button>
        </motion.div>

        {/* Tip card */}
        <div className="w-full max-w-xs">
          <AnimatePresence mode="wait">
            {tipOpen
              ? <TipCard key="tip" title={step.tip.title} body={step.tip.body} color={color} onClose={() => setTipOpen(false)} />
              : <motion.button key="hint" onClick={() => setTipOpen(true)}
                  className="mx-auto flex items-center gap-1.5 text-[9px]"
                  style={{ color: color + '60' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  <span className="w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[7px] font-bold" style={{ borderColor: color + '50', color }}>?</span>
                  Tap for detail
                </motion.button>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 px-5 pb-6 pt-3 flex items-center gap-2.5">
        {stepIdx > 0 && (
          <button onClick={onPrev}
            className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 shrink-0 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {isLast ? (
          <Button asChild className="flex-1 h-11 font-bold text-sm gap-2 text-white" style={{ background: color }}>
            <Link href="/preorder"><Sparkles className="w-4 h-4" />Reserve Anvaya Smart</Link>
          </Button>
        ) : (
          <motion.button onClick={onNext}
            className="flex-1 h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 text-white"
            style={{ background: color }}
            whileTap={{ scale: 0.97 }}>
            {step.cta} <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ── Page — single fixed dark root, no page-level scroll ───────────────────────
export default function TourPage() {
  const [worry, setWorry] = useState<Worry | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward

  const worryConfig = WORRIES.find(w => w.id === worry);
  const steps = worry ? STEPS[worry] : [];

  const go = (next: number) => { setDir(next > stepIdx ? 1 : -1); setStepIdx(next); };
  const handleSelect = (w: Worry) => { setWorry(w); setStepIdx(0); setDir(1); };
  const handleRestart = () => { setWorry(null); setStepIdx(0); };

  return (
    // Fixed full-screen root: prevents page scroll fighting the fixed panels
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#070c10' }}>
      <AnimatePresence initial={false}>
        {!worry
          ? <motion.div key="welcome" className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <WelcomeScreen onSelect={handleSelect} />
            </motion.div>
          : <motion.div key={`${worry}-${stepIdx}`} className="absolute inset-0"
              initial={{ opacity: 0, x: dir * 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -30 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}>
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
