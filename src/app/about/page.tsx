import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TEAM_MEMBERS, ADVISORS } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section id="mission" className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Mission</h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          To build the foundational hardware for a future where intelligent computation is ubiquitous, efficient, and secure. We are accelerating the next wave of AI from the data center to the extreme edge.
        </p>
      </section>

      <section id="team" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Leadership Team</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A world-class team of engineers, researchers, and visionaries dedicated to pushing the boundaries of what's possible.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-headline text-lg font-semibold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="advisors">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Advisors & Investors</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Backed by leading minds and strategic capital from the semiconductor and deep-tech industries.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {ADVISORS.map((advisor) => (
                 <Card key={advisor.name} className="bg-card/50 flex flex-col sm:flex-row items-center p-6 gap-6">
                    <Avatar className="w-24 h-24 border-2 border-border">
                        <AvatarImage src={advisor.imageUrl} alt={advisor.name} data-ai-hint={advisor.dataAiHint} />
                        <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-headline text-xl font-semibold">{advisor.name}</h3>
                        <p className="text-muted-foreground">{advisor.role}</p>
                    </div>
                 </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
