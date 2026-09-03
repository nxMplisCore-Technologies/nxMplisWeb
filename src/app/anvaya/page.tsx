'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Truck, RefreshCw, ChevronDown, ChevronUp, Activity, Baby, GitBranch, Heart, Wind, Video, Music, Thermometer, BrainCircuit, Zap, Phone, Quote, CheckCircle, Package, Lock, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

const SHOPIFY_DOMAIN = 'anvayasmart.myshopify.com';

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
    gallery: ['/anvaya-core-1.jpg', '/anvaya-core-2.jpg', '/anvaya-core-3.jpg', '/anvaya-core-4.jpg', '/anvaya-core-5.jpg'],
    badge: null,
    color: '#d97706',
    bgLight: '#fffbeb',
    shopifyHandle: 'anvaya-smart-core-audio-and-video-baby-monitor',
    variants: [
      { label: 'Without Display', variantId: '50746014892255', price: 8999 },
      { label: 'With 5" Display', variantId: '50817486258399', price: 12999 },
    ],
    features: [
      { icon: Video, text: 'HD Video', sub: 'Live view from anywhere' },
      { icon: Baby, text: 'Cry Detection', sub: '5 cry types identified' },
      { icon: Music, text: 'Lullabies', sub: 'Built-in & white noise' },
      { icon: Thermometer, text: 'Temperature', sub: 'Room monitoring' },
      { icon: Wifi, text: 'Remote Access', sub: 'Anywhere via app' },
      { icon: Shield, text: 'Contactless', sub: 'Nothing touches baby' },
    ],
  },
  {
    id: 'sense',
    name: 'SENSE',
    fullName: 'Anvaya SENSE',
    tagline: 'The Wellness Pod That Watches Every Breath.',
    desc: 'India\'s most loved baby wellness pod. Tracks breathing, SpO₂, heart rate and cry type — completely contactlessly.',
    price: 14999,
    mrp: 19999,
    image: '/anvaya-sense.jpg',
    gallery: ['/anvaya-sense.jpg', '/anvaya-nursery.jpg', '/anvaya-device-baby.webp', '/anvaya-nursery-center.webp', '/anvaya-lifestyle.webp'],
    badge: '⭐ Best Seller',
    color: '#4a7c6f',
    bgLight: '#f0faf6',
    shopifyHandle: 'anvaya-smart-sense-audio-and-video-baby-monitor',
    variants: [
      { label: 'Without Display', variantId: '50745192939743', price: 14999 },
      { label: 'With 5" Display', variantId: '50817450934495', price: 17999 },
    ],
    features: [
      { icon: Activity, text: 'Breathing Rate', sub: 'Contactless monitoring' },
      { icon: Heart, text: 'Heart Rate', sub: 'Real-time tracking' },
      { icon: Baby, text: 'Cry Analysis', sub: 'Hungry / tired / pain' },
      { icon: Wind, text: 'Air Quality', sub: 'Humidity alerts' },
      { icon: Shield, text: 'Face Cover Alert', sub: 'Safety detection' },
      { icon: Wifi, text: 'SpO₂ Monitoring', sub: 'Oxygen saturation' },
    ],
  },
  {
    id: 'pulse',
    name: 'PULSE',
    fullName: 'Anvaya PULSE',
    tagline: 'Stay Connected to Every Moment.',
    desc: 'Advanced environment and wellness monitoring. Know your baby\'s complete world — temperature, humidity, movement and real-time safety alerts.',
    price: 17999,
    mrp: 22999,
    image: '/anvaya-pulse.jpg',
    gallery: ['/anvaya-pulse.jpg', '/anvaya-room.webp', '/anvaya-nursery-center.webp', '/anvaya-device-baby.webp', '/anvaya-lifestyle.webp'],
    badge: null,
    color: '#3b82f6',
    bgLight: '#eff6ff',
    shopifyHandle: 'anvaya-smart-pulse-video-and-audio-baby-monitor',
    variants: [
      { label: 'Without Display', variantId: '50745881690335', price: 17999 },
      { label: 'With 5" Display', variantId: '50817349419231', price: 21999 },
    ],
    features: [
      { icon: Activity, text: 'Movement Tracking', sub: 'Activity detection' },
      { icon: Thermometer, text: 'Temperature', sub: 'Perfect sleep env' },
      { icon: Wind, text: 'Humidity', sub: 'Air quality alerts' },
      { icon: Shield, text: 'Safety Alerts', sub: 'Instant notifications' },
      { icon: Zap, text: 'Push Alerts', sub: 'Real-time on phone' },
      { icon: Wifi, text: 'Remote View', sub: 'HD video anywhere' },
    ],
  },
  {
    id: 'omni',
    name: 'OMNI',
    fullName: 'Anvaya OMNI',
    tagline: 'Total Awareness. Complete Peace of Mind.',
    desc: 'India\'s most advanced baby wellness pod. 360° intelligent monitoring with Predictive AI — weekly health reports, SpO₂ tracking, and alerts before problems arise.',
    price: 20999,
    mrp: 29999,
    image: '/anvaya-omni.jpg',
    gallery: ['/anvaya-omni.jpg', '/anvaya-core-6.jpg', '/anvaya-core-7.jpg', '/anvaya-nursery.jpg', '/anvaya-room.webp'],
    badge: '🏆 Most Advanced',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    shopifyHandle: 'anvaya-smart-omni-baby-monitor',
    variants: [
      { label: 'Without Display', variantId: '50744670486751', price: 20999 },
      { label: 'With 5" Display', variantId: '50817578696927', price: 24999 },
    ],
    features: [
      { icon: Activity, text: 'Breathing + SpO₂', sub: 'All contactless' },
      { icon: Heart, text: 'Heart Rate', sub: 'Continuous tracking' },
      { icon: BrainCircuit, text: 'Predictive AI', sub: 'Alerts before risk' },
      { icon: GitBranch, text: '360° Coverage', sub: 'Full room awareness' },
      { icon: Heart, text: 'Weekly Reports', sub: 'AI health insights' },
      { icon: Shield, text: 'Smart Alerts', sub: 'Before problems arise' },
    ],
  },
];

