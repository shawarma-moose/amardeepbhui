'use client';

import { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { testimonials } from '@/content/testimonials';
import { cn } from '@/lib/cn';

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Gentle autoplay, paused for reduced-motion users.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [reduce, count]);

  const active = testimonials[index];

  return (
    <section className="border-y border-border bg-surface">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">Client stories</p>
            <h2 className="text-h2 text-ink">Hear from our satisfied clients</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-evergreen hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-evergreen hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10" aria-live="polite">
          <figure className="relative max-w-3xl">
            <Quote className="h-10 w-10 text-evergreen/30" aria-hidden="true" />
            <blockquote className="mt-4 font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-snug text-ink">
              {active.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-mist">
              <span className="font-semibold text-evergreen">{active.author}</span>
              <span className="h-1 w-1 rounded-full bg-brass" aria-hidden="true" />
              <span className="text-caption uppercase tracking-[0.12em]">{active.topic}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-8 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-8 bg-evergreen' : 'w-4 bg-border hover:bg-muted/50'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
