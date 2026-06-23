'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const DETECTIONS = [
  { emoji: '🍼', label: 'Hungry cry detected', conf: 94, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { emoji: '😴', label: 'Baby asleep — all normal', conf: 99, color: '#4a7c6f', bg: 'rgba(74,124,111,0.07)' },
  { emoji: '😣', label: 'Discomfort cry detected', conf: 82, color: '#ef4444', bg: 'rgba(239,68,68,0.07)' },
  { emoji: '❤️', label: 'Breathing normal — 27/min', conf: 98, color: '#10b981', bg: 'rgba(16,185,129,0.07)' },
  { emoji: '😮‍💨', label: 'Needs burping — detected', conf: 88, color: '#8b5cf6', bg: 'rgba(139,92,246,0.07)' },
];

export function MobileLiveBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % DETECTIONS.length), 3200);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;

  const cur = DETECTIONS[idx];

  return (
    <div
      className="md:hidden w-full px-3 pt-1.5 pb-1"
      style={{ background: '#faf8f5', borderBottom: '1px solid rgba(74,124,111,0.08)' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.28 }}
        >
          <Link
            href="/cry-analyzer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2"
            style={{ background: cur.bg, border: `1px solid ${cur.color}20` }}
          >
            {/* Live dot */}
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: cur.color, boxShadow: `0 0 6px ${cur.color}`, animation: 'live-dot-pulse 1.6s ease-in-out infinite' }}
            />
            {/* Emoji */}
            <span style={{ fontSize: 14, lineHeight: 1 }}>{cur.emoji}</span>
            {/* Label */}
            <span className="text-[11px] font-semibold flex-1 truncate" style={{ color: cur.color }}>
              {cur.label}
            </span>
            {/* Confidence */}
            <span className="text-[10px] font-mono shrink-0" style={{ color: cur.color }}>
              {cur.conf}%
            </span>
            {/* Arrow */}
            <span className="text-[10px] font-bold shrink-0" style={{ color: cur.color }}>→</span>

            <style>{`@keyframes live-dot-pulse{0%,100%{opacity:1}50%{opacity:.35}}`}</style>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
