'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp,
  Activity, Baby, GitBranch, Heart, Wind, Video, Music, Thermometer,
  BrainCircuit, Zap, Phone, CheckCircle, Lock, MessageCircle, ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { cartUrl } from '@/lib/shopify';
import type { ShopifyProduct } from '@/lib/shopify';
import type { productConfig } from './page';

type ProductEntry = typeof productConfig[number] & { shopify: ShopifyProduct | null };

const ICON_MAP: Record<string, React.ElementType> = {
  Video, Baby, Music, Thermometer, Shield, Activity, Heart,
  Wind, Zap, BrainCircuit, GitBranch, Phone,
};

const reviews = [
  { name: 'Priya M.', city: 'Bangalore', rating: 5, text: 'The cry analysis is incredibly accurate — identified a hungry cry before I even got up. First good night of sleep in months.' },
  { name: 'Rahul K.', city: 'Mumbai', rating: 5, text: 'The breathing monitor gave us real peace of mind in the first two months. Setup took three minutes.' },
  { name: 'Meera R.', city: 'Chennai', rating: 5, text: 'Real-time breathing alerts and AI insights changed our nights entirely. As a first-time mother, this removed almost all the anxiety.' },
];

const included = [
  'Anvaya Smart pod',
  'Magnetic mounting bracket',
  'USB-C cable + adapter',
  'Anvaya app (iOS & Android)',
  '1-year premium subscription FREE',
  'Quick setup guide',
];

function formatINR(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

interface Props {
  products: ProductEntry[];
  faqs: { q: string; a: string }[];
}

/* ─── Gallery ─── */
function Gallery({ images, color }: { images: string[]; color: string }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-120, 0, 120], [0.8, 1, 0.8]);
  const DRAG_THRESHOLD = 45;

  const go = useCallback((next: number, d = 0) => { setDir(d); setIdx(next); }, []);
  const prev = () => go((idx - 1 + images.length) % images.length, -1);
  const next = () => go((idx + 1) % images.length, 1);

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -DRAG_THRESHOLD) next();
    else if (info.offset.x > DRAG_THRESHOLD) prev();
    dragX.set(0);
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? '40%' : '-40%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-40%' : '40%', opacity: 0 }),
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
      {/* Thumbnail column — desktop left, mobile bottom */}
      {images.length > 1 && (
        <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:max-h-[480px] shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => go(i, i > idx ? 1 : -1)}
              className={cn(
                'relative shrink-0 rounded-lg overflow-hidden border-2 transition-all bg-gray-50',
                'w-14 h-14 lg:w-16 lg:h-16',
                idx === i ? 'border-gray-800' : 'border-gray-200 opacity-50 hover:opacity-80 hover:border-gray-300'
              )}
            >
              <Image src={img} alt="" fill className="object-contain p-1.5" sizes="64px" draggable={false} />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="order-1 lg:order-2 flex-1">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          style={{ x: dragX, opacity: dragOpacity, aspectRatio: '4/3' }}
          className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-[#f8f7f5] cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={idx}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[idx]}
                alt="product"
                fill
                className="object-contain p-6 lg:p-10"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
              {images.map((_, i) => (
                <div key={i} className={cn('h-1 rounded-full transition-all duration-300', idx === i ? 'w-5 bg-gray-700' : 'w-1.5 bg-gray-300')} />
              ))}
            </div>
          )}

          {/* Desktop arrows */}
          {images.length > 1 && (
            <>
              <button onClick={prev} aria-label="Prev" className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow items-center justify-center text-gray-600 hover:shadow-md transition-shadow z-10">‹</button>
              <button onClick={next} aria-label="Next" className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow items-center justify-center text-gray-600 hover:shadow-md transition-shadow z-10">›</button>
            </>
          )}
        </motion.div>

        {/* Image counter — mobile */}
        {images.length > 1 && (
          <p className="lg:hidden text-center text-xs text-gray-400 mt-2">{idx + 1} / {images.length}</p>
        )}
      </div>
    </div>
  );
}

