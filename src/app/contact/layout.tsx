import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact Anvaya Smart | WhatsApp Support India | Nxmliscore',
  description: 'Get in touch with Anvaya Smart. WhatsApp support, investor relations, career opportunities. Based in Hyderabad, India.',
  keywords: ['contact Anvaya Smart', 'Nxmliscore support', 'baby monitor support India'],
  alternates: { canonical: 'https://nxmplis.com/contact' },
  openGraph: { title: 'Contact Anvaya Smart | WhatsApp Support India', url: 'https://nxmplis.com/contact', images: [{ url: '/anvaya-product.png' }] },
};
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
