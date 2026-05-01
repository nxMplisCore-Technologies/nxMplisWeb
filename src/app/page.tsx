'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Sparkles, Activity, Thermometer, Baby, Moon, Heart, Phone, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ─────────────────── HOOKS ─────────────────── */
function useReveal(options?: { from?: 'left' | 'right' | 'scale' }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (options?.from) el.classList.add(`from-${options.from}`);
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.from]);
  return ref;
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
      <div className="bg-[#f0faf7] rounded-xl h-12 mb-3 overflow-hidden relative">
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
    <div className={`phone-frame relative select-none ${className}`} style={{ width: 220, minWidth: 220 }}>
      <div className="phone-screen bg-gray-100" style={{ height: 440 }}>
        <Image src={src} alt={alt} fill className="object-cover" style={{ objectPosition }} sizes="220px" />
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

/* ─────────────────── PAGE ─────────────────── */
export default function Home() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const r1 = useReveal(), r2 = useReveal({ from: 'left' }), r2r = useReveal({ from: 'right' });
  const r3 = useReveal({ from: 'right' }), r3l = useReveal({ from: 'left' });
  const r4 = useReveal({ from: 'left' }), r4r = useReveal({ from: 'right' });
  const r5 = useReveal({ from: 'right' }), r5l = useReveal({ from: 'left' });
  const r6 = useReveal(), r7 = useReveal();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, source: 'homepage', product: 'Anvaya Smart' }),
      });
    } catch (_) { }
    setLoading(false); setSubmitted(true);
    toast({ title: "You're on the list!", description: "We'll WhatsApp you within 24 hours." });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea]">
        {/* Subtle grain */}
        <div className="absolute inset-0 noise pointer-events-none opacity-60" />
        {/* Decorative circles */}
        <div className="absolute -right-40 -top-40 w-[640px] h-[640px] rounded-full border border-primary/6 pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-[440px] h-[440px] rounded-full border border-primary/8 pointer-events-none" />
        <div className="absolute right-20 top-20 w-[280px] h-[280px] rounded-full bg-primary/4 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-28 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT copy */}
            <div ref={heroRef}>
              <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-1.5 mb-7 text-xs text-primary font-bold shadow-sm animate-fade-up">
                <Sparkles className="w-3 h-3 animate-spin-slow" />
                Early Access Open — First 100 families save ₹2,000
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight leading-[1.08] mb-5 animate-fade-up delay-1">
                Your Baby Breathes.<br />
                <span className="text-gradient">You Sleep.</span>
              </h1>
              <p className="text-xl font-semibold text-primary mb-3 animate-fade-up delay-2">Trusted by 500+ Indian families. Recommended by paediatricians.</p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg animate-fade-up delay-3">
                Most breathing irregularities happen silently at night — while you&apos;re asleep. Anvaya&apos;s AI baby wellness pod watches breathing, SpO₂, cry type and sleep quality. Nothing on baby&apos;s skin. Nothing missed.
              </p>
              <div className="flex gap-4 flex-wrap mb-7 animate-fade-up delay-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2 text-base px-7 py-6 rounded-xl shadow-lg shadow-primary/25 animate-pulse-halo">
                  <Link href="/early-access">Protect Your Baby Tonight — Save ₹2,000 <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/25 text-primary hover:bg-primary/5 text-base px-7 py-6 rounded-xl glass">
                  <Link href="/anvaya">Explore Products</Link>
                </Button>
              </div>
              <div className="flex items-center gap-5 text-sm text-muted-foreground animate-fade-up delay-5">
                {['No payment now', '30-day guarantee', 'Pediatrician-recommended'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — product + live widget */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                {/* Halo rings */}
                <div className="absolute inset-[-24px] rounded-[48px] border border-primary/10 pointer-events-none" />
                <div className="absolute inset-[-48px] rounded-[64px] border border-primary/5 pointer-events-none" />
                <div className="relative w-72 lg:w-80 rounded-3xl overflow-hidden shadow-2xl animate-float border-4 border-white/60" style={{ aspectRatio: '4/3' }}>
                  <Image src="/anvaya-nursery.jpg" alt="Anvaya Smart baby wellness pod in nursery — AI-powered contactless breathing and cry monitoring India" fill className="object-cover object-center" priority sizes="(max-width: 768px) 288px, 320px" />
                  {/* Overlay badge */}
                  <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2 shadow-lg">
                    <p className="text-xs font-bold text-[#172720]">Designed for Every Nursery</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">On table · On wall · On cradle</p>
                  </div>
                </div>
              </div>
              {/* Live monitor */}
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
            ].map(s => (
              <div key={s.label} className="group cursor-default">
                <div className="text-4xl font-bold text-primary mb-1 tabular-nums transition-transform group-hover:scale-110 duration-300">
                  <AnimatedNumber target={s.n} suffix={s.suffix} />
                </div>
                <div className="font-semibold text-sm">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 1 — SLEEP ANALYSIS ════════════ */}
      <section className="py-28 bg-[#faf8f5] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Phone mockup — left */}
            <div ref={r2} className="reveal from-left flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-br from-primary/8 to-transparent blur-2xl" />
                <PhoneMockup src="/app-trends.jpg" alt="Anvaya Smart app — Sleep & Health Trends showing heart rate, temperature and SpO2" className="animate-float-slow relative z-10" objectPosition="top" />
                {/* Floating stat card */}
                <div className="absolute -right-8 top-16 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-xs text-muted-foreground font-medium mb-1">Sleep Score</div>
                  <div className="text-3xl font-bold text-primary leading-none">85</div>
                  <div className="text-xs font-semibold text-green-600 mt-1">Excellent 🌙</div>
                </div>
                <div className="absolute -left-6 bottom-24 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="text-[10px] text-muted-foreground">Avg Heart Rate</div>
                  <div className="text-xl font-bold text-[#e8957a]">121 BPM</div>
                  <div className="text-[10px] text-green-600 font-semibold">Normal range ✓</div>
                </div>
              </div>
            </div>

            {/* Right copy */}
            <div ref={r2r} className="reveal from-right">
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Sleep & Wellness Analysis</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
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
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="w-4.5 h-4.5 text-primary" style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{f.title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6">
                <Link href="/early-access">Reserve Anvaya Smart <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 2 — CRY ANALYSIS ════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left copy */}
            <div ref={r3l} className="reveal from-left lg:order-1 order-2">
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Cry Intelligence</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Stop guessing.<br />Know what your<br />
                <span className="text-gradient">baby needs — instantly.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Hungry? Tired? Uncomfortable? Anvaya&apos;s AI identifies 5 cry types in real time — so you respond with confidence, not panic. Even at 3am. Even half asleep. Even when you&apos;re exhausted.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { emoji: '🍼', title: 'Hungry cry', desc: 'Rhythmic and repetitive. Anvaya flags it before it escalates.' },
                  { emoji: '😴', title: 'Tired cry', desc: 'Whiny and intermittent. Know when to soothe vs. wait.' },
                  { emoji: '😣', title: 'Discomfort cry', desc: 'High-pitched and continuous. Alerts you immediately.' },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-4 bg-[#faf8f5] rounded-xl p-4 border border-[#e8ddd4] card-hover cursor-default">
                    <span className="text-2xl shrink-0">{f.emoji}</span>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{f.title}</div>
                      <div className="text-sm text-muted-foreground">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6">
                <Link href="/early-access">Get Early Access <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            {/* Phone mockup — right */}
            <div ref={r3} className="reveal from-right lg:order-2 order-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-bl from-[#fdf0ea]/60 to-transparent blur-2xl" />
                <PhoneMockup src="/app-live.jpg" alt="Anvaya app — live cry detection, breathing monitoring and decibel meter" className="animate-float-slow relative z-10" objectPosition="top" />
                {/* Floating cards */}
                <div className="absolute -left-8 top-20 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float">
                  <div className="text-[10px] text-muted-foreground font-medium">Cry detected</div>
                  <div className="text-sm font-bold text-[#e8957a] mt-0.5">Hungry cry 🍼</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Last fed: 2h 45m ago</div>
                </div>
                <div className="absolute -right-6 bottom-32 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="text-[10px] text-muted-foreground">Noise level</div>
                  <div className="text-xl font-bold text-primary">25 dB</div>
                  <div className="text-[10px] text-green-600 font-semibold">Quiet room ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 3 — DAILY TIMELINE ════════════ */}
      <section className="py-28 bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Phone — left */}
            <div ref={r4} className="reveal from-left flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-br from-[#e4eeea] to-transparent blur-2xl" />
                <PhoneMockup src="/app-timeline.jpg" alt="Anvaya app — daily timeline showing sleeping, feeding and wake-up events" className="animate-float-slow relative z-10" objectPosition="top" />
                {/* Floating cards */}
                <div className="absolute -right-8 top-12 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float">
                  <div className="text-[10px] text-muted-foreground">10:30 AM</div>
                  <div className="text-sm font-bold text-primary mt-0.5">Sleeping 😴</div>
                  <div className="text-[10px] text-muted-foreground">Deep sleep cycle</div>
                </div>
                <div className="absolute -left-6 bottom-28 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="text-[10px] text-muted-foreground">AI Insight</div>
                  <div className="text-sm font-bold text-[#4a7c6f]">3 new updates ✨</div>
                </div>
              </div>
            </div>

            {/* Right copy */}
            <div ref={r4r} className="reveal from-right">
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Daily Timeline</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Every moment,<br />captured and<br />
                <span className="text-gradient">understood.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From the first wake-up to the last sleep cycle — Anvaya builds a complete picture of your baby's day. Sleep patterns, feeding, activity, moods — all in one timeline.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  { time: '10:30 AM', event: 'Sleeping', detail: 'Detected deep sleep cycle', dot: '#4a7c6f' },
                  { time: '08:15 AM', event: 'Feeding 🍼', detail: 'Bottle, 150ml', dot: '#e8957a' },
                  { time: '07:00 AM', event: 'Woke Up ☀️', detail: 'Good mood detected', dot: '#f59e0b' },
                ].map(t => (
                  <div key={t.time} className="flex items-start gap-4 bg-white/80 rounded-xl p-4 border border-white/60 shadow-sm">
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: t.dot }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{t.event}</span>
                        <span className="text-xs text-muted-foreground">{t.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6">
                <Link href="/early-access">Reserve Your Anvaya <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURE 4 — LIVE + VIDEO ════════════ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left copy */}
            <div ref={r5l} className="reveal from-left lg:order-1 order-2">
              <div className="section-divider" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Live Monitoring</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                See your baby live.<br />Speak to them.<br />
                <span className="text-gradient">From anywhere.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                One tap. Your baby appears on screen. Live. Two-way audio so your voice reaches them instantly. Lullabies, white noise, or your favourite song — all from your phone, wherever you are.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { icon: '📹', title: 'HD Video call', desc: 'See and speak to your baby live' },
                  { icon: '🎵', title: 'Remote lullabies', desc: 'Play music from anywhere' },
                  { icon: '🔔', title: 'Instant alerts', desc: 'Motion, cry, or unusual sound' },
                  { icon: '📸', title: 'Capture moments', desc: 'Auto-save precious memories' },
                ].map(f => (
                  <div key={f.title} className="bg-[#faf8f5] rounded-xl p-4 border border-[#e8ddd4] card-hover cursor-default">
                    <div className="text-2xl mb-2">{f.icon}</div>
                    <div className="font-bold text-sm mb-0.5">{f.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2 rounded-xl px-6">
                <Link href="/early-access">Get Early Access <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            {/* Phone — right */}
            <div ref={r5} className="reveal from-right lg:order-2 order-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 rounded-[56px] bg-gradient-to-bl from-primary/8 to-transparent blur-2xl" />
                <PhoneMockup src="/app-home.jpg" alt="Anvaya app — live monitoring dashboard with temperature, humidity and video stream" className="animate-float-slow relative z-10" />
                {/* Floating cards */}
                <div className="absolute -left-10 top-16 glass rounded-2xl px-4 py-3 shadow-xl z-20 animate-float">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="live-dot" />
                    <span className="text-xs font-bold text-green-600">Live Stream</span>
                  </div>
                  <div className="text-sm font-bold">Aradhya · 1 month</div>
                  <div className="text-[10px] text-muted-foreground">Awake and calm 😊</div>
                </div>
                <div className="absolute -right-8 bottom-24 glass rounded-2xl px-3 py-2.5 shadow-xl z-20 animate-float" style={{ animationDelay: '1.2s' }}>
                  <div className="text-[10px] text-muted-foreground">Room</div>
                  <div className="text-lg font-bold text-primary">26°C · 55%</div>
                  <div className="text-[10px] text-green-600 font-semibold">Perfect ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ PRODUCT LINEUP ════════════ */}
      <section className="py-24 bg-[#faf8f5]">
        <div ref={r6} className="reveal container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Our Products</p>
            <h2 className="text-4xl font-bold mb-3">Four baby wellness pods. One promise.</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every model is contactless, on-device private, and safe for newborns. Pick the level of intelligence that&apos;s right for your family.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: 'CORE', tagline: 'Simple. Smart. Reliable.', price: '₹8,999', bg: 'from-amber-50 to-orange-50', border: '#f0d9a0', color: '#d97706', features: ['HD Video', 'Cry Detection', 'Lullabies', 'Temperature'] },
              { name: 'SENSE', tagline: 'Understand more than sound.', price: '₹12,999', bg: 'from-[#e8f2ee] to-[#f5ede0]', border: '#a7d9c8', color: '#4a7c6f', features: ['Breathing & SpO2', 'Heart Rate', 'Cry Analysis', 'Air Quality'], popular: true },
              { name: 'PULSE', tagline: 'Stay connected always.', price: '₹15,999', bg: 'from-blue-50 to-sky-50', border: '#bfdbfe', color: '#3b82f6', features: ['Activity Tracking', 'Temp & Humidity', 'Safety Alerts', 'Real-Time Alerts'] },
              { name: 'OMNI', tagline: 'Total awareness.', price: '₹19,999', bg: '', border: '#2d4a3e', color: '#fbbf24', features: ['Predictive AI', '360° Coverage', 'Health Reports', 'All SENSE+'], dark: true },
            ].map((p, i) => (
              <Link key={p.name} href={`/anvaya#${p.name.toLowerCase()}`}
                className={`card-hover group block rounded-2xl border p-6 relative overflow-hidden ${p.dark ? 'bg-[#172720]' : `bg-gradient-to-br ${p.bg}`}`}
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
                <div className={`text-2xl font-bold ${p.dark ? 'text-white' : ''}`}>{p.price}</div>
                <div className={`mt-2 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all ${p.dark ? 'text-yellow-400' : 'text-primary'}`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TRUST BAR ════════════ */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {[
              { icon: '🛡️', label: 'Safe AI Monitoring' },
              { icon: '🌙', label: 'Healthy Sleep Support' },
              { icon: '🔔', label: 'Instant Alerts' },
              { icon: '🔒', label: 'Secure Storage' },
              { icon: '📶', label: 'Always Connected' },
              { icon: '✨', label: 'Modern Design' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="text-xl">{t.icon}</span>{t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ LEAD CAPTURE ════════════ */}
      <section className="py-28 bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] relative overflow-hidden">
        <div className="absolute inset-0 noise pointer-events-none opacity-40" />
        <div ref={r7} className="reveal container mx-auto px-4 relative">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 rounded-full px-4 py-1.5 mb-7 text-xs text-primary font-bold shadow-sm">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              47 of 100 early access spots remaining
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Be among the<br />
              <span className="text-gradient">first 100 families.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">Get ₹2,000 off the launch price, priority shipping, and a free 1-year premium app subscription.</p>
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
                    {loading ? 'Saving...' : 'Reserve'}
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
              { title: 'Compare Baby Monitors', desc: 'Anvaya vs Motorola vs Owlet — honest India comparison.', href: '/compare', icon: '⚖️' },
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
      <section className="py-28 bg-[#0d1f18] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #4a7c6f 0%, transparent 60%), radial-gradient(circle at 75% 50%, #e8957a 0%, transparent 60%)' }} />
        <div className="absolute inset-0 noise pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Anvaya Smart</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Because every<br />breath matters.
          </h2>
          <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto">
            India&apos;s most trusted baby wellness pod. Peace of mind for every parent. A safer world for every baby. 🇮🇳
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2 text-base px-8 py-6 rounded-xl shadow-lg shadow-primary/30 animate-pulse-halo">
              <Link href="/early-access">Reserve Now — ₹12,999 <ArrowRight className="w-4 h-4" /></Link>
            </Button>
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
