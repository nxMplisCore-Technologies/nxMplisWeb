'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Sparkles, ArrowRight, Star, Activity, Baby, GitBranch, Heart, Shield, BrainCircuit } from 'lucide-react';
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
  'Anvaya Smart pod', '1-year premium app subscription (free)',
  'Magnetic mount + USB-C power', 'Priority shipping across India',
  '30-day money-back guarantee', 'WhatsApp onboarding support',
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, city, babyAge, source: 'early-access', product: 'Anvaya Smart' }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
    toast({ title: "You're reserved!", description: "We'll WhatsApp you your early access details within 24 hours." });
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-6 text-xs text-primary font-medium">
                <Sparkles className="w-3 h-3" />
                47 of 100 early access spots remaining
              </div>
              <h1 className="font-bold text-4xl md:text-5xl tracking-tight mb-4 leading-tight text-foreground">
                Your baby takes{' '}
                <span className="text-primary">12,000 breaths</span>{' '}
                while they sleep.
              </h1>
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                Anvaya Smart monitors every one — along with cries, SpO2, sleep patterns, and temperature — completely contactlessly.
              </p>
              <p className="text-lg font-semibold text-foreground mb-8">So you can finally sleep, knowing.</p>

              {/* Brand image */}
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-md" style={{minHeight:"220px"}}>
                <Image src="/anvaya-product.webp" alt="Anvaya Smart contactless AI baby monitor India — breathing, SpO2 and cry monitoring" fill className="object-cover object-right-top" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map(f => (
                  <div key={f.label} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-[#e2dbd4]">
                    <f.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold">{f.label}</div>
                      <div className="text-xs text-muted-foreground">{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                {trust.map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />{t}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                <span>Loved by our first parent beta testers</span>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white border border-[#e2dbd4] rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-6 pb-6 border-b border-[#f0ece6]">
                  <p className="text-sm text-muted-foreground mb-2">Early Access Price</p>
                  <div className="flex items-end justify-center gap-3">
                    <span className="text-5xl font-bold text-primary">₹12,999</span>
                    <span className="text-xl text-muted-foreground line-through mb-1">₹19,999</span>
                  </div>
                  <p className="text-sm font-semibold mt-1" style={{color:'#e8957a'}}>You save ₹7,000</p>
                  <p className="text-xs text-muted-foreground mt-1">or ₹1,083/month · 0% EMI · 12 months</p>
                </div>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                    <p className="text-muted-foreground text-sm">We'll WhatsApp you within 24 hours with your early access details.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-lg mb-1">Reserve your spot</h3>
                    <p className="text-sm text-muted-foreground mb-5">No payment now. We'll confirm via WhatsApp.</p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <Input placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} required className="bg-[#faf8f5] border-[#e2dbd4]" />
                      <Input placeholder="WhatsApp number *" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required className="bg-[#faf8f5] border-[#e2dbd4]" />
                      <Input placeholder="City (e.g. Hyderabad)" value={city} onChange={e => setCity(e.target.value)} className="bg-[#faf8f5] border-[#e2dbd4]" />
                      <select value={babyAge} onChange={e => setBabyAge(e.target.value)}
                        className="w-full h-10 rounded-md border border-[#e2dbd4] bg-[#faf8f5] px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Baby's age / due date</option>
                        <option value="expecting">Currently expecting</option>
                        <option value="0-3">0–3 months</option>
                        <option value="3-6">3–6 months</option>
                        <option value="6-12">6–12 months</option>
                        <option value="12-24">12–24 months</option>
                      </select>
                      <Button type="submit" size="lg" className="w-full gap-2 bg-primary text-white hover:bg-primary/90" disabled={loading}>
                        {loading ? 'Reserving...' : <>Reserve My Spot — Save ₹7,000 <ArrowRight className="w-4 h-4" /></>}
                      </Button>
                    </form>
                    <div className="mt-6 pt-5 border-t border-[#f0ece6]">
                      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">What's included</p>
                      <ul className="space-y-2">
                        {included.map(item => (
                          <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4">
                Questions? <Link href="/contact" className="text-primary hover:underline">Chat with us</Link> or <Link href="/anvaya" className="text-primary hover:underline">learn more about Anvaya</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
