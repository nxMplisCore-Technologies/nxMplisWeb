'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp, Activity, Baby, GitBranch, Heart, Wind, Video, Music, Thermometer, BrainCircuit, Zap, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const products = [
  {
    id: 'core',
    name: 'CORE',
    fullName: 'Anvaya CORE',
    tagline: 'Simple. Smart. Reliable.',
    desc: 'Everything a new parent needs. HD video, cry detection, lullabies and temperature monitoring — in one quietly intelligent baby wellness pod.',
    price: 8999,
    mrp: 14999,
    image: '/anvaya-core-1.jpg',
    badge: null,
    color: '#d97706',
    bgLight: '#fffbeb',
    features: [
      { icon: Video, text: 'HD Video — live view from anywhere' },
      { icon: Baby, text: 'Cry detection — 5 cry types identified' },
      { icon: Music, text: 'Built-in lullabies & white noise' },
      { icon: Thermometer, text: 'Room temperature monitoring' },
    ],
  },
  {
    id: 'sense',
    name: 'SENSE',
    fullName: 'Anvaya SENSE',
    tagline: 'The Wellness Pod That Watches Every Breath.',
    desc: 'India\'s most loved baby wellness pod. Tracks breathing, SpO₂, heart rate and cry type — completely contactlessly. Nothing touches your baby. Nothing is missed.',
    price: 12999,
    mrp: 19999,
    image: '/anvaya-sense.jpg',
    badge: '⭐ Best Seller',
    color: '#4a7c6f',
    bgLight: '#f0faf6',
    features: [
      { icon: Activity, text: 'Breathing & Heart Rate — contactless' },
      { icon: Baby, text: 'Cry analysis — hungry / tired / pain / discomfort' },
      { icon: Wind, text: 'Air quality & humidity alerts' },
      { icon: Shield, text: 'Face cover detection — safety alert' },
    ],
  },
  {
    id: 'pulse',
    name: 'PULSE',
    fullName: 'Anvaya PULSE',
    tagline: 'Stay Connected to Every Moment.',
    desc: 'Advanced environment and wellness monitoring. Know your baby\'s complete world — temperature, humidity, movement and real-time safety alerts.',
    price: 15999,
    mrp: 22999,
    image: '/anvaya-pulse.jpg',
    badge: null,
    color: '#3b82f6',
    bgLight: '#eff6ff',
    features: [
      { icon: Activity, text: 'Activity & movement tracking' },
      { icon: Thermometer, text: 'Temp & humidity — perfect sleep environment' },
      { icon: Shield, text: 'Instant safety alerts' },
      { icon: Zap, text: 'Real-time push notifications' },
    ],
  },
  {
    id: 'omni',
    name: 'OMNI',
    fullName: 'Anvaya OMNI',
    tagline: 'Total Awareness. Complete Peace of Mind.',
    desc: 'India\'s most advanced baby wellness pod. 360° intelligent monitoring with Predictive AI — weekly health reports, SpO₂ tracking, and alerts before problems arise.',
    price: 19999,
    mrp: 29999,
    image: '/anvaya-omni.jpg',
    badge: '🏆 Most Advanced',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    features: [
      { icon: Activity, text: 'Breathing, Heart Rate & SpO₂ — all contactless' },
      { icon: BrainCircuit, text: 'Predictive AI — alerts before risk escalates' },
      { icon: GitBranch, text: '360° room coverage' },
      { icon: Heart, text: 'Weekly AI baby health reports' },
    ],
  },
];

const reviews = [
  { name: 'Priya M.', city: 'Bangalore', rating: 5, text: 'Finally slept through the night knowing Anvaya is watching. The cry analysis is incredibly accurate — it identified a hungry cry before I even got up. A must-have baby wellness pod for new parents.', product: 'SENSE' },
  { name: 'Rahul K.', city: 'Mumbai', rating: 5, text: 'Worth every rupee. The breathing monitor gave us so much peace of mind in the first two months. Setup took literally 3 minutes. The SpO₂ monitoring alone is worth it.', product: 'SENSE' },
  { name: 'Ananya S.', city: 'Hyderabad', rating: 5, text: 'The sleep score feature is genius. We knew exactly when our baby hit deep sleep and stopped tiptoeing around! The weekly health report is eye-opening.', product: 'OMNI' },
  { name: 'Meera R.', city: 'Chennai', rating: 5, text: 'As a first-time mother, I was anxious every night. Anvaya OMNI changed everything — real-time breathing alerts, SpO₂ tracking, and AI insights. Best investment we made for our newborn.', product: 'OMNI' },
];

