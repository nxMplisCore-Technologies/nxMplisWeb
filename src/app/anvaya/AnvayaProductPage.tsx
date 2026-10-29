'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp,
  Activity, Baby, GitBranch, Heart, Wind, Video, Music, Thermometer,
  BrainCircuit, Zap, Phone, CheckCircle, Package, Lock,
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
  { name: 'Priya M.', city: 'Bangalore', rating: 5, text: 'Finally slept through the night knowing Anvaya is watching. The cry analysis is incredibly accurate — it identified a hungry cry before I even got up.', product: 'OMNI', avatar: 'PM' },
  { name: 'Rahul K.', city: 'Mumbai', rating: 5, text: 'Worth every rupee. The breathing monitor gave us so much peace of mind in the first two months. Setup took literally 3 minutes.', product: 'OMNI', avatar: 'RK' },
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

/* ─── Touch-swipeable image carousel ─── */
function Gallery({ images, color, badge, onSwipe }: {
  images: string[];
  color: string;
  badge: string | null;
  onSwipe?: (dir: 1 | -1) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-120, 0, 120], [0.6, 1, 0.6]);
  const DRAG_THRESHOLD = 50;

  const go = useCallback((next: number) => {
    const d = next > idx ? 1 : -1;
    setDir(d);
    setIdx(next);
    onSwipe?.(d as 1 | -1);
  }, [idx, onSwipe]);

  const prev = () => go((idx - 1 + images.length) % images.length);
  const next = () => go((idx + 1) % images.length);

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    if (info.offset.x < -DRAG_THRESHOLD) next();
    else if (info.offset.x > DRAG_THRESHOLD) prev();
    dragX.set(0);
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative select-none">
      {/* Main image — touch-draggable */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={handleDragEnd}
        style={{ x: dragX, opacity: dragOpacity, aspectRatio: '1/1' }}
        className="relative rounded-2xl overflow-hidden bg-[#f7f5f2] border border-gray-100 cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={idx}
            custom={dir}
            variants={variants}
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
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {badge && (
          <div className="absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow z-10" style={{ background: color }}>
            {badge}
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[10px] font-medium text-gray-700 px-2.5 py-1 rounded-full shadow-sm border border-gray-100 flex items-center gap-1 z-10">
          <Shield className="w-3 h-3 text-green-500" /> Contactless
        </div>

        {/* Arrow buttons — hidden on mobile (swipe), shown on desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow border border-gray-200 items-center justify-center text-gray-600 hover:bg-white transition-colors z-10"
            >‹</button>
            <button
              onClick={next}
              aria-label="Next image"
              className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow border border-gray-200 items-center justify-center text-gray-600 hover:bg-white transition-colors z-10"
            >›</button>
          </>
        )}

        {/* Dot indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn('h-1.5 rounded-full transition-all duration-200 bg-gray-800/60', idx === i ? 'w-4 opacity-100' : 'w-1.5 opacity-30')}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Thumbnail strip — desktop only */}
      <div className="hidden lg:flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={cn(
              'relative rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#f7f5f2] w-[68px] h-[68px]',
              idx === i ? 'border-gray-900 opacity-100 shadow-sm' : 'border-gray-200 opacity-40 hover:opacity-80 hover:border-gray-400'
            )}
          >
            <Image src={img} alt="" fill className="object-contain p-1.5" sizes="68px" draggable={false} />
          </button>
        ))}
      </div>

      {/* Mobile: swipe hint — shown only if multiple images */}
      {images.length > 1 && (
        <p className="lg:hidden text-center text-[10px] text-gray-300 mt-2 tracking-wide">swipe to browse</p>
      )}
    </div>
  );
}

