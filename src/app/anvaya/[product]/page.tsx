import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { productConfig, faqs } from '../page';
import { getProductsByHandles } from '@/lib/shopify';
import { FAQSchema, BreadcrumbSchema, ProductSchema } from '@/components/seo/JsonLd';
import { ProductDetailClient } from './ProductDetailClient';
import Link from 'next/link';
import { productDetails } from '@/lib/product-details';

const OG_IMAGES: Record<string, string> = {
  core: '/anvaya-core-05-room-comfort-lullaby.jpg',
  pulse: '/anvaya-pulse-02-ai-safety-alerts.jpg',
  omni: '/anvaya-omni-09-vitals-heart-breathing.jpg',
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

  const title = `${cfg.fullName} Baby Monitor — ${cfg.tagline}`;
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
  const detail = productDetails[cfg.id as 'core' | 'pulse' | 'omni'];
  const pageFaqs = [...detail.faqs, ...faqs];

  return (
    <>
      <ProductSchema name={cfg.fullName} description={cfg.desc} sku={`ANVAYA-${cfg.name}`}
        price={`₹${Math.round(Number((shopifyProduct?.variants[0] ?? cfg.fallbackVariants[0]).price))}`}
        image={`https://nxmplis.com${cfg.localImages[0]}`} url={`https://nxmplis.com/anvaya/${productId}`} />
      <FAQSchema faqs={pageFaqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://nxmplis.com' },
        { name: 'Baby Monitors', url: 'https://nxmplis.com/anvaya' },
        { name: cfg.fullName, url: `https://nxmplis.com/anvaya/${productId}` },
      ]} />
      <ProductDetailClient product={product} faqs={pageFaqs} productIdx={productIdx} />

      <section className="bg-[#faf8f5] border-t border-gray-100" aria-labelledby="details-heading">
        <div className="container mx-auto px-4 max-w-4xl py-14">
          <h2 id="details-heading" className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: '#1a2e28' }}>About {cfg.fullName}</h2>
          {detail.intro.map(p => (
            <p key={p.slice(0, 32)} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
          ))}

          <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: '#1a2e28' }}>{cfg.fullName} Specifications</h2>
          <div className="overflow-x-auto rounded-2xl border border-[#e8e0d8] bg-white">
            <table className="w-full text-sm">
              <caption className="sr-only">{cfg.fullName} baby monitor specifications</caption>
              <tbody>
                {detail.specs.map(s => (
                  <tr key={s.label} className="border-t border-[#e8e0d8] first:border-t-0">
                    <th scope="row" className="text-left p-3 font-medium w-1/3" style={{ color: '#1a2e28' }}>{s.label}</th>
                    <td className="p-3 text-muted-foreground">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-3" style={{ color: '#1a2e28' }}>Who is {cfg.name} for?</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{detail.perfectFor}</p>

          <h2 className="text-2xl font-bold mb-3" style={{ color: '#1a2e28' }}>Delivery, warranty &amp; returns</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Free shipping across India with Cash on Delivery. Every Anvaya monitor comes with a 1-year warranty and a 7-day return window. Questions before you buy? Message us on WhatsApp from the <Link href="/contact" className="text-primary underline">contact page</Link>.
          </p>

          <h2 className="text-xl font-bold mb-3" style={{ color: '#1a2e28' }}>Keep reading</h2>
          <ul className="space-y-2">
            {detail.related.map(r => (
              <li key={r.href}><Link href={r.href} className="text-primary underline text-sm">{r.label}</Link></li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-8">Anvaya monitors are wellness and convenience devices, not medical devices. They do not replace safe-sleep practices or adult supervision.</p>
        </div>
      </section>
    </>
  );
}
