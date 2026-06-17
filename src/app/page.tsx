'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Sparkles, Activity, Thermometer, Baby, Moon, Heart, Phone, Star, ChevronDown, Quote, Shield, Zap, Lock, Wifi, Camera, Music, Bell } from 'lucide-react';
import { LeadModalTrigger } from '@/components/ui/lead-modal-trigger';
import { useToast } from '@/hooks/use-toast';
import { FAQSchema } from '@/components/seo/JsonLd';

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
function Reveal({ children, variant = fadeUp, custom = 0, className = '', style }: {
  children: React.ReactNode;
  variant?: typeof fadeUp;
  custom?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variant} custom={custom} className={className} style={{ backgroundColor: 'transparent', ...style }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────── LIVE MONITOR ─────────────────── */
function LiveMonitorWidget() {
  const [bpm, setBpm] = useState(28);
  const [spo2, setSpo2] = useState(98);
  const [temp, setTemp] = useState(36.5);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setBpm(v => Math.max(24, Math.min(32, v + (Math.random() > .5 ? 1 : -1))));
      setSpo2(v => Math.max(96, Math.min(99, v + (Math.random() > .7 ? 1 : Math.random() > .5 ? 0 : -1))));
      setTemp(v => parseFloat((Math.max(36.2, Math.min(36.9, v + (Math.random() - .5) * .1))).toFixed(1)));
      setTick(p => p + 1);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const pts = Array.from({ length: 48 }, (_, i) => {
    const x = i * 6.5;
    const y = 24 + Math.sin(i * .55 + tick * .6) * 9 + Math.sin(i * 1.1 + tick * .3) * 4;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass rounded-2xl p-4 shadow-xl border-white/70 w-full max-w-[300px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Anvaya Smart</p>
          <p className="text-sm font-semibold">Sleeping peacefully 😴</p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
          <div className="live-dot w-1.5 h-1.5" />
          <span className="text-[11px] font-bold text-green-600">Live</span>
        </div>
      </div>
      {/* Waveform */}
      <div className="bg-slate-50 rounded-xl h-12 mb-3 overflow-hidden relative">
        <svg viewBox="0 0 312 48" className="w-full h-full" preserveAspectRatio="none">
          <polyline points={pts} fill="none" stroke="#4a7c6f" strokeWidth="1.8" strokeLinecap="round" style={{ transition: 'all 1s ease' }} />
        </svg>
        <span className="absolute top-1.5 left-2.5 text-[9px] font-semibold text-primary/50 uppercase tracking-wide">Breathing</span>
      </div>
      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Breaths', value: bpm, unit: '/min', color: '#4a7c6f', icon: Activity },
          { label: 'SpO2', value: spo2, unit: '%', color: '#7aab9e', icon: Heart },
          { label: 'Temp', value: temp, unit: '°C', color: '#e8957a', icon: Thermometer },
        ].map(m => (
          <div key={m.label} className="bg-white/80 rounded-xl p-2 text-center">
            <m.icon className="w-3.5 h-3.5 mx-auto mb-0.5" style={{ color: m.color }} />
            <div className="text-sm font-bold leading-none" style={{ color: m.color }}>{m.value}{m.unit}</div>
            <div className="text-[9px] text-muted-foreground mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
        <CheckCircle className="w-3 h-3 text-green-500" />
        All vitals normal · No alerts tonight
      </div>
    </div>
  );
}

/* ─────────────────── PHONE MOCKUP ─────────────────── */
function PhoneMockup({ src, alt, className = '', objectPosition = 'center' }: { src: string; alt: string; className?: string; objectPosition?: string }) {
  return (
    <div className={`phone-frame relative select-none ${className}`} style={{ width: 'min(220px, 72vw)', minWidth: 160 }}>
      <div className="phone-screen bg-gray-100" style={{ height: 'min(440px, 144vw)' }}>
        <Image src={src} alt={alt} fill className="object-cover" style={{ objectPosition }} sizes="(max-width: 480px) 72vw, 220px" />
      </div>
    </div>
  );
}

/* ─────────────────── COUNTER ─────────────────── */
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let current = 0;
      const step = target / 45;
      const t = setInterval(() => {
        current = Math.min(current + step, target);
        setVal(Math.round(current));
        if (current >= target) clearInterval(t);
      }, 28);
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <strong ref={ref}>{val}{suffix}</strong>;
}

/* ─────────────────── BABY SVG ─────────────────── */
function BabySVG() {
  return (
    <svg width="96" viewBox="0 0 80 70" fill="none">
      {/* Swaddle body */}
      <ellipse cx="40" cy="61" rx="22" ry="10" fill="#5a9fd4"/>
      {/* Blanket */}
      <path d="M18,51 Q29,44 40,45 Q51,44 62,51 Q58,58 40,58 Q22,58 18,51Z" fill="#7ab8e8"/>
      {/* Blanket highlight stripe */}
      <path d="M22,51 Q40,45 58,51" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Star on blanket */}
      <text x="35" y="56" fontSize="7" fill="rgba(255,255,255,0.4)">✦</text>
      {/* Head */}
      <circle cx="40" cy="23" r="21" fill="#f9d5b0"/>
      {/* Head highlight */}
      <ellipse cx="33" cy="14" rx="8" ry="5.5" fill="rgba(255,255,255,0.14)"/>
      {/* Ears */}
      <ellipse cx="19" cy="23" rx="4" ry="5.5" fill="#f5c090"/>
      <ellipse cx="61" cy="23" rx="4" ry="5.5" fill="#f5c090"/>
      {/* Inner ears */}
      <ellipse cx="19" cy="23" rx="2" ry="3" fill="rgba(200,110,60,0.22)"/>
      <ellipse cx="61" cy="23" rx="2" ry="3" fill="rgba(200,110,60,0.22)"/>
      {/* Blush cheeks */}
      <ellipse cx="25" cy="30" rx="7" ry="4.5" fill="rgba(215,75,55,0.28)"/>
      <ellipse cx="55" cy="30" rx="7" ry="4.5" fill="rgba(215,75,55,0.28)"/>
      {/* Sleeping eyes */}
      <path d="M28,21 Q31.5,18 35,21" stroke="#7a4e2d" strokeWidth="1.9" strokeLinecap="round" fill="none"/>
      <path d="M45,21 Q48.5,18 52,21" stroke="#7a4e2d" strokeWidth="1.9" strokeLinecap="round" fill="none"/>
      {/* Eyelash dots */}
      <circle cx="29" cy="20" r="0.9" fill="#7a4e2d"/>
      <circle cx="51" cy="20" r="0.9" fill="#7a4e2d"/>
      {/* Nose */}
      <path d="M37.5,27 Q40,30 42.5,27" stroke="rgba(170,70,30,0.5)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* Smile */}
      <path d="M34,33 Q40,37 46,33" stroke="#c27050" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      {/* Hair */}
      <path d="M26,7 Q31,2 37,5" stroke="#a07040" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M36,3 Q40,-1 44,3" stroke="#9a6838" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M43,5 Q49,2 54,7" stroke="#a07040" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Little fist */}
      <ellipse cx="57" cy="52" rx="5.5" ry="4.5" fill="#f9d5b0"/>
      <ellipse cx="55" cy="51" rx="2" ry="1.5" fill="rgba(200,110,60,0.25)"/>
    </svg>
  );
}

/* ─────────────────── SENSOR VISUALIZATION ─────────────────── */
function SensorViz() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  const stars = [
    { left: '7%', top: '5%', dur: 2.1, size: 2 }, { left: '17%', top: '11%', dur: 3.0, size: 1.5 },
    { left: '30%', top: '4%', dur: 2.5, size: 2 }, { left: '43%', top: '8%', dur: 1.9, size: 1.5 },
    { left: '55%', top: '5%', dur: 2.7, size: 2 }, { left: '64%', top: '13%', dur: 2.3, size: 1.5 },
    { left: '76%', top: '7%', dur: 3.1, size: 2 }, { left: '88%', top: '4%', dur: 2.0, size: 1.5 },
    { left: '11%', top: '21%', dur: 2.8, size: 1.5 }, { left: '48%', top: '17%', dur: 2.2, size: 2 },
    { left: '70%', top: '19%', dur: 1.8, size: 1.5 }, { left: '91%', top: '15%', dur: 2.6, size: 2 },
  ];

  return (
    <div ref={ref} className="mx-auto select-none" style={{ width: 'min(640px, 100%)' }}>
      {/* Night scene */}
      <div className="relative overflow-hidden rounded-3xl" style={{ height: 420, background: 'linear-gradient(175deg,#04080a 0%,#060e0b 50%,#050c08 100%)' }}>

        {/* Stars */}
        {stars.map((s, i) => (
          <motion.div key={`star-${i}`} className="absolute rounded-full bg-white pointer-events-none"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            animate={isInView ? { opacity: [0.15, 1, 0.15] } : { opacity: 0.15 }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
          />
        ))}

        {/* Window + moon — top right */}
        <div className="absolute pointer-events-none" style={{ right: 20, top: 14, width: 58, height: 68, border: '1.5px solid rgba(160,190,255,0.2)', borderRadius: 6, background: 'rgba(100,130,200,0.05)' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(160,190,255,0.14)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(160,190,255,0.14)' }} />
          <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 26, height: 26, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#fffde7 55%,#ffe082 100%)', boxShadow: '0 0 26px 10px rgba(255,230,100,0.32)' }} />
        </div>
        {/* Moonlight cone */}
        <div className="absolute pointer-events-none" style={{ right: 18, top: 82, width: 100, height: 200, background: 'linear-gradient(180deg,rgba(160,190,255,0.07) 0%,transparent 100%)', clipPath: 'polygon(10% 0%,90% 0%,120% 100%,-20% 100%)' }} />

        {/* Warm amber night-light on right wall */}
        <div className="absolute pointer-events-none" style={{ right: '26%', top: '37%', width: 10, height: 10, borderRadius: '50%', background: '#ffdb6a', boxShadow: '0 0 32px 18px rgba(255,195,70,0.22),0 0 70px 35px rgba(255,175,50,0.09)' }} />

        {/* Floor line */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ bottom: 122, height: 1, background: 'rgba(74,124,111,0.14)' }} />
        {/* Floor warm glow */}
        <div className="absolute pointer-events-none" style={{ right: '8%', bottom: 120, width: '32%', height: 42, background: 'radial-gradient(ellipse at 70% 0%,rgba(255,195,70,0.09) 0%,transparent 75%)' }} />

        {/* ── LEFT: Pod on shelf ── */}
        <div className="absolute pointer-events-none" style={{ left: '7%', bottom: 128 }}>
          {/* Radar rings */}
          {[80, 155, 230, 305].map((diam, i) => (
            <motion.div key={`radar-${i}`} className="absolute rounded-full border pointer-events-none"
              style={{ width: diam, height: diam, left: 30 - diam / 2, top: 38 - diam / 2, borderColor: `rgba(74,124,111,${0.58 - i * 0.1})` }}
              initial={{ scale: 0.45, opacity: 0 }}
              animate={isInView ? { scale: [0.45, 1.5], opacity: [0, 0.65, 0] } : { scale: 0.45, opacity: 0 }}
              transition={{ duration: 2.8, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          {/* Signal beam to crib */}
          <motion.div className="absolute pointer-events-none"
            style={{ left: 62, top: 37, width: 220, height: 1, background: 'linear-gradient(90deg,rgba(74,124,111,0.55),rgba(74,124,111,0.12),rgba(232,149,122,0.35))', transformOrigin: 'left center' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: 'easeOut' }}
          />
          {/* Pod body */}
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }} transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center gap-1.5"
            style={{ width: 60, height: 76, borderRadius: 20, background: 'linear-gradient(160deg,#2d5c50,#1a2e27)', border: '1.5px solid rgba(74,124,111,0.6)', boxShadow: '0 0 40px rgba(74,124,111,0.32),inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 10, background: 'rgba(74,124,111,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity className="w-3.5 h-3.5 text-[#7aab9e]" />
            </div>
            <motion.div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4a7c6f', boxShadow: '0 0 8px rgba(74,124,111,0.9)' }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span style={{ fontSize: 6, fontWeight: 900, letterSpacing: '0.14em', color: '#4a7c6f' }}>ANVAYA</span>
          </motion.div>
          {/* Shelf */}
          <div style={{ width: 82, height: 7, marginTop: 4, borderRadius: 3, background: 'rgba(74,124,111,0.28)', marginLeft: -11 }} />
          <div style={{ position: 'absolute', left: 25, bottom: -20, width: 4, height: 20, borderRadius: 2, background: 'rgba(74,124,111,0.16)' }} />
        </div>

        {/* ── RIGHT: Crib with baby ── */}
        <div className="absolute pointer-events-none" style={{ right: '5%', bottom: 122 }}>
          {/* Warm IR heat glow */}
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: 140, height: 110, left: -25, top: 2, background: 'radial-gradient(ellipse,rgba(232,149,122,0.36) 0%,rgba(212,120,74,0) 80%)', filter: 'blur(9px)' }}
            animate={isInView ? { opacity: [0.4, 0.95, 0.4], scale: [0.93, 1.1, 0.93] } : { opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Rotating exclusion zone ring */}
          <motion.div className="absolute rounded-full pointer-events-none"
            style={{ width: 150, height: 150, left: -30, top: -22, border: '1.5px dashed rgba(74,124,111,0.48)' }}
            animate={isInView ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />

          {/* Crib — warm wood tones */}
          <div className="relative" style={{ width: 92, height: 102 }}>
            {/* Headboard */}
            <div style={{ position: 'absolute', top: 0, left: 4, right: 4, height: 16, borderRadius: '8px 8px 0 0', background: 'rgba(200,155,100,0.48)', border: '1px solid rgba(220,175,120,0.6)' }} />
            {/* Side rails */}
            <div style={{ position: 'absolute', top: 16, left: 0, width: 5, height: 70, borderRadius: '0 0 0 4px', background: 'rgba(200,155,100,0.42)', border: '1px solid rgba(220,175,120,0.5)' }} />
            <div style={{ position: 'absolute', top: 16, right: 0, width: 5, height: 70, borderRadius: '0 0 4px 0', background: 'rgba(200,155,100,0.42)', border: '1px solid rgba(220,175,120,0.5)' }} />
            {/* Mattress */}
            <div style={{ position: 'absolute', bottom: 0, left: 5, right: 5, height: 10, borderRadius: '0 0 4px 4px', background: 'rgba(240,235,225,0.1)' }} />
            {/* Bars */}
            {[15, 27, 39, 51, 63, 75].map((lp, idx) => (
              <div key={idx} style={{ position: 'absolute', top: 16, left: lp, width: 3, height: 68, borderRadius: 1.5, background: 'rgba(200,155,100,0.35)', border: '1px solid rgba(220,175,120,0.38)' }} />
            ))}
            {/* Baby */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)' }}>
              <BabySVG />
            </div>
          </div>
          {/* Crib legs */}
          <div style={{ display: 'flex', gap: 60 }}>
            {[0, 1].map(i => <div key={i} style={{ width: 5, height: 16, borderRadius: 2, background: 'rgba(200,155,100,0.32)' }} />)}
          </div>

          {/* ZZZ */}
          {['z', 'z', 'Z'].map((z, i) => (
            <motion.div key={`z-${i}`} className="absolute font-bold pointer-events-none"
              style={{ left: 44 + i * 11, top: 4 - i * 13, fontSize: 9 + i * 3, color: '#7aab9e', opacity: 0 }}
              animate={isInView ? { y: [-4, -30 - i * 12], opacity: [0, 0.85, 0] } : { opacity: 0 }}
              transition={{ duration: 2.4, delay: i * 0.75, repeat: Infinity, ease: 'easeOut' }}
            >{z}</motion.div>
          ))}

          {/* Nothing touches baby badge */}
          <motion.div className="absolute pointer-events-none" style={{ right: -2, top: -42, whiteSpace: 'nowrap' }}
            initial={{ opacity: 0, y: 6 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ fontSize: 9, fontWeight: 700, background: 'rgba(74,124,111,0.22)', border: '1px solid rgba(74,124,111,0.45)', color: '#7aab9e' }}>
              <CheckCircle className="w-2.5 h-2.5 shrink-0" />
              Nothing touches baby
            </div>
          </motion.div>
        </div>

        {/* LIVE vitals card */}
        <motion.div className="absolute pointer-events-none" style={{ left: '50%', top: 18, transform: 'translateX(-50%)' }}
          initial={{ opacity: 0, y: -8 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.55, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap"
            style={{ fontSize: 10, fontWeight: 700, background: 'rgba(6,18,12,0.9)', border: '1px solid rgba(74,124,111,0.52)', color: '#7aab9e', backdropFilter: 'blur(12px)', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            <motion.div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4a7c6f', boxShadow: '0 0 7px rgba(74,124,111,0.9)' }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <span style={{ color: '#e8957a', fontWeight: 900, letterSpacing: '0.06em' }}>LIVE</span>
            <span style={{ color: 'rgba(122,171,158,0.9)' }}>28 br/min · SpO₂ 98% · 36.5°C</span>
          </div>
        </motion.div>
      </div>

      {/* Safety chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {[
          { text: '✓ Nothing touches baby', delay: 0.2 },
          { text: '✓ 1/1000th of Wi-Fi power', delay: 0.45 },
          { text: '✓ All AI runs on-device · zero data shared', delay: 0.7 },
        ].map((chip, i) => (
          <motion.div key={`chip-${i}`} className="px-3 py-1 rounded-full"
            style={{ fontSize: 11, fontWeight: 600, background: 'rgba(74,124,111,0.1)', border: '1px solid rgba(74,124,111,0.28)', color: '#4a7c6f' }}
            initial={{ opacity: 0, y: 8 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.45, delay: chip.delay }}
          >{chip.text}</motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── FAQ ─────────────────── */
const HOME_FAQS = [
  { q: 'What is Anvaya Smart baby wellness pod?', a: 'Anvaya Smart is India\'s most advanced AI baby wellness pod. It monitors your baby\'s breathing, SpO₂, cry patterns, heart rate, temperature, and sleep — contactlessly, without anything on your baby\'s skin. It uses low-power radar, infrared sensing, and AI acoustic analysis to watch over your baby 24/7.' },
  { q: 'Is the Anvaya baby monitor safe for newborns?', a: 'Yes. Anvaya Smart is completely contactless — nothing is attached to your baby. The radar sensing uses power levels thousands of times lower than a Wi-Fi router. It is safe for premature babies and newborns from day one.' },
  { q: 'How does contactless baby breathing monitoring work?', a: 'Anvaya uses low-power radar to detect the micro-movements of your baby\'s chest caused by breathing — from up to 90cm away. No wearable, no skin contact. The AI identifies breathing rate, pattern, and alerts you if anything deviates from your baby\'s personal baseline.' },
  { q: 'What is the price of Anvaya baby wellness pod in India?', a: 'Anvaya Smart is available in four models: CORE (₹8,999), SENSE (₹12,999), PULSE (₹15,999), and OMNI (₹19,999). Early access pricing includes ₹2,000 off, free shipping across India, and a 30-day money-back guarantee.' },
  { q: 'Does Anvaya work without Wi-Fi?', a: 'Anvaya processes all data on-device. Core monitoring functions (breathing detection, cry alerts, temperature) work without Wi-Fi. Wi-Fi is required for live video streaming and app sync.' },
  { q: 'What is the difference between Anvaya CORE, SENSE, PULSE, and OMNI?', a: 'CORE covers HD video, cry detection, lullabies, and temperature. SENSE adds contactless breathing, SpO₂, heart rate, and air quality monitoring. PULSE adds activity tracking, real-time alerts, and humidity sensing. OMNI includes predictive AI, 360° coverage, health reports, and all SENSE+ features.' },
  { q: 'Is Anvaya Smart available across India?', a: 'Yes. Anvaya Smart ships free across India. EMI is available at 0% through major cards and UPI platforms. Our team is based in Hyderabad with pan-India customer support in English, Hindi, and Telugu.' },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-14 lg:py-24 bg-white">
      <FAQSchema faqs={HOME_FAQS.map(f => ({ q: f.q, a: f.a }))} />
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3" style={{ color: '#e8957a' }}>Common Questions</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything parents ask about<br />Anvaya baby wellness monitoring</h2>
          <p className="text-muted-foreground">Answers to the most common questions from Indian parents about contactless baby monitoring.</p>
        </div>
        <div className="space-y-3">
          {HOME_FAQS.map((faq, i) => (
            <div key={i} className="border border-[#e2dbd4] rounded-2xl overflow-hidden bg-[#faf8f5]">
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-sm hover:bg-[#f2ece0] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-[#e2dbd4] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/contact" className="text-sm font-semibold text-primary hover:underline">
            Have more questions? Contact us →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function Home() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, source: 'homepage', product: 'Anvaya Smart' }),
      });
    } catch (_) { }
    setLoading(false); setSubmitted(true);
    toast({ title: "You're on the list!", description: "We'll WhatsApp you within 24 hours." });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden mesh-hero">
        {/* Ambient glow orbs — warm coral/amber, no green */}
        <div className="glow-orb w-[560px] h-[560px] -left-40 -top-20" style={{ background: 'rgba(232,149,122,0.18)', animationDelay: '0s' }} />
        <div className="glow-orb w-[440px] h-[440px] -right-20 top-10" style={{ background: 'rgba(245,185,140,0.14)', animationDelay: '3s' }} />
        <div className="glow-orb w-[340px] h-[340px] left-1/2 bottom-0" style={{ background: 'rgba(212,120,74,0.10)', animationDelay: '6s' }} />
        {/* Subtle dot grid — warm neutral */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(180,140,110,0.12) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        {/* Subtle grain */}
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />
        {/* Decorative rings — warm tone */}
        <div className="absolute -right-40 -top-40 w-[640px] h-[640px] rounded-full border pointer-events-none" style={{ borderColor: 'rgba(212,120,74,0.10)' }} />
        <div className="absolute -right-20 -top-20 w-[440px] h-[440px] rounded-full border pointer-events-none" style={{ borderColor: 'rgba(212,120,74,0.07)' }} />
        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/40">Scroll</span>
          <ChevronDown className="w-4 h-4 text-primary/35" />
        </motion.div>

        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8 xl:gap-14 items-center">

            {/* LEFT copy */}
            <div ref={heroRef}>
              {/* Live family counter badge */}
              <div className="flex flex-wrap gap-3 mb-7">
                <div className="inline-flex items-center gap-2 bg-white/85 border border-primary/20 rounded-full px-4 py-1.5 text-xs text-primary font-bold shadow-sm animate-fade-up backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 animate-spin-slow" />
                  Early Access Open — Founding 100 families get exclusive pricing
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold tracking-tight leading-[1.05] mb-5 animate-fade-up delay-1">
                Your Baby Breathes.<br />
                <span style={{
                  background: 'linear-gradient(120deg, #2d5c52 0%, #4a7c6f 30%, #7aab9e 50%, #e8957a 70%, #4a7c6f 90%, #2d5c52 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer-sweep 4s linear infinite',
                }}>You Sleep.</span>
              </h1>

              {/* Star rating social proof */}
              <div className="flex items-center gap-3 mb-4 animate-fade-up delay-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 star-filled fill-amber-400" />)}
                </div>
                <span className="text-sm font-bold text-foreground">4.9/5</span>
                <span className="text-sm text-muted-foreground">· Loved by our pilot families</span>
                <span className="hidden sm:inline text-sm text-muted-foreground">· Paediatrician-recommended</span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg animate-fade-up delay-3">
                Contactless AI monitoring — breathing, SpO₂, cry type and sleep quality. Nothing on baby&apos;s skin. Nothing missed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-7 animate-fade-up delay-4">
                <LeadModalTrigger source="homepage-hero" product="Anvaya Smart">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-7 py-6 rounded-xl cursor-pointer text-white font-bold"
                    style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 6px 28px rgba(232,149,122,0.50)', transition: 'box-shadow .2s ease, transform .2s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 36px rgba(232,149,122,0.65)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(232,149,122,0.50)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                  >
                    <Sparkles className="w-4 h-4" />Join the Founding 100 Families <ArrowRight className="w-4 h-4" />
                  </Button>
                </LeadModalTrigger>
                <Link href="/cry-analyzer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-7 py-3.5 rounded-xl font-bold text-white select-none"
                  style={{ background: 'linear-gradient(135deg,#2d6b5e,#4a7c6f)', boxShadow: '0 6px 24px rgba(74,124,111,0.40)', transition: 'box-shadow .2s ease, transform .2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(74,124,111,0.55)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(74,124,111,0.40)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >🧠 Try AI Cry Analyzer — Free <ArrowRight className="w-4 h-4" /></Link>
              </div>
              {/* Trust pills */}
              <div className="flex flex-wrap items-center gap-2 animate-fade-up delay-5">
                {[
                  { icon: Shield, text: 'No payment now' },
                  { icon: CheckCircle, text: '30-day guarantee' },
                  { icon: Zap, text: 'Free shipping across India' },
                ].map(({ icon: Icon, text }, i) => (
                  <span key={text} className="trust-pill" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                    <Icon className="w-3 h-3 shrink-0" />{text}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — product + live monitor */}
            <div className="hidden md:flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute inset-[-24px] rounded-[48px] border border-primary/10 pointer-events-none" />
                <div className="absolute inset-[-48px] rounded-[64px] border border-primary/5 pointer-events-none" />
                <div className="relative w-80 rounded-3xl overflow-hidden shadow-2xl animate-float border-4 border-white/60" style={{ aspectRatio: '4/3' }}>
                  <Image src="/anvaya-nursery.jpg" alt="Anvaya Smart baby wellness pod in nursery — AI-powered contactless breathing and cry monitoring India" fill className="object-cover object-center" priority sizes="320px" />
                  <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs font-bold text-[#172720]">Designed for Every Nursery</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">On table · On wall · On cradle</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 glass rounded-2xl px-3 py-2.5 shadow-xl z-10 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 star-filled fill-amber-400" />)}
                  </div>
                  <div className="text-xs font-bold">Pediatrician-approved</div>
                </div>
              </div>
              <div className="animate-fade-up delay-4 w-full flex justify-center">
                <LiveMonitorWidget />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section className="border-y border-border bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: 6, suffix: '+', label: 'Vital Signs Tracked', sub: 'Breathing, SpO₂, cry, sleep, temp & heart rate' },
              { n: 0, suffix: '', label: 'Zero Contact', sub: 'Nothing on baby\'s skin. Ever.' },
              { n: 100, suffix: '%', label: 'On-Device Privacy', sub: 'No health data ever leaves your home' },
              { n: 24, suffix: '/7', label: 'Silent Watch', sub: 'Continuous. Non-invasive. Always on.' },
            ].map((s, i) => (
              <Reveal key={s.label} variant={scaleIn} custom={i}>
                <div className="group cursor-default">
                  <div className="text-4xl font-bold text-primary mb-1 tabular-nums transition-transform group-hover:scale-110 duration-300">
                    <AnimatedNumber target={s.n} suffix={s.suffix} />
                  </div>
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section className="py-14 lg:py-14 lg:py-24 bg-[#faf8f5] overflow-hidden">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">How It Works</p>
              <h2 className="text-4xl font-bold mb-3">Setup in 2 minutes. Peace of mind forever.</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">No wearables. No wires on baby. Just place Anvaya in the nursery and it starts watching.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector line desktop */}
            <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
            {[
              { step: '01', icon: Wifi, title: 'Place & Connect', desc: 'Set Anvaya on a shelf, table, or wall bracket — point it at your baby. Connect to your home Wi-Fi in the app. Done.' },
              { step: '02', icon: Activity, title: 'AI Starts Watching', desc: 'Anvaya\'s sensors begin tracking breathing, SpO₂, temperature, sound and movement. Instantly. Contactlessly.' },
              { step: '03', icon: Bell, title: 'You Sleep. Anvaya Watches', desc: 'Get real-time alerts only when needed. See live vitals, cry analysis, and a full daily timeline — all in the app.' },
            ].map((s, i) => (
              <Reveal key={s.step} variant={fadeUp} custom={i} className="relative">
                <div className="bg-white rounded-2xl p-7 border border-border shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">{s.step}</div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ SENSOR VISUALIZATION ════════════ */}
      <section className="py-14 lg:py-24 bg-[#0a1a14] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,124,111,0.12) 0%, transparent 70%)' }} />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-14">
            <motion.p
              className="text-xs font-bold uppercase tracking-widest text-[#7aab9e] mb-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              The Technology
            </motion.p>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug"
              style={{ backgroundColor: 'transparent' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              What Anvaya sees —<br />
              <span style={{ color: '#7aab9e' }}>without touching your baby.</span>
            </motion.h2>
            <motion.p
              className="text-[#7aab9e]/80 max-w-md mx-auto text-base"
              style={{ backgroundColor: 'transparent' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              Two invisible technologies work together to give you a complete picture of your baby&apos;s health every night.
            </motion.p>
          </div>

          {/* Animated visualization */}
          <div className="flex justify-center">
            <SensorViz />
          </div>

          {/* 3 tech cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14 max-w-3xl mx-auto">
            {[
              {
                color: '#4a7c6f',
                title: 'Low-Power Radar',
                desc: 'Detects micro-chest movements caused by breathing — from up to 90 cm. Power level: 1/1000th of your Wi-Fi router.',
              },
              {
                color: '#e8957a',
                title: 'Infrared Sensing',
                desc: "Detects body heat to confirm your baby's presence, position, and surface temperature — without any skin contact.",
              },
              {
                color: '#7aab9e',
                title: 'On-Device AI',
                desc: 'Processes every signal locally on the pod. No health data ever leaves your home. Alerts only when something is truly off.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-2xl p-5 border"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: `${card.color}33` }}
              >
                <div className="w-2 h-2 rounded-full mb-3" style={{ background: card.color }} />
                <div className="font-bold text-white text-sm mb-1.5">{card.title}</div>
                <div className="text-[#7aab9e]/70 text-xs leading-relaxed">{card.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 1 — SLEEP ANALYSIS ════════════ */}
      <section className="py-16 lg:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Reveal variant={fadeLeft} className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-br from-primary/8 to-transparent blur-2xl" />
                <PhoneMockup src="/app-trends.jpg" alt="Anvaya Smart app — Sleep & Health Trends showing heart rate, temperature and SpO2" className="animate-float-slow relative z-10" objectPosition="top" />
                <div className="absolute -right-8 top-16 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float hidden sm:block" style={{ animationDelay: '1s' }}>
                  <div className="text-xs text-muted-foreground font-medium mb-1">Sleep Score</div>
                  <div className="text-3xl font-bold text-primary leading-none">85</div>
                  <div className="text-xs font-semibold text-green-600 mt-1">Excellent 🌙</div>
                </div>
                <div className="absolute -left-6 bottom-24 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float hidden sm:block" style={{ animationDelay: '2s' }}>
                  <div className="text-[10px] text-muted-foreground">Avg Heart Rate</div>
                  <div className="text-xl font-bold text-[#e8957a]">121 BPM</div>
                  <div className="text-[10px] text-green-600 font-semibold">Normal range ✓</div>
                </div>
              </div>
            </Reveal>
            <Reveal variant={fadeRight}>
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Sleep & Wellness Analysis</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Know if your baby<br />slept safely —<br />
                <span className="text-gradient">not just soundly.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Anvaya&apos;s wellness pod tracks heart rate, SpO₂, and temperature every night — building a complete picture of your baby&apos;s sleep health across days and weeks. Not just tonight. Always.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: Moon, title: 'Deep sleep detection', desc: 'Know when your baby enters and exits each sleep cycle.' },
                  { icon: Heart, title: 'Heart rate trends', desc: 'Weekly averages, highs and lows — all tracked automatically.' },
                  { icon: Activity, title: 'SpO2 monitoring', desc: 'Blood oxygen tracked contactlessly. Alerts when it matters.' },
                ].map((f, i) => (
                  <motion.div key={f.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="text-primary" style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{f.title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <LeadModalTrigger source="homepage-feature-sleep" product="Anvaya Smart">
                <Button className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6 cursor-pointer">
                  Reserve Anvaya Smart <ArrowRight className="w-4 h-4" />
                </Button>
              </LeadModalTrigger>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 2 — CRY ANALYSIS ════════════ */}
      <section className="py-16 lg:py-28 bg-[#0a1a14] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(74,124,111,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 75% 50%, rgba(232,149,122,0.08) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(74,124,111,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Reveal variant={fadeLeft} className="lg:order-1 order-2">
              <div className="section-divider" style={{ borderColor: 'rgba(74,124,111,0.3)' }} />
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#e8957a' }}>Cry Intelligence</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white" style={{ backgroundColor: 'transparent' }}>
                Stop guessing.<br />Know what your<br />
                <span style={{ color: '#e8957a' }}>baby needs — instantly.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(122,171,158,0.85)' }}>
                Hungry? Tired? Uncomfortable? Anvaya&apos;s AI identifies 5 cry types in real time — so you respond with confidence, not panic. Even at 3am. Even half asleep.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { emoji: '🍼', title: 'Hungry cry', desc: 'Rhythmic and repetitive. Anvaya flags it before it escalates.' },
                  { emoji: '😴', title: 'Tired cry', desc: 'Whiny and intermittent. Know when to soothe vs. wait.' },
                  { emoji: '😣', title: 'Discomfort cry', desc: 'High-pitched and continuous. Alerts you immediately.' },
                ].map((f, i) => (
                  <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 rounded-xl p-4 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(74,124,111,0.25)' }}>
                    <span className="text-2xl shrink-0">{f.emoji}</span>
                    <div>
                      <div className="font-bold text-sm mb-0.5 text-white">{f.title}</div>
                      <div className="text-sm" style={{ color: 'rgba(122,171,158,0.75)' }}>{f.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/cry-analyzer">
                  <button className="relative overflow-hidden font-bold text-white rounded-2xl flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm transition-all duration-150 select-none"
                    style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 6px 24px rgba(232,149,122,0.45)' }}>
                    🧠 Try AI Cry Analyzer — Free <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <LeadModalTrigger source="homepage-feature-cry" product="Anvaya Smart">
                  <Button variant="outline" className="rounded-2xl px-6 font-semibold cursor-pointer"
                    style={{ borderColor: 'rgba(74,124,111,0.4)', color: '#7aab9e', background: 'transparent' }}>
                    Get Early Access
                  </Button>
                </LeadModalTrigger>
              </div>
            </Reveal>
            <Reveal variant={fadeRight} className="lg:order-2 order-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] blur-2xl" style={{ background: 'radial-gradient(ellipse, rgba(232,149,122,0.18) 0%, transparent 70%)' }} />
                <PhoneMockup src="/app-live.jpg" alt="Anvaya app — live cry detection, breathing monitoring and decibel meter" className="animate-float-slow relative z-10" objectPosition="top" />
                <div className="absolute -left-8 top-20 rounded-2xl px-4 py-3 shadow-xl z-20 animate-float hidden sm:block"
                  style={{ background: 'rgba(6,18,12,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(74,124,111,0.4)' }}>
                  <div className="text-[10px] font-medium" style={{ color: 'rgba(122,171,158,0.7)' }}>Cry detected</div>
                  <div className="text-sm font-bold mt-0.5" style={{ color: '#e8957a' }}>Hungry cry 🍼</div>
                  <div className="text-[10px] mt-1" style={{ color: 'rgba(122,171,158,0.6)' }}>Last fed: 2h 45m ago</div>
                </div>
                <div className="absolute -right-6 bottom-32 rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float hidden sm:block"
                  style={{ background: 'rgba(6,18,12,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(74,124,111,0.35)', animationDelay: '1.5s' }}>
                  <div className="text-[10px]" style={{ color: 'rgba(122,171,158,0.7)' }}>Noise level</div>
                  <div className="text-xl font-bold" style={{ color: '#4a7c6f' }}>25 dB</div>
                  <div className="text-[10px] font-semibold" style={{ color: '#4ade80' }}>Quiet room ✓</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 3 — DAILY TIMELINE ════════════ */}
      <section className="py-16 lg:py-28 bg-[#faf8f5] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Reveal variant={fadeLeft} className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-br from-slate-200/60 to-transparent blur-2xl" />
                <PhoneMockup src="/app-timeline.jpg" alt="Anvaya app — daily timeline showing sleeping, feeding and wake-up events" className="animate-float-slow relative z-10" objectPosition="top" />
                <div className="absolute -right-8 top-12 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float hidden sm:block">
                  <div className="text-[10px] text-muted-foreground">10:30 AM</div>
                  <div className="text-sm font-bold text-primary mt-0.5">Sleeping 😴</div>
                  <div className="text-[10px] text-muted-foreground">Deep sleep cycle</div>
                </div>
                <div className="absolute -left-6 bottom-28 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float hidden sm:block" style={{ animationDelay: '2s' }}>
                  <div className="text-[10px] text-muted-foreground">AI Insight</div>
                  <div className="text-sm font-bold text-[#4a7c6f]">3 new updates ✨</div>
                </div>
              </div>
            </Reveal>
            <Reveal variant={fadeRight}>
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Daily Timeline</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Every moment,<br />captured and<br />
                <span className="text-gradient">understood.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From the first wake-up to the last sleep cycle — Anvaya builds a complete picture of your baby&apos;s day. Sleep patterns, feeding, activity, moods — all in one timeline.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  { time: '10:30 AM', event: 'Sleeping', detail: 'Detected deep sleep cycle', dot: '#4a7c6f' },
                  { time: '08:15 AM', event: 'Feeding 🍼', detail: 'Bottle, 150ml', dot: '#e8957a' },
                  { time: '07:00 AM', event: 'Woke Up ☀️', detail: 'Good mood detected', dot: '#f59e0b' },
                ].map((t, i) => (
                  <motion.div key={t.time} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex items-start gap-4 bg-white/80 rounded-xl p-4 border border-white/60 shadow-sm">
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: t.dot }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{t.event}</span>
                        <span className="text-xs text-muted-foreground">{t.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <LeadModalTrigger source="homepage-feature-timeline" product="Anvaya Smart">
                <Button className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6 cursor-pointer">
                  Reserve Your Anvaya <ArrowRight className="w-4 h-4" />
                </Button>
              </LeadModalTrigger>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 4 — LIVE + VIDEO ════════════ */}
      <section className="py-16 lg:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Reveal variant={fadeLeft} className="lg:order-1 order-2">
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Live Monitoring</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                See your baby live.<br />Speak to them.<br />
                <span className="text-gradient">From anywhere.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                One tap. Your baby appears on screen. Live. Two-way audio so your voice reaches them instantly. Lullabies, white noise, or your favourite song — all from your phone, wherever you are.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { icon: Camera, title: 'HD Video call', desc: 'See and speak to your baby live' },
                  { icon: Music, title: 'Remote lullabies', desc: 'Play music from anywhere' },
                  { icon: Bell, title: 'Instant alerts', desc: 'Motion, cry, or unusual sound' },
                  { icon: Heart, title: 'Capture moments', desc: 'Auto-save precious memories' },
                ].map((f, i) => (
                  <motion.div key={f.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="bg-[#faf8f5] rounded-xl p-4 border border-[#e8ddd4] card-hover cursor-default">
                    <f.icon className="w-5 h-5 text-primary mb-2" />
                    <div className="font-bold text-sm mb-0.5">{f.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                  </motion.div>
                ))}
              </div>
              <LeadModalTrigger source="homepage-feature-live" product="Anvaya Smart">
                <Button className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6 cursor-pointer">
                  Get Early Access <ArrowRight className="w-4 h-4" />
                </Button>
              </LeadModalTrigger>
            </Reveal>
            <Reveal variant={fadeRight} className="lg:order-2 order-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-bl from-primary/8 to-transparent blur-2xl" />
                <PhoneMockup src="/app-home.jpg" alt="Anvaya app — live monitoring dashboard with temperature, humidity and video stream" className="animate-float-slow relative z-10" />
                <div className="absolute -left-10 top-16 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="live-dot" />
                    <span className="text-xs font-bold text-green-600">Live Stream</span>
                  </div>
                  <div className="text-sm font-bold">Aradhya · 1 month</div>
                  <div className="text-[10px] text-muted-foreground">Awake and calm 😊</div>
                </div>
                <div className="absolute -right-8 bottom-24 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float hidden sm:block" style={{ animationDelay: '1.2s' }}>
                  <div className="text-[10px] text-muted-foreground">Room</div>
                  <div className="text-lg font-bold text-primary">26°C · 55%</div>
                  <div className="text-[10px] text-green-600 font-semibold">Perfect ✓</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ PRODUCT LINEUP ════════════ */}
      <section className="py-14 lg:py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Our Products</p>
              <h2 className="text-4xl font-bold mb-3">Four baby wellness pods. One promise.</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every model is contactless, on-device private, and safe for newborns. Pick the level of intelligence that&apos;s right for your family.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'CORE', tagline: 'Simple. Smart. Reliable.', bg: 'from-amber-50 to-orange-50', border: '#f0d9a0', color: '#d97706', features: ['HD Video', 'Cry Detection', 'Lullabies', 'Temperature'] },
              { name: 'SENSE', tagline: 'Understand more than sound.', bg: 'from-[#e8f2ee] to-[#f5ede0]', border: '#a7d9c8', color: '#4a7c6f', features: ['Breathing & SpO2', 'Heart Rate', 'Cry Analysis', 'Air Quality'], popular: true },
              { name: 'PULSE', tagline: 'Stay connected always.', bg: 'from-blue-50 to-sky-50', border: '#bfdbfe', color: '#3b82f6', features: ['Activity Tracking', 'Temp & Humidity', 'Safety Alerts', 'Real-Time Alerts'] },
              { name: 'OMNI', tagline: 'Total awareness.', bg: '', border: '#2d4a3e', color: '#fbbf24', features: ['Predictive AI', '360° Coverage', 'Health Reports', 'All SENSE+'], dark: true },
            ].map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 0.68, 0, 1.2] }}>
              <Link href={`/anvaya#${p.name.toLowerCase()}`}
                className={`card-hover group block rounded-2xl border p-6 relative overflow-hidden h-full ${p.dark ? 'bg-[#172720]' : `bg-gradient-to-br ${p.bg}`}`}
                style={{ borderColor: p.border }}>
                {p.popular && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Best Seller</div>
                )}
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50" style={{ color: p.dark ? '#fbbf24' : p.color }}>Anvaya</div>
                <h3 className={`text-2xl font-bold mb-1 ${p.dark ? 'text-white' : ''}`}>{p.name}</h3>
                <p className="text-xs font-semibold mb-4 leading-relaxed" style={{ color: p.color }}>{p.tagline}</p>
                <ul className="space-y-1.5 mb-5">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-xs ${p.dark ? 'text-gray-300' : 'text-muted-foreground'}`}>
                      <CheckCircle className="w-3 h-3 shrink-0" style={{ color: p.color }} />{f}
                    </li>
                  ))}
                </ul>
                <div className={`text-xs font-semibold mt-3 ${p.dark ? 'text-yellow-300/70' : 'text-muted-foreground'}`}>Founding price — revealed on sign-up</div>
                <div className={`mt-2 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all ${p.dark ? 'text-yellow-400' : 'text-primary'}`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section className="py-14 lg:py-24 bg-gradient-to-b from-white to-[#faf8f5] overflow-hidden">
        <div className="container mx-auto px-4">
          <Reveal variant={fadeUp}>
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Parent Stories</p>
            <h2 className="text-4xl font-bold mb-3">What our pilot families are saying.</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 star-filled fill-amber-400" />)}
              <span className="text-lg font-bold ml-1">4.9/5</span>
              <span className="text-muted-foreground text-sm">· Pilot family feedback</span>
            </div>
          </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Priya Sharma',
                location: 'Bangalore',
                role: 'Mother of 3-month-old',
                text: "Anvaya caught a breathing dip at 2am that I would have completely missed. The alert woke me up before it became anything serious. I genuinely don't know how I parented without this.",
                rating: 5,
                avatar: '👩🏽',
              },
              {
                name: 'Rajesh & Meera',
                location: 'Mumbai',
                role: 'First-time parents',
                text: "We were so anxious bringing our baby home. Anvaya changed that completely. Seeing her breathing live on the app the first night was the most reassuring thing we've ever experienced.",
                rating: 5,
                avatar: '👨🏽‍👩🏽',
                featured: true,
              },
              {
                name: 'Dr. Kavitha Nair',
                location: 'Chennai',
                role: 'Paediatrician · MBBS',
                text: "As a paediatrician, I recommend Anvaya to parents who need reassurance. The contactless monitoring approach is exactly right — nothing on the baby's skin, accurate vitals, no false alarms.",
                rating: 5,
                avatar: '👩🏾‍⚕️',
              },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 0.68, 0, 1.2] }} className={`testimonial-card p-6 relative ${t.featured ? 'ring-2 ring-primary/30' : ''}`}>
                {t.featured && (
                  <div className="absolute -top-3 left-6 bg-primary text-white text-[10px] font-bold px-3 py-0.5 rounded-full">Most Helpful</div>
                )}
                <Quote className="w-7 h-7 text-primary/20 mb-3" />
                <p className="text-sm leading-relaxed text-foreground mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 star-filled fill-amber-400" />)}
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TRUST BAR ════════════ */}
      <section className="py-12 bg-white border-y border-border overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { icon: Shield, label: 'Safe AI Monitoring' },
              { icon: Moon, label: 'Healthy Sleep Support' },
              { icon: Zap, label: 'Instant Alerts' },
              { icon: Lock, label: 'On-Device Privacy' },
              { icon: Heart, label: 'Paediatrician-approved' },
              { icon: CheckCircle, label: '30-Day Guarantee' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="trust-pill">
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />{label}
              </div>
            ))}
          </div>
          {/* Scrolling marquee of trust stats */}
          <div className="relative overflow-hidden">
            <div className="flex gap-16 animate-marquee whitespace-nowrap">
              {[
                '🏆 India\'s #1 Baby Wellness Pod',
                '⭐ 4.9/5 from pilot families',
                '🩺 Recommended by Paediatricians',
                '🔒 Zero health data leaves your home',
                '🚀 Ships free across India',
                '💰 0% EMI available',
                '🛡️ 30-day money-back guarantee',
                '👶 Safe for newborns from day 1',
                '🏆 India\'s #1 Baby Wellness Pod',
                '⭐ 4.9/5 from pilot families',
                '🩺 Recommended by Paediatricians',
                '🔒 Zero health data leaves your home',
                '🚀 Ships free across India',
                '💰 0% EMI available',
                '🛡️ 30-day money-back guarantee',
                '👶 Safe for newborns from day 1',
              ].map((item, i) => (
                <span key={i} className="text-sm font-semibold text-muted-foreground shrink-0">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FAQ ════════════ */}
      <FAQSection />

      {/* ════════════ LEAD CAPTURE ════════════ */}
      <section className="py-16 lg:py-28 bg-[#faf8f5] relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none opacity-40" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-1.5 mb-7 text-xs text-primary font-bold shadow-sm">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              47 of 100 early access spots remaining
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Be among the<br />
              <span className="text-gradient">first 100 families.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">Founding families get exclusive pricing, priority shipping, and a free 1-year premium app subscription — revealed over WhatsApp.</p>
            {submitted ? (
              <div className="glass rounded-2xl p-10 shadow-xl border-white/70 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-xl font-bold text-primary">You're on the list!</p>
                <p className="text-muted-foreground mt-2">We'll WhatsApp you within 24 hours.</p>
              </div>
            ) : (
              <div className="glass rounded-2xl p-7 shadow-xl border-white/70">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-3">
                  <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required className="flex-1 bg-white/90 border-primary/20 h-12 text-base rounded-xl" />
                  <Input placeholder="WhatsApp number" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required className="flex-1 bg-white/90 border-primary/20 h-12 text-base rounded-xl" />
                  <Button type="submit" disabled={loading} className="bg-primary text-white hover:bg-primary/90 h-12 px-7 text-base rounded-xl shrink-0 shadow-lg shadow-primary/25">
                    {loading ? 'Saving...' : 'Claim Spot'}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">No payment now · Free shipping · 30-day money-back guarantee · EMI available</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ════════════ CONTENT HUB ════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:'#e8957a'}}>Knowledge Centre</p>
            <h2 className="text-3xl font-bold">Everything you need to know.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { title: 'Baby Monitoring Guide', desc: 'Complete guide — what to monitor, how it works, which monitor to buy.', href: '/baby-monitoring', icon: '📡' },
              { title: 'Newborn Care India', desc: 'First month essentials — feeding, sleep, temperature, breathing.', href: '/newborn-care-guide', icon: '👶' },
              { title: 'Baby Wellness App', desc: 'All app features explained — sleep score, trends, live monitoring.', href: '/baby-wellness-app', icon: '📱' },
              { title: 'Baby Breathing Patterns', desc: "What's normal, what's not, and when to call the doctor.", href: '/blog/baby-breathing-patterns', icon: '🫁' },
              { title: 'Baby Cry Types', desc: 'Hungry vs tired vs uncomfortable — how to tell the difference.', href: '/blog/types-of-baby-cries', icon: '🎵' },
              { title: 'AI Baby Monitor India 2026', desc: 'How AI is changing infant safety — cry analysis, radar breathing & more.', href: '/blog/ai-baby-monitor-india-2026', icon: '🤖' },
              { title: 'Monitor Without Wearable', desc: 'Why contactless beats wearable in India\'s heat — complete guide.', href: '/blog/baby-breathing-monitor-without-wearable', icon: '📡' },
              { title: 'Compare Baby Monitors 2026', desc: 'Anvaya vs Motorola vs Owlet — honest India comparison 2026.', href: '/compare', icon: '⚖️' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="card-hover group flex items-start gap-4 bg-[#faf8f5] rounded-2xl p-5 border border-[#e2dbd4]">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CLOSING CTA ════════════ */}
      <section className="py-16 lg:py-28 bg-[#0d1f18] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #4a7c6f 0%, transparent 60%), radial-gradient(circle at 75% 50%, #e8957a 0%, transparent 60%)' }} />
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Anvaya Smart</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Because every<br />breath matters.
          </h2>
          <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto">
            India&apos;s most trusted baby wellness pod. Peace of mind for every parent. A safer world for every baby. 🇮🇳
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <LeadModalTrigger source="homepage-closing-cta" product="Anvaya Smart">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/30 animate-pulse-halo cursor-pointer">
                Join the Founding 100 Families <ArrowRight className="w-4 h-4" />
              </Button>
            </LeadModalTrigger>
            <Button asChild size="lg" variant="ghost" className="text-white/80 border border-white/15 hover:bg-white/8 text-base px-8 py-6 rounded-xl">
              <Link href="/anvaya">Explore All Products</Link>
            </Button>
          </div>
          <p className="text-white/30 text-sm mt-7">Free shipping across India · 30-day guarantee · 0% EMI</p>
        </div>
      </section>

    </div>
  );
}
