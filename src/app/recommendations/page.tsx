import { RecommendationsForm } from './recommendations-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Powered Recommendations - NeonIME',
  description: 'Get personalized anime recommendations from our AI. Tell us what you like and we will find your next favorite show.',
};

export default function RecommendationsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 font-headline">AI-Powered Recommendations</h1>
      <RecommendationsForm />
    </section>
  );
}
