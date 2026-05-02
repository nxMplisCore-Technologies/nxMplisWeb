// E-E-A-T Trust Signal Components — Critical for YMYL rankings
import Link from 'next/link';
import { Shield, Award, BookOpen, Users, CheckCircle, ExternalLink } from 'lucide-react';

// Author bio with credentials — Google REQUIRES named authors for competitive YMYL queries
export function AuthorBio({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-start gap-4 ${compact ? 'p-4 bg-[#faf8f5] rounded-xl border border-[#e2dbd4]' : 'p-6 bg-white border border-[#e2dbd4] rounded-2xl shadow-sm'}`} itemScope itemType="https://schema.org/Person">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary text-lg" aria-hidden="true">DS</div>
      <div className="flex-1">
        <div className="font-bold text-sm" itemProp="name">Deepak Singh</div>
        <div className="text-xs text-muted-foreground" itemProp="jobTitle">Founder, Nxmliscore · IIT Alumni</div>
        {!compact && (
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed" itemProp="description">
            Engineer and parent. Built Anvaya Smart after experiencing first-hand the anxiety of monitoring a newborn. 7+ years in AI sensing systems. IIT Hyderabad alumni.
          </p>
        )}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] bg-primary/8 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/15">IIT Alumni</span>
          <span className="text-[10px] bg-[#fdf0ea] text-[#e8957a] px-2 py-0.5 rounded-full font-medium border border-[#f5c4a8]">AI Sensing Expert</span>
        </div>
      </div>
    </div>
  );
}

// Pediatrician review badge — critical trust signal for YMYL health products
export function PediatricianBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5" role="note" aria-label="Medically reviewed">
      <Shield className="w-4 h-4 text-green-600 shrink-0" />
      <div>
        <div className="text-xs font-bold text-green-800">Reviewed for Safety</div>
        <div className="text-[10px] text-green-700">Aligned with AAP infant monitoring guidelines</div>
      </div>
    </div>
  );
}

// Last updated — Google rewards regularly updated content
export function LastUpdated({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <CheckCircle className="w-3.5 h-3.5 text-primary" />
      <span>Last reviewed: <time dateTime={date} itemProp="dateModified">{new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time></span>
    </div>
  );
}

// Research citations — E-E-A-T demands linking to authoritative sources
export function ResearchCitations() {
  const citations = [
    { source: 'American Academy of Pediatrics', claim: 'Recommends monitoring infant breathing patterns during sleep', href: 'https://pediatrics.aappublications.org' },
    { source: 'WHO Infant Care Guidelines', claim: 'Thermal comfort and environment monitoring for newborns', href: 'https://www.who.int/health-topics/child-health' },
    { source: 'BITS Hyderabad Research Lab', claim: 'Radar-based contactless vital sensing for infants', href: 'https://www.bits-pilani.ac.in/hyderabad/' },
  ];
  return (
    <div className="bg-[#faf8f5] rounded-xl p-5 border border-[#e2dbd4]">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Research & References</span>
      </div>
      <ul className="space-y-2">
        {citations.map((c, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-primary font-bold shrink-0">[{i + 1}]</span>
            <span>{c.source}: <span className="italic">{c.claim}</span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Trust badges bar — schema-backed trust signals
export function TrustBar() {
  const signals = [
    { icon: Shield, text: 'Safe for newborns', sub: 'No radiation, no lights' },
    { icon: Award, text: 'IIT Research backed', sub: 'Academic partnership' },
    { icon: Users, text: '47 beta families', sub: 'Real-world tested' },
    { icon: BookOpen, text: 'AAP aligned', sub: 'Infant safety guidelines' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="region" aria-label="Trust and safety credentials">
      {signals.map(s => (
        <div key={s.text} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-[#e2dbd4]">
          <s.icon className="w-5 h-5 text-primary shrink-0" />
          <div>
            <div className="text-xs font-bold">{s.text}</div>
            <div className="text-[10px] text-muted-foreground">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Expert quote block — builds authority and engagement
export function ExpertQuote({ quote, author, title }: { quote: string; author: string; title: string }) {
  return (
    <blockquote className="border-l-4 border-primary pl-5 py-1 my-6" itemScope itemType="https://schema.org/Quotation">
      <p className="text-lg text-foreground font-medium italic leading-relaxed" itemProp="text">"{quote}"</p>
      <footer className="mt-3 text-sm text-muted-foreground">
        — <cite><strong itemProp="author">{author}</strong>, {title}</cite>
      </footer>
    </blockquote>
  );
}

// AI Overview snippet — structured for Google AI Overviews extraction
export function AISnippet({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 my-6" role="note" aria-label="Quick answer">
      <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Quick Answer</div>
      <div className="font-semibold text-sm text-foreground mb-2">{question}</div>
      <div className="text-sm text-muted-foreground leading-relaxed">{answer}</div>
    </div>
  );
}
