import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/Reveal';
import Breadcrumbs, { type Crumb } from '@/components/ui/Breadcrumbs';

/** Editorial hero for interior pages. Pass `media` to show a visual beside the text. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  media,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  media?: ReactNode;
}) {
  const text = (
    <Reveal className={cn(media ? 'max-w-xl' : 'max-w-3xl')}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="text-display-lg text-ink">{title}</h1>
      {intro && <div className="mt-5 max-w-2xl text-body text-mist">{intro}</div>}
      {children && <div className="mt-7">{children}</div>}
    </Reveal>
  );

  return (
    <section className="border-b border-border">
      <div className="shell pb-10 pt-10 lg:pb-14 lg:pt-16">
        {crumbs && (
          <Reveal className="mb-6">
            <Breadcrumbs items={crumbs} />
          </Reveal>
        )}

        {media ? (
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {text}
            <Reveal delay={0.1} className="order-first lg:order-last">
              {media}
            </Reveal>
          </div>
        ) : (
          text
        )}
      </div>
    </section>
  );
}
