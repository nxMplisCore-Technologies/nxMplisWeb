'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Baby, User, HeartHandshake, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const careSegments = [
  {
    icon: Baby,
    title: 'Baby Care',
    description: 'Our journey begins here, where listening matters most. We help parents understand their baby\'s needs with clarity and calm.'
  },
  {
    icon: User,
    title: 'Adult Care',
    description: 'Future solutions will extend to proactive and non-intrusive monitoring to support adult wellness and independent living.'
  },
  {
    icon: HeartHandshake,
    title: 'Elder Care',
    description: 'We envision a future where technology supports graceful aging, providing dignity, safety, and connection for our elders.'
  }
];

const stats = [
  { number: '6', label: 'AI-powered signals monitored' },
  { number: '0', label: 'Things touching your baby' },
  { number: '100%', label: 'On-device privacy' },
  { number: '24/7', label: 'Quiet, continuous watch' },
];

export default function Home() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleEarlyAccess(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: 'You\'re on the list!',
        description: 'We\'ll WhatsApp you your early access details within 24 hours.',
      });
    }, 800);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-24 sm:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Early access badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-medium">
            <Sparkles className="w-4 h-4" />
            Early Access Open — First 100 families save ₹2,000
          </div>

          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
            Wellness technology, built to listen.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Anvaya Mini™ monitors your baby's breathing, cries, SpO2, and temperature — contactlessly, from beside the crib. So you can finally sleep.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg" className="gap-2">
              <Link href="/early-access">Get Early Access — Save ₹2,000 <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/anvaya">See How It Works</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No payment now · 30-day money-back guarantee · Free shipping across India</p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border/50 bg-card/30 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-primary mb-1">{s.number}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Focus Section */}
      <section id="wellness-focus" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Wellness Evolves With Life</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our long-term vision spans three core care segments, guided by a single philosophy: care begins with understanding, not intrusion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careSegments.map((segment) => (
              <Card key={segment.title} className="bg-card border-border/50 text-center">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <segment.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{segment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{segment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Anvaya Intro Section */}
      <section id="anvaya-intro" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src="https://picsum.photos/seed/anvaya-product/800/600" alt="Anvaya Mini product" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-2">Our Baby Care Product Line</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-headline mb-4">Anvaya Mini™</h3>
              <p className="text-lg text-muted-foreground mb-4">Babies communicate long before they speak. Anvaya translates their early signals — cries, sleep patterns, breathing, and movement — into insights that support confident caregiving.</p>
              <ul className="space-y-3 mb-8">
                {['Contactless cry analysis — hungry, tired, or uncomfortable', 'Breathing & SpO2 monitoring without any wearable', 'Sleep analysis that learns your baby\'s unique rhythms', 'Room & body temperature tracking'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 flex-wrap">
                <Button asChild size="lg">
                  <Link href="/early-access">Get Early Access — ₹12,999</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/anvaya">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Lead Capture */}
      <section id="early-access" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              47 of 100 early access spots taken
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Be Among the First 100 Families</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Join the early access programme. Get ₹2,000 off the launch price, priority shipping, and a free 1-year app subscription.
            </p>
            {submitted ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-8">
                <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-lg font-semibold text-primary">You're on the list!</p>
                <p className="text-muted-foreground mt-2">We'll WhatsApp you your early access details within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="flex-1"
                />
                <Input
                  placeholder="WhatsApp number"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  required
                  type="tel"
                  className="flex-1"
                />
                <Button type="submit" disabled={loading} className="shrink-0">
                  {loading ? 'Saving...' : 'Reserve Spot'}
                </Button>
              </form>
            )}
            {!submitted && (
              <p className="text-xs text-muted-foreground mt-3">No payment now. We'll reach out with details before launch.</p>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="cta" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/80 to-primary/50 rounded-lg p-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary-foreground mb-4">Ready to sleep again?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Early access pricing ends soon. Reserve your Anvaya Mini™ today and save ₹2,000 off the regular launch price.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-black">
                <Link href="/early-access">Reserve Now — ₹12,999</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-white border border-white/40 hover:bg-white/10">
                <Link href="/anvaya">Learn More First</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
