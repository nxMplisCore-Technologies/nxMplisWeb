import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { TECHNOLOGIES } from '@/lib/data';

export default function TechnologyPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Core Technology Stack
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Our vertically integrated stack of proprietary technologies is engineered to solve the fundamental challenges of modern AI computation.
        </p>
      </header>

      <div className="space-y-24">
        {TECHNOLOGIES.map((tech, index) => (
          <section key={tech.id} id={tech.id} className="scroll-mt-20">
            <Card className="overflow-hidden border-border/50">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}>
                <div className={`p-8 sm:p-12 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <tech.icon className="w-4 h-4" />
                    <span>{tech.name}</span>
                  </div>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">{tech.subtitle}</h2>
                  <p className="text-muted-foreground mb-6">{tech.description}</p>
                  <ul className="space-y-4">
                    {tech.features.map(feature => (
                      <li key={feature.name} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                        <div>
                          <h4 className="font-semibold">{feature.name}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                 <div className="relative h-64 lg:h-full min-h-[300px]">
                  <Image
                    src={tech.imageUrl}
                    alt={tech.name}
                    fill
                    className="object-cover"
                    data-ai-hint={tech.dataAiHint}
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
