'use client';

import { useState } from 'react';
import { LeadModal } from './lead-modal';
import { trackCtaClick } from '@/lib/tracking';

interface Props {
  children: React.ReactNode;
  product?: string;
  source: string;
  className?: string;
}

export function LeadModalTrigger({ children, product, source, className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => { trackCtaClick(source, { product: product ?? null }); setOpen(true); }} className={className} style={{ display: 'contents' }}>
        {children}
      </div>
      <LeadModal open={open} onClose={() => setOpen(false)} product={product} source={source} />
    </>
  );
}
