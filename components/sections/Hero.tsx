'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { site } from '@/lib/site';
import { EASE } from '@/lib/motion';
import Button from '@/components/ui/Button';
import ApplyNowButton from '@/components/ui/ApplyNowButton';

const credentials = [
  `FSRA #${site.fsraLicence}`,
  `Mortgage Alliance #${site.brokerageLicence}`,
  site.affiliation,
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Subtle scroll parallax on the background image (disabled under reduced motion).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 64]);

  // Staggered entrance: eyebrow → headline → subhead → CTAs → licence line.
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-b border-border">
      {/* Full-bleed lifestyle image with gentle parallax + overscan so edges never show */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: yParallax }}
        className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]"
      >
        <Image
          src={site.heroSrc}
          alt="A welcoming Canadian home — independent mortgage advice from Amarpreet Bhui"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Readability scrim: dark on the left, fading right. Keeps all copy at AA contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20"
      />

      <div className="shell flex min-h-[82svh] items-center py-20 lg:min-h-[86vh] lg:py-28">
        <div className="max-w-xl text-white">
          <motion.p
            {...fade(0)}
            className="mb-5 inline-block text-caption font-semibold uppercase tracking-[0.16em] text-white/80"
          >
            Mortgage Broker · Mississauga, ON
          </motion.p>

          <motion.h1 {...fade(0.1)} className="text-display-xl text-white">
            One application. Every lender working for you.
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-5 max-w-lg text-body text-white/90">
            Amarpreet Bhui is an independent mortgage broker in Mississauga —{' '}
            {site.stats.experienceYears}+ years comparing lenders so you don&rsquo;t overpay on your
            rate, your renewal, or your refinance.
          </motion.p>

          <motion.div
            {...fade(0.3)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ApplyNowButton size="lg" />
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white/20 hover:text-white"
            >
              Book a consultation
            </Button>
          </motion.div>

          <motion.div
            {...fade(0.4)}
            className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-caption text-white/80"
          >
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Licensed &amp; regulated
            </span>
            {credentials.map((c) => (
              <span key={c} className="inline-flex items-center gap-2.5">
                <span className="text-white/40" aria-hidden="true">
                  ·
                </span>
                {c}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
