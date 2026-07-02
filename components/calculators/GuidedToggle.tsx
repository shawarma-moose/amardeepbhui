'use client';

import { cn } from '@/lib/cn';

/** "Guided Calculator" switch — only toggles helper-text visibility, not the math. */
export default function GuidedToggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="inline-flex items-center gap-2.5 text-sm font-medium text-ink"
    >
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200',
          value ? 'border-evergreen bg-evergreen' : 'border-border bg-surface'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-card transition-transform duration-200',
            value ? 'translate-x-[1.4rem]' : 'translate-x-0.5'
          )}
        />
      </span>
      Guided Calculator
    </button>
  );
}
