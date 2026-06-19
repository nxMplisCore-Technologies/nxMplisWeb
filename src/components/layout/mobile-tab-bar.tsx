'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Play, Sparkles } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/anvaya', label: 'Products', icon: ShoppingBag },
  // center cry tab rendered separately
  { href: '/cry-analyzer', label: 'Try It', icon: Play },
  { href: '/preorder', label: 'Buy Now', icon: Sparkles },
];

export function MobileTabBar() {
  const pathname = usePathname() ?? '/';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isCryActive = pathname.startsWith('/cry-analyzer');

  return (
    <>
      <style>{`
        @keyframes tab-ring-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes tab-glow-pulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around px-1"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(74,124,111,0.10)',
          boxShadow: '0 -2px 20px rgba(0,0,0,0.06)',
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
          paddingTop: 6,
        }}
      >
        {/* Left two tabs */}
        {tabs.slice(0, 2).map(({ href, label, icon: Icon }) => (
          <TabItem key={href} href={href} label={label} active={isActive(href)}>
            <Icon className="w-5 h-5" />
          </TabItem>
        ))}

        {/* Center — Cry AI star tab (elevated) */}
        <Link
          href="/cry-analyzer"
          className="relative flex flex-col items-center"
          style={{ marginTop: -22 }}
          aria-label="AI Cry Analyzer"
        >
          {/* Thin dashed spinning ring */}
          <span
            className="absolute pointer-events-none"
            style={{
              width: 66,
              height: 66,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: isCryActive
                ? '2px dashed rgba(232,149,122,0.75)'
                : '2px dashed rgba(74,124,111,0.55)',
              borderRadius: '50%',
              animation: 'tab-ring-spin 3s linear infinite, tab-glow-pulse 2s ease-in-out infinite',
            }}
          />

          {/* Button face — matches cry analyzer mic button style */}
          <span
            className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: isCryActive
                ? 'linear-gradient(135deg,#e8957a,#d4784a)'
                : 'linear-gradient(135deg,#2d6b5e,#4a7c6f)',
              boxShadow: isCryActive
                ? '0 4px 20px rgba(232,149,122,0.55), 0 0 0 4px rgba(232,149,122,0.12)'
                : '0 4px 20px rgba(74,124,111,0.45), 0 0 0 4px rgba(74,124,111,0.10)',
            }}
          >
            {/* Mic SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="2" width="6" height="11" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="9" y1="22" x2="15" y2="22" />
            </svg>
          </span>

          <span
            className="text-[9px] font-bold mt-1.5 tracking-wide"
            style={{ color: isCryActive ? '#e8957a' : '#4a7c6f' }}
          >
            Cry AI
          </span>
        </Link>

        {/* Right two tabs */}
        {tabs.slice(2).map(({ href, label, icon: Icon }) => (
          <TabItem key={href} href={href} label={label} active={isActive(href)}>
            <Icon className="w-5 h-5" />
          </TabItem>
        ))}
      </nav>
    </>
  );
}

function TabItem({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 pt-1.5 pb-1 px-3 min-w-[56px]"
    >
      <span
        className="transition-all duration-150 rounded-xl p-1.5"
        style={{
          color: active ? '#4a7c6f' : '#b0bcb6',
          background: active ? 'rgba(74,124,111,0.08)' : 'transparent',
          transform: active ? 'scale(1.08)' : 'scale(1)',
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
