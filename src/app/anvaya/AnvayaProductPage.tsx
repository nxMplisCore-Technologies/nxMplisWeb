'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp,
  Activity, Baby, GitBranch, Heart, Wind, Video, Music, Thermometer,
  BrainCircuit, Zap, Phone, CheckCircle, Package, Lock, Wifi,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { cartUrl } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import type { productConfig } from './page';

type ProductEntry = typeof productConfig[number] & { shopify: ShopifyProduct | null };

const ICON_MAP: Record<string, React.ElementType> = {
  Video, Baby, Music, Thermometer, Wifi, Shield, Activity, Heart,
  Wind, Zap, BrainCircuit, GitBranch,
};

const reviews = [
  { name: 'Priya M.', city: 'Bangalore', rating: 5, text: 'Finally slept through the night knowing Anvaya is watching. The cry analysis is incredibly accurate — it identified a hungry cry before I even got up.', product: 'SENSE', avatar: 'PM' },
  { name: 'Rahul K.', city: 'Mumbai', rating: 5, text: 'Worth every rupee. The breathing monitor gave us so much peace of mind in the first two months. Setup took literally 3 minutes.', product: 'SENSE', avatar: 'RK' },
  { name: 'Ananya S.', city: 'Hyderabad', rating: 5, text: 'The sleep score feature is genius. We knew exactly when our baby hit deep sleep and stopped tiptoeing around!', product: 'OMNI', avatar: 'AS' },
  { name: 'Meera R.', city: 'Chennai', rating: 5, text: 'As a first-time mother, I was anxious every night. Anvaya OMNI changed everything — real-time breathing alerts and AI insights. Best investment.', product: 'OMNI', avatar: 'MR' },
];

const included = ['Anvaya Smart pod', 'Magnetic mounting bracket', 'USB-C cable + adapter', 'Anvaya app (iOS & Android)', '1-year premium subscription FREE', 'Quick setup guide'];

function formatINR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

interface Props {
  products: ProductEntry[];
  faqs: { q: string; a: string }[];
}

