import { NextRequest, NextResponse } from 'next/server';

const CRY_API_URL = process.env.CRY_API_URL || 'http://localhost:8000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body.prediction_id !== 'string' || typeof body.is_correct !== 'boolean') {
      return NextResponse.json({ error: 'prediction_id and is_correct are required' }, { status: 400 });
    }

    const response = await fetch(`${CRY_API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prediction_id: body.prediction_id,
        is_correct: body.is_correct,
        corrected_label: body.corrected_label ?? null,
        comment: body.comment ?? null,
      }),
    });

    // Best-effort by design (matches the backend's own contract) — always
    // resolve to a 200 with { recorded } so the UI can show a simple thank-you
    // without special-case error handling.
    if (!response.ok) {
      return NextResponse.json({ recorded: false });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ recorded: false });
  }
}
