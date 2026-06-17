'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Mic, MicOff, Loader2, RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';
import { processRecordedAudio } from '@/lib/audioProcessor';

type AppState = 'idle' | 'uploading' | 'processing' | 'result' | 'error';

interface PredictionResult {
  is_cry: boolean;
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
  reliability: string;
  stage_blocked?: string | null;
  reason: string;
  gate_score: number;
}

const CLASS_META: Record<string, { emoji: string; label: string; advice: string; color: string }> = {
  hungry:     { emoji: '🍼', label: 'Hungry',        color: '#f59e0b', advice: "Your baby is likely hungry. Try feeding them now — even if it hasn't been long since the last feed. Babies often cluster-feed during growth spurts." },
  tired:      { emoji: '😴', label: 'Tired',          color: '#8b5cf6', advice: "Your baby is tired and ready for sleep. Dim the lights, reduce noise, and try gentle rocking or a lullaby. A consistent sleep routine helps." },
  discomfort: { emoji: '😣', label: 'Discomfort',     color: '#ef4444', advice: "Your baby is feeling uncomfortable. Check their diaper, clothing tags, room temperature, and look for signs of gas or bloating." },
  belly_pain: { emoji: '🤢', label: 'Belly Pain',     color: '#dc2626', advice: "Your baby may have belly pain or colic. Try gentle tummy massage in circular motions, bicycle leg movements, or hold them upright to release gas." },
  burping:    { emoji: '😮‍💨', label: 'Needs Burping', color: '#10b981', advice: "Your baby needs to burp. Hold them upright on your shoulder and gently pat their back. Try different positions — over-the-knee works well." },
};

const RELIABILITY_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  HIGH:   { bg: 'bg-green-100',  text: 'text-green-700',  label: 'HIGH' },
  MEDIUM: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'MEDIUM' },
  LOW:    { bg: 'bg-red-100',    text: 'text-red-700',    label: 'LOW' },
};


function normToHundred(probs: Record<string, number>): Array<[string, number]> {
  const entries = Object.entries(probs).map(([k, v]) => [k, Number(v) || 0] as [string, number]);
  const sum = entries.reduce((a, [, v]) => a + v, 0);
  const scale = sum > 0 ? 100 / sum : 1;
  return entries.map(([k, v]) => [k, v * scale] as [string, number]).sort((a, b) => b[1] - a[1]);
}

