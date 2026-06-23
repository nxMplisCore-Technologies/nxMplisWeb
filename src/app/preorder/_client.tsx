'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

const PODS = [
  {
    key: 'CORE',
    name: 'CORE',
    price: 8999,
    tag: 'Breathing + Cry analysis',
    dotColor: '#7aab9e',
    chips: ['🫱 Breathing', '😢 Cry'],
  },
  {
    key: 'SENSE',
    name: 'SENSE',
    price: 11999,
    tag: '+ SpO₂ + Temperature',
    dotColor: '#4a7c6f',
    popular: true,
    chips: ['🫱 Breathing', '😢 Cry', '💉 SpO₂', '🌡️ Temp'],
  },
  {
    key: 'PULSE',
    name: 'PULSE',
    price: 14999,
    tag: '+ Heart Rate',
    dotColor: '#e8957a',
    chips: ['🫱 Breathing', '😢 Cry', '💉 SpO₂', '🌡️ Temp', '❤️ Heart Rate'],
  },
  {
    key: 'OMNI',
    name: 'OMNI',
    price: 19999,
    tag: 'All sensors + Video',
    dotColor: '#c0674f',
    chips: ['🫱 Breathing', '😢 Cry', '💉 SpO₂', '🌡️ Temp', '❤️ Heart Rate', '📹 Video'],
  },
] as const;

type PodKey = (typeof PODS)[number]['key'];

const TRUST = [
  { icon: '🔒', label: 'No payment now' },
  { icon: '🚚', label: 'Free shipping India' },
  { icon: '↩️', label: '30-day returns' },
  { icon: '💬', label: 'WhatsApp support' },
];

export default function PreorderClient() {
  const [selectedKey, setSelectedKey] = useState<PodKey>('SENSE');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedPod = PODS.find((p) => p.key === selectedKey)!;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/lead', {
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

          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary">
              🟢 73 of 100 early access spots left
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-foreground mb-3 leading-tight">
            Reserve your Anvaya pod.{' '}
            <span className="text-primary">No payment today.</span>
          </h1>

          <p className="text-center text-muted-foreground text-base sm:text-lg mb-8">
            Nothing touches your baby. Nothing is missed.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {PODS.map((pod) => {
              const selected = pod.key === selectedKey;
              return (
                <button
                  key={pod.key}
                  type="button"
                  onClick={() => setSelectedKey(pod.key)}
                  className={[
                    'rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer relative',
                    selected
                      ? 'border-primary bg-primary/8'
                      : 'border-[#e2dbd4] bg-white hover:border-primary/40',
                  ].join(' ')}
                  style={selected ? { backgroundColor: 'rgba(74,124,111,0.08)' } : {}}
                >
                  {'popular' in pod && pod.popular && (
                    <span
                      className="absolute -top-2 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: '#e8957a' }}
                    >
                      Most Popular
                    </span>
                  )}

                  {selected && (
                    <span className="absolute top-2 right-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: pod.dotColor }}
                    />
                    <div className="font-bold text-base text-foreground">{pod.name}</div>
                  </div>

                  <div className="text-sm font-semibold text-primary mb-1">
                    Founding price — on confirmation
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {pod.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[10px] bg-[#f0ece6] text-muted-foreground rounded px-1 py-0.5 leading-tight"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mb-6 bg-primary/6 border border-primary/15 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-primary mb-1">🔒 Founding family pricing</p>
            <p className="text-xs text-muted-foreground">Exclusive price revealed over WhatsApp within 24 hours of sign-up. No payment required today.</p>
          </div>

          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#4a7c6f] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">R</div>
              <div className="w-7 h-7 rounded-full bg-[#e8957a] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">P</div>
              <div className="w-7 h-7 rounded-full bg-[#7aab9e] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">A</div>
            </div>
            <p className="text-xs text-muted-foreground">73 families have reserved · <span className="text-primary font-semibold">27 spots left</span></p>
          </div>

          {submitted ? (
            <div className="bg-white border border-[#e2dbd4] rounded-2xl p-8 text-center shadow-sm mb-6">
              <div className="text-3xl mb-3">✅</div>
              <h2 className="text-xl font-bold mb-2">You&apos;re reserved!</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We&apos;ll reach out to confirm your{' '}
                <span className="font-semibold text-primary">{selectedPod.name}</span> pod reservation within 1 hour.
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
                autoComplete="name"
              />
              <Input
                type="tel"
                placeholder="WhatsApp number *"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="bg-[#faf8f5] border-[#e2dbd4]"
                autoComplete="tel"
              />
              <Input
                placeholder="City (optional)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-[#faf8f5] border-[#e2dbd4]"
              />

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 text-white font-bold mt-1"
                style={{background:'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow:'0 4px 20px rgba(232,149,122,0.4)'}}
                disabled={loading}
              >
                {loading ? (
                  'Reserving...'
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Reserve {selectedPod.name} Pod{' '}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-1">
                No payment now · Pay on delivery · 30-day guarantee
              </p>
            </form>
          )}

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
