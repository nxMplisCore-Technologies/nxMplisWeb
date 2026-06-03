'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Mic, MicOff, Loader2, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { processRecordedAudio } from '@/lib/audioProcessor';

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Class metadata ───────────────────────────────────────────────────────────
const CLASS_META: Record<string, { emoji: string; label: string; advice: string; color: string }> = {
  hungry: {
    emoji: '🍼',
    label: 'Hungry',
    advice: 'Your baby is likely hungry. Try feeding them now — even if it hasn\'t been long since the last feed. Babies often cluster-feed during growth spurts.',
    color: '#f59e0b',
  },
  tired: {
    emoji: '😴',
    label: 'Tired',
    advice: 'Your baby is tired and ready for sleep. Dim the lights, reduce noise, and try gentle rocking or a lullaby. A consistent sleep routine helps signal it\'s rest time.',
    color: '#8b5cf6',
  },
  discomfort: {
    emoji: '😣',
    label: 'Discomfort',
    advice: 'Your baby is feeling uncomfortable. Check their diaper, clothing for tight tags or irritation, room temperature, and look for signs of gas or bloating.',
    color: '#ef4444',
  },
  belly_pain: {
    emoji: '🤢',
    label: 'Belly Pain',
    advice: 'Your baby may have belly pain or colic. Try gentle tummy massage in circular motions, bicycle leg movements, or hold them upright against your shoulder to release gas.',
    color: '#dc2626',
  },
  burping: {
    emoji: '😮‍💨',
    label: 'Needs Burping',
    advice: 'Your baby needs to burp. Hold them upright on your shoulder and gently pat their back. Try different burping positions — over-the-knee works well for some babies.',
    color: '#10b981',
  },
};

const RELIABILITY_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  HIGH:   { bg: 'bg-green-100',  text: 'text-green-700',  label: 'HIGH' },
  MEDIUM: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'MEDIUM' },
  LOW:    { bg: 'bg-red-100',    text: 'text-red-700',    label: 'LOW' },
};

