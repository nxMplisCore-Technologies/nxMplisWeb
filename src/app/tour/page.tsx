'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion, useScroll, useTransform, useSpring,
  AnimatePresence, useInView,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Phone frame with live screen ────────────────────────────────────────────

function PhoneFrame({
  screen, scale = 1, glow,
}: {
  screen: React.ReactNode;
  scale?: number;
  glow?: string;
}) {
  return (
    <div className="relative mx-auto" style={{ width: 260 * scale, height: 520 * scale }}>
      {/* Glow behind phone */}
      {glow && (
        <div className="absolute inset-0 rounded-[52px] blur-3xl opacity-30 scale-90"
          style={{ background: glow }} aria-hidden="true" />
      )}
      {/* Phone body */}
      <div className="absolute inset-0 rounded-[44px] border-[6px] border-white/10 overflow-hidden shadow-2xl"
        style={{ background: '#111' }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" aria-hidden="true" />
        {/* Status bar */}
        <div className="absolute top-1 left-6 right-6 flex justify-between items-center z-10 pt-1">
          <span className="text-white text-[10px] font-semibold">3:02</span>
          <div className="flex gap-1 items-center">
            <div className="w-4 h-2.5 border border-white/40 rounded-sm relative">
              <div className="absolute inset-0.5 right-1 bg-white/60 rounded-sm" />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="absolute inset-0 pt-7 overflow-hidden">
          {screen}
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute -left-1.5 top-28 w-1 h-10 bg-white/10 rounded-l-full" aria-hidden="true" />
      <div className="absolute -left-1.5 top-44 w-1 h-14 bg-white/10 rounded-l-full" aria-hidden="true" />
      <div className="absolute -right-1.5 top-36 w-1 h-16 bg-white/10 rounded-l-full" aria-hidden="true" />
    </div>
  );
}

// ─── App screens ─────────────────────────────────────────────────────────────

function AppScreenHome() {
  return (
    <div className="h-full bg-[#0d1a16] flex flex-col px-4 pt-3">
      <div className="text-[#7aab9e] text-[10px] font-bold uppercase tracking-widest mb-1">Live Monitor</div>
      <div className="text-white text-sm font-bold mb-3">Riya · 4 months</div>
      {/* Breathing waveform mini */}
      <div className="bg-white/5 rounded-xl p-3 mb-3">
        <div className="text-[9px] text-white/40 mb-1">Breathing</div>
        <div className="flex items-end gap-0.5 h-8">
          {[3,7,4,9,3,8,5,10,3,7,4,8,5,9,3,6,4,9,3,7,4,8,5,9].map((h,i) => (
            <motion.div key={i} className="flex-1 rounded-sm"
              style={{ background: '#4a7c6f', minHeight: 2 }}
              animate={{ height: [h*2, h*3, h*2] }}
              transition={{ duration: 1.2 + (i%5)*0.2, repeat: Infinity, delay: i*0.07 }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-[#7aab9e] font-bold">44 bpm</span>
          <span className="text-[9px] text-white/30">Normal ✓</span>
        </div>
      </div>
      {/* Vitals row */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: 'SpO₂', value: '98%', color: '#7aab9e', icon: '💉' },
          { label: 'Heart', value: '118', color: '#e8957a', icon: '❤️' },
          { label: 'Temp', value: '21°C', color: '#4a7c6f', icon: '🌡️' },
          { label: 'Sleep', value: 'Deep', color: '#7aab9e', icon: '😴' },
        ].map(v => (
          <div key={v.label} className="bg-white/5 rounded-xl p-2.5">
            <div className="text-sm mb-0.5">{v.icon}</div>
            <div className="text-[13px] font-bold" style={{ color: v.color }}>{v.value}</div>
            <div className="text-[8px] text-white/30">{v.label}</div>
          </div>
        ))}
      </div>
      {/* Status pill */}
      <div className="flex items-center gap-2 bg-[#4a7c6f]/20 border border-[#4a7c6f]/30 rounded-xl px-3 py-2">
        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#7aab9e]"
          animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-[10px] text-[#7aab9e] font-semibold">All vitals normal · 3:02 AM</span>
      </div>
    </div>
  );
}

function AppScreenAlert() {
  return (
    <div className="h-full bg-[#0d1a16] flex flex-col">
      {/* Alert banner */}
      <motion.div className="bg-[#e8957a] px-4 py-3"
        initial={{ y: -60 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
        <div className="text-white text-[10px] font-bold uppercase tracking-widest mb-0.5">Cry Detected</div>
        <div className="text-white text-sm font-bold">😋 Riya is hungry</div>
        <div className="text-white/70 text-[9px] mt-0.5">Confidence 91% · 3:04 AM</div>
      </motion.div>
      <div className="flex-1 px-4 pt-3">
        {/* Sound waveform */}
        <div className="text-[9px] text-white/40 mb-2 uppercase tracking-wider">Cry pattern</div>
        <div className="flex items-center gap-0.5 h-12 mb-3">
          {[4,8,12,18,14,20,16,22,18,24,20,18,14,10,7,12,16,20,18,14,10,7,4,6].map((h,i) => (
            <motion.div key={i} className="flex-1 rounded-sm bg-[#e8957a]"
              initial={{ height: 2 }} animate={{ height: h }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: 'easeOut' }} />
          ))}
        </div>
        {/* Classification */}
        <div className="space-y-2 mb-4">
          {[
            { label: 'Hunger', pct: 91, color: '#e8957a' },
            { label: 'Pain', pct: 5, color: '#ef4444' },
            { label: 'Tired', pct: 4, color: '#7aab9e' },
          ].map((c,i) => (
            <div key={c.label} className="flex items-center gap-2">
              <span className="text-[9px] text-white/40 w-14">{c.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/10">
                <motion.div className="h-full rounded-full" style={{ background: c.color }}
                  initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                  transition={{ delay: 0.3 + i*0.1, duration: 0.6 }} />
              </div>
              <span className="text-[9px] font-bold w-7" style={{ color: c.color }}>{c.pct}%</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#e8957a]/10 border border-[#e8957a]/30 rounded-xl py-2 text-center">
            <div className="text-[9px] text-[#e8957a] font-bold">Feed now</div>
          </div>
          <div className="bg-white/5 rounded-xl py-2 text-center">
            <div className="text-[9px] text-white/40">Dismiss</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppScreenSleep() {
  return (
    <div className="h-full bg-[#0d1a16] flex flex-col px-4 pt-3">
      <div className="text-[#7aab9e] text-[10px] font-bold uppercase tracking-widest mb-1">Sleep Report</div>
      <div className="text-white text-xs font-semibold mb-3">Last night · 9.8 hrs</div>
      {/* Sleep timeline */}
      <div className="mb-3">
        <div className="flex gap-1 h-10 items-end mb-1 rounded-lg overflow-hidden">
          {[
            { color: '#4a7c6f', w: 20 },
            { color: '#7aab9e', w: 12 },
            { color: '#4a7c6f', w: 18 },
            { color: '#e8957a', w: 10 },
            { color: '#4a7c6f', w: 22 },
            { color: '#7aab9e', w: 18 },
          ].map((b, i) => (
            <motion.div key={i} className="rounded-sm"
              style={{ background: b.color, flexBasis: `${b.w}%`, height: '100%' }}
              initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }} />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-white/30">
          <span>9pm</span><span>12am</span><span>3am</span><span>6am</span>
        </div>
      </div>
      {/* Sleep stats */}
      {[
        { label: 'Deep sleep', value: '4.8h', color: '#4a7c6f' },
        { label: 'REM sleep', value: '1.2h', color: '#e8957a' },
        { label: 'Light sleep', value: '3.1h', color: '#7aab9e' },
        { label: 'Awake', value: '0.7h', color: '#6b7280' },
      ].map((s, i) => (
        <motion.div key={s.label} className="flex items-center justify-between py-1.5 border-b border-white/5"
          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-sm" style={{ background: s.color }} />
            <span className="text-[10px] text-white/60">{s.label}</span>
          </div>
          <span className="text-[10px] font-bold" style={{ color: s.color }}>{s.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Sticky scroll section ────────────────────────────────────────────────────

function StickyAct({
  bgFrom, bgTo, children,
}: {
  bgFrom: string; bgTo: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const bg = useTransform(scrollYProgress, [0, 1], [bgFrom, bgTo]);

  return (
    <div ref={ref} style={{ height: '200vh' }} className="relative">
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: bg }}>
        {children}
      </motion.div>
    </div>
  );
}

// ─── Act 1: Cold open — bedroom ───────────────────────────────────────────────

function Act1() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1]);
  const clockY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const textOp = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.35, 0.55], [30, 0]);

  return (
    <div ref={ref} style={{ height: '300vh' }} className="relative">
      <motion.div className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#050a08' }}>
        {/* Subtle bedroom bg */}
        <motion.div className="absolute inset-0 opacity-20" style={{ scale }}>
          <Image src="/anvaya-nursery.jpg" alt="" fill className="object-cover" priority />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        <motion.div style={{ opacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Clock */}
          <motion.div style={{ y: clockY }}>
            <div className="text-[6rem] sm:text-[9rem] lg:text-[12rem] font-bold text-white leading-none tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.05em' }}>
              3:02
            </div>
            <div className="text-white/20 text-base sm:text-xl tracking-[0.6em] uppercase -mt-2">AM</div>
          </motion.div>

          {/* Heartbeat line */}
          <motion.div style={{ opacity: textOp }} className="my-8 w-64">
            <svg viewBox="0 0 256 40" className="w-full" aria-hidden="true">
              <motion.path
                d="M0 20 L60 20 L75 5 L88 35 L100 8 L113 32 L126 20 L170 20 L185 5 L198 35 L210 8 L223 32 L236 20 L256 20"
                fill="none" stroke="#e8957a" strokeWidth="2" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
          </motion.div>

          {/* Opening line */}
          <motion.div style={{ opacity: textOp, y: textY }} className="max-w-lg">
            <p className="text-white/40 text-lg sm:text-2xl font-light mb-3 leading-relaxed">
              Every parent knows this feeling.
            </p>
            <p className="text-white text-2xl sm:text-4xl font-bold leading-tight">
              You wake up.<br />
              You hold your breath.<br />
              <span className="text-[#e8957a]">Is she breathing?</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Act 2: The device wakes ──────────────────────────────────────────────────

function Act2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  const deviceScale = useTransform(progress, [0, 0.4], [0.6, 1]);
  const deviceOp = useTransform(progress, [0, 0.2], [0, 1]);
  const ringOp = useTransform(progress, [0.2, 0.5], [0, 1]);
  const textOp = useTransform(progress, [0.5, 0.75], [0, 1]);
  const textY = useTransform(progress, [0.5, 0.75], [30, 0]);

  return (
    <div ref={ref} style={{ height: '300vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at center, #0d2018 0%, #050a08 70%)' }}>
        {/* Radar rings */}
        <motion.div style={{ opacity: ringOp }} className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {[120, 200, 290, 380, 470].map((r, i) => (
            <motion.div key={r} className="absolute rounded-full border border-[#4a7c6f]"
              style={{ width: r, height: r }}
              animate={{ opacity: [0, 0.35, 0], scale: [0.8, 1, 1.06] }}
              transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </motion.div>

        {/* Device pod */}
        <motion.div style={{ scale: deviceScale, opacity: deviceOp }} className="relative z-10 mb-8">
          <div className="relative w-40 h-40 sm:w-52 sm:h-52">
            <Image src="/anvaya-core.jpg" alt="Anvaya Smart pod" fill className="object-contain drop-shadow-2xl" />
            {/* Glow */}
            <motion.div className="absolute inset-0 rounded-full blur-3xl -z-10"
              style={{ background: '#4a7c6f' }}
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div style={{ opacity: textOp, y: textY }} className="text-center relative z-10 px-6 max-w-2xl">
          <div className="text-[#4a7c6f] text-xs font-bold uppercase tracking-[0.4em] mb-4">Anvaya Smart · Active</div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            While you slept,<br />
            <span style={{ color: '#7aab9e' }}>Anvaya never did.</span>
          </h2>
          <p className="text-white/40 text-base sm:text-xl">
            Radar pulses every 200ms. Detects 3mm chest movement from 90cm away. Nothing touching your baby.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Act 3: Phone materialises — live vitals ─────────────────────────────────

function Act3() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  const phoneScale = useTransform(progress, [0, 0.35], [0.4, 1]);
  const phoneOp = useTransform(progress, [0, 0.2], [0, 1]);
  const phoneY = useTransform(progress, [0, 0.35], [100, 0]);
  const leftOp = useTransform(progress, [0.4, 0.65], [0, 1]);
  const leftX = useTransform(progress, [0.4, 0.65], [-40, 0]);
  const rightOp = useTransform(progress, [0.5, 0.75], [0, 1]);
  const rightX = useTransform(progress, [0.5, 0.75], [40, 0]);

  return (
    <div ref={ref} style={{ height: '350vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4"
        style={{ background: '#060c09' }}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-5xl">

          {/* Left stat cards */}
          <motion.div style={{ opacity: leftOp, x: leftX }} className="hidden lg:flex flex-col gap-4 flex-1">
            {[
              { label: 'Breathing rate', value: '44 bpm', status: 'Normal', color: '#7aab9e', icon: '🫁' },
              { label: 'Blood oxygen', value: '98%', status: 'Optimal', color: '#4a7c6f', icon: '💉' },
              { label: 'Room temp', value: '21°C', status: 'Safe', color: '#7aab9e', icon: '🌡️' },
            ].map((s, i) => (
              <motion.div key={s.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}22`, color: s.color }}>
                    {s.status}
                  </span>
                </div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-white/30 text-xs mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Phone */}
          <motion.div style={{ scale: phoneScale, opacity: phoneOp, y: phoneY }}
            className="flex-shrink-0 relative z-10">
            <motion.div
              animate={{ rotateY: [0, 3, -3, 0], rotateX: [0, 1, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d' }}>
              <PhoneFrame screen={<AppScreenHome />} glow="#4a7c6f" />
            </motion.div>
          </motion.div>

          {/* Right info */}
          <motion.div style={{ opacity: rightOp, x: rightX }} className="hidden lg:flex flex-col gap-4 flex-1">
            <div className="text-[#4a7c6f] text-xs font-bold uppercase tracking-[0.4em] mb-2">Live monitoring</div>
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
              Every breath.<br />Every beat.<br />
              <span style={{ color: '#7aab9e' }}>On your screen.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed">
              The Anvaya app shows breathing waveform, SpO₂, heart rate, room temperature and sleep stage — updating live, all night.
            </p>
            <div className="mt-4 space-y-3">
              {['Alerts only when something is genuinely wrong', 'Learns your baby\'s normal pattern in 3 nights', 'Works offline during power cuts'].map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#4a7c6f] mt-0.5 shrink-0">✓</span>
                  <span className="text-white/50 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Act 4: Alert — cry detected ─────────────────────────────────────────────

function Act4() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  const shakeX = useTransform(progress, [0.05, 0.1, 0.15, 0.2], [0, -8, 8, 0]);
  const bgOp = useTransform(progress, [0, 0.1, 0.8, 1], [0, 0.15, 0.15, 0]);
  const textOp = useTransform(progress, [0.45, 0.65], [0, 1]);
  const textY = useTransform(progress, [0.45, 0.65], [30, 0]);

  return (
    <div ref={ref} style={{ height: '350vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center gap-12 px-6"
        style={{ background: '#0a0806' }}>
        {/* Alert glow */}
        <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at center, #e8957a 0%, transparent 60%)', opacity: bgOp }} />

        {/* Phone with shake */}
        <motion.div style={{ x: shakeX }} className="relative z-10 flex-shrink-0">
          <PhoneFrame screen={<AppScreenAlert />} glow="#e8957a" />
          {/* Notification ring */}
          <motion.div className="absolute -inset-4 rounded-[52px] border-2 border-[#e8957a]"
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.06, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }} aria-hidden="true" />
        </motion.div>

        {/* Text */}
        <motion.div style={{ opacity: textOp, y: textY }} className="max-w-md text-center lg:text-left">
          <div className="text-[#e8957a] text-xs font-bold uppercase tracking-[0.4em] mb-4">3:04 AM · Alert</div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            You knew before<br />
            you heard a sound.
          </h2>
          <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-6">
            Anvaya detected the cry pattern 4 seconds before it became audible. 91% confident: hunger. You were already moving.
          </p>
          <div className="inline-flex items-center gap-3 bg-[#e8957a]/10 border border-[#e8957a]/30 rounded-xl px-4 py-3">
            <span className="text-2xl">😋</span>
            <div>
              <div className="text-[#e8957a] text-sm font-bold">Hunger cry detected</div>
              <div className="text-white/30 text-xs">Not pain. Not discomfort. Hunger.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Act 5: Zoom into AI ──────────────────────────────────────────────────────

function Act5() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  const zoomScale = useTransform(progress, [0, 0.4], [1, 28]);
  const zoomOp = useTransform(progress, [0.3, 0.5], [1, 0]);
  const brainOp = useTransform(progress, [0.45, 0.65], [0, 1]);
  const textOp = useTransform(progress, [0.6, 0.8], [0, 1]);

  const neurons = Array.from({ length: 24 }, (_, i) => ({
    x: 15 + (i % 6) * 14, y: 20 + Math.floor(i / 6) * 20,
    delay: i * 0.08,
  }));

  return (
    <div ref={ref} style={{ height: '350vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ background: '#050308' }}>

        {/* Zoom portal effect */}
        <motion.div style={{ opacity: zoomOp }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <motion.div className="w-4 h-4 rounded-full bg-[#4a7c6f]" style={{ scale: zoomScale }} />
        </motion.div>

        {/* Neural network / AI brain visual */}
        <motion.div style={{ opacity: brainOp }} className="absolute inset-0 flex flex-col items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-72 h-72 sm:w-96 sm:h-96 mb-8" aria-hidden="true">
            {/* Connection lines */}
            {neurons.slice(0, 18).map((n, i) => {
              const next = neurons[i + 6];
              if (!next) return null;
              return (
                <motion.line key={i} x1={n.x} y1={n.y} x2={next.x} y2={next.y}
                  stroke="#4a7c6f" strokeWidth="0.3" strokeOpacity="0.4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: n.delay, duration: 0.5 }} />
              );
            })}
            {/* Neurons */}
            {neurons.map((n, i) => (
              <motion.circle key={i} cx={n.x} cy={n.y} r="2.5" fill="#4a7c6f"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: n.delay, duration: 0.3 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.5 + (i % 5) * 0.3}s`} repeatCount="indefinite" />
              </motion.circle>
            ))}
            {/* Active signal pulse */}
            {[0, 6, 12, 18].map((start, i) => (
              <motion.circle key={`pulse-${i}`}
                cx={neurons[start]?.x ?? 15} cy={neurons[start]?.y ?? 20} r="4"
                fill="none" stroke="#7aab9e" strokeWidth="1"
                animate={{ r: [2, 8, 2], opacity: [1, 0, 1] }}
                transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity }} />
            ))}
          </svg>

          <motion.div style={{ opacity: textOp }} className="text-center px-6 max-w-2xl">
            <div className="text-[#7aab9e] text-xs font-bold uppercase tracking-[0.4em] mb-4">Inside the AI</div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Trained on millions<br />of baby cry patterns.<br />
              <span style={{ color: '#7aab9e' }}>Knows yours in 3 nights.</span>
            </h2>
            <p className="text-white/30 text-base max-w-lg mx-auto">
              On-device AI means no data leaves your home. No cloud. No privacy risk. And it works during power cuts.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Act 6: Sleep report morning ─────────────────────────────────────────────

function Act6() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  const phoneOp = useTransform(progress, [0, 0.2], [0, 1]);
  const phoneY = useTransform(progress, [0, 0.2], [60, 0]);
  const textOp = useTransform(progress, [0.35, 0.55], [0, 1]);
  const textY = useTransform(progress, [0.35, 0.55], [30, 0]);
  const ctaOp = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <div ref={ref} style={{ height: '350vh' }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row items-center justify-center gap-12 px-6"
        style={{ background: 'radial-gradient(ellipse at center bottom, #0d2018 0%, #060c09 60%)' }}>

        {/* Morning glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none" aria-hidden="true"
          style={{ background: 'linear-gradient(to top, rgba(74,124,111,0.08), transparent)' }} />

        {/* Phone */}
        <motion.div style={{ opacity: phoneOp, y: phoneY }} className="relative z-10 flex-shrink-0">
          <motion.div animate={{ rotateY: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <PhoneFrame screen={<AppScreenSleep />} glow="#4a7c6f" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div style={{ opacity: textOp, y: textY }} className="max-w-md text-center lg:text-left">
          <div className="text-[#7aab9e] text-xs font-bold uppercase tracking-[0.4em] mb-4">6:18 AM · Morning</div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            9.8 hours of data.<br />
            <span style={{ color: '#7aab9e' }}>One night. No worry.</span>
          </h2>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            Breathing stayed normal all night. SpO₂ never dropped below 96%. She cried once at 3:04AM — you fed her in 2 minutes. Deep sleep: 4.8 hours.
          </p>
          <motion.div style={{ opacity: ctaOp }} className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="font-bold gap-2 text-white border-0"
              style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 32px rgba(232,149,122,0.3)' }}>
              <Link href="/early-access">
                <MessageCircle className="w-4 h-4" />
                Reserve your pod — No payment now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg"
              className="border-white/20 text-white bg-transparent hover:bg-white/10 font-semibold gap-2">
              <Link href="/anvaya">See all models <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Act labels overlay ───────────────────────────────────────────────────────

const ACT_LABELS = ['Cold Open', 'The Device', 'Live Monitor', 'Alert', 'Inside AI', 'Morning'];

function ActIndicator({ active }: { active: number }) {
  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {ACT_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <motion.div className="rounded-full bg-[#4a7c6f]"
            animate={{ width: i === active ? 24 : 5, height: 5, opacity: i === active ? 1 : 0.3 }}
            transition={{ duration: 0.3 }} />
          <AnimatePresence>
            {i === active && (
              <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
                className="text-[10px] text-white/50 font-medium whitespace-nowrap">
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TourPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeAct, setActiveAct] = useState(0);

  // Total sections: 300+300+350+350+350+350 = 2000vh
  // Each act boundary (approximate scroll fractions)
  const BOUNDS = [0, 0.15, 0.30, 0.48, 0.63, 0.80];

  useEffect(() => {
    return scrollYProgress.on('change', v => {
      const idx = BOUNDS.findLastIndex(b => v >= b);
      setActiveAct(Math.max(0, Math.min(idx, ACT_LABELS.length - 1)));
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative">
      <ActIndicator active={activeAct} />
      <Act1 />
      <Act2 />
      <Act3 />
      <Act4 />
      <Act5 />
      <Act6 />

      {/* Final section */}
      <div className="bg-[#faf8f5] py-24 text-center px-6">
        <div className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-3">27 spots remaining</div>
        <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
          Your story starts<br />with one decision.
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
          No payment today. Reserve your Anvaya pod and we'll reach out within the hour.
        </p>
        <Button asChild size="lg" className="text-white font-bold gap-2"
          style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 24px rgba(232,149,122,0.4)' }}>
          <Link href="/early-access">
            <MessageCircle className="w-4 h-4" />
            Reserve your Anvaya pod
          </Link>
        </Button>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>No payment now</span>
          <span>·</span>
          <span>Free shipping India</span>
          <span>·</span>
          <span>30-day returns</span>
        </div>
      </div>
    </div>
  );
}