export function AnvayaProductPage({ products, faqs }: Props) {
  const [selected, setSelected] = useState(1); // PULSE default
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
        <div className="container mx-auto px-4 py-2.5 text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/anvaya" className="hover:text-gray-600 transition-colors">Baby Monitors</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{cfg.fullName}</span>
        </div>
      </div>

      {/* ─── Mobile model picker (top pill tabs) ─── */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2.5">
        <div className="flex gap-2">
          {products.map((prod, i) => (
            <button
              key={prod.id}
              onClick={() => handleSelectProduct(i)}
              className={cn(
                'flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all border-2',
                selected === i ? 'text-white shadow-sm' : 'border-gray-200 text-gray-400 bg-white'
              )}
              style={selected === i ? { background: prod.color, borderColor: prod.color } : {}}
            >
              <div>{prod.name}</div>
              <div className={cn('text-[9px] font-normal mt-0.5', selected === i ? 'opacity-80' : 'opacity-50')}>
                {(() => {
                  const v = prod.shopify?.variants[0] ?? prod.fallbackVariants[0];
                  return v ? `from ${formatINR(v.price)}` : '—';
                })()}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-5 lg:py-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-6 lg:gap-14 items-start">

          {/* ── LEFT — Gallery + Details ── */}
          <div className="order-2 lg:order-1">

            <AnimatePresence mode="wait">
              <motion.div
                key={`gallery-${selected}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Gallery images={gallery} color={cfg.color} badge={cfg.badge} />
              </motion.div>
            </AnimatePresence>

            {/* Trust bar */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'All India' },
                { icon: RefreshCw, label: '30-Day Returns', sub: 'No questions' },
                { icon: Lock, label: 'Secure Pay', sub: 'Razorpay · UPI' },
              ].map(t => (
                <div key={t.label} className="flex flex-col items-center text-center gap-1.5 py-3 rounded-xl border border-gray-100 bg-gray-50">
                  <t.icon className="w-4 h-4 text-gray-400" />
                  <div className="text-[10px] font-semibold text-gray-700 leading-tight">{t.label}</div>
                  <div className="text-[9px] text-gray-400">{t.sub}</div>
                </div>
              ))}
            </div>

            {/* Feature grid */}
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">What {cfg.fullName} does for you</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`features-${selected}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
                >
                  {cfg.features.map((f, i) => {
                    const Icon = ICON_MAP[f.icon] ?? Shield;
                    return (
                      <motion.div
                        key={`${selected}-${f.text}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.28 }}
                        className="flex items-start gap-3 p-3.5 rounded-2xl border border-gray-100 bg-white"
                      >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${cfg.color}15` }}>
                          <Icon style={{ color: cfg.color, width: 16, height: 16 }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-gray-800 leading-tight">{f.text}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{f.sub}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* OMNI videos */}
            {selected === 2 && (
              <div className="mt-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">See it in action</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { src: 'https://drive.google.com/file/d/1B0-ROWAAYijHkPadKA3vst7MlvCPzkPC/preview', title: 'Anvaya OMNI 3D Demo' },
                    { src: 'https://drive.google.com/file/d/1P6k7z4eVs4g4XU3Bg__kVbLdSQ-uVh39/preview', title: 'Anvaya OMNI AI Features' },
                  ].map(v => (
                    <div key={v.src} className="rounded-2xl overflow-hidden border border-gray-100 bg-black shadow-sm" style={{ aspectRatio: '16/9' }}>
                      <iframe src={v.src} className="w-full h-full" allow="autoplay" title={v.title} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's in the box */}
            <div className="mt-8 rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-800">What's in the box</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5 p-5">
                {included.map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: cfg.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <span className="font-bold text-sm text-gray-800">4.9</span>
                <span className="text-xs text-gray-400">· Pilot family feedback</span>
              </div>
              {/* Mobile: horizontal scroll; desktop: 2-col grid */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
                {reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shrink-0 w-[280px] sm:w-auto"
                  >
                    <div className="flex mb-2">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
                    <div className="flex items-center gap-2">
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
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Frequently asked</p>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-sm text-gray-800 pr-4 leading-snug">{faq.q}</span>
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
                          <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-links */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { href: '/how-it-works', label: 'How it works', sub: 'Radar + AI explained', emoji: '🔬' },
                { href: '/compare', label: 'Compare models', sub: 'CORE vs PULSE vs OMNI', emoji: '⚖️' },
                { href: '/technology', label: 'Technology', sub: 'Contactless sensing', emoji: '⚡' },
                { href: '/cry-analyzer', label: 'Cry Analyzer', sub: 'AI cry demo', emoji: '👶' },
              ].map(({ href, label, sub, emoji }) => (
                <Link key={href} href={href}
                  className="flex flex-col items-center text-center gap-1.5 bg-white rounded-2xl p-3.5 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group">
                  <span className="text-xl">{emoji}</span>
                  <div className="text-xs font-semibold text-gray-800 group-hover:text-primary transition-colors leading-tight">{label}</div>
                  <div className="text-[10px] text-gray-400 leading-tight">{sub}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Buy panel (sticky on desktop, inline on mobile) ── */}
          <div ref={buyPanelRef} className="order-1 lg:order-2 lg:sticky lg:top-20">

            {/* Desktop model selector */}
            <div className="hidden lg:block mb-5">
              <div className="text-xs font-semibold text-gray-500 mb-2.5">Select model</div>
              <div className="grid grid-cols-3 gap-2">
                {products.map((prod, i) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectProduct(i)}
                    className={cn(
                      'flex flex-col items-center py-3 px-2 rounded-xl border-2 text-xs font-bold transition-all',
                      selected === i ? 'shadow-sm' : 'border-gray-200 text-gray-400 hover:border-gray-300'
                    )}
                    style={selected === i ? { borderColor: prod.color, color: prod.color, background: prod.bgLight } : {}}
                  >
                    <div className="w-7 h-7 rounded-full mb-1.5 flex items-center justify-center text-[10px] font-black text-white" style={{ background: selected === i ? prod.color : '#d1d5db' }}>
                      {prod.name[0]}
                    </div>
                    {prod.name}
                    <div className="text-[9px] font-normal mt-0.5 opacity-60">
                      {(() => {
                        const v = prod.shopify?.variants[0] ?? prod.fallbackVariants[0];
                        return v ? `from ${formatINR(v.price)}` : '—';
                      })()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`panel-${selected}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {cfg.badge && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3 text-white" style={{ background: cfg.color }}>
                    {cfg.badge}
                  </div>
                )}

                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Anvaya Smart</div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1.5">{cfg.fullName}</h1>
                <p className="text-sm text-gray-400 font-medium mb-1" style={{ color: cfg.color }}>{cfg.tagline}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{cfg.desc}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                  <span className="text-xs text-gray-400">4.9 · 73+ families</span>
                </div>

                <div className="h-px bg-gray-100 mb-4" />

                {/* Price */}
                <div className="flex items-baseline gap-2.5 mb-0.5">
                  <span className="text-2xl font-bold text-gray-900">{price}</span>
                  {compareAt && <span className="text-sm text-gray-400 line-through">{compareAt}</span>}
                </div>
                <div className="text-xs text-gray-400 mb-4">incl. taxes · free shipping India</div>

                {!available && currentVariant && (
                  <div className="mb-4 text-xs font-semibold text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">
                    Currently out of stock — join waitlist via WhatsApp
                  </div>
                )}

                {/* Variant picker */}
                {variants.length > 1 && (
                  <div className="mb-5">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Choose option:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {variants.map((v, i) => (
                        <button
                          key={v.id}
                          onClick={() => setVariantIdx(i)}
                          className={cn(
                            'text-left p-3 rounded-xl border-2 transition-all',
                            variantIdx === i ? 'shadow-sm' : 'border-gray-200 hover:border-gray-300',
                            !v.availableForSale && 'opacity-50'
                          )}
                          style={variantIdx === i ? { borderColor: cfg.color, background: cfg.bgLight } : {}}
                        >
                          <div className="text-xs font-bold leading-tight" style={{ color: variantIdx === i ? cfg.color : '#374151' }}>{v.title}</div>
                          <div className="text-base font-black mt-0.5" style={{ color: variantIdx === i ? cfg.color : '#111827' }}>{formatINR(v.price)}</div>
                          {!v.availableForSale && <div className="text-[9px] text-gray-400 mt-0.5">Out of stock</div>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <Button
                  size="lg"
                  onClick={handleBuyNow}
                  disabled={!available || !currentVariant}
                  className="w-full h-14 text-base font-bold text-white rounded-xl mb-3 shadow-lg disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg,${cfg.color}dd,${cfg.color})`, boxShadow: `0 4px 20px ${cfg.color}40` }}
                >
                  {available ? 'Add to Cart' : 'Out of Stock'}
                </Button>

                <button
                  className="w-full h-12 text-sm font-semibold rounded-xl border-2 flex items-center justify-center gap-2 transition-colors hover:bg-green-50 mb-4"
                  style={{ borderColor: '#25D366', color: '#25D366' }}
                  onClick={() => window.open(`https://wa.me/919876543210?text=Hi! I want to order Anvaya ${cfg.name}`, '_blank')}
                >
                  <Phone className="w-4 h-4" /> Order via WhatsApp
                </button>

                <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-400 mb-5">
                  {['✓ Free shipping India', '✓ 30-day money-back', '✓ 1-year warranty', '✓ Secure checkout'].map(t => (
                    <div key={t}>{t}</div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Model compare mini */}
            <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50">
              <div className="text-xs font-bold text-gray-700 mb-2.5">Not sure which model?</div>
              <div className="space-y-2">
                {[
                  { name: 'CORE', desc: 'HD video + cry detection', color: '#d97706' },
                  { name: 'PULSE ⭐', desc: 'AI safety · face cover + prone', color: '#3b82f6' },
                  { name: 'OMNI', desc: 'Breathing + heart rate + AI', color: '#7c3aed' },
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

      {/* Mobile sticky CTA bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 pb-safe"
        style={{
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-800 truncate">{cfg.fullName}</div>
            <div className="text-sm font-bold mt-0.5" style={{ color: cfg.color }}>{price}</div>
          </div>
          <button
            onClick={() => {
              buyPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setTimeout(handleBuyNow, 300);
            }}
            disabled={!available || !currentVariant}
            className="shrink-0 px-5 py-3 rounded-xl font-bold text-sm text-white disabled:opacity-50"
            style={{ background: `linear-gradient(135deg,${cfg.color}dd,${cfg.color})`, boxShadow: `0 4px 16px ${cfg.color}50` }}
          >
            {available ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
