import { Phone } from 'lucide-react';
import { site } from '@/lib/site';
import ApplyNowButton from '@/components/ui/ApplyNowButton';
import { Reveal } from '@/components/motion/Reveal';

/** Evergreen call-to-action band used to close pages. */
export default function CtaBand({
  eyebrow = 'Take the next step',
  title = 'Take the Next Step Towards Your Dream Home',
  body = 'Contact us today to apply for a mortgage and start your journey to homeownership.',
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="shell my-20 lg:my-24">
      <Reveal>
        <div className="rounded-2xl bg-evergreen px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-white/60">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-h2 font-semibold text-white">{title}</h2>
            <p className="mt-4 max-w-xl text-white/80">{body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ApplyNowButton
                size="lg"
                className="!bg-white !text-evergreen hover:!bg-[var(--evergreen-deep)] hover:!text-white"
              />
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 px-2 py-2 font-semibold text-white transition-colors hover:text-white/80"
              >
                <Phone className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
