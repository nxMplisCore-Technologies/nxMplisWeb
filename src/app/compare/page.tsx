'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Check, X, ChevronLeft, ArrowRight, MessageCircle } from 'lucide-react';

const AMAZON_URL = 'https://www.amazon.in/stores/AnvayaSmart/page/4E8B6271-F5B1-4D84-A055-E6A5E2DCE3D7?lp_asin=B0HK85L2XB&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto&bl_grd_status=override';

const products = [
  {
    id: 'core',
    name: 'CORE',
    fullName: 'Anvaya CORE',
    tagline: 'Simple. Smart. Reliable.',
    color: '#d97706',
    bgLight: '#fffbeb',
    badge: null as string | null,
    price: '₹6,800',
    priceNote: 'Without display',
    image: '/anvaya-core-01-hero-1080p-day-night.png',
    href: '/anvaya?p=core',
  },
  {
    id: 'pulse',
    name: 'PULSE',
    fullName: 'Anvaya PULSE',
    tagline: 'AI Safety That Never Blinks.',
    color: '#3b82f6',
    bgLight: '#eff6ff',
    badge: null as string | null,
    price: '₹8,900',
    priceNote: 'Without display',
    image: '/anvaya-pulse-02-ai-safety-alerts.png',
    href: '/anvaya?p=pulse',
  },
  {
    id: 'omni',
    name: 'OMNI',
    fullName: 'Anvaya OMNI',
    tagline: 'Breathes. Heart beats. You sleep.',
    color: '#7c3aed',
    bgLight: '#f5f3ff',
    badge: '⭐ Most Popular' as string | null,
    price: '₹12,999',
    priceNote: 'Without display',
    image: '/anvaya-omni-09-vitals-heart-breathing.png',
    href: '/anvaya?p=omni',
  },
];

type RowValue = boolean | string;

interface Row {
  label: string;
  core: RowValue;
  pulse: RowValue;
  omni: RowValue;
  highlight?: boolean;
}

interface Section {
  title: string;
  rows: Row[];
}

const sections: Section[] = [
  {
    title: 'Camera & Display',
    rows: [
      { label: 'Camera resolution', core: '1080P HD', pulse: '4MP Ultra', omni: '4MP Ultra' },
      { label: 'Parent display', core: '5" screen', pulse: '5.5" screen', omni: '5.5" screen' },
      { label: 'Pan & tilt coverage', core: '355° · 120°', pulse: '355° · 120°', omni: '355° · 120°' },
      { label: 'Night vision', core: true, pulse: true, omni: true },
    ],
  },
  {
    title: 'Core Monitoring',
    rows: [
      { label: 'Live video & audio', core: true, pulse: true, omni: true },
      { label: 'Cry & sound alert', core: true, pulse: true, omni: true },
      { label: 'Motion detection', core: true, pulse: true, omni: true },
      { label: 'Two-way talk', core: true, pulse: true, omni: true },
      { label: 'Lullabies', core: '8 built-in', pulse: '8 built-in', omni: '8 built-in' },
      { label: 'Temp & humidity sensor', core: true, pulse: true, omni: true },
      { label: 'App monitoring (iOS & Android)', core: true, pulse: true, omni: true },
    ],
  },
  {
    title: 'AI Safety Features',
    rows: [
      { label: 'Face covering alert', core: false, pulse: true, omni: true, highlight: true },
      { label: 'Prone sleep (tummy roll) alert', core: false, pulse: true, omni: true, highlight: true },
      { label: 'Danger zone alerts', core: false, pulse: true, omni: true },
      { label: 'Geofencing', core: false, pulse: true, omni: true },
      { label: 'Night light', core: false, pulse: true, omni: true },
      { label: 'Auto timeline album', core: false, pulse: true, omni: true },
    ],
  },
  {
    title: 'Wellness Monitoring',
    rows: [
      { label: 'Contactless breathing detection', core: false, pulse: false, omni: true, highlight: true },
      { label: 'Heart rate monitoring', core: false, pulse: false, omni: true, highlight: true },
      { label: 'Nightly sleep analysis report', core: false, pulse: false, omni: true, highlight: true },
      { label: 'One-tap partner call', core: false, pulse: false, omni: true },
    ],
  },
  {
    title: 'Hardware',
    rows: [
      { label: 'Battery', core: '3200mAh', pulse: '4000mAh', omni: '4000mAh' },
      { label: 'Warranty', core: '1 year', pulse: '1 year', omni: '1 year' },
      { label: 'Free shipping', core: true, pulse: true, omni: true },
      { label: '7-day returns', core: true, pulse: true, omni: true },
    ],
  },
];

function Cell({ value, color }: { value: RowValue; color: string }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="w-5 h-5 mx-auto" style={{ color }} />
      : <X className="w-4 h-4 mx-auto text-gray-200" />;
  }
  return <span className="text-xs font-medium text-gray-700 leading-snug">{value}</span>;
}

