import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import DebtConsolidationCalculator from '@/components/calculators/DebtConsolidationCalculator';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator',
  description:
    'See how consolidating your high-interest debts into your mortgage could lower your monthly payments, based on your home equity, balances and desired rate.',
  alternates: { canonical: '/calculators/debt-consolidation' },
};

export default function DebtConsolidationCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="Can I consolidate my debt?"
        intro="See whether rolling your high-interest debts into your mortgage could simplify your finances and lower your monthly payments."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Debt Consolidation' },
        ]}
      />
      <section className="shell py-12 lg:py-14">
        <DebtConsolidationCalculator />
      </section>
      <CtaBand />
    </>
  );
}
