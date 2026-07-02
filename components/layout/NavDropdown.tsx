'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * Accessible nav dropdown. Opens on hover and on keyboard focus-within;
 * closes on mouse-leave, blur-out, or Escape.
 */
export default function NavDropdown({
  item,
  active,
}: {
  item: NavItem;
  active?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 90);
  }, [cancelClose]);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[0.88rem] font-medium transition-colors duration-200',
          active || open
            ? 'bg-evergreen/[0.08] text-evergreen'
            : 'text-ink hover:bg-evergreen/[0.06] hover:text-evergreen'
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-mist transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </Link>

      <div
        className={cn(
          'absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-all duration-200',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        )}
      >
        <ul className="overflow-hidden rounded-lg border border-border bg-white shadow-hover">
          {item.children?.map((child, i) => (
            <li key={child.href} className={cn(i > 0 && 'border-t border-border')}>
              <Link
                href={child.href}
                className="block px-4 py-3 text-[0.92rem] font-medium text-ink transition-colors duration-150 hover:bg-evergreen/[0.06] hover:text-evergreen"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
