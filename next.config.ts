import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
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
      { source: '/buy', destination: '/early-access', permanent: true },
      { source: '/shop', destination: '/early-access', permanent: true },
      { source: '/monitor', destination: '/anvaya', permanent: true },
    ];
  },
};

export default nextConfig;
