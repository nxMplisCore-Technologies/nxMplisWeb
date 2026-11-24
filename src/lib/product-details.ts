// Model-specific details for the /anvaya/{model} pages.
// Source of truth: the Shopify product descriptions (anvayasmart.myshopify.com), Nov 2026.
// Keep these in sync when the Shopify listing changes.

export interface ProductDetail {
  intro: string[];
  specs: { label: string; value: string }[];
  perfectFor: string;
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const common = {
  certs: 'CE, FCC and RoHS certified',
  storage: 'TF card + cloud storage and playback',
  power: 'USB Type-C power',
  app: 'Anvaya Smart app (Android & iOS)',
};

export const productDetails: Record<'core' | 'pulse' | 'omni', ProductDetail> = {
  core: {
    intro: [
      'Anvaya CORE is the simplest way to start with a smart baby monitor. A 1080P Full HD camera with night vision streams to the Anvaya Smart app, so you can see, hear and talk to your baby from your phone, whether you are in the kitchen, the shower or the office.',
      'Pan 355° and tilt 120° from the app to cover the whole nursery, and connect up to 4 cameras to watch several rooms in split-screen view. Two-way audio runs over an encrypted, private connection.',
      'CORE also shows room temperature and humidity, plays 8 built-in lullabies at 10 volume levels, and reminds you when the next feed is due. It is CE, FCC and RoHS certified, and every feature works without a subscription.',
    ],
    specs: [
      { label: 'Camera', value: '1080P Full HD with night vision' },
      { label: 'Coverage', value: 'Pan 355° · Tilt 120° · up to 4 cameras in split screen' },
      { label: 'Viewing', value: 'Smartphone app (no parent display)' },
      { label: 'Alerts', value: 'Cry & noise detection, motion detection' },
      { label: 'Audio', value: 'Two-way talk, 8 lullabies, 10 volume levels' },
      { label: 'Room', value: 'Temperature & humidity monitoring' },
      { label: 'Extras', value: 'Feeding reminders' },
      { label: 'Storage', value: common.storage },
      { label: 'Power', value: common.power },
      { label: 'Certification', value: common.certs },
      { label: 'Subscription', value: 'Not required' },
      { label: 'Warranty & returns', value: '1-year warranty · 7-day returns' },
    ],
    perfectFor: 'First-time parents who want reliable HD monitoring with easy setup, right on their phone, without complexity.',
    faqs: [
      { q: 'Does Anvaya CORE have a parent display?', a: 'No. CORE is viewed on the Anvaya Smart app on your phone. If you want a dedicated 5.5-inch parent display, choose PULSE or OMNI.' },
      { q: 'Can I connect more than one CORE camera?', a: 'Yes. You can connect up to 4 cameras and watch them in split-screen view in the app.' },
      { q: 'Does CORE have AI face-cover or tummy-sleep alerts?', a: 'No. CORE gives cry, noise and motion alerts. AI face-cover and tummy-sleep alerts come with PULSE and OMNI.' },
      { q: 'Do I need a subscription for CORE?', a: 'No. Every feature works without a subscription. You can record to a TF card or use cloud storage.' },
    ],
    related: [
      { label: 'Compare CORE vs PULSE vs OMNI', href: '/compare' },
      { label: 'Best baby monitor India buying guide', href: '/blog/best-baby-monitor-india-2025' },
      { label: 'The Anvaya Smart app', href: '/baby-wellness-app' },
    ],
  },
  pulse: {
    intro: [
      'Anvaya PULSE adds AI that watches what you can\'t, even while you sleep. Its on-device AI looks for two common infant sleep risks, a covered face and prone (tummy) sleep, and alerts you on the parent unit and the app the moment it sees one.',
      'A 4MP camera with night vision pans 355° and tilts 120°, and you can watch on the app or the optional 5.5-inch parent display. Draw a danger zone around stairs or a balcony door and PULSE alerts you when your baby crosses it.',
      'PULSE also tracks room temperature and humidity, plays 8 lullabies, reminds you about feeds, captures a timeline album of milestones and has a dimmable night light. It is CE, FCC and RoHS certified with no subscription needed. PULSE is a safety monitor, not a medical device, and does not replace safe-sleep practices or adult supervision.',
    ],
    specs: [
      { label: 'Camera', value: '4MP with night vision' },
      { label: 'Coverage', value: 'Pan 355° · Tilt 120°' },
      { label: 'Viewing', value: 'Smartphone app, or 5.5-inch parent monitor (720P, 4000mAh battery)' },
      { label: 'AI alerts', value: 'Face-covering detection, prone (tummy) sleep detection' },
      { label: 'Zones', value: 'Electronic barrier (geofence) + danger zone alert' },
      { label: 'Other alerts', value: 'Cry & noise detection, motion detection' },
      { label: 'Audio', value: 'Two-way talk, 8 lullabies, 10 volume levels' },
      { label: 'Room', value: 'Temperature & humidity monitoring, dimmable night light' },
      { label: 'Extras', value: 'Feeding reminders, automatic timeline album' },
      { label: 'Storage', value: common.storage },
      { label: 'Power', value: common.power },
      { label: 'Certification', value: common.certs },
      { label: 'Warranty & returns', value: '1-year warranty · 7-day returns' },
    ],
    perfectFor: 'Parents who want AI safety beyond basic monitoring, especially during the newborn phase.',
    faqs: [
      { q: 'What does the PULSE face-cover alert do?', a: 'PULSE\'s on-device AI recognises when something, like a blanket or toy, covers your baby\'s face and sends an alert to the parent unit and your phone.' },
      { q: 'Does PULSE track breathing or heart rate?', a: 'No. PULSE is a camera monitor with AI safety alerts. For contactless breathing and heart-rate tracking, choose OMNI, which includes every PULSE feature.' },
      { q: 'Can I use PULSE without the parent display?', a: 'Yes. PULSE is available without the display (from ₹8,900) and works fully on the Anvaya Smart app, or with the 5.5-inch display (₹15,999).' },
      { q: 'Is PULSE a medical device?', a: 'No. PULSE is a safety and convenience monitor. It does not replace safe-sleep practices or adult supervision.' },
    ],
    related: [
      { label: 'What an AI baby monitor does', href: '/ai-baby-monitor-india' },
      { label: 'Compare CORE vs PULSE vs OMNI', href: '/compare' },
      { label: 'Best baby monitor India buying guide', href: '/blog/best-baby-monitor-india-2025' },
    ],
  },
  omni: {
    intro: [
      'Anvaya OMNI is the most advanced Anvaya monitor. It does everything PULSE does and adds real-time breathing and heart-rate tracking, deep sleep analysis and one-click calling, all without a single sensor touching your baby.',
      'Radar-based sensing tracks respiration and heart rate continuously through the night, with no patch, strap or sock. Each morning you get a sleep report with total sleep time, light vs deep sleep and a nightly sleep score.',
      'Every PULSE safety feature comes standard: AI face-covering and prone-sleep alerts, danger zones, a 4MP night-vision camera and the optional 5.5-inch parent display. OMNI is CE, FCC and RoHS certified, needs no subscription, and is a wellness monitor, not a medical device.',
    ],
    specs: [
      { label: 'Breathing & heart rate', value: 'Contactless, real-time (radar-based sensing)' },
      { label: 'Sleep', value: 'Deep sleep tracking and nightly sleep report' },
      { label: 'Camera', value: '4MP with night vision' },
      { label: 'Viewing', value: 'Smartphone app, or 5.5-inch parent monitor (720P, 4000mAh battery)' },
      { label: 'AI alerts', value: 'Face-covering detection, prone (tummy) sleep detection' },
      { label: 'Zones', value: 'Electronic barrier (geofence) + danger zone alert' },
      { label: 'Other alerts', value: 'Cry & noise detection, motion detection' },
      { label: 'Calling', value: 'One-click family calling' },
      { label: 'Audio & room', value: 'Two-way talk, lullabies, temperature & humidity' },
      { label: 'Extras', value: 'Automatic timeline album' },
      { label: 'Storage', value: common.storage },
      { label: 'Power', value: common.power },
      { label: 'Certification', value: common.certs },
      { label: 'Warranty & returns', value: '1-year warranty · 7-day returns' },
    ],
    perfectFor: 'Parents of newborns who want extra peace of mind: breathing, heart rate and sleep tracked every night, without a single sensor on the baby.',
    faqs: [
      { q: 'How does OMNI track breathing without touching my baby?', a: 'OMNI uses radar-based sensing to pick up the tiny movements of breathing and heartbeat from beside the cot. Nothing is attached to your baby: no sock, band or patch.' },
      { q: 'What is in the OMNI sleep report?', a: 'Each morning OMNI shows total sleep time, light vs deep sleep and a nightly sleep score in the app.' },
      { q: 'Does OMNI include the PULSE AI alerts?', a: 'Yes. OMNI includes every PULSE feature: AI face-cover and tummy-sleep alerts, danger zones, the 4MP camera and the optional parent display.' },
      { q: 'Is OMNI a medical device?', a: 'No. OMNI is a wellness and convenience monitor. It does not diagnose or prevent any medical condition, including SIDS. Always follow safe-sleep advice from your paediatrician.' },
    ],
    related: [
      { label: 'How a contactless baby monitor works', href: '/contactless-baby-monitor-india' },
      { label: 'Normal baby breathing patterns', href: '/blog/baby-breathing-patterns' },
      { label: 'Compare CORE vs PULSE vs OMNI', href: '/compare' },
    ],
  },
};
