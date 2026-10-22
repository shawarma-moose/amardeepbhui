import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Page numbers to show: first, last, current ±1, with `null` marking a gap. */
function pageItems(current: number, total: number): (number | null)[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const items: (number | null)[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push(null);
    items.push(p);
  });
  return items;
}

export default function Pagination({
  current,
  total,
  hrefFor,
}: {
  current: number;
  total: number;
  hrefFor: (page: number) => string;
}) {
  if (total <= 1) return null;

  const base =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-200';
  const idle = 'border border-border bg-white text-ink hover:border-evergreen hover:text-evergreen';
  const disabled = 'border border-border bg-white text-muted opacity-50 pointer-events-none';

  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {current > 1 ? (
        <Link href={hrefFor(current - 1)} className={cn(base, idle, 'gap-1')} rel="prev">
          <ChevronLeft className="h-4 w-4" /> Prev
        </Link>
      ) : (
        <span className={cn(base, disabled, 'gap-1')} aria-hidden="true">
          <ChevronLeft className="h-4 w-4" /> Prev
        </span>
      )}

      {pageItems(current, total).map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} className="px-1 text-muted" aria-hidden="true">
            …
          </span>
        ) : p === current ? (
          <span key={p} className={cn(base, 'bg-evergreen text-white')} aria-current="page">
            {p}
          </span>
        ) : (
          <Link key={p} href={hrefFor(p)} className={cn(base, idle)} aria-label={`Page ${p}`}>
            {p}
          </Link>
        )
      )}

      {current < total ? (
        <Link href={hrefFor(current + 1)} className={cn(base, idle, 'gap-1')} rel="next">
          Next <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={cn(base, disabled, 'gap-1')} aria-hidden="true">
          Next <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
