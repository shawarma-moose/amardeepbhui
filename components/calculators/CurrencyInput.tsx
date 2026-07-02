'use client';

import { cn } from '@/lib/cn';

const inputBase =
  'nums w-full rounded-lg border border-border bg-white py-3 pl-8 pr-4 text-ink transition-colors duration-200 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/25';

/** Money input with a "$" prefix and thousands separators. Emits a raw number. */
export default function CurrencyInput({
  id,
  value,
  onChange,
  className,
  ariaLabel,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
        $
      </span>
      <input
        id={id}
        inputMode="numeric"
        aria-label={ariaLabel}
        className={cn(inputBase, className)}
        value={value ? value.toLocaleString('en-CA') : '0'}
        onChange={(e) => onChange(Number(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
      />
    </div>
  );
}
