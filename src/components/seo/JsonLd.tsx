// Comprehensive JSON-LD schema library — covers all Google rich result types

export function OrganizationSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization',
    '@id': 'https://nxmplis.com/#organization',
    name: 'Nxmpliscore', alternateName: ['Anvaya Smart', 'Nxmpliscore Technologies'],
    url: 'https://nxmplis.com', logo: { '@type': 'ImageObject', url: 'https://nxmplis.com/anvaya-logo.webp', width: 200, height: 200 },
    description: 'AI-powered contactless baby wellness pod monitoring. Anvaya Smart baby monitors: 1080P and 4MP cameras, AI face-cover and tummy-sleep alerts, and contactless breathing and heart-rate tracking on OMNI.',
    foundingDate: '2024',
    address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' },
    founder: [{ '@type': 'Person', name: 'Nxmpliscore Founders', alumniOf: { '@type': 'CollegeOrUniversity', name: 'IIT Hyderabad' }, jobTitle: 'Founders' }],
    sameAs: ['https://www.instagram.com/nxmpliscore/', 'https://www.amazon.in/stores/AnvayaSmart', 'https://anvayasmart.myshopify.com/', 'https://www.linkedin.com/company/nxmpliscore'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['English', 'Hindi', 'Telugu'], areaServed: 'IN', telephone: '+91-79874-49366', email: 'nxmpliscore@gmail.com' },
    knowsAbout: ['Baby Monitoring', 'Baby Wellness Pod Monitoring', 'Infant Health', 'Infant Vital Signs Monitoring', 'Contactless Sensing', 'AI Health Technology', 'Baby Sleep Analysis', 'Newborn Wellness Technology'],
  })}} />;
}

export function WebsiteSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite',
    '@id': 'https://nxmplis.com/#website',
    name: 'Anvaya Smart by Nxmpliscore', url: 'https://nxmplis.com',
    description: "India's most advanced contactless AI baby wellness pod",
    inLanguage: 'en-IN',
    publisher: { '@id': 'https://nxmplis.com/#organization' },
  })}} />;
}

export function ProductSchema({ name, description, price, sku, image, features, url }: { name: string; description: string; price: string; sku: string; image?: string; features?: string[]; url?: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product',
    '@id': `https://nxmplis.com/anvaya#${sku}`,
    name, description, sku,
    brand: { '@type': 'Brand', name: 'Anvaya Smart', url: 'https://nxmplis.com' },
    manufacturer: { '@id': 'https://nxmplis.com/#organization' },
    image: [image || 'https://nxmplis.com/anvaya-product.webp', 'https://nxmplis.com/anvaya-nursery.jpg'],
    category: 'Baby Monitors',
    audience: { '@type': 'PeopleAudience', audienceType: 'Parents of newborns and infants', suggestedMinAge: 0 },
    isAccessoryOrSparePartFor: { '@type': 'Product', name: 'Anvaya Smart App', operatingSystem: ['iOS', 'Android'] },
    offers: {
      '@type': 'Offer', priceCurrency: 'INR', price: price.replace(/[₹,]/g, ''),
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: url || 'https://nxmplis.com/anvaya',
      seller: { '@id': 'https://nxmplis.com/#organization' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'INR' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        deliveryTime: { '@type': 'ShippingDeliveryTime', handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' }, transitTime: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 7, unitCode: 'DAY' } },
      },
      hasMerchantReturnPolicy: { '@type': 'MerchantReturnPolicy', returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow', merchantReturnDays: 7, applicableCountry: 'IN', returnMethod: 'https://schema.org/ReturnByMail', returnFees: 'https://schema.org/FreeReturn' },
    },
    additionalProperty: features?.map(f => ({ '@type': 'PropertyValue', name: 'Feature', value: f })),
  })}} />;
}

export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a, author: { '@id': 'https://nxmplis.com/#organization' } } })),
  })}} />;
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  })}} />;
}

export function ArticleSchema({ title, description, url, image, datePublished, dateModified, author }: { title: string; description: string; url: string; image: string; datePublished: string; dateModified: string; author: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Article',
    headline: title, description,
    url, image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    datePublished, dateModified,
    author: { '@type': 'Person', name: author, url: 'https://nxmplis.com/about' },
    publisher: { '@id': 'https://nxmplis.com/#organization' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-IN',
    about: { '@type': 'Thing', name: 'Baby Monitoring India' },
  })}} />;
}

export function MedicalWebPageSchema({ title, description, url, dateModified, medicalReviewer }: { title: string; description: string; url: string; dateModified: string; medicalReviewer?: { name: string; credentials: string } }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'MedicalWebPage',
    name: title, headline: title, description,
    url, dateModified,
    lastReviewed: dateModified,
    mainContentOfPage: { '@type': 'WebPageElement' },
    ...(medicalReviewer && {
      reviewedBy: { '@type': 'Person', name: medicalReviewer.name, honorificSuffix: medicalReviewer.credentials, jobTitle: 'Physician' },
    }),
    medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    publisher: { '@id': 'https://nxmplis.com/#organization' },
    inLanguage: 'en-IN',
  })}} />;
}

export function HowToSchema({ name, steps }: { name: string; steps: { name: string; text: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'HowTo',
    name, image: { '@type': 'ImageObject', url: 'https://nxmplis.com/anvaya-product.webp' },
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
    tool: [{ '@type': 'HowToTool', name: 'Anvaya Smart baby monitor' }, { '@type': 'HowToTool', name: 'Anvaya Smart App (iOS/Android)' }],
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: '12999' },
    totalTime: 'PT3M',
  })}} />;
}

export function ComparisonListSchema({ items }: { items: { name: string; url: string; description: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'Best Baby Monitors India 2025 — Comparison',
    description: 'Comprehensive comparison of the best baby monitors available in India 2025, including features, price, and expert recommendations.',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: item.url, description: item.description })),
  })}} />;
}

export function LocalBusinessSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': ['LocalBusiness', 'Store'],
    '@id': 'https://nxmplis.com/#localbusiness',
    name: 'Nxmpliscore — Anvaya Smart', description: 'AI-powered contactless baby wellness monitor. Smart Care. Gentle Beginnings.',
    url: 'https://nxmplis.com', telephone: '+91-79874-49366', email: 'nxmpliscore@gmail.com',
    address: { '@type': 'PostalAddress', streetAddress: 'BITS Hyderabad Research Park', addressLocality: 'Hyderabad', addressRegion: 'Telangana', postalCode: '500078', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: 17.385, longitude: 78.4867 },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }],
    priceRange: '₹5,999 - ₹18,999',
    currenciesAccepted: 'INR',
    paymentAccepted: 'UPI, Credit Card, Debit Card, Net Banking, Cash on Delivery',
    areaServed: { '@type': 'Country', name: 'India' },
    hasMap: 'https://maps.google.com/?q=Hyderabad+Telangana+India',
  })}} />;
}

export function SpeakableSchema({ cssSelectors }: { cssSelectors: string[] }) {
  // For Google Assistant / voice search
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebPage',
    speakable: { '@type': 'SpeakableSpecification', cssSelector: cssSelectors },
    url: 'https://nxmplis.com',
  })}} />;
}

export function SoftwareApplicationSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name, description, url,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android, iOS',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    publisher: { '@id': 'https://nxmplis.com/#organization' },
  })}} />;
}
