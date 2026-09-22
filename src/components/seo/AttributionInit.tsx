'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution, trackEvent, trackScrollDepth } from '@/lib/tracking';

export function AttributionInit() {
  const pathname = usePathname();

  // Re-run on every route change so a mid-session UTM/fbclid link updates last-touch.
  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  // Scroll-depth milestones, once per page load.
  useEffect(() => {
    const fired = new Set<number>();
    const milestones = [25, 50, 75, 90];
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight * 100;
      for (const m of milestones) {
        if (scrolled >= m && !fired.has(m)) {
          fired.add(m);
          trackScrollDepth(m);
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Time-on-page-so-far ping when the tab is hidden/closed, so short bounces
  // vs. real engagement are distinguishable in GA4 alongside scroll depth.
  useEffect(() => {
    const start = Date.now();
    function onHide() {
      if (document.visibilityState === 'hidden') {
        trackEvent('engagement_time', null, { extra: { seconds: Math.round((Date.now() - start) / 1000), path: pathname } });
      }
    }
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, [pathname]);

  return null;
}
