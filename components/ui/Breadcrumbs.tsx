import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-caption text-mist">
        {items.map((c, i) => (
          <li key={c.label} className="inline-flex items-center gap-1.5">
            {c.href ? (
              <Link href={c.href} className="transition-colors hover:text-evergreen">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink/70">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 text-brass" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
