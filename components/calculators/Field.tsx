import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Labelled field wrapper. Helper text shows only when `guided` is on.
 * `tooltip` renders a small info icon with an accessible title.
 */
export default function Field({
  label,
  htmlFor,
  helper,
  guided,
  tooltip,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  helper?: string;
  guided?: boolean;
  tooltip?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center gap-1.5 text-caption font-semibold text-ink"
      >
        {label}
        {tooltip && (
          <span
            className="inline-flex text-muted"
            title={tooltip}
            aria-label={tooltip}
            role="img"
          >
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}
      </label>
      {children}
      {guided && helper && (
        <p className={cn('mt-1.5 text-caption leading-relaxed text-muted')}>{helper}</p>
      )}
    </div>
  );
}
