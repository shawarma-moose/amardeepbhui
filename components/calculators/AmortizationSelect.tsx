'use client';

import { AMORTIZATIONS } from '@/lib/rates';
import { cn } from '@/lib/cn';

const selectBase =
  'w-full rounded-lg border border-border bg-white py-3 pl-4 pr-4 text-ink transition-colors duration-200 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/25';

export default function AmortizationSelect({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(selectBase)}
    >
      {AMORTIZATIONS.map((y) => (
        <option key={y} value={y}>
          {y} {y === 1 ? 'year' : 'years'}
        </option>
      ))}
    </select>
  );
}

export { selectBase };
