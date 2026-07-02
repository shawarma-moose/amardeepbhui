import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ClosingFeesCalculator from '@/components/calculators/ClosingFeesCalculator';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Closing Fees Calculator',
  description:
    'Estimate your total closing costs — land transfer tax plus lawyer, title insurance, home inspection and appraisal fees — for a home purchase in Canada.',
  alternates: { canonical: '/calculators/closing-fees' },
};

export default function ClosingFeesCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="What are my closing costs?"
        intro="Estimate the total closing fees on your home purchase — land transfer tax plus lawyer, title insurance, inspection and appraisal costs."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Closing Fees' },
        ]}
      />
      <section className="shell py-12 lg:py-14">
        <ClosingFeesCalculator />
      </section>
      <CtaBand />
    </>
  );
}
