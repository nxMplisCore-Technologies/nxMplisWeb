import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, Cpu, Shield, Smartphone, Car, HeartPulse, DollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const technologies = [
  {
    icon: Cpu,
    title: 'Compute-in-Memory',
    description: 'Our revolutionary CIM architecture breaks the memory wall, enabling ultra-fast, low-power processing directly where data lives.',
    link: '/technology#cim',
  },
  {
    icon: BrainCircuit,
    title: 'Neuromorphic Computing',
    description: 'Inspired by the human brain, our neuromorphic chips deliver unparalleled efficiency for complex pattern recognition and AI tasks.',
    link: '/technology#neuromorphic',
  },
  {
    icon: Smartphone,
    title: 'Analog AI',
    description: 'We leverage the power of analog compute to perform massively parallel operations, accelerating AI workloads by orders of magnitude.',
    link: '/technology#analog-ai',
  },
];

const industries: { icon: LucideIcon, title: string, description: string }[] = [
    { icon: HeartPulse, title: 'Healthcare', description: 'Powering real-time diagnostics and personalized medicine on-device.' },
    { icon: DollarSign, title: 'Fintech', description: 'Securing transactions and enabling intelligent fraud detection at the edge.' },
    { icon: Car, title: 'Automotive', description: 'Driving the future of autonomous vehicles with low-latency sensor fusion.' },
    { icon: Shield, title: 'Defense', description: 'Delivering robust, secure, and intelligent capabilities for mission-critical operations.' },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section id="hero" className="container mx-auto px-4 py-24 sm:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">
            Pioneering the Future of Edge AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            nxMplisCore is building the next generation of AI accelerators, delivering unprecedented performance and efficiency for the most demanding applications.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/technology">Explore Technology <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="technology" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Innovations</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We are redefining the limits of computation with our proprietary hardware and software stack.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <Card key={tech.title} className="bg-card border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-md">
                    <tech.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="py-20">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="font-headline text-3xl md:text-4xl font-bold">Powering High-Impact Industries</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">From medical devices to autonomous systems, our technology is designed for mission-critical applications where speed and reliability are paramount.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {industries.map((industry) => (
                    <div key={industry.title} className="text-center flex flex-col items-center">
                        <div className="p-4 bg-card rounded-full mb-4 border border-border">
                            <industry.icon className="w-8 h-8 text-primary"/>
                        </div>
                        <h3 className="font-headline text-lg font-semibold">{industry.title}</h3>
                        <p className="text-muted-foreground text-sm">{industry.description}</p>
                    </div>
                  ))}
              </div>
          </div>
      </section>
      
      <section id="cta" className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/80 to-primary/50 rounded-lg p-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-primary-foreground mb-4">Join the Edge Revolution</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              We are looking for brilliant minds to help us build the future of computing. Explore our open roles and become part of our mission.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-black">
              <Link href="/careers">View Careers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
