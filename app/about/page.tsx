import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  BookOpen,
  Percent,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { site } from '@/lib/site';
import PageHero from '@/components/layout/PageHero';
import StatLedger from '@/components/motion/StatLedger';
import CtaBand from '@/components/sections/CtaBand';
import Socials from '@/components/layout/Socials';
import Button from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'About Amarpreet Bhui',
  description:
    'Meet Amarpreet Bhui — a licensed mortgage broker with Mortgage Alliance and 15+ years of experience, $100M+ funded and 1,700+ mortgages approved across Southern Ontario.',
  alternates: { canonical: '/about' },
};

const resourceCards = [
  { title: 'Instant Eligibility', icon: BadgeCheck, href: '#contact' },
  { title: 'Affordability Calculator', icon: Calculator, href: '/calculators/affordability' },
  { title: 'Mortgage Guides', icon: BookOpen, href: '/resources/guides' },
  { title: 'Best Rates', icon: Percent, href: '#contact' },
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
                <Button href="#contact" size="lg">
                  Get in touch <ArrowRight className="h-4 w-4" />
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

      {/* Get in touch — details, socials & map (moved here from the old Contact page) */}
      <section id="contact" className="scroll-mt-24 border-t border-border">
        <div className="shell py-14 lg:py-16">
          <Reveal>
            <p className="eyebrow mb-4">Get in touch</p>
            <h2 className="font-display text-h2 font-medium text-ink">
              Let&rsquo;s start your mortgage journey
            </h2>
            <p className="mt-4 max-w-2xl text-body text-mist">
              Ready to take the next step toward owning real estate in Southern Ontario? Call,
              email, or message directly — I&rsquo;ll get back to you promptly.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Details + socials */}
            <Reveal>
              <div className="rounded-2xl border border-brass/20 bg-cream-2/40 p-7">
                <ul className="space-y-4 text-mist">
                  <li>
                    <a
                      href={site.phoneHref}
                      className="group flex items-start gap-3 transition-colors hover:text-evergreen"
                    >
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                      <span>
                        <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Phone</span>
                        <span className="font-semibold text-ink group-hover:text-evergreen">{site.phoneDisplay}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.emailHref}
                      className="group flex items-start gap-3 transition-colors hover:text-evergreen"
                    >
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                      <span>
                        <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Email</span>
                        <span className="font-semibold text-ink group-hover:text-evergreen">{site.email}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 transition-colors hover:text-evergreen"
                    >
                      <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                      <span>
                        <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">WhatsApp</span>
                        <span className="font-semibold text-ink group-hover:text-evergreen">Message on WhatsApp</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.office.mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 transition-colors hover:text-evergreen"
                    >
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                      <span>
                        <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Office</span>
                        <span className="font-semibold text-ink group-hover:text-evergreen">
                          {site.office.line1}, {site.office.city} {site.office.postal}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                    <span>
                      <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Hours</span>
                      <span className="font-semibold text-ink">Mon–Sat, by appointment</span>
                    </span>
                  </li>
                </ul>

                <div className="mt-6 border-t border-brass/15 pt-5">
                  <span className="text-caption uppercase tracking-[0.14em] text-mist/80">Follow</span>
                  <Socials className="mt-2" />
                </div>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.1}>
              <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-brass/20">
                <iframe
                  title={`Map to ${site.name}'s office`}
                  src={site.office.mapEmbed}
                  width="100%"
                  height="100%"
                  className="h-full min-h-[320px] w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
