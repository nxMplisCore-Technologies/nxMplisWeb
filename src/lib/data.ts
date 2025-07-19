import type { LucideIcon } from "lucide-react";
import { Cpu, BrainCircuit, Bot, Database } from "lucide-react";

export const TEAM_MEMBERS = [
  { name: 'Dr. Evelyn Reed', role: 'CEO & Chief Architect', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'woman portrait' },
  { name: 'Kenji Tanaka', role: 'Head of Neuromorphic Engineering', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'man portrait' },
  { name: 'Aisha Khan', role: 'VP of Product', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'woman technology' },
  { name: 'Marco Rossi', role: 'Lead, Compute-in-Memory', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'man professional' },
];

export const ADVISORS = [
  { name: 'Prof. Jian Li', role: 'Pioneer in Analog AI', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'professor portrait' },
  { name: 'David Chen', role: 'Venture Partner, TechGrowth Capital', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'investor professional' },
];

export const TECHNOLOGIES: {
  id: string;
  icon: LucideIcon;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  features: { name: string; description: string }[];
}[] = [
  {
    id: 'cim',
    icon: Cpu,
    name: 'Compute-in-Memory (CIM)',
    subtitle: 'Breaking the Von Neumann Bottleneck.',
    description: 'Our CIM technology integrates processing units directly into the memory array, eliminating the costly data shuffling between CPU and memory. This results in up to 100x improvement in energy efficiency and performance for data-intensive AI workloads.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'circuit board',
    features: [
      { name: 'Ultra-Low Latency', description: 'Processes data in-situ, drastically reducing access times.' },
      { name: 'Massive Parallelism', description: 'Performs millions of operations simultaneously across the memory array.' },
      { name: 'Energy Efficiency', description: 'Minimizes data movement, the primary consumer of power in traditional systems.' },
    ],
  },
  {
    id: 'neuromorphic',
    icon: BrainCircuit,
    name: 'Neuromorphic Computing',
    subtitle: 'AI that Learns and Adapts.',
    description: 'Inspired by the architecture of the human brain, our neuromorphic chips use event-based, spiking neural networks (SNNs). This approach is ideal for real-time sensory data processing and continuous learning applications, offering unparalleled efficiency.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'neural network',
    features: [
      { name: 'Event-Driven Processing', description: 'Computes only when new information arrives, saving significant power.' },
      { name: 'On-chip Learning', description: 'Adapts to new data without needing to reconnect to the cloud.' },
      { name: 'Fault Tolerant', description: 'Mimics the brain\'s resilience, ensuring robust operation in challenging environments.' },
    ],
  },
  {
    id: 'analog-ai',
    icon: Bot,
    name: 'Analog AI',
    subtitle: 'Harnessing Physics for Computation.',
    description: 'We use the fundamental properties of analog circuits to perform complex mathematical operations like matrix-vector multiplications—the core of most AI models—at the speed of light. This provides a significant leap in computational density and speed over digital counterparts.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'abstract technology',
    features: [
      { name: 'Extreme Performance', description: 'Achieves PetaOP-level performance within a tiny power envelope.' },
      { name: 'Scalable Architecture', description: 'Designed for everything from tiny sensors to data center accelerators.' },
      { name: 'Proprietary p-bits', description: 'Our unique probabilistic bits enable novel approaches to solving optimization problems.' },
    ],
  },
];


export const JOBS = [
    { title: 'Senior ASIC Design Engineer', location: 'Remote / San Francisco, CA', type: 'Full-time' },
    { title: 'Staff Neuromorphic Researcher', location: 'Boston, MA', type: 'Full-time' },
    { title: 'AI Compiler Engineer', location: 'Remote', type: 'Full-time' },
    { title: 'Firmware & Systems Engineer', location: 'San Francisco, CA', type: 'Full-time' },
];

export const ARTICLES = [
  {
    slug: 'the-cim-revolution',
    title: 'The Compute-in-Memory Revolution: Beyond the Memory Wall',
    author: 'Dr. Evelyn Reed',
    date: '2024-05-15',
    imageUrl: 'https://placehold.co/800x400',
    dataAiHint: 'futuristic technology',
    excerpt: 'Traditional computing is hitting a wall—literally. The Von Neumann bottleneck, the separation of processing and memory, is limiting the potential of AI. Discover how Compute-in-Memory (CIM) is smashing that wall.',
    content: `
      <p>Traditional computing architectures, based on the Von Neumann model, have served us well for decades. However, with the exponential growth of data in the AI era, the constant shuffling of data between the CPU and memory has become a critical performance and energy bottleneck. This is often referred to as the "memory wall."</p>
      <p>At nxMplisCore, we are pioneering a new paradigm: Compute-in-Memory (CIM). By embedding computational logic directly within the memory cells, we can perform massively parallel operations right where the data is stored. This eliminates the need for energy-intensive data movement, leading to orders-of-magnitude improvements in both speed and power efficiency.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Key Advantages of CIM:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Reduced Latency:</strong> By processing data in-situ, we drastically reduce the time it takes to access and manipulate information.</li>
        <li><strong>Enhanced Parallelism:</strong> Our CIM architecture can execute millions of multiply-accumulate (MAC) operations—the building block of neural networks—simultaneously.</li>
        <li><strong>Superior Energy Efficiency:</strong> With minimal data movement, our chips consume a fraction of the power of traditional digital processors, making them ideal for edge devices.</li>
      </ul>
      <p class="mt-4">This revolutionary approach unlocks new possibilities for real-time AI applications in healthcare, automotive, and defense, where performance and low power are not just desirable, but essential.</p>
    `
  },
  {
    slug: 'brain-inspired-ai',
    title: 'Brain-Inspired AI: The Power of Neuromorphic Computing',
    author: 'Kenji Tanaka',
    date: '2024-06-02',
    imageUrl: 'https://placehold.co/800x400',
    dataAiHint: 'abstract brain',
    excerpt: 'What if AI could learn and process information like the human brain? Neuromorphic computing makes this possible, offering incredible efficiency for real-world applications.',
    content: `
      <p>The human brain is the most efficient learning machine known. It consumes only about 20 watts of power yet can perform incredibly complex tasks. At nxMplisCore, we draw inspiration from this biological marvel to build our neuromorphic processors.</p>
      <p>Unlike traditional AI that processes data in batches, our neuromorphic chips are event-driven. They operate using Spiking Neural Networks (SNNs), which compute only when new information—a "spike"—arrives. This asynchronous, sparse processing model is exceptionally efficient for handling real-time sensory data from cameras, microphones, and other sensors.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Why Neuromorphic is the Future:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Continuous Learning:</strong> Our chips can learn on-the-fly, adapting to new patterns and environments without being retrained in the cloud.</li>
        <li><strong>Low-Power Sensing:</strong> Ideal for "always-on" applications, as the chip only consumes power when relevant events occur.</li>
        <li><strong>Robustness and Resilience:</strong> The distributed nature of neural processing makes our systems inherently resilient to noise and hardware faults.</li>
      </ul>
      <p class="mt-4">From smart home devices that recognize voices to autonomous drones that navigate complex terrains, neuromorphic computing is paving the way for a new generation of truly intelligent systems.</p>
    `
  }
];
