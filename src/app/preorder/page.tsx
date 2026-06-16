'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, ArrowRight } from 'lucide-react';

const PODS = [
  {
    key: 'CORE',
    name: 'CORE',
    price: 8999,
    tag: 'Breathing + Cry analysis',
  },
  {
    key: 'SENSE',
    name: 'SENSE',
    price: 11999,
    tag: '+ SpO₂ + Temperature',
  },
  {
    key: 'PULSE',
    name: 'PULSE',
    price: 14999,
    tag: '+ Heart Rate',
  },
  {
    key: 'OMNI',
    name: 'OMNI',
    price: 19999,
    tag: 'All sensors + Video',
  },
] as const;

type PodKey = (typeof PODS)[number]['key'];

const TRUST = [
  { icon: '🔒', label: 'No payment now' },
  { icon: '🚚', label: 'Free shipping India' },
  { icon: '↩️', label: '30-day returns' },
  { icon: '💬', label: 'WhatsApp support' },
];

export default function PreorderPage() {
  const [selectedKey, setSelectedKey] = useState<PodKey>('SENSE');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedPod = PODS.find((p) => p.key === selectedKey)!;
  const originalPrice = selectedPod.price + 5000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          whatsapp,
          city,
          product: selectedPod.name,
          source: 'preorder',
        }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-lg mx-auto">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary">
              🟢 73 of 100 early access spots left
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-3 leading-tight">
            Reserve your Anvaya pod.{' '}
            <span className="text-primary">Pay ₹0 today.</span>
          </h1>

          {/* Subtext */}
          <p className="text-center text-muted-foreground text-base sm:text-lg mb-8">
            Nothing touches your baby. Nothing is missed.
          </p>

          {/* Pod selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {PODS.map((pod) => {
              const selected = pod.key === selectedKey;
              return (
                <button
                  key={pod.key}
                  type="button"
                  onClick={() => setSelectedKey(pod.key)}
                  className={[
                    'rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer',
                    selected
                      ? 'border-primary bg-primary/8'
                      : 'border-[#e2dbd4] bg-white hover:border-primary/40',
                  ].join(' ')}
                  style={selected ? { backgroundColor: 'rgba(74,124,111,0.08)' } : {}}
                >
                  <div className="font-bold text-base text-foreground mb-0.5">{pod.name}</div>
                  <div className="text-sm font-semibold text-primary mb-1">
                    ₹{pod.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-muted-foreground leading-snug">{pod.tag}</div>
                </button>
              );
            })}
          </div>

          {/* Price display */}
          <div className="text-center mb-6">
            <div className="flex items-end justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-bold text-primary">
                ₹{selectedPod.price.toLocaleString('en-IN')}
              </span>
              <span className="text-lg text-muted-foreground line-through mb-1">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-sm font-semibold mt-1" style={{ color: '#e8957a' }}>
              You save ₹5,000 · Early bird
            </p>
          </div>

          {/* Form / Success */}
          {submitted ? (
            <div className="bg-white border border-[#e2dbd4] rounded-2xl p-10 text-center shadow-sm mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-2">You&apos;re reserved!</h2>
              <p className="text-muted-foreground text-sm">
                We&apos;ll WhatsApp you within 1 hour.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-[#e2dbd4] rounded-2xl p-6 shadow-sm mb-6 space-y-3"
            >
              <Input
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#faf8f5] border-[#e2dbd4]"
              />
              <Input
                placeholder="WhatsApp number *"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="bg-[#faf8f5] border-[#e2dbd4]"
              />
              <Input
                placeholder="City (optional)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-[#faf8f5] border-[#e2dbd4]"
              />

              {/* CTA */}
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 bg-primary text-white hover:bg-primary/90 mt-1"
                disabled={loading}
              >
                {loading ? (
                  'Reserving...'
                ) : (
                  <>
                    Reserve My {selectedPod.name} Pod{' '}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              {/* Zero risk */}
              <p className="text-center text-xs text-muted-foreground pt-1">
                ₹0 now · Pay on delivery · 30-day guarantee
              </p>
            </form>
          )}

          {/* Trust row */}
          <div className="grid grid-cols-4 gap-2">
            {TRUST.map((t) => (
              <div key={t.label} className="flex flex-col items-center text-center gap-1">
                <span className="text-xl">{t.icon}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
