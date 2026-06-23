'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Upload, Square, Loader2, AlertCircle, ChevronRight, RotateCcw, Brain } from 'lucide-react';
import Link from 'next/link';
import { processRecordedAudio } from '@/lib/audioProcessor';

interface PredictResult {
  is_cry: boolean;
  prediction: string;
  confidence: number;
  probabilities: Record<string, number>;
  reliability: string;
  reason: string;
  gate_score: number;
}

const CLASS_META: Record<string, { emoji: string; label: string; advice: string; color: string }> = {
  hungry:     { emoji: '🍼', label: 'Hungry',        color: '#f59e0b', advice: "Likely hungry — try feeding now, even if it hasn't been long. Babies often cluster-feed during growth spurts." },
  tired:      { emoji: '😴', label: 'Tired',          color: '#8b5cf6', advice: "Baby is tired. Dim lights, reduce noise, try gentle rocking or a lullaby." },
  discomfort: { emoji: '😣', label: 'Discomfort',     color: '#ef4444', advice: "Check diaper, clothing tags, room temperature, or signs of gas and bloating." },
  belly_pain: { emoji: '🤢', label: 'Belly Pain',     color: '#dc2626', advice: "Possible colic. Try circular tummy massage, bicycle legs, or hold upright to release gas." },
  burping:    { emoji: '😮‍💨', label: 'Needs Burping', color: '#10b981', advice: "Hold upright on shoulder and gently pat the back. Over-the-knee works well too." },
};

const RELIABILITY_BADGE: Record<string, { text: string; bg: string; fg: string }> = {
  HIGH:   { text: 'High confidence',   bg: '#dcfce7', fg: '#166534' },
  MEDIUM: { text: 'Medium confidence', bg: '#fef9c3', fg: '#854d0e' },
  LOW:    { text: 'Low confidence',    bg: '#fee2e2', fg: '#991b1b' },
};

const toPercent = (v: number) => (isFinite(v) ? v * 100 : 0);

function normToHundred(probs: Record<string, number>): Array<[string, number]> {
  const entries = Object.entries(probs).map(([k, v]) => [k, Number(v) || 0] as [string, number]);
  const sum = entries.reduce((a, [, v]) => a + v, 0);
  const scale = sum > 0 ? 100 / sum : 1;
  return entries.map(([k, v]) => [k, v * scale] as [string, number]).sort((a, b) => b[1] - a[1]);
}

/* ─── Waveform ── */
function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-end justify-center gap-[3px] h-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 99,
          background: active ? '#4a7c6f' : '#d1e8e2',
          height: active ? undefined : 5,
          animation: active ? `wave-bar ${0.5 + (i % 5) * 0.1}s ease-in-out ${(i * 0.04) % 0.44}s infinite alternate` : undefined,
          minHeight: 3, maxHeight: 22,
        }} />
      ))}
      <style>{`@keyframes wave-bar { from { height: 3px; } to { height: 22px; } }`}</style>
    </div>
  );
}

/* ─── Prob bar ── */
function ProbBar({ label, prob, rank }: { label: string; prob: number; rank: number }) {
  const pct = Math.min(100, Math.max(0, prob));
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), rank * 80 + 100);
    return () => clearTimeout(t);
  }, [pct, rank]);
  const meta = CLASS_META[label];
  return (
    <div className="flex items-center gap-2">
      <span className="w-4 text-center shrink-0 text-sm">{meta?.emoji ?? '❓'}</span>
      <span className="w-16 text-[11px] text-slate-500 font-medium truncate capitalize">{meta?.label ?? label}</span>
      <div className="flex-1 rounded-full h-1.5 overflow-hidden bg-slate-100">
        <div className="h-1.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, background: meta?.color ?? '#4a7c6f' }} />
      </div>
      <span className="w-9 text-right text-slate-400 font-mono text-[10px]">{pct.toFixed(0)}%</span>
    </div>
  );
}

