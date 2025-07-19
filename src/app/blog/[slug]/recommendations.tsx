'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { recommendContent } from '@/ai/flows/content-recommendations';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

type RecommendationsProps = {
  articleContent: string;
  currentUrl: string;
};

export function Recommendations({ articleContent, currentUrl }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!articleContent || !currentUrl) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const result = await recommendContent({ articleContent, currentUrl });
        // The AI can sometimes recommend the article itself, let's filter it out
        const currentTitle = document.title.split(' | ')[0];
        setRecommendations(result.recommendations.filter(r => r !== currentTitle));
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    }

    // Delay fetching slightly to let the main content render first
    const timer = setTimeout(() => {
        fetchRecommendations();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [articleContent, currentUrl]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Related Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null; // Don't show the component if there are no recommendations
  }

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="font-headline">Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((title, index) => (
            <li key={index}>
              <Link href="#" className="group inline-flex items-center text-lg text-muted-foreground hover:text-primary transition-colors">
                 <span>{title}</span>
                 <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
