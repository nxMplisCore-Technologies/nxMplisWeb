import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Nxmpliscore',
  description: 'Join Nxmpliscore in Hyderabad and help build Anvaya Smart, AI baby monitors made for Indian families. See open roles.',
  alternates: { canonical: 'https://nxmplis.com/careers' },
  openGraph: {
    title: 'Careers at Nxmpliscore',
    description: 'Join Nxmpliscore in Hyderabad and help build Anvaya Smart, AI baby monitors made for Indian families. See open roles.',
    url: 'https://nxmplis.com/careers',
    images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Careers at Nxmpliscore' }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
