'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp, Music, Zap, Brain, Moon, Heart, MessageCircle, Quote, Phone, Waves } from 'lucide-react';
import { LeadModalTrigger } from '@/components/ui/lead-modal-trigger';
import { cn } from '@/lib/utils';

const products = [
  {
    id: 'hush',
    name: 'HUSH',
    fullName: 'Soma HUSH',
    tagline: 'Fall asleep to 36 natural sounds. Nothing in your ears.',
    desc: 'Ultra-thin bone conduction speaker sits silently under your pillow. 36 professionally tuned natural sounds, Bluetooth 6.0, 8-hour battery — so you drift off without disturbing your partner.',
    price: 3499,
    mrp: 6999,
    badge: '⭐ Best Seller',
    color: '#5b4fcf',
    bgLight: '#f0eeff',
    emoji: '🎵',
    features: [
      { icon: Music, text: 'Bone conduction — zero ear insertion, zero damage' },
      { icon: Moon, text: '36 natural sounds — rain, ocean, forest & more' },
      { icon: Zap, text: 'Bluetooth 6.0 + TF card — no data needed' },
      { icon: Shield, text: '8-hour battery with 4-step auto shut-off timer' },
    ],
  },
  {
    id: 'nest',
    name: 'NEST',
    fullName: 'Soma NEST',
    tagline: 'The smart pillow that stops snoring before it starts.',
    desc: 'Memory foam anti-snore pillow with head-positioning science. Removable, washable cover. Pairs with HUSH for the ultimate sleep setup.',
    price: 5999,
    mrp: 9999,
    badge: null,
    color: '#2a7c6f',
    bgLight: '#edf7f5',
    emoji: '🛏️',
    features: [
      { icon: Moon, text: 'Anti-snore head positioning — reduces snoring by 60%+' },
      { icon: Shield, text: 'Memory foam — pressure-relief for neck & spine' },
      { icon: Heart, text: 'Removable & washable cover — hygienic always' },
      { icon: Waves, text: 'Pairs with HUSH speaker for complete sleep setup' },
    ],
  },
  {
    id: 'zen',
    name: 'ZEN',
    fullName: 'Soma ZEN',
    tagline: 'Calm your mind. Sleep like you used to.',
    desc: 'CES microcurrent ear clip uses gentle electrical stimulation to boost alpha waves and ease anxiety — clinically studied, non-drug, non-invasive. For adults who\'ve tried everything else.',
    price: 6999,
    mrp: 12999,
    badge: '🏆 Most Advanced',
    color: '#b45309',
    bgLight: '#fef9ee',
    emoji: '🧠',
    features: [
      { icon: Brain, text: 'CES microcurrent — stimulates alpha wave production' },
      { icon: Zap, text: '3 modes: Pulse · Wave · Mix (10–200Hz)' },
      { icon: Shield, text: 'Non-drug, non-invasive — safe for daily use' },
      { icon: Heart, text: 'Reduces anxiety, improves focus & sleep onset' },
    ],
  },
];

const reviews = [
  { name: 'Sunita R.', city: 'Pune', rating: 5, text: 'My husband stopped snoring within a week of switching to the NEST pillow. I finally sleep through the night. The HUSH speaker playing rain sounds is just magical.', product: 'NEST + HUSH' },
  { name: 'Arun M.', city: 'Delhi', rating: 5, text: 'I\'ve had insomnia for 3 years. ZEN changed everything. Within 10 minutes of using it I can feel my mind calm down. No medicine. No side effects.', product: 'ZEN' },
  { name: 'Meera K.', city: 'Bangalore', rating: 5, text: 'Bought HUSH for my 72-year-old mother. She says it\'s the best sleep she\'s had in years. The ocean sounds help her fall asleep in 15 minutes.', product: 'HUSH' },
  { name: 'Vikram S.', city: 'Chennai', rating: 5, text: 'The HUSH speaker is genuinely unbelievable. You literally cannot feel it under the pillow. Sound quality is rich — not tinny. Worth every rupee.', product: 'HUSH' },
];

