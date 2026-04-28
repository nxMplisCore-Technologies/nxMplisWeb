import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Anvaya Smart — India\'s Best AI Baby Monitor';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f5ede0 0%, #faf8f5 50%, #e8f2ee 100%)',
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: '#e8957a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          ANVAYA SMART
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, color: '#172720', lineHeight: 1.1, marginBottom: 24, maxWidth: 700 }}>
          Because every breath matters.
        </div>
        <div style={{ fontSize: 28, color: '#4a7c6f', fontWeight: 600, marginBottom: 40 }}>
          Smart Care. Gentle Beginnings.
        </div>
        <div style={{ fontSize: 22, color: '#6b7b77', maxWidth: 650, lineHeight: 1.5 }}>
          India's most advanced contactless AI baby monitor. Breathing · SpO2 · Cry Analysis · Sleep Tracking. No wearables.
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 24 }}>
          {['CORE ₹8,999', 'SENSE ₹12,999', 'PULSE ₹15,999', 'OMNI ₹19,999'].map(p => (
            <div key={p} style={{ background: 'rgba(74,124,111,0.1)', border: '1px solid rgba(74,124,111,0.2)', borderRadius: 12, padding: '10px 20px', fontSize: 18, color: '#4a7c6f', fontWeight: 600 }}>
              {p}
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)', width: 320, height: 320, borderRadius: 32, background: 'rgba(74,124,111,0.08)', border: '2px solid rgba(74,124,111,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 120 }}>🍼</div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 80, fontSize: 18, color: '#9aaba7' }}>
          nxmplis.com · Made in India 🇮🇳
        </div>
      </div>
    ),
    { ...size }
  );
}
