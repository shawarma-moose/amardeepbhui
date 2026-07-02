import type { ReactNode } from 'react';
import { site } from '@/lib/site';
import { buttonClasses } from './Button';

/**
 * Primary CTA that opens the external application portal in a new tab.
 * The URL lives once in lib/site.ts (site.applyUrl).
 */
export default function ApplyNowButton({
  children = 'Apply Now',
  size = 'md',
  variant = 'primary',
  className,
}: {
  children?: ReactNode;
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}) {
  return (
    <a
      href={site.applyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses({ variant, size, className })}
    >
      {children}
    </a>
  );
}