const faqs = [
  { q: 'Who is Soma designed for?', a: 'Soma products are designed for adults aged 30–80+ — especially those dealing with insomnia, snoring, anxiety, or age-related sleep difficulty. They\'re also ideal for caregivers managing elderly family members\' sleep.' },
  { q: 'Is the ZEN device safe?', a: 'Yes. CES (Cranial Electrotherapy Stimulation) technology is clinically studied and widely used. The current is extremely low (microamps) — you may feel a gentle tingle. It is non-invasive, non-drug, and safe for daily use. Consult a doctor if you have a pacemaker.' },
  { q: 'Can HUSH be used without a phone?', a: 'Yes. HUSH supports TF card playback — load it with your favourite sounds or music and use it fully offline without phone or data.' },
  { q: 'Does NEST work for all pillow sizes?', a: 'NEST is 45×41×7cm and fits standard Indian pillowcases. The cover is removable and machine-washable. It works best as your primary head pillow.' },
  { q: 'When will I receive my order?', a: 'Soma is currently in pre-order. Once confirmed via WhatsApp, we dispatch within 5–7 business days with free shipping across India.' },
  { q: 'What if I don\'t sleep better?', a: '30-day money-back guarantee — no questions asked. If Soma doesn\'t improve your sleep, we refund every rupee including return shipping.' },
];

