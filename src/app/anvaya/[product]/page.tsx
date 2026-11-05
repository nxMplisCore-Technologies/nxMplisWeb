import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { productConfig, faqs } from '../page';
import { getProductsByHandles } from '@/lib/shopify';
import { FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { ProductDetailClient } from './ProductDetailClient';

const OG_IMAGES: Record<string, string> = {
  core: '/anvaya-core-05-room-comfort-lullaby.png',
  pulse: '/anvaya-pulse-02-ai-safety-alerts.png',
  omni: '/anvaya-omni-09-vitals-heart-breathing.png',
};

export async function generateStaticParams() {
  return productConfig.map(p => ({ product: p.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ product: string }> }
): Promise<Metadata> {
  const { product: productId } = await params;
  const cfg = productConfig.find(p => p.id === productId);
  if (!cfg) return {};

  const title = `${cfg.fullName} Baby Monitor — ${cfg.tagline} | Anvaya Smart`;
  const description = cfg.desc;
  const url = `https://nxmplis.com/anvaya/${productId}`;
  const image = `https://nxmplis.com${OG_IMAGES[productId] ?? cfg.localImages[0]}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Anvaya Smart',
      images: [{ url: image, width: 1200, height: 630, alt: cfg.fullName }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function AnvayaProductPage(
  { params }: { params: Promise<{ product: string }> }
) {
  const { product: productId } = await params;
  const productIdx = productConfig.findIndex(p => p.id === productId);
  if (productIdx === -1) notFound();

  const cfg = productConfig[productIdx];
  const [shopifyProduct] = await getProductsByHandles([cfg.handle]);
  const product = { ...cfg, shopify: shopifyProduct };

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Baby Monitors', url: 'https://nxmplis.com/anvaya' },
        { name: cfg.fullName, url: `https://nxmplis.com/anvaya/${productId}` },
      ]} />
      <ProductDetailClient product={product} faqs={faqs} productIdx={productIdx} />
    </>
  );
}
