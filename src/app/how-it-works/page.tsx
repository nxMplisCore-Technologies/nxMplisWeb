'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Wifi, Activity, Heart, Thermometer, MessageCircle, Moon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Animated radar pulse SVG ──────────────────────────────────────────────────
function RadarPulse() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      {[40, 65, 90, 115].map((r, i) => (
        <motion.circle
          key={r} cx="100" cy="100" r={r}
          fill="none" stroke="#4a7c6f" strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.5, 0], scale: [0.6, 1, 1.05] }}
          transition={{ duration: 2.8, delay: i * 0.55, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      {/* Device dot */}
      <motion.circle cx="100" cy="100" r="10" fill="#4a7c6f"
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
      />
      <motion.circle cx="100" cy="100" r="5" fill="#fff" />
      {/* Baby detection dot */}
      <motion.circle cx="100" cy="48" r="7" fill="#e8957a"
        animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.text x="100" y="175" textAnchor="middle" fontSize="9" fill="#4a7c6f" fontWeight="600"
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.2, repeat: Infinity }}
      >
        Breathing detected ✓
      </motion.text>
    </svg>
  );
}

// ── Breathing waveform SVG ───────────────────────────────────────────────────
function BreathingWave({ active }: { active: boolean }) {
  const points = [0,0,8,0,16,-18,24,18,32,-18,40,18,48,0,56,0,64,-18,72,18,80,-18,88,18,96,0,104,0,112,-18,120,18,128,-18,136,18,144,0,152,0,160,0];
  const d = `M ${points.map((v, i) => i % 2 === 0 ? v : 50 + v).join(' ')}`;
  return (
    <svg viewBox="0 0 160 100" className="w-full" aria-label="Breathing waveform">
      <motion.path d={d} fill="none" stroke="#4a7c6f" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2.5, ease: 'easeInOut', repeat: active ? Infinity : 0, repeatType: 'loop', repeatDelay: 0.5 }}
      />
      <text x="80" y="90" textAnchor="middle" fontSize="8" fill="#6b8e85">Normal · 44 breaths/min</text>
    </svg>
  );
}

// ── SpO2 gauge ───────────────────────────────────────────────────────────────
function SpO2Gauge({ active }: { active: boolean }) {
  const [value, setValue] = useState(88);
  useEffect(() => {
    if (!active) { setValue(88); return; }
    const t = setTimeout(() => {
      let v = 88;
      const id = setInterval(() => { v = Math.min(v + 1, 98); setValue(v); if (v >= 98) clearInterval(id); }, 60);
      return () => clearInterval(id);
    }, 400);
    return () => clearTimeout(t);
  }, [active]);
  const color = value >= 95 ? '#4a7c6f' : value >= 90 ? '#e8957a' : '#dc2626';
  const pct = ((value - 85) / 15) * 100;
  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 120 70" className="w-48" aria-label={`SpO2 reading: ${value}%`}>
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#e2dbd4" strokeWidth="8" strokeLinecap="round" />
        <motion.path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          style={{ strokeDasharray: 157, strokeDashoffset: 157 - (pct / 100) * 157 }}
          transition={{ duration: 0.1 }}
        />
        <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>{value}%</text>
        <text x="60" y="68" textAnchor="middle" fontSize="8" fill="#6b8e85">SpO₂</text>
      </svg>
      <motion.div className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ background: value >= 95 ? '#f0f5f3' : '#fff5f5', color: value >= 95 ? '#4a7c6f' : '#dc2626' }}
        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}
      >
        {value >= 95 ? '✅ Normal range' : value >= 90 ? '⚠️ Watch closely' : '🚨 Alert!'}
      </motion.div>
    </div>
  );
}

