import { MEDICAL_REVIEWER } from './reviewer';

// ── JOBS ─────────────────────────────────────────────────────────────────────
export const JOBS = [
  { title: 'AI & ML Engineer — Baby Sensing', location: 'Hyderabad, India', type: 'Full-time' },
  { title: 'Embedded Systems Engineer', location: 'Hyderabad, India', type: 'Full-time' },
  { title: 'Product Designer — Baby Tech', location: 'Remote / Hyderabad', type: 'Full-time' },
  { title: 'Growth & SEO Manager', location: 'Remote', type: 'Full-time' },
];

// ── BLOG ARTICLES ─────────────────────────────────────────────────────────────
export const ARTICLES = [
  {
    slug: 'baby-breathing-patterns',
    title: "Baby Breathing Patterns: What's Normal (India Guide)",
    author: 'Deepak Singh',
    authorTitle: 'Founder, Nxmpliscore · IIT Alumni',
    date: '2025-04-28',
    updatedDate: '2026-11-27',
    medicalReviewer: MEDICAL_REVIEWER,
    category: 'Baby Health',
    readTime: '8 min read',
    imageUrl: '/anvaya-sense.jpg',
    dataAiHint: 'sleeping baby peaceful nursery',
    excerpt: 'Newborn breathing often looks irregular. Normal rates by age, periodic breathing, the WHO fast-breathing cut-offs, and the warning signs that mean you should call a doctor.',
    keywords: ['baby breathing patterns India', 'normal baby breathing rate', 'newborn breathing', 'baby breathing monitor India'],
    content: `
      <h2>What Is a Normal Breathing Rate for a Baby?</h2>
      <p>One of the most common fears for new Indian parents is not knowing whether their baby is breathing normally. Newborns breathe significantly faster than adults — and the pattern is often irregular. This is completely normal.</p>

      <table>
        <thead><tr><th>Age</th><th>Normal Rate</th><th>What to Expect</th></tr></thead>
        <tbody>
          <tr><td>Newborn (0–4 weeks)</td><td>40–60 breaths/min</td><td>Fast and irregular — completely normal</td></tr>
          <tr><td>1–3 months</td><td>35–55 breaths/min</td><td>Periodic pauses of 5–10 seconds are normal</td></tr>
          <tr><td>3–6 months</td><td>30–45 breaths/min</td><td>More regular, smoother pattern</td></tr>
          <tr><td>6–12 months</td><td>25–40 breaths/min</td><td>Closer to toddler breathing</td></tr>
        </tbody>
      </table>

      <h2>What Is Periodic Breathing?</h2>
      <p>Periodic breathing is when your baby briefly pauses breathing for 5–10 seconds, then resumes normally. This is <strong>completely normal</strong> in newborns and is caused by immaturity in the brainstem's breathing control centre. It typically resolves by 3 months.</p>
      <p>If periodic breathing worries you, talk to your paediatrician. They can explain what is normal for your baby.</p>

      <h2>When Does Breathing Count as Too Fast?</h2>
      <p>Doctors use the World Health Organization's fast-breathing cut-offs from its IMCI guidelines, the same ones health workers use across India. Count breaths for a <strong>full 60 seconds</strong> while your baby is calm or asleep, watching the tummy rise, because a baby's breathing speeds up and slows down within a minute.</p>
      <table>
        <thead><tr><th>Baby's age</th><th>Fast breathing (WHO)</th></tr></thead>
        <tbody>
          <tr><td>Under 2 months</td><td>60 or more breaths/min</td></tr>
          <tr><td>2 to 11 months</td><td>50 or more breaths/min</td></tr>
          <tr><td>12 months to 5 years</td><td>40 or more breaths/min</td></tr>
        </tbody>
      </table>
      <p>If a repeat count is at or above the cut-off, or you see any warning sign below, see a doctor the same day. In a baby under 2 months, fast breathing alone is a reason to be seen urgently.</p>
      <p><em>Sources: WHO IMCI fast-breathing thresholds (<a href="https://scielosp.org/pdf/bwho/2003.v81n4/298-300/en" target="_blank" rel="noopener">Bulletin of the WHO, 2003</a>); American Academy of Pediatrics safe-sleep policy (<a href="https://pubmed.ncbi.nlm.nih.gov/35726558/" target="_blank" rel="noopener">Pediatrics, 2022</a>).</em></p>

      <h2>Warning Signs That Need Immediate Attention</h2>
      <ul>
        <li><strong>Breathing pauses longer than 20 seconds</strong> — call emergency services immediately</li>
        <li><strong>Breathing at or above the WHO cut-off for their age</strong> — see a doctor the same day; under 2 months, go urgently</li>
        <li><strong>Nostrils flaring with each breath</strong> — sign of respiratory distress</li>
        <li><strong>Ribs visible during breathing (retractions)</strong> — severe breathing difficulty</li>
        <li><strong>Blue or pale lips (cyanosis)</strong> — call 112 immediately</li>
      </ul>

      <h2>How Contactless Baby Breathing Monitors Work</h2>
      <p>Traditional baby monitors only offer video and audio. Contactless monitors like Anvaya OMNI sense the tiny movements of breathing from beside the cot, with nothing attached to your baby, and show breathing and heart rate in the app. They are wellness monitors, not medical devices.</p>

      <h2>Common Questions from Indian Parents</h2>
      <h3>My newborn breathes very fast — is this normal?</h3>
      <p>Yes. 40–60 breaths per minute is completely normal for a newborn. Only worry if it is consistently above 60 or if you see the warning signs listed above.</p>
      <h3>My baby makes snoring sounds — should I worry?</h3>
      <p>Mild snuffling or snoring is usually caused by narrow nasal passages (common in newborns) or minor congestion. If breathing is otherwise normal and your baby is feeding well, this is usually not a concern. Ask your doctor if you are unsure.</p>
      <h3>Should I buy a baby breathing monitor in India?</h3>
      <p>For the first 6 months especially, a contactless monitor like Anvaya OMNI, which shows breathing and heart rate in the app, can give parents peace of mind. It is a wellness monitor, not a medical device: if your baby was premature or has a health condition, ask your paediatrician what monitoring they recommend.</p>
    `,
  },
  {
    slug: 'types-of-baby-cries',
    title: 'Baby Cry Meaning: 5 Types of Cries and What to Do',
    author: 'Deepak Singh',
    authorTitle: 'Founder, Nxmpliscore · IIT Alumni',
    date: '2025-04-25',
    updatedDate: '2026-11-27',
    medicalReviewer: MEDICAL_REVIEWER,
    category: 'Baby Wellness',
    readTime: '7 min read',
    imageUrl: '/anvaya-core.jpg',
    dataAiHint: 'baby crying parent comforting',
    excerpt: 'Every baby cry has a meaning. This guide explains the 5 distinct cry types — hungry, tired, uncomfortable, pain, and boredom — and exactly how to respond to each.',
    keywords: ['types of baby cries', 'baby cry meaning India', 'hungry cry vs tired cry', 'baby cry analysis'],
    faqs: [
      { q: 'Why is my baby crying for no reason?', a: 'There is usually a reason, even if it is hard to spot: hunger, tiredness, a wet nappy, wind, being too hot or cold, or simply wanting to be held. Work through these one at a time. Some babies also have a fussy period in the evening. If crying is constant, high-pitched or comes with fever, poor feeding or unusual sleepiness, call your doctor.' },
      { q: 'How can I tell a hungry cry from a tired cry?', a: 'A hungry cry often builds steadily and comes with rooting or sucking on hands. A tired cry tends to be whiny and comes with eye rubbing, yawning or looking away. Watching for early cues, before crying starts, makes both easier to settle.' },
      { q: 'Is it okay to let my newborn cry?', a: 'Newborns cry to communicate needs, so respond to them. You cannot spoil a newborn by picking them up. If you feel overwhelmed, it is okay to put your baby down safely on their back in the cot and take a few minutes to calm down.' },
      { q: 'When should I worry about my baby\'s crying?', a: 'Call your doctor if your baby\'s cry sounds very different (very high-pitched or weak), if crying will not stop for hours, or if it comes with fever, vomiting, breathing difficulty, poor feeding or unusual floppiness.' },
    ],
    content: `
      <h2>Why Understanding Baby Cries Matters</h2>
      <p>Crying is your baby's only language in the first months. Research shows that parents who learn to identify cry types respond more confidently, have lower anxiety levels, and report better bonding with their baby.</p>
      <p>Want a second opinion at 3am? Try our free <a href="/cry-analyzer">AI Cry Analyzer</a>: record a few seconds of crying and it suggests the most likely reason.</p>

      <h2>The 5 Main Types of Baby Cries</h2>

      <h3>1. The Hungry Cry 🍼</h3>
      <p><strong>Sound:</strong> Rhythmic, repetitive, low-pitched. Starts as a whimper and builds if not responded to.</p>
      <p><strong>Pattern:</strong> Regular — cry, pause, cry, pause. Think of it as a "neh" sound, caused by the tongue pressing the roof of the mouth (the sucking reflex).</p>
      <p><strong>How to respond:</strong> Feed immediately. In a breastfed newborn, this cry should ideally be responded to before it escalates — look for hunger cues (rooting, sucking fists) earlier.</p>

      <h3>2. The Tired Cry 😴</h3>
      <p><strong>Sound:</strong> Whiny, intermittent, slightly nasal. Often accompanied by eye rubbing and yawning.</p>
      <p><strong>Pattern:</strong> Starts soft, becomes louder and more insistent if overstimulation continues.</p>
      <p><strong>How to respond:</strong> Reduce stimulation. Dim lights, reduce noise, swaddle, and begin your sleep routine. Don't wait — an overtired baby is much harder to settle.</p>

      <h3>3. The Discomfort Cry 😣</h3>
      <p><strong>Sound:</strong> High-pitched, continuous, urgent. The baby may arch their back.</p>
      <p><strong>Pattern:</strong> Less rhythmic than a hungry cry. Doesn't pause as regularly.</p>
      <p><strong>How to respond:</strong> Check systematically — wet nappy, gas (try bicycle legs), clothing too tight, room temperature too hot or cold. Anvaya monitors show room temperature in the app, which helps rule out a room that is too hot or cold.</p>

      <h3>4. The Pain Cry 🚨</h3>
      <p><strong>Sound:</strong> Sudden, high-pitched, sharp. A brief silence as the baby takes a breath, then screaming resumes. Very distinct from other cries.</p>
      <p><strong>Pattern:</strong> Comes without warning. Intense and unrelenting.</p>
      <p><strong>How to respond:</strong> Rule out physical cause immediately. Check for hair tourniquet (a hair wrapped around a finger or toe). If no obvious cause and the cry continues more than 20 minutes, call your paediatrician.</p>

      <h3>5. The Bored/Understimulated Cry 🙂</h3>
      <p><strong>Sound:</strong> Sporadic, intermittent. Often alternates with cooing and pauses to see if anyone responds.</p>
      <p><strong>Pattern:</strong> Comes and goes. Baby stops and looks around when stimulated.</p>
      <p><strong>How to respond:</strong> Interaction, eye contact, gentle play, or a change of scenery. This cry is actually a positive developmental sign — your baby is communicating and expecting a response.</p>

      <h2>Try the Free AI Cry Analyzer</h2>
      <p>Our free <a href="/cry-analyzer">AI Cry Analyzer</a> listens to a short recording and suggests whether the cry sounds most like hunger, tiredness, discomfort, belly pain or needing to burp. Use it as a hint, not a diagnosis.</p>
      <p>It is a free web tool and works on any phone. Every Anvaya monitor also sends a cry alert to your phone when your baby cries, so you can check the camera straight away.</p>
    `,
  },
  {
    slug: 'best-baby-monitor-india-2025',
    title: 'Best Baby Monitor India 2026: CORE vs PULSE vs OMNI',
    author: 'Deepak Singh',
    authorTitle: 'Founder, Nxmpliscore · IIT Alumni',
    date: '2025-04-20',
    updatedDate: '2026-11-24',
    category: 'Buying Guide',
    readTime: '12 min read',
    imageUrl: '/anvaya-nursery.jpg',
    dataAiHint: 'baby monitor comparison review',
    excerpt: 'What Indian parents should look for in a baby monitor in 2026, and which Anvaya model fits which need, with prices.',
    keywords: ['best baby monitor India 2025', 'Motorola baby monitor India', 'baby monitor comparison India', 'Owlet alternative India'],
    content: `
      <h2>How We Evaluated Baby Monitors for Indian Parents</h2>
      <p>We looked at what Indian parents actually need at night: a clear night-vision camera, useful alerts, comfort in Indian heat, local support and price.</p>

      <h2>Anvaya Smart: Pick the Model for Your Needs</h2>
      <ul>
        <li><strong>CORE (₹5,999):</strong> 1080P pan-tilt camera, cry and motion alerts, two-way talk, room temperature</li>
        <li><strong>PULSE (from ₹8,900):</strong> 4MP camera, AI face-cover and tummy-sleep alerts, danger zones</li>
        <li><strong>OMNI (from ₹12,999):</strong> everything in PULSE plus contactless breathing and heart-rate tracking and a nightly sleep report</li>
        <li>Free shipping across India, Cash on Delivery, 7-day returns, WhatsApp support</li>
      </ul>

      <h2>Imported Wearable Monitors</h2>
      <p>Sock-style wearables are not officially sold in India, so they usually mean import duties and no local support. They also need to be fitted on your baby every night. Consumer wearables are wellness devices, not medical monitors.</p>

      <h2>Our Recommendation</h2>
      <p>Choose CORE if you mainly want to see and hear your baby, PULSE if you want AI safety alerts, and OMNI if you also want contactless breathing and heart rate. No baby monitor prevents SIDS, so always follow safe-sleep advice from your paediatrician.</p>
    `,
  },
  {
    slug: 'baby-sleep-guide-india',
    title: 'Baby Sleep Schedule by Month (0–12 Months) India',
    author: 'Deepak Singh',
    authorTitle: 'Founder, Nxmpliscore · IIT Alumni',
    date: '2025-04-15',
    updatedDate: '2026-11-27',
    medicalReviewer: MEDICAL_REVIEWER,
    category: 'Baby Sleep',
    readTime: '10 min read',
    imageUrl: '/anvaya-omni.jpg',
    dataAiHint: 'baby sleep schedule chart',
    excerpt: 'Month-by-month baby sleep guide for Indian parents: total sleep hours, nap schedules, sleep regressions and healthy sleep habits from birth.',
    keywords: ['baby sleep schedule India', 'newborn sleep hours India', 'baby sleep tracker India', 'infant sleep guide'],
    faqs: [
      { q: 'How many hours should a newborn sleep?', a: 'Newborns usually sleep 14–17 hours in 24 hours, in short stretches of 2–4 hours, day and night (National Sleep Foundation). It is normal for them to wake often to feed.' },
      { q: 'When do babies start sleeping through the night?', a: 'It varies a lot. Many babies sleep for longer stretches of 5–6 hours by around 3–6 months, but night waking is still common in the first year, especially during growth spurts and sleep regressions.' },
      { q: 'What is the safest way for my baby to sleep?', a: 'The AAP advises placing your baby on their back for every sleep, on a firm flat mattress, with no pillows, bumpers, toys or loose blankets, in the same room as you for at least the first 6 months.' },
      { q: 'What is the 4-month sleep regression?', a: 'Around 4 months, many babies start waking more often because their sleep pattern is maturing to become more like an adult\'s. It is a normal developmental phase and usually settles within a few weeks with a consistent bedtime routine.' },
    ],
    content: `
      <h2>How Much Should a Baby Sleep? (India Guide)</h2>
      <p>Baby sleep needs change dramatically in the first year. Here is what to expect month by month:</p>

      <table>
        <thead><tr><th>Age</th><th>Total Daily Sleep</th><th>Night Sleep</th><th>Naps</th></tr></thead>
        <tbody>
          <tr><td>0–1 month</td><td>16–18 hours</td><td>8–9 hours (fragmented)</td><td>6–7 naps</td></tr>
          <tr><td>1–3 months</td><td>14–17 hours</td><td>9–10 hours</td><td>4–5 naps</td></tr>
          <tr><td>3–6 months</td><td>13–15 hours</td><td>10–11 hours</td><td>3–4 naps</td></tr>
          <tr><td>6–9 months</td><td>12–14 hours</td><td>11 hours</td><td>2–3 naps</td></tr>
          <tr><td>9–12 months</td><td>12–14 hours</td><td>11 hours</td><td>2 naps</td></tr>
        </tbody>
      </table>

      <h2>Understanding Baby Sleep Cycles</h2>
      <p>Unlike adults who have 90-minute sleep cycles, babies cycle through sleep stages every 45–50 minutes. This is why babies often wake between sleep cycles — and why a sleep monitor that tracks these transitions is so valuable.</p>
      <p>Anvaya OMNI gives a sleep report every morning, so you can see how the night went without guessing.</p>

      <h2>Sleep Regression: What Indian Parents Need to Know</h2>
      <p>Sleep regressions happen at predictable times: 4 months, 8–10 months, and 12 months. During a regression, a previously good sleeper suddenly wakes frequently again. This is developmental — not a problem to fix, but a phase to support.</p>

      <h3>Signs Your Baby Is in a Sleep Regression</h3>
      <ul>
        <li>Sudden increase in night wakings after previously sleeping well</li>
        <li>More fussiness and clinginess during the day</li>
        <li>Shorter naps than usual</li>
        <li>Takes longer to fall asleep</li>
      </ul>

      <h2>Building Healthy Sleep Habits from Birth</h2>
      <p>Indian families often co-sleep or have grandparents assisting with overnight care. Whatever your setup, these principles help build good sleep associations:</p>
      <ul>
        <li><strong>Consistent bedtime routine:</strong> Bath → feed → lullaby → sleep (same sequence nightly)</li>
        <li><strong>Drowsy but awake:</strong> Put baby down when sleepy, not fully asleep</li>
        <li><strong>Dark room:</strong> Even during daytime naps — darkness signals sleep hormone release</li>
        <li><strong>White noise:</strong> Mimics the womb environment, very effective for newborns</li>
        <li><strong>Temperature:</strong> 20–22°C is optimal — all Anvaya monitors show room temperature in the app</li>
      </ul>
    `,
  },

  {
    slug: 'baby-monitor-vs-cctv-camera',
    title: 'Baby Monitor vs CCTV Camera: Which Is Right for a Nursery?',
    author: 'Deepak Singh',
    authorTitle: 'Founder, Nxmpliscore · IIT Alumni',
    date: '2026-11-27',
    updatedDate: '2026-11-27',
    medicalReviewer: MEDICAL_REVIEWER,
    category: 'Buying Guide',
    readTime: '7 min read',
    imageUrl: '/anvaya-nursery.jpg',
    dataAiHint: 'baby monitor camera nursery cot',
    excerpt: 'Many Indian homes already have a WiFi CCTV camera. Can it watch your baby? What a security camera does well, what it misses, and when a baby monitor is worth it.',
    keywords: ['baby monitor vs CCTV', 'can I use CCTV as baby monitor', 'WiFi camera for baby room India', 'baby monitor or security camera', 'baby camera India'],
    related: ['best-baby-monitor-india-2025', 'baby-breathing-patterns', 'baby-sleep-guide-india'],
    faqs: [
      { q: 'Can I use a CCTV or WiFi home camera as a baby monitor?', a: 'Yes, for simply seeing your baby on your phone. A good home camera has night vision, two-way talk and motion alerts. What it usually lacks is anything built around a sleeping baby: cry detection tuned to infants, alerts if the face is covered or the baby rolls onto the tummy, room temperature, and breathing or heart-rate tracking.' },
      { q: 'Is a baby monitor safer than a CCTV camera?', a: 'Neither device makes sleep safe on its own. The American Academy of Pediatrics (2022) says monitors are not a way to reduce the risk of SIDS. Safe sleep comes from putting your baby on their back, on a firm flat surface, with nothing loose in the cot. A monitor helps you notice and respond faster.' },
      { q: 'Are WiFi cameras in a baby room a privacy risk?', a: 'Any internet-connected camera can be, if it keeps its default password or never gets firmware updates. India’s IT ministry has issued advisories on information leaking from CCTV systems. Whatever you use, set a strong unique password, turn on two-factor login in the app, and keep the firmware updated.' },
      { q: 'Which Anvaya model is closest to a CCTV camera?', a: 'Anvaya CORE (₹5,999) is a 1080P pan-tilt camera like a home CCTV, but adds cry alerts, room temperature, lullabies and feeding reminders. PULSE adds AI face-cover and tummy-sleep alerts, and OMNI adds contactless breathing and heart rate.' },
    ],
    content: `
      <p><strong>Short answer:</strong> a WiFi CCTV camera lets you <em>see</em> your baby. A baby monitor is built to <em>tell you</em> when something needs your attention, so you don’t have to keep watching the screen. If you only want to peek in during a nap, the camera you already own may be enough. If you want to sleep while your baby sleeps, you need alerts designed for babies.</p>

      <h2>What a Home CCTV Camera Does Well</h2>
      <ul>
        <li><strong>Live video on your phone</strong>, usually 1080P or better, with infrared night vision.</li>
        <li><strong>Two-way talk</strong> and pan-tilt on many models.</li>
        <li><strong>Motion and sound alerts</strong>, designed for intruders and doors, not for a baby stirring.</li>
        <li><strong>Low price.</strong> Popular home WiFi cameras in India typically cost ₹1,500 to ₹3,500.</li>
      </ul>

      <h2>What It Misses in a Nursery</h2>
      <p>Security cameras are tuned to spot people walking through a room. A baby who has rolled onto their tummy, pulled a blanket over their face, or is crying softly at 3 a.m. doesn’t look like an intruder, so the camera usually stays quiet. Generic motion alerts also fire every time your baby wriggles, and most parents switch them off within a week.</p>

      <h2>Side-by-Side Comparison</h2>
      <table>
        <thead><tr><th>Feature</th><th>Typical WiFi CCTV</th><th>Anvaya CORE</th><th>Anvaya PULSE</th><th>Anvaya OMNI</th></tr></thead>
        <tbody>
          <tr><td>Live video + night vision</td><td>Yes</td><td>1080P</td><td>4MP</td><td>4MP</td></tr>
          <tr><td>Two-way talk</td><td>Often</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Baby cry alerts</td><td>Generic sound alert</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Room temperature</td><td>Rarely</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Face-cover / tummy-sleep alert</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Danger-zone alerts</td><td>Some (person zones)</td><td>No</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Breathing &amp; heart rate (contactless)</td><td>No</td><td>No</td><td>No</td><td>Yes</td></tr>
          <tr><td>Nightly sleep report</td><td>No</td><td>No</td><td>No</td><td>Yes</td></tr>
          <tr><td>Price</td><td>₹1,500–3,500</td><td>₹5,999</td><td>from ₹8,900</td><td>from ₹12,999</td></tr>
        </tbody>
      </table>

      <h2>What the Evidence Says About Monitors</h2>
      <p>It’s worth being honest here. In its 2022 safe-sleep policy, the <a href="https://pubmed.ncbi.nlm.nih.gov/35726558/" target="_blank" rel="noopener">American Academy of Pediatrics</a> says home monitors should not be used as a way to reduce the risk of SIDS, and warns that they can give parents a false sense of security. What does reduce risk is the same for every family:</p>
      <ul>
        <li>Baby on their <strong>back</strong> for every sleep, naps included.</li>
        <li>A <strong>firm, flat</strong> mattress with a fitted sheet, and nothing else in the cot: no pillows, bumpers, toys or loose blankets.</li>
        <li><strong>Room-sharing</strong> (not bed-sharing) for at least the first 6 months.</li>
        <li>No overheating. Dress your baby for the room, not for the season outside.</li>
      </ul>
      <p>So the real question isn’t “which device keeps my baby safe?” It’s “which device helps me notice sooner, and lets me rest?”</p>

      <h2>When Fast Breathing Means You Should See a Doctor</h2>
      <p>Neither a camera nor a monitor replaces counting breaths yourself when you’re worried. The WHO counts breathing as fast at <strong>60 or more breaths a minute under 2 months</strong>, <strong>50 or more at 2–11 months</strong> and <strong>40 or more from 1 to 5 years</strong>. Count for a full minute while your baby is calm. Our <a href="/blog/baby-breathing-patterns">baby breathing guide</a> explains what’s normal.</p>

      <h2>Privacy: Whatever You Choose</h2>
      <p>A camera in the nursery is a camera in your home. Change the default password, use a unique one, turn on two-factor login in the app if it offers it, and install firmware updates. India’s IT ministry has issued advisories on information leaking from CCTV systems, and the same care applies to any WiFi camera.</p>

      <h2>Which Should You Buy?</h2>
      <ul>
        <li><strong>Keep your CCTV</strong> if you mostly check in during the day and your baby sleeps in your room.</li>
        <li><strong>Choose <a href="/anvaya/core">CORE</a></strong> if you want a nursery camera with cry alerts, temperature and lullabies at a CCTV-like price.</li>
        <li><strong>Choose <a href="/anvaya/pulse">PULSE</a></strong> if your baby has started rolling, or you worry about blankets over the face.</li>
        <li><strong>Choose <a href="/anvaya/omni">OMNI</a></strong> if you also want to see breathing and heart rate without putting anything on your baby.</li>
      </ul>
      <p>Not sure? See all three side by side on our <a href="/compare">comparison page</a>.</p>
    `,
  },
];

// ── BLOG CATEGORIES ──────────────────────────────────────────────────────────
export const CATEGORIES = [
  'All', 'Baby Health', 'Baby Wellness', 'Baby Sleep', 'Buying Guide', 'Newborn Care'
];

// ── SEO LANDING PAGES CONFIG ─────────────────────────────────────────────────
export const SEO_PAGES = [
  { slug: 'baby-monitoring', title: 'Baby Monitoring India Guide', priority: 1.0 },
  { slug: 'baby-wellness-app', title: 'Baby Wellness App India', priority: 0.9 },
  { slug: 'newborn-care-guide', title: 'Newborn Care Guide India', priority: 0.9 },
  { slug: 'compare', title: 'Baby Monitor Comparison India', priority: 0.85 },
];
