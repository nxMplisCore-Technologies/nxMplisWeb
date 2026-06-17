'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Upload, Square, Loader2, AlertCircle, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { processRecordedAudio } from '@/lib/audioProcessor';

/* ─── API response shape ────────────────────────────────────────── */
interface PredictResult {
  is_cry: boolean;
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
  reliability: string;
  reason: string;
  gate_score: number;
}

type WidgetVariant = 'green' | 'purple';

interface ThemeConfig {
  headerBg: string;
  dotColor: string;
  btnGradient: string;
  btnShadow: string;
  btnHoverGradient: string;
  waveColor: string;
  waveRecordColor: string;
  resultAccent: string;
  footerBg: string;
  footerText: string;
  glowColor: string;
  borderColor: string;
  tabBg: string;
}

const THEMES: Record<WidgetVariant, ThemeConfig> = {
  green: {
    headerBg: 'linear-gradient(135deg, #1a3d35 0%, #2d6b5e 60%, #4a7c6f 100%)',
    dotColor: '#4ade80',
    btnGradient: 'linear-gradient(135deg, #2d6b5e 0%, #4a7c6f 100%)',
    btnHoverGradient: 'linear-gradient(135deg, #235248 0%, #3d6b5f 100%)',
    btnShadow: '0 6px 24px rgba(74,124,111,0.45)',
    waveColor: '#4a7c6f',
    waveRecordColor: '#e8957a',
    resultAccent: '#4a7c6f',
    footerBg: '#f0f7f5',
    footerText: '#4a7c6f',
    glowColor: 'rgba(74,124,111,0.3)',
    borderColor: 'rgba(74,124,111,0.2)',
    tabBg: 'rgba(74,124,111,0.15)',
  },
  purple: {
    headerBg: 'linear-gradient(135deg, #2e1065 0%, #5b21b6 55%, #7c3aed 100%)',
    dotColor: '#c084fc',
    btnGradient: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
    btnHoverGradient: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
    btnShadow: '0 6px 24px rgba(124,58,237,0.45)',
    waveColor: '#a855f7',
    waveRecordColor: '#c084fc',
    resultAccent: '#7c3aed',
    footerBg: '#f5f3ff',
    footerText: '#7c3aed',
    glowColor: 'rgba(124,58,237,0.3)',
    borderColor: 'rgba(124,58,237,0.25)',
    tabBg: 'rgba(124,58,237,0.15)',
  },
};

const CLASS_META: Record<string, { emoji: string; label: string; advice: string; color: string }> = {
  hungry:     { emoji: '🍼', label: 'Hungry',        color: '#f59e0b', advice: "Your baby is likely hungry. Try feeding now — even if it hasn't been long. Babies often cluster-feed during growth spurts." },
  tired:      { emoji: '😴', label: 'Tired',          color: '#8b5cf6', advice: "Baby is tired and ready for sleep. Dim the lights, reduce noise, and try gentle rocking or a lullaby." },
  discomfort: { emoji: '😣', label: 'Discomfort',     color: '#ef4444', advice: "Baby feels uncomfortable. Check their diaper, clothing tags, room temperature, or signs of gas and bloating." },
  belly_pain: { emoji: '🤢', label: 'Belly Pain',     color: '#dc2626', advice: "Possible belly pain or colic. Try a gentle circular tummy massage, bicycle leg movements, or hold upright to release gas." },
  burping:    { emoji: '😮‍💨', label: 'Needs Burping', color: '#10b981', advice: "Baby needs to burp. Hold upright on your shoulder and gently pat the back. Try different positions — over-the-knee works well." },
};

const RELIABILITY_BADGE: Record<string, { text: string; bg: string; fg: string }> = {
  HIGH:   { text: 'HIGH confidence',   bg: 'rgba(16,185,129,0.12)', fg: '#065f46' },
  MEDIUM: { text: 'MED confidence',    bg: 'rgba(245,158,11,0.12)',  fg: '#92400e' },
  LOW:    { text: 'LOW confidence',    bg: 'rgba(239,68,68,0.12)',   fg: '#991b1b' },
};

const toPercent = (v: number) => (isFinite(v) ? v * 100 : 0);

function normToHundred(probs: Record<string, number>): Array<[string, number]> {
  const entries = Object.entries(probs).map(([k, v]) => [k, Number(v) || 0] as [string, number]);
  const sum = entries.reduce((a, [, v]) => a + v, 0);
  const scale = sum > 0 ? 100 / sum : 1;
  return entries.map(([k, v]) => [k, v * scale] as [string, number]).sort((a, b) => b[1] - a[1]);
}

