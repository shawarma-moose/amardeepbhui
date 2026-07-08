import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { site, nav } from '@/lib/site';
import Socials from './Socials';

const serviceLinks = nav.find((n) => n.label === 'Services')?.children ?? [];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Mortgage Guides', href: '/resources/guides' },
  { label: 'FAQs', href: '/resources/faqs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/about#contact' },
];

const calcLinks = [
  { label: 'Mortgage Payment Calculator', href: '/calculators/mortgage' },
  { label: 'Affordability Calculator', href: '/calculators/affordability' },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand column */}
        <div>
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
            <Image src={site.logoSrc} alt="Mortgage Alliance" width={44} height={44} className="h-10 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold text-ink">{site.name}</span>
              <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-brass">
                {site.role}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-mist">
            Independent mortgage advice in Mississauga and across Ontario — straight
            answers, lender choice, and {site.stats.experienceYears}+ years of getting
            deals approved.
          </p>
          <Socials className="mt-6" />
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="text-caption font-semibold uppercase tracking-[0.16em] text-ink">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-[0.95rem] text-mist transition-colors hover:text-evergreen"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company">
          <h2 className="text-caption font-semibold uppercase tracking-[0.16em] text-ink">
            Explore
          </h2>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-[0.95rem] text-mist transition-colors hover:text-evergreen"
                >
                  {c.label}
                </Link>
              </li>
            ))}
            {calcLinks.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-[0.95rem] text-mist transition-colors hover:text-evergreen"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-caption font-semibold uppercase tracking-[0.16em] text-ink">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-[0.95rem] text-mist">
            <li>
              <a href={site.phoneHref} className="inline-flex items-start gap-2.5 transition-colors hover:text-evergreen">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="inline-flex items-start gap-2.5 transition-colors hover:text-evergreen">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.office.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2.5 transition-colors hover:text-evergreen"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-evergreen" aria-hidden="true" />
                <span>
                  {site.office.line1}
                  <br />
                  {site.office.city} {site.office.postal}
                </span>
              </a>
            </li>
          </ul>

          <div className="mt-5">
            <h3 className="text-caption font-semibold uppercase tracking-[0.16em] text-ink">
              Follow
            </h3>
            <Socials className="mt-3" />
          </div>
        </div>
      </div>

      {/* Legal strip — required line, verbatim */}
      <div className="border-t border-border">
        <div className="shell flex flex-col gap-3 py-6 text-caption text-mist md:flex-row md:items-center md:justify-between">
          <p className="leading-relaxed">{site.legalLine}</p>
          <p className="shrink-0">
            © {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
