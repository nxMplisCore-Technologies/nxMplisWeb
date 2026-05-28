'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Upload, Square, Loader2, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

/* ─── API response shape (matches /api/cry-analyze exactly) ─────── */
interface PredictResult {
  is_cry: boolean;
  prediction: string;
  confidence: number;        // 0-1 decimal
  probabilities: Record<string, number>; // 0-1 per class
  reliability: string;       // HIGH | MEDIUM | LOW
  reason: string;
  gate_score: number;
}

type WidgetVariant = 'green' | 'purple';

interface ThemeConfig {
  headerBg: string;
  dotColor: string;
  tabActiveBg: string;
  tabActiveText: string;
  waveColor: string;
  waveRecordColor: string;
  btnBg: string;
  btnHover: string;
  resultAccent: string;
  footerBg: string;
  footerText: string;
  glowColor: string;
  borderColor: string;
}

const THEMES: Record<WidgetVariant, ThemeConfig> = {
  green: {
    headerBg: 'linear-gradient(135deg, #1a3d35 0%, #2d6b5e 60%, #4a7c6f 100%)',
    dotColor: '#4ade80',
    tabActiveBg: '#4a7c6f',
    tabActiveText: '#fff',
    waveColor: '#4a7c6f',
    waveRecordColor: '#e8957a',
    btnBg: '#4a7c6f',
    btnHover: '#3d6b5f',
    resultAccent: '#4a7c6f',
    footerBg: '#f0f7f5',
    footerText: '#4a7c6f',
    glowColor: 'rgba(74,124,111,0.25)',
    borderColor: 'rgba(74,124,111,0.2)',
  },
  purple: {
    headerBg: 'linear-gradient(135deg, #2e1065 0%, #5b21b6 55%, #7c3aed 100%)',
    dotColor: '#c084fc',
    tabActiveBg: '#7c3aed',
    tabActiveText: '#fff',
    waveColor: '#a855f7',
    waveRecordColor: '#c084fc',
    btnBg: '#7c3aed',
    btnHover: '#6d28d9',
    resultAccent: '#7c3aed',
    footerBg: '#f5f3ff',
    footerText: '#7c3aed',
    glowColor: 'rgba(124,58,237,0.25)',
    borderColor: 'rgba(124,58,237,0.25)',
  },
};

/* ─── Class metadata ─────────────────────────────────────────────── */
const CLASS_META: Record<string, { emoji: string; label: string; advice: string; color: string }> = {
  hungry: {
    emoji: '🍼', label: 'Hungry', color: '#f59e0b',
    advice: "Your baby is likely hungry. Try feeding now — even if it hasn't been long. Babies often cluster-feed during growth spurts.",
  },
  tired: {
    emoji: '😴', label: 'Tired', color: '#8b5cf6',
    advice: "Baby is tired and ready for sleep. Dim the lights, reduce noise, and try gentle rocking or a lullaby.",
  },
  discomfort: {
    emoji: '😣', label: 'Discomfort', color: '#ef4444',
    advice: "Baby feels uncomfortable. Check their diaper, clothing tags, room temperature, or signs of gas and bloating.",
  },
  belly_pain: {
    emoji: '🤢', label: 'Belly Pain', color: '#dc2626',
    advice: "Possible belly pain or colic. Try a gentle circular tummy massage, bicycle leg movements, or hold upright to release gas.",
  },
  burping: {
    emoji: '😮\u200d💨', label: 'Needs Burping', color: '#10b981',
    advice: "Baby needs to burp. Hold upright on your shoulder and gently pat the back. Try different positions — over-the-knee works well.",
  },
};

const RELIABILITY_BADGE: Record<string, { text: string; bg: string; fg: string }> = {
  HIGH:   { text: 'HIGH confidence',   bg: 'rgba(16,185,129,0.12)', fg: '#065f46' },
  MEDIUM: { text: 'MED confidence',    bg: 'rgba(245,158,11,0.12)',  fg: '#92400e' },
  LOW:    { text: 'LOW confidence',    bg: 'rgba(239,68,68,0.12)',   fg: '#991b1b' },
};

