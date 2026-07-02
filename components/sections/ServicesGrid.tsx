import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/content/services';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

/** The 7-service grid. Cards lift on hover and draw a brass rule. */
export default function ServicesGrid() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <RevealItem key={s.slug} className="h-full">
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-evergreen/30 hover:shadow-hover"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-evergreen/[0.07] text-evergreen transition-colors duration-200 group-hover:bg-evergreen group-hover:text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-h3 font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
                {s.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-evergreen">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
