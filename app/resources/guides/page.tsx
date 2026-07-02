import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import CtaBand from '@/components/sections/CtaBand';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { guides, guidesIntro } from '@/content/guides';

export const metadata: Metadata = {
  title: 'Mortgage Guides',
  description:
    'Comprehensive mortgage guides — first-time buying, mortgage types, refinancing, rates, pre-approval, calculators and tips for paying off your mortgage early.',
  alternates: { canonical: '/resources/guides' },
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={guidesIntro.heading}
        intro={guidesIntro.paragraphs.map((p, i) => (
          <p key={i} className={i > 0 ? 'mt-4' : ''}>
            {p}
          </p>
        ))}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Resources' }, { label: 'Guides' }]}
      />

      <section className="shell py-14 lg:py-16">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => {
            const Icon = g.icon;
            return (
              <RevealItem key={g.title} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-white p-7 transition-all duration-200 hover:border-evergreen/30 hover:shadow-hover motion-safe:hover:-translate-y-0.5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/[0.08] text-evergreen">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-h3 font-medium text-ink">{g.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{g.body}</p>
                  {g.points && (
                    <ul className="mt-4 space-y-2">
                      {g.points.map((pt) => (
                        <li key={pt.term} className="text-[0.95rem] text-mist">
                          <strong className="font-semibold text-ink">{pt.term}:</strong>{' '}
                          {pt.desc}
                        </li>
                      ))}
                    </ul>
                  )}
                  {g.href && (
                    <Link
                      href={g.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-evergreen transition-colors hover:text-aubergine"
                    >
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      <CtaBand
        title="Ready to begin your homeownership journey?"
        body="Dive in with a free consultation — I’ll help you make smart financial choices that fit your life and goals."
      />
    </>
  );
}