const faqs = [
  { q: 'Does anything touch my baby?', a: 'No. Anvaya is completely contactless. The wellness pod sits beside the crib on a shelf or table. It uses radar and infrared sensing — nothing attaches to your baby\'s skin, making it the safest baby wellness pod available in India.' },
  { q: 'When will I receive my order?', a: 'Anvaya Smart is currently in pre-order. Once your spot is confirmed, we\'ll reach out via WhatsApp with your estimated dispatch date. Delivery across India takes 3–7 working days after dispatch. Free shipping on all orders.' },
  { q: 'What if I\'m not happy?', a: '30-day money-back guarantee — no questions asked. If Anvaya doesn\'t give you peace of mind, we\'ll refund every rupee including return shipping.' },
  { q: 'Which model should I buy?', a: 'SENSE is our most popular for new parents — it covers breathing, SpO2, cry analysis and sleep. If you want the complete picture with AI health reports, go with OMNI.' },
  { q: 'Is my data private?', a: 'All processing happens on the device. No health data, video or audio is ever sent to external servers. Your family\'s privacy is a design principle, not an afterthought.' },
];

const included = ['Anvaya Smart pod', 'Magnetic mounting bracket', 'USB-C cable + adapter', 'Anvaya app (iOS & Android)', '1-year premium subscription FREE', 'Quick setup guide'];

