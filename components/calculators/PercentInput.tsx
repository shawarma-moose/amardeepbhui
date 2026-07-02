'use client';

import { cn } from '@/lib/cn';

const inputBase =
  'nums w-full rounded-lg border border-border bg-white py-3 pl-4 pr-8 text-ink transition-colors duration-200 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/25';

/** Percentage input with a trailing "%". Emits a raw number (e.g. 4.54). */
export default function PercentInput({
  id,
  value,
  onChange,
  step = 0.01,
  className,
  ariaLabel,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        inputMode="decimal"
        step={step}
        aria-label={ariaLabel}
        className={cn(inputBase, className)}
        value={value}
        onChange={(e) => onChange(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
      />
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
        %
      </span>
    </div>
  );
}
