import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Quiet raised surface used for cards across the site. */
export default function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  return (
    <Tag
      className={cn(
        'rounded-xl border border-border bg-white p-6 sm:p-7',
        className
      )}
    >
      {children}
    </Tag>
  );
}
