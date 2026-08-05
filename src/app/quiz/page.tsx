import type { Metadata } from 'next';
import QuizClient from './_client';

export const metadata: Metadata = {
  title: 'Which Anvaya Baby Monitor is Right for You? | Free Quiz India',
  description: 'Take the 2-minute quiz to find the perfect Anvaya baby wellness pod for your family — CORE, SENSE, PULSE, or OMNI. Answer 5 questions, get your recommendation.',
  alternates: { canonical: 'https://nxmplis.com/quiz' },
  openGraph: { title: 'Find Your Anvaya Pod — Free Quiz', description: 'Answer 5 quick questions and get your perfect baby monitor recommendation.', url: 'https://nxmplis.com/quiz', type: 'website' },
};

export default function QuizPage() {
  return <QuizClient />;
}
