const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }, // revalidate every 5 minutes
  });

  if (!res.ok) throw new Error(`Shopify Storefront API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface ShopifyVariant {
  id: string;         // GID: gid://shopify/ProductVariant/XXXXXXXX
  numericId: string;  // just the numeric part for cart URLs
  title: string;
  price: string;
  compareAtPrice: string | null;
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  variants: ShopifyVariant[];
  images: { url: string; altText: string | null }[];
  availableForSale: boolean;
}

// ── Queries ────────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    availableForSale
    images(first: 8) {
      edges { node { url altText } }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount }
          compareAtPrice { amount }
        }
      }
    }
  }
`;

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (!DOMAIN || !TOKEN) return null; // env vars not set — fall back to static data
  try {
    const data = await storefrontFetch<{ product: RawProduct | null }>(
      `${PRODUCT_FRAGMENT}
      query GetProduct($handle: String!) {
        product(handle: $handle) { ...ProductFields }
      }`,
      { handle }
    );
    if (!data.product) return null;
    return normalizeProduct(data.product);
  } catch {
    console.warn(`[shopify] Failed to fetch product: ${handle}`);
    return null;
  }
}

export async function getProductsByHandles(handles: string[]): Promise<(ShopifyProduct | null)[]> {
  return Promise.all(handles.map(h => getProductByHandle(h)));
}

// ── Normalizer ─────────────────────────────────────────────────────────────

interface RawVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string };
  compareAtPrice: { amount: string } | null;
}

interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: { edges: { node: RawVariant }[] };
}

function normalizeProduct(raw: RawProduct): ShopifyProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    availableForSale: raw.availableForSale,
    images: raw.images.edges.map(e => e.node),
    variants: raw.variants.edges.map(e => ({
      id: e.node.id,
      numericId: e.node.id.split('/').pop()!,
      title: e.node.title,
      price: e.node.price.amount,
      compareAtPrice: e.node.compareAtPrice?.amount ?? null,
      availableForSale: e.node.availableForSale,
    })),
  };
}

// ── Cart URL helper ────────────────────────────────────────────────────────

export function cartUrl(variantNumericId: string, domain = DOMAIN): string {
  return `https://${domain}/cart/${variantNumericId}:1?storefront=true`;
}
