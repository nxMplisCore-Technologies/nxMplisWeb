'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Sparkles, ArrowRight, Star, Shield, Activity, Baby, GitBranch, Heart, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const features = [
  { icon: Baby, label: 'Cry analysis', sub: 'Hungry, tired, or uncomfortable' },
  { icon: GitBranch, label: 'Breathing monitor', sub: 'Contactless, continuous' },
  { icon: Activity, label: 'SpO2 tracking', sub: 'No wearable needed' },
  { icon: Heart, label: 'Temperature sensing', sub: 'Room & body' },
  { icon: BrainCircuit, label: 'Sleep analysis', sub: 'Learns your baby\'s rhythms' },
  { icon: Shield, label: 'On-device privacy', sub: 'Data never leaves the pod' },
];

const included = [
  'Anvaya Mini™ pod',
  '1-year premium app subscription (free)',
  'Magnetic mount + USB-C power',
  'Priority shipping across India',
  '30-day money-back guarantee',
  'WhatsApp onboarding support',
];

const trust = [
  'Nothing touches your baby\'s skin',
  'No camera — radar + infrared sensing',
  'Works in complete darkness',
  'No subscription required to monitor',
];

export default function EarlyAccessPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [babyAge, setBabyAge] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({ title: "You're reserved!", description: "We'll WhatsApp you your early access details within 24 hours." });
    }, 900);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-6 text-xs text-primary font-medium">
                <Sparkles className="w-3 h-3" />
                47 of 100 early access spots remaining
              </div>

              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Your baby takes{' '}
                <span className="text-primary">12,000 breaths</span>{' '}
                while they sleep.
              </h1>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Anvaya Mini™ monitors every one — along with cries, SpO2, sleep patterns, and temperature — completely contactlessly. Nothing on your baby's skin. Just quiet intelligence from beside the crib.
              </p>
              <p className="text-lg font-medium mb-8">
                So you can finally sleep, knowing.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map(f => (
                  <div key={f.label} className="flex items-start gap-3 bg-card/50 rounded-lg p-3 border border-border/50">
                    <f.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{f.label}</div>
                      <div className="text-xs text-muted-foreground">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="space-y-2 mb-8">
                {trust.map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {t}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <span>Loved by our first parent beta testers</span>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-card border border-primary/30 rounded-2xl p-8">
                {/* Price block */}
                <div className="text-center mb-6 pb-6 border-b border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Early Access Price</p>
                  <div className="flex items-end justify-center gap-3">
                    <span className="text-5xl font-bold text-primary">₹12,999</span>
                    <span className="text-xl text-muted-foreground line-through mb-1">₹19,999</span>
                  </div>
                  <p className="text-sm text-primary font-medium mt-1">You save ₹7,000</p>
                  <p className="text-xs text-muted-foreground mt-1">or ₹1,083/month · 0% EMI · 12 months</p>
                </div>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                    <p className="text-muted-foreground text-sm">We'll WhatsApp you within 24 hours with your early access details and payment link.</p>
                    <p className="text-xs text-muted-foreground mt-4">No payment was charged. We'll confirm everything via WhatsApp first.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-headline text-lg font-bold mb-1">Reserve your spot</h3>
                    <p className="text-sm text-muted-foreground mb-5">No payment now. We'll reach out on WhatsApp to confirm your order.</p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <Input
                        placeholder="Your name *"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="WhatsApp number *"
                        type="tel"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="City (e.g. Hyderabad)"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                      />
                      <select
                        value={babyAge}
                        onChange={e => setBabyAge(e.target.value)}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Baby's age / due date</option>
                        <option value="expecting">Currently expecting</option>
                        <option value="0-3">0–3 months</option>
                        <option value="3-6">3–6 months</option>
                        <option value="6-12">6–12 months</option>
                        <option value="12-24">12–24 months</option>
                      </select>

                      <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                        {loading ? 'Reserving...' : <>Reserve My Spot — Save ₹7,000 <ArrowRight className="w-4 h-4" /></>}
                      </Button>
                    </form>

                    {/* What's included */}
                    <div className="mt-6 pt-5 border-t border-border/50">
                      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">What's included</p>
                      <ul className="space-y-2">
                        {included.map(item => (
                          <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Questions?{' '}
                <Link href="/contact" className="text-primary hover:underline">Chat with us</Link>
                {' '}or{' '}
                <Link href="/anvaya" className="text-primary hover:underline">learn more about Anvaya</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
