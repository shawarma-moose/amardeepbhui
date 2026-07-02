'use client';

import { useState, useId } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AccordionItem = { q: string; a: string };

export default function Accordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  className?: string;
  /** index open by default; pass -1 for all closed */
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-border border-y border-border', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const headingId = `${baseId}-h-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                id={headingId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-evergreen"
              >
                <span className="font-display text-lg font-medium text-ink">{item.q}</span>
                <Plus
                  className={cn(
                    'h-5 w-5 shrink-0 text-evergreen transition-transform duration-300 ease-editorial',
                    isOpen && 'rotate-45'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className={cn('grid transition-all duration-300', isOpen ? 'pb-5' : '')}
            >
              <p className="max-w-2xl text-mist">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
