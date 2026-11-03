'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useCallback, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Shield, Truck, RefreshCw, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
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
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:max-h-[480px] shrink-0 pb-1 lg:pb-0">
          {images.map((img, i) => (
            <button key={i} onClick={() => go(i, i > idx ? 1 : -1)}
              className={cn('relative shrink-0 rounded-xl overflow-hidden border-2 transition-all bg-gray-50 w-14 h-14 lg:w-16 lg:h-16',
                idx === i ? 'border-gray-900 shadow-sm' : 'border-gray-100 opacity-50 hover:opacity-80 hover:border-gray-300')}>
              <Image src={img} alt="" fill className="object-contain p-1.5" sizes="64px" draggable={false} />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="order-1 lg:order-2 flex-1">
        <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
          onDragEnd={handleDragEnd} style={{ x: dragX, opacity: dragOpacity, aspectRatio: '4/3' }}
          className="relative overflow-hidden rounded-2xl bg-[#f8f7f5] cursor-grab active:cursor-grabbing touch-pan-y">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={idx} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }} className="absolute inset-0">
              <Image src={images[idx]} alt="product" fill className="object-contain p-6 lg:p-10"
                sizes="(max-width: 1024px) 100vw, 55vw" priority draggable={false} />
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => go(i, i > idx ? 1 : -1)}
                  className="rounded-full transition-all"
                  style={{ width: i === idx ? 16 : 6, height: 6, background: i === idx ? color : '#d1d5db' }} />
              ))}
            </div>
          )}

          {/* Desktop arrows */}
          {images.length > 1 && (
            <>
              <button onClick={prev} className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md items-center justify-center text-gray-600 hover:bg-white z-10 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md items-center justify-center text-gray-600 hover:bg-white z-10 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Product list card ─── */
function ProductCard({ prod, onSelect }: { prod: ProductEntry; onSelect: () => void }) {
  const shopify = prod.shopify;
  const variants = shopify?.variants ?? prod.fallbackVariants;
  const minPrice = variants.length ? Math.min(...variants.map(v => parseFloat(String(v.price)))) : null;
  const maxPrice = variants.length > 1 ? Math.max(...variants.map(v => parseFloat(String(v.price)))) : null;
  const thumb = shopify?.images?.[0]?.url ?? prod.localImages?.[0] ?? null;

  return (
    <button onClick={onSelect}
      className="w-full flex items-stretch bg-white border-b border-gray-100 text-left active:bg-gray-50 transition-colors">

      {/* Image panel */}
      <div className="w-32 sm:w-36 shrink-0 relative self-stretch overflow-hidden" style={{ background: prod.bgLight, minHeight: 110 }}>
        {thumb && <Image src={thumb} alt={prod.fullName} fill className="object-contain p-3" sizes="144px" />}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: prod.color }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 px-4 py-3.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: prod.color }}>{prod.name}</span>
            {prod.badge && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white shrink-0"
                style={{ background: prod.color }}>
                {prod.badge.replace(/^\S+\s/, '')}
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-gray-900 leading-tight mb-1">{prod.fullName}</p>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{prod.tagline}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          {minPrice !== null && (
            <p className="text-sm font-bold text-gray-900">
              {formatINR(minPrice)}
              {maxPrice ? <span className="text-xs font-normal text-gray-400"> – {formatINR(maxPrice)}</span> : null}
            </p>
          )}
          <span className="text-xs font-semibold ml-auto" style={{ color: prod.color }}>View →</span>
        </div>
      </div>
    </button>
  );
}

