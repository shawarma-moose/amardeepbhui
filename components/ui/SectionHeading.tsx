import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

/** Eyebrow + display title + optional intro, used to open most sections. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-h2 text-ink">{title}</h2>
      {intro && <p className="mt-4 text-body text-mist">{intro}</p>}
    </Reveal>
  );
}
