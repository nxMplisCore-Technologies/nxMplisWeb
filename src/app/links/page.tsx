import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Instagram, MessageCircle, ShoppingBag, Mic, BookOpen, Scale, Baby, Newspaper } from 'lucide-react';

// The link in the Instagram bio points here, so bio clicks land on nxmplis.com
// instead of a third-party link page. Use https://nxmplis.com/links?utm_source=instagram&utm_medium=bio
export const metadata: Metadata = {
  title: 'Anvaya Smart Links',
  description: 'Shop Anvaya baby monitors, try the free AI cry analyzer, read our parenting guides or chat with us on WhatsApp.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://nxmplis.com/links' },
};

const PRIMARY = [
  { href: '/anvaya/omni', label: 'Anvaya OMNI', sub: 'Breathing & heart rate, nothing on baby · from ₹12,999', icon: Baby },
  { href: '/anvaya/pulse', label: 'Anvaya PULSE', sub: 'AI face-cover & tummy-sleep alerts · from ₹8,900', icon: Baby },
  { href: '/anvaya/core', label: 'Anvaya CORE', sub: '1080P nursery camera with cry alerts · ₹5,999', icon: Baby },
  { href: '/compare', label: 'Which model is right for me?', sub: 'CORE vs PULSE vs OMNI side by side', icon: Scale },
];

const FREE = [
  { href: '/cry-analyzer', label: 'Free AI cry analyzer', sub: 'Record your baby’s cry and see what it may mean', icon: Mic },
  { href: '/blog/baby-breathing-patterns', label: 'Is my baby breathing normally?', sub: 'Normal rates by age, reviewed by a doctor', icon: BookOpen },
  { href: '/blog/best-baby-monitor-india', label: 'Best baby monitor in India', sub: '6 options compared, with prices', icon: BookOpen },
  { href: '/blog/baby-monitor-vs-cctv-camera', label: 'Baby monitor vs CCTV camera', sub: 'Do you need a baby monitor at all?', icon: BookOpen },
];

const EXTERNAL = [
  { href: 'https://wa.me/917987449366', label: 'Chat on WhatsApp', sub: '+91 79874 49366', icon: MessageCircle },
  { href: 'https://www.amazon.in/stores/AnvayaSmart', label: 'Buy on Amazon.in', sub: 'Anvaya Smart brand store', icon: ShoppingBag },
  { href: 'https://www.instagram.com/anvayasmart/', label: 'Follow @anvayasmart', sub: 'Parenting tips and product demos on Instagram', icon: Instagram },
];

function Row({ href, label, sub, icon: Icon, external = false }: { href: string; label: string; sub: string; icon: React.ElementType; external?: boolean }) {
  const cls = 'flex items-center gap-4 bg-white border border-[#e2dbd4] rounded-2xl px-4 py-3.5 hover:border-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary';
  const inner = (
    <>
      <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Icon className="w-5 h-5" aria-hidden="true" /></span>
      <span className="flex-1 min-w-0">
        <span className="block font-semibold text-sm text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
    </>
  );
  return external
    ? <a href={href} target="_blank" rel="noopener" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}

export default function LinksPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen py-10">
      <div className="max-w-md mx-auto px-4">
        <header className="text-center mb-8">
          <Image src="/anvaya-logo.webp" alt="Anvaya Smart" width={72} height={72} className="mx-auto rounded-2xl mb-3" />
          <h1 className="text-2xl font-bold">Anvaya Smart</h1>
          <p className="text-sm text-muted-foreground mt-1">AI baby monitors designed in India · Free shipping · Cash on Delivery · 7-day returns</p>
        </header>

        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Shop</h2>
        <div className="flex flex-col gap-3 mb-8">{PRIMARY.map(r => <Row key={r.href} {...r} />)}</div>

        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Free for parents</h2>
        <div className="flex flex-col gap-3 mb-8">{FREE.map(r => <Row key={r.href} {...r} />)}</div>

        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Talk to us</h2>
        <div className="flex flex-col gap-3 mb-8">
          {EXTERNAL.map(r => <Row key={r.href} {...r} external />)}
          <Row href="/press" label="Press & media" sub="Founder story, facts and images" icon={Newspaper} />
        </div>
      </div>
    </div>
  );
}
