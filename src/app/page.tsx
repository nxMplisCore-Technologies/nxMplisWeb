'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, RefreshCw, Activity, Baby, Moon, Brain, Zap } from 'lucide-react';
import { FAQSchema } from '@/components/seo/JsonLd';

const SHOPIFY = 'anvayasmart.myshopify.com';

/* ── Fade-in on scroll ── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.68, 0, 1.2] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Products ── */
const products = [
  { name: 'CORE', price: 8999, mrp: 14999, color: '#d97706', bg: '#fffbeb', emoji: '📹', tag: null, variantId: '50746014892255', desc: 'HD video · Cry detection · Lullabies · Temp monitor' },
  { name: 'SENSE', price: 14999, mrp: 19999, color: '#4a7c6f', bg: '#f0faf6', emoji: '🌬️', tag: '⭐ Best Seller', variantId: '50745192939743', desc: 'Contactless breathing · SpO₂ · Heart rate · Cry AI' },
  { name: 'PULSE', price: 17999, mrp: 22999, color: '#3b82f6', bg: '#eff6ff', emoji: '⚡', tag: null, variantId: '50745881690335', desc: '4MP camera · Motion & noise alert · IP65 waterproof' },
  { name: 'OMNI', price: 20999, mrp: 29999, color: '#7c3aed', bg: '#f5f3ff', emoji: '🧠', tag: '🏆 Most Advanced', variantId: '50744670486751', desc: 'Full AI · Predictive alerts · SpO₂ · Weekly report' },
];

