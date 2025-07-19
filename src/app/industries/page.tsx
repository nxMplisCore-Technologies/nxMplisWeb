import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPulse, DollarSign, Car, Home, Shield } from 'lucide-react';

const industriesData = [
  {
    value: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    title: "AI-Powered Predictive Health",
    description: "Our ultra-low-power processors enable real-time analysis of biometric data in wearables and medical devices. From continuous glucose monitoring to early cardiac anomaly detection, we empower proactive healthcare at the edge, ensuring patient data privacy and immediate insights.",
    imageUrl: "https://placehold.co/1200x800",
    dataAiHint: "medical technology",
  },
  {
    value: "fintech",
    name: "Fintech",
    icon: DollarSign,
    title: "Instant & Secure Transactions",
    description: "In a world of instant payments, security cannot be an afterthought. nxMplisCore's technology provides on-device biometric authentication and real-time fraud detection, securing financial transactions at the point of interaction without relying on slow cloud connections.",
    imageUrl: "https://placehold.co/1200x800",
    dataAiHint: "financial technology",
  },
  {
    value: "automotive",
    name: "Automotive",
    icon: Car,
    title: "Accelerating Autonomous Systems",
    description: "The autonomous vehicle requires processing vast amounts of sensor data with near-zero latency. Our solutions for sensor fusion and in-cabin monitoring deliver the performance and reliability needed for L4/L5 autonomy, making transportation safer for everyone.",
    imageUrl: "https://placehold.co/1200x800",
    dataAiHint: "autonomous car",
  },
   {
    value: "defense",
    name: "Defense",
    icon: Shield,
    title: "Intelligent Mission-Critical Systems",
    description: "For defense and aerospace, secure, low-power, and robust AI is non-negotiable. Our technology enables intelligent surveillance, autonomous navigation in GPS-denied environments, and on-device data analysis, ensuring a tactical advantage.",
    imageUrl: "https://placehold.co/1200x800",
    dataAiHint: "military drone",
  },
  {
    value: "smart-home",
    name: "Smart Home",
    icon: Home,
    title: "Truly Intuitive Living Spaces",
    description: "Move beyond simple commands to a home that understands and anticipates needs. Our chips power advanced, on-device natural language processing and activity recognition, creating a responsive and private smart home experience without constant data uploads.",
    imageUrl: "https://placehold.co/1200x800",
    dataAiHint: "smart home",
  },
];

export default function IndustriesPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">
          Industry-Specific Solutions
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          We architect our technology to meet the unique, high-stakes demands of leaders across critical sectors.
        </p>
      </header>

      <Tabs defaultValue="healthcare" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
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
