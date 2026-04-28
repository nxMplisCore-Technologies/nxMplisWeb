'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Heart, Shield, GitBranch, BrainCircuit, Baby, Activity, ChevronDown, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Baby,
    title: 'Cry Analysis',
    description: 'AI distinguishes between a hungry cry, a tired cry, and an uncomfortable cry — so you respond with confidence.',
  },
  {
    icon: GitBranch,
    title: 'Breathing Patterns',
    description: 'Monitors subtle changes in breathing rhythms contactlessly, offering constant reassurance.',
  },
  {
    icon: Activity,
    title: 'SpO2 Monitoring',
    description: 'Tracks blood oxygen saturation without any wearable or clip — a critical safety layer, entirely contactless.',
  },
  {
    icon: Heart,
    title: 'Temperature Sensing',
    description: 'Keeps track of room and body temperature fluctuations to ensure your baby\'s comfort.',
  },
  {
    icon: BrainCircuit,
    title: 'Sleep Analysis',
    description: 'Learns your baby\'s personal sleep cycles and identifies patterns for more restful nights.',
  },
  {
    icon: Shield,
    title: 'Moment Capture',
    description: 'Quietly captures special moments — first smiles, peaceful sleeps — without disturbing them.',
  },
];

const benefits = [
  { title: 'No Wearables', description: "Anvaya is completely contactless. Nothing touches your baby's skin." },
  { title: 'No Harsh Lights', description: 'Designed to be unobtrusive, with no bright lights to disturb sleep.' },
  { title: 'Privacy First', description: "All processing happens on the device. Your family's data stays private." },
  { title: '30-Day Guarantee', description: "If you're not completely happy, we'll refund every rupee. No questions." },
];

const faqs = [
  { q: 'How does Anvaya monitor my baby without touching them?', a: 'Anvaya uses a combination of radar-based motion sensing, infrared thermal imaging, and AI acoustic analysis. It sits on a shelf or nightstand beside the crib and detects micro-movements, breathing patterns, and sound — all without any physical contact.' },
  { q: 'Is it safe to use near a sleeping baby?', a: 'Absolutely. Anvaya uses passive sensing technology — it emits no radiation, no harmful signals, and no bright lights. It is designed to be completely invisible to your baby.' },
  { q: 'What is SpO2 and why does it matter?', a: "Blood oxygen saturation (SpO2) is one of the most important indicators of infant health. A healthy baby's SpO2 should stay above 95%. Anvaya monitors this passively, so you're alerted if anything changes — without putting a clip or band on your baby." },
  { q: 'Does it work in the dark?', a: 'Yes. Anvaya is designed specifically for dark environments. It uses infrared and radar sensing, not cameras, so darkness is no barrier to accurate monitoring.' },
  { q: 'What happens to the data?', a: "All signal processing happens on the device itself. No video, audio, or health data is sent to external servers. Your family's privacy is a core design principle, not an afterthought." },
  { q: 'What age range is Anvaya designed for?', a: 'Anvaya is optimised for newborns to 24 months — the period when contactless monitoring and sleep insights matter most. The AI continues to adapt as your baby grows.' },
];

const included = [
  'Anvaya Mini™ pod', 'Magnetic mounting bracket', 'USB-C power cable & adapter',
  'Anvaya app (iOS & Android)', '1-year premium app subscription', 'Quick setup guide',
];

