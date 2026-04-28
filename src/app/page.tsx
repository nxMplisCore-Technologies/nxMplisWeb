'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Sparkles, Activity, Thermometer, Wind, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// ── Live monitor simulation ──────────────────
function LiveMonitor() {
  const [bpm, setBpm] = useState(28);
  const [spo2, setSpo2] = useState(98);
  const [temp, setTemp] = useState(36.5);
  const [status, setStatus] = useState('Sleeping peacefully');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setBpm(v => Math.max(24, Math.min(32, v + (Math.random() > 0.5 ? 1 : -1))));
      setSpo2(v => Math.max(96, Math.min(99, v + (Math.random() > 0.7 ? 1 : Math.random() > 0.5 ? 0 : -1))));
      setTemp(v => parseFloat((Math.max(36.2, Math.min(36.9, v + (Math.random() - 0.5) * 0.1))).toFixed(1)));
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const wavePoints = Array.from({length:40}, (_,i) => {
    const x = i * 7;
    const y = 30 + Math.sin(i * 0.6 + tick * 0.5) * 10 + Math.sin(i * 1.2) * 5;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="glass rounded-2xl p-5 shadow-lg border border-white/60 max-w-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Anvaya Smart</div>
          <div className="text-sm font-semibold text-foreground mt-0.5">{status}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="live-dot" />
          <span className="text-xs font-semibold text-green-600">Live</span>
        </div>
      </div>

      {/* Waveform */}
      <div className="bg-[#f0faf6] rounded-xl h-14 mb-4 overflow-hidden relative">
        <svg width="280" height="56" viewBox="0 0 280 56" className="absolute inset-0 w-full h-full">
          <polyline points={wavePoints} fill="none" stroke="#4a7c6f" strokeWidth="2" strokeLinecap="round" style={{transition:'all 0.8s ease'}}/>
        </svg>
        <div className="absolute top-2 left-3 text-[10px] font-semibold text-primary/60">Breathing</div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Activity, label: 'Breaths/min', value: bpm, unit: '', color: '#4a7c6f' },
          { icon: Wind, label: 'SpO2', value: spo2, unit: '%', color: '#7aab9e' },
          { icon: Thermometer, label: 'Temp', value: temp, unit: '°C', color: '#e8957a' },
        ].map(m => (
          <div key={m.label} className="bg-white/70 rounded-xl p-2.5 text-center">
            <m.icon className="w-4 h-4 mx-auto mb-1" style={{color:m.color}} />
            <div className="text-lg font-bold" style={{color:m.color}}>{m.value}{m.unit}</div>
            <div className="text-[9px] text-muted-foreground leading-tight">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        All vitals normal · No alerts
      </div>
    </div>
  );
}

// ── Reveal on scroll ──────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Animated counter ──────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / 40;
      const t = setInterval(() => {
        start = Math.min(start + step, target);
        setCount(Math.round(start));
        if (start >= target) clearInterval(t);
      }, 30);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const products = [
  { name: 'CORE', tagline: 'Simple. Smart. Reliable.', price: '₹8,999', color: '#d97706', bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', features: ['HD Video', 'Cry Detection', 'Lullabies', 'Temperature'] },
  { name: 'SENSE', tagline: 'Understand More Than Sound.', price: '₹12,999', color: '#4a7c6f', bg: 'from-[#e8f2ee] to-[#f5ede0]', border: 'border-primary/30', features: ['Breathing & Heart Rate', 'SpO2 Monitoring', 'Cry Analysis', 'Air Quality'], popular: true },
  { name: 'PULSE', tagline: 'Stay Connected Always.', price: '₹15,999', color: '#3b82f6', bg: 'from-blue-50 to-sky-50', border: 'border-blue-200', features: ['Activity Tracking', 'Temp & Humidity', 'Safety Alerts', 'Real-Time Alerts'] },
  { name: 'OMNI', tagline: 'Total Awareness.', price: '₹19,999', color: '#fbbf24', bg: 'from-gray-900 to-gray-800', border: 'border-gray-700', features: ['Predictive AI', '360° Coverage', 'Health Reports', 'All SENSE features'], dark: true },
];

export default function Home() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal(), r5 = useReveal();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, source: 'homepage', product: 'Anvaya Smart' }),
      });
    } catch (_) {}
    setLoading(false); setSubmitted(true);
    toast({ title: "You're on the list!", description: "We'll WhatsApp you within 24 hours." });
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute right-[-80px] top-[-80px] w-[500px] h-[500px] rounded-full border border-primary/8 pointer-events-none" />
        <div className="absolute right-[-40px] top-[-40px] w-[380px] h-[380px] rounded-full border border-primary/10 pointer-events-none" />

        <div className="container mx-auto px-4 py-24 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Early Access Open — First 100 families save ₹2,000
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
                Because every<br />
                <span className="gradient-text">breath matters.</span>
              </h1>
              <p className="text-xl font-semibold text-primary mb-3">Smart Care. Gentle Beginnings.</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                AI that monitors your baby's breathing, cries, SpO2, heart rate and temperature — contactlessly. No wearables. No stress. Peace of mind, always.
              </p>
              <div className="flex gap-4 flex-wrap mb-5">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2 animate-glow text-base px-7">
                  <Link href="/early-access">Get Early Access — Save ₹2,000 <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 text-base">
                  <Link href="/anvaya">Explore Products</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {['No payment now', '30-day guarantee', 'Free shipping'].map(t => (
                  <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" />{t}</span>
                ))}
              </div>
            </div>

            {/* Right — product + live widget */}
            <div className="relative flex flex-col items-center gap-6 animate-fade-up delay-200">
              {/* Product image with pulse rings */}
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl" style={{boxShadow:'0 0 0 1px rgba(74,124,111,0.15)',animation:'pulse-ring 2.5s ease-out infinite'}} />
                <div className="absolute inset-[-16px] rounded-[28px]" style={{boxShadow:'0 0 0 1px rgba(74,124,111,0.08)',animation:'pulse-ring2 2.5s ease-out infinite .8s'}} />
                <div className="relative w-full max-w-xs h-64 lg:h-72 rounded-2xl overflow-hidden shadow-2xl animate-float">
                  <Image src="/anvaya-product.png" alt="Anvaya Smart baby monitor — clean product shot" fill className="object-cover object-center" priority />
                </div>
              </div>
              {/* Live monitor widget */}
              <div className="w-full max-w-sm animate-fade-up delay-400">
                <LiveMonitor />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-border bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: 6, suffix: '+', label: 'Signals monitored' },
              { n: 0, suffix: '', label: 'Things on baby\'s skin' },
              { n: 100, suffix: '%', label: 'On-device privacy' },
              { n: 24, suffix: '/7', label: 'Silent protection' },
            ].map(s => (
              <div key={s.label} className="group">
                <div className="text-4xl font-bold text-primary mb-1 transition-transform group-hover:scale-110 duration-200">
                  <Counter target={s.n} suffix={s.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-24 bg-white">
        <div ref={r1} className="reveal container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl group">
              <Image src="/anvaya-lifestyle.png" alt="Baby sleeping safely — Anvaya Smart peace of mind" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
                <p className="text-sm font-bold text-[#172720]">Parenting is built on trust.</p>
                <p className="text-xs text-muted-foreground mt-0.5">Anvaya Smart — by Nxmliscore</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{color:'#e8957a'}}>Our Story</p>
              <h2 className="text-4xl font-bold mb-6 leading-tight">We built this for the 3am moment.</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">When you tiptoe to the crib for the fifth time — not because you heard something, but because you didn't. That silence. That uncertainty. That's what Anvaya Smart was built for.</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Our technology listens so you don't have to. It learns your baby's unique patterns and only tells you when something truly needs attention.</p>
              <p className="text-xl font-bold text-primary italic">Smarter care. Stronger connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#faf8f5]">
        <div ref={r2} className="reveal container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:'#e8957a'}}>How It Works</p>
            <h2 className="text-4xl font-bold">Quiet. Contactless. Always watching.</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <Image src="/anvaya-features.png" alt="Anvaya Smart features — care, smart connection, safety" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Baby, title: 'Cry Analysis', desc: 'AI identifies hungry, tired, or uncomfortable cries in real time.', color: '#e8957a' },
                { icon: Activity, title: 'Breathing & SpO2', desc: 'Contactless breath pattern and oxygen monitoring — nothing on baby\'s skin.', color: '#4a7c6f' },
                { icon: Thermometer, title: 'Temperature', desc: 'Room and body temperature tracked 24/7 for the perfect sleep environment.', color: '#7aab9e' },
                { icon: Wind, title: 'Sleep Intelligence', desc: 'Learns your baby\'s unique rhythms. Gets smarter every night.', color: '#c17a5e' },
              ].map((f, i) => (
                <div key={f.title} className={`card-hover flex items-start gap-4 bg-white rounded-xl p-4 border border-[#e2dbd4] animate-fade-up delay-${(i+1)*100}`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{background:`${f.color}18`}}>
                    <f.icon className="w-5 h-5" style={{color:f.color}} />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">{f.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-24 bg-white">
        <div ref={r3} className="reveal container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:'#e8957a'}}>Our Products</p>
            <h2 className="text-4xl font-bold mb-3">Find Your Perfect Monitor</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">A solution for every stage of your parenting journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p, i) => (
              <Link key={p.name} href={`/anvaya#${p.name.toLowerCase()}`}
                className={`card-hover group block rounded-2xl border p-6 bg-gradient-to-br ${p.bg} ${p.border} animate-fade-up delay-${(i+1)*100} relative overflow-hidden`}>
                {p.popular && (
                  <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">Most Popular</div>
                )}
                <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60" style={{color:p.dark?'#fbbf24':p.color}}>Anvaya</div>
                <h3 className={`text-2xl font-bold mb-1 ${p.dark?'text-white':'text-foreground'}`}>{p.name}</h3>
                <p className="text-sm font-semibold mb-4" style={{color:p.color}}>{p.tagline}</p>
                <ul className="space-y-2 mb-6">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-xs ${p.dark?'text-gray-300':'text-muted-foreground'}`}>
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{color:p.color}} />{f}
                    </li>
                  ))}
                </ul>
                <div className={`text-2xl font-bold ${p.dark?'text-white':'text-foreground'}`}>{p.price}</div>
                <div className={`mt-3 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all ${p.dark?'text-yellow-400':'text-primary'}`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE ── */}
      <section className="py-24 bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee]">
        <div ref={r4} className="reveal container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              47 of 100 early access spots remaining
            </div>
            <h2 className="text-4xl font-bold mb-4">Be Among the First 100 Families</h2>
            <p className="text-muted-foreground mb-8 text-lg">Join early access. Get ₹2,000 off, priority shipping, and a free 1-year app subscription.</p>
            {submitted ? (
              <div className="glass rounded-2xl p-8 border border-primary/20">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-xl font-bold text-primary">You're on the list!</p>
                <p className="text-muted-foreground mt-2">We'll WhatsApp you within 24 hours.</p>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 border border-white/60 shadow-lg">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required className="flex-1 bg-white/80 border-primary/20 focus:border-primary" />
                  <Input placeholder="WhatsApp number" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required className="flex-1 bg-white/80 border-primary/20" />
                  <Button type="submit" disabled={loading} className="shrink-0 bg-primary text-white hover:bg-primary/90 animate-glow">
                    {loading ? 'Saving...' : 'Reserve Spot'}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-3">No payment now · We'll reach out with details before launch.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section ref={r5} className="reveal py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage:'radial-gradient(circle at 20% 50%,white 1px,transparent 1px)',backgroundSize:'40px 40px'}} />
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">While your baby sleeps,<br />we watch what matters most.</h2>
          <p className="text-white/70 text-xl mb-10 max-w-xl mx-auto">Breathing. Movement. Comfort. So you can rest easy.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 font-bold gap-2 text-base px-8 shadow-lg">
              <Link href="/early-access">Reserve Now — ₹12,999 <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10 text-base">
              <Link href="/anvaya">Explore All Products</Link>
            </Button>
          </div>
          <p className="text-white/40 text-sm mt-6">Free shipping across India · 30-day money-back guarantee · EMI available</p>
        </div>
      </section>
    </div>
  );
}