export default function ComparePage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['Core Monitoring']));

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <Link href="/anvaya"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shrink-0">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <div>
          <h1 className="text-sm font-bold text-gray-900">Compare Models</h1>
          <p className="text-xs text-gray-400">CORE · PULSE · OMNI</p>
        </div>
      </div>

      {/* Product headers — sticky below nav */}
      <div className="sticky top-[57px] z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="grid grid-cols-[1fr_1fr_1fr] divide-x divide-gray-100">
          {products.map(p => (
            <div key={p.id} className="flex flex-col items-center pt-3 pb-2 px-2 text-center">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden mb-1.5 shrink-0" style={{ background: p.bgLight }}>
                <Image src={p.image} alt={p.fullName} fill className="object-contain p-2" sizes="64px" />
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: p.color }} />
              </div>
              <span className="text-xs font-bold" style={{ color: p.color }}>{p.name}</span>
              {p.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white mt-0.5"
                  style={{ background: p.color }}>
                  {p.badge.replace(/^\S+\s/, '')}
                </span>
              )}
              <span className="text-xs font-bold text-gray-900 mt-1">{p.price}</span>
              <span className="text-[10px] text-gray-400">{p.priceNote}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison rows */}
      <div className="pb-32">
        {sections.map(section => (
          <div key={section.title}>
            {/* Section header */}
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-y border-gray-100 text-left"
              onClick={() => setOpenSections(prev => {
                const next = new Set(prev);
                next.has(section.title) ? next.delete(section.title) : next.add(section.title);
                return next;
              })}>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{section.title}</span>
              <span className="text-gray-300 text-xs">{openSections.has(section.title) ? '▲' : '▼'}</span>
            </button>

            {/* Rows — collapsed on mobile until toggled */}
            <div className={openSections.has(section.title) ? '' : 'hidden sm:block'}>
              {section.rows.map((row, ri) => (
                <div key={ri}
                  className={`grid grid-cols-[1fr_1fr_1fr] divide-x divide-gray-50 border-b border-gray-50 ${row.highlight ? 'bg-purple-50/40' : ''}`}>

                  {/* Row label spans full width above cells on small screens */}
                  <div className="col-span-3 px-4 pt-2.5 pb-0">
                    <span className="text-xs text-gray-500 font-medium">{row.label}</span>
                  </div>
                  {(['core', 'pulse', 'omni'] as const).map((id, ci) => {
                    const prod = products[ci];
                    const val = row[id];
                    return (
                      <div key={id} className="flex items-center justify-center py-2 px-1 min-h-[40px]">
                        <Cell value={val} color={prod.color} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Show all / collapse */}
        <div className="sm:hidden px-4 py-3 text-center border-b border-gray-50">
          <button
            className="text-xs text-blue-600 font-semibold"
            onClick={() => {
              if (openSections.size === sections.length) {
                setOpenSections(new Set(['Core Monitoring']));
              } else {
                setOpenSections(new Set(sections.map(s => s.title)));
              }
            }}>
            {openSections.size === sections.length ? 'Show less' : 'Show all features ↓'}
          </button>
        </div>

        {/* CTA section */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 mt-4">
          {products.map(p => (
            <div key={p.id} className="flex flex-col items-center gap-2 px-2 py-4">
              <Link href={p.href}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white active:scale-95 transition-transform"
                style={{ background: p.color }}>
                View {p.name}
              </Link>
              <button
                onClick={() => window.open(`https://wa.me/917987449366?text=Hi! I want to know more about Anvaya ${p.name}`, '_blank')}
                className="flex items-center justify-center gap-1 text-[10px] text-gray-500 hover:text-gray-700">
                <MessageCircle className="w-3 h-3" /> Chat
              </button>
            </div>
          ))}
        </div>

        {/* Not sure block */}
        <div className="mx-4 mt-4 p-4 rounded-2xl bg-purple-50 border border-purple-100">
          <p className="text-sm font-bold text-gray-800 mb-1">Most parents choose OMNI</p>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            Contactless breathing + heart rate + AI safety — the only monitor that covers everything. Nothing touches your baby. Ever.
          </p>
          <Link href="/anvaya?p=omni"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:underline">
            See Anvaya OMNI <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Amazon link */}
        <div className="mx-4 mt-3 mb-4 flex items-center gap-3 bg-[#FFF8EE] rounded-2xl px-4 py-3 border border-[#FF9900]/20">
          <div className="flex-1">
            <p className="text-xs font-bold text-[#B45309]">Available on Amazon India</p>
            <p className="text-xs text-[#92400e]/70">All 3 models · Free shipping · Secure checkout</p>
          </div>
          <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer"
            className="text-xs font-bold text-[#B45309] hover:underline shrink-0">Shop →</a>
        </div>
      </div>

      {/* Mobile sticky bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 px-4 pt-3 z-30"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        <div className="grid grid-cols-3 gap-2">
          {products.map(p => (
            <Link key={p.id} href={p.href}
              className="text-center py-3 rounded-xl text-xs font-bold text-white active:scale-95 transition-transform"
              style={{ background: p.color }}>
              {p.name}
              <div className="text-[10px] font-normal opacity-80">{p.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