export default function SomaPage() {
  const { toast } = useToast();
  const [selected, setSelected] = useState(0);
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
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp: phone, source: 'soma-product-page', product: p.fullName }),
      });
    } catch (_) {}
    setLoading(false);
    setBooked(true);
    toast({ title: 'Seat reserved! 🌙', description: `We'll WhatsApp you within 24 hours with your ${p.fullName} details.` });
  }

  return (
    <div className="min-h-screen pb-32 md:pb-0" style={{ background: '#f7f6f3' }}>

      {/* ── Mobile header strip ── */}
      <div className="md:hidden relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.bgLight} 0%, white 100%)`, borderBottom: `2px solid ${p.color}18` }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: p.color }}>Soma by Nxmpliscore</div>
            <div className="text-xl font-bold leading-tight">{p.fullName}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: p.color }}>{p.tagline.split('.')[0]}.</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground line-through">₹{p.mrp.toLocaleString('en-IN')}</div>
            <div className="text-2xl font-black" style={{ color: p.color }}>₹{p.price.toLocaleString('en-IN')}</div>
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5">
              {discount}% off · Founding price
            </div>
          </div>
        </div>
        <div className="flex gap-1.5 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {products.map((prod, i) => (
            <button key={prod.id} onClick={() => setSelected(i)}
              className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border-2 transition-all"
              style={selected === i
                ? { borderColor: prod.color, background: prod.color, color: '#fff' }
                : { borderColor: `${prod.color}40`, background: 'white', color: prod.color }
              }
            >
              {prod.emoji} {prod.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="hidden md:block border-b border-[#e2dbd4] bg-white">
        <div className="container mx-auto px-4 py-2.5 text-xs text-muted-foreground flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>›</span>
          <Link href="/soma" className="hover:text-primary">Soma Sleep Wellness</Link>
          <span>›</span>
          <span className="font-medium text-foreground">{p.fullName}</span>
        </div>
      </div>

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden py-10 md:py-16 text-center" style={{ background: `linear-gradient(160deg, #0f0c29 0%, #1a1650 50%, #24243e 100%)` }}>
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-white/20">
            <Moon className="w-3.5 h-3.5" /> Sleep Wellness for Adults & Elders
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
            Sleep better.<br />
            <span style={{ color: '#a78bfa' }}>Without pills. Without stress.</span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base mb-6">
            Soma is India's smart sleep wellness line — designed for adults 30+ and elder care. Science-backed, non-invasive, beautifully simple.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {products.map((prod, i) => (
              <button key={prod.id} onClick={() => setSelected(i)}
                className="px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all"
                style={selected === i
                  ? { borderColor: prod.color, background: prod.color, color: '#fff', boxShadow: `0 4px 20px ${prod.color}60` }
                  : { borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)', color: 'white' }
                }
              >
                {prod.emoji} {prod.fullName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product demo video ── */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="rounded-2xl overflow-hidden border border-[#e2dbd4] shadow-md bg-black" style={{ aspectRatio: '16/9' }}>
          <iframe
            src="https://drive.google.com/file/d/1_kax7iVBPLRU6Ys-CmneghZ-T2_jPsBv/preview"
            className="w-full h-full"
            allow="autoplay"
            title="Soma Sleep Wellness — Product Demo"
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">Soma Sleep Wellness — Product Overview</p>
      </div>

      {/* ── Main product layout ── */}
      <div className="w-full px-3 sm:px-4 lg:container lg:mx-auto py-4 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-5 lg:gap-10 items-start">

          {/* LEFT */}
          <div className="order-2 lg:order-1">
            {/* Model tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1 snap-x scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
              {products.map((prod, i) => (
                <button key={prod.id} onClick={() => setSelected(i)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all snap-start shrink-0 min-h-[44px]',
                    selected === i ? 'border-current shadow-md scale-105' : 'border-[#e2dbd4] bg-white text-muted-foreground hover:border-gray-300'
                  )}
                  style={selected === i ? { borderColor: prod.color, color: prod.color, background: prod.bgLight } : {}}
                >
                  <span className="text-base">{prod.emoji}</span>
                  {prod.fullName}
                  {prod.badge && <span className="text-[10px] hidden sm:inline opacity-70">{prod.badge.split(' ').slice(1).join(' ')}</span>}
                </button>
              ))}
            </div>

            {/* Product visual card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#e2dbd4] shadow-sm -mx-3 sm:mx-0"
              style={{ background: `linear-gradient(135deg, ${p.bgLight} 0%, white 60%, ${p.bgLight}80 100%)`, minHeight: '240px' }}>
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-8xl mb-4">{p.emoji}</div>
                <div className="text-2xl font-black mb-1" style={{ color: p.color }}>{p.fullName}</div>
                <div className="text-sm text-muted-foreground max-w-sm">{p.tagline}</div>
              </div>
              {p.badge && (
                <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg" style={{ background: p.color }}>
                  {p.badge}
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-medium shadow">
                ✓ No prescription needed
              </div>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: Truck, text: 'Free shipping', sub: 'All India' },
                { icon: RefreshCw, text: '30-day returns', sub: 'No questions' },
                { icon: Shield, text: 'Non-drug', sub: 'Safe daily use' },
              ].map(t => (
                <div key={t.text} className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-2.5 border border-[#e2dbd4]">
                  <t.icon className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                  <div>
                    <div className="text-[10px] font-semibold leading-tight">{t.text}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">What {p.fullName} does for you</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {p.features.map((f, i) => (
                  <motion.div key={f.text} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[#e2dbd4] hover:shadow-sm transition-shadow">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: p.bgLight }}>
                      <f.icon style={{ color: p.color, width: 18, height: 18 }} />
                    </div>
                    <span className="text-sm font-medium">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The sleep crisis section */}
            <div className="mt-8 rounded-2xl p-6 border border-[#e2dbd4]" style={{ background: 'linear-gradient(135deg, #0f0c29, #1a1650)' }}>
              <div className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Why it matters</div>
              <h3 className="text-white text-xl font-bold mb-3">India has a sleep crisis</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-center mb-4">
                {[
                  { stat: '300M+', label: 'Indians with sleep disorders' },
                  { stat: '38%', label: 'Adults struggling with insomnia' },
                  { stat: '68%', label: 'Seniors with poor sleep quality' },
                ].map(({ stat, label }) => (
                  <div key={stat}>
                    <div className="text-2xl font-black" style={{ color: '#a78bfa' }}>{stat}</div>
                    <div className="text-white/60 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Heavy urban stress, excessive screen time, and aging disrupt biological clocks. Soma offers science-backed, non-drug solutions designed for India's adults and elderly.
              </p>
            </div>

            {/* Bundle suggestion */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-[#e2dbd4]">
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: p.color }}>Popular Bundle</div>
              <h3 className="text-lg font-bold mb-1">HUSH + NEST — Complete Sleep Setup</h3>
              <p className="text-sm text-muted-foreground mb-4">The smart pillow + bone conduction speaker combo. Fall asleep to nature sounds on the perfect ergonomic pillow.</p>
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-xs text-muted-foreground line-through">₹16,998 separately</div>
                  <div className="text-2xl font-black text-primary">₹8,999 bundle</div>
                  <div className="text-xs text-green-600 font-semibold">Save ₹7,999 · 47% off</div>
                </div>
                <LeadModalTrigger source="soma-bundle" product="Soma HUSH + NEST Bundle">
                  <Button className="ml-auto gap-2 text-white font-bold" style={{ background: `linear-gradient(135deg, ${p.color}dd, ${p.color})` }}>
                    <MessageCircle className="w-4 h-4" /> Reserve Bundle
                  </Button>
                </LeadModalTrigger>
              </div>
            </div>

            {/* Cross-links to Anvaya */}
            <div className="mt-8 rounded-2xl p-5 border border-[#e2dbd4] bg-white">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Also from Nxmpliscore</div>
              <Link href="/anvaya" className="flex items-center gap-4 hover:bg-[#f0faf6] rounded-xl p-3 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#f0faf6] flex items-center justify-center text-2xl shrink-0">👶</div>
                <div>
                  <div className="font-bold text-sm group-hover:text-primary transition-colors">Anvaya Smart — Baby Wellness Pod</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Contactless breathing, SpO₂, cry analysis & sleep tracking for newborns</div>
                </div>
                <div className="ml-auto text-muted-foreground text-sm">→</div>
              </Link>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold">Early Tester Feedback</h2>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="text-sm font-semibold ml-1">4.9</span>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl p-5 border border-[#e2dbd4] hover:shadow-md transition-shadow">
                    <Quote className="w-5 h-5 mb-2 opacity-20" style={{ color: p.color }} />
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm">{r.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{r.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] font-semibold" style={{ color: p.color }}>Beta tester · Soma {r.product}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#e2dbd4] overflow-hidden">
                    <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#faf8f5] transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
          <div className="order-1 lg:order-2 lg:sticky lg:top-20 -mx-3 sm:mx-0">
            <div className="bg-white sm:rounded-2xl border-y sm:border border-[#e2dbd4] shadow-lg overflow-hidden">
              <div className="p-6 border-b border-[#f0ece6]">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: p.color }}>Soma by Nxmpliscore</div>
                <h1 className="text-2xl font-bold mb-1">{p.fullName}</h1>
                <p className="text-sm font-medium" style={{ color: p.color }}>{p.tagline.split('.')[0]}.</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                  <span className="text-xs text-muted-foreground">4.9 · Beta testers</span>
                </div>
              </div>

              <div className="p-5 border-b border-[#f0ece6]">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground line-through">MRP ₹{p.mrp.toLocaleString('en-IN')}</div>
                    <div className="text-3xl font-black leading-tight" style={{ color: p.color }}>₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-green-600">{discount}% off</div>
                    <div className="text-[10px] text-muted-foreground">Founding family price</div>
                  </div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2.5 mb-3 flex items-center gap-2">
                  <span className="text-base">🌙</span>
                  <div>
                    <p className="text-xs font-bold text-indigo-800">Price locked for founding members</p>
                    <p className="text-[10px] text-indigo-700">No payment today · We confirm via WhatsApp first</p>
                  </div>
                </div>
              </div>

              {/* Model picker */}
              <div className="px-5 pt-4 pb-3">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2.5">Choose product</div>
                <div className="space-y-2">
                  {products.map((prod, i) => (
                    <button key={prod.id} onClick={() => setSelected(i)}
                      className="w-full text-left p-3 rounded-xl border-2 transition-all duration-150"
                      style={selected === i
                        ? { borderColor: prod.color, background: `linear-gradient(135deg,${prod.bgLight},white)` }
                        : { borderColor: '#e2dbd4', background: 'white' }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{prod.emoji}</span>
                        <div>
                          <div className="text-xs font-bold" style={{ color: selected === i ? prod.color : '#1a2e28' }}>{prod.fullName}</div>
                          <div className="text-[10px] text-muted-foreground">₹{prod.price.toLocaleString('en-IN')} · {Math.round((1 - prod.price / prod.mrp) * 100)}% off</div>
                        </div>
                        {prod.badge && <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: prod.color }}>{prod.badge.split(' ')[0]}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Book form */}
              <div className="p-6 pt-4">
                <LeadModalTrigger source="soma-product" product={p.fullName}>
                  <Button size="lg" className="w-full gap-2 text-white font-bold mb-4 cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${p.color}dd, ${p.color})`, boxShadow: `0 4px 20px ${p.color}40` }}>
                    <MessageCircle className="w-4 h-4" /> Quick Reserve via WhatsApp
                  </Button>
                </LeadModalTrigger>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-px bg-[#e2dbd4]" />
                  <span className="text-xs text-muted-foreground">or fill below</span>
                  <div className="flex-1 h-px bg-[#e2dbd4]" />
                </div>
                {booked ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-bold text-green-800">Reserved! 🌙</div>
                    <div className="text-xs text-green-700 mt-1">We'll WhatsApp you within 24 hours.</div>
                  </div>
                ) : (
                  <form onSubmit={handleBook} className="space-y-3">
                    <div className="text-sm font-bold mb-1">Reserve your early access</div>
                    <div className="text-xs text-muted-foreground mb-3">No payment now · WhatsApp confirmation first</div>
                    <Input placeholder="Your name *" value={name} onChange={e => setName(e.target.value)} required className="bg-[#faf8f5] border-[#e2dbd4] h-11" />
                    <Input placeholder="WhatsApp number *" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="bg-[#faf8f5] border-[#e2dbd4] h-11" />
                    <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold rounded-xl gap-2 text-white"
                      style={{ background: `linear-gradient(135deg, ${p.color}dd, ${p.color})`, boxShadow: `0 4px 20px ${p.color}40` }}>
                      {loading ? 'Reserving...' : `Reserve ${p.name} — ₹0 Now`}
                    </Button>
                    <button type="button" className="w-full h-11 text-sm font-semibold rounded-xl border-2 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                      style={{ borderColor: '#25D366', color: '#25D366' }}
                      onClick={() => window.open(`https://wa.me/919876543210?text=Hi! I want to know more about Soma ${p.name}`, '_blank')}>
                      <Phone className="w-4 h-4" /> Chat on WhatsApp
                    </button>
                  </form>
                )}
                <div className="mt-4 space-y-2 pt-4 border-t border-[#f0ece6]">
                  {['✓ No payment charged now', '✓ Free shipping across India', '✓ 30-day money-back guarantee', '✓ 1-year warranty included'].map(t => (
                    <div key={t} className="text-xs text-muted-foreground">{t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky CTA ── */}
      {!booked && (
        <div className="md:hidden fixed left-0 right-0 z-40 px-4 py-3"
          style={{ bottom: 'max(66px, calc(66px + env(safe-area-inset-bottom)))', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold truncate">{p.fullName} — Founding price</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-base font-black" style={{ color: p.color }}>₹{p.price.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-muted-foreground line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-bold text-green-600">{discount}% off</span>
              </div>
            </div>
            <LeadModalTrigger source="soma-sticky" product={p.fullName}>
              <button className="shrink-0 px-5 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2"
                style={{ background: `linear-gradient(135deg,${p.color}dd,${p.color})`, boxShadow: `0 4px 16px ${p.color}55` }}>
                <MessageCircle className="w-4 h-4" /> Reserve Now
              </button>
            </LeadModalTrigger>
          </div>
        </div>
      )}
    </div>
  );
}
