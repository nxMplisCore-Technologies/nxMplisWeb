import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ARTICLES } from '@/lib/data';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Insights & Innovations
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Explore our latest research, technical deep-dives, and perspectives on the future of AI and silicon.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map(article => (
          <Card key={article.slug} className="flex flex-col overflow-hidden">
            <Link href={`/blog/${article.slug}`} className="block relative h-56">
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover hover:scale-105 transition-transform duration-300" data-ai-hint={article.dataAiHint} />
            </Link>
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4"/>
                    <span>{article.author}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4"/>
                    <time dateTime={article.date}>{article.date}</time>
                 </div>
              </div>
              <CardTitle className="font-headline text-xl leading-tight">
                <Link href={`/blog/${article.slug}`} className="hover:text-primary transition-colors">{article.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{article.excerpt}</p>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={`/blog/${article.slug}`}>Read More <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