export function AnvayaProductPage({ products, faqs }: Props) {
  const [selected, setSelected] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const buyRef = useRef<HTMLDivElement>(null);

  const cfg = products[selected];
  const shopify = cfg.shopify;
  const variants = shopify?.variants ?? cfg.fallbackVariants;
  const currentVariant = variants[variantIdx];
  const price = currentVariant ? formatINR(currentVariant.price) : '—';
  const compareAt = currentVariant?.compareAtPrice ? formatINR(currentVariant.compareAtPrice) : null;
  const available = currentVariant?.availableForSale ?? true;
  const gallery = shopify?.images.length ? shopify.images.map(img => img.url) : cfg.localImages;

  function handleBuyNow() {
    if (!currentVariant) return;
    window.open(cartUrl(currentVariant.numericId), '_blank');
  }

  const discount = currentVariant?.compareAtPrice
    ? Math.round((1 - parseFloat(String(currentVariant.price)) / parseFloat(String(currentVariant.compareAtPrice))) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">

      {/* ── Top model switcher — Flipkart-style pill row ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {products.map((prod, i) => (
              <button
                key={prod.id}
                onClick={() => { setSelected(i); setVariantIdx(0); }}
                className={cn(
                  'shrink-0 px-5 py-3.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                  selected === i
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                {prod.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-0 sm:px-6 py-0 lg:py-8">
        <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 items-start">

          {/* ── LEFT: Gallery ── */}
          <div className="lg:sticky lg:top-[57px]">
            <AnimatePresence mode="wait">
              <motion.div key={`g-${selected}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="px-4 sm:px-0 pt-4 pb-0 lg:py-0">
                  <Gallery images={gallery} color={cfg.color} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Guarantee strip — under image, desktop only */}
            <div className="hidden lg:grid grid-cols-3 gap-px bg-gray-100 mt-6 rounded-xl overflow-hidden border border-gray-100">
              {[
                { icon: Truck, label: 'Free delivery', sub: 'All India' },
                { icon: RefreshCw, label: '30-day returns', sub: 'No questions' },
                { icon: Lock, label: 'Secure payment', sub: 'Razorpay · UPI' },
              ].map(t => (
                <div key={t.label} className="flex items-center gap-3 bg-white px-4 py-3">
                  <t.icon className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{t.label}</div>
                    <div className="text-xs text-gray-400">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Product details + buy ── */}
          <div ref={buyRef} className="px-4 sm:px-0 pt-4 lg:pt-0">
            <AnimatePresence mode="wait">
              <motion.div key={`p-${selected}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>

                {/* Brand + badge row */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Anvaya Smart</span>
                  {cfg.badge && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded text-white" style={{ background: cfg.color }}>{cfg.badge}</span>
                  )}
                </div>

                <h1 className="text-xl font-bold text-gray-900 leading-snug mb-1">{cfg.fullName}</h1>
                <p className="text-sm font-medium mb-3" style={{ color: cfg.color }}>{cfg.tagline}</p>

                {/* Rating row */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    4.9 <Star className="w-3 h-3 fill-white" />
                  </div>
                  <span className="text-xs text-gray-500">73 ratings</span>
                  <span className="text-gray-200 text-sm">|</span>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Verified families</span>
                </div>

                {/* Price block */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-3xl font-bold text-gray-900">{price}</span>
                    {compareAt && <span className="text-base text-gray-400 line-through">{compareAt}</span>}
                    {discount && <span className="text-base font-bold text-green-600">{discount}% off</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes · Free shipping across India</p>
                </div>

                {/* Variant picker */}
                {variants.length > 1 && (
                  <div className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-2.5">Select option:</p>
                    <div className="flex gap-2 flex-wrap">
                      {variants.map((v, i) => (
                        <button
                          key={v.id}
                          onClick={() => setVariantIdx(i)}
                          className={cn(
                            'px-4 py-2.5 rounded-lg border text-sm font-medium transition-all',
                            variantIdx === i
                              ? 'border-blue-600 bg-blue-50 text-blue-700'
                              : 'border-gray-300 text-gray-600 hover:border-gray-400',
                            !v.availableForSale && 'opacity-40 line-through'
                          )}
                        >
                          {v.title}
                          <div className="text-xs font-bold mt-0.5">{formatINR(v.price)}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!available && currentVariant && (
                  <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-100">
                    Currently out of stock — message us on WhatsApp to join the waitlist.
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={handleBuyNow}
                    disabled={!available || !currentVariant}
                    className="flex-1 h-12 rounded-xl text-sm font-bold text-white disabled:opacity-40 transition-opacity"
                    style={{ background: '#fb641b' }}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!available || !currentVariant}
                    className="flex-1 h-12 rounded-xl text-sm font-bold disabled:opacity-40 transition-opacity border border-gray-200"
                    style={{ color: cfg.color }}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* WhatsApp */}
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-5"
                  onClick={() => window.open(`https://wa.me/917987449366?text=Hi! I want to know more about Anvaya ${cfg.name}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with us on WhatsApp
                </button>

                {/* Delivery / service strip */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-5">
                  {[
                    { icon: Truck, label: 'Free delivery', detail: 'Delivered across India' },
                    { icon: RefreshCw, label: '30-day return policy', detail: 'Easy, no-questions return' },
                    { icon: Shield, label: '1-year warranty', detail: 'Full manufacturer warranty' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-gray-400 shrink-0" />
                      <div className="text-sm text-gray-700"><span className="font-medium">{item.label}</span> — {item.detail}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100">{cfg.desc}</p>

                {/* Features */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">Key Features</h2>
                  <AnimatePresence mode="wait">
                    <motion.div key={`f-${selected}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-0 divide-y divide-gray-50">
                      {cfg.features.map((f, i) => {
                        const Icon = ICON_MAP[f.icon] ?? Shield;
                        return (
                          <div key={i} className="flex items-start gap-3 py-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${cfg.color}14` }}>
                              <Icon style={{ color: cfg.color, width: 14, height: 14 }} />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">{f.text}</div>
                              <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{f.sub}</div>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Model compare */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Compare all models</h3>
                  <div className="space-y-2.5">
                    {[
                      { name: 'CORE', desc: 'HD video · cry detection · two-way talk', color: '#d97706' },
                      { name: 'PULSE', desc: 'AI safety · face cover + prone alerts', color: '#3b82f6' },
                      { name: 'OMNI', desc: 'Breathing · heart rate · full AI suite', color: '#7c3aed' },
                    ].map((m, i) => (
                      <div key={m.name} className={cn('flex items-center gap-3 text-sm', selected === i ? 'opacity-100' : 'opacity-50')}>
                        <span className="w-12 font-bold text-xs shrink-0" style={{ color: m.color }}>{m.name}</span>
                        <span className="text-gray-600 text-xs">{m.desc}</span>
                        {selected === i && <span className="ml-auto text-xs font-bold text-blue-600">Selected</span>}
                      </div>
                    ))}
                  </div>
                  <Link href="/compare" className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline mt-3">
                    Full comparison <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* In the box */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">In the Box</h2>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                    {included.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.color }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* OMNI videos */}
                {selected === 2 && (
                  <div className="mb-6">
                    <h2 className="text-base font-bold text-gray-900 mb-4">See It in Action</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { src: 'https://drive.google.com/file/d/1B0-ROWAAYijHkPadKA3vst7MlvCPzkPC/preview', title: 'Anvaya OMNI 3D Demo' },
                        { src: 'https://drive.google.com/file/d/1P6k7z4eVs4g4XU3Bg__kVbLdSQ-uVh39/preview', title: 'AI Features' },
                      ].map(v => (
                        <div key={v.src} className="rounded-xl overflow-hidden border border-gray-100 bg-black" style={{ aspectRatio: '16/9' }}>
                          <iframe src={v.src} className="w-full h-full" allow="autoplay" title={v.title} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-gray-900">Ratings & Reviews</h2>
                    <div className="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                      4.9 <Star className="w-3.5 h-3.5 fill-white" />
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {reviews.map((r, i) => (
                      <div key={i} className="py-4 first:pt-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                            {r.rating} <Star className="w-2.5 h-2.5 fill-white" />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{r.name}</span>
                          <span className="text-xs text-gray-400">{r.city}</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="mb-6">
                  <h2 className="text-base font-bold text-gray-900 mb-4">Frequently Asked</h2>
                  <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                    {faqs.map((faq, i) => (
                      <div key={i}>
                        <button
                          className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <span className="text-sm font-medium text-gray-800 pr-6">{faq.q}</span>
                          {openFaq === i ? <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />}
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                              <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Explore links */}
                <div className="grid grid-cols-2 gap-2.5 pb-8">
                  {[
                    { href: '/how-it-works', label: 'How it works', sub: 'Radar + AI explained' },
                    { href: '/compare', label: 'Compare models', sub: 'CORE · PULSE · OMNI' },
                    { href: '/technology', label: 'Technology', sub: 'Contactless sensing' },
                    { href: '/cry-analyzer', label: 'Cry Analyzer', sub: 'Try AI demo free' },
                  ].map(({ href, label, sub }) => (
                    <Link key={href} href={href}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all">
                      <div>
                        <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{label}</div>
                        <div className="text-xs text-gray-400">{sub}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    </Link>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 pt-3"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <div className="flex gap-3">
          <button
            onClick={() => window.open(`https://wa.me/917987449366?text=Hi! I want to know more about Anvaya ${cfg.name}`, '_blank')}
            className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            Chat
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!available || !currentVariant}
            className="flex-1 h-11 rounded-xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: '#fb641b' }}
          >
            {available ? `Buy Now · ${price}` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
