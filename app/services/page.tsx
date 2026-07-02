import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import CtaBand from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'Mortgage Services',
  description:
    'Mortgage renewal, commercial, self-employed, refinance, first-time homebuyer, investment property and home equity solutions — tailored advice from a licensed Mississauga mortgage broker.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Mortgage solutions, tailored to you"
        intro="From your first home to your next investment, I’ll guide you through each step of the process — comparing lenders to find terms that fit your goals. Explore the services below."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />
      <section className="shell py-14 lg:py-16">
        <ServicesGrid />
      </section>
      <CtaBand />
    </>
  );
}
