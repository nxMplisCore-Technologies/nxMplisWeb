# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Cry Analyzer

Two surfaces share one implementation pattern: the full page (`src/app/cry-analyzer/_client.tsx`) and the homepage widget (`src/components/cry-analyzer/CryAnalyzerWidget.tsx`). Both support uploading a file and live mic recording, and both proxy to the ML backend (see `nxm-cry-classifier` repo) via `src/app/api/cry-analyze/route.ts`.

**Live recording**: captures 20 seconds (`REC_SECONDS` in each component) rather than a strict 10s — the backend's sliding-window gate scan needs more than one window's worth of audio to actually help, so this only pays off if there's material to scan. `audioBitsPerSecond: 256000` is set explicitly on `MediaRecorder` — its default bitrate for a mono mic stream is low enough to measurably degrade a cry's harmonic detail before it's even analyzed, which is why live recordings used to perform worse than uploads of the same audio. AGC/noise-suppression/echo-cancellation are explicitly disabled on `getUserMedia` for the same reason — they're voice-call DSP tuned to suppress "non-speech" transients, and a cry is a plausible target for exactly that suppression.

**Feedback**: `CryFeedback.tsx` posts to `/api/cry-feedback` → backend `/feedback`. Two taps max (👍/👎), with optional correction chips shown only after 👎. The "Was this right?" question and its answer must stay symmetric with the backend's `is_correct` field regardless of whether the prediction was a classification or a "no cry detected" block — flipping that mapping earlier silently mislabeled feedback data, so don't reintroduce block-specific question phrasing without checking the button semantics still match.

**Deployment**: Firebase App Hosting, NOT auto-deploy on push — trigger manually:
```bash
firebase apphosting:rollouts:create nxmplis --project nxmpliscore-digital-showcase --git-branch master
```
