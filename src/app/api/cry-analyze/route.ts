import { NextRequest, NextResponse } from 'next/server';

const CRY_API_URL = process.env.CRY_API_URL || 'http://localhost:8000';

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

    const response = await fetch(`${CRY_API_URL}/predict`, {
      method: 'POST',
      body: upstream,
    });

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
    const message = err instanceof Error ? err.message : 'Unknown error';
    const isNetworkError = /ECONNREFUSED|ENOTFOUND|fetch failed|network/i.test(message);
    return NextResponse.json(
      {
        error: isNetworkError
          ? 'Cry analysis service is temporarily offline. Please try again in a few seconds.'
          : 'Failed to reach cry analysis service',
        detail: message,
      },
      { status: 503 },
    );
  }
}
