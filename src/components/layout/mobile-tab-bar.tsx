'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Sparkles } from 'lucide-react';

/* Each tab's accent color — used for active indicator + icon tint */
const TABS = [
  { href: '/',         label: 'Home',     icon: Home,      color: '#4a7c6f', activeBg: 'rgba(74,124,111,0.10)'  },
  { href: '/anvaya',   label: 'Products', icon: ShoppingBag, color: '#d97706', activeBg: 'rgba(217,119,6,0.09)'  },
  null, /* spacer column for the floating center button */
  { href: '/cry-analyzer', label: 'Try It', icon: null,    color: '#4a7c6f', activeBg: 'rgba(74,124,111,0.10)'  },
  { href: '/preorder', label: 'Buy',       icon: Sparkles,  color: '#e8957a', activeBg: 'rgba(232,149,122,0.10)' },
];

export function MobileTabBar() {
  const pathname  = usePathname() ?? '/';
  const isActive  = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);
  const isCryActive = pathname.startsWith('/cry-analyzer');

  return (
    <>
      <style>{`
        @keyframes cry-ripple  { 0%,100%{box-shadow:0 0 0 0 rgba(232,149,122,.5),0 5px 18px rgba(232,149,122,.38)}
                                  55%   {box-shadow:0 0 0 9px rgba(232,149,122,0),0 5px 18px rgba(232,149,122,.38)} }
        @keyframes teal-ripple { 0%,100%{box-shadow:0 0 0 0 rgba(74,124,111,.45),0 5px 18px rgba(74,124,111,.32)}
                                  55%   {box-shadow:0 0 0 9px rgba(74,124,111,0),0 5px 18px rgba(74,124,111,.32)} }
      `}</style>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{
          /* 5 equal columns — mathematical equal spacing */
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          alignItems: 'end',
          height: 66,
          paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1.5px solid rgba(0,0,0,0.06)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
        }}
      >
        {TABS.map((tab, i) =>
          tab === null ? (
            /* Col 3 spacer — center button floats here */
            <div key="spacer" />
          ) : (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-end gap-0.5 pb-1.5 relative"
              style={{ color: isActive(tab.href) ? tab.color : '#a8b5af' }}
            >
              {/* Top active indicator pill */}
              {isActive(tab.href) && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: 20, height: 3, background: tab.color }}
                />
              )}
              {/* Icon with active tint bg */}
              <span
                className="rounded-xl p-1.5 transition-all duration-150"
                style={{
                  background: isActive(tab.href) ? tab.activeBg : 'transparent',
                  transform: isActive(tab.href) ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {tab.icon && <tab.icon className="w-5 h-5" />}
                {/* Try It: small waveform icon */}
                {!tab.icon && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="4"  y1="12" x2="4"  y2="12" />
                    <line x1="8"  y1="8"  x2="8"  y2="16" />
                    <line x1="12" y1="5"  x2="12" y2="19" />
                    <line x1="16" y1="8"  x2="16" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="12" />
                  </svg>
                )}
              </span>
              <span className="text-[9px] font-semibold tracking-wide leading-none">{tab.label}</span>
            </Link>
          )
        )}

        {/* ── Floating centre button — absolutely centred over col 3 ── */}
        <Link
          href="/cry-analyzer"
          aria-label="AI Cry Analyzer"
          className="absolute flex flex-col items-center"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 'max(12px, calc(env(safe-area-inset-bottom) + 12px))',
          }}
        >
          <div className="relative" style={{ width: 54, height: 54 }}>
            {/* Button */}
            <span
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: isCryActive
                  ? 'linear-gradient(135deg,#e8957a,#d4784a)'
                  : 'linear-gradient(135deg,#2d6b5e,#4a7c6f)',
                animation: isCryActive ? 'cry-ripple 2.4s ease-out infinite' : 'teal-ripple 2.8s ease-out infinite',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="9"  y1="22" x2="15" y2="22" />
              </svg>
            </span>
          </div>
          <span
            className="text-[9px] font-bold mt-1 tracking-wide"
            style={{ color: isCryActive ? '#e8957a' : '#4a7c6f' }}
          >
            Cry AI
          </span>
        </Link>
      </nav>
    </>
  );
}
