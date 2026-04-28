'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, ArrowRight, Sparkles, ChevronDown, Activity, Baby, GitBranch, Heart, Shield, BrainCircuit, Wind, Video, Music, Thermometer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const products = [
  {
    id: 'core',
    name: 'Anvaya CORE',
    subtitle: 'Simple. Smart. Reliable.',
    desc: 'The perfect everyday baby monitor for modern parents. Essential monitoring for complete peace of mind.',
    price: '₹8,999',
    image: 'https://picsum.photos/seed/anvaya-core-warm/600/600',
    color: 'from-amber-50 to-orange-50',
    accent: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    features: [
      { icon: Video, label: 'Clear HD Video', desc: 'Live view anytime, anywhere' },
      { icon: Baby, label: 'Cry Detection', desc: 'Instant alerts when baby needs you' },
      { icon: Music, label: 'Built-in Lullabies', desc: 'Soothe your baby with comforting sounds' },
      { icon: Thermometer, label: 'Temperature Monitoring', desc: 'Keep environment safe and comfortable' },
    ],
    seo: 'Best basic baby monitor India, HD baby camera, baby cry detector',
  },
  {
    id: 'sense',
    name: 'Anvaya SENSE',
    subtitle: 'Understand More Than Just Sound.',
    desc: 'Advanced monitoring for your baby\'s breathing, heart rate, and overall well-being. Bridges the gap between physical and emotional care.',
    price: '₹12,999',
    image: 'https://picsum.photos/seed/anvaya-sense-green/600/600',
    color: 'from-emerald-50 to-teal-50',
    accent: 'text-primary',
    badge: 'bg-primary/10 text-primary',
    popular: true,
    features: [
      { icon: Activity, label: 'Breathing & Heart Rate', desc: 'Contact-free monitoring, continuous insights' },
      { icon: Baby, label: 'Cry Analysis', desc: 'Understands hungry, tired, or uncomfortable' },
      { icon: Wind, label: 'Air Quality Alerts', desc: 'Keeps baby\'s environment healthy' },
      { icon: Shield, label: 'Face Cover Detection', desc: 'Safety alert if baby\'s face is covered' },
    ],
    seo: 'Baby breathing monitor India, baby heart rate monitor contactless, best smart baby monitor',
  },
  {
    id: 'pulse',
    name: 'Anvaya PULSE',
    subtitle: 'Stay Connected to Every Moment.',
    desc: 'A smarter way to monitor your baby\'s environment, activity, and well-being. Real-time alerts for every change.',
    price: '₹15,999',
    image: 'https://picsum.photos/seed/anvaya-pulse-blue/600/600',
    color: 'from-blue-50 to-sky-50',
    accent: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
    features: [
      { icon: Activity, label: 'Activity Tracking', desc: 'Smart monitoring of movement and activity' },
      { icon: Thermometer, label: 'Temp & Humidity', desc: 'Ensure the perfect sleep environment' },
      { icon: Shield, label: 'Safety Alerts', desc: 'Alerts for unusual or risky situations' },
      { icon: GitBranch, label: 'Real-Time Alerts', desc: 'Get notified of changes immediately' },
    ],
    seo: 'Baby activity monitor, smart nursery monitor India, baby environment monitor',
  },
  {
    id: 'omni',
    name: 'Anvaya OMNI',
    subtitle: 'Total Awareness. Complete Peace of Mind.',
    desc: '360° intelligent monitoring powered by Predictive AI. The highest level of care for parents who want everything.',
    price: '₹19,999',
    image: 'https://picsum.photos/seed/anvaya-omni-dark/600/600',
    color: 'from-gray-900 to-gray-800',
    accent: 'text-yellow-400',
    badge: 'bg-yellow-400/20 text-yellow-300',
    dark: true,
    features: [
      { icon: Activity, label: 'Breathing, Heart Rate & Temp', desc: 'Continuous contactless vital monitoring' },
      { icon: BrainCircuit, label: 'Predictive Risk Alerts', desc: 'AI flags issues before they escalate' },
      { icon: Heart, label: '360° Room Coverage', desc: 'Full room awareness, no blind spots' },
      { icon: Shield, label: 'AI Insights & Reports', desc: 'Weekly health summaries for your doctor' },
    ],
    seo: '360 degree baby monitor, AI baby monitor India, predictive baby health monitor',
  },
];

const faqs = [
  { q: 'How does Anvaya monitor without touching my baby?', a: 'Anvaya uses radar-based motion sensing, infrared thermal imaging, and AI acoustic analysis — all passively, from beside the crib. Nothing is attached to or placed on your baby.' },
  { q: 'Is it safe to use near a newborn?', a: 'Completely safe. Anvaya emits no radiation, no harmful signals, and no bright lights. It is designed to be invisible to your baby in every way.' },
  { q: 'What is the difference between SENSE and OMNI?', a: 'SENSE focuses on breathing, heart rate, cry analysis and air quality. OMNI adds Predictive AI, 360° room coverage, and detailed health reports — ideal for parents who want the most complete picture of their baby\'s wellness.' },
  { q: 'Does it work in complete darkness?', a: 'Yes. Anvaya uses infrared and radar sensing, not standard cameras. Darkness is no barrier — it works identically day and night.' },
  { q: 'What happens to my baby\'s health data?', a: 'All processing happens on the device itself. No video or health data is ever sent to external servers. Your family\'s privacy is a core design principle, not an afterthought.' },
  { q: 'Which model should I start with?', a: 'For newborns, we recommend SENSE — it gives you breathing monitoring, cry analysis, and air quality. For parents who want maximum peace of mind, OMNI is the gold standard. CORE is perfect if you need simple, reliable monitoring at an accessible price.' },
];

