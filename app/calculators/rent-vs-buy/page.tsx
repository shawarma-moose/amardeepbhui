import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import RentVsBuyCalculator from '@/components/calculators/RentVsBuyCalculator';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Rent vs. Buy Calculator',
  description:
    'Compare the long-term cost of renting versus buying a home — factoring in rent increases, home appreciation, mortgage costs and investment growth over your amortization period.',
  alternates: { canonical: '/calculators/rent-vs-buy' },
};

export default function RentVsBuyCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="Rent or buy?"
        intro="Compare the long-term cost of renting versus buying, factoring in rent increases, home appreciation, mortgage costs and investment growth."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Rent vs. Buy' },
        ]}
      />
      <section className="shell py-12 lg:py-14">
        <RentVsBuyCalculator />
      </section>
      <CtaBand />
    </>
  );
}
