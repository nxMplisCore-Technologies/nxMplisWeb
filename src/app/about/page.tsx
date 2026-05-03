import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: "About Nxmliscore | IIT Alumni Building India's Best Baby Monitor",
  description: "Nxmliscore — wellness tech founded by IIT alumni. We build Anvaya Smart, India's most advanced contactless AI baby monitor. Research-backed. Based in Hyderabad.",
  keywords: ["Nxmliscore company", "Anvaya Smart founders", "baby monitor startup India", "IIT founders baby tech"],
  alternates: { canonical: 'https://nxmplis.com/about' },
  openGraph: { title: "About Nxmliscore | IIT Alumni Building India's Best Baby Monitor", description: "Nxmliscore — wellness tech founded by IIT alumni. We build Anvaya Smart, India's most advanced contactless AI baby monitor.", url: 'https://nxmplis.com/about', images: [{ url: '/anvaya-product.webp' }] },
};

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Microscope, Heart, Shield, Brain } from 'lucide-react';

const team = [
  { initials: 'DS', name: 'Deepak Singh', role: 'Founder & CEO', bg: '#4a7c6f' },
  { initials: 'RK', name: 'Research Lead', role: 'Head of Sensing Technology', bg: '#e8957a' },
  { initials: 'AM', name: 'AI & ML Lead', role: 'Head of AI & Signal Processing', bg: '#7aab9e' },
  { initials: 'PV', name: 'Design Lead', role: 'Head of Product Design', bg: '#c17a5e' },
];

const partners = [
  { name: 'BITS Hyderabad', desc: 'Partnering on flexible sensor materials and advanced biosensing technologies.', icon: Microscope },
  { name: 'SASTRA University, Thanjavur', desc: 'Home to our R&D lab, supporting long-term research in wellness sensing and signal interpretation.', icon: Brain },
];

const values = [
  { icon: Heart, title: 'Care first', desc: 'Every feature exists because it helps a parent care better — not because it\'s technically impressive.' },
  { icon: Shield, title: 'Privacy by default', desc: 'On-device processing. No cloud streaming. No data ever leaves your home.' },
  { icon: Brain, title: 'Calm intelligence', desc: 'Technology should reduce parental anxiety, never amplify it.' },
  { icon: Microscope, title: 'Science-backed', desc: 'Built on published research, academic partnerships, and rigorous testing.' },
];

function PersonSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://nxmplis.com/about#deepak-singh',
      name: 'Deepak Singh',
      url: 'https://nxmplis.com/about',
      jobTitle: 'Founder & CEO',
      description: 'Engineer and parent. Built Anvaya Smart after experiencing first-hand the anxiety of monitoring a newborn. 7+ years in AI sensing systems. IIT Hyderabad alumni.',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'IIT Hyderabad', url: 'https://iith.ac.in' },
      worksFor: { '@id': 'https://nxmplis.com/#organization' },
      knowsAbout: ['Radar Sensing', 'AI Signal Processing', 'Infant Wellness Monitoring', 'Baby Health Technology', 'Contactless Vital Sign Detection'],
      sameAs: ['https://www.linkedin.com/company/nxmliscore'],
    })}} />
  );
}

export default function AboutPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <PersonSchema />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f5ede0] via-[#faf8f5] to-[#e8f2ee] py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{color:'#e8957a'}}>Who We Are</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
                Built by parents,<br />engineers, and<br />researchers.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Nxmliscore is a wellness technology company focused on understanding human signals across every stage of life. Founded by IIT alumni, we combine deep engineering expertise, applied research, and human-centered design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We build intelligent, non-intrusive systems that listen to subtle physiological cues — transforming them into insights that support care, confidence, and well-being.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-md" style={{minHeight:"320px"}}>
              <Image src="/anvaya-product.webp" alt="Nxmliscore team — IIT alumni building Anvaya Smart, India's best AI baby monitor" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{color:'#e8957a'}}>What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-bold">Values that guide everything we build.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-[#faf8f5] rounded-2xl p-6 border border-[#e2dbd4]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{color:'#e8957a'}}>The Team</p>
            <h2 className="text-3xl md:text-4xl font-bold">People who care about the problem.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {team.map(t => (
              <div key={t.initials} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3" style={{background: t.bg}}>
                  {t.initials}
                </div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{color:'#e8957a'}}>Research Partners</p>
            <h2 className="text-3xl font-bold">Built on strong research foundations.</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Our products are built on science, not assumptions — backed by active academic collaboration.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {partners.map(p => (
              <div key={p.name} className="bg-[#faf8f5] rounded-2xl p-6 border border-[#e2dbd4] flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Join us in building something meaningful.</h2>
          <p className="text-white/80 mb-8">We're always looking for engineers, researchers, and designers who care about the problem as much as we do.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild className="bg-white text-primary hover:bg-white/90 font-semibold gap-2">
              <Link href="/careers">See Open Roles <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