/* ─── Helpers ────────────────────────────────────────────────────── */
// For single 0-1 confidence value only (result.confidence, result.gate_score)
const toPercent = (v: number) => (isFinite(v) ? v * 100 : 0);

// Normalize class probabilities to always sum to 100 (handles 0-1, 0-100, or any scale)
function normToHundred(probs: Record<string, number>): Array<[string, number]> {
  const entries = Object.entries(probs).map(([k, v]) => [k, Number(v) || 0] as [string, number]);
  const sum = entries.reduce((a, [, v]) => a + v, 0);
  const scale = sum > 0 ? 100 / sum : 1;
  return entries.map(([k, v]) => [k, v * scale] as [string, number]).sort((a, b) => b[1] - a[1]);
}

/* ─── Animated Waveform ─────────────────────────────────────────── */
function Waveform({ active, color = '#4a7c6f' }: { active: boolean; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 99, background: color,
          opacity: active ? 0.85 : 0.3,
          height: active ? undefined : 5,
          animation: active ? `wave-bar ${0.55 + (i % 5) * 0.09}s ease-in-out ${(i * 0.04) % 0.4}s infinite alternate` : undefined,
          minHeight: 3, maxHeight: 28,
        }} />
      ))}
      <style>{`@keyframes wave-bar { from { height: 3px; } to { height: 26px; } }`}</style>
    </div>
  );
}

/* ─── Probability bar ────────────────────────────────────────────── */
function ProbBar({ label, prob, rank, accentColor }: { label: string; prob: number; rank: number; accentColor: string }) {
  // prob is already 0-100 (sum-normalized by normToHundred)
  const pct = Math.min(100, Math.max(0, prob));
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), rank * 90 + 150);
    return () => clearTimeout(t);
  }, [pct, rank]);
  const meta = CLASS_META[label];
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-4 text-center shrink-0 text-base leading-none">{meta?.emoji ?? '❓'}</span>
      <span className="w-[68px] text-[11px] text-slate-600 font-medium truncate capitalize">{meta?.label ?? label}</span>
      <div className="flex-1 rounded-full h-1.5 overflow-hidden" style={{ background: `${accentColor}18` }}>
        <div className="h-1.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: meta?.color ?? accentColor }} />
      </div>
      <span className="w-10 text-right text-slate-500 font-mono text-[10px]">{pct.toFixed(1)}%</span>
    </div>
  );
}

/* ─── Purple decorative glow (hero variant) ─────────────────────── */
function PurpleGlow() {
  return (
    <>
      <div className="absolute -inset-[3px] rounded-2xl pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #7c3aed55, #c084fc33, #7c3aed55)', animation: 'glow-spin 4s linear infinite' }} />
      <style>{`@keyframes glow-spin { 0%{opacity:.5} 50%{opacity:1} 100%{opacity:.5} }`}</style>
    </>
  );
}

