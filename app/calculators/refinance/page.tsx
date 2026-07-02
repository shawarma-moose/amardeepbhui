import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import RefinanceCalculator from '@/components/calculators/RefinanceCalculator';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Refinance Calculator — Should I refinance?',
  description:
    'See your new payment, total interest and total cost when you refinance your mortgage or take out additional funds, with loan-to-value guidance.',
  alternates: { canonical: '/calculators/refinance' },
};

export default function RefinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="Should I refinance?"
        intro="See your new payment and interest when you refinance or take equity out — and compare two scenarios side by side."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Refinance' },
        ]}
      />
      <section className="shell py-12 lg:py-14">
        <RefinanceCalculator />
      </section>
      <CtaBand />
    </>
  );
}
