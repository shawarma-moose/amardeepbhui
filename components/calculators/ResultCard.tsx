import type { ReactNode } from 'react';
import CalcActions from './CalcActions';
import { cn } from '@/lib/cn';

/** Results panel: styled surface + title + result rows + shared CTAs. */
export default function ResultCard({
  title,
  children,
  summary,
  className,
}: {
  title?: string;
  children: ReactNode;
  summary?: string;
  className?: string;
}) {
  return (
    <div className={cn('rounded-2xl border border-border bg-surface p-6 sm:p-7', className)}>
      {title && <p className="eyebrow mb-4">{title}</p>}
      {children}
      <CalcActions summary={summary} className="mt-6" />
    </div>
  );
}