// ─── Background scenes — local images from public/cry-analyzer/ ───────────────
// sad baby    → idle + uploading  (baby crying, needs help)
// pacifying   → processing        (parent soothing while AI works)
// happy baby  → result            (baby is happy after advice)
const BG_SCENES: Record<AppState, { images: string[]; opacity: number }> = {
  idle: {
    images: [
      '/cry-analyzer/sad/1.jpg',
      '/cry-analyzer/sad/2.jpg',
      '/cry-analyzer/sad/3.jpg',
      '/cry-analyzer/sad/4.jpg',
    ],
    opacity: 0.35,
  },
  uploading: {
    images: [
      '/cry-analyzer/sad/1.jpg',
      '/cry-analyzer/sad/2.jpg',
      '/cry-analyzer/sad/3.jpg',
      '/cry-analyzer/sad/4.jpg',
    ],
    opacity: 0.30,
  },
  processing: {
    images: [
      '/cry-analyzer/pacifying/1.jpg',
      '/cry-analyzer/pacifying/2.jpg',
      '/cry-analyzer/pacifying/3.jpg',
      '/cry-analyzer/pacifying/4.jpg',
    ],
    opacity: 0.30,
  },
  result: {
    images: [
      '/cry-analyzer/happy/1.jpg',
      '/cry-analyzer/happy/2.jpg',
      '/cry-analyzer/happy/3.jpg',
      '/cry-analyzer/happy/4.jpg',
    ],
    opacity: 0.35,
  },
  error: {
    images: [
      '/cry-analyzer/sad/1.jpg',
      '/cry-analyzer/sad/2.jpg',
    ],
    opacity: 0.25,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Normalize probabilities to always sum to 100, regardless of API scale (0-1 or 0-100)
function normToHundred(probs: Record<string, number>): Array<[string, number]> {
  const entries = Object.entries(probs).map(([k, v]) => [k, Number(v) || 0] as [string, number]);
  const sum = entries.reduce((a, [, v]) => a + v, 0);
  const scale = sum > 0 ? 100 / sum : 1;
  return entries.map(([k, v]) => [k, v * scale] as [string, number]).sort((a, b) => b[1] - a[1]);
}

function sortedProbs(probs: Record<string, number>) {
  return normToHundred(probs);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CryAnalyzerPage() {
  const [state, setState] = useState<AppState>('idle');
  const [tab, setTab] = useState<'upload' | 'record'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  // Recording state
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cycle background images — randomly pick next index
  useEffect(() => {
    const images = BG_SCENES[state].images;
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setBgIndex(prev => {
        let next = Math.floor(Math.random() * images.length);
        if (next === prev) next = (next + 1) % images.length;
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => { setBgIndex(0); }, [state]);

  // ── Analyze audio ──────────────────────────────────────────────────────────
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

  // ── File upload handlers ───────────────────────────────────────────────────
  const handleFile = useCallback((file: File) => {
    const allowed = ['.wav', '.mp3', '.ogg', '.flac', '.m4a'];
    const ok = allowed.some(ext => file.name.toLowerCase().endsWith(ext));
    if (!ok) { setError('Please upload a WAV, MP3, OGG, FLAC or M4A file.'); setState('error'); return; }
    analyze(file);
  }, [analyze]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  // ── Microphone recording ───────────────────────────────────────────────────
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        },
      });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = e => chunksRef.current.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setState('processing');
        const rawBlob = new Blob(chunksRef.current);
        const result = await processRecordedAudio(rawBlob);
        if (!result.ok) {
          setError(result.error.message);
          setState('error');
          return;
        }
        analyze(result.file);
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setRecSeconds(0);

      let secs = 0;
      timerRef.current = setInterval(() => {
        secs += 1;
        setRecSeconds(secs);
        if (secs >= 10) stopRecording();
      }, 1000);
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

  const reset = () => {
    setState('idle');
    setResult(null);
    setError('');
    setFileName('');
    setRecSeconds(0);
    setRecording(false);
  };

  const scene = BG_SCENES[state];
  const bgUrl = scene.images[bgIndex % scene.images.length];

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">

      {/* Background image — semi-transparent so content stays readable */}
      <div
        key={bgUrl}
        className="absolute inset-0 bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: '100% 100%', opacity: scene.opacity }}
      />
      {/* Dark base so text is always readable regardless of image brightness */}
      <div className="absolute inset-0 bg-[#0a0a0f]" style={{ zIndex: -1 }} />

      {/* Nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="text-white/60 text-xs font-medium tracking-wider uppercase">Anvaya Cry Analyzer</div>
        <div className="w-24" /> {/* spacer */}
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[#7DF9FF] text-xs font-bold uppercase tracking-widest mb-2">AI-Powered Demo</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {state === 'idle'      && 'What is your baby trying to say?'}
            {state === 'uploading' && 'Uploading your recording...'}
            {state === 'processing' && 'Listening to your baby...'}
            {state === 'result'    && (result?.is_cry ? 'We heard your baby!' : 'Hmm, that doesn\'t sound like a cry')}
            {state === 'error'     && 'Something went wrong'}
          </h1>
          <p className="text-white/60 mt-2 text-sm max-w-md mx-auto">
            {state === 'idle'      && 'Upload a WAV/MP3 file or record 10 seconds of your baby\'s cry for an instant AI analysis.'}
            {state === 'uploading' && `Sending "${fileName}" to our AI...`}
            {state === 'processing' && 'Running 3-stage AI analysis — cry gate, quality check, and 4-model ensemble...'}
            {state === 'result'    && ''}
            {state === 'error'     && ''}
          </p>
        </div>

        {/* ── IDLE: Upload / Record card ── */}
        {state === 'idle' && (
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
            {/* Tabs */}
            <div className="flex rounded-xl bg-white/10 p-1 mb-5">
              <button
                onClick={() => setTab('upload')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === 'upload' ? 'bg-white text-gray-900 shadow' : 'text-white/70 hover:text-white'}`}
              >
                📁 Upload File
              </button>
              <button
                onClick={() => setTab('record')}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === 'record' ? 'bg-white text-gray-900 shadow' : 'text-white/70 hover:text-white'}`}
              >
                🎙 Record Live
              </button>
            </div>

            {/* Upload tab */}
            {tab === 'upload' && (
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragOver ? 'border-[#7DF9FF] bg-[#7DF9FF]/10' : 'border-white/30 hover:border-white/60 hover:bg-white/5'
                }`}
              >
                <Upload className="w-10 h-10 text-white/50 mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">Drop your audio file here</p>
                <p className="text-white/50 text-xs">WAV, MP3, OGG, FLAC, M4A supported</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".wav,.mp3,.ogg,.flac,.m4a,audio/*"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
              </div>
            )}

            {/* Record tab */}
            {tab === 'record' && (
              <div className="text-center">
                {!recording ? (
                  <>
                    <button
                      onClick={startRecording}
                      className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-400 active:scale-95 transition-all mx-auto flex items-center justify-center shadow-lg shadow-red-500/40 mb-4"
                    >
                      <Mic className="w-10 h-10 text-white" />
                    </button>
                    <p className="text-white font-semibold">Tap to start recording</p>
                    <p className="text-white/50 text-xs mt-1">Auto-analyzes after 10 seconds</p>
                  </>
                ) : (
                  <>
                    <button
                      onClick={stopRecording}
                      className="w-24 h-24 rounded-full bg-red-600 mx-auto flex items-center justify-center shadow-lg shadow-red-600/50 mb-4 relative"
                    >
                      {/* Pulse ring */}
                      <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />
                      <MicOff className="w-10 h-10 text-white relative z-10" />
                    </button>
                    {/* Progress bar */}
                    <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                      <div
                        className="bg-[#7DF9FF] h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(recSeconds / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-white font-semibold">Recording... {recSeconds}s / 10s</p>
                    <p className="text-white/50 text-xs mt-1">Tap the mic to stop early</p>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── UPLOADING / PROCESSING: animated loader ── */}
        {(state === 'uploading' || state === 'processing') && (
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <Loader2 className="w-20 h-20 text-[#7DF9FF] animate-spin" />
              <span className="absolute inset-0 flex items-center justify-center text-3xl">
                {state === 'uploading' ? '📤' : '🧠'}
              </span>
            </div>
            <p className="text-white font-bold text-lg mb-2">
              {state === 'uploading' ? 'Uploading audio...' : 'Analyzing cry...'}
            </p>
            {state === 'processing' && (
              <div className="space-y-2 mt-4 text-left">
                {['Cry gate check', 'OOD quality check', '4-model ensemble inference', 'Calibration & scoring'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-white/70">
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" style={{ animationDelay: `${i * 0.3}s` }} />
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
                {/* Main result card */}
                {(() => {
                  const meta = CLASS_META[result.prediction] ?? { emoji: '❓', label: result.prediction, advice: result.reason, color: '#7DF9FF' };
                  const rel  = RELIABILITY_BADGE[result.reliability] ?? RELIABILITY_BADGE.MEDIUM;
                  return (
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">{meta.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-2xl font-bold text-white">{meta.label}</h2>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${rel.bg} ${rel.text}`}>
                              {rel.label}
                            </span>
                          </div>
                          <p className="text-white/60 text-sm mt-0.5">
                            {(result.confidence * 100).toFixed(1)}% confidence
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed border-t border-white/10 pt-4">
                        💡 {meta.advice}
                      </p>
                    </div>
                  );
                })()}

                {/* Probabilities */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 shadow-xl">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">All probabilities</p>
                  <div className="space-y-2.5">
                    {sortedProbs(result.probabilities).map(([cls, prob]) => {
                      const meta = CLASS_META[cls];
                      return (
                        <div key={cls}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/80 text-xs font-medium">
                              {meta?.emoji} {meta?.label ?? cls}
                            </span>
                            <span className="text-white/60 text-xs">{prob.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full transition-all duration-700"
                              style={{ width: `${Math.min(100, prob)}%`, backgroundColor: meta?.color ?? '#7DF9FF' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Not a cry */
              <div className="bg-yellow-500/20 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-8 shadow-2xl text-center">
                <AlertTriangle className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">That doesn&apos;t sound like a baby cry</h2>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Our AI couldn&apos;t detect a baby cry in this recording (gate score: {(result.gate_score * 100).toFixed(0)}%).
                  Please try again with a clearer recording of your baby crying, away from background noise.
                </p>
              </div>
            )}

            {/* Disclaimer + Reset */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-white/40 text-xs leading-relaxed">
                ⚠️ This is a demo for illustrative purposes only. Do not use for medical decisions.
                For any health concerns, please consult a qualified paediatrician.
              </p>
            </div>

            <Button
              onClick={reset}
              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-2xl h-12 font-semibold gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Analyze another recording
            </Button>
          </div>
        )}

        {/* ── ERROR ── */}
        {state === 'error' && (
          <div className="w-full max-w-md bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-3xl p-8 shadow-2xl text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-white mb-2">Analysis failed</h2>
            <p className="text-white/70 text-sm mb-6">{error}</p>
            <Button onClick={reset} className="bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl gap-2">
              <RotateCcw className="w-4 h-4" /> Try again
            </Button>
          </div>
        )}

      </div>

      {/* Footer disclaimer */}
      <footer className="relative z-10 text-center pb-6 px-4">
        <p className="text-white/30 text-xs">
          Powered by Anvaya Smart AI · Infant Cry Classifier v2.0 · 5-class ensemble
        </p>
      </footer>
    </div>
  );
}
