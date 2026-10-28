import Link from 'next/link';
import {
  ArrowRight,
  LifeBuoy,
  Globe,
  Landmark,
  Layers,
  Timer,
  HeartHandshake,
} from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const groups = [
  {
    icon: LifeBuoy,
    title: 'Declined by the bank or bruised credit',
    body: 'A “no” from one bank isn’t the end. I work with alternative and private lenders, and plan your path back to a regular rate.',
    href: '#faq',
    cta: 'Read the FAQ',
  },
  {
    icon: Globe,
    title: 'Newcomers to Canada',
    body: 'Lender programs for permanent residents and work-permit holders, even with little Canadian credit history.',
    href: '#faq',
    cta: 'Read the FAQ',
  },
  {
    icon: Landmark,
    title: 'Private, second and renovation financing',
    body: 'Use your equity without breaking your mortgage, cover a short-term gap, or fund a renovation.',
    href: '/services/home-equity-loan',
    cta: 'Equity options',
  },
  {
    icon: Layers,
    title: 'Debt consolidation',
    body: 'Roll high-interest cards and loans into one lower payment, and see the monthly savings before you commit.',
    href: '/services/refinance',
    cta: 'Refinance options',
  },
  {
    icon: Timer,
    title: 'Pre-approval and rate holds',
    body: 'Know your budget before you shop, and hold a rate for 90 to 120 days while you look.',
    href: '/services/first-time-homebuyer',
    cta: 'How it works',
  },
  {
    icon: HeartHandshake,
    title: 'Homeowners 55+',
    body: 'Reverse mortgages, HELOCs and downsizing options to unlock equity without monthly payments.',
    href: '#faq',
    cta: 'Read the FAQ',
  },
];

/** "Who I help" — the situations clients search for, each linked to its answer. */
export default function WhoIHelp() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="shell py-16 lg:py-20">
        <SectionHeading
          eyebrow="Who I help"
          title="Not a simple file? That’s where a broker earns their keep."
          intro="Banks approve the easy cases. Here are the situations Mississauga clients most often bring to me."
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <RevealItem key={g.title} className="h-full">
                <Link
                  href={g.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-evergreen/30 hover:shadow-hover"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-evergreen/[0.08] text-evergreen">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-h3 font-semibold text-ink">{g.title}</h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{g.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-evergreen">
                    {g.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
