import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import AffordabilityCalculator from '@/components/calculators/AffordabilityCalculator';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Affordability Calculator — How much can I afford?',
  description:
    'Find out how much home you can afford based on your income, debts, down payment and rate, using standard Canadian GDS/TDS debt-service ratios.',
  alternates: { canonical: '/calculators/affordability' },
};

export default function AffordabilityCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="How much can I afford?"
        intro="Estimate the maximum home price you could qualify for from your income, debts, down payment and rate — using standard Canadian debt-service ratios."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Affordability' },
        ]}
      />
      <section className="shell py-12 lg:py-14">
        <AffordabilityCalculator />
      </section>
      <CtaBand />
    </>
  );
}
