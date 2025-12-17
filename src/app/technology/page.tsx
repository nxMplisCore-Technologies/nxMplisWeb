import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

const principles = [
  {
    icon: CheckCircle,
    name: 'Contactless and Non-Intrusive',
    description: 'Our technology gathers insights without ever touching the skin or disrupting natural routines. We believe wellness monitoring should be invisible and effortless.',
    imageUrl: 'https://picsum.photos/seed/contactless/600/400',
    dataAiHint: 'soft fabric',
  },
  {
    icon: ShieldCheck,
    name: 'Baby-Safe and Privacy-First',
    description: 'Safety is our highest priority. We use only baby-safe materials and methods, and all data processing happens locally on the device. Your family’s data stays private, always.',
    imageUrl: 'https://picsum.photos/seed/privacy-lock/600/400',
    dataAiHint: 'secure lock',
  },
  {
    icon: HeartHandshake,
    name: 'Calm by Design',
    description: 'We believe technology should reduce anxiety, not create it. Our systems are designed to be quiet observers, providing reassurance and information without unnecessary alarms or notifications.',
    imageUrl: 'https://picsum.photos/seed/calm-design/600/400',
    dataAiHint: 'zen garden',
  }
];

export default function TechnologyPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Our Design Philosophy
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Nxmliscore is built on a foundation of responsible innovation. Our technology is thoughtfully engineered to be calm, respectful, and purposeful, supporting users without being intrusive.
        </p>
      </header>

      <div className="space-y-24">
        {principles.map((principle, index) => (
          <section key={principle.name} id={`principle-${index}`} className="scroll-mt-20">
            <Card className="overflow-hidden border-border/50">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}>
                <div className={`p-8 sm:p-12 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium mb-4">
                    <principle.icon className="w-5 h-5" />
                    <span>{principle.name}</span>
                  </div>
                  <p className="text-lg text-muted-foreground">{principle.description}</p>
                </div>
                 <div className="relative h-64 lg:h-full min-h-[300px]">
                  <Image
                    src={principle.imageUrl}
                    alt={principle.name}
                    fill
                    className="object-cover"
                    data-ai-hint={principle.dataAiHint}
                  />
                </div>
              </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
}
