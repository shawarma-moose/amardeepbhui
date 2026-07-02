import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { calculators } from '@/content/calculators';

export const metadata: Metadata = {
  title: 'Mortgage Calculators',
  description:
    'Free mortgage calculators — affordability, mortgage payment, refinance, rent vs. buy, debt consolidation and closing fees. Estimate your numbers in seconds.',
  alternates: { canonical: '/calculators' },
};

export default function CalculatorsHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title="Run the numbers"
        intro="Six quick tools to estimate what you can afford, your payment, and the cost of your next move. Every result updates live — no sign-up required."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Calculators' }]}
      />

      <section className="shell py-14 lg:py-16">
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => {
            const Icon = c.icon;
            const inner = (
              <>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-evergreen/[0.07] text-evergreen transition-colors duration-200 group-hover:bg-evergreen group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-display text-h3 font-semibold text-ink">{c.question}</h2>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{c.blurb}</p>
                {c.live ? (
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-evergreen">
                    Open calculator
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted">
                    Coming soon
                  </span>
                )}
              </>
            );

            return (
              <RevealItem key={c.slug} className="h-full">
                {c.live ? (
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-evergreen/30 hover:shadow-hover"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="group flex h-full flex-col rounded-xl border border-border bg-white p-7 opacity-90">
                    {inner}
                  </div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      <CtaBand />
    </>
  );
}
