'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { recommendContent } from '@/ai/flows/content-recommendations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { ARTICLES } from '@/lib/data';

type RecommendationsProps = {
  articleContent: string;
  currentUrl: string;
};

// Helper function to find a slug by title
const findSlugByTitle = (title: string) => {
    const matchedArticle = ARTICLES.find(article => article.title.toLowerCase() === title.toLowerCase());
    return matchedArticle ? matchedArticle.slug : null;
}

export function Recommendations({ articleContent, currentUrl }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<{title: string, slug: string | null}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!articleContent || !currentUrl) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const result = await recommendContent({ articleContent, currentUrl });
        const recommendationsWithSlugs = result.recommendations.map(title => ({
            title,
            slug: findSlugByTitle(title)
        })).filter(rec => rec.slug); // Only keep recommendations that have a valid slug
        
        setRecommendations(recommendationsWithSlugs);

      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        setError("Could not load recommendations.");
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchRecommendations();

  }, [articleContent, currentUrl]);

  if (isLoading) {
    return (
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (error || recommendations.length === 0) {
    return null; // Don't show the component if there are no recommendations or an error occurred
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recommendations.map((rec, index) => (
            <li key={index}>
              <Link href={`/blog/${rec.slug}`} className="group inline-flex items-center text-lg text-muted-foreground hover:text-primary transition-colors">
                 <span>{rec.title}</span>
                 <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
