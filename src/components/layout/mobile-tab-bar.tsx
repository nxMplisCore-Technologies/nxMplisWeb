'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Sparkles, ChevronUp } from 'lucide-react';

const LEFT_TABS  = [
  { href: '/',       label: 'Home',     icon: Home },
  { href: '/anvaya', label: 'Products', icon: ShoppingBag },
];
const RIGHT_TABS = [
  { href: '/cry-analyzer', label: 'Try It',  icon: ChevronUp },
  { href: '/preorder',     label: 'Buy Now', icon: Sparkles },
];

export function MobileTabBar() {
  const pathname = usePathname() ?? '/';
  const isActive    = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const isCryActive = pathname.startsWith('/cry-analyzer');

  return (
    <>
      <style>{`
        @keyframes ring-spin  { to { transform: rotate(360deg); } }
        @keyframes ring-glow  { 0%,100% { opacity:.55; } 50% { opacity:1; } }
        @keyframes cry-pulse  { 0%,100% { box-shadow: 0 0 0 0 rgba(232,149,122,.45),0 6px 20px rgba(232,149,122,.4); }
                                 60%     { box-shadow: 0 0 0 8px rgba(232,149,122,0),0 6px 20px rgba(232,149,122,.4); } }
        @keyframes teal-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,124,111,.4),0 6px 20px rgba(74,124,111,.35); }
                                 60%     { box-shadow: 0 0 0 8px rgba(74,124,111,0),0 6px 20px rgba(74,124,111,.35); } }
      `}</style>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-end"
        style={{
          height: 72,
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(74,124,111,0.10)',
          boxShadow: '0 -2px 16px rgba(0,0,0,0.06)',
        }}
      >
        {/* ── Left tabs ── */}
        <div className="flex flex-1 items-end justify-around pb-1">
          {LEFT_TABS.map(({ href, label, icon: Icon }) => (
            <TabItem key={href} href={href} label={label} active={isActive(href)}>
              <Icon className="w-[22px] h-[22px]" />
            </TabItem>
          ))}
        </div>

        {/* ── Centre: absolutely positioned, lifted above bar ── */}
        <Link
          href="/cry-analyzer"
          aria-label="AI Cry Analyzer"
          className="absolute flex flex-col items-center"
          style={{ left: '50%', transform: 'translateX(-50%)', bottom: 'max(14px, calc(env(safe-area-inset-bottom) + 14px))' }}
        >
          {/* The button + ring wrapper — ring is relative to this div */}
          <div className="relative flex items-center justify-center" style={{ width: 60, height: 60 }}>

            {/* Spinning dashed ring — perfectly centred on the button */}
            <span
              className="absolute pointer-events-none"
              style={{
                inset: -7,
                borderRadius: '50%',
                border: isCryActive ? '2.5px dashed #e8957a' : '2px dashed rgba(74,124,111,0.65)',
                animation: 'ring-spin 3.5s linear infinite, ring-glow 2s ease-in-out infinite',
              }}
            />

            {/* Button face */}
            <span
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: isCryActive
                  ? 'linear-gradient(135deg,#e8957a,#d4784a)'
                  : 'linear-gradient(135deg,#2d6b5e,#4a7c6f)',
                animation: isCryActive ? 'cry-pulse 2.2s ease-out infinite' : 'teal-pulse 2.6s ease-out infinite',
              }}
            >
              {/* Mic SVG */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="9" y1="22" x2="15" y2="22" />
              </svg>
            </span>
          </div>

          <span
            className="text-[9px] font-bold tracking-wide mt-1"
            style={{ color: isCryActive ? '#e8957a' : '#4a7c6f' }}
          >
            Cry AI
          </span>
        </Link>

        {/* ── Right tabs ── */}
        <div className="flex flex-1 items-end justify-around pb-1">
          {RIGHT_TABS.map(({ href, label, icon: Icon }) => (
            <TabItem key={href} href={href} label={label} active={isActive(href)}>
              <Icon className="w-[22px] h-[22px]" />
            </TabItem>
          ))}
        </div>
      </nav>
    </>
  );
}

function TabItem({ href, label, active, children }: {
  href: string; label: string; active: boolean; children: React.ReactNode;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[56px]">
      <span
        className="rounded-xl p-1.5 transition-all duration-150"
        style={{
          color: active ? '#4a7c6f' : '#b0bcb6',
          background: active ? 'rgba(74,124,111,0.09)' : 'transparent',
          transform: active ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {children}
      </span>
      <span
        className="text-[9px] font-semibold tracking-wide"
        style={{ color: active ? '#4a7c6f' : '#b0bcb6' }}
      >
        {label}
      </span>
    </Link>
  );
}
