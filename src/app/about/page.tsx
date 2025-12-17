import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Microscope, PencilRuler, HeartHandshake } from 'lucide-react';

const partnerships = [
    {
        name: "BITS Hyderabad",
        description: "Partnering on flexible sensor materials and advanced sensing technologies."
    },
    {
        name: "SASTRA University, Thanjavur",
        description: "Home to our research and development laboratory, supporting long-term research in wellness sensing and signal interpretation."
    }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      {/* Who We Are */}
      <section id="who-we-are" className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Nxmliscore is a wellness technology company focused on understanding human signals across different stages of life. We build intelligent, non-intrusive systems that listen to subtle physiological and behavioral cues — transforming them into meaningful insights that support care, confidence, and well-being.
        </p>
         <p className="text-lg text-muted-foreground mt-4">
            Founded by IIT alumni, Nxmliscore combines deep engineering expertise, applied research, and human-centered design to create technology that feels calm, respectful, and purposeful.
        </p>
      </section>

      {/* Research Foundations */}
      <section id="research" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Built on Strong Research Foundations</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Our work is grounded in active academic collaboration and applied research. These partnerships ensure our products are built on science, not assumptions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {partnerships.map((partner) => (
                 <Card key={partner.name} className="bg-card/50">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-md">
                               <Microscope className="w-6 h-6 text-primary"/>
                            </div>
                            <CardTitle className="font-headline text-xl">{partner.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground">{partner.description}</p>
                    </CardContent>
                 </Card>
            ))}
        </div>
      </section>
      
      {/* Design Philosophy */}
      <section id="design">
         <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Designed with Responsibility</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Technology should reduce anxiety, not create it. Our design philosophy is centered on this belief.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 bg-card/50">
                <PencilRuler className="w-10 h-10 text-primary mx-auto mb-4"/>
                <h3 className="font-headline text-lg font-semibold">Contactless & Non-Intrusive</h3>
            </Card>
            <Card className="text-center p-6 bg-card/50">
                <HeartHandshake className="w-10 h-10 text-primary mx-auto mb-4"/>
                <h3 className="font-headline text-lg font-semibold">Baby-Safe & Privacy-First</h3>
            </Card>
            <Card className="text-center p-6 bg-card/50">
                <div className="mx-auto w-10 h-10 text-primary mb-4 text-3xl font-bold">!</div>
                <h3 className="font-headline text-lg font-semibold">Calm By Design</h3>
                <p className="text-sm text-muted-foreground">No unnecessary alarms.</p>
            </Card>
        </div>
      </section>

    </div>
  );
}
