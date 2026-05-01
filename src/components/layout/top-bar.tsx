import Link from 'next/link';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export function TopBar() {
  return (
    <div className="w-full bg-primary text-white text-sm py-2 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        <div className="flex items-center gap-5 flex-wrap">
          <a href="tel:+917987449366" className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>+91 79874 49366</span>
          </a>
          <a href="mailto:admin@nxmlis.com" className="hidden sm:flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>admin@nxmlis.com</span>
          </a>
          <a
            href="https://wa.me/917987449366"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 hover:text-white/80 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>WhatsApp Us</span>
          </a>
        </div>
        <Link
          href="/contact"
          className="bg-white text-primary text-xs font-bold px-4 py-1 rounded-full hover:bg-white/90 transition-colors shrink-0"
        >
          📋 Contact &amp; Survey →
        </Link>
      </div>
    </div>
  );
}
