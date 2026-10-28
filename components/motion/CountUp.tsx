'use client';

import { useEffect, useRef, useState } from 'react';
import {
  useInView,
  useReducedMotion,
  animate,
} from 'framer-motion';

type CountUpProps = {
  to: number;
  duration?: number;
  /** rendered before the number, e.g. "$" */
  prefix?: string;
  /** rendered after, e.g. "M+" or "+" */
  suffix?: string;
  /** thousands separators for figures like 1,700 */
  separator?: boolean;
  className?: string;
};

/** Counts from 0 → `to` once the element scrolls into view. */
export default function CountUp({
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  separator = false,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion: show the final figure immediately, no scroll trigger needed.
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  const rounded = Math.round(value);
  const formatted = separator ? rounded.toLocaleString('en-CA') : String(rounded);

  // The animated figure starts at 0, so the final value is also rendered as
  // plain text for crawlers and screen readers.
  const final = separator ? to.toLocaleString('en-CA') : String(to);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        <span className="nums">{formatted}</span>
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {final}
        {suffix}
      </span>
    </span>
  );
}