/* ─── Press button ── */
function PressBtn({
  onClick, disabled, children, variant = 'primary', fullWidth = true, size = 'md', className = '',
}: {
  onClick?: () => void; disabled?: boolean; children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost'; fullWidth?: boolean; size?: 'sm' | 'md'; className?: string;
}) {
  const [pressed, setPressed] = useState(false);
  const pad = size === 'sm' ? 'py-2 px-4 text-xs' : 'py-2.5 px-5 text-sm';
  const base = `relative overflow-hidden font-semibold rounded-xl flex items-center justify-center gap-2 select-none transition-all duration-150 disabled:opacity-50 ${pad} ${fullWidth ? 'w-full' : ''}`;
  const styles: React.CSSProperties = variant === 'primary'
    ? { background: pressed ? '#3d6b5f' : 'linear-gradient(135deg,#4a7c6f,#2d6b5e)', color: '#fff', boxShadow: pressed ? 'none' : '0 4px 14px rgba(74,124,111,0.4)', transform: pressed ? 'scale(0.97) translateY(1px)' : 'scale(1)' }
    : variant === 'outline'
    ? { background: pressed ? 'rgba(74,124,111,0.08)' : 'transparent', color: '#4a7c6f', border: '1.5px solid rgba(74,124,111,0.35)', transform: pressed ? 'scale(0.97)' : 'scale(1)' }
    : { background: pressed ? 'rgba(74,124,111,0.06)' : 'transparent', color: '#4a7c6f', transform: pressed ? 'scale(0.97)' : 'scale(1)' };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${className}`} style={styles}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)} onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}>
      {children}
    </button>
  );
}

/* ─── Mic button ── */
function MicBtn({ onClick, glowColor, btnColor }: { onClick: () => void; glowColor: string; btnColor: string }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full animate-ping opacity-10" style={{ background: glowColor }} />
      <div className="absolute w-16 h-16 rounded-full opacity-20" style={{ background: glowColor, animation: 'mring 2s ease-in-out infinite' }} />
      <button onClick={onClick}
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-150"
        style={{ background: btnColor, boxShadow: pressed ? 'none' : `0 6px 20px ${glowColor}`, transform: pressed ? 'scale(0.91)' : 'scale(1)' }}
        onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)} onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}>
        <Mic className="w-6 h-6" />
      </button>
      <style>{`@keyframes mring{0%,100%{transform:scale(1);opacity:.2}50%{transform:scale(1.18);opacity:.1}}`}</style>
    </div>
  );
}

export default function CryAnalyzerWidget({ variant = 'green' }: { variant?: 'green' | 'purple' }) {
  // Both variants now use the clean brand-teal theme — purple was too heavy
  const accent = '#4a7c6f';
  const accentLight = '#f1f5f9';
  const glowColor = 'rgba(74,124,111,0.35)';

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
    setStatus('analyzing'); setResult(null);
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

  const handleFile = useCallback((f: File) => { setFile(f); setStatus('idle'); setResult(null); }, []);

  const reset = useCallback(() => {
    setFile(null); setStatus('idle'); setResult(null); setErrorMsg('');
    setRecording(false); setRecSeconds(0);
  }, []);

  const startRec = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
      chunksRef.current = [];
      const mimeType = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ].find(t => MediaRecorder.isTypeSupported(t)) ?? '';
      const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setStatus('processing');
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || mimeType || 'audio/webm' });
        const r = await processRecordedAudio(blob);
        if (!r.ok) { setErrorMsg(r.error.message); setStatus('error'); return; }
        setFile(r.file); analyze(r.file);
      };
      mr.start(100); mediaRef.current = mr; setRecording(true); setRecSeconds(0);
      let s = 0;
      timerRef.current = setInterval(() => {
        s += 1; setRecSeconds(s);
        if (s >= 10) { mr.stop(); clearInterval(timerRef.current!); setRecording(false); }
      }, 1000);
    } catch { setErrorMsg('Microphone access denied.'); setStatus('error'); }
  }, [analyze]);

  const stopRec = useCallback(() => { mediaRef.current?.stop(); clearInterval(timerRef.current!); setRecording(false); }, []);

  const meta = result?.prediction ? (CLASS_META[result.prediction] ?? { emoji: '❓', label: result.prediction, advice: result.reason ?? '', color: accent }) : null;
  const badge = result ? (RELIABILITY_BADGE[result.reliability] ?? RELIABILITY_BADGE.MEDIUM) : null;
  const isWorking = status === 'analyzing' || status === 'processing';
  const showIdle = !isWorking && status !== 'done' && status !== 'error';

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accentLight }}>
            <Brain className="w-4 h-4" style={{ color: accent }} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-none">AI Cry Analyzer</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Free · No signup needed</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-green-600">Live AI</span>
        </div>
      </div>

      {/* ── Waveform strip ── */}
      <div className="px-4 py-2 border-b border-slate-50" style={{ background: accentLight }}>
        <Waveform active={recording || isWorking} />
      </div>

      {/* ── Tabs ── */}
      {showIdle && (
        <div className="flex border-b border-slate-100">
          {(['upload', 'record'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); reset(); }}
              className="flex-1 py-2.5 text-xs font-semibold transition-all duration-200"
              style={tab === t
                ? { color: accent, borderBottom: `2px solid ${accent}`, marginBottom: -1, background: accentLight }
                : { color: '#94a3b8', borderBottom: '2px solid transparent', marginBottom: -1 }
              }>
              {t === 'upload' ? '📁 Upload File' : '🎙 Record Live'}
            </button>
          ))}
        </div>
      )}

      {/* ── Body ── */}
      <div className="p-4">

        {/* Upload */}
        {tab === 'upload' && showIdle && (
          <div className="space-y-3">
            <input ref={fileInputRef} id="cry-widget-file" type="file" accept=".wav,.mp3,.ogg,.flac,.m4a,audio/*"
              className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
            <label htmlFor="cry-widget-file"
              className="flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200"
              style={{ borderColor: dragOver ? accent : '#e2e8f0', background: dragOver ? accentLight : '#f8fafc' }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}14` }}>
                <Upload className="w-5 h-5" style={{ color: accent }} />
              </div>
              {file ? (
                <>
                  <p className="text-sm font-semibold text-slate-700 truncate max-w-[180px]">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} KB · tap to change</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-600">Drop audio file here</p>
                  <p className="text-[10px] text-slate-400">WAV · MP3 · M4A supported</p>
                </>
              )}
            </label>
            {file && (
              <PressBtn onClick={() => analyze(file)}>
                Analyze cry <ChevronRight className="w-4 h-4" />
              </PressBtn>
            )}
          </div>
        )}

        {/* Record */}
        {tab === 'record' && showIdle && (
          <div className="flex flex-col items-center gap-3 py-2">
            {recording ? (
              <>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" width="64" height="64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#f1f5f9" strokeWidth="5" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke={accent} strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - recSeconds / 10)}`}
                      style={{ transition: 'stroke-dashoffset 1s linear' }} />
                  </svg>
                  <span className="text-lg font-black text-slate-700">{10 - recSeconds}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Recording… {recSeconds}s / 10s</p>
                <button onClick={stopRec}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-red-600 transition-all"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.25)' }}>
                  <Square className="w-3.5 h-3.5 fill-red-500 text-red-500" /> Stop &amp; analyze
                </button>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-500 text-center">Tap mic to record 10 seconds</p>
                <MicBtn onClick={startRec} glowColor={glowColor} btnColor={`linear-gradient(135deg,#4a7c6f,#2d6b5e)`} />
                <p className="text-[10px] text-slate-400 text-center">Hold near baby · Auto-stops at 10s</p>
              </>
            )}
          </div>
        )}

        {/* Analyzing */}
        {isWorking && (
          <div className="flex flex-col items-center gap-3 py-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-spin"
                style={{ background: `conic-gradient(from 0deg,transparent,${accent},transparent)` }} />
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: accent }} />
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-700">Analyzing with AI…</p>
            <div className="w-full space-y-1.5">
              {['Cry detection', '4-model ensemble', 'Scoring'].map((s, i) => (
                <div key={s} className="flex items-center gap-2 text-[11px] text-slate-500 px-2 py-1.5 rounded-lg" style={{ background: `${accent}06` }}>
                  <Loader2 className="w-3 h-3 animate-spin shrink-0" style={{ color: accent, animationDelay: `${i * 0.2}s` }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="space-y-3">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-100">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-700">Failed</p>
                <p className="text-[11px] text-red-500 mt-0.5">{errorMsg}</p>
              </div>
            </div>
            <PressBtn onClick={reset} variant="outline" size="sm">
              <RotateCcw className="w-3.5 h-3.5" /> Try again
            </PressBtn>
          </div>
        )}

        {/* Result */}
        {status === 'done' && result && (
          <div className="space-y-3 animate-fade-up">
            {!result.is_cry ? (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-center">
                <p className="text-2xl mb-1">🔇</p>
                <p className="text-xs font-bold text-amber-700">No cry detected</p>
                <p className="text-[11px] text-amber-600 mt-0.5">Try a clearer recording closer to baby.</p>
              </div>
            ) : (
              <>
                {/* Result card */}
                <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${meta?.color}25` }}>
                  <div className="flex items-center gap-3 px-3.5 py-3" style={{ background: `${meta?.color}0f` }}>
                    <span className="text-3xl shrink-0">{meta?.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm">{meta?.label}</span>
                        {badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: badge.bg, color: badge.fg }}>{badge.text}</span>
                        )}
                      </div>
                      <div className="text-xl font-black mt-0.5" style={{ color: meta?.color }}>{toPercent(result.confidence).toFixed(0)}%</div>
                    </div>
                  </div>
                  <div className="px-3.5 py-2.5 bg-white border-t" style={{ borderColor: `${meta?.color}15` }}>
                    <p className="text-[11px] text-slate-600 leading-relaxed">💡 {meta?.advice}</p>
                  </div>
                </div>
                {/* Prob bars */}
                <div className="space-y-1.5">
                  {normToHundred(result.probabilities).map(([cls, prob], i) => (
                    <ProbBar key={cls} label={cls} prob={prob} rank={i} />
                  ))}
                </div>
              </>
            )}
            <p className="text-[10px] text-slate-400 text-center leading-relaxed border-t border-slate-50 pt-2.5">
              ⚠️ Demo only · Not a medical device · Consult a paediatrician for health concerns
            </p>
            <PressBtn onClick={reset} variant="outline" size="sm">
              <RotateCcw className="w-3.5 h-3.5" /> Analyze another
            </PressBtn>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 pb-3 pt-0">
        <Link href="/cry-analyzer"
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-[11px] font-semibold transition-all hover:opacity-80"
          style={{ background: accentLight, color: accent }}>
          Open full analyzer <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
