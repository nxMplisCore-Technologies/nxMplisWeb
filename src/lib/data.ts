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
    imageUrl: '/anvaya-product.png',
    dataAiHint: 'futuristic technology',
    excerpt: 'Traditional computing is hitting a wall—literally. The Von Neumann bottleneck, the separation of processing and memory, is limiting the potential of AI. Discover how Compute-in-Memory (CIM) is smashing that wall.',
    content: `
      <p>Traditional computing architectures, based on the Von Neumann model, have served us well for decades. However, with the exponential growth of data in the AI era, the constant shuffling of data between the CPU and memory has become a critical performance and energy bottleneck. This is often referred to as the "memory wall."</p>
      <p>At Nxmliscore, we are pioneering a new paradigm: Compute-in-Memory (CIM). By embedding computational logic directly within the memory cells, we can perform massively parallel operations right where the data is stored. This eliminates the need for energy-intensive data movement, leading to orders-of-magnitude improvements in both speed and power efficiency.</p>
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
    imageUrl: '/anvaya-features.png',
    dataAiHint: 'abstract brain',
    excerpt: 'What if AI could learn and process information like the human brain? Neuromorphic computing makes this possible, offering incredible efficiency for real-world applications.',
    content: `
      <p>The human brain is the most efficient learning machine known. It consumes only about 20 watts of power yet can perform incredibly complex tasks. At Nxmliscore, we draw inspiration from this biological marvel to build our neuromorphic processors.</p>
      <p>Unlike traditional AI that processes data in batches, our neuromorphic chips are event-driven. They operate using Spiking Neural Networks (SNNs), which compute only when new information—a "spike"—arrives. This asynchronous, sparse processing model is exceptionally efficient for handling real-time sensory data from cameras, microphones, and other sensors.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">Why Neuromorphic is the Future:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Continuous Learning:</strong> Our chips can learn on-the-fly, adapting to new patterns and environments without being retrained in the cloud.</li>
        <li><strong>Low-Power Sensing:</strong> Ideal for "always-on" applications, as the chip only consumes power when relevant events occur.</li>
        <li><strong>Robustness and Resilience:</strong> The distributed nature of neural processing makes our systems inherently resilient to noise and hardware faults.</li>
      </ul>
      <p class="mt-4">From smart home devices that recognize voices to autonomous drones that navigate complex terrains, neuromorphic computing is paving the way for a new generation of truly intelligent systems.</p>
    `
  },
   {
    slug: 'calm-technology-parenting',
    title: 'Calm Technology: A New Philosophy for Parenting in the Digital Age',
    author: 'Aisha Khan',
    date: '2024-06-18',
    imageUrl: '/anvaya-lifestyle.png',
    dataAiHint: 'peaceful home',
    excerpt: 'Parenting today is noisy. Apps, alarms, and notifications constantly demand our attention. What if technology could do the opposite? What if it could foster calm?',
    content: `
      <p>The promise of "smart" parenting technology was to make life easier. Instead, it often adds to the cognitive load of parents, creating a source of constant anxiety with a barrage of data and notifications. At Nxmliscore, we believe in a different approach, one inspired by the principles of "calm technology."</p>
      <p>Calm technology, a term coined by researchers Mark Weiser and John Seely Brown, describes technology that seamlessly integrates into our lives, providing information without demanding our focused attention. It operates in the background, assisting when needed and staying out of the way when not. This is the philosophy behind Anvaya.</p>
      <h3 class="font-headline text-xl font-semibold mt-6 mb-2">How Anvaya Embodies Calm Technology:</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Information, Not Interruption:</strong> Anvaya doesn't stream a constant feed of video or data. It observes quietly, learning your baby's unique patterns. It notifies you with gentle insights, not jarring alarms, turning data into reassurance.</li>
        <li><strong>Peripheral Awareness:</strong> You don't need to stare at a screen to know things are okay. Anvaya is a quiet guardian. It's designed to give you peace of mind so you can be more present with your child.</li>
        <li><strong>Human-Centered Design:</strong> The goal isn't to replace parental intuition; it's to support it. Anvaya provides context to what you're already sensing, helping you turn a guess into a confident decision.</li>
      </ul>
      <p class="mt-4">We believe the best technology doesn't shout for your attention. It gives you your attention back. By designing for calm, we hope to support a more peaceful, confident, and connected parenting experience.</p>
    `
  }
];
