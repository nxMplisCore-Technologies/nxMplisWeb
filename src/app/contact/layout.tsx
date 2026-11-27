import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: { absolute: 'Anvaya Smart Customer Care — WhatsApp +91 79874 49366' },
  description: 'Anvaya Smart customer care for Anvaya baby monitors and the Anvaya app: WhatsApp +91 79874 49366, order help, returns. Also partnerships, investor relations, career opportunities. Based in Hyderabad, India.',
  keywords: ['contact Anvaya Smart', 'Anvaya customer care', 'Anvaya WhatsApp number', 'Nxmpliscore support', 'baby monitor support India'],
  alternates: { canonical: 'https://nxmplis.com/contact' },
  openGraph: { title: 'Contact Anvaya Smart | WhatsApp Support India', url: 'https://nxmplis.com/contact', images: [{ url: '/anvaya-product.webp' }] },
};
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
