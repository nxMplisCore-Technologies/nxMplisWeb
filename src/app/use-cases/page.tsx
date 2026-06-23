import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Heart } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Every Moment That Matters — Anvaya Smart Use Cases',
  description: 'See how Anvaya Smart helps Indian parents — at work, during alerts, decoding cries, tracking breathing, sleep, milestones and growth. One app for every parenting moment.',
};

/* ── Scenario data ── */
const SCENARIOS = [
  {
    id: 'office',
    time: '3:14 PM',
    tag: "You're at the office",
    tagColor: '#1e6fa0',
    tagBg: 'rgba(30,111,160,0.08)',
    headline: "Baby is sleeping\npeacefully while\nyou're in a meeting.",
    sub: 'One glance at Anvaya and you\'re back to work — no guilt, no anxiety.',
    accent: '#3b9fd4',
    mockupBg: 'linear-gradient(155deg,#0f1e2e 0%,#142030 100%)',
    mockup: 'office',
    cta: { label: 'See live monitoring', href: '/anvaya' },
    emoji: '👔',
  },
  {
    id: 'alert',
    time: '2:07 AM',
    tag: 'Severe alert fired',
    tagColor: '#dc2626',
    tagBg: 'rgba(220,38,38,0.08)',
    headline: 'Breathing\npattern changed.\nConsult now.',
    sub: 'Anvaya shares a timestamped health report your paediatrician can read in seconds.',
    accent: '#ef4444',
    mockupBg: 'linear-gradient(155deg,#1f0a0a 0%,#2a0e0e 100%)',
    mockup: 'alert',
    cta: { label: 'How alerts work', href: '/how-it-works' },
    emoji: '🚨',
  },
  {
    id: 'cry',
    time: '11:43 PM',
    tag: 'Baby is crying',
    tagColor: '#d97706',
    tagBg: 'rgba(217,119,6,0.08)',
    headline: 'Hungry.\n94% confident.\nFeed now.',
    sub: 'AI analyses the cry in 8 seconds — no guessing, no panicking at midnight.',
    accent: '#f59e0b',
    mockupBg: 'linear-gradient(155deg,#1c1200 0%,#241800 100%)',
    mockup: 'cry',
    cta: { label: 'Try cry analyzer free', href: '/cry-analyzer' },
    emoji: '😢',
  },
  {
    id: 'breathing',
    time: '7:30 AM',
    tag: 'Morning check-in',
    tagColor: '#4a7c6f',
    tagBg: 'rgba(74,124,111,0.08)',
    headline: '8.5 hrs of sleep.\nBreathing steady\nall night.',
    sub: '12,000 checks while you slept. Every breath logged. Every SpO₂ spike noted.',
    accent: '#4a7c6f',
    mockupBg: 'linear-gradient(155deg,#071512 0%,#0b1c18 100%)',
    mockup: 'breathing',
    cta: { label: 'See SENSE features', href: '/anvaya' },
    emoji: '🫁',
  },
  {
    id: 'milestone',
    time: '3 months old',
    tag: 'First milestone',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.08)',
    headline: 'First smile.\nFirst roll.\nAll captured.',
    sub: 'Anvaya prompts you when developmental milestones are due and logs the ones you mark.',
    accent: '#a78bfa',
    mockupBg: 'linear-gradient(155deg,#120920 0%,#180c2a 100%)',
    mockup: 'milestone',
    cta: { label: 'Explore OMNI', href: '/anvaya' },
    emoji: '🌟',
  },
  {
    id: 'growth',
    time: 'Week 14',
    tag: 'Growth tracker',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
    headline: '5.8 kg · 58 cm.\nOn track with\nWHO curve.',
    sub: 'Log weight and height weekly. Anvaya plots the curve and flags deviations early.',
    accent: '#34d399',
    mockupBg: 'linear-gradient(155deg,#041510 0%,#071d16 100%)',
    mockup: 'growth',
    cta: { label: 'See all features', href: '/anvaya' },
    emoji: '📏',
  },
];