// ── Cry analyser animation ───────────────────────────────────────────────────
const CRY_TYPES = [
  { label: 'Hunger', color: '#e8957a', pct: 78, emoji: '😋' },
  { label: 'Tired', color: '#7aab9e', pct: 12, emoji: '😴' },
  { label: 'Discomfort', color: '#c0674f', pct: 7, emoji: '😣' },
  { label: 'Pain', color: '#dc2626', pct: 3, emoji: '😢' },
];
function CryAnalyser({ active }: { active: boolean }) {
  return (
    <div className="space-y-2.5 w-full max-w-xs">
      <div className="flex items-center gap-2 mb-3">
        <motion.div className="flex gap-0.5 items-end h-8"
          animate={active ? {} : {}}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div key={i} className="w-1 rounded-full bg-[#e8957a]"
              animate={active ? { height: [4, Math.random() * 24 + 4, 4] } : { height: 4 }}
              transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.06 }}
            />
          ))}
        </motion.div>
        <span className="text-xs text-muted-foreground font-medium ml-1">AI analysing…</span>
      </div>
      {CRY_TYPES.map((t, i) => (
        <div key={t.label} className="flex items-center gap-2">
          <span className="text-sm w-4">{t.emoji}</span>
          <span className="text-xs w-20 text-muted-foreground">{t.label}</span>
          <div className="flex-1 bg-[#f0ece6] rounded-full h-2 overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: t.color }}
              initial={{ width: 0 }}
              animate={active ? { width: `${t.pct}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 + 0.3, ease: 'easeOut' }}
            />
          </div>
          <motion.span className="text-xs font-bold w-8 text-right" style={{ color: t.color }}
            initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: i * 0.2 + 0.9 }}
          >
            {t.pct}%
          </motion.span>
        </div>
      ))}
      <motion.div className="mt-3 bg-[#fdf0ea] border border-[#f5c4a8] rounded-xl px-3 py-2 text-xs font-semibold text-[#c0674f]"
        initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 1.2 }}
      >
        😋 Your baby is hungry — feed now
      </motion.div>
    </div>
  );
}

// ── Sleep timeline ────────────────────────────────────────────────────────────
const SLEEP_BLOCKS = [
  { label: 'Deep', color: '#4a7c6f', width: 22 },
  { label: 'Light', color: '#7aab9e', width: 14 },
  { label: 'Deep', color: '#4a7c6f', width: 20 },
  { label: 'REM', color: '#e8957a', width: 10 },
  { label: 'Deep', color: '#4a7c6f', width: 18 },
  { label: 'Light', color: '#7aab9e', width: 16 },
];
function SleepTimeline({ active }: { active: boolean }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex gap-1 h-10 items-end rounded-lg overflow-hidden">
        {SLEEP_BLOCKS.map((b, i) => (
          <motion.div key={i} className="rounded-sm flex items-end justify-center pb-0.5"
            style={{ background: b.color, flexBasis: `${b.width}%` }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={active ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
          >
            <span className="text-[8px] text-white font-bold opacity-80">{b.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
        <span>10pm</span><span>12am</span><span>2am</span><span>4am</span><span>6am</span>
      </div>
      <motion.div className="flex gap-4 text-xs" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.9 }}>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#4a7c6f' }} />Deep sleep: 4.8h</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#e8957a' }} />REM: 1.2h</span>
      </motion.div>
    </div>
  );
}

// ── Section wrapper that triggers animation when in view ─────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-15% 0px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Step card (feature explanation) ──────────────────────────────────────────
function StepCard({ step, title, desc, visual, flip = false }: {
  step: string; title: string; desc: string; visual: React.ReactNode; flip?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px' });
  return (
    <div ref={ref} className={`flex flex-col ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}>
      {/* Text */}
      <motion.div className="flex-1 max-w-md"
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: flip ? 40 : -40 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{step}</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-snug">{title}</h2>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </motion.div>
      {/* Visual */}
      <motion.div className="flex-1 w-full max-w-sm"
        initial={{ opacity: 0, x: flip ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: flip ? -40 : 40 }}
        transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="bg-white rounded-2xl border border-[#e2dbd4] shadow-sm p-6 flex items-center justify-center min-h-[220px]">
          {inView ? visual : null}
        </div>
      </motion.div>
    </div>
  );
}

// ── Stat counter ─────────────────────────────────────────────────────────────
function StatCount({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 40;
    const id = setInterval(() => { start = Math.min(start + step, to); setVal(Math.round(start)); if (start >= to) clearInterval(id); }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-primary">{val}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HowItWorksPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#faf8f5] overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Animated background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {[280, 420, 560, 700].map((r, i) => (
            <motion.div key={r} className="absolute rounded-full border border-primary/10"
              style={{ width: r, height: r }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-3xl mx-auto">
          <motion.div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold text-primary mb-6"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            <motion.span className="w-2 h-2 rounded-full bg-primary inline-block"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            />
            See how Anvaya works
          </motion.div>

          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            Your baby breathes.{' '}
            <span className="text-primary">Anvaya watches.</span>{' '}
            You sleep.
          </motion.h1>

          <motion.p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          >
            No wearable. No contact. No subscription. See exactly how Anvaya Smart monitors your baby's breathing, oxygen, cries, and sleep — from across the room.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          >
            <Button asChild size="lg" className="bg-primary text-white gap-2 font-bold">
              <Link href="/early-access">Reserve Your Pod <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-[#e2dbd4] gap-2">
              <Link href="/anvaya">See All Models</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <Section className="bg-white border-y border-[#e2dbd4] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCount to={40} suffix="cm" label="Monitoring range" />
            <StatCount to={92} suffix="%" label="Cry analysis accuracy" />
            <StatCount to={6} suffix=" sensors" label="In one device" />
            <StatCount to={0} suffix=" wires" label="Nothing on baby" />
          </div>
        </div>
      </Section>

      {/* ── Steps ────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-20 space-y-28">

        {/* Step 1: Radar breathing */}
        <StepCard
          step="Step 01 — Breathing"
          title="Radar that feels every breath"
          desc="Anvaya emits low-power UWB radar pulses — the same technology used in car collision sensors and modern smartphones. The signal bounces off your baby's chest and detects the tiny 3–5mm movement of each breath. No contact, no light, no sound. Works through blankets and in complete darkness."
          visual={
            <div className="w-40 h-40 mx-auto">
              <RadarPulse />
            </div>
          }
        />

        {/* Step 2: SpO2 */}
        <StepCard
          step="Step 02 — Oxygen"
          title="Oxygen levels, watched all night"
          desc="SpO2 tells you how much oxygen is in your baby's blood — the single most direct indicator of whether their lungs are working properly. Anvaya tracks it contactlessly using optical sensing. Normal is 95–100%. Anything below 94% for more than a minute triggers an alert, so you can act before it becomes a crisis."
          visual={<SpO2Gauge active />}
          flip
        />

        {/* Step 3: Breathing waveform */}
        <StepCard
          step="Step 03 — Pattern"
          title="Live breathing waveform on your phone"
          desc="See your baby's breathing pattern in real time on the Anvaya app — exactly like a hospital monitor, but in your pocket. The app learns your baby's normal rhythm over 3 nights and alerts you only when something is genuinely outside their pattern. No false alarms from normal periodic breathing."
          visual={
            <div className="w-full">
              <BreathingWave active />
              <div className="mt-3 bg-[#f0f5f3] rounded-xl p-3 flex items-center gap-3">
                <motion.div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-primary">Breathing normal · No alerts</span>
              </div>
            </div>
          }
        />

        {/* Step 4: Cry analysis */}
        <StepCard
          step="Step 04 — Cries"
          title="Know exactly why your baby is crying"
          desc="Anvaya's AI has learned from millions of infant cry samples across 5 languages and acoustic environments. After 3 nights with your baby, it knows their voice. At 3am, instead of guessing, you'll know: hunger, pain, overtired, discomfort, or overstimulation — before you even get out of bed."
          visual={<CryAnalyser active />}
          flip
        />

        {/* Step 5: Sleep */}
        <StepCard
          step="Step 05 — Sleep"
          title="A sleep map for every night"
          desc="Every morning, Anvaya shows you a colour-coded breakdown of your baby's night — deep sleep, light sleep, REM, and wake periods. Over weeks, you'll spot patterns: the 4am light sleep window, the 2-hour deep sleep block, the nap that always disrupts bedtime. Data turns exhausted guesswork into confident decisions."
          visual={<SleepTimeline active />}
        />

        {/* Step 6: Temperature */}
        <StepCard
          step="Step 06 — Environment"
          title="Room temperature alerts — critical for India"
          desc="Overheating is one of the top risk factors for infant distress and SIDS. In Indian summers, rooms can hit 32–38°C without AC. Anvaya monitors ambient room temperature and alerts you the moment the room gets too warm during sleep. The recommended sleep temperature is 20–22°C — Anvaya helps you maintain it."
          visual={
            <div className="space-y-4 w-full">
              {[
                { label: 'Room temperature', value: '21°C', status: '✅ Safe', color: '#4a7c6f', bg: '#f0f5f3' },
                { label: 'Humidity', value: '58%', status: '✅ Comfortable', color: '#4a7c6f', bg: '#f0f5f3' },
              ].map((item, i) => (
                <motion.div key={item.label} className="rounded-xl p-4 flex items-center justify-between"
                  style={{ background: item.bg, border: `1.5px solid ${item.color}33` }}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                >
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: item.color }}>{item.status}</div>
                </motion.div>
              ))}
            </div>
          }
          flip
        />
      </div>

      {/* ── How it's different ───────────────────────────────────────────── */}
      <Section className="bg-white border-y border-[#e2dbd4] py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Why Anvaya</div>
            <h2 className="text-3xl font-bold mb-3">Built for India. Not adapted for India.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every design decision in Anvaya was made for Indian homes — the heat, the power cuts, the internet, the infrastructure.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e2dbd4]">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                  <th className="py-3 px-4 text-center font-bold text-primary">Anvaya Smart</th>
                  <th className="py-3 px-4 text-center text-muted-foreground font-medium">Imported wearables</th>
                  <th className="py-3 px-4 text-center text-muted-foreground font-medium">Video-only</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Breathing monitoring', '✅ Contactless radar', '✅ Wearable sock/clip', '❌'],
                  ['Works in 40°C heat', '✅ Nothing on baby', '⚠️ Rashes, falls off', '✅'],
                  ['Works during power cut', '✅ On-device AI', '❌', '❌'],
                  ['India warranty', '✅ 1 year', '❌ Grey import', '✅ Motorola 1yr'],
                  ['Monthly subscription', '✅ None', '⚠️ ₹2,500+/month', '✅ None'],
                  ['Cry analysis', '✅ 5 types', '❌', '❌'],
                  ['SpO₂ monitoring', '✅ Contactless', '✅ Wearable', '❌'],
                  ['Starting price', '✅ ₹8,999', '⚠️ ₹35,000+', '✅ ₹6,000'],
                ].map(([feat, anvaya, wearable, video], i) => (
                  <motion.tr key={feat} className={`border-b border-[#e2dbd4] ${i % 2 === 0 ? 'bg-[#faf8f5]' : 'bg-white'}`}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="py-3 px-4 font-medium">{feat}</td>
                    <td className="py-3 px-4 text-center text-primary font-semibold">{anvaya}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{wearable}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{video}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── YouTube video placeholder ────────────────────────────────────── */}
      <Section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Watch</div>
          <h2 className="text-3xl font-bold mb-4">See Anvaya in action</h2>
          <p className="text-muted-foreground mb-8">A 2-minute demo showing real-time breathing detection, cry analysis, and the Anvaya app.</p>
          <div className="relative rounded-2xl overflow-hidden bg-[#1a2e28] aspect-video flex items-center justify-center border border-[#4a7c6f]/30 shadow-xl">
            <Image src="/anvaya-nursery.jpg" alt="Anvaya Smart baby monitor in nursery" fill className="object-cover opacity-30" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <motion.div
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 cursor-pointer"
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[24px] border-l-white ml-2" />
              </motion.div>
              <span className="text-white/80 text-sm font-medium">Demo video — coming soon</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Pod models quick view ────────────────────────────────────────── */}
      <Section className="bg-white border-y border-[#e2dbd4] py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Models</div>
            <h2 className="text-3xl font-bold mb-3">Choose your level of monitoring</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'CORE', price: '₹8,999', color: '#7aab9e', features: ['Breathing', 'Cry analysis'] },
              { name: 'SENSE', price: '₹12,999', color: '#4a7c6f', features: ['Breathing', 'Cry', 'SpO₂', 'Temp'], popular: true },
              { name: 'PULSE', price: '₹14,999', color: '#e8957a', features: ['Breathing', 'Cry', 'SpO₂', 'Temp', 'Heart Rate'] },
              { name: 'OMNI', price: '₹19,999', color: '#c0674f', features: ['All sensors', '+ Video'] },
            ].map((pod, i) => (
              <motion.div key={pod.name}
                className={`rounded-2xl border-2 p-5 relative ${pod.popular ? 'border-primary bg-primary/5' : 'border-[#e2dbd4] bg-white'}`}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(74,124,111,0.15)' }}
              >
                {pod.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full text-white whitespace-nowrap" style={{ background: '#e8957a' }}>
                    Most Popular
                  </span>
                )}
                <div className="w-3 h-3 rounded-full mb-3" style={{ background: pod.color }} />
                <div className="font-bold text-lg mb-0.5">{pod.name}</div>
                <div className="text-primary font-bold text-sm mb-3">{pod.price}</div>
                <ul className="space-y-1">
                  {pod.features.map(f => (
                    <li key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild className="bg-primary text-white gap-2 font-bold">
              <Link href="/anvaya">Compare all models <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Section className="py-24">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
            🌙
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Sleep tonight. Really.</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            73 Indian families are already monitoring with Anvaya Smart. No payment today — reserve your pod and we'll reach out to confirm within the hour.
          </p>
          <Button asChild size="lg" className="text-white font-bold gap-2 w-full sm:w-auto"
            style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 24px rgba(232,149,122,0.4)' }}
          >
            <Link href="/early-access">
              <MessageCircle className="w-4 h-4" />
              Reserve your Anvaya pod — No payment now
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">27 founding family spots remaining · Free shipping India</p>
        </div>
      </Section>
    </div>
  );
}
