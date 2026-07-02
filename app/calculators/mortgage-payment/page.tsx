import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import MortgagePaymentCalculator from '@/components/calculators/MortgagePaymentCalculator';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Mortgage Payment Calculator — What is my mortgage payment?',
  description:
    'Estimate your mortgage payment by amount, rate, amortization and payment frequency. See total interest, total cost, CMHC insurance, and compare two scenarios.',
  alternates: { canonical: '/calculators/mortgage-payment' },
};

export default function MortgagePaymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="What is my mortgage payment?"
        intro="Estimate your payment by amount, rate, amortization and frequency — then add a second scenario to compare."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Mortgage Payment' },
        ]}
      />
      <section className="shell py-12 lg:py-14">
        <MortgagePaymentCalculator />
      </section>
      <CtaBand />
    </>
  );
}
