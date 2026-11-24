import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ARTICLES, CATEGORIES } from '@/lib/data';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Clock, Tag, ArrowRight, TrendingUp, Mic, Activity, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Baby Care Blog India: Sleep, Cries & Monitors',
  description: 'Expert guides on baby breathing patterns, cry types, sleep schedules, choosing a baby monitor and newborn care — updated 2026. For Indian parents.',
  keywords: ['baby wellness blog India', 'baby breathing guide', 'baby sleep tips India', 'infant monitoring guide', 'baby cry types India', 'newborn care India'],
  alternates: { canonical: 'https://nxmplis.com/blog' },
  openGraph: { title: 'Baby Wellness Blog | Anvaya Smart', description: 'Expert baby health and wellness guides for Indian parents.', url: 'https://nxmplis.com/blog', images: [{ url: '/anvaya-lifestyle.webp' }] },
};

export default function BlogPage() {
  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Blog', url: 'https://nxmplis.com/blog' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'CollectionPage',
        name: 'Anvaya Smart baby care blog', url: 'https://nxmplis.com/blog', inLanguage: 'en-IN',
        description: 'Guides for Indian parents on newborn breathing, sleep, crying, newborn care and choosing a baby monitor.',
        publisher: { '@id': 'https://nxmplis.com/#organization' },
        mainEntity: { '@type': 'ItemList', itemListElement: [
          ...ARTICLES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `https://nxmplis.com/blog/${a.slug}`, name: a.title })),
          { '@type': 'ListItem', position: ARTICLES.length + 1, url: 'https://nxmplis.com/newborn-care-guide', name: 'Newborn Care Guide India' },
          { '@type': 'ListItem', position: ARTICLES.length + 2, url: 'https://nxmplis.com/baby-monitoring', name: 'Baby Monitoring India: Complete Guide' },
        ] },
      }) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3" style={{color:'#e8957a'}}>Baby Wellness Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Baby care guides for Indian parents</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">Clear, practical guides on newborn breathing, sleep, crying and choosing a baby monitor, written for Indian homes and based on WHO, AAP and NHS guidance.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-12">

        {/* Free Tools strip */}
        <div className="mb-10 bg-gradient-to-r from-[#e4eeea] to-[#f0f5f3] rounded-2xl p-5 border border-primary/15">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Free AI Tools for Parents</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: Mic, label: 'AI Cry Analyzer', desc: 'Decode your baby\'s cry in 10 seconds', href: '/cry-analyzer', cta: 'Try Free' },
              { icon: Activity, label: 'Contactless Monitor', desc: 'Breathing & heart rate without wearables', href: '/contactless-baby-monitor-india', cta: 'Learn More' },
              { icon: Brain, label: 'Baby Wellness Quiz', desc: 'Which Anvaya model is right for you?', href: '/quiz', cta: 'Take Quiz' },
            ].map(t => (
              <Link key={t.label} href={t.href} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <t.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: '#1a2e28' }}>{t.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 mb-2">{t.desc}</div>
                  <span className="text-xs font-bold text-primary group-hover:underline">{t.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Intro: what this blog covers */}
        <section className="mb-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">Parenting guides</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The first year raises a lot of questions, often at 3am. Is fast, irregular breathing normal? Why won&apos;t my baby settle? How much should a newborn sleep? Our parenting guides answer these in plain language, with the numbers parents look for: normal breathing rates, sleep hours by month and the warning signs that mean you should call a doctor.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Start with the <Link href="/newborn-care-guide" className="text-primary underline">Newborn Care Guide</Link>, then read about <Link href="/blog/baby-breathing-patterns" className="text-primary underline">normal baby breathing</Link>, <Link href="/blog/types-of-baby-cries" className="text-primary underline">what different cries mean</Link> and <Link href="/blog/baby-sleep-guide-india" className="text-primary underline">baby sleep by month</Link>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Buying guides</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Choosing a baby monitor in India means weighing camera quality, alerts, comfort in Indian heat and price. Our buying guides explain the difference between a simple camera, an AI baby monitor with safety alerts and a contactless monitor that tracks breathing and heart rate, so you can pick what fits your family.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Read the <Link href="/blog/best-baby-monitor-india-2025" className="text-primary underline">best baby monitor India buying guide</Link>, learn how a <Link href="/contactless-baby-monitor-india" className="text-primary underline">contactless baby monitor</Link> works, see what an <Link href="/ai-baby-monitor-india" className="text-primary underline">AI baby monitor</Link> does, or <Link href="/compare" className="text-primary underline">compare CORE, PULSE and OMNI</Link>.
            </p>
          </div>
        </section>

        {/* Featured article */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-[#e2dbd4] hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="relative h-56 md:h-full min-h-[220px]">
              <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Featured
              </div>
            </div>
            <div className="p-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1"><Tag className="w-3 h-3" />{featured.category}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                <time className="text-[10px] text-muted-foreground" dateTime={featured.updatedDate}>Updated {new Date(featured.updatedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">{featured.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Article grid */}
        <h2 className="text-2xl font-bold mb-6">All Articles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(article => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-[#e2dbd4] hover:border-primary/30 hover:shadow-md transition-all flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full">{article.category}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  <time className="text-[10px] text-muted-foreground" dateTime={article.updatedDate}>{new Date(article.updatedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">{article.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-auto">
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Topic hub */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-[#e2dbd4]">
          <h2 className="text-2xl font-bold mb-2">Explore by Topic</h2>
          <p className="text-muted-foreground text-sm mb-6">Find exactly what you need for your baby's stage and situation.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { topic: 'What Does Baby Cry Mean?', href: '/blog/types-of-baby-cries', desc: '5 common cry types and how to respond' },
              { topic: 'Baby Breathing', href: '/blog/baby-breathing-patterns', desc: 'Normal rates, warning signs, monitoring' },
              { topic: 'Baby Sleep', href: '/blog/baby-sleep-guide-india', desc: 'Schedules, regressions, sleep tracking' },
              { topic: 'Contactless Monitors', href: '/contactless-baby-monitor-india', desc: 'Breathing & heart rate without wearables' },
              { topic: 'Newborn Care', href: '/newborn-care-guide', desc: 'Feeding, sleep and warmth in the first month' },
              { topic: 'Baby Monitor Buying Guide', href: '/blog/best-baby-monitor-india-2025', desc: 'How to choose, with prices' },
            ].map(t => (
              <Link key={t.topic} href={t.href} className="flex items-start gap-3 p-4 rounded-xl border border-[#e2dbd4] hover:border-primary/30 hover:bg-[#faf8f5] transition-all group">
                <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <div>
                  <div className="font-semibold text-sm">{t.topic}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
