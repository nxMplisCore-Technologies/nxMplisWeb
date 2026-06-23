import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  products: [
    { href: '/anvaya#core', label: 'Anvaya CORE' },
    { href: '/anvaya#sense', label: 'Anvaya SENSE' },
    { href: '/anvaya#pulse', label: 'Anvaya PULSE' },
    { href: '/anvaya#omni', label: 'Anvaya OMNI' },
    { href: '/early-access', label: 'Early Access' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/technology', label: 'Our Technology' },
    { href: '/industries', label: 'Industries' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/contact', label: 'WhatsApp Support' },
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Shipping Policy' },
  ],
};

export function Footer({ className = '' }: { className?: string }) {
  return (
    <footer className={`bg-[#172720] text-white ${className}`}>
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold mb-1">
              ANVAYA <span style={{color:'#e8957a'}}>SMART</span>
            </div>
            <p className="text-sm font-medium mb-3" style={{color:'#7aab9e'}}>Smart Care. Gentle Beginnings.</p>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Contactless AI baby monitoring. Because every breath matters.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors" style={{background:'rgba(255,255,255,0.06)'}}>
                  <Icon className="w-4 h-4 text-white/60" />
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{color:'#7aab9e'}}>Products</h3>
            <ul className="space-y-2.5">
              {footerLinks.products.map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{color:'#7aab9e'}}>Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support + CTA */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{color:'#7aab9e'}}>Support</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.support.map(l => (
                <li key={l.label}><Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/early-access" className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg" style={{background:'#4a7c6f',color:'#fff'}}>
              ✦ Get Early Access
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Nxmliscore, Inc. All rights reserved.</p>
          <p>Anvaya Smart™ — Made with care in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
