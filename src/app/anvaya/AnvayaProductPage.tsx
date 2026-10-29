'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp,
  Activity, Baby, GitBranch, Heart, Wind, Video, Music, Thermometer,
  BrainCircuit, Zap, Phone, CheckCircle, Package, Lock, MessageCircle,
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
  { name: 'Priya M.', city: 'Bangalore', rating: 5, text: 'The cry analysis is incredibly accurate — it identified a hungry cry before I even got up. First good night of sleep in months.' },
  { name: 'Rahul K.', city: 'Mumbai', rating: 5, text: 'The breathing monitor gave us peace of mind in the first two months. Setup took three minutes.' },
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
function Gallery({ images, color, badge }: { images: string[]; color: string; badge: string | null }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-150, 0, 150], [0.7, 1, 0.7]);
  const DRAG_THRESHOLD = 50;

  const go = useCallback((next: number, d = 0) => { setDir(d); setIdx(next); }, []);
  const prev = () => go((idx - 1 + images.length) % images.length, -1);
  const next = () => go((idx + 1) % images.length, 1);

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -DRAG_THRESHOLD) next();
    else if (info.offset.x > DRAG_THRESHOLD) prev();
    dragX.set(0);
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="select-none">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
        style={{ x: dragX, opacity: dragOpacity, aspectRatio: '1/1' }}
        className="relative rounded-3xl overflow-hidden bg-[#f8f7f5] cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[idx]}
              alt="product"
              fill
              className="object-contain p-8 lg:p-12"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {badge && (
          <div className="absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full z-10" style={{ background: color }}>
            {badge}
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? 1 : -1)}
                className={cn('h-1 rounded-full transition-all duration-300', idx === i ? 'w-5 bg-gray-800' : 'w-1 bg-gray-300')}
              />
            ))}
          </div>
        )}

        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous" className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-sm items-center justify-center text-gray-500 hover:bg-white transition-colors z-10 text-lg leading-none">‹</button>
            <button onClick={next} aria-label="Next" className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-sm items-center justify-center text-gray-500 hover:bg-white transition-colors z-10 text-lg leading-none">›</button>
          </>
        )}
      </motion.div>

      {/* Thumbnails — desktop */}
      <div className="hidden lg:flex gap-2 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => go(i, i > idx ? 1 : -1)}
            className={cn(
              'relative w-16 h-16 rounded-xl overflow-hidden border transition-all bg-[#f8f7f5]',
              idx === i ? 'border-gray-800 opacity-100' : 'border-gray-200 opacity-40 hover:opacity-70'
            )}
          >
            <Image src={img} alt="" fill className="object-contain p-1.5" sizes="64px" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function AnvayaProductPage({ products, faqs }: Props) {
  const [selected, setSelected] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const buyPanelRef = useRef<HTMLDivElement>(null);

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

  function handleSelectProduct(i: number) {
    setSelected(i);
    setVariantIdx(0);
  }

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-3 text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span className="text-gray-200">/</span>
          <Link href="/anvaya" className="hover:text-gray-600 transition-colors">Baby Monitors</Link>
          <span className="text-gray-200">/</span>
          <span className="text-gray-600">{cfg.fullName}</span>
        </div>
      </div>

      {/* Mobile model tabs — sticky */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="flex">
          {products.map((prod, i) => (
            <button
              key={prod.id}
              onClick={() => handleSelectProduct(i)}
              className={cn(
                'flex-1 py-3 text-sm font-medium transition-colors border-b-2',
                selected === i ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400'
              )}
            >
              {prod.name}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="order-2 lg:order-1 space-y-12">

            <AnimatePresence mode="wait">
              <motion.div key={`gallery-${selected}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                <Gallery images={gallery} color={cfg.color} badge={cfg.badge} />
              </motion.div>
            </AnimatePresence>

            {/* Shipping / returns / security strip */}
            <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 gap-4">
              {[
                { icon: Truck, label: 'Free shipping', sub: 'All India' },
                { icon: RefreshCw, label: '30-day returns', sub: 'No questions' },
                { icon: Lock, label: 'Secure checkout', sub: 'Razorpay · UPI' },
              ].map((t, i) => (
                <div key={t.label} className={cn('flex items-center gap-3 flex-1', i < 2 && 'border-r border-gray-100')}>
                  <t.icon className="w-4 h-4 text-gray-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{t.label}</div>
                    <div className="text-xs text-gray-400">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">What {cfg.name} does</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`features-${selected}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  {cfg.features.map((f, i) => {
                    const Icon = ICON_MAP[f.icon] ?? Shield;
                    return (
                      <motion.div
                        key={`${selected}-${f.text}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${cfg.color}12` }}>
                          <Icon style={{ color: cfg.color, width: 15, height: 15 }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{f.text}</div>
                          <div className="text-sm text-gray-400 mt-0.5">{f.sub}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* OMNI videos */}
            {selected === 2 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">See it in action</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { src: 'https://drive.google.com/file/d/1B0-ROWAAYijHkPadKA3vst7MlvCPzkPC/preview', title: 'Anvaya OMNI 3D Demo' },
                    { src: 'https://drive.google.com/file/d/1P6k7z4eVs4g4XU3Bg__kVbLdSQ-uVh39/preview', title: 'Anvaya OMNI AI Features' },
                  ].map(v => (
                    <div key={v.src} className="rounded-2xl overflow-hidden border border-gray-100 bg-black" style={{ aspectRatio: '16/9' }}>
                      <iframe src={v.src} className="w-full h-full" allow="autoplay" title={v.title} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's in the box */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">In the box</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {included.map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 shrink-0 text-gray-300" style={{ color: cfg.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews — minimal */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                <span className="text-sm font-semibold text-gray-800">4.9</span>
                <span className="text-sm text-gray-400">from pilot families</span>
              </div>
              <div className="space-y-5">
                {reviews.map((r, i) => (
                  <div key={i} className="border-t border-gray-100 pt-5 first:border-0 first:pt-0">
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                    <div className="text-xs text-gray-400">{r.name}, {r.city}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">Questions</p>
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      className="w-full flex items-center justify-between py-4 text-left"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="text-sm font-medium text-gray-800 pr-6">{faq.q}</span>
                      {openFaq === i
                        ? <ChevronUp className="w-4 h-4 shrink-0 text-gray-400" />
                        : <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />}
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-gray-100 pt-8">
              {[
                { href: '/how-it-works', label: 'How it works', sub: 'Radar + AI' },
                { href: '/compare', label: 'Compare models', sub: 'CORE · PULSE · OMNI' },
                { href: '/technology', label: 'Technology', sub: 'Contactless sensing' },
                { href: '/cry-analyzer', label: 'Cry Analyzer', sub: 'Try AI demo' },
              ].map(({ href, label, sub }) => (
                <Link key={href} href={href}
                  className="group flex flex-col gap-1 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                  <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Buy panel ── */}
          <div ref={buyPanelRef} className="order-1 lg:order-2 lg:sticky lg:top-20">

            {/* Desktop model selector — text tabs */}
            <div className="hidden lg:flex border-b border-gray-100 mb-7">
              {products.map((prod, i) => (
                <button
                  key={prod.id}
                  onClick={() => handleSelectProduct(i)}
                  className={cn(
                    'flex-1 pb-3 text-sm font-medium transition-colors border-b-2 -mb-px',
                    selected === i ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
                  )}
                >
                  {prod.name}
                  <div className="text-xs font-normal mt-0.5 text-gray-400">
                    {(() => {
                      const v = prod.shopify?.variants[0] ?? prod.fallbackVariants[0];
                      return v ? `from ${formatINR(v.price)}` : '';
                    })()}
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`panel-${selected}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
              >
                {cfg.badge && (
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md mb-4 text-white" style={{ background: cfg.color }}>
                    {cfg.badge}
                  </span>
                )}

                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-1">{cfg.fullName}</h1>
                <p className="text-sm font-medium mb-3" style={{ color: cfg.color }}>{cfg.tagline}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{cfg.desc}</p>

                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                  <span className="text-xs text-gray-400">4.9 · 73+ families</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-gray-900 tracking-tight">{price}</span>
                  {compareAt && <span className="text-sm text-gray-400 line-through">{compareAt}</span>}
                </div>
                <p className="text-xs text-gray-400 mb-6">Inclusive of all taxes · free shipping</p>

                {!available && currentVariant && (
                  <div className="mb-5 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
                    Currently out of stock — message us on WhatsApp to join the waitlist.
                  </div>
                )}

                {/* Variant picker */}
                {variants.length > 1 && (
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-500 mb-2.5">Choose option</p>
                    <div className="grid grid-cols-2 gap-2">
                      {variants.map((v, i) => (
                        <button
                          key={v.id}
                          onClick={() => setVariantIdx(i)}
                          className={cn(
                            'text-left p-3.5 rounded-xl border transition-all',
                            variantIdx === i ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300',
                            !v.availableForSale && 'opacity-40'
                          )}
                        >
                          <div className="text-xs text-gray-500 mb-0.5">{v.title}</div>
                          <div className="text-base font-bold text-gray-900">{formatINR(v.price)}</div>
                          {!v.availableForSale && <div className="text-xs text-gray-400 mt-0.5">Out of stock</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary CTA */}
                <button
                  onClick={handleBuyNow}
                  disabled={!available || !currentVariant}
                  className="w-full h-14 rounded-xl font-semibold text-base text-white transition-opacity disabled:opacity-40 mb-3"
                  style={{ background: cfg.color }}
                >
                  {available ? 'Add to Cart' : 'Out of Stock'}
                </button>

                {/* Secondary — WhatsApp */}
                <button
                  className="w-full h-12 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
                  onClick={() => window.open(`https://wa.me/917987449366?text=Hi! I want to know more about Anvaya ${cfg.name}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask us on WhatsApp
                </button>

                {/* Trust row */}
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                  <span>Free shipping</span>
                  <span className="text-gray-200">·</span>
                  <span>30-day returns</span>
                  <span className="text-gray-200">·</span>
                  <span>1-year warranty</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Compare widget */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-400 mb-3">Comparing models</p>
              <div className="space-y-3">
                {[
                  { name: 'CORE', desc: 'HD video · cry detection · two-way talk', color: '#d97706' },
                  { name: 'PULSE', desc: 'AI safety · face cover + prone alerts', color: '#3b82f6' },
                  { name: 'OMNI', desc: 'Breathing · heart rate · full AI suite', color: '#7c3aed' },
                ].map(m => (
                  <div key={m.name} className={cn('flex items-start gap-3 text-sm', selected === products.findIndex(p => p.name === m.name) ? 'opacity-100' : 'opacity-40')}>
                    <span className="font-semibold w-12 shrink-0" style={{ color: m.color }}>{m.name}</span>
                    <span className="text-gray-500">{m.desc}</span>
                  </div>
                ))}
              </div>
              <Link href="/compare" className="text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors mt-4 block">Full comparison →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/97 border-t border-gray-100 px-4 pt-3"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 truncate">{cfg.fullName}</div>
            <div className="text-base font-bold text-gray-900 mt-0.5">{price}</div>
          </div>
          <button
            onClick={handleBuyNow}
            disabled={!available || !currentVariant}
            className="shrink-0 h-11 px-6 rounded-xl text-sm font-semibold text-white disabled:opacity-40 transition-opacity"
            style={{ background: cfg.color }}
          >
            {available ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
