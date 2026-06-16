import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const MAKE_WEBHOOK = 'https://hook.eu1.make.com/uvjkc324zlvtm3ivlwpyaj0xm8wcg51b';
const GOOGLE_SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyeInQLe7Zd4evZvd3Uci5YYeWCNSLjZSRnis_78VoLrvxLuEAgbmv6_bssw7ngD5nG_Q/exec';

export async function POST(req: NextRequest) {
  let body: {
    name?: string;
    whatsapp?: string;
    city?: string;
    product?: string;
    source?: string;
    babyAge?: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { name = '', whatsapp = '', city = '', product = '', source = '', babyAge = '', message = '' } = body;

  // ── Log everything so it appears in Vercel logs ────────────────────────────
  console.log('=== NEW LEAD SUBMISSION ===');
  console.log({ name, whatsapp, city, product, source, babyAge, message });

  // ── Fire-and-forget: Make.com webhook ─────────────────────────────────────
  fetch(MAKE_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, whatsapp, city, product, source, babyAge, message }),
  }).catch((err) => console.error('[lead] Make.com webhook error:', err));

  // ── Fire-and-forget: Google Sheets via Apps Script ─────────────────────────
  fetch(GOOGLE_SHEET_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, whatsapp, city, product, source, babyAge, message, timestamp: new Date().toISOString() }),
  }).catch((err) => console.error('[lead] Google Sheets webhook error:', err));

  // ── Send email via Resend ──────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.warn('[lead] RESEND_API_KEY not set — email not sent. Submission logged above.');
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const subject = `New Lead: ${name || '(no name)'} — ${product || 'Unknown product'} via ${source || 'unknown source'}`;

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2dbd4;border-radius:12px;overflow:hidden">
        <div style="background:#4a7c6f;padding:24px 32px">
          <h2 style="color:#fff;margin:0;font-size:20px">New Lead — Anvaya Smart</h2>
          <p style="color:#c8ede7;margin:4px 0 0;font-size:14px">nxmplis.com · ${source || 'unknown source'}</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:13px">WhatsApp</td><td style="padding:8px 0"><a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="color:#4a7c6f;font-weight:600">${whatsapp || '—'}</a></td></tr>
            ${city ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">City</td><td style="padding:8px 0">${city}</td></tr>` : ''}
            ${product ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Product</td><td style="padding:8px 0;font-weight:600;color:#4a7c6f">${product}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#888;font-size:13px">Source</td><td style="padding:8px 0">${source || '—'}</td></tr>
            ${babyAge ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Baby Age</td><td style="padding:8px 0">${babyAge}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;vertical-align:top">Message</td><td style="padding:8px 0">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
          </table>
        </div>
        <div style="padding:16px 32px;background:#faf8f5;font-size:12px;color:#aaa;text-align:center">
          Lead captured via nxmplis.com · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Anvaya Smart <onboarding@resend.dev>',
      to: ['nxmpliscore@gmail.com'],
      subject,
      html,
    });

    console.log('[lead] Email sent successfully to nxmpliscore@gmail.com');
  } catch (err) {
    console.error('[lead] Resend error:', err);
    // Do NOT return an error to the user — the submission is already logged and forwarded
  }

  return NextResponse.json({ success: true });
}
