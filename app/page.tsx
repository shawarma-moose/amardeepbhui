import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';
import Hero from '@/components/sections/Hero';
import StatLedger from '@/components/motion/StatLedger';
import ServicesGrid from '@/components/sections/ServicesGrid';
import AboutPreview from '@/components/sections/AboutPreview';
import ProcessSteps from '@/components/sections/ProcessSteps';
import FeatureTrio from '@/components/sections/FeatureTrio';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import BlogPreview from '@/components/sections/BlogPreview';
import CtaBand from '@/components/sections/CtaBand';
import WhoIHelp from '@/components/sections/WhoIHelp';
import Accordion from '@/components/ui/Accordion';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { homeFaqs } from '@/content/faqs';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Track record — borderless figures under the hero */}
      <section aria-labelledby="ledger-heading" className="border-b border-border">
        <div className="shell py-14 lg:py-16">
          <Reveal className="mb-10 text-center">
            <p className="eyebrow inline-block">The track record</p>
            <h2 id="ledger-heading" className="sr-only">
              Track record by the numbers
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <StatLedger className="mx-auto max-w-4xl" />
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="shell py-16 lg:py-20">
        <SectionHeading
          eyebrow="Our services"
          title="Mortgage solutions for every stage"
          intro="My goal is to make the mortgage process as simple and stress-free as possible — guiding you through each step, from pre-approval to closing, and answering every question along the way."
        />
        <div className="mt-12">
          <ServicesGrid />
        </div>
        <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
          >
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/calculators/mortgage-payment"
            className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
          >
            <Calculator className="h-4 w-4" /> Try the mortgage calculator
          </Link>
        </Reveal>
      </section>

      <WhoIHelp />
      <AboutPreview />
      <ProcessSteps />
      <FeatureTrio />
      <TestimonialCarousel />

      {/* FAQ — the questions people ask before they call */}
      <section id="faq" className="shell scroll-mt-28 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="FAQ"
            title="Mortgage questions, answered for Mississauga"
            intro="Straight answers to what clients ask before their first call. Anything else, just ask."
          />
          <Reveal delay={0.1}>
            <Accordion items={homeFaqs} />
            <Link
              href="/resources/faqs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
            >
              More mortgage FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <BlogPreview />
      <CtaBand />
    </>
  );
}
