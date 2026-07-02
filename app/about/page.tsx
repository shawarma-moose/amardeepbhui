import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Calculator, BookOpen, Percent } from 'lucide-react';
import { site } from '@/lib/site';
import PageHero from '@/components/layout/PageHero';
import StatLedger from '@/components/motion/StatLedger';
import CtaBand from '@/components/sections/CtaBand';
import Button from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'About Amarpreet Bhui',
  description:
    'Meet Amarpreet Bhui — a licensed mortgage broker with Mortgage Alliance and 15+ years of experience, $100M+ funded and 1,700+ mortgages approved across Southern Ontario.',
  alternates: { canonical: '/about' },
};

const resourceCards = [
  { title: 'Instant Eligibility', icon: BadgeCheck, href: '/contact' },
  { title: 'Affordability Calculator', icon: Calculator, href: '/calculators/affordability' },
  { title: 'Mortgage Guides', icon: BookOpen, href: '/resources/guides' },
  { title: 'Best Rates', icon: Percent, href: '/contact' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Hello, and welcome.
            <br />
            I&rsquo;m Amarpreet Bhui
          </>
        }
        intro={
          <>
            Licensed Mortgage Broker with {site.brokerage},{' '}
            <span className="whitespace-nowrap rounded-md bg-evergreen/10 px-2 py-0.5 font-semibold text-evergreen">
              Lic #{site.brokerageLicence}
            </span>
            {'. '}With over {site.stats.experienceYears} years in the industry, I help clients
            across Southern Ontario secure the funding they need.
          </>
        }
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <section className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Portrait + ledger */}
          <div className="lg:mt-16">
            <Reveal>
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface shadow-frame">
                <Image
                  src={site.portraitSrc}
                  alt={`Portrait of ${site.name}, ${site.role}`}
                  fill
                  sizes="(min-width: 1024px) 32vw, 24rem"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          </div>

          {/* Bio */}
          <div>
            <Reveal>
              <p className="eyebrow mb-4">My story</p>
              <div className="space-y-5 text-body leading-relaxed text-ink/80">
                {site.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8">
                <Button href="/contact" size="lg">
                  Contact me <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>

            {/* Licence / affiliation strip */}
            <Reveal delay={0.15}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-brass/20 bg-brass/20 sm:grid-cols-3">
                <div className="bg-cream p-5">
                  <dt className="text-caption uppercase tracking-[0.14em] text-mist">FSRA Licence</dt>
                  <dd className="nums mt-1 font-display text-lg font-semibold text-ink">
                    {site.fsraLicence}
                  </dd>
                </div>
                <div className="bg-cream p-5">
                  <dt className="text-caption uppercase tracking-[0.14em] text-mist">Brokerage Lic.</dt>
                  <dd className="nums mt-1 font-display text-lg font-semibold text-ink">
                    #{site.brokerageLicence}
                  </dd>
                </div>
                <div className="bg-cream p-5">
                  <dt className="text-caption uppercase tracking-[0.14em] text-mist">Member</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-ink">
                    {site.affiliation}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Track record — full-width figures */}
      <section className="border-y border-border">
        <div className="shell py-12 lg:py-14">
          <Reveal>
            <StatLedger className="mx-auto max-w-4xl" />
          </Reveal>
        </div>
      </section>

      {/* Resource cards */}
      <section className="bg-cream-2/50">
        <div className="shell py-14 lg:py-16">
          <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-brass/20 bg-brass/20 sm:grid-cols-2 lg:grid-cols-4">
            {resourceCards.map((c) => {
              const Icon = c.icon;
              return (
                <RevealItem key={c.title}>
                  <Link
                    href={c.href}
                    className="group flex h-full items-center gap-4 bg-cream p-6 transition-colors hover:bg-cream-2/60"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-evergreen/[0.08] text-evergreen transition-colors group-hover:bg-evergreen group-hover:text-cream">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg font-medium text-ink">{c.title}</span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