/* ─── Premium button ─────────────────────────────────────────────── */
function PremiumBtn({ onClick, children, gradient = 'linear-gradient(135deg,#e8957a,#d4784a)', shadow = '0 6px 24px rgba(232,149,122,0.45)', className = '', fullWidth = false }:
  { onClick?: () => void; children: React.ReactNode; gradient?: string; shadow?: string; className?: string; fullWidth?: boolean }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick}
      className={`relative overflow-hidden font-bold text-white rounded-2xl flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm transition-all duration-150 select-none ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{ background: gradient, boxShadow: pressed ? 'none' : shadow, transform: pressed ? 'scale(0.96) translateY(1px)' : hovered ? 'scale(1.03) translateY(-2px)' : 'scale(1)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      {hovered && <span className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%)', animation: 'btn-shimmer .6s ease-out forwards' }} />}
      {children}
      <style>{`@keyframes btn-shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}`}</style>
    </button>
  );
}

/* ─── Waveform bar ───────────────────────────────────────────────── */
function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 99, background: active ? '#7aab9e' : 'rgba(122,171,158,0.3)',
          opacity: active ? 0.85 : 0.4,
          height: active ? undefined : 4,
          animation: active ? `wave-bar ${0.5 + (i % 5) * 0.1}s ease-in-out ${(i * 0.04) % 0.44}s infinite alternate` : undefined,
          minHeight: 3, maxHeight: 32,
        }} />
      ))}
      <style>{`@keyframes wave-bar{from{height:3px}to{height:32px}}`}</style>
    </div>
  );
}

export default function CryAnalyzerPage() {
  const [state, setState] = useState<AppState>('idle');
  const [tab, setTab] = useState<'upload' | 'record'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [recPressed, setRecPressed] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const analyze = useCallback(async (file: File) => {
    setFileName(file.name);
    setState('uploading');
    setError('');
    setResult(null);
    const form = new FormData();
    form.append('file', file);
    setState('processing');
    try {
      const res = await fetch('/api/cry-analyze', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      setResult(data as PredictionResult);
      setState('result');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setState('error');
    }
  }, []);

  const handleFile = useCallback((file: File) => {
    const allowed = ['.wav', '.mp3', '.ogg', '.flac', '.m4a'];
    const ok = allowed.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!ok) { setError('Please upload a WAV, MP3, OGG, FLAC or M4A file.'); setState('error'); return; }
    analyze(file);
  }, [analyze]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = e => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setState('processing');
        const result = await processRecordedAudio(new Blob(chunksRef.current));
        if (!result.ok) { setError(result.error.message); setState('error'); return; }
        analyze(result.file);
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setRecSeconds(0);
      let secs = 0;
      timerRef.current = setInterval(() => { secs += 1; setRecSeconds(secs); if (secs >= 10) stopRecording(); }, 1000);
    } catch {
      setError('Microphone access denied. Please allow microphone permission and try again.');
      setState('error');
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const reset = () => { setState('idle'); setResult(null); setError(''); setFileName(''); setRecSeconds(0); setRecording(false); };

  const isWorking = state === 'uploading' || state === 'processing';

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(175deg,#041009 0%,#061410 55%,#050e09 100%)' }}>

      {/* Brand ambient glow orbs */}
      <div className="absolute -left-40 -top-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(74,124,111,0.22) 0%,transparent 70%)', filter: 'blur(60px)', animation: 'float-slow 8s ease-in-out infinite' }} />
      <div className="absolute -right-20 top-10 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(232,149,122,0.14) 0%,transparent 70%)', filter: 'blur(60px)', animation: 'float-slow 10s ease-in-out infinite', animationDelay: '4s' }} />
      <div className="absolute left-1/2 bottom-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(74,124,111,0.12) 0%,transparent 70%)', filter: 'blur(50px)', animationDelay: '2s' }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(74,124,111,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" style={{ boxShadow: '0 0 8px #4ade80' }} />
          <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Anvaya Cry Analyzer</span>
        </div>
        <div className="w-24" />
      </nav>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ background: 'rgba(74,124,111,0.2)', border: '1px solid rgba(74,124,111,0.4)', color: '#7aab9e' }}>
            <Sparkles className="w-3 h-3" /> AI-Powered Demo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
            {state === 'idle'       && 'What is your baby trying to say?'}
            {state === 'uploading'  && 'Uploading your recording...'}
            {state === 'processing' && 'Listening to your baby...'}
            {state === 'result'     && (result?.is_cry ? 'We heard your baby!' : "Hmm, that doesn't sound like a cry")}
            {state === 'error'      && 'Something went wrong'}
          </h1>
          <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
            {state === 'idle'       && "Upload a WAV/MP3 or record 10 seconds of your baby's cry for an instant AI analysis."}
            {state === 'uploading'  && `Sending "${fileName}" to our AI...`}
            {state === 'processing' && 'Running 3-stage AI — cry gate, quality check, and 4-model ensemble...'}
            {(state === 'result' || state === 'error') && ''}
          </p>
        </div>

        {/* Waveform */}
        <div className="mb-6 w-full max-w-md">
          <Waveform active={isWorking || recording} />
        </div>

        {/* ── IDLE CARD ── */}
        {state === 'idle' && (
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'rgba(10,26,20,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(74,124,111,0.3)' }}>
            {/* Tabs */}
            <div className="flex gap-1 p-3" style={{ background: 'rgba(74,124,111,0.08)' }}>
              {(['upload', 'record'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200"
                  style={tab === t
                    ? { background: 'linear-gradient(135deg,#2d6b5e,#4a7c6f)', color: '#fff', boxShadow: '0 3px 12px rgba(74,124,111,0.4)' }
                    : { color: 'rgba(255,255,255,0.45)', background: 'transparent' }
                  }>
                  {t === 'upload' ? '📁 Upload File' : '🎙 Record Live'}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* Upload tab */}
              {tab === 'upload' && (
                <div>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 group relative overflow-hidden"
                    style={{
                      borderColor: dragOver ? '#4a7c6f' : 'rgba(74,124,111,0.35)',
                      background: dragOver ? 'rgba(74,124,111,0.12)' : 'rgba(74,124,111,0.05)',
                    }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at center, rgba(74,124,111,0.12) 0%, transparent 70%)' }} />
                    <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 duration-200"
                      style={{ background: 'rgba(74,124,111,0.2)' }}>
                      <Upload className="w-6 h-6 text-[#7aab9e]" />
                    </div>
                    <p className="text-white font-semibold mb-1">Drop your audio file here</p>
                    <p className="text-white/40 text-xs">WAV · MP3 · OGG · FLAC · M4A</p>
                    <input ref={fileInputRef} type="file" accept=".wav,.mp3,.ogg,.flac,.m4a,audio/*"
                      className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                  </div>
                  <p className="text-center text-[11px] text-white/30 mt-3">or use the record tab to capture live</p>
                </div>
              )}

              {/* Record tab */}
              {tab === 'record' && (
                <div className="flex flex-col items-center gap-5 py-3">
                  {!recording ? (
                    <>
                      <p className="text-sm text-white/60 text-center">Tap to start a 10-second recording</p>
                      {/* Big premium mic button */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-28 h-28 rounded-full animate-ping opacity-10"
                          style={{ background: 'radial-gradient(circle,#e8957a,transparent)' }} />
                        <div className="absolute w-24 h-24 rounded-full opacity-20"
                          style={{ background: 'rgba(232,149,122,0.4)', animation: 'mic-ring 2s ease-in-out infinite' }} />
                        <button
                          onClick={startRecording}
                          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-150 select-none"
                          style={{
                            background: 'linear-gradient(135deg,#e8957a,#d4784a)',
                            boxShadow: recPressed ? 'none' : '0 8px 32px rgba(232,149,122,0.55)',
                            transform: recPressed ? 'scale(0.92)' : 'scale(1)',
                          }}
                          onMouseDown={() => setRecPressed(true)}
                          onMouseUp={() => setRecPressed(false)}
                          onMouseLeave={() => setRecPressed(false)}
                          onTouchStart={() => setRecPressed(true)}
                          onTouchEnd={() => setRecPressed(false)}
                        >
                          <Mic className="w-8 h-8" />
                        </button>
                      </div>
                      <p className="text-[11px] text-white/35 text-center">Auto-analyzes after 10 seconds · Hold near baby</p>
                      <style>{`@keyframes mic-ring{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(1.15);opacity:.1}}`}</style>
                    </>
                  ) : (
                    <>
                      {/* SVG countdown arc */}
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(74,124,111,0.2)" strokeWidth="6" />
                          <circle cx="48" cy="48" r="40" fill="none" stroke="#e8957a" strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - recSeconds / 10)}`}
                            style={{ transition: 'stroke-dashoffset 1s linear' }} />
                        </svg>
                        <div className="text-center">
                          <div className="text-2xl font-black text-white">{10 - recSeconds}</div>
                          <div className="text-[9px] text-white/40 font-semibold uppercase tracking-wider">sec left</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
                        <div className="w-2 h-2 rounded-full bg-[#e8957a] animate-pulse" />
                        Recording… {recSeconds}s / 10s
                      </div>
                      <button onClick={stopRecording}
                        className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150 select-none"
                        style={{ background: 'rgba(239,68,68,0.15)', border: '1.5px solid rgba(239,68,68,0.35)', color: '#fca5a5', boxShadow: '0 4px 16px rgba(239,68,68,0.2)' }}>
                        <div className="w-5 h-5 rounded-md bg-red-500 flex items-center justify-center shrink-0">
                          <div className="w-2.5 h-2.5 rounded-sm bg-white" />
                        </div>
                        Stop &amp; analyze
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PROCESSING ── */}
        {isWorking && (
          <div className="w-full max-w-md rounded-3xl p-10 text-center shadow-2xl"
            style={{ background: 'rgba(10,26,20,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(74,124,111,0.3)' }}>
            {/* Spinning conic orb */}
            <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-spin"
                style={{ background: 'conic-gradient(from 0deg, transparent 0%, #4a7c6f 30%, transparent 60%)' }} />
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(4,16,9,0.9)' }}>
                <span className="text-2xl">{state === 'uploading' ? '📤' : '🧠'}</span>
              </div>
            </div>
            <p className="text-white font-bold text-lg mb-1">{state === 'uploading' ? 'Uploading audio...' : 'Analyzing cry...'}</p>
            <p className="text-white/40 text-xs mb-5">Running 4-model ensemble</p>
            {state === 'processing' && (
              <div className="space-y-2.5 text-left">
                {['Cry gate check', 'Quality check', '4-model ensemble', 'Calibration & scoring'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-white/60"
                    style={{ background: 'rgba(74,124,111,0.1)', border: '1px solid rgba(74,124,111,0.2)' }}>
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-[#7aab9e]" style={{ animationDelay: `${i * 0.25}s` }} />
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── RESULT ── */}
        {state === 'result' && result && (
          <div className="w-full max-w-lg space-y-4">
            {result.is_cry ? (
              <>
                {(() => {
                  const meta = CLASS_META[result.prediction] ?? { emoji: '❓', label: result.prediction, advice: result.reason, color: '#4a7c6f' };
                  const rel = RELIABILITY_BADGE[result.reliability] ?? RELIABILITY_BADGE.MEDIUM;
                  return (
                    <div className="rounded-3xl overflow-hidden shadow-2xl"
                      style={{ border: `1.5px solid ${meta.color}30` }}>
                      {/* Gradient top */}
                      <div className="px-6 pt-6 pb-5 flex items-center gap-4"
                        style={{ background: `linear-gradient(135deg, ${meta.color}22 0%, ${meta.color}0a 100%)`, backdropFilter: 'blur(24px)' }}>
                        <span className="text-5xl shrink-0">{meta.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h2 className="text-2xl font-bold text-white">{meta.label}</h2>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide ${rel.bg} ${rel.text}`}>{rel.label}</span>
                          </div>
                          <div className="text-3xl font-black" style={{ color: meta.color }}>
                            {(result.confidence * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      {/* Advice */}
                      <div className="px-6 py-4" style={{ background: 'rgba(10,26,20,0.8)', backdropFilter: 'blur(24px)', borderTop: `1px solid ${meta.color}20` }}>
                        <div className="flex items-start gap-2">
                          <span className="text-base shrink-0 mt-0.5">💡</span>
                          <p className="text-white/75 text-sm leading-relaxed">{meta.advice}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Probabilities */}
                <div className="rounded-3xl p-5 shadow-xl"
                  style={{ background: 'rgba(10,26,20,0.75)', backdropFilter: 'blur(24px)', border: '1px solid rgba(74,124,111,0.3)' }}>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">All probabilities</p>
                  <div className="space-y-3">
                    {normToHundred(result.probabilities).map(([cls, prob]) => {
                      const meta = CLASS_META[cls];
                      return (
                        <div key={cls}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white/70 text-xs font-medium">{meta?.emoji} {meta?.label ?? cls}</span>
                            <span className="text-white/40 text-xs font-mono">{prob.toFixed(1)}%</span>
                          </div>
                          <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div className="h-2 rounded-full transition-all duration-700"
                              style={{ width: `${Math.min(100, prob)}%`, background: `linear-gradient(90deg, ${meta?.color ?? '#4a7c6f'}99, ${meta?.color ?? '#4a7c6f'})` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-3xl p-8 text-center shadow-2xl"
                style={{ background: 'rgba(120,80,0,0.2)', backdropFilter: 'blur(24px)', border: '1px solid rgba(245,158,11,0.3)' }}>
                <AlertTriangle className="w-14 h-14 text-amber-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">No baby cry detected</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-2">
                  Our AI couldn&apos;t detect a baby cry in this recording (gate score: {(result.gate_score * 100).toFixed(0)}%).
                </p>
                <p className="text-white/40 text-xs">Try a clearer recording, closer to your baby, with less background noise.</p>
              </div>
            )}

            <div className="rounded-2xl p-4 text-center" style={{ background: 'rgba(74,124,111,0.08)', border: '1px solid rgba(74,124,111,0.2)' }}>
              <p className="text-white/35 text-xs leading-relaxed">
                ⚠️ Demo only — not a medical device. For any health concerns, consult a qualified paediatrician.
              </p>
            </div>

            <PremiumBtn onClick={reset} fullWidth
              gradient="linear-gradient(135deg,#2d6b5e,#4a7c6f)"
              shadow="0 6px 24px rgba(74,124,111,0.4)">
              <RotateCcw className="w-4 h-4" /> Analyze another recording
            </PremiumBtn>
          </div>
        )}

        {/* ── ERROR ── */}
        {state === 'error' && (
          <div className="w-full max-w-md space-y-4">
            <div className="rounded-3xl p-8 text-center shadow-2xl"
              style={{ background: 'rgba(80,20,20,0.35)', backdropFilter: 'blur(24px)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h2 className="text-lg font-bold text-white mb-2">Analysis failed</h2>
              <p className="text-white/60 text-sm">{error}</p>
            </div>
            <PremiumBtn onClick={reset} fullWidth>
              <RotateCcw className="w-4 h-4" /> Try again
            </PremiumBtn>
          </div>
        )}
      </div>

      <footer className="relative z-10 text-center pb-6 px-4">
        <p className="text-white/25 text-xs">Powered by Anvaya Smart AI · Infant Cry Classifier v2.0 · 5-class ensemble</p>
      </footer>
    </div>
  );
}
