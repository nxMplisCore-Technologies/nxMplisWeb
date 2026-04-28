import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/pitch-deck/', '/gallery/'],
      },
    ],
    sitemap: 'https://nxmplis.com/sitemap.xml',
    host: 'https://nxmplis.com',
  };
}
