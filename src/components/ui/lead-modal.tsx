'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, X, MessageCircle } from 'lucide-react';

export interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  product?: string;
  source: string;
}

export function LeadModal({ open, onClose, product, source }: LeadModalProps) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  // Animate sheet in/out
  useEffect(() => {
    if (open) {
      // Small delay so the element is mounted before we trigger transition
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [open]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Reset form state when modal opens
  useEffect(() => {
    if (open) {
      setName('');
      setWhatsapp('');
      setCity('');
      setSuccess(false);
      setLoading(false);
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          city: city.trim(),
          product: product ?? '',
          source,
        }),
      });
    } catch (_) {
      // Fail silently — still show success so user doesn't feel punished
    }
    setLoading(false);
    setSuccess(true);
  }

  if (!open) return null;

  const title = product
    ? `Reserve your ${product} pod`
    : 'Reserve your spot';

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end md:items-center md:justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Sheet */}
      <div
        className="relative w-full md:max-w-md md:mx-auto bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden"
        style={{
          transition: 'transform 300ms ease-out',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle bar — mobile only */}
        <div className="flex justify-center pt-3 pb-0 md:hidden">
          <div className="w-10 h-1 bg-[#e2dbd4] rounded-full mx-auto mb-4" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0ece6]"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pb-6 pt-2">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground leading-snug pr-8">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">No payment now · We&apos;ll confirm on WhatsApp</p>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex -space-x-2">
              {[
                { initial: 'R', bg: '#4a7c6f' },
                { initial: 'P', bg: '#e8957a' },
                { initial: 'A', bg: '#7aab9e' },
              ].map(({ initial, bg }) => (
                <div
                  key={initial}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm"
                  style={{ background: bg }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              73 families reserved · <span className="text-[#e8957a] font-semibold">27 spots left</span>
            </span>
          </div>

          {success ? (
            /* Success state */
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-[#4a7c6f] mx-auto mb-3" />
              <p className="text-lg font-bold text-foreground mb-1">You&apos;re reserved!</p>
              <p className="text-sm text-muted-foreground mb-6">
                We&apos;ll WhatsApp you within 1 hour.
              </p>
              <Button
                onClick={onClose}
                className="bg-[#4a7c6f] text-white hover:bg-[#4a7c6f]/90 rounded-xl px-8"
              >
                Done
              </Button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                placeholder="Your name *"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="bg-[#faf8f5] border-[#e2dbd4] h-11 rounded-xl"
                autoComplete="name"
              />
              <Input
                placeholder="WhatsApp number *"
                type="tel"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                required
                className="bg-[#faf8f5] border-[#e2dbd4] h-11 rounded-xl"
                autoComplete="tel"
                inputMode="tel"
              />
              <Input
                placeholder="City (optional)"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="bg-[#faf8f5] border-[#e2dbd4] h-11 rounded-xl"
                autoComplete="address-level2"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-[#4a7c6f]/25 gap-2 bg-[#4a7c6f] text-white hover:bg-[#4a7c6f]/90"
              >
                <MessageCircle className="w-4 h-4" />
                {loading ? 'Reserving...' : 'Join Founding Families →'}
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-1">
                30-day guarantee · Free shipping India
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
