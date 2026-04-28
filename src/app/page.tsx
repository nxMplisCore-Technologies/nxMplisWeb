'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle, Sparkles, Shield, Wifi, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const trustPillars = [
  { icon: CheckCircle, title: 'Contactless Care', desc: 'Advanced sensing without wearables. Nothing touches your baby\'s skin — ever.' },
  { icon: Shield, title: 'Privacy First', desc: 'Your data stays secure. No cloud streaming — ever. All processing happens on-device.' },
  { icon: Brain, title: 'Real-Time Intelligence', desc: 'Instant alerts only when it truly matters. Learns your baby\'s unique patterns over time.' },
];

const products = [
  {
    name: 'Anvaya CORE',
    tagline: 'Simple. Smart. Reliable.',
    desc: 'Essential monitoring for complete peace of mind.',
    color: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
    features: ['HD Video', 'Cry Detection', 'Built-in Lullabies', 'Temperature Monitoring'],
    href: '/anvaya#core',
  },
  {
    name: 'Anvaya SENSE',
    tagline: 'Understand More Than Just Sound.',
    desc: 'Advanced wellness monitoring for your baby.',
    color: 'bg-primary/5 border-primary/20',
    badge: 'bg-primary/10 text-primary',
    features: ['Breathing & Heart Rate', 'Air Quality Alerts', 'Cry Analysis', 'Face Cover Detection'],
    href: '/anvaya#sense',
    popular: true,
  },
  {
    name: 'Anvaya PULSE',
    tagline: 'Stay Connected to Every Moment.',
    desc: 'Smart environment & activity monitoring.',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    features: ['Activity Tracking', 'Temp & Humidity', 'Safety Alerts', 'Real-Time Alerts'],
    href: '/anvaya#pulse',
  },
  {
    name: 'Anvaya OMNI',
    tagline: 'Total Awareness. Complete Peace of Mind.',
    desc: '360° intelligent monitoring powered by Predictive AI.',
    color: 'bg-gray-900 border-gray-700',
    badge: 'bg-yellow-400/20 text-yellow-300',
    features: ['Breathing, Heart Rate & Temp', 'Predictive Risk Alerts', '360° Room Coverage', 'AI Insights & Reports'],
    href: '/anvaya#omni',
    dark: true,
  },
];

const stats = [
  { n: '6+', label: 'Signals monitored' },
  { n: '0', label: 'Things on baby\'s skin' },
  { n: '100%', label: 'On-device privacy' },
  { n: '24/7', label: 'Silent protection' },
];

export default function Home() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, source: 'homepage', product: 'Anvaya Smart' }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
    toast({ title: 'You\'re on the list!', description: 'We\'ll WhatsApp you your early access details within 24 hours.' });
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] py-20 sm:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Early Access Open — First 100 families save ₹2,000
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-foreground leading-tight">
                Because every<br />
                <span className="text-primary">breath matters.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 leading-relaxed">
                Smart Care. Gentle Beginnings.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Anvaya Smart monitors your baby's breathing, cries, SpO2, heart rate, and temperature — completely contactlessly. No wearables. No stress. Just peace of mind.
              </p>
              <div className="flex gap-4 flex-wrap mb-6">
                <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white">
                  <Link href="/early-access">Get Early Access — Save ₹2,000 <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5">
                  <Link href="/anvaya">Explore Products</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">No payment now · 30-day money-back guarantee · Free shipping across India</p>
            </div>
            <div className="relative h-80 lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/anvaya-brand.png" alt="Anvaya Smart baby monitor — contactless AI baby wellness pod" fill className="object-cover object-right-top" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-primary mb-1">{s.n}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
              <Image src="/anvaya-brand.png" alt="Mother and baby — Anvaya Smart parenting trust" fill className="object-cover object-left-bottom" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Parenting is built on trust.</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                We believe every parent deserves confidence and calm — day and night. That's why we create intelligent, contact-free monitoring systems that understand your baby's well-being without intrusion or wearables.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our technology listens, learns, and cares — so you can focus on what matters most.
              </p>
              <p className="text-lg font-semibold text-primary italic">Smarter care. Stronger connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built different. By design.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Three principles that make Anvaya Smart the most trusted baby monitor for Indian parents.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPillars.map(p => (
              <Card key={p.title} className="bg-white border-border/60 text-center hover:border-primary/30 transition-colors">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product lineup */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Our Products</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect Monitor for Your Family</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A solution for every stage of your parenting journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <Link key={p.name} href={p.href} className="group block">
                <div className={`rounded-2xl border p-6 h-full transition-all group-hover:shadow-md ${p.color} ${p.dark ? 'text-white' : ''}`}>
                  <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${p.badge}`}>
                    {p.popular ? '⭐ Most Popular' : p.name.split(' ')[1]}
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${p.dark ? 'text-white' : 'text-foreground'}`}>{p.name}</h3>
                  <p className={`text-sm font-medium mb-2 ${p.dark ? 'text-yellow-300' : 'text-primary'}`}>{p.tagline}</p>
                  <p className={`text-sm mb-4 ${p.dark ? 'text-gray-300' : 'text-muted-foreground'}`}>{p.desc}</p>
                  <ul className="space-y-2">
                    {p.features.map(f => (
                      <li key={f} className={`flex items-center gap-2 text-xs ${p.dark ? 'text-gray-300' : 'text-muted-foreground'}`}>
                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${p.dark ? 'text-yellow-300' : 'text-primary'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-5 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all ${p.dark ? 'text-yellow-300' : 'text-primary'}`}>
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              47 of 100 early access spots remaining
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Among the First 100 Families</h2>
            <p className="text-muted-foreground mb-8 text-lg">Join early access. Get ₹2,000 off, priority shipping, and a free 1-year app subscription.</p>
            {submitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
                <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-lg font-semibold text-primary">You're on the list!</p>
                <p className="text-muted-foreground mt-2">We'll WhatsApp you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required className="flex-1 bg-white" />
                <Input placeholder="WhatsApp number" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required className="flex-1 bg-white" />
                <Button type="submit" disabled={loading} className="shrink-0 bg-primary hover:bg-primary/90 text-white">
                  {loading ? 'Saving...' : 'Reserve Spot'}
                </Button>
              </form>
            )}
            {!submitted && <p className="text-xs text-muted-foreground mt-3">No payment now. We'll reach out with details before launch.</p>}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">While your baby sleeps, we watch over what matters most.</h2>
          <p className="text-white/80 text-lg mb-8">Breathing. Movement. Comfort. So you can rest easy, knowing they're safe.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              <Link href="/early-access">Reserve Now — ₹12,999</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
              <Link href="/anvaya">Explore All Products</Link>
            </Button>
          </div>
          <p className="text-white/60 text-sm mt-4">Free shipping · 30-day guarantee · EMI available</p>
        </div>
      </section>

    </div>
  );
}
