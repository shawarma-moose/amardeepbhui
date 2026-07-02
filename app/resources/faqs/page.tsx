import type { Metadata } from 'next';
import PageHero from '@/components/layout/PageHero';
import Accordion from '@/components/ui/Accordion';
import CtaBand from '@/components/sections/CtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { faqGroups } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'Mortgage FAQs',
  description:
    'Answers to common mortgage questions — the basics, the process, rates and terms, renewal and refinancing, down payments, closing costs, and insurance.',
  alternates: { canonical: '/resources/faqs' },
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Frequently Asked Questions"
        intro="Buying a home is one of life’s biggest financial commitments. Here are answers to the questions clients ask most — and you can always reach out for anything else."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Resources' }, { label: 'FAQs' }]}
      />

      <section className="shell py-14 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqGroups.map((group) => (
            <Reveal key={group.category}>
              <h2 className="font-display text-h3 font-medium text-evergreen">
                {group.category}
              </h2>
              <Accordion className="mt-4" items={group.items} defaultOpen={-1} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Still have questions?"
        body="Get personalized answers and a no-obligation quote. I’m here to make the mortgage process clear and simple."
      />
    </>
  );
}
