import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, Check } from 'lucide-react';
import { services, getService, type ServiceBlock } from '@/content/services';
import { site } from '@/lib/site';
import { Reveal } from '@/components/motion/Reveal';
import PageHero from '@/components/layout/PageHero';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import CtaBand from '@/components/sections/CtaBand';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro[0].slice(0, 155),
    alternates: { canonical: `/services/${service.slug}` },
  };
}

function Block({ block }: { block: ServiceBlock }) {
  if (block.kind === 'prose') {
    return (
      <div>
        {block.heading && (
          <h2 className="font-display text-h3 font-medium text-ink">{block.heading}</h2>
        )}
        <div className="mt-3 space-y-4 text-mist">
          {block.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    );
  }

  const ListTag = block.ordered ? 'ol' : 'ul';
  return (
    <div>
      <h2 className="font-display text-h3 font-medium text-ink">{block.heading}</h2>
      {block.intro && <p className="mt-3 text-mist">{block.intro}</p>}
      <ListTag className="mt-5 space-y-4">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3.5">
            {block.ordered ? (
              <span className="nums mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-evergreen/10 text-caption font-semibold text-evergreen">
                {i + 1}
              </span>
            ) : (
              <Check className="mt-1 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
            )}
            <span className="text-mist">
              {item.term && <strong className="font-semibold text-ink">{item.term}: </strong>}
              {item.desc}
            </span>
          </li>
        ))}
      </ListTag>
    </div>
  );
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.headline}
        intro={service.intro.map((p, i) => (
          <p key={i} className={i > 0 ? 'mt-4' : ''}>
            {p}
          </p>
        ))}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
        media={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-frame">
            <Image
              src={service.image ?? `/images/services/${service.slug}.jpg`}
              alt={`${service.title} — mortgage services with Amarpreet Bhui`}
              fill
              priority
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <Button href="/about#contact" size="lg">
          Get started <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      <section className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          {/* Main content */}
          <div className="max-w-2xl space-y-12">
            {service.blocks.map((block, i) => (
              <Reveal key={i}>
                <Block block={block} />
              </Reveal>
            ))}

            {service.faqs && service.faqs.length > 0 && (
              <Reveal>
                <h2 className="font-display text-h3 font-medium text-ink">
                  Frequently Asked Questions
                </h2>
                <Accordion className="mt-5" items={service.faqs} />
              </Reveal>
            )}

            <Reveal>
              <div className="rounded-xl border border-border bg-surface p-8">
                <h2 className="font-display text-h3 font-medium text-ink">
                  {service.closing.heading}
                </h2>
                <p className="mt-3 text-mist">{service.closing.body}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href="/about#contact" size="lg">
                    Book a free consultation
                  </Button>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2 px-2 py-2 font-semibold text-evergreen transition-colors hover:text-aubergine"
                  >
                    <Phone className="h-4 w-4" /> {site.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl bg-evergreen p-7 text-white">
              <p className="text-caption font-semibold uppercase tracking-[0.16em] text-white/60">
                Contact us today
              </p>
              <a
                href={site.phoneHref}
                className="mt-2 block font-display text-2xl font-semibold text-white transition-colors hover:text-white/80"
              >
                {site.phoneDisplay}
              </a>
              <p className="mt-3 text-sm text-white/80">
                Free, no-obligation consultation. Independent advice across Mississauga and Ontario.
              </p>
              <Button
                href="/about#contact"
                className="mt-5 w-full !bg-white !text-evergreen hover:!bg-[var(--evergreen-deep)] hover:!text-white"
              >
                Send a message
              </Button>
            </div>

            <nav aria-label="Other services" className="mt-6 rounded-2xl border border-brass/20 p-6">
              <h2 className="text-caption font-semibold uppercase tracking-[0.16em] text-ink">
                Other services
              </h2>
              <ul className="mt-3 space-y-1">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/services/${o.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-[0.95rem] text-mist transition-colors hover:bg-evergreen/[0.06] hover:text-evergreen"
                    >
                      {o.title}
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
