import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Shield, GitBranch, Users, BrainCircuit, Baby } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const features = [
  {
    icon: Baby,
    title: 'Crying Patterns',
    description: 'Understands the difference between a hungry cry and a tired cry.',
  },
  {
    icon: GitBranch,
    title: 'Breathing Rhythms',
    description: 'Monitors subtle changes in breathing without any physical contact.',
  },
  {
    icon: Heart,
    title: 'Body Temperature',
    description: 'Keeps track of temperature fluctuations to ensure comfort.',
  },
  {
    icon: BrainCircuit,
    title: 'Sleep Movement',
    description: 'Learns sleep cycles and helps identify patterns for better rest.',
  },
];

const benefits = [
    {
        title: "No Wearables",
        description: "Anvaya is completely contactless. Nothing touches your baby's skin."
    },
    {
        title: "No Harsh Lights",
        description: "Designed to be unobtrusive, with no bright lights to disturb sleep."
    },
    {
        title: "Privacy First",
        description: "All processing happens on the device. Your family's data stays private."
    }
]

export default function AnvayaPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Section */}
      <section className="relative text-center py-24 sm:py-32 md:py-40 bg-card/30">
         <div className="absolute inset-0 overflow-hidden">
            <Image 
                src="https://picsum.photos/seed/baby-hero/1800/1000" 
                alt="A peaceful nursery scene" 
                fill
                className="object-cover opacity-20"
                data-ai-hint="nursery background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">Anvaya Mini™</h1>
          <p className="text-2xl md:text-4xl font-headline text-foreground mb-6">AI that understands baby signals</p>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            A quiet guardian that listens, learns, and helps you understand your baby — from cries to sleep — with care and calm.
          </p>
        </div>
      </section>

      {/* 2. The Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Babies speak long before they talk.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Through cries. Through breath. Through movement. Through sleep. Parents listen — but often have to guess. Anvaya was created to bridge that gap. To turn uncertainty into understanding. To support instinct with intelligence.
          </p>
        </div>
      </section>

      {/* 3. What We Listen To */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">The Language of a Baby</h2>
            <p className="text-lg text-muted-foreground">A baby doesn’t speak in words. They speak in signals. Anvaya listens to these subtle cues — gently, contactlessly — and learns what they mean for your baby.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center bg-card border-border/50">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 & 5. How it Helps & Design */}
      <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/seed/anvaya-device/600/800" alt="Anvaya Mini device in a nursery" fill className="object-cover" data-ai-hint="modern baby monitor" />
                </div>
                 <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Calm, Not Control</h2>
                    <p className="text-lg text-muted-foreground mb-10">Anvaya doesn’t alarm. It reassures. It quietly observes, learns patterns, and notifies you only when something truly needs attention. So nights feel softer, decisions feel clearer, and care feels more confident.</p>
                    
                    <h3 className="text-2xl font-bold font-headline mb-6">Designed for Gentle Parenting</h3>
                    <ul className="space-y-4">
                        {benefits.map(benefit => (
                            <li key={benefit.title} className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-semibold">{benefit.title}</h4>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                     <p className="mt-6 text-muted-foreground italic">Technology that feels human. Care that feels natural.</p>
                </div>
            </div>
        </div>
      </section>

      {/* 6. Intelligence */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="lg:order-last relative h-96 rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/seed/baby-learning/800/600" alt="Graph showing learning patterns" fill className="object-cover" data-ai-hint="data visualization" />
                </div>
                 <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Intelligence That Grows With Your Baby</h2>
                    <p className="text-lg text-muted-foreground">Every baby is unique. So Anvaya learns over time. It adapts to your baby’s rhythms, patterns, and signals — becoming more intuitive, more personal, and more helpful with each day.</p>
                    <p className="mt-4 text-xl font-semibold">Understanding deepens. Confidence grows.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* 7. For Parents, Caregivers, Doctors */}
       <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">For Parents. For Caregivers. For Doctors.</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Anvaya supports early awareness and informed conversations, without replacing human care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
            <div className="bg-card p-6 rounded-lg"><strong className="text-primary">For parents:</strong> peace of mind.</div>
            <div className="bg-card p-6 rounded-lg"><strong className="text-primary">For caregivers:</strong> clarity.</div>
            <div className="bg-card p-6 rounded-lg"><strong className="text-primary">For doctors:</strong> meaningful insights.</div>
          </div>
           <p className="mt-8 text-muted-foreground italic">Because technology should assist — not replace — love and judgment.</p>
        </div>
      </section>


      {/* 8 & 9. The Promise & Closing */}
      <section className="py-24 sm:py-32 bg-gradient-to-t from-primary/20 via-transparent to-transparent">
        <div className="container mx-auto px-4 text-center">
            <p className="text-xl text-muted-foreground mb-8">We believe parenting doesn’t need more noise. It needs better listening. <br/> We believe every baby deserves to be understood. And every parent deserves to feel supported.</p>
          <h2 className="text-3xl md:text-5xl font-bold font-headline text-primary mb-4">Anvaya Mini™</h2>
          <p className="text-2xl md:text-3xl font-headline text-foreground">
            When you understand, you care better.
          </p>
        </div>
      </section>
    </div>
  );
}