/* ─── Waveform ──────────────────────────────────────────────────── */
function Waveform({ active, color = '#4a7c6f' }: { active: boolean; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 99, background: color,
          opacity: active ? 0.85 : 0.25,
          height: active ? undefined : 4,
          animation: active ? `wave-bar ${0.5 + (i % 5) * 0.1}s ease-in-out ${(i * 0.04) % 0.44}s infinite alternate` : undefined,
          minHeight: 3, maxHeight: 28,
        }} />
      ))}
      <style>{`@keyframes wave-bar { from { height: 3px; } to { height: 26px; } }`}</style>
    </div>
  );
}

/* ─── Prob bar ──────────────────────────────────────────────────── */
function ProbBar({ label, prob, rank, accentColor }: { label: string; prob: number; rank: number; accentColor: string }) {
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
      <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ background: `${accentColor}14` }}>
        <div className="h-2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: `linear-gradient(90deg, ${meta?.color ?? accentColor}cc, ${meta?.color ?? accentColor})` }} />
      </div>
      <span className="w-10 text-right text-slate-400 font-mono text-[10px]">{pct.toFixed(1)}%</span>
    </div>
  );
}

/* ─── Premium button ────────────────────────────────────────────── */
function PremiumBtn({
  onClick, disabled, children, gradient, hoverGradient, shadow,
  className = '', fullWidth = true, size = 'md',
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  gradient: string;
  hoverGradient: string;
  shadow: string;
  className?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pad = size === 'lg' ? 'py-3.5 px-7 text-base' : size === 'sm' ? 'py-2 px-4 text-xs' : 'py-3 px-5 text-sm';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden font-bold text-white rounded-xl flex items-center justify-center gap-2 select-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed ${pad} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        background: hovered ? hoverGradient : gradient,
        boxShadow: pressed ? 'none' : shadow,
        transform: pressed ? 'scale(0.97) translateY(1px)' : hovered ? 'scale(1.02) translateY(-1px)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      {/* Shimmer sweep on hover */}
      {hovered && !disabled && (
        <span className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)', animation: 'btn-shimmer 0.6s ease-out forwards' }} />
      )}
      {children}
      <style>{`@keyframes btn-shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }`}</style>
    </button>
  );
}

/* ─── Mic record button ─────────────────────────────────────────── */
function MicButton({ onClick, glowColor, gradient, shadow }: { onClick: () => void; glowColor: string; gradient: string; shadow: string }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring */}
      <div className="absolute w-24 h-24 rounded-full opacity-20 animate-ping" style={{ background: glowColor }} />
      <div className="absolute w-20 h-20 rounded-full opacity-30" style={{ background: glowColor, animation: 'mic-ring 2s ease-in-out infinite' }} />
      <button
        onClick={onClick}
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-150 select-none"
        style={{
          background: hovered ? 'linear-gradient(135deg, #235248, #3d6b5f)' : gradient,
          boxShadow: pressed ? 'none' : shadow,
          transform: pressed ? 'scale(0.93)' : hovered ? 'scale(1.07)' : 'scale(1)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
      >
        <Mic className="w-7 h-7" />
      </button>
      <style>{`@keyframes mic-ring { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.15);opacity:.15} }`}</style>
    </div>
  );
}

