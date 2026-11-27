import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Download, Mail, MessageCircle } from 'lucide-react';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Press & Media Kit — Anvaya Smart',
  description: 'Company facts, founder story, product details, story ideas and downloadable images for journalists writing about Anvaya Smart baby monitors by Nxmpliscore, Hyderabad.',
  alternates: { canonical: 'https://nxmplis.com/press' },
  openGraph: {
    title: 'Anvaya Smart Press & Media Kit',
    description: 'Facts, founder story, story ideas and images for journalists.',
    url: 'https://nxmplis.com/press',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby monitor in a nursery' }],
  },
};

const FACTS = [
  ['Company', 'Nxmpliscore'],
  ['Consumer brand', 'Anvaya Smart'],
  ['Headquarters', 'Hyderabad, Telangana, India'],
  ['Founder', 'Maya Singh'],
  ['Founded', '2025'],
  ['What we make', 'AI baby monitors with contactless breathing and heart-rate tracking'],
  ['Sold through', 'nxmplis.com, Anvaya Smart official store and Amazon.in'],
  ['Website', 'nxmplis.com'],
  ['Instagram', '@anvayasmart'],
];

const PRODUCTS = [
  ['Anvaya CORE', '₹5,999', '1080P pan-tilt camera, cry alerts, room temperature, two-way talk, lullabies, feeding reminders'],
  ['Anvaya PULSE', 'from ₹8,900', '4MP camera, on-device AI alerts when the baby’s face is covered or they sleep on their tummy, danger zones'],
  ['Anvaya OMNI', 'from ₹12,999', 'Everything in PULSE plus contactless (radar-based) breathing and heart-rate tracking and a nightly sleep report'],
];

const ANGLES = [
  { t: 'A free AI that listens to babies cry', d: 'Parents can record or upload a cry at nxmplis.com/cry-analyzer and get an instant read on whether it sounds hungry, tired, uncomfortable, in pain or needing a burp. It is free and needs no sign-up.' },
  { t: 'Breathing tracked without touching the baby', d: 'OMNI senses the tiny movements of breathing from beside the cot, so there is no sock, band or patch on a newborn’s skin, a different approach from imported wearable monitors.' },
  { t: 'Engineers who became parents', d: 'Anvaya was started by IIT-alumni engineers who built the monitor they wanted for their own nights with a newborn, designed for Indian homes: heat, power cuts, Cash on Delivery and WhatsApp support.' },
  { t: 'Honest about what monitors can’t do', d: 'Anvaya describes its devices as wellness monitors, not medical devices, and its guides follow the American Academy of Pediatrics’ safe-sleep advice that no monitor prevents SIDS.' },
];

// Official product images from the Anvaya Smart Shopify store (Files), so the
// press kit always matches the listings. Avoid the old "trusted by 40000
// families" and CORE "breathing, heart rate" badge images: neither claim is true.
const SHOPIFY = 'https://cdn.shopify.com/s/files/1/0821/1664/0991/files/';
const IMAGES = [
  { src: '/anvaya-logo.png', label: 'Anvaya Smart logo (PNG)' },
  { src: SHOPIFY + 'anvaya-omni-01-hero-nursery.jpg?v=1788532113', label: 'Anvaya OMNI in a nursery' },
  { src: SHOPIFY + 'anvaya-omni-11-product-hero-specs.png?v=1793793510', label: 'Anvaya OMNI with display and app' },
  { src: SHOPIFY + 'anvaya-omni-09-vitals-heart-breathing.png?v=1793793473', label: 'OMNI breathing and heart rate' },
  { src: SHOPIFY + 'anvaya-pulse-07-product-hero.png?v=1793793543', label: 'Anvaya PULSE' },
  { src: SHOPIFY + 'anvaya-pulse-02-ai-safety-alerts.png?v=1793793543', label: 'PULSE AI face-cover alert' },
  { src: SHOPIFY + 'anvaya-core-01-hero-1080p-day-night.png?v=1793793542', label: 'Anvaya CORE' },
  { src: SHOPIFY + 'anvaya-core-02-pan-tilt-whole-home.png?v=1793793544', label: 'CORE pan and tilt' },
];