export function AnvayaProductPage({ products, faqs }: Props) {
  const [selected, setSelected] = useState(1); // SENSE default
  const [variantIdx, setVariantIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cfg = products[selected];
  const shopify = cfg.shopify;

  // Use live Shopify variants if available, fall back to static
  const variants = shopify?.variants ?? [];
  const currentVariant = variants[variantIdx];

  // Price display
  const price = currentVariant ? formatINR(currentVariant.price) : '—';
  const compareAt = currentVariant?.compareAtPrice ? formatINR(currentVariant.compareAtPrice) : null;
  const available = currentVariant?.availableForSale ?? true;

  // Gallery — prefer Shopify images but fall back to local
  const gallery = shopify?.images.length
    ? shopify.images.map(img => img.url)
    : cfg.localImages;

  function handleBuyNow() {
    if (!currentVariant) return;
    window.open(cartUrl(currentVariant.numericId), '_blank');
  }

  function handleSelectProduct(i: number) {
    setSelected(i);
    setVariantIdx(0);
    setGalleryIdx(0);
  }

  return (
    <div className="min-h-screen bg-white pb-28 md:pb-0">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-2.5 text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/anvaya" className="hover:text-gray-600 transition-colors">Baby Wellness Pods</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{cfg.fullName}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-14 items-start">

          {/* ── LEFT — Image gallery + details ── */}
          <div className="order-2 lg:order-1">

            {/* Gallery */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">

              {/* Thumbnails — vertical on desktop, horizontal on mobile */}
              <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIdx(i)}
                    className={cn(
                      'relative rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#f7f5f2]',
                      'w-16 h-16 lg:w-[72px] lg:h-[72px]',
                      galleryIdx === i
                        ? 'border-gray-900 shadow-sm opacity-100'
                        : 'border-gray-200 hover:border-gray-400 opacity-50 hover:opacity-100'
                    )}
                  >
                    <Image src={img} alt="" fill className="object-contain p-1.5" sizes="72px" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="order-1 lg:order-2 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selected}-${galleryIdx}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="relative rounded-2xl overflow-hidden bg-[#f7f5f2] border border-gray-100"
                    style={{ aspectRatio: '1/1' }}
                  >
                    <Image
                      src={gallery[galleryIdx]}
                      alt={`${cfg.fullName} baby wellness pod`}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    {cfg.badge && (
                      <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow" style={{ background: cfg.color }}>
                        {cfg.badge}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[11px] font-medium text-gray-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5">
                      <Shield className="w-3 h-3 text-green-500" /> Contactless
                    </div>

                    {/* Arrows */}
                    {gallery.length > 1 && (
                      <>
                        <button onClick={() => setGalleryIdx(g => (g - 1 + gallery.length) % gallery.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow border border-gray-200 flex items-center justify-center text-lg text-gray-600 hover:bg-white transition-colors">
                          ‹
                        </button>
                        <button onClick={() => setGalleryIdx(g => (g + 1) % gallery.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow border border-gray-200 flex items-center justify-center text-lg text-gray-600 hover:bg-white transition-colors">
                          ›
                        </button>
                      </>
                    )}

                    {/* Dot strip */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                      {gallery.map((_, i) => (
                        <div key={i} className={cn('h-1.5 rounded-full transition-all duration-200 bg-gray-800/60', galleryIdx === i ? 'w-4 opacity-100' : 'w-1.5 opacity-30')} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Across India' },
                { icon: RefreshCw, label: '30-Day Returns', sub: 'No questions asked' },
                { icon: Lock, label: 'Secure Checkout', sub: 'Razorpay / UPI' },
              ].map(t => (
                <div key={t.label} className="flex flex-col items-center text-center gap-2 py-4 rounded-2xl border border-gray-100 bg-gray-50">
                  <t.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-[11px] font-semibold text-gray-700">{t.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature icon grid */}
            <div className="mt-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">What {cfg.fullName} monitors</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cfg.features.map((f, i) => {
                  const Icon = ICON_MAP[f.icon] ?? Shield;
                  return (
                    <motion.div
                      key={f.text}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cfg.color}15` }}>
                        <Icon style={{ color: cfg.color, width: 18, height: 18 }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-800">{f.text}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{f.sub}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Videos — OMNI only */}
            {selected === 3 && (
              <div className="mt-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">See it in action</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-black shadow-sm" style={{ aspectRatio: '16/9' }}>
                    <iframe src="https://drive.google.com/file/d/1B0-ROWAAYijHkPadKA3vst7MlvCPzkPC/preview" className="w-full h-full" allow="autoplay" title="Anvaya OMNI 3D Demo" />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-black shadow-sm" style={{ aspectRatio: '16/9' }}>
                    <iframe src="https://drive.google.com/file/d/1P6k7z4eVs4g4XU3Bg__kVbLdSQ-uVh39/preview" className="w-full h-full" allow="autoplay" title="Anvaya OMNI AI Features" />
                  </div>
                </div>
              </div>
            )}

            {/* What's in the box */}
            <div className="mt-10 rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-800">What's in the box</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 p-6">
                {included.map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: cfg.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <span className="font-bold text-gray-800">4.9</span>
                <span className="text-sm text-gray-400">· Pilot family feedback</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex mb-3">{[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: cfg.color }}>{r.avatar}</div>
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{r.name} · {r.city}</div>
                        <div className="text-[10px] text-gray-400">Beta tester · Anvaya {r.product}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Frequently asked questions</div>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                    <button className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span className="font-semibold text-sm text-gray-800 pr-4">{faq.q}</span>
                      {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-links */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { href: '/how-it-works', label: 'How it works', sub: 'Radar + AI explained', emoji: '🔬' },
                { href: '/compare', label: 'Compare models', sub: 'CORE vs SENSE vs OMNI', emoji: '⚖️' },
                { href: '/technology', label: 'Technology', sub: 'Contactless sensing', emoji: '⚡' },
                { href: '/cry-analyzer', label: 'Cry Analyzer', sub: 'AI cry demo', emoji: '👶' },
              ].map(({ href, label, sub, emoji }) => (
                <Link key={href} href={href} className="flex flex-col items-center text-center gap-1.5 bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group">
                  <span className="text-2xl">{emoji}</span>
                  <div className="text-xs font-semibold text-gray-800 group-hover:text-primary transition-colors">{label}</div>
                  <div className="text-[10px] text-gray-400 leading-tight">{sub}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Sticky buy panel ── */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-20">

            {cfg.badge && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-3 text-white" style={{ background: cfg.color }}>
                {cfg.badge}
              </div>
            )}

            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Anvaya Smart</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{cfg.fullName}</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{cfg.desc}</p>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
              <span className="text-xs text-gray-400">4.9 · Pilot family feedback</span>
            </div>

            <div className="border-t border-gray-100 pt-5 mb-5" />

            {/* Live price from Shopify */}
            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="text-2xl font-bold text-gray-900">{price}</span>
              {compareAt && <span className="text-sm text-gray-400 line-through">{compareAt}</span>}
            </div>
            <div className="text-xs text-gray-400 mb-5">incl. taxes · free shipping</div>

            {/* Availability badge */}
            {!available && currentVariant && (
              <div className="mb-4 text-xs font-semibold text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">
                Currently out of stock — join waitlist via WhatsApp
              </div>
            )}

            <div className="border-t border-gray-100 pt-5 mb-5" />

            {/* Model selector */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-gray-700 mb-2.5">
                Model: <span style={{ color: cfg.color }} className="font-bold">{cfg.fullName}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {products.map((prod, i) => (
                  <button key={prod.id} onClick={() => handleSelectProduct(i)}
                    className={cn('flex flex-col items-center py-2.5 px-1 rounded-xl border-2 text-[11px] font-bold transition-all', selected === i ? 'shadow-sm' : 'border-gray-200 text-gray-400 hover:border-gray-300')}
                    style={selected === i ? { borderColor: prod.color, color: prod.color, background: prod.bgLight } : {}}>
                    <div className="w-6 h-6 rounded-full mb-1 flex items-center justify-center text-[9px] font-black text-white" style={{ background: selected === i ? prod.color : '#d1d5db' }}>
                      {prod.name[0]}
                    </div>
                    {prod.name}
                    <div className="text-[9px] font-normal mt-0.5 opacity-60">
                      {prod.shopify?.variants[0]
                        ? `₹${Math.round(parseFloat(prod.shopify.variants[0].price) / 1000)}k`
                        : '—'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant picker — live from Shopify */}
            {variants.length > 0 && (
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-700 mb-2.5">Option:</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {variants.map((v, i) => (
                    <button key={v.id} onClick={() => setVariantIdx(i)}
                      className={cn('text-left p-3.5 rounded-xl border-2 transition-all relative', variantIdx === i ? 'shadow-sm' : 'border-gray-200 hover:border-gray-300', !v.availableForSale && 'opacity-50')}
                      style={variantIdx === i ? { borderColor: cfg.color, background: cfg.bgLight } : {}}>
                      <div className="text-xs font-bold" style={{ color: variantIdx === i ? cfg.color : '#374151' }}>{v.title}</div>
                      <div className="text-base font-black mt-0.5" style={{ color: variantIdx === i ? cfg.color : '#111827' }}>{formatINR(v.price)}</div>
                      {!v.availableForSale && <div className="text-[9px] text-gray-400 mt-0.5">Out of stock</div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <Button size="lg" onClick={handleBuyNow} disabled={!available || !currentVariant}
              className="w-full h-14 text-base font-bold text-white rounded-xl mb-3 shadow-lg disabled:opacity-50"
              style={{ background: `linear-gradient(135deg,${cfg.color}dd,${cfg.color})`, boxShadow: `0 4px 20px ${cfg.color}40` }}>
              {available ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            <button
              className="w-full h-12 text-sm font-semibold rounded-xl border-2 flex items-center justify-center gap-2 transition-colors hover:bg-green-50 mb-5"
              style={{ borderColor: '#25D366', color: '#25D366' }}
              onClick={() => window.open(`https://wa.me/919876543210?text=Hi! I want to order Anvaya ${cfg.name}`, '_blank')}>
              <Phone className="w-4 h-4" /> Order via WhatsApp
            </button>

            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-400 mb-6">
              {['✓ Free shipping India', '✓ 30-day money-back', '✓ 1-year warranty', '✓ Secure checkout'].map(t => (
                <div key={t}>{t}</div>
              ))}
            </div>

            {/* Model compare */}
            <div className="rounded-2xl border border-gray-100 p-5 bg-gray-50">
              <div className="text-xs font-bold text-gray-700 mb-3">Not sure which model?</div>
              <div className="space-y-2">
                {[
                  { name: 'CORE', desc: 'Basic video + cry detection', color: '#d97706' },
                  { name: 'SENSE ⭐', desc: 'Breathing + SpO₂ + Cry AI', color: '#4a7c6f' },
                  { name: 'PULSE', desc: 'Environment + Activity focus', color: '#3b82f6' },
                  { name: 'OMNI', desc: 'All + Predictive AI reports', color: '#7c3aed' },
                ].map(m => (
                  <div key={m.name} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-bold w-16 shrink-0" style={{ color: m.color }}>{m.name}</span>
                    <span className="text-gray-300">—</span>
                    <span>{m.desc}</span>
                  </div>
                ))}
              </div>
              <Link href="/compare" className="text-xs font-semibold text-primary hover:underline mt-3 block">See full comparison →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed left-0 right-0 z-40 px-4 py-3"
        style={{ bottom: 'max(66px, calc(66px + env(safe-area-inset-bottom)))', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 -4px 24px rgba(0,0,0,0.07)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-800 truncate">{cfg.fullName} {currentVariant ? `· ${currentVariant.title}` : ''}</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: cfg.color }}>{price}</div>
          </div>
          <button onClick={handleBuyNow} disabled={!available || !currentVariant}
            className="shrink-0 px-5 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50"
            style={{ background: `linear-gradient(135deg,${cfg.color}dd,${cfg.color})`, boxShadow: `0 4px 16px ${cfg.color}50` }}>
            {available ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
