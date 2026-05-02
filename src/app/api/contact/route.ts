import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const inquiryLabels: Record<string, string> = {
  'early-access': 'Early Access / Product',
  'investor': 'Investor Relations',
  'partner': 'Partnership',
  'careers': 'Careers',
  'general': 'General Question',
};

export async function POST(req: NextRequest) {
  const { fullName, email, inquiryType, message, phone } = await req.json();

  if (!fullName || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Log every submission so it's always visible in Vercel logs
  console.log('=== CONTACT FORM SUBMISSION ===');
  console.log({ fullName, email, phone, inquiryType, message });

  if (!process.env.RESEND_API_KEY) {
    // No API key set yet — still return success so users aren't blocked
    console.warn('RESEND_API_KEY not set — email not sent. Add it in Vercel env vars.');
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2dbd4;border-radius:12px;overflow:hidden">
        <div style="background:#4a7c6f;padding:24px 32px">
          <h2 style="color:#fff;margin:0;font-size:20px">New Contact Form Submission</h2>
          <p style="color:#c8ede7;margin:4px 0 0;font-size:14px">Anvaya Smart — nxmplis.com</p>
        </div>
        <div style="padding:32px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;font-size:13px;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#888;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#4a7c6f">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#888;font-size:13px">Inquiry Type</td><td style="padding:8px 0">${inquiryLabels[inquiryType] || inquiryType}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e2dbd4;margin:20px 0" />
          <p style="color:#888;font-size:13px;margin:0 0 8px">Message</p>
          <p style="background:#faf8f5;padding:16px;border-radius:8px;line-height:1.6;margin:0">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        <div style="padding:16px 32px;background:#faf8f5;font-size:12px;color:#aaa;text-align:center">
          Sent via nxmplis.com contact form
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Anvaya Smart <onboarding@resend.dev>',
      to: ['nxmpliscore@gmail.com', 'admin@nxmplis.com'],
      replyTo: email,
      subject: `[${inquiryLabels[inquiryType] || 'Contact'}] from ${fullName}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    // Still return success — submission is logged above
    return NextResponse.json({ success: true });
  }
}
