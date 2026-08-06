'use client';

import { useState, useCallback } from 'react';

/**
 * Single shared feedback widget used by both cry-analyzer surfaces
 * (the homepage CryAnalyzerWidget and the full-page _client) — one
 * implementation, themed via the `variant` prop to match each surface's
 * existing palette, so the submission logic only exists in one place.
 *
 * Deliberately lightweight: two taps max, no form, no forced re-recording.
 * A 👎 tap submits immediately (that signal alone is valuable); the optional
 * "what was it actually" chips are a bonus the user can ignore entirely.
 */

const CLASS_LABELS: Record<string, string> = {
  hungry: 'Hungry',
  tired: 'Tired',
  discomfort: 'Discomfort',
  belly_pain: 'Belly pain',
  burping: 'Needs burping',
};

type Variant = 'widget' | 'client';

interface CryFeedbackProps {
  predictionId: string;
  /** true when the result being rated was "no cry detected" rather than a classification */
  wasBlocked?: boolean;
  variant?: Variant;
}

const THEME: Record<Variant, { text: string; muted: string; border: string; hoverBg: string }> = {
  // Matches CryAnalyzerWidget.tsx's slate palette
  widget: { text: '#1e293b', muted: '#94a3b8', border: 'rgba(74,124,111,0.3)', hoverBg: 'rgba(74,124,111,0.08)' },
  // Matches _client.tsx's warm-cream palette
  client: { text: '#1a2e28', muted: '#6b7c74', border: 'rgba(74,124,111,0.25)', hoverBg: 'rgba(74,124,111,0.06)' },
};

async function postFeedback(body: {
  prediction_id: string;
  is_correct: boolean;
  corrected_label?: string | null;
}) {
  try {
    await fetch('/api/cry-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    // Best-effort — feedback is never allowed to surface an error to the user.
  }
}

export default function CryFeedback({ predictionId, wasBlocked = false, variant = 'widget' }: CryFeedbackProps) {
  const [phase, setPhase] = useState<'ask' | 'correct' | 'done'>('ask');
  const t = THEME[variant];

  const submitPositive = useCallback(() => {
    setPhase('done');
    void postFeedback({ prediction_id: predictionId, is_correct: true });
  }, [predictionId]);

  const submitNegative = useCallback(() => {
    // Capture the "wrong" signal immediately — the correction chips below are
    // a bonus, not a requirement to register the feedback at all.
    void postFeedback({ prediction_id: predictionId, is_correct: false });
    setPhase('correct');
  }, [predictionId]);

  const submitCorrection = useCallback((label: string | null) => {
    setPhase('done');
    void postFeedback({ prediction_id: predictionId, is_correct: false, corrected_label: label });
  }, [predictionId]);

  // Skip does NOT re-post — the initial 👎 already recorded is_correct:false.
  // Posting corrected_label:null here would be indistinguishable from "it was
  // a cry, unsure of type" (a real signal, only shown when wasBlocked), which
  // would corrupt that bucket with skips that carry no information.
  const skip = useCallback(() => setPhase('done'), []);

  if (phase === 'done') {
    return (
      <p className="text-xs text-center" style={{ color: t.muted }}>
        Thanks for the feedback — it helps us improve.
      </p>
    );
  }

  if (phase === 'correct') {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs" style={{ color: t.text }}>No worries — what was it actually? (optional)</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {Object.entries(CLASS_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => submitCorrection(key)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors"
              style={{ borderColor: t.border, color: t.text }}
              onMouseEnter={e => (e.currentTarget.style.background = t.hoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
            </button>
          ))}
          {wasBlocked && (
            <button
              onClick={() => submitCorrection('unsure')}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors"
              style={{ borderColor: t.border, color: t.text }}
              onMouseEnter={e => (e.currentTarget.style.background = t.hoverBg)}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              It was a cry, not sure which type
            </button>
          )}
          <button
            onClick={skip}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors"
            style={{ borderColor: t.border, color: t.muted }}
            onMouseEnter={e => (e.currentTarget.style.background = t.hoverBg)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            Skip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-xs" style={{ color: t.muted }}>
        Was this right?
      </span>
      <div className="flex gap-2">
        <button
          onClick={submitPositive}
          aria-label="Correct"
          className="text-base leading-none px-2 py-1 rounded-lg border transition-colors"
          style={{ borderColor: t.border }}
          onMouseEnter={e => (e.currentTarget.style.background = t.hoverBg)}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          👍
        </button>
        <button
          onClick={submitNegative}
          aria-label="Incorrect"
          className="text-base leading-none px-2 py-1 rounded-lg border transition-colors"
          style={{ borderColor: t.border }}
          onMouseEnter={e => (e.currentTarget.style.background = t.hoverBg)}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          👎
        </button>
      </div>
    </div>
  );
}