/* ── Mini app screen mockups (dark — look like phone screens) ── */
function Mockup({ type, accent }: { type: string; accent: string }) {
  if (type === 'office') return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pulse 1.6s ease-in-out infinite', boxShadow: '0 0 6px #4ade80' }} />
          <span className="text-xs font-bold text-white/80">Live · Sleeping</span>
        </div>
        <span className="text-[10px] text-white/40">3:14 PM</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[{ l: 'Breathing', v: '28', u: '/min', c: '#3b9fd4' }, { l: 'SpO₂', v: '98', u: '%', c: '#4ade80' }, { l: 'Temp', v: '36.5', u: '°C', c: '#f59e0b' }].map(m => (
          <div key={m.l} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="text-lg font-black" style={{ color: m.c }}>{m.v}<span className="text-[10px] font-normal">{m.u}</span></div>
            <div className="text-[9px] text-white/40 mt-0.5">{m.l}</div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="h-full rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg,#3b9fd4,#4ade80)' }} />
        </div>
        <span className="text-[9px] text-white/40">Sleep quality 72%</span>
      </div>
    </div>
  );

  if (type === 'alert') return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(239,68,68,0.35)' }}>
      <div className="px-4 py-3 flex items-center gap-2.5" style={{ background: 'rgba(239,68,68,0.15)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
        <span className="text-lg">🚨</span>
        <div>
          <div className="text-xs font-black text-red-400">Breathing Alert</div>
          <div className="text-[10px] text-red-400/70">Irregular pattern detected · 2:07 AM</div>
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="text-[10px] text-white/50 mb-1">Breathing rate</div>
          <div className="flex items-end gap-1 h-8">
            {[18,22,19,24,32,38,41,38].map((h,i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h/41*100}%`, background: i >= 4 ? '#ef4444' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>
        <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg,#dc2626,#ef4444)' }}>
          📋 Share report with doctor
        </button>
      </div>
    </div>
  );

  if (type === 'cry') return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}35` }}>
      <div className="px-4 pt-4 pb-2">
        <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>AI Cry Analysis</div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🍼</span>
          <div>
            <div className="text-xl font-black text-white">Hungry</div>
            <div className="text-2xl font-black" style={{ color: accent }}>94%</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {[['Hungry','94',accent],['Tired','4','#8b5cf6'],['Discomfort','2','#ef4444']].map(([l,p,c]) => (
            <div key={l} className="flex items-center gap-2">
              <span className="text-[10px] text-white/50 w-20">{l}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full" style={{ width: `${p}%`, background: c }} />
              </div>
              <span className="text-[10px] font-mono" style={{ color: c }}>{p}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 pb-3 mt-2">
        <div className="rounded-xl p-2.5 text-xs text-white/60 flex items-start gap-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
          💡 Try feeding now — even if it hasn&apos;t been long since the last feed.
        </div>
      </div>
    </div>
  );

  if (type === 'breathing') return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}30` }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${accent}15` }}>
        <span className="text-xs font-bold text-white/80">Last night&apos;s sleep</span>
        <span className="text-[10px]" style={{ color: accent }}>8h 32m ✓</span>
      </div>
      <div className="p-4">
        <div className="flex h-5 rounded-lg overflow-hidden gap-px mb-2">
          {[['20%','#1e3a5f'],['15%','#2d6b5e'],['25%','#1e3a5f'],['10%','rgba(255,255,255,0.1)'],['30%','#2d6b5e']].map(([w,c],i) => (
            <div key={i} style={{ width:w, background:c }} />
          ))}
        </div>
        <div className="flex items-center gap-3 text-[9px] text-white/40 mb-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{background:'#2d6b5e'}} /> Deep</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{background:'#1e3a5f'}} /> Light</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{background:'rgba(255,255,255,0.1)'}} /> Awake</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[{l:'Avg Breathing',v:'27/min',c:accent},{l:'SpO₂ Low',v:'96%',c:'#4ade80'},{l:'Awake times',v:'2×',c:'#f59e0b'}].map(m => (
            <div key={m.l} className="rounded-xl p-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div className="text-sm font-black" style={{ color: m.c }}>{m.v}</div>
              <div className="text-[8px] text-white/35 mt-0.5 leading-tight">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (type === 'milestone') return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}30` }}>
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${accent}15` }}>
        <div className="text-xs font-bold text-white/80">Milestone timeline</div>
        <div className="text-[10px] text-white/40">3 months · On track 🎉</div>
      </div>
      <div className="p-4 space-y-3">
        {[
          { week: 'Week 4',  label: 'Focused on faces',  done: true },
          { week: 'Week 8',  label: 'First smile 😊',    done: true },
          { week: 'Week 12', label: 'Lifts head',        done: true },
          { week: 'Week 14', label: 'Rolls to side 🎯',  done: false, next: true },
          { week: 'Week 16', label: 'Laughs out loud',   done: false },
        ].map(m => (
          <div key={m.week} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black"
              style={{ background: m.done ? accent : m.next ? `${accent}30` : 'rgba(255,255,255,0.06)', color: m.done ? '#000' : m.next ? accent : 'rgba(255,255,255,0.25)', border: m.next ? `1.5px dashed ${accent}` : 'none' }}>
              {m.done ? '✓' : ''}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold" style={{ color: m.done ? 'rgba(255,255,255,0.85)' : m.next ? accent : 'rgba(255,255,255,0.3)' }}>{m.label}</div>
              <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{m.week}</div>
            </div>
            {m.next && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: `${accent}20`, color: accent }}>Next</span>}
          </div>
        ))}
      </div>
    </div>
  );

  // growth
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}30` }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${accent}15` }}>
        <div>
          <div className="text-xs font-bold text-white/80">Growth chart</div>
          <div className="text-[10px] text-white/40">vs WHO standard · Week 14</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-black" style={{ color: accent }}>5.8 kg</div>
          <div className="text-[9px] text-white/40">58 cm</div>
        </div>
      </div>
      <div className="p-4">
        <div className="relative h-24 mb-3">
          <div className="absolute inset-x-0" style={{ top: '15%', bottom: '25%', background: `${accent}12`, borderRadius: 4 }} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 96" preserveAspectRatio="none">
            <polyline points="0,72 40,64 80,55 120,48 160,42 200,38" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="200" cy="38" r="4" fill={accent} />
          </svg>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 96" preserveAspectRatio="none">
            <polyline points="0,78 40,70 80,62 120,56 160,50 200,46" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
        </div>
        <div className="flex items-center gap-3 text-[9px]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded inline-block" style={{background:accent}} /> Baby</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded inline-block border-t border-dashed" style={{borderColor:'rgba(255,255,255,0.3)'}} /> WHO median</span>
          <span className="ml-auto font-bold" style={{ color: accent }}>Above avg ↑</span>
        </div>
      </div>
    </div>
  );
}

