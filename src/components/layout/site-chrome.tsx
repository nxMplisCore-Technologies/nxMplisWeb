'use client';

import { usePathname } from 'next/navigation';

// Pages under /embed are shown inside other websites' iframes, so they
// render without the site header, footer, mobile bars and ad pixels.
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/embed')) return null;
  return <>{children}</>;
}
