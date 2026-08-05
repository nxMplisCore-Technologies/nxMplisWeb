'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'age',
    question: 'How old is your baby?',
    options: [
      { value: 'expecting', emoji: '🤰', label: 'Expecting', sub: 'Due soon' },
      { value: '0-3m', emoji: '🍼', label: '0–3 months', sub: '' },
      { value: '3-6m', emoji: '👶', label: '3–6 months', sub: '' },
      { value: '6-24m', emoji: '🧒', label: '6–24 months', sub: '' },
    ],
  },
  {
    id: 'worry',
    question: 'What worries you most at night?',
    options: [
      { value: 'breathing', emoji: '😮‍💨', label: 'Breathing pauses', sub: '' },
      { value: 'crying', emoji: '😶', label: 'Silent crying', sub: '' },
      { value: 'spo2', emoji: '📉', label: 'Oxygen levels (SpO₂)', sub: '' },
      { value: 'temp', emoji: '🌡️', label: 'Temperature changes', sub: '' },
    ],
  },
  {
    id: 'video',
    question: 'Do you want to see your baby live?',
    options: [
      { value: 'yes', emoji: '📹', label: 'Yes, I want video too', sub: '' },
      { value: 'no', emoji: '📊', label: 'No, data alerts are enough', sub: '' },
      { value: 'unsure', emoji: '🤔', label: 'Not sure yet', sub: '' },
    ],
  },
  {
    id: 'placement',
    question: 'Where will the monitor be placed?',
    options: [
      { value: 'crib', emoji: '🛏️', label: 'Right next to the crib', sub: '' },
      { value: 'room', emoji: '🚪', label: 'Separate room', sub: '' },
      { value: 'travel', emoji: '🏠', label: 'I travel often', sub: '' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget?",
    options: [
      { value: 'under10k', emoji: '💚', label: 'Under ₹10,000', sub: '' },
      { value: '10-15k', emoji: '💛', label: '₹10,000–₹15,000', sub: '' },
      { value: '15-20k', emoji: '💜', label: '₹15,000–₹20,000', sub: '' },
      { value: 'best', emoji: '⭐', label: 'Best possible', sub: "Price doesn't matter" },
    ],
  },
] as const;

type AnswerMap = Partial<Record<string, string>>;

const PRODUCTS = {
  CORE: {
    name: 'CORE',
    price: 8999,
    bullets: [
      'Contactless breathing rate monitoring',
      'AI-powered cry analysis (hungry, tired, pain)',
      'Sleep cycle tracking',
      'Instant app alerts',
    ],
  },
  SENSE: {
    name: 'SENSE',
    price: 11999,
    bullets: [
      'Everything in CORE',
      'Blood oxygen (SpO₂) monitoring',
      'Room & ambient temperature sensing',
      'Multi-zone sleep analysis',
    ],
  },
  PULSE: {
    name: 'PULSE',
    price: 14999,
    bullets: [
      'Everything in SENSE',
      'Heart rate monitoring',
      'Advanced cardiac pattern alerts',
      'Trend reports for pediatric visits',
    ],
  },
  OMNI: {
    name: 'OMNI',
    price: 19999,
    bullets: [
      'Everything in PULSE',
      'HD live video with night vision',
      'Two-way audio',
      'The complete Anvaya experience',
    ],
  },
} as const;

type ProductKey = keyof typeof PRODUCTS;

function recommend(answers: AnswerMap): ProductKey {
  const budget = answers['budget'];
  const worry = answers['worry'];
  const video = answers['video'];

  if (budget === 'under10k') return 'CORE';
  if (budget === 'best' || video === 'yes') return 'OMNI';
  if (budget === '15-20k') return 'PULSE';
  if (budget === '10-15k' || worry === 'spo2' || worry === 'temp') return 'SENSE';
  return 'PULSE';
}

export default function QuizClient() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [result, setResult] = useState<ProductKey | null>(null);
  const [finding, setFinding] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [animState, setAnimState] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [displayQ, setDisplayQ] = useState(0);

  const question = QUESTIONS[displayQ];
  const selectedAnswer = answers[question?.id ?? ''];
  const isLast = currentQ === QUESTIONS.length - 1;
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  function selectOption(value: string) {
    const qId = QUESTIONS[currentQ].id;
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ === QUESTIONS.length - 1) {
        setFinding(true);
        setTimeout(() => {
          setFinding(false);
          setResult(recommend(newAnswers));
        }, 800);
      } else {
        setAnimState('exit');
        setTimeout(() => {
          setCurrentQ((q) => q + 1);
          setDisplayQ((q) => q + 1);
          setAnimState('enter');
          setTimeout(() => setAnimState('idle'), 300);
        }, 200);
      }
    }, 300);
  }

  function handleNext() {
    if (!selectedAnswer) return;
    if (isLast) {
      setFinding(true);
      setTimeout(() => {
        setFinding(false);
        setResult(recommend(answers));
      }, 800);
    } else {
      setAnimState('exit');
      setTimeout(() => {
        setCurrentQ((q) => q + 1);
        setDisplayQ((q) => q + 1);
        setAnimState('enter');
        setTimeout(() => setAnimState('idle'), 300);
      }, 200);
    }
  }

  function handleBack() {
    if (currentQ === 0) return;
    setAnimState('exit');
    setTimeout(() => {
      setCurrentQ((q) => q - 1);
      setDisplayQ((q) => q - 1);
      setAnimState('enter');
      setTimeout(() => setAnimState('idle'), 300);
    }, 200);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!result || !name.trim() || !whatsapp.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          whatsapp,
          product: result,
          source: 'quiz',
        }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  }

  if (finding) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-4xl mb-4 animate-bounce">✨</div>
          <p className="text-lg font-semibold text-foreground">Finding your perfect match...</p>
          <p className="text-sm text-muted-foreground mt-2">Analysing your answers</p>
        </div>
      </div>
    );
  }

  if (result) {
    const product = PRODUCTS[result];

    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-lg mx-auto">

            <p className="text-center text-lg font-bold mb-3 animate-fade-in" style={{ color: '#4a7c6f' }}>
              🎉 Perfect match found!
            </p>

            <div
              className="rounded-2xl p-8 text-center mb-6 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #2d5c52 0%, #4a7c6f 100%)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                  animation: 'shimmer-slide 3s ease-in-out infinite',
                }}
              />
              <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-4">
                ❖ Your Perfect Match
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Anvaya {product.name}</h1>
              <p className="text-white/70 text-sm">Based on your answers</p>
            </div>

            <div className="bg-white border border-[#e2dbd4] rounded-2xl p-6 mb-6 shadow-sm">
              <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Why {product.name} is right for you
              </h2>
              <ul className="space-y-3">
                {product.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 border-l-4 border-primary pl-3 py-0.5">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-5 border-t border-[#f0ece6] text-center">
                <div className="bg-primary/6 border border-primary/15 rounded-xl px-4 py-3">
                  <p className="text-sm font-semibold text-primary mb-0.5">🔒 Founding family pricing</p>
                  <p className="text-xs text-muted-foreground">Exclusive founding price — no payment today</p>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="bg-white border border-[#e2dbd4] rounded-2xl p-10 text-center shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">✅ You&apos;re reserved!</h2>
                <p className="text-muted-foreground text-sm">
                  We&apos;ll reach out within 1 hour with your <span className="font-semibold text-primary">{product.name}</span> pod details.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[#e2dbd4] rounded-2xl p-6 shadow-sm space-y-3"
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
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 text-white font-bold"
                  style={{background:'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow:'0 4px 20px rgba(232,149,122,0.4)'}}
                  disabled={loading}
                >
                  {loading ? (
                    'Reserving...'
                  ) : (
                    <>
                      Join Founding Families — {product.name}{' '}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  We&apos;ll reach out to confirm within 1 hour
                </p>
              </form>
            )}

            <button
              type="button"
              onClick={() => { setResult(null); setCurrentQ(0); setDisplayQ(0); setAnswers({}); setAnimState('idle'); }}
              className="mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline mx-auto block"
            >
              Retake quiz
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">Taken by 500+ Indian parents</p>
          </div>
        </div>
      </div>
    );
  }

  const animClass =
    animState === 'exit'
      ? 'opacity-0 -translate-x-8'
      : animState === 'enter'
      ? 'opacity-0 translate-x-8'
      : 'opacity-100 translate-x-0';

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div style={{ background: 'linear-gradient(135deg, #2d5c52 0%, #4a7c6f 100%)' }}>
        <div className="container mx-auto px-4 pt-6 pb-8">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentQ === 0}
                className="flex items-center gap-1 text-white/70 hover:text-white disabled:opacity-30 text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-1.5">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === currentQ ? '20px' : '8px',
                      height: '8px',
                      backgroundColor:
                        i < currentQ
                          ? 'rgba(255,255,255,0.9)'
                          : i === currentQ
                          ? '#ffffff'
                          : 'rgba(255,255,255,0.25)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="w-full bg-white/20 rounded-full h-1.5 mb-6">
              <div
                className="bg-white rounded-full h-1.5 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              {question.question}
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div
            key={displayQ}
            className={`space-y-3 mb-6 transition-all duration-200 ${animClass}`}
          >
            {question.options.map((opt) => {
              const selected = selectedAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectOption(opt.value)}
                  className={[
                    'w-full rounded-xl border-2 p-4 text-left flex items-center gap-4 transition-all duration-200',
                    selected
                      ? 'border-primary bg-primary/8'
                      : 'border-[#e2dbd4] bg-white hover:border-primary/40',
                  ].join(' ')}
                  style={selected ? { backgroundColor: 'rgba(74,124,111,0.08)' } : {}}
                >
                  <span className="text-2xl shrink-0">{opt.emoji}</span>
                  <div className="flex-1">
                    <span className="font-semibold text-sm sm:text-base text-foreground">
                      {opt.label}
                    </span>
                    {opt.sub && (
                      <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                    )}
                  </div>
                  {selected && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full gap-2 bg-primary text-white hover:bg-primary/90"
            disabled={!selectedAnswer}
            onClick={handleNext}
          >
            {isLast ? (
              <>
                See My Result <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