const reviews = [
  { name: 'Priya M.', city: 'Bangalore', rating: 5, text: 'Finally slept through the night knowing Anvaya is watching. The cry analysis is incredibly accurate — it identified a hungry cry before I even got up.', product: 'SENSE', avatar: 'PM' },
  { name: 'Rahul K.', city: 'Mumbai', rating: 5, text: 'Worth every rupee. The breathing monitor gave us so much peace of mind in the first two months. Setup took literally 3 minutes.', product: 'SENSE', avatar: 'RK' },
  { name: 'Ananya S.', city: 'Hyderabad', rating: 5, text: 'The sleep score feature is genius. We knew exactly when our baby hit deep sleep and stopped tiptoeing around!', product: 'OMNI', avatar: 'AS' },
  { name: 'Meera R.', city: 'Chennai', rating: 5, text: 'As a first-time mother, I was anxious every night. Anvaya OMNI changed everything — real-time breathing alerts and AI insights. Best investment.', product: 'OMNI', avatar: 'MR' },
];

const faqs = [
  { q: 'Does anything touch my baby?', a: 'No. Anvaya is completely contactless. The wellness pod sits beside the crib on a shelf or table. It uses radar and infrared sensing — nothing attaches to your baby\'s skin.' },
  { q: 'When will I receive my order?', a: 'Anvaya Smart is currently in pre-order. Delivery across India takes 3–7 working days after dispatch. Free shipping on all orders.' },
  { q: 'What if I\'m not happy?', a: '30-day money-back guarantee — no questions asked. If Anvaya doesn\'t give you peace of mind, we\'ll refund every rupee including return shipping.' },
  { q: 'Which model should I buy?', a: 'SENSE is our most popular for new parents — it covers breathing, SpO₂, cry analysis and sleep. For the complete picture with AI health reports, go with OMNI.' },
  { q: 'Is my data private?', a: 'All processing happens on the device. No health data, video or audio is ever sent to external servers. Your family\'s privacy is a design principle.' },
];

const included = ['Anvaya Smart pod', 'Magnetic mounting bracket', 'USB-C cable + adapter', 'Anvaya app (iOS & Android)', '1-year premium subscription FREE', 'Quick setup guide'];

