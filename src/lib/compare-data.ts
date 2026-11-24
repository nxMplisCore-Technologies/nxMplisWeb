// Shared CORE / PULSE / OMNI comparison data (used by the interactive /compare page
// and the server-rendered comparison table that search engines read).
export type RowValue = boolean | string;

export interface Row {
  label: string;
  core: RowValue;
  pulse: RowValue;
  omni: RowValue;
  highlight?: boolean;
}

export interface Section {
  title: string;
  rows: Row[];
}

export const sections: Section[] = [
  {
    title: 'Camera & Display',
    rows: [
      { label: 'Camera resolution', core: '1080P HD', pulse: '4MP Ultra', omni: '4MP Ultra' },
      { label: 'Parent display', core: 'App only', pulse: 'Optional 5.5" screen', omni: 'Optional 5.5" screen' },
      { label: 'Pan & tilt coverage', core: '355° · 120°', pulse: '355° · 120°', omni: '355° · 120°' },
      { label: 'Night vision', core: true, pulse: true, omni: true },
    ],
  },
  {
    title: 'Core Monitoring',
    rows: [
      { label: 'Live video & audio', core: true, pulse: true, omni: true },
      { label: 'Cry & sound alert', core: true, pulse: true, omni: true },
      { label: 'Motion detection', core: true, pulse: true, omni: true },
      { label: 'Two-way talk', core: true, pulse: true, omni: true },
      { label: 'Lullabies', core: '8 built-in', pulse: '8 built-in', omni: '8 built-in' },
      { label: 'Temp & humidity sensor', core: true, pulse: true, omni: true },
      { label: 'App monitoring (iOS & Android)', core: true, pulse: true, omni: true },
    ],
  },
  {
    title: 'AI Safety Features',
    rows: [
      { label: 'Face covering alert', core: false, pulse: true, omni: true, highlight: true },
      { label: 'Prone sleep (tummy roll) alert', core: false, pulse: true, omni: true, highlight: true },
      { label: 'Danger zone alerts', core: false, pulse: true, omni: true },
      { label: 'Geofencing', core: false, pulse: true, omni: true },
      { label: 'Night light', core: false, pulse: true, omni: true },
      { label: 'Auto timeline album', core: false, pulse: true, omni: true },
    ],
  },
  {
    title: 'Wellness Monitoring',
    rows: [
      { label: 'Contactless breathing detection', core: false, pulse: false, omni: true, highlight: true },
      { label: 'Heart rate monitoring', core: false, pulse: false, omni: true, highlight: true },
      { label: 'Nightly sleep analysis report', core: false, pulse: false, omni: true, highlight: true },
      { label: 'One-tap partner call', core: false, pulse: false, omni: true },
    ],
  },
  {
    title: 'Hardware',
    rows: [
      { label: 'Parent monitor battery', core: '—', pulse: '4000mAh', omni: '4000mAh' },
      { label: 'Certification', core: 'CE, FCC, RoHS', pulse: 'CE, FCC, RoHS', omni: 'CE, FCC, RoHS' },
      { label: 'Subscription needed', core: 'No', pulse: 'No', omni: 'No' },
      { label: 'Warranty', core: '1 year', pulse: '1 year', omni: '1 year' },
      { label: 'Free shipping', core: true, pulse: true, omni: true },
      { label: '7-day returns', core: true, pulse: true, omni: true },
    ],
  },
];