/* ─── Main Widget ────────────────────────────────────────────────── */
export default function CryAnalyzerWidget({ variant = 'green' }: { variant?: WidgetVariant }) {
  const theme = THEMES[variant];
  const isPurple = variant === 'purple';

  const [tab, setTab] = useState<'upload' | 'record'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<PredictResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── analyze ── */
  const analyze = useCallback(async (audioFile: File) => {
    setStatus('analyzing');
    setResult(null);
    try {
      const fd = new FormData();
      fd.append('file', audioFile, audioFile.name);
      const res = await fetch('/api/cry-analyze', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Analysis failed');
      setResult(data as PredictResult);
      setStatus('done');
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : 'Unexpected error');
      setStatus('error');
    }
  }, []);

  const handleFile = useCallback((f: File) => {
    setFile(f); setStatus('idle'); setResult(null);
  }, []);

  const reset = useCallback(() => {
    setFile(null); setStatus('idle'); setResult(null); setErrorMsg('');
    setRecording(false); setRecSeconds(0);
  }, []);

  /* ── recording ── */
  const startRec = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const f = new File([blob], 'recording.webm', { type: 'audio/webm' });
        setFile(f);
        analyze(f);
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
      setRecSeconds(0);
      let s = 0;
      timerRef.current = setInterval(() => {
        s += 1;
        setRecSeconds(s);
        if (s >= 10) {
          mr.stop();
          clearInterval(timerRef.current!);
          setRecording(false);
        }
      }, 1000);
    } catch {
      setErrorMsg('Microphone access denied. Please allow permission.');
      setStatus('error');
    }
  }, [analyze]);

  const stopRec = useCallback(() => {
    mediaRef.current?.stop();
    clearInterval(timerRef.current!);
    setRecording(false);
  }, []);

  /* ── derived ── */
  const meta = result?.prediction ? (CLASS_META[result.prediction] ?? {
    emoji: '❓', label: result.prediction, advice: result.reason ?? '', color: theme.resultAccent,
  }) : null;
  const badge = result ? (RELIABILITY_BADGE[result.reliability] ?? RELIABILITY_BADGE.MEDIUM) : null;
  const normalizedProbs = result?.probabilities ? normToHundred(result.probabilities) : [];
  const sortedProbs = normalizedProbs;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ border: `1px solid ${theme.borderColor}` }}>
      {isPurple && <PurpleGlow />}

      {/* ── Gradient header ── */}
      <div className="relative px-5 pt-4 pb-4" style={{ background: theme.headerBg }}>
        {/* Title row */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: theme.dotColor, boxShadow: `0 0 8px ${theme.dotColor}`, animation: 'dot-pulse 2s ease-in-out infinite' }} />
          <div>
            <p className="text-white font-extrabold text-base leading-tight tracking-tight">
              {isPurple ? '✨ AI Cry Analyzer' : '🎙 Live Cry Analyzer'}
            </p>
            <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold mt-0.5">
              {isPurple ? 'Powered by Anvaya AI · Free demo' : 'Try it free · No signup needed'}
            </p>
          </div>
        </div>
        <style>{`@keyframes dot-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.7} }`}</style>

        {/* Waveform decoration */}
        <Waveform active={recording || status === 'analyzing'} color={recording ? theme.waveRecordColor : `${theme.dotColor}88`} />

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {(['upload', 'record'] as const).map(t => (
            <button key={t}
              onClick={() => { setTab(t); reset(); }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={tab === t
                ? { background: theme.tabActiveBg, color: theme.tabActiveText, boxShadow: `0 2px 8px ${theme.glowColor}` }
                : { background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }
              }
            >
              {t === 'upload' ? '📁 Upload file' : '🎙 Record live'}
            </button>
          ))}
        </div>
      </div>

      {/* ── White body ── */}
      <div className="px-5 py-4 bg-white">

        {/* Upload tab */}
        {tab === 'upload' && status !== 'analyzing' && status !== 'done' && (
          <div>
            {/* Use <label> for reliable file picker opening across all browsers */}
            <input ref={fileInputRef} id="cry-widget-file" type="file" accept=".wav,.mp3,.ogg,.flac,.m4a,audio/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
            <label htmlFor="cry-widget-file"
              className="rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 py-6 px-4 text-center block"
              style={{ borderColor: dragOver ? theme.btnBg : '#ddd6cf', background: dragOver ? theme.footerBg : '#fafaf9' }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            >
              <Upload className="w-5 h-5 opacity-60" style={{ color: theme.btnBg }} />
              {file ? (
                <>
                  <p className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} KB · click to change</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-600">Drop WAV / MP3 here</p>
                  <p className="text-[10px] text-slate-400">or click to browse your files</p>
                </>
              )}
            </label>

            {file && (
              <button onClick={() => analyze(file)}
                className="mt-3 w-full py-2.5 rounded-xl text-white text-sm font-bold transition-colors"
                style={{ background: theme.btnBg }}
                onMouseEnter={e => (e.currentTarget.style.background = theme.btnHover)}
                onMouseLeave={e => (e.currentTarget.style.background = theme.btnBg)}
              >
                Analyze cry →
              </button>
            )}
          </div>
        )}

        {/* Record tab */}
        {tab === 'record' && status !== 'analyzing' && status !== 'done' && (
          <div className="flex flex-col items-center gap-3 py-1">
            {recording ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-semibold text-slate-600">Recording… {recSeconds}s / 10s</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full transition-all duration-1000"
                    style={{ width: `${recSeconds * 10}%`, background: theme.waveRecordColor }} />
                </div>
                <button onClick={stopRec}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-100 text-red-600 text-sm font-bold hover:bg-red-200 transition-colors">
                  <Square className="w-3.5 h-3.5 fill-red-600" /> Stop &amp; analyze
                </button>
              </>
            ) : (
              <>
                <button onClick={startRec}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold transition-colors"
                  style={{ background: theme.btnBg, boxShadow: `0 4px 18px ${theme.glowColor}` }}
                  onMouseEnter={e => (e.currentTarget.style.background = theme.btnHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = theme.btnBg)}
                >
                  <Mic className="w-4 h-4" /> Start 10s recording
                </button>
                <p className="text-[10px] text-slate-400 text-center">Hold near baby. Auto-analyzes after 10 seconds.</p>
              </>
            )}
          </div>
        )}

        {/* Analyzing */}
        {status === 'analyzing' && (
          <div className="flex flex-col items-center gap-3 py-3">
            <div className="relative">
              <Loader2 className="w-9 h-9 animate-spin" style={{ color: theme.btnBg }} />
              <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: theme.btnBg }} />
            </div>
            <p className="text-sm font-semibold text-slate-600">Analyzing cry with AI…</p>
            <div className="space-y-1 w-full text-left">
              {['Cry gate check', '4-model ensemble', 'Calibration & scoring'].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin shrink-0" style={{ animationDelay: `${i * 0.25}s`, color: theme.btnBg }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700">Analysis failed</p>
                <p className="text-[11px] text-red-500 mt-0.5 leading-snug">{errorMsg}</p>
              </div>
            </div>
            <button onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              <RotateCcw className="w-3 h-3" /> Try again
            </button>
          </div>
        )}

        {/* Result */}
        {status === 'done' && result && (
          <div className="space-y-3 animate-fade-up">
            {!result.is_cry ? (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-xl shrink-0">🔇</span>
                <div>
                  <p className="text-xs font-bold text-amber-700">No cry detected</p>
                  <p className="text-[11px] text-amber-600 mt-0.5 leading-snug">
                    AI didn&apos;t detect a baby cry (score: {toPercent(result.gate_score).toFixed(0)}%). Try a clearer, closer recording.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Main result */}
                <div className="rounded-xl p-3.5"
                  style={{ background: `${meta?.color ?? theme.resultAccent}12`, border: `1px solid ${meta?.color ?? theme.resultAccent}30` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl shrink-0">{meta?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800">{meta?.label}</span>
                        {badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                            style={{ background: badge.bg, color: badge.fg }}>{badge.text}</span>
                        )}
                      </div>
                      <div className="text-lg font-extrabold mt-0.5" style={{ color: meta?.color ?? theme.resultAccent }}>
                        {toPercent(result.confidence).toFixed(1)}% confidence
                      </div>
                    </div>
                  </div>
                  {/* Advice */}
                  <div className="flex items-start gap-2 mt-2 pt-2 border-t border-dashed"
                    style={{ borderColor: `${meta?.color ?? theme.resultAccent}30` }}>
                    <span className="text-sm shrink-0">💡</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{meta?.advice}</p>
                  </div>
                </div>

                {/* All probabilities */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">All classes</p>
                  <div className="space-y-1.5">
                    {sortedProbs.map(([cls, prob], i) => (
                      <ProbBar key={cls} label={cls} prob={prob} rank={i} accentColor={theme.resultAccent} />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                ⚠️ <strong>Demo only.</strong> Not a medical device. For any health concern, please consult a qualified paediatrician immediately.
              </p>
            </div>

            {/* Reset */}
            <button onClick={reset}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-colors"
              style={{ borderColor: theme.borderColor, color: theme.footerText, background: theme.footerBg }}>
              <RotateCcw className="w-3 h-3" /> Analyze another recording
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 pt-1 bg-white border-t border-slate-100">
        <Link href="/cry-analyzer"
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-[11px] font-semibold transition-colors"
          style={{ background: theme.footerBg, color: theme.footerText }}>
          Open full-screen analyzer <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
