import { NextRequest, NextResponse } from 'next/server';

const CRY_API_URL = process.env.CRY_API_URL;
if (!CRY_API_URL && process.env.NODE_ENV === 'production') {
  throw new Error('CRY_API_URL environment variable is not set');
}

// 55-second timeout — generous for cold-start Cloud Run, stays within Next.js 60s limit
const UPSTREAM_TIMEOUT_MS = 55_000;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Forward to Cloud Run
    const upstream = new FormData();
    upstream.append('file', file, (file as File).name ?? 'audio.wav');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(`${CRY_API_URL ?? 'http://localhost:8000'}/predict`, {
        method: 'POST',
        body: upstream,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `Model API error: ${response.status}`, detail: text },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    const message = err instanceof Error ? err.message : 'Unknown error';
    const isNetworkError = !isTimeout && /ECONNREFUSED|ENOTFOUND|fetch failed|network/i.test(message);
    const errorMsg = isTimeout
      ? 'Cry analysis service timed out. Please try again.'
      : isNetworkError
      ? 'Cry analysis service is temporarily offline. Please try again in a few seconds.'
      : 'Failed to reach cry analysis service';
    return NextResponse.json(
      { error: errorMsg, detail: message },
      { status: 503 }
    );
  }
}
