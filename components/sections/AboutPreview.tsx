import Image from 'next/image';
import { Check } from 'lucide-react';
import { site } from '@/lib/site';
import Button from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';

const highlights = [
  'Access to a wide network of lenders',
  'Personalized, responsive guidance',
  'Independent advice — not tied to one bank',
];

/** Home "meet Amarpreet" preview — portrait + condensed bio + value highlights. */
export default function AboutPreview() {
  return (
    <section className="shell py-16 lg:py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface shadow-frame">
            <Image
              src={site.portraitSrc}
              alt={`Portrait of ${site.name}, ${site.role}`}
              fill
              sizes="(min-width: 1024px) 30vw, 24rem"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4">Meet your broker</p>
            <h2 className="text-h2 text-ink">
              Personalized advice, grounded in {site.stats.experienceYears} years of experience
            </h2>
            <p className="mt-5 text-body text-mist">{site.bio[2]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-ink/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Button href="/about" variant="secondary" size="lg">
                More about Amarpreet
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
