import type { Metadata } from 'next';
import { Quote } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { testimonials } from '@/content/testimonials';

export const metadata: Metadata = {
  title: 'Client Testimonials',
  description:
    'See what clients say about working with Amarpreet Bhui — first-time buyers, refinances, renewals, home equity, investment, self-employed and commercial mortgages.',
  alternates: { canonical: '/testimonials' },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What our clients are saying"
        intro="At Amarpreet Bhui, Mortgage Broker, we pride ourselves on providing exceptional service and expert guidance to help our clients achieve their financial goals. But don’t just take our word for it — see what our clients have to say."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]}
      />

      <section className="shell py-14 lg:py-16">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <RevealItem key={t.author + t.title} className="h-full">
              <figure className="flex h-full flex-col rounded-xl border border-border bg-white p-7 transition-all duration-200 hover:border-evergreen/30 hover:shadow-hover motion-safe:hover:-translate-y-0.5">
                <Quote className="h-8 w-8 text-evergreen/30" aria-hidden="true" />
                {t.title && (
                  <figcaption className="mt-4 font-display text-h3 font-medium text-ink">
                    {t.title}
                  </figcaption>
                )}
                <blockquote className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-mist">
                  {t.quote}
                </blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-brass/15 pt-4">
                  <span className="font-semibold text-evergreen">{t.author}</span>
                  <span className="h-1 w-1 rounded-full bg-brass" aria-hidden="true" />
                  <span className="text-caption uppercase tracking-[0.12em] text-mist">
                    {t.topic}
                  </span>
                </div>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 rounded-xl border border-border bg-surface p-8 text-center">
          <h2 className="font-display text-h3 font-medium text-ink">Your feedback matters</h2>
          <p className="mx-auto mt-3 max-w-2xl text-mist">
            At Amarpreet Bhui, we strive to provide an exceptional experience for all our clients.
            We value your feedback and look forward to helping you with your next mortgage journey.
            If you’d like to share your experience, please contact us — we’d love to hear from you!
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
