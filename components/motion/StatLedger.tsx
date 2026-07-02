import CountUp from './CountUp';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

type LedgerItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  separator?: boolean;
  label: string;
};

const items: LedgerItem[] = [
  { value: site.stats.fundedDollars, prefix: '$', suffix: 'M+', label: 'In funded mortgages' },
  { value: site.stats.approvals, suffix: '+', separator: true, label: 'Mortgages approved' },
  { value: site.stats.experienceYears, suffix: ' yrs', label: 'Of experience' },
];

/**
 * Track-record figures — a light, borderless row (no card/box). Numbers count up
 * once on scroll.
 */
export default function StatLedger({ className }: { className?: string }) {
  return (
    <dl className={cn('grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-6', className)}>
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <dd className="nums font-display text-[clamp(2rem,3.4vw,3.25rem)] font-semibold leading-none text-evergreen">
            <CountUp
              to={item.value}
              prefix={item.prefix}
              suffix={item.suffix}
              separator={item.separator}
            />
          </dd>
          <dt className="mt-3 text-caption font-medium uppercase tracking-[0.16em] text-muted">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
