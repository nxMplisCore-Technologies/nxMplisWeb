export function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Organization',
      name: 'Nxmliscore', alternateName: 'Anvaya Smart',
      url: 'https://nxmplis.com', logo: 'https://nxmplis.com/anvaya-logo.png',
      description: 'AI-powered contactless baby wellness monitoring. Anvaya Smart monitors breathing, cry patterns, SpO2, heart rate and temperature without any wearables.',
      foundingDate: '2024',
      foundingLocation: { '@type': 'Place', addressLocality: 'Hyderabad', addressCountry: 'IN' },
      sameAs: ['https://www.instagram.com/anvayasmart', 'https://www.linkedin.com/company/nxmliscore'],
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['English', 'Hindi'], areaServed: 'IN' },
    })}} />
  );
}

export function WebsiteSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'Anvaya Smart by Nxmliscore', url: 'https://nxmplis.com',
      potentialAction: { '@type': 'SearchAction', target: 'https://nxmplis.com/blog?q={search_term_string}', 'query-input': 'required name=search_term_string' },
    })}} />
  );
}

export function ProductSchema({ name, description, price, sku, image }: { name: string; description: string; price: string; sku: string; image?: string }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Product', name, description, sku,
      brand: { '@type': 'Brand', name: 'Anvaya Smart' },
      manufacturer: { '@type': 'Organization', name: 'Nxmliscore' },
      image: image || 'https://nxmplis.com/anvaya-product.png',
      offers: {
        '@type': 'Offer', priceCurrency: 'INR', price: price.replace(/[₹,]/g, ''),
        availability: 'https://schema.org/PreOrder',
        url: 'https://nxmplis.com/early-access',
        seller: { '@type': 'Organization', name: 'Nxmliscore' },
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '47', bestRating: '5' },
    })}} />
  );
}

export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })}} />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
    })}} />
  );
}
