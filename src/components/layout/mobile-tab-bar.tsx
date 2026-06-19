'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, BookOpen, Sparkles } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/anvaya', label: 'Products', icon: ShoppingBag },
  // center cry tab rendered separately
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/preorder', label: 'Buy Now', icon: Sparkles },
];

export function MobileTabBar() {
  const pathname = usePathname() ?? '/';

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isCryActive = pathname.startsWith('/cry-analyzer');

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around px-2 pb-safe"
      style={{
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(74,124,111,0.12)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      }}
    >
      {/* Left two tabs */}
      {tabs.slice(0, 2).map(({ href, label, icon: Icon }) => (
        <TabItem key={href} href={href} label={label} active={isActive(href)}>
          <Icon className="w-5 h-5" />
        </TabItem>
      ))}

      {/* Center — Cry AI star tab */}
      <Link
        href="/cry-analyzer"
        className="relative flex flex-col items-center -mt-5"
        aria-label="AI Cry Analyzer"
      >
        {/* Spinning orbital ring */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            width: 60,
            height: 60,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: isCryActive
              ? 'conic-gradient(from 0deg, transparent 0%, #e8957a 40%, transparent 60%)'
              : 'conic-gradient(from 0deg, transparent 0%, rgba(74,124,111,0.6) 35%, transparent 55%)',
            borderRadius: '50%',
            animation: 'cry-tab-spin 1.8s linear infinite',
            padding: 2,
          }}
        />
        {/* Outer ring mask */}
        <span
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 52,
            height: 52,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255,255,255,0.96)',
            borderRadius: '50%',
          }}
        />
        {/* Button face */}
        <span
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: isCryActive
              ? 'linear-gradient(135deg,#e8957a,#d4784a)'
              : 'linear-gradient(135deg,#2d6b5e,#4a7c6f)',
            boxShadow: isCryActive
              ? '0 6px 24px rgba(232,149,122,0.5)'
              : '0 6px 24px rgba(74,124,111,0.4)',
          }}
        >
          {/* Mic icon with sound wave bars */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="11" rx="3" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="9" y1="22" x2="15" y2="22" />
          </svg>
        </span>
        <span
          className="text-[9px] font-bold mt-1 tracking-wide"
          style={{ color: isCryActive ? '#e8957a' : '#4a7c6f' }}
        >
          Cry AI
        </span>

        <style>{`
          @keyframes cry-tab-spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to   { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </Link>

      {/* Right two tabs */}
      {tabs.slice(2).map(({ href, label, icon: Icon }) => (
        <TabItem key={href} href={href} label={label} active={isActive(href)}>
          <Icon className="w-5 h-5" />
        </TabItem>
      ))}
    </nav>
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
      className="flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 min-w-[52px]"
      style={{ color: active ? '#4a7c6f' : '#9aaba4' }}
    >
      <span
        className="transition-transform duration-150"
        style={{ transform: active ? 'scale(1.12)' : 'scale(1)' }}
      >
        {children}
      </span>
      <span
        className="text-[9px] font-semibold tracking-wide transition-colors duration-150"
        style={{ color: active ? '#4a7c6f' : '#9aaba4' }}
      >
        {label}
      </span>
      {active && (
        <span
          className="w-1 h-1 rounded-full mt-0.5"
          style={{ background: '#4a7c6f' }}
        />
      )}
    </Link>
  );
}