export default function UseCasesPage() {
  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Every Moment', url: 'https://nxmplis.com/use-cases' },
      ]} />

      {/* Hero — light, warm, matches site */}
      <div className="px-4 pt-12 pb-10 text-center" style={{ background: 'linear-gradient(160deg,#f7f4f0 0%,#fdfcfa 60%,#f0f5f2 100%)' }}>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(74,124,111,0.10)', border: '1px solid rgba(74,124,111,0.20)', color: '#4a7c6f' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Anvaya Smart · One app
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.08] mb-4" style={{ color: '#0f1f1b' }}>
          Every moment<br />
          <span style={{ color: '#4a7c6f' }}>that matters.</span>
        </h1>
        <p className="text-base max-w-sm mx-auto leading-relaxed mb-8" style={{ color: '#5a6e67' }}>
          From the office to the NICU consult. From midnight cries to first milestones. Anvaya is there.
        </p>
        {/* Quick scenario nav pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {SCENARIOS.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105"
              style={{ background: s.tagBg, border: `1px solid ${s.tagColor}25`, color: s.tagColor }}>
              {s.emoji} {s.tag}
            </a>
          ))}
        </div>
      </div>

      {/* Scenario cards */}
      <div className="max-w-lg mx-auto px-4 py-10 space-y-6">
        {SCENARIOS.map(s => (
          <div
            key={s.id}
            id={s.id}
            className="rounded-3xl overflow-hidden bg-white shadow-sm"
            style={{ border: `1.5px solid ${s.accent}20` }}
          >
            {/* Card header — light */}
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold"
                  style={{ background: s.tagBg, color: s.tagColor, border: `1px solid ${s.tagColor}25` }}>
                  {s.emoji} {s.tag}
                </div>
                <span className="text-[10px] font-mono" style={{ color: '#a8b5af' }}>{s.time}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2" style={{ color: '#0f1f1b', whiteSpace: 'pre-line' }}>
                {s.headline}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7c74' }}>
                {s.sub}
              </p>
            </div>

            {/* App screen mockup — stays dark to look like a phone screen */}
            <div className="px-5 pb-4">
              <div className="rounded-2xl overflow-hidden p-3" style={{ background: s.mockupBg }}>
                <Mockup type={s.mockup} accent={s.accent} />
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <Link
                href={s.cta.href}
                className="flex items-center justify-between w-full rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:opacity-80"
                style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}30`, color: s.accent }}
              >
                {s.cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}

        {/* Bottom CTA — warm, light */}
        <div className="rounded-3xl p-6 text-center bg-white shadow-sm" style={{ border: '1.5px solid rgba(74,124,111,0.18)' }}>
          <div className="text-lg font-bold mb-1" style={{ color: '#0f1f1b' }}>One device. All of this.</div>
          <div className="text-sm mb-5" style={{ color: '#6b7c74' }}>Anvaya Smart starts at ₹8,999. Nothing on baby&apos;s skin. Ever.</div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/anvaya" className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow: '0 4px 16px rgba(232,149,122,0.35)' }}>
              <Heart className="w-4 h-4" /> See all models
            </Link>
            <Link href="/cry-analyzer" className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold"
              style={{ background: 'rgba(74,124,111,0.08)', border: '1.5px solid rgba(74,124,111,0.25)', color: '#4a7c6f' }}>
              <Shield className="w-4 h-4" /> Try cry analyzer free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
