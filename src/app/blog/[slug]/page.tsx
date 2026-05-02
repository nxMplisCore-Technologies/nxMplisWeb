import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ARTICLES } from '@/lib/data';
import { ArticleSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { AuthorBio, LastUpdated, TrustBar } from '@/components/trust/EEATSignals';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── SSG: pre-render all articles at build time ────────────────────────────────
export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

// ── Dynamic metadata per article ─────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    authors: [{ name: article.author, url: 'https://nxmplis.com/about' }],
    alternates: { canonical: `https://nxmplis.com/blog/${article.slug}` },
    openGraph: {
      title: article.title, description: article.excerpt,
      url: `https://nxmplis.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updatedDate,
      authors: [article.author],
      images: [{ url: `https://nxmplis.com${article.imageUrl}`, width: 1200, height: 630, alt: article.title }],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.excerpt, images: [`https://nxmplis.com${article.imageUrl}`] },
  };
}

// ── Table of contents extractor ──────────────────────────────────────────────
function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)];
  return matches.map(m => ({ text: m[1], id: m[1].toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find(a => a.slug === params.slug);
  if (!article) notFound();

  const explicitRelated = (article as any).related as string[] | undefined;
  const related = explicitRelated
    ? explicitRelated.map(s => ARTICLES.find(a => a.slug === s)).filter(Boolean).slice(0, 3) as typeof ARTICLES
    : ARTICLES.filter(a => a.slug !== article.slug && (a.category === article.category || a.keywords.some(k => article.keywords.includes(k)))).slice(0, 3);
  const headings = extractHeadings(article.content);
  const BASE = 'https://nxmplis.com';

  // Add IDs to h2 tags for anchor navigation
  const contentWithIds = article.content.replace(/<h2>([^<]+)<\/h2>/g, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<h2 id="${id}">${text}</h2>`;
  });

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <ArticleSchema title={article.title} description={article.excerpt} url={`${BASE}/blog/${article.slug}`} image={`${BASE}${article.imageUrl}`} datePublished={article.date} dateModified={article.updatedDate} author={article.author} />
      <BreadcrumbSchema items={[{ name: 'Home', url: BASE }, { name: 'Blog', url: `${BASE}/blog` }, { name: article.title, url: `${BASE}/blog/${article.slug}` }]} />

      {/* Hero */}
      <header className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-5 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>›</span><Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>›</span><span className="truncate max-w-[200px]">{article.title.split(':')[0]}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 flex-wrap text-xs text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold flex items-center gap-1"><Tag className="w-3 h-3" />{article.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
            <LastUpdated date={article.updatedDate} />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">{article.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>
          <AuthorBio compact />
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-start">

          {/* Main article */}
          <article itemScope itemType="https://schema.org/Article">
            <meta itemProp="datePublished" content={article.date} />
            <meta itemProp="dateModified" content={article.updatedDate} />
            <meta itemProp="author" content={article.author} />

            {/* Hero image */}
            <div className="relative rounded-2xl overflow-hidden mb-10 shadow-lg" style={{minHeight:"280px"}}>
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover object-center" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>

            {/* Article body */}
            <div
              className="prose prose-base max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-foreground
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-foreground prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-table:border prose-table:rounded-xl prose-td:border prose-td:p-3 prose-th:border prose-th:p-3 prose-th:bg-primary/5 prose-th:font-semibold
                prose-ul:my-4 prose-ol:my-4"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-br from-[#e8f2ee] to-[#f5ede0] rounded-2xl p-7 border border-primary/20">
              <h3 className="text-xl font-bold mb-2">Monitor your baby with Anvaya Smart</h3>
              <p className="text-muted-foreground text-sm mb-4">India's only contactless AI baby monitor. Breathing, SpO2, cry analysis, sleep tracking. Starting ₹8,999.</p>
              <Button asChild className="bg-primary text-white hover:bg-primary/90 gap-2">
                <Link href="/early-access">Get Early Access — Save ₹7,000 <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-8">
              <TrustBar />
            </div>

            {/* Author */}
            <div className="mt-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">About the Author</h3>
              <AuthorBio />
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-[#e2dbd4] hover:border-primary/30 transition-colors group">
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={r.imageUrl} alt={r.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{r.category}</span>
                        <h3 className="font-semibold text-sm mt-0.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">{r.title}</h3>
                        <span className="text-[10px] text-muted-foreground">{r.readTime}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {headings.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-[#e2dbd4]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">In This Article</h3>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-2">
                      {headings.map(h => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className="text-xs text-muted-foreground hover:text-primary transition-colors leading-relaxed block py-0.5">{h.text}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 text-white">
                <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-2">Early Access</div>
                <div className="font-bold text-lg mb-1">Anvaya Smart</div>
                <div className="text-xs opacity-80 mb-4">Contactless baby monitoring. Save ₹7,000 now.</div>
                <Button asChild size="sm" className="bg-white text-primary hover:bg-white/90 w-full font-semibold text-xs">
                  <Link href="/early-access">Reserve — ₹12,999</Link>
                </Button>
              </div>

              {/* All articles */}
              <div className="bg-white rounded-2xl p-5 border border-[#e2dbd4]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">More Articles</h3>
                <ul className="space-y-2">
                  {ARTICLES.filter(a => a.slug !== article.slug).slice(0, 5).map(a => (
                    <li key={a.slug}>
                      <Link href={`/blog/${a.slug}`} className="text-xs text-muted-foreground hover:text-primary transition-colors leading-relaxed flex items-start gap-1.5">
                        <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-primary" />{a.title.split(':')[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