const included = ['Anvaya Smart pod', 'Magnetic mounting bracket', 'USB-C power cable & adapter', 'Anvaya app (iOS & Android)', '1-year premium app subscription', 'Setup guide'];

export default function AnvayaPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, city, source: 'anvaya-page', product: 'Anvaya Smart' }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
    toast({ title: "You're reserved!", description: "We'll WhatsApp you your early access details within 24 hours." });
  }

  return (
    <div className="bg-background text-foreground">

      {/* Hero */}
      <section className="relative text-center py-24 sm:py-32 bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee]">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Early Access Open — First 100 families save ₹2,000
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">Anvaya Smart™</h1>
          <p className="text-2xl md:text-3xl font-semibold text-primary mb-4">Smart Care. Gentle Beginnings.</p>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            Four models. One promise. Your baby's breathing, cries, SpO2, heart rate, and temperature — monitored contactlessly, quietly, always.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary/90" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore All Models <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 text-primary" onClick={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}>
              Reserve Early Access
            </Button>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Parenting is built on trust.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe every parent deserves confidence and calm. Our technology listens, learns, and cares — so you can focus on what matters most. No wearables. No stress. Just peace of mind.
          </p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Our Smart Baby Monitoring Family</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A solution for every stage of your parenting journey.</h2>
            <p className="text-muted-foreground text-lg">Trusted technology. Loved by parents.</p>
          </div>
          <div className="space-y-12">
            {products.map((p, i) => (
              <div key={p.id} id={p.id} className={`rounded-3xl bg-gradient-to-br ${p.color} overflow-hidden`}>
                <div className={`grid lg:grid-cols-2 gap-0 items-center`}>
                  <div className={`p-10 ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                    <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${p.badge}`}>
                      {p.popular ? '⭐ Most Popular' : p.name}
                    </div>
                    <h3 className={`text-3xl font-bold mb-2 ${p.dark ? 'text-white' : 'text-foreground'}`}>{p.name}</h3>
                    <p className={`text-lg font-semibold mb-3 ${p.accent}`}>{p.subtitle}</p>
                    <p className={`mb-6 leading-relaxed ${p.dark ? 'text-gray-300' : 'text-muted-foreground'}`}>{p.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {p.features.map(f => (
                        <div key={f.label} className={`flex items-start gap-3 p-3 rounded-xl ${p.dark ? 'bg-white/5' : 'bg-white/70'}`}>
                          <f.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${p.dark ? 'text-yellow-400' : 'text-primary'}`} />
                          <div>
                            <div className={`text-sm font-semibold ${p.dark ? 'text-white' : 'text-foreground'}`}>{f.label}</div>
                            <div className={`text-xs ${p.dark ? 'text-gray-400' : 'text-muted-foreground'}`}>{f.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className={`text-3xl font-bold ${p.dark ? 'text-white' : 'text-foreground'}`}>{p.price}</span>
                      <Button asChild className={`gap-2 ${p.dark ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-primary text-white hover:bg-primary/90'}`}>
                        <Link href="/early-access">Reserve Early Access <ArrowRight className="w-4 h-4" /></Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-72 lg:h-full min-h-72">
                    <Image src={p.image} alt={`${p.name} contactless baby monitor`} fill className="object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve form */}
      <section id="reserve" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-4 text-sm text-primary font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                47 of 100 early access spots remaining
              </div>
              <h2 className="text-3xl font-bold mb-2">Reserve Your Spot</h2>
              <p className="text-muted-foreground">Early access price · No payment now · We'll WhatsApp you details</p>
            </div>
            {submitted ? (
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
                <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-lg font-semibold text-primary">Spot reserved!</p>
                <p className="text-muted-foreground mt-2">We'll WhatsApp you within 24 hours with early access details.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} required className="bg-[#faf8f5]" />
                <Input placeholder="WhatsApp number *" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required className="bg-[#faf8f5]" />
                <Input placeholder="City (e.g. Hyderabad)" value={city} onChange={e => setCity(e.target.value)} className="bg-[#faf8f5]" />
                <Button type="submit" size="lg" className="w-full gap-2 bg-primary text-white hover:bg-primary/90" disabled={loading}>
                  {loading ? 'Saving...' : <>Reserve My Early Access Spot <ArrowRight className="w-4 h-4" /></>}
                </Button>
                <p className="text-xs text-muted-foreground text-center">No payment now · Free shipping · 30-day money-back guarantee</p>
              </form>
            )}
            <div className="mt-6 pt-5 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">What's included with every model</p>
              <ul className="grid grid-cols-2 gap-2">
                {included.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-border rounded-xl overflow-hidden">
                <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={cn('w-5 h-5 text-muted-foreground shrink-0 transition-transform', openFaq === i && 'rotate-180')} />
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-muted-foreground leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Because every breath matters.</h2>
          <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">From the first night to every milestone ahead — we'll be here to help you feel confident, calm, and connected.</p>
          <p className="text-lg font-semibold text-white/90 italic mb-8">Anvaya Smart — Peace of mind for every parent. A safer world for every baby.</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2">
            <Link href="/early-access">Get Early Access — Save ₹2,000 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