export default function AnvayaPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({ title: "You're reserved!", description: "We'll WhatsApp you your early access details within 24 hours." });
    }, 800);
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative text-center py-24 sm:py-32 md:py-40 bg-card/30">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="https://picsum.photos/seed/baby-hero/1800/1000" alt="A peaceful nursery" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-medium">
            <Sparkles className="w-4 h-4" />
            Early Access Open — First 100 families save ₹2,000
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">Anvaya Mini™</h1>
          <p className="text-2xl md:text-3xl font-headline text-foreground mb-6">From signals to reassurance.</p>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            AI that monitors your baby's breathing, cries, SpO2, and temperature — contactlessly, quietly, without ever touching your baby.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="gap-2" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Reserve Early Access — ₹12,999 <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              See All Features
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No payment now · Free shipping · 30-day guarantee</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Babies speak long before they talk.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Through cries. Through breath. Through movement. Through sleep. Parents listen — but often have to guess. Anvaya was created to bridge that gap. To turn uncertainty into understanding. To support instinct with intelligence.
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">6 signals. One quiet pod.</h2>
            <p className="text-lg text-muted-foreground">Everything Anvaya listens to, so you don't have to.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center bg-card border-border/50 hover:border-primary/30 transition-colors">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calm Not Control */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src="https://picsum.photos/seed/anvaya-device/600/800" alt="Anvaya Mini device in a nursery" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Calm, Not Control</h2>
              <p className="text-lg text-muted-foreground mb-10">Anvaya doesn't alarm. It reassures. It quietly observes, learns patterns, and notifies you only when something truly needs attention. So nights feel softer, decisions feel clearer, and care feels more confident.</p>
              <h3 className="text-2xl font-bold font-headline mb-6">Designed for Gentle Parenting</h3>
              <ul className="space-y-4">
                {benefits.map(benefit => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-last relative h-96 rounded-lg overflow-hidden">
              <Image src="https://picsum.photos/seed/baby-learning/800/600" alt="AI learning patterns" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Intelligence That Grows With Your Baby</h2>
              <p className="text-lg text-muted-foreground">Every baby is unique. Anvaya learns your baby's personal rhythms, patterns, and signals over time — becoming more intuitive, more personalised, and more helpful with each passing day.</p>
              <p className="mt-4 text-xl font-semibold">Understanding deepens. Confidence grows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents/Caregivers/Doctors */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">For Parents. For Caregivers. For Doctors.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">Anvaya supports early awareness and informed conversations, without replacing human care.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
            <div className="bg-card p-6 rounded-lg"><strong className="text-primary">For parents:</strong> peace of mind.</div>
            <div className="bg-card p-6 rounded-lg"><strong className="text-primary">For caregivers:</strong> clarity.</div>
            <div className="bg-card p-6 rounded-lg"><strong className="text-primary">For doctors:</strong> meaningful insights.</div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-4 text-sm text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              47 of 100 early access spots remaining
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Simple, Honest Pricing</h2>
            <p className="text-muted-foreground text-lg">One price. Everything included. No subscription required to monitor.</p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-card border border-primary/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Early Access</div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-5xl font-bold text-primary">₹12,999</span>
                <span className="text-2xl text-muted-foreground line-through mb-1">₹19,999</span>
              </div>
              <p className="text-muted-foreground mb-2">or <strong className="text-foreground">₹1,083/month</strong> for 12 months (0% EMI via Razorpay)</p>
              <p className="text-xs text-muted-foreground mb-8">You save ₹7,000. Price goes up once early access closes.</p>

              <h3 className="font-semibold mb-4">What's included</h3>
              <ul className="space-y-3 mb-8">
                {included.map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                <span className="text-sm text-muted-foreground ml-1">First families love it</span>
              </div>

              {submitted ? (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-primary">Spot reserved!</p>
                  <p className="text-sm text-muted-foreground mt-1">We'll WhatsApp you within 24 hours with next steps.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                  <Input placeholder="WhatsApp number" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
                  <Input placeholder="City (e.g. Hyderabad)" value={city} onChange={e => setCity(e.target.value)} />
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? 'Reserving...' : <>Reserve My Early Access Spot <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">No payment now · We'll contact you before charging anything</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-card/80 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={cn('w-5 h-5 text-muted-foreground shrink-0 transition-transform', openFaq === i && 'rotate-180')} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-muted-foreground leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 sm:py-32 bg-gradient-to-t from-primary/20 via-transparent to-transparent">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-muted-foreground mb-8">
            We believe parenting doesn't need more noise. It needs better listening.<br />
            We believe every baby deserves to be understood. And every parent deserves to feel supported.
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-4">Anvaya Mini™</h2>
          <p className="text-2xl md:text-3xl font-headline text-foreground mb-8">When you understand, you care better.</p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/early-access">Get Early Access — Save ₹2,000 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
