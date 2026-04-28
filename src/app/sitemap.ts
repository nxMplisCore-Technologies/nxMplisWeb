import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nxmplis.com';
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/anvaya`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/early-access`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${base}/anvaya#core`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/anvaya#sense`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/anvaya#pulse`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/anvaya#omni`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/technology`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
