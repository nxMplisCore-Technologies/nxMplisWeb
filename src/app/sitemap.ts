import { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nxmplis.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/anvaya`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/early-access`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${base}/baby-monitoring`, lastModified: now, changeFrequency: 'monthly', priority: 0.90 },
    { url: `${base}/baby-wellness-app`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${base}/newborn-care-guide`, lastModified: now, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${base}/technology`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.60 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.60 },
  ];

  const blogPages: MetadataRoute.Sitemap = ARTICLES.map(article => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: new Date(article.updatedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.80,
  }));

  return [...staticPages, ...blogPages];
}