const faqs = [
  { q: 'Does anything touch my baby?', a: 'No. Anvaya is completely contactless — nothing attaches to your baby\'s skin. The pod sits on a shelf beside the crib and uses radar and infrared sensing.' },
  { q: 'When will I receive my order?', a: 'Orders ship within 5–7 business days with free delivery across India.' },
  { q: 'What if I\'m not happy?', a: '30-day money-back guarantee. No questions asked. We refund every rupee including return shipping.' },
  { q: 'Which model is right for me?', a: 'SENSE is the most popular — breathing, SpO₂, cry analysis and sleep tracking. Want AI health reports? Go OMNI.' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqs} />

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#0d1f18 0%,#102318 55%,#0a1610 100%)' }}>
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 flex flex-col items-center text-center">

          {/* Social proof pill */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/15">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
            </div>
            <span>4.9 · Trusted by 500+ founding families · India's #1 baby wellness pod</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight max-w-3xl mb-5">
            Your baby is safe.<br />
            <span style={{ color: '#6ee7b7' }}>You can sleep now.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/65 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            India's only contactless AI baby wellness pod. Monitors breathing, SpO₂, cry type and sleep — nothing touches your baby. Starting at ₹8,999.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            <Link href="/anvaya"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base"
              style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 8px 30px rgba(232,149,122,0.45)' }}>
              Shop Anvaya Smart <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-it-works"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white/80 border border-white/20 hover:bg-white/10 transition-colors text-base">
              See how it works
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-6 flex-wrap text-white/50 text-xs">
            {[
              { icon: Truck, text: 'Free shipping India' },
              { icon: RefreshCw, text: '30-day returns' },
              { icon: Shield, text: 'Nothing touches baby' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" /> {text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. PRESS / TRUST BAR ── */}
      <section className="border-b border-[#e8e2da] bg-[#faf8f5] py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">As seen on</span>
            {['YourStory', 'Inc42', 'Economic Times', 'Entrepreneur India', 'Startup India'].map(name => (
              <span key={name} className="text-sm font-bold text-[#aaa] hover:text-foreground transition-colors">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCT GRID ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Choose your pod</div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Anvaya Smart — 4 models.<br />One perfect fit.</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">From essentials to full AI health monitoring. Free shipping. 30-day guarantee.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p, i) => {
              const discount = Math.round((1 - p.price / p.mrp) * 100);
              return (
                <Reveal key={p.name} delay={i * 0.07} className="flex flex-col rounded-2xl border border-[#e2dbd4] overflow-hidden hover:shadow-lg transition-shadow"
                  style={{ background: `linear-gradient(160deg,${p.bg} 0%,white 60%)` }}>
                  <div className="flex flex-col items-center justify-center py-10 text-5xl">
                    {p.emoji}
                  </div>
                  <div className="px-5 pb-5 flex flex-col flex-1">
                    {p.tag && (
                      <div className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start mb-2 text-white" style={{ background: p.color }}>
                        {p.tag}
                      </div>
                    )}
                    <div className="font-black text-xl mb-1" style={{ color: p.color }}>Anvaya {p.name}</div>
                    <div className="text-xs text-muted-foreground mb-3 leading-relaxed">{p.desc}</div>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-black" style={{ color: p.color }}>₹{p.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-muted-foreground line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                        <span className="text-xs font-bold text-green-600">{discount}% off</span>
                      </div>
                      <button
                        onClick={() => window.open(`https://${SHOPIFY}/cart/${p.variantId}:1?storefront=true`, '_blank')}
                        className="w-full py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                        style={{ background: `linear-gradient(135deg,${p.color}dd,${p.color})` }}>
                        🛒 Buy Now
                      </button>
                      <Link href="/anvaya" className="block text-center text-[11px] text-muted-foreground hover:text-primary mt-2 transition-colors">
                        View details →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="text-center mt-8">
            <Link href="/compare" className="text-sm font-semibold text-primary hover:underline">
              Compare all 4 models side by side →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 4. WHY ANVAYA ── */}
      <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(135deg,#0d1f18,#102318)' }}>
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Why Anvaya</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12">The only baby monitor<br />that does all of this.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, emoji: '🚫', title: 'Zero wearables', desc: 'Nothing clips, wraps or attaches to your baby. Pure contactless sensing from across the room.' },
              { icon: Brain, emoji: '🤖', title: 'Real AI, not just alerts', desc: '5 cry types identified. Breathing anomalies flagged. Predictive alerts before risk escalates.' },
              { icon: Activity, emoji: '🇮🇳', title: "India's only", desc: 'Built and certified for Indian homes — voltage, humidity, pricing and paediatric benchmarks.' },
            ].map(({ emoji, title, desc }) => (
              <Reveal key={title} className="rounded-2xl p-6 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-4xl mb-3">{emoji}</div>
                <div className="font-bold text-white mb-2">{title}</div>
                <div className="text-white/55 text-sm leading-relaxed">{desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="py-16 lg:py-24 bg-[#faf8f5]">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Setup in 3 minutes</div>
            <h2 className="text-3xl md:text-4xl font-black mb-12">How Anvaya works</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '01', emoji: '📦', title: 'Place the pod', desc: 'Set Anvaya on a shelf or table beside the crib — no cables running to baby, no mounts needed.' },
              { step: '02', emoji: '📲', title: 'Open the app', desc: 'Connect via WiFi in 60 seconds. Live vitals appear on your phone instantly. No setup wizard.' },
              { step: '03', emoji: '😴', title: 'Sleep peacefully', desc: 'Anvaya watches breathing, SpO₂, cry type and room environment — and only alerts when it matters.' },
            ].map(({ step, emoji, title, desc }) => (
              <Reveal key={step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#e2dbd4] flex items-center justify-center text-2xl mb-4 shadow-sm">
                  {emoji}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{step}</div>
                <div className="font-bold mb-2">{title}</div>
                <div className="text-muted-foreground text-sm leading-relaxed">{desc}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Full technology walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 6. REVIEWS ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              <span className="font-black text-xl">4.9</span>
            </div>
            <h2 className="text-3xl font-black">What founding families say</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Priya M.', city: 'Bangalore', model: 'SENSE', text: 'Finally slept through the night. The cry analysis identified a hungry cry before I even got up. A must-have.' },
              { name: 'Rahul K.', city: 'Mumbai', model: 'SENSE', text: 'Setup took 3 minutes. The breathing monitor gave us so much peace of mind in the first two months.' },
              { name: 'Ananya S.', city: 'Hyderabad', model: 'OMNI', text: 'The sleep score feature is genius. We knew exactly when our baby hit deep sleep and stopped tiptoeing.' },
              { name: 'Meera R.', city: 'Chennai', model: 'OMNI', text: 'Real-time breathing alerts, SpO₂ tracking and AI insights. Best investment we made for our newborn.' },
            ].map((r, i) => (
              <Reveal key={r.name} delay={i * 0.07} className="rounded-2xl p-5 border border-[#e2dbd4] hover:shadow-md transition-shadow bg-[#faf8f5]">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="text-sm font-bold">{r.name} <span className="font-normal text-muted-foreground">· {r.city}</span></div>
                <div className="text-[10px] font-semibold text-primary mt-0.5">Anvaya {r.model}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SOMA SLEEP LINE ── */}
      <section className="py-16 lg:py-20 bg-[#faf8f5] border-t border-[#e2dbd4]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <Reveal className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                <Moon className="w-3.5 h-3.5" /> New: Sleep wellness for adults & elders
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-3">
                Can't sleep?<br />
                <span style={{ color: '#5b4fcf' }}>Meet Soma.</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
                India's smart sleep wellness line — bone conduction speakers, anti-snore pillows and non-drug sleep aids. Designed for adults 30+ and elder care.
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                <Link href="/soma"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg,#5b4fcf,#7c3aed)' }}>
                  Explore Soma <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-muted-foreground">Starting ₹3,499</span>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex-1 grid grid-cols-3 gap-3">
              {[
                { emoji: '🎵', name: 'HUSH', price: '₹3,499', desc: 'Under-pillow bone conduction speaker' },
                { emoji: '🛏️', name: 'NEST', price: '₹5,999', desc: 'Anti-snore smart pillow' },
                { emoji: '🧠', name: 'ZEN', price: '₹6,999', desc: 'CES microcurrent sleep device' },
              ].map(p => (
                <Link key={p.name} href="/soma"
                  className="flex flex-col items-center text-center p-4 rounded-2xl border border-[#e2dbd4] bg-white hover:shadow-md hover:border-indigo-200 transition-all">
                  <div className="text-3xl mb-2">{p.emoji}</div>
                  <div className="font-bold text-sm text-indigo-700">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{p.desc}</div>
                  <div className="font-black text-sm mt-2" style={{ color: '#5b4fcf' }}>{p.price}</div>
                </Link>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <Reveal className="text-center mb-8">
            <h2 className="text-2xl font-black">Common questions</h2>
          </Reveal>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.05} className="rounded-xl border border-[#e2dbd4] overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#faf8f5] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-sm pr-4">{f.q}</span>
                  <span className="text-muted-foreground text-lg leading-none shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-[#f0ece6] pt-3">{f.a}</div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ── */}
      <section className="py-20 bg-[#0d1f18] text-center relative overflow-hidden">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-4xl mb-4">👶</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Join India's founding families.
            </h2>
            <p className="text-white/60 max-w-md mx-auto text-sm mb-8">
              Lock in founding family pricing before it ends. Free shipping. 30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/anvaya"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base"
                style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 8px 30px rgba(232,149,122,0.4)' }}>
                Shop Anvaya Smart — from ₹8,999
              </Link>
              <Link href="/quiz"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white/70 border border-white/20 hover:bg-white/10 transition-colors text-base">
                <Zap className="w-4 h-4" /> Find my pod — free quiz
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
