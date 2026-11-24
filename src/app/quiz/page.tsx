import type { Metadata } from 'next';
import QuizClient from './_client';

export const metadata: Metadata = {
  title: 'Which Baby Monitor Is Right for You? Quiz',
  description: 'Take the 2-minute quiz to find the perfect Anvaya baby monitor for your family — CORE, PULSE, or OMNI. Answer 5 questions, get your recommendation.',
  alternates: { canonical: 'https://nxmplis.com/quiz' },
  openGraph: { title: 'Find Your Anvaya Pod — Free Quiz', description: 'Answer 5 quick questions and get your perfect baby monitor recommendation.', url: 'https://nxmplis.com/quiz', type: 'website', images: [{ url: '/anvaya-nursery.jpg', width: 1200, height: 630, alt: 'Anvaya Smart baby monitor quiz' }] },
};

export default function QuizPage() {
  return <QuizClient />;
}
