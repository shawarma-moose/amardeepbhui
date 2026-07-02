/**
 * Centralized motion tokens + variants so the whole site animates cohesively.
 * Smooth, non-bouncy easing; short durations; consistent fade-up + stagger.
 */
import type { Variants, Transition } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.8,
} as const;

export const transition = (delay = 0, duration: number = DURATION.base): Transition => ({
  duration,
  ease: EASE,
  delay,
});

/** A single element fading up into view. `custom` = delay in seconds. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: transition(delay) }),
};

/** Parent that staggers its <fadeUpChild> descendants. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: transition() },
};

/** Shared viewport config for scroll reveals — trigger once, a touch early. */
export const viewportOnce = { once: true, margin: '0px 0px -10% 0px' } as const;

/** Gentle hover lift for cards (use with whileHover when motion is allowed). */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: transition(0, DURATION.fast) },
};
