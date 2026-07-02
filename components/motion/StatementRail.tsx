'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

/**
 * Slim vertical "statement rail" pinned to the left margin — a document-style
 * scroll-progress indicator. Brass fill grows as you read down the page.
 * Decorative, so hidden from assistive tech and on narrow viewports.
 */
export default function StatementRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-[max(1rem,calc((100vw-78rem)/2-1.75rem))] top-1/2 z-30 hidden h-[42vh] w-px -translate-y-1/2 bg-brass/20 2xl:block"
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top bg-brass"
        style={{ scaleY }}
      />
    </div>
  );
}
