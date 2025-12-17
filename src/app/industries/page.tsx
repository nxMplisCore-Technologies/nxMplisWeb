import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Baby, User, HeartHandshake } from 'lucide-react';

const industriesData = [
  {
    value: "baby-care",
    name: "Baby Care",
    icon: Baby,
    title: "Understanding Our Youngest",
    description: "Our journey starts with baby care, where non-verbal cues are the primary form of communication. Our technology helps translate these subtle signals into actionable insights for parents and caregivers, fostering a deeper connection and more confident care.",
    imageUrl: "https://picsum.photos/seed/baby-care-main/1200/800",
    dataAiHint: "baby nursery",
  },
  {
    value: "adult-care",
    name: "Adult Care",
    icon: User,
    title: "Proactive & Dignified Wellness",
    description: "For adults, our focus shifts to proactive wellness and maintaining independence. We are developing non-intrusive systems to monitor vital patterns, promoting early awareness of potential health shifts without compromising lifestyle or privacy.",
    imageUrl: "https://picsum.photos/seed/adult-care-main/1200/800",
    dataAiHint: "woman yoga",
  },
  {
    value: "elder-care",
    name: "Elder Care",
    icon: HeartHandshake,
    title: "Supporting Graceful Aging",
    description: "Our technology aims to support the elderly by providing a safety net that respects their dignity and independence. From fall detection to monitoring daily routines for signs of change, we help families and caregivers provide better support, whether near or far.",
    imageUrl: "https://picsum.photos/seed/elder-care-main/1200/800",
    dataAiHint: "elderly hand",
  },
];

export default function IndustriesPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          A Lifetime of Care
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Wellness is not a single event, but a lifelong journey. Our technology is designed to adapt and support individuals through every stage of life, from infancy to the golden years.
        </p>
      </header>

      <Tabs defaultValue="baby-care" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          {industriesData.map(industry => (
            <TabsTrigger key={industry.value} value={industry.value} className="py-3 px-2 flex-col sm:flex-row gap-2">
                <industry.icon className="w-5 h-5" />
                <span>{industry.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {industriesData.map(industry => (
          <TabsContent key={industry.value} value={industry.value} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="relative h-80 lg:h-[450px] rounded-lg overflow-hidden">
                <Image
                  src={industry.imageUrl}
                  alt={`${industry.name} application`}
                  fill
                  className="object-cover"
                  data-ai-hint={industry.dataAiHint}
                />
              </div>
              <div className="space-y-4">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">{industry.title}</h2>
                <p className="text-lg text-muted-foreground">{industry.description}</p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