/* ─── Product detail ─── */
function ProductDetail({ products, selected, onBack, faqs }: {
  products: ProductEntry[];
  selected: number;
  onBack: () => void;
  faqs: { q: string; a: string }[];
}) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cfg = products[selected];
  const shopify = cfg.shopify;
  const variants = shopify?.variants ?? cfg.fallbackVariants;
  const currentVariant = variants[variantIdx];
  const price = currentVariant ? formatINR(currentVariant.price) : '—';
  const compareAt = currentVariant?.compareAtPrice ? formatINR(currentVariant.compareAtPrice) : null;
  const available = currentVariant?.availableForSale ?? true;
  const gallery = shopify?.images.length ? shopify.images.map(img => img.url) : cfg.localImages;

  const AMAZON_URL = 'https://www.amazon.in/stores/AnvayaSmart/page/4E8B6271-F5B1-4D84-A055-E6A5E2DCE3D7?lp_asin=B0HK85L2XB&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto&bl_grd_status=override';

  function handleBuyNow() {
    const url = currentVariant?.numericId ? cartUrl(currentVariant.numericId) : null;
    window.open(url ?? AMAZON_URL, '_blank');
  }

  const discount = currentVariant?.compareAtPrice
    ? Math.round((1 - parseFloat(String(currentVariant.price)) / parseFloat(String(currentVariant.compareAtPrice))) * 100)
    : null;

  return (
    <motion.div key="detail" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-50 bg-white flex flex-col">

      {/* Sticky header */}
      <div className="shrink-0 bg-white border-b border-gray-100 flex items-center gap-3 px-4 py-3 safe-top">
        <button onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-900 truncate">{cfg.fullName}</span>
          {cfg.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0" style={{ background: cfg.color }}>
              {cfg.badge.replace(/^\S+\s/, '')}
            </span>
          )}
        </div>
        <span className="text-sm font-bold shrink-0" style={{ color: cfg.color }}>{price}</span>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-0 sm:px-6 pb-28 lg:pb-8">
          <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-12 items-start lg:pt-8">

            {/* Gallery */}
            <div className="lg:sticky lg:top-4">
              <div className="px-4 sm:px-0 pt-4 lg:py-0">
                <Gallery images={gallery} color={cfg.color} />
              </div>
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

            {/* Details */}
            <div className="px-4 sm:px-0 pt-5 lg:pt-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Anvaya Smart</span>
                {cfg.badge && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: cfg.color }}>
                    {cfg.badge}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-1">{cfg.fullName}</h1>
              <p className="text-sm font-semibold mb-1" style={{ color: cfg.color }}>{cfg.tagline}</p>
              <p className="text-xs text-gray-400 mb-5 pb-5 border-b border-gray-100">{cfg.specs}</p>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-3xl font-bold text-gray-900">{price}</span>
                  {compareAt && <span className="text-sm text-gray-400 line-through">{compareAt}</span>}
                  {discount && <span className="text-sm font-bold text-green-600">{discount}% off</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes · Free shipping</p>
              </div>

              {/* Variant picker */}
              {variants.length > 1 && (
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Choose option</p>
                  <div className="flex gap-2 flex-wrap">
                    {variants.map((v, i) => (
                      <button key={v.id} onClick={() => setVariantIdx(i)}
                        className={cn('px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all',
                          variantIdx === i ? 'border-gray-900 bg-gray-50 text-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-300',
                          !v.availableForSale && 'opacity-40 line-through')}>
                        {v.title}
                        <div className="text-xs font-bold mt-0.5" style={{ color: cfg.color }}>{formatINR(v.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!available && currentVariant && (
                <div className="mb-4 text-sm text-orange-700 bg-orange-50 px-4 py-3 rounded-xl border border-orange-100">
                  Out of stock — WhatsApp us to join the waitlist.
                </div>
              )}

              {/* CTAs */}
              <div className="flex gap-3 mb-3">
                <button onClick={handleBuyNow}
                  disabled={!available && !currentVariant?.numericId}
                  className="flex-1 py-4 rounded-2xl text-sm font-bold text-white shadow-sm transition-opacity disabled:opacity-40 active:scale-[0.98]"
                  style={{ background: cfg.color }}>
                  {available ? 'Buy Now' : 'Out of Stock'}
                </button>
                <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center px-5 py-4 rounded-2xl text-sm font-bold border-2 border-[#FF9900]/50 text-[#B45309] bg-[#FFF8EE] hover:bg-[#FFF0D6] transition-colors whitespace-nowrap">
                  Amazon
                </a>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-5"
                onClick={() => window.open(`https://wa.me/917987449366?text=Hi! I want to know more about Anvaya ${cfg.name}`, '_blank')}>
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </button>

              {/* Service strip */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[
                  { icon: Truck, label: 'Free delivery' },
                  { icon: RefreshCw, label: '30-day returns' },
                  { icon: Shield, label: '1-year warranty' },
                ].map(item => (
                  <div key={item.label} className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-3 text-center">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-[11px] font-medium text-gray-600 leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6 pb-6 border-b border-gray-100">{cfg.desc}</p>

              {/* Features */}
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">Key Features</h2>
                <div className="space-y-0 divide-y divide-gray-50">
                  {cfg.features.map((f, i) => {
                    const Icon = ICON_MAP[f.icon] ?? Shield;
                    return (
                      <div key={i} className="flex items-start gap-3 py-3.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${cfg.color}15` }}>
                          <Icon style={{ color: cfg.color, width: 15, height: 15 }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{f.text}</div>
                          <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{f.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* In the box */}
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">In the Box</h2>
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
                  <h2 className="text-base font-bold text-gray-900 mb-3">See It in Action</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { src: 'https://drive.google.com/file/d/1B0-ROWAAYijHkPadKA3vst7MlvCPzkPC/preview', title: 'Anvaya OMNI 3D Demo' },
                      { src: 'https://drive.google.com/file/d/1P6k7z4eVs4g4XU3Bg__kVbLdSQ-uVh39/preview', title: 'AI Features' },
                    ].map(v => (
                      <div key={v.src} className="rounded-2xl overflow-hidden border border-gray-100 bg-black" style={{ aspectRatio: '16/9' }}>
                        <iframe src={v.src} className="w-full h-full" allow="autoplay" title={v.title} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amazon link */}
              <div className="flex items-center gap-3 bg-[#FFF8EE] rounded-2xl px-4 py-3.5 mb-6 border border-[#FF9900]/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M2 8.5C2 8.5 6.5 3 12 3C17.5 3 22 8.5 22 8.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3.5 15C7 19.5 17 19.5 20.5 15" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 3V21M12 21L9 18M12 21L15 18" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#B45309]">Available on Amazon India</p>
                  <p className="text-xs text-[#92400e]/70">Fast delivery · Secure checkout</p>
                </div>
                <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-bold text-[#B45309] hover:underline shrink-0">Shop →</a>
              </div>

              {/* FAQ */}
              <div className="mb-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">Frequently Asked</h2>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                  {faqs.map((faq, i) => (
                    <div key={i}>
                      <button className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span className="text-sm font-medium text-gray-800 pr-4">{faq.q}</span>
                        {openFaq === i
                          ? <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" />
                          : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />}
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                            <p className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explore */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky buy bar */}
      <div className="lg:hidden shrink-0 bg-white border-t border-gray-100 px-4 pt-3"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        <div className="flex gap-3">
          <button onClick={() => window.open(`https://wa.me/917987449366?text=Hi! I want to know more about Anvaya ${cfg.name}`, '_blank')}
            className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-2xl border-2 border-gray-200 text-sm font-medium text-gray-600 shrink-0">
            <MessageCircle className="w-4 h-4" />
            Chat
          </button>
          <button onClick={handleBuyNow} disabled={!available && !currentVariant?.numericId}
            className="flex-1 h-12 rounded-2xl text-sm font-bold text-white disabled:opacity-40 active:scale-[0.98] transition-transform"
            style={{ background: cfg.color }}>
            {available ? `Buy Now · ${price}` : 'Out of Stock'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Inner component (uses useSearchParams) ─── */
function AnvayaInner({ products, faqs }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('p');
  const selected = productId ? products.findIndex(p => p.id === productId) : -1;

  function openProduct(i: number) {
    router.push(`/anvaya?p=${products[i].id}`, { scroll: false });
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* List view */}
      <AnimatePresence>
        {selected === -1 && (
          <motion.div key="list" initial={{ opacity: 1 }}
            exit={{ x: '-25%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] }}>

            {/* Header */}
            <div className="px-4 pt-6 pb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Anvaya Smart</p>
              <h1 className="text-2xl font-bold text-gray-900">Baby Monitors</h1>
              <p className="text-sm text-gray-500 mt-1">3 models · tap to explore</p>
            </div>

            {/* Cards */}
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {products.map((prod, i) => (
                <ProductCard key={prod.id} prod={prod} onSelect={() => openProduct(i)} />
              ))}
            </div>

            {/* Compare strip */}
            <div className="mx-4 mt-5 mb-8 p-4 rounded-2xl border border-blue-100 bg-blue-50">
              <p className="text-sm font-bold text-gray-800 mb-1">Not sure which to pick?</p>
              <p className="text-xs text-gray-500 mb-3">See CORE, PULSE and OMNI side-by-side.</p>
              <Link href="/compare" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
                Full comparison <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail view */}
      <AnimatePresence>
        {selected >= 0 && (
          <ProductDetail
            products={products}
            selected={selected}
            onBack={goBack}
            faqs={faqs}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Export (Suspense wrapper required for useSearchParams) ─── */
export function AnvayaProductPage({ products, faqs }: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white px-4 pt-6">
        <div className="h-6 w-32 bg-gray-100 rounded animate-pulse mb-4" />
        {[0, 1, 2].map(i => (
          <div key={i} className="flex gap-4 border-b border-gray-100 py-4">
            <div className="w-32 h-28 bg-gray-100 rounded-xl animate-pulse shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    }>
      <AnvayaInner products={products} faqs={faqs} />
    </Suspense>
  );
}
