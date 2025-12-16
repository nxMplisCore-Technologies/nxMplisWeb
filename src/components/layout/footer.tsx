import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Github, Linkedin, Twitter } from 'lucide-react';

const footerNavs = [
  { href: '/about', label: 'About Us' },
  { href: '/technology', label: 'Technology' },
  { href: '/industries', label: 'Industries' },
  { href: '/blog', label: 'Insights' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4 items-start">
            <Link href="/" aria-label="Back to homepage">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building the next generation of AI accelerators for the edge.
            </p>
            <div className="flex gap-2 mt-2">
              <Link href="#" className="p-2 rounded-md hover:bg-secondary">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-md hover:bg-secondary">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-md hover:bg-secondary">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-headline font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerNavs.slice(0, 3).map(nav => (
                  <li key={nav.label}>
                    <Link href={nav.href} className="text-muted-foreground hover:text-primary transition-colors">{nav.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">Ecosystem</h3>
              <ul className="space-y-2">
                {footerNavs.slice(3, 6).map(nav => (
                  <li key={nav.label}>
                    <Link href={nav.href} className="text-muted-foreground hover:text-primary transition-colors">{nav.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h3 className="font-headline font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} nxMplisCore, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