/* ─── Stop button ───────────────────────────────────────────────── */
function StopButton({ onClick }: { onClick: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm text-red-600 select-none transition-all duration-150"
      style={{
        background: pressed ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.1)',
        border: '1.5px solid rgba(239,68,68,0.3)',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        boxShadow: pressed ? 'none' : '0 4px 16px rgba(239,68,68,0.2)',
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      <div className="w-5 h-5 rounded-md bg-red-500 flex items-center justify-center shrink-0">
        <Square className="w-2.5 h-2.5 fill-white text-white" />
      </div>
      Stop &amp; analyze
    </button>
  );
}

/* ─── Purple glow ring ──────────────────────────────────────────── */
function PurpleGlow() {
  return (
    <>
      <div className="absolute -inset-[2px] rounded-2xl pointer-events-none z-0"
        style={{ background: 'linear-gradient(135deg, #7c3aed66, #c084fc33, #7c3aed66)', animation: 'glow-pulse 3s ease-in-out infinite' }} />
      <style>{`@keyframes glow-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }`}</style>
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
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'processing' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<PredictResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const startRec = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
      });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setStatus('processing');
        const result = await processRecordedAudio(new Blob(chunksRef.current));
        if (!result.ok) { setErrorMsg(result.error.message); setStatus('error'); return; }
        setFile(result.file);
        analyze(result.file);
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
      setRecSeconds(0);
      let s = 0;
      timerRef.current = setInterval(() => {
        s += 1;
        setRecSeconds(s);
        if (s >= 10) { mr.stop(); clearInterval(timerRef.current!); setRecording(false); }
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

  const meta = result?.prediction ? (CLASS_META[result.prediction] ?? {
    emoji: '❓', label: result.prediction, advice: result.reason ?? '', color: theme.resultAccent,
  }) : null;
  const badge = result ? (RELIABILITY_BADGE[result.reliability] ?? RELIABILITY_BADGE.MEDIUM) : null;
  const normalizedProbs = result?.probabilities ? normToHundred(result.probabilities) : [];

  const isWorking = status === 'analyzing' || status === 'processing';
  const showBody = !isWorking && status !== 'done';

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ border: `1px solid ${theme.borderColor}` }}>
      {isPurple && <PurpleGlow />}

      {/* ── Header ── */}
      <div className="relative px-5 pt-4 pb-4 z-10" style={{ background: theme.headerBg }}>
        <div className="flex items-center gap-2.5 mb-2">
          <div className="relative shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: theme.dotColor, boxShadow: `0 0 10px ${theme.dotColor}` }} />
            <div className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: theme.dotColor }} />
          </div>
          <div>
            <p className="text-white font-extrabold text-base leading-tight tracking-tight">
              {isPurple ? '✨ AI Cry Analyzer' : '🎙 Live Cry Analyzer'}
            </p>
            <p className="text-white/55 text-[10px] uppercase tracking-widest font-semibold mt-0.5">
              {isPurple ? 'Powered by Anvaya AI · Free demo' : 'Try it free · No signup needed'}
            </p>
          </div>
        </div>

        <Waveform active={recording || isWorking} color={recording ? theme.waveRecordColor : `${theme.dotColor}88`} />

        {/* ── Tabs — sliding pill ── */}
        <div className="relative flex gap-1 mt-3 p-1 rounded-xl" style={{ background: 'rgba(0,0,0,0.25)' }}>
          {(['upload', 'record'] as const).map(t => (
            <button key={t}
              onClick={() => { setTab(t); reset(); }}
              className="relative flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 z-10"
              style={tab === t
                ? { background: 'rgba(255,255,255,0.2)', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }
                : { color: 'rgba(255,255,255,0.55)' }
              }
            >
              {t === 'upload' ? '📁 Upload' : '🎙 Record'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-5 py-5 bg-white relative z-10">

        {/* Upload tab */}
        {tab === 'upload' && showBody && (
          <div className="space-y-3">
            <input ref={fileInputRef} id="cry-widget-file" type="file" accept=".wav,.mp3,.ogg,.flac,.m4a,audio/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
            <label htmlFor="cry-widget-file"
              className="relative rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-2.5 py-7 px-4 text-center block overflow-hidden transition-all duration-200 group"
              style={{
                borderColor: dragOver ? theme.resultAccent : '#e2dbd4',
                background: dragOver ? theme.footerBg : '#fafaf9',
              }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            >
              {/* Animated bg glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at center, ${theme.glowColor} 0%, transparent 70%)` }} />
              <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-0.5 transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${theme.resultAccent}14` }}>
                <Upload className="w-5 h-5 transition-colors" style={{ color: theme.resultAccent }} />
              </div>
              {file ? (
                <>
                  <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} KB · tap to change</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-slate-600">Drop WAV / MP3 here</p>
                  <p className="text-[10px] text-slate-400">or tap to browse your files</p>
                </>
              )}
            </label>

            {file && (
              <PremiumBtn
                onClick={() => analyze(file)}
                gradient={theme.btnGradient}
                hoverGradient={theme.btnHoverGradient}
                shadow={theme.btnShadow}
                size="md"
              >
                <Sparkles className="w-4 h-4" />
                Analyze cry
                <ChevronRight className="w-4 h-4" />
              </PremiumBtn>
            )}
          </div>
        )}

        {/* Record tab */}
        {tab === 'record' && showBody && (
          <div className="flex flex-col items-center gap-4 py-2">
            {recording ? (
              <>
                {/* Recording indicator */}
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Recording… {recSeconds}s / 10s
                </div>
                {/* Progress arc */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#f3f4f6" strokeWidth="5" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - recSeconds / 10)}`}
                      style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                  </svg>
                  <div className="text-lg font-bold text-slate-700">{10 - recSeconds}</div>
                </div>
                <StopButton onClick={stopRec} />
              </>
            ) : (
              <>
                <p className="text-xs font-semibold text-slate-500 text-center">Tap to start a 10-second recording</p>
                <MicButton
                  onClick={startRec}
                  glowColor={theme.glowColor}
                  gradient={theme.btnGradient}
                  shadow={theme.btnShadow}
                />
                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Hold device near baby · Auto-stops at 10s
                </p>
              </>
            )}
          </div>
        )}

        {/* Analyzing / processing */}
        {isWorking && (
          <div className="flex flex-col items-center gap-4 py-4">
            {/* Spinning orb */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-spin"
                style={{ background: `conic-gradient(from 0deg, transparent 0%, ${theme.resultAccent} 30%, transparent 60%)` }} />
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: theme.resultAccent }} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">Analyzing with AI…</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Running 4-model ensemble</p>
            </div>
            <div className="w-full space-y-2">
              {['Cry gate check', '4-model ensemble', 'Calibration & scoring'].map((s, i) => (
                <div key={s} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-medium text-slate-500"
                  style={{ background: `${theme.resultAccent}08`, animationDelay: `${i * 0.3}s` }}>
                  <Loader2 className="w-3 h-3 animate-spin shrink-0" style={{ color: theme.resultAccent, animationDelay: `${i * 0.25}s` }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700">Analysis failed</p>
                <p className="text-[11px] text-red-500 mt-0.5 leading-snug">{errorMsg}</p>
              </div>
            </div>
            <PremiumBtn
              onClick={reset}
              gradient="linear-gradient(135deg,#ef4444,#dc2626)"
              hoverGradient="linear-gradient(135deg,#dc2626,#b91c1c)"
              shadow="0 4px 16px rgba(239,68,68,0.3)"
              size="sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try again
            </PremiumBtn>
          </div>
        )}

        {/* Result */}
        {status === 'done' && result && (
          <div className="space-y-3 animate-fade-up">
            {!result.is_cry ? (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-xl shrink-0">🔇</span>
                <div>
                  <p className="text-xs font-bold text-amber-700">No cry detected</p>
                  <p className="text-[11px] text-amber-600 mt-0.5 leading-snug">
                    AI didn&apos;t detect a baby cry ({toPercent(result.gate_score).toFixed(0)}% score). Try a clearer, closer recording.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Main result card */}
                <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${meta?.color ?? theme.resultAccent}28` }}>
                  {/* Color top band */}
                  <div className="px-4 pt-4 pb-3 flex items-center gap-3"
                    style={{ background: `linear-gradient(135deg, ${meta?.color ?? theme.resultAccent}18, ${meta?.color ?? theme.resultAccent}08)` }}>
                    <span className="text-4xl shrink-0 leading-none">{meta?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="font-extrabold text-slate-800 text-base">{meta?.label}</span>
                        {badge && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                            style={{ background: badge.bg, color: badge.fg }}>{badge.text}</span>
                        )}
                      </div>
                      <div className="text-2xl font-black" style={{ color: meta?.color ?? theme.resultAccent }}>
                        {toPercent(result.confidence).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  {/* Advice */}
                  <div className="px-4 py-3 bg-white border-t" style={{ borderColor: `${meta?.color ?? theme.resultAccent}18` }}>
                    <div className="flex items-start gap-2">
                      <span className="text-sm shrink-0 mt-0.5">💡</span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{meta?.advice}</p>
                    </div>
                  </div>
                </div>

                {/* All classes */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Breakdown</p>
                  <div className="space-y-2">
                    {normalizedProbs.map(([cls, prob], i) => (
                      <ProbBar key={cls} label={cls} prob={prob} rank={i} accentColor={theme.resultAccent} />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                ⚠️ <strong>Demo only.</strong> Not a medical device. Consult a paediatrician for any health concern.
              </p>
            </div>

            <PremiumBtn
              onClick={reset}
              gradient={theme.btnGradient}
              hoverGradient={theme.btnHoverGradient}
              shadow={theme.btnShadow}
              size="sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Analyze another recording
            </PremiumBtn>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-5 pb-4 pt-0 bg-white border-t border-slate-100 relative z-10">
        <Link href="/cry-analyzer"
          className="group flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[11px] font-bold transition-all duration-200 hover:shadow-sm"
          style={{ background: theme.footerBg, color: theme.footerText }}>
          Open full analyzer
          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
