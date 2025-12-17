import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ARTICLES } from '@/lib/data';
import { Recommendations } from './recommendations';
import { headers } from 'next/headers';
import { Calendar, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export async function generateStaticParams() {
  return ARTICLES.map(article => ({
    slug: article.slug,
  }));
}

function getArticle(slug: string) {
  return ARTICLES.find(article => article.slug === slug);
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  const headersList = headers();
  const host = headersList.get('host') || '';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const currentUrl = `${protocol}://${host}/blog/${params.slug}`;

  if (!article) {
    notFound();
  }

  // A simple way to get related content for the recommender without the current article's content
  const allOtherArticles = ARTICLES.filter(a => a.slug !== article.slug).map(a => `- ${a.title}`).join('\n');
  const contextForRec = `Current Article: ${article.title}\n\nOther available articles:\n${allOtherArticles}`;


  return (
    <article className="container mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4 leading-tight">{article.title}</h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
             <div className="flex items-center gap-2">
                <User className="w-5 h-5"/>
                <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5"/>
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
          </div>
        </header>

        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12 shadow-lg">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover" data-ai-hint={article.dataAiHint} />
        </div>

        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <Separator className="my-16" />

        <Recommendations articleContent={contextForRec} currentUrl={currentUrl} />

      </div>
    </article>
  );
}
