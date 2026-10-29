'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles, Brain, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/icons';
import { cn } from '@/lib/utils';

const productLines = [
  {
    href: '/anvaya',
    label: 'Anvaya Smart',
    sub: 'Baby wellness pods · CORE · PULSE · OMNI',
    emoji: '👶',
    color: '#4a7c6f',
  },
  {
    href: '/soma',
    label: 'Soma Sleep',
    sub: 'Adult sleep wellness · HUSH · NEST · ZEN',
    emoji: '🌙',
    color: '#5b4fcf',
  },
];

const navLinks = [
  { href: '/use-cases', label: 'Use Cases' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 20);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isProductsActive = pathname?.startsWith('/anvaya') || pathname?.startsWith('/soma');

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300',
      scrolled ? 'bg-white/98 shadow-sm' : 'bg-white/95'
    )}>
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150" style={{ width: `${progress}%` }} />
      <div className={cn('container mx-auto px-4 flex items-center transition-all duration-300', scrolled ? 'h-14' : 'h-16')}>
        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {/* Products dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProductsOpen(v => !v)}
              className={cn(
                'flex items-center gap-1 px-3 py-2.5 rounded-lg transition-colors hover:text-primary hover:bg-primary/5',
                isProductsActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Products
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', productsOpen && 'rotate-180')} />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl border border-[#e2dbd4] shadow-xl p-2 z-50">
                {productLines.map(line => (
                  <Link key={line.href} href={line.href}
                    onClick={() => setProductsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#faf8f5] transition-colors group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${line.color}15` }}>
                      {line.emoji}
                    </div>
                    <div>
                      <div className="font-semibold text-sm group-hover:text-primary transition-colors" style={{ color: pathname?.startsWith(line.href) ? line.color : undefined }}>
                        {line.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{line.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn(
                'px-3 py-2.5 rounded-lg transition-colors hover:text-primary hover:bg-primary/5',
                pathname?.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <Button asChild variant="outline" className="hidden md:flex gap-1.5 border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all">
            <Link href="/quiz"><Brain className="w-3.5 h-3.5" />Find My Pod</Link>
          </Button>
          <Button asChild className="hidden md:flex gap-1.5 font-bold shadow-lg px-5 text-white" style={{background:'linear-gradient(135deg,#e8957a,#d4784a)', boxShadow:'0 4px 20px rgba(232,149,122,0.45)'}}>
            <Link href="/preorder"><Sparkles className="w-3.5 h-3.5" />Join Founding Families</Link>
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden h-11 w-11 p-0">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <Link href="/" onClick={() => setIsOpen(false)} className="self-start"><Logo /></Link>
              </SheetHeader>
              <div className="flex flex-col p-4 space-y-1">
                {/* Mobile product lines */}
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 pb-1 pt-2">Products</div>
                {productLines.map(line => (
                  <Link key={line.href} href={line.href} onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 py-2.5 px-2 rounded-xl min-h-[52px] transition-colors hover:bg-primary/5',
                      pathname?.startsWith(line.href) ? 'bg-primary/5' : ''
                    )}
                  >
                    <span className="text-xl">{line.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm">{line.label}</div>
                      <div className="text-[10px] text-muted-foreground">{line.sub}</div>
                    </div>
                  </Link>
                ))}
                <div className="h-px bg-[#e2dbd4] my-2" />
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors hover:text-primary py-3 px-2 rounded-xl min-h-[52px] flex items-center hover:bg-primary/5',
                      pathname?.startsWith(link.href) ? 'text-primary bg-primary/5' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild size="lg" className="mt-2 w-full font-bold text-white" style={{background:'linear-gradient(135deg,#e8957a,#d4784a)'}}>
                  <Link href="/preorder" onClick={() => setIsOpen(false)}><Sparkles className="w-4 h-4 mr-1" />Join Founding Families</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full border-primary text-primary font-semibold">
                  <Link href="/quiz" onClick={() => setIsOpen(false)}><Brain className="w-4 h-4 mr-1" />Find My Pod — Take Quiz</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
