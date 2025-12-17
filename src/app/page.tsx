import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Baby, User, HeartHandshake, Microscope } from 'lucide-react';

const careSegments = [
  {
    icon: Baby,
    title: 'Baby Care',
    description: 'Our journey begins here, where listening matters most. We help parents understand their baby’s needs with clarity and calm.'
  },
  {
    icon: User,
    title: 'Adult Care',
    description: 'Future solutions will extend to proactive and non-intrusive monitoring to support adult wellness and independent living.'
  },
  {
    icon: HeartHandshake,
    title: 'Elder Care',
    description: 'We envision a future where technology supports graceful aging, providing dignity, safety, and connection for our elders.'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-24 sm:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
            Wellness technology, built to listen.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Nxmliscore builds intelligent, non-intrusive systems that listen to subtle human signals — transforming them into meaningful insights that support care, confidence, and well-being.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link href="/anvaya">Explore Anvaya™ <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Nxmliscore</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/technology">Our Research</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Wellness Focus Section */}
      <section id="wellness-focus" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Wellness Evolves With Life</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our long-term vision spans three core care segments, guided by a single philosophy: care begins with understanding, not intrusion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careSegments.map((segment) => (
              <Card key={segment.title} className="bg-card border-border/50 text-center">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <segment.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{segment.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{segment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Anvaya Intro Section */}
      <section id="anvaya-intro" className="py-20">
          <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                      <Image src="https://picsum.photos/seed/anvaya-product/800/600" alt="Anvaya Mini product" fill className="object-cover" data-ai-hint="modern baby monitor" />
                  </div>
                   <div>
                      <h2 className="text-sm font-bold uppercase text-primary tracking-widest mb-2">Our Baby Care Product Line</h2>
                      <h3 className="text-3xl md:text-4xl font-bold font-headline mb-4">Anvaya™</h3>
                      <p className="text-lg text-muted-foreground mb-6">Babies communicate long before they speak. Anvaya translates their early signals—cries, sleep patterns, breathing, and movement—into insights that support confident caregiving.</p>
                      <p className="text-lg font-semibold text-foreground">Every cry has a story. Anvaya helps you listen.</p>
                      <Button asChild size="lg" className="mt-8">
                        <Link href="/anvaya">Learn about Anvaya Mini™</Link>
                      </Button>
                  </div>
              </div>
          </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/80 to-primary/50 rounded-lg p-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary-foreground mb-4">Join Our Journey</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We are a team of engineers, researchers, and human-centered designers. If you are passionate about building technology that cares, we invite you to connect with us.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-black">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