export default function AnvayaPage() {
  const { toast } = useToast();
  const [selected, setSelected] = useState(1); // SENSE default
  const [qty, setQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  const p = products[selected];
  const discount = Math.round((1 - p.price / p.mrp) * 100);

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp: phone, source: 'anvaya-product-page', product: p.fullName }),
      });
    } catch (_) {}
    setLoading(false);
    setBooked(true);
    toast({ title: 'Seat booked! 🎉', description: `We'll WhatsApp you within 24 hours with your ${p.fullName} details.` });
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-[#e2dbd4] bg-white">
        <div className="container mx-auto px-4 py-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>›</span>
          <Link href="/anvaya" className="hover:text-primary">Baby Wellness Pods</Link>
          <span>›</span>
          <span className="text-foreground font-medium">{p.fullName}</span>
        </div>
      </div>

      {/* ── Main product layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">

          {/* LEFT — Image + model tabs + features */}
          <div>
            {/* Model selector tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {products.map((prod, i) => (
                <button
                  key={prod.id}
                  onClick={() => setSelected(i)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all',
                    selected === i
                      ? 'border-current shadow-md scale-105'
                      : 'border-[#e2dbd4] bg-white text-muted-foreground hover:border-gray-300'
                  )}
                  style={selected === i ? { borderColor: prod.color, color: prod.color, background: prod.bgLight } : {}}
                >
                  {prod.badge && <span className="text-[10px]">{prod.badge.split(' ')[0]}</span>}
                  Anvaya {prod.name}
                  {prod.badge && <span className="text-[10px] hidden sm:inline opacity-70">{prod.badge.split(' ').slice(1).join(' ')}</span>}
                </button>
              ))}
            </div>

            {/* Product Image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#f5f0e8] border border-[#e2dbd4] shadow-sm" style={{aspectRatio: '16/9', minHeight: '260px'}}>
              <Image
                src={p.image}
                alt={`${p.fullName} — AI baby wellness pod India`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 55vw"
                priority
              />
              {p.badge && (
                <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg" style={{background: p.color}}>
                  {p.badge}
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-medium text-foreground shadow">
                ✓ Nothing touches baby's skin
              </div>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Truck, text: 'Free shipping', sub: 'All India' },
                { icon: RefreshCw, text: '30-day returns', sub: 'No questions' },
                { icon: Shield, text: 'Safe for newborns', sub: 'Clinically safe. Zero emissions.' },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-2.5 bg-white rounded-xl p-3 border border-[#e2dbd4]">
                  <t.icon className="w-4 h-4 shrink-0" style={{color: p.color}} />
                  <div>
                    <div className="text-xs font-semibold">{t.text}</div>
                    <div className="text-[10px] text-muted-foreground">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">What your {p.fullName} baby wellness pod monitors</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {p.features.map(f => (
                  <div key={f.text} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[#e2dbd4]">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{background: p.bgLight}}>
                      <f.icon className="w-4.5 h-4.5" style={{color: p.color, width: 18, height: 18}} />
                    </div>
                    <span className="text-sm font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-[#e2dbd4]">
              <h2 className="text-lg font-bold mb-4">What's in the box</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {included.map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold">Customer Reviews</h2>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="text-sm font-semibold ml-1">4.9</span>
                  <span className="text-xs text-muted-foreground">(47 reviews)</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-[#e2dbd4]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-semibold text-sm">{r.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{r.city}</span>
                      </div>
                      <div className="flex">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                    <div className="mt-2 text-[10px] font-semibold" style={{color: p.color}}>Verified purchase · Anvaya {r.product}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#e2dbd4] overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#faf8f5] transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-sm pr-4">{faq.q}</span>
                      {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-[#f0ece6] pt-3">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky buy panel */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-white rounded-2xl border border-[#e2dbd4] shadow-lg overflow-hidden">

              {/* Product name + rating */}
              <div className="p-6 border-b border-[#f0ece6]">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{color: p.color}}>Anvaya Smart</div>
                <h1 className="text-2xl font-bold mb-1">{p.fullName} — Baby Wellness Pod</h1>
                <p className="text-sm font-medium" style={{color: p.color}}>{p.tagline}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                  <span className="text-xs text-muted-foreground">4.9 · 47 verified reviews</span>
                </div>
              </div>

              {/* Price */}
              <div className="p-6 border-b border-[#f0ece6]">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-bold text-foreground">₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="text-lg text-muted-foreground line-through mb-0.5">₹{p.mrp.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-bold text-green-600 mb-0.5">{discount}% off</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">or <strong className="text-foreground">₹{Math.round(p.price/12).toLocaleString('en-IN')}/month</strong> · 0% EMI · 12 months</div>
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  In stock · Ships in 2 business days
                </div>
              </div>

              {/* Model compare */}
              <div className="px-6 pt-4 pb-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Choose your model</div>
                <div className="grid grid-cols-2 gap-2">
                  {products.map((prod, i) => (
                    <button
                      key={prod.id}
                      onClick={() => setSelected(i)}
                      className={cn(
                        'text-left p-2.5 rounded-xl border-2 transition-all',
                        selected === i ? 'border-current' : 'border-[#e2dbd4] hover:border-gray-300'
                      )}
                      style={selected === i ? {borderColor: prod.color, background: prod.bgLight} : {}}
                    >
                      <div className="text-xs font-bold" style={{color: selected === i ? prod.color : ''}}>{prod.name}</div>
                      <div className="text-xs text-muted-foreground">₹{prod.price.toLocaleString('en-IN')}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Book seat form */}
              <div className="p-6 pt-4">
                {booked ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-bold text-green-800">Seat booked! 🎉</div>
                    <div className="text-xs text-green-700 mt-1">We'll WhatsApp you within 24 hours with your early access details and payment link.</div>
                  </div>
                ) : (
                  <form onSubmit={handleBook} className="space-y-3">
                    <div className="text-sm font-bold text-foreground mb-1">Book your early access seat</div>
                    <div className="text-xs text-muted-foreground mb-3">No payment now · We'll confirm via WhatsApp first</div>
                    <Input
                      placeholder="Your name *"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="bg-[#faf8f5] border-[#e2dbd4] h-11"
                    />
                    <Input
                      placeholder="WhatsApp number *"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                      className="bg-[#faf8f5] border-[#e2dbd4] h-11"
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 text-base font-bold rounded-xl shadow-lg gap-2"
                      style={{background: p.color, color: '#fff'}}
                    >
                      {loading ? 'Booking...' : `Reserve My ${p.fullName} Pod — ₹0 Now`}
                    </Button>
                    <button
                      type="button"
                      className="w-full h-11 text-sm font-semibold rounded-xl border-2 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                      style={{borderColor: '#25D366', color: '#25D366'}}
                      onClick={() => window.open('https://wa.me/919876543210?text=Hi! I want to know more about Anvaya ' + p.name, '_blank')}
                    >
                      <Phone className="w-4 h-4" /> Chat on WhatsApp
                    </button>
                  </form>
                )}

                {/* Trust signals */}
                <div className="mt-4 space-y-2 pt-4 border-t border-[#f0ece6]">
                  {[
                    '✓ No payment charged now',
                    '✓ Free shipping across India',
                    '✓ 30-day money-back guarantee',
                    '✓ 1-year warranty included',
                  ].map(t => (
                    <div key={t} className="text-xs text-muted-foreground">{t}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compare models card */}
            <div className="mt-4 bg-white rounded-2xl border border-[#e2dbd4] p-5">
              <div className="text-sm font-bold mb-3">Not sure which model?</div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong className="text-amber-700">CORE</strong> — Basic monitoring, great value</div>
                <div><strong className="text-primary">SENSE</strong> — Breathing + SpO2 + Cry AI ⭐ Most popular</div>
                <div><strong className="text-blue-600">PULSE</strong> — Environment + Activity focus</div>
                <div><strong className="text-purple-700">OMNI</strong> — Everything + Predictive AI</div>
              </div>
              <Link href="/compare" className="text-xs text-primary hover:underline mt-3 block font-semibold">
                See full comparison →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
