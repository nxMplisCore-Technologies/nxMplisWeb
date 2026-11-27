import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', port: '', pathname: '/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/products', destination: '/anvaya', permanent: true },
      { source: '/buy', destination: '/anvaya', permanent: true },
      { source: '/shop', destination: '/anvaya', permanent: true },
      // Retired pages (old product info) → current pages
      { source: '/early-access', destination: '/anvaya', permanent: true },
      { source: '/tour', destination: '/anvaya', permanent: true },
      // Old blog URLs still listed in Google (Search Console, Nov 2026) → live pages
      { source: '/blog/best-baby-monitor-india-2026', destination: '/blog/best-baby-monitor-india', permanent: true },
      { source: '/blog/best-baby-monitor-india-2025', destination: '/blog/best-baby-monitor-india', permanent: true },
      { source: '/blog/ai-baby-monitor-india-2026', destination: '/ai-baby-monitor-india', permanent: true },
      { source: '/blog/baby-breathing-monitor-without-wearable', destination: '/contactless-baby-monitor-india', permanent: true },
      { source: '/blog/what-does-baby-cry-mean', destination: '/blog/types-of-baby-cries', permanent: true },
      { source: '/blog/baby-cry-types', destination: '/blog/types-of-baby-cries', permanent: true },
      { source: '/blog/newborn-care-india', destination: '/newborn-care-guide', permanent: true },
      { source: '/blog/sids-prevention-india', destination: '/blog/baby-sleep-guide-india', permanent: true },
      { source: '/blog/baby-spo2-monitoring-india', destination: '/blog/baby-breathing-patterns', permanent: true },
      { source: '/baby-spo2-monitor-india', destination: '/contactless-baby-monitor-india', permanent: true },
      { source: '/monitor', destination: '/anvaya', permanent: true },
      // ?p=X → /anvaya/X  (crawler-friendly SSR routes)
      { source: '/anvaya', has: [{ type: 'query', key: 'p', value: 'core' }], destination: '/anvaya/core', permanent: false },
      { source: '/anvaya', has: [{ type: 'query', key: 'p', value: 'pulse' }], destination: '/anvaya/pulse', permanent: false },
      { source: '/anvaya', has: [{ type: 'query', key: 'p', value: 'omni' }], destination: '/anvaya/omni', permanent: false },
    ];
  },
};

export default nextConfig;