export default function PressPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      <BreadcrumbSchema items={[{ name: 'Home', url: 'https://nxmplis.com' }, { name: 'Press', url: 'https://nxmplis.com/press' }]} />
      <section className="bg-gradient-to-br from-[#f2ece0] via-[#faf8f5] to-[#e4eeea] py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Press &amp; media kit</h1>
          <p className="text-lg text-muted-foreground">Everything you need to write about Anvaya Smart. Use any text or image on this page, with credit to Anvaya Smart and a link to nxmplis.com.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl py-12 space-y-14">
        <section aria-labelledby="about-h">
          <h2 id="about-h" className="text-2xl font-bold mb-4">About Anvaya Smart</h2>
          <div className="bg-white rounded-2xl border border-[#e2dbd4] p-6 space-y-3 text-muted-foreground leading-relaxed">
            <p><strong className="text-foreground">Short version:</strong> Anvaya Smart makes AI baby monitors designed in India, including OMNI, which tracks a sleeping baby’s breathing and heart rate without anything touching the baby.</p>
            <p><strong className="text-foreground">Longer version:</strong> Anvaya Smart is the consumer brand of Nxmpliscore, a Hyderabad wellness-technology company founded by IIT alumni. Its three monitors range from CORE, a 1080P nursery camera with cry alerts, to PULSE, which uses on-device AI to alert parents if a baby’s face is covered or they roll onto their tummy, and OMNI, which adds contactless, radar-based breathing and heart-rate tracking. Anvaya also offers a free AI baby cry analyzer online. Its monitors are sold at nxmplis.com and on Amazon.in with free shipping and Cash on Delivery across India.</p>
          </div>
        </section>

        <section aria-labelledby="facts-h">
          <h2 id="facts-h" className="text-2xl font-bold mb-4">Fast facts</h2>
          <dl className="bg-white rounded-2xl border border-[#e2dbd4] divide-y divide-[#f0ece6]">
            {FACTS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-4 px-5 py-3 text-sm">
                <dt className="font-semibold">{k}</dt><dd className="text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="products-h">
          <h2 id="products-h" className="text-2xl font-bold mb-4">Products and prices</h2>
          <div className="overflow-x-auto bg-white rounded-2xl border border-[#e2dbd4]">
            <table className="w-full text-sm min-w-[520px]">
              <thead><tr className="bg-[#e8f2ee] text-left"><th className="p-3">Model</th><th className="p-3">Price</th><th className="p-3">What it does</th></tr></thead>
              <tbody>
                {PRODUCTS.map(([m, p, d]) => (
                  <tr key={m} className="border-t border-[#f0ece6] align-top"><td className="p-3 font-semibold whitespace-nowrap">{m}</td><td className="p-3 whitespace-nowrap">{p}</td><td className="p-3 text-muted-foreground">{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">All models: free shipping in India, Cash on Delivery, 7-day returns, 1-year warranty. Wellness monitors, not medical devices.</p>
        </section>

        <section aria-labelledby="angles-h">
          <h2 id="angles-h" className="text-2xl font-bold mb-4">Story ideas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {ANGLES.map(a => (
              <div key={a.t} className="bg-white rounded-2xl border border-[#e2dbd4] p-5">
                <h3 className="font-bold mb-2">{a.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Want to try the analyzer on your own site? Get the free <Link href="/cry-analyzer#embed-heading" className="text-primary underline">embed code</Link>.</p>
        </section>

        <section aria-labelledby="images-h">
          <h2 id="images-h" className="text-2xl font-bold mb-4">Images</h2>
          <p className="text-sm text-muted-foreground mb-4">Click an image to open the full-size file. Free to use in coverage of Anvaya Smart. Credit: Anvaya Smart.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMAGES.map(img => (
              <a key={img.src} href={img.src} target="_blank" rel="noopener" className="group bg-white rounded-2xl border border-[#e2dbd4] overflow-hidden hover:border-primary">
                <div className="relative aspect-square bg-[#f5f1ec]"><Image src={img.src} alt={img.label} fill className="object-contain p-2" sizes="(max-width: 768px) 50vw, 240px" /></div>
                <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold"><Download className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />{img.label}</div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="contact-h">
          <h2 id="contact-h" className="text-2xl font-bold mb-4">Media contact</h2>
          <div className="bg-white rounded-2xl border border-[#e2dbd4] p-6 flex flex-col gap-3 text-sm">
            <a href="mailto:info@nxmplis.com" className="inline-flex items-center gap-2 text-primary font-semibold"><Mail className="w-4 h-4" aria-hidden="true" />info@nxmplis.com</a>
            <a href="https://wa.me/917987449366" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-primary font-semibold"><MessageCircle className="w-4 h-4" aria-hidden="true" />WhatsApp +91 79874 49366</a>
            <p className="text-muted-foreground">We can arrange interviews with the founders, review units and product demos.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