export default function AnvayaPage() {
  const [selected, setSelected] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const p = products[selected];
  const variant = p.variants[variantIdx];
  const discount = Math.round((1 - variant.price / p.mrp) * 100);

  function handleBuyNow() {
    window.open(`https://${SHOPIFY_DOMAIN}/cart/${variant.variantId}:1?storefront=true`, '_blank');
  }

  function handleSelectProduct(i: number) {
    setSelected(i);
    setVariantIdx(0);
    setGalleryIdx(0);
  }

  return (
    <div className="min-h-screen bg-white pb-28 md:pb-0">

      {products.map(prod => (
        <ProductSchema key={prod.id} name={`${prod.fullName} — AI Baby Wellness Pod`} description={prod.desc} price={prod.price.toString()} sku={prod.id.toUpperCase()} image={`https://nxmplis.com${prod.image}`} features={prod.features.map(f => f.text)} />
      ))}
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Baby Wellness Pods', url: 'https://nxmplis.com/anvaya' }]} />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 py-2.5 text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/anvaya" className="hover:text-gray-600 transition-colors">Baby Wellness Pods</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{p.fullName}</span>
        </div>
      </div>

      {/* ── Main PDP layout ── */}
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-8 lg:gap-14 items-start">

          {/* LEFT — Image gallery */}
          <div className="order-2 lg:order-1">

            {/* Gallery: vertical thumbs on desktop, horizontal strip on mobile */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">

              {/* Thumbnail column — desktop left, mobile bottom strip */}
              <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible scrollbar-hide">
                {p.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIdx(i)}
                    className={cn(
                      'relative rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#f7f5f2]',
                      'w-16 h-16 lg:w-[72px] lg:h-[72px]',
                      galleryIdx === i
                        ? 'border-gray-900 shadow-sm'
                        : 'border-gray-200 hover:border-gray-400 opacity-60 hover:opacity-100'
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
                      src={p.gallery[galleryIdx]}
                      alt={`${p.fullName} baby wellness pod`}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    {p.badge && (
                      <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow" style={{ background: p.color }}>
                        {p.badge}
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-700 px-3 py-1.5 rounded-full shadow-sm border border-gray-100 flex items-center gap-1.5">
                      <Shield className="w-3 h-3 text-green-500" /> Nothing touches baby
                    </div>

                    {/* Prev / Next arrows */}
                    {p.gallery.length > 1 && (
                      <>
                        <button
                          onClick={() => setGalleryIdx(g => (g - 1 + p.gallery.length) % p.gallery.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setGalleryIdx(g => (g + 1) % p.gallery.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
                        >
                          ›
                        </button>
                      </>
                    )}

                    {/* Dot indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                      {p.gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIdx(i)}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-all',
                            galleryIdx === i ? 'bg-gray-800 w-4' : 'bg-gray-400/60'
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Across India' },
                { icon: RefreshCw, label: '30-Day Returns', sub: 'No questions asked' },
                { icon: Lock, label: 'Secure Checkout', sub: 'Razorpay / UPI' },
              ].map(t => (
                <div key={t.label} className="flex flex-col items-center text-center gap-2 py-4 rounded-2xl border border-gray-100 bg-gray-50">
                  <t.icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-[11px] font-semibold text-gray-800">{t.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Feature icon grid ── */}
            <div className="mt-10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">What {p.fullName} monitors</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {p.features.map((f, i) => (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${p.color}15` }}>
                      <f.icon style={{ color: p.color, width: 18, height: 18 }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">{f.text}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 leading-tight">{f.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product videos — OMNI only */}
            {selected === 3 && (
              <div className="mt-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">See it in action</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-black shadow-sm" style={{ aspectRatio: '16/9' }}>
                    <iframe src="https://drive.google.com/file/d/1B0-ROWAAYijHkPadKA3vst7MlvCPzkPC/preview" className="w-full h-full" allow="autoplay" title="Anvaya OMNI — 3D Product Demo" />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-black shadow-sm" style={{ aspectRatio: '16/9' }}>
                    <iframe src="https://drive.google.com/file/d/1P6k7z4eVs4g4XU3Bg__kVbLdSQ-uVh39/preview" className="w-full h-full" allow="autoplay" title="Anvaya OMNI — AI Features" />
                  </div>
                </div>
              </div>
            )}

            {/* What's in the box */}
            <div className="mt-10 rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-bold text-gray-800">What's in the box</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 p-6">
                {included.map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Customer reviews</div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                    <span className="font-bold text-gray-800">4.9</span>
                    <span className="text-sm text-gray-400">· Pilot family feedback</span>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex mb-2">{[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: p.color }}>
                        {r.avatar}
                      </div>
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
                    <button
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-sm text-gray-800 pr-4">{faq.q}</span>
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

          {/* RIGHT — Buy panel (sticky) */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-20">

            {/* Badge */}
            {p.badge && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-3 text-white" style={{ background: p.color }}>
                {p.badge}
              </div>
            )}

            {/* Title + tagline */}
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Anvaya Smart</div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{p.fullName}</h1>
            <p className="text-base font-medium text-gray-600 leading-relaxed mb-4">{p.desc}</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
              <span className="text-xs text-gray-500">4.9 · Pilot family feedback</span>
            </div>

            <div className="border-t border-gray-100 pt-5" />

            {/* Price — clean, no discount theater */}
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-2xl font-bold text-gray-900">₹{variant.price.toLocaleString('en-IN')}</span>
              <span className="text-sm text-gray-400">incl. taxes · free shipping</span>
            </div>

            <div className="border-t border-gray-100 pt-5 mb-5" />

            {/* Model selector */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-gray-700 mb-2.5">
                Model: <span style={{ color: p.color }} className="font-bold">{p.fullName}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {products.map((prod, i) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectProduct(i)}
                    className={cn(
                      'flex flex-col items-center py-2.5 px-1 rounded-xl border-2 text-[11px] font-bold transition-all',
                      selected === i ? 'shadow-sm' : 'border-gray-200 text-gray-400 hover:border-gray-300'
                    )}
                    style={selected === i ? { borderColor: prod.color, color: prod.color, background: prod.bgLight } : {}}
                  >
                    <div className="w-6 h-6 rounded-full mb-1 flex items-center justify-center text-[9px] font-black text-white" style={{ background: selected === i ? prod.color : '#d1d5db' }}>
                      {prod.name[0]}
                    </div>
                    {prod.name}
                    <div className="text-[9px] font-normal mt-0.5 opacity-70">₹{(prod.price / 1000).toFixed(0)}k</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Variant / Display option */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-700 mb-2.5">Display option:</div>
              <div className="grid grid-cols-2 gap-2.5">
                {p.variants.map((v, i) => (
                  <button
                    key={v.variantId}
                    onClick={() => setVariantIdx(i)}
                    className={cn(
                      'text-left p-3.5 rounded-xl border-2 transition-all',
                      variantIdx === i ? 'shadow-sm' : 'border-gray-200 hover:border-gray-300'
                    )}
                    style={variantIdx === i ? { borderColor: p.color, background: p.bgLight } : {}}
                  >
                    <div className="text-xs font-bold" style={{ color: variantIdx === i ? p.color : '#374151' }}>{v.label}</div>
                    <div className="text-base font-black mt-0.5" style={{ color: variantIdx === i ? p.color : '#111827' }}>₹{v.price.toLocaleString('en-IN')}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <Button
              size="lg"
              onClick={handleBuyNow}
              className="w-full h-14 text-base font-bold text-white rounded-xl mb-3 shadow-lg"
              style={{ background: `linear-gradient(135deg,${p.color}dd,${p.color})`, boxShadow: `0 4px 20px ${p.color}40` }}
            >
              Add to Cart
            </Button>

            <button
              className="w-full h-12 text-sm font-semibold rounded-xl border-2 flex items-center justify-center gap-2 transition-colors hover:bg-green-50 mb-5"
              style={{ borderColor: '#25D366', color: '#25D366' }}
              onClick={() => window.open(`https://wa.me/919876543210?text=Hi! I want to order Anvaya ${p.name}`, '_blank')}
            >
              <Phone className="w-4 h-4" /> Order via WhatsApp
            </button>

            {/* Trust micro-copy */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-400">
              {['✓ Free shipping India', '✓ 30-day money-back', '✓ 1-year warranty', '✓ Secure checkout'].map(t => (
                <div key={t}>{t}</div>
              ))}
            </div>

            {/* Compare card */}
            <div className="mt-6 rounded-2xl border border-gray-100 p-5 bg-gray-50">
              <div className="text-xs font-bold text-gray-700 mb-3">Not sure which model?</div>
              <div className="space-y-2">
                {[
                  { name: 'CORE', desc: 'Basic video + cry detection', color: '#d97706' },
                  { name: 'SENSE ⭐', desc: 'Breathing + SpO₂ + Cry AI', color: '#4a7c6f' },
                  { name: 'PULSE', desc: 'Environment + Activity focus', color: '#3b82f6' },
                  { name: 'OMNI', desc: 'All + Predictive AI reports', color: '#7c3aed' },
                ].map(m => (
                  <div key={m.name} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-bold" style={{ color: m.color }}>{m.name}</span>
                    <span className="text-gray-300">—</span>
                    <span>{m.desc}</span>
                  </div>
                ))}
              </div>
              <Link href="/compare" className="text-xs font-semibold text-primary hover:underline mt-3 block">
                See full comparison →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky CTA ── */}
      <div
        className="md:hidden fixed left-0 right-0 z-40 px-4 py-3"
        style={{
          bottom: 'max(66px, calc(66px + env(safe-area-inset-bottom)))',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-800 truncate">{p.fullName} · {variant.label}</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: p.color }}>₹{variant.price.toLocaleString('en-IN')}</div>
          </div>
          <button
            onClick={handleBuyNow}
            className="shrink-0 px-5 py-3 rounded-xl font-bold text-sm text-white"
            style={{ background: `linear-gradient(135deg,${p.color}dd,${p.color})`, boxShadow: `0 4px 16px ${p.color}50` }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
