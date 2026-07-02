import { MessageSquare, Scale, BadgeCheck, Home } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    n: '01',
    title: 'Talk',
    icon: MessageSquare,
    body: 'A free, no-obligation conversation about your goals, your budget, and your questions.',
  },
  {
    n: '02',
    title: 'Compare',
    icon: Scale,
    body: 'I shop a wide network of lenders to compare rates, terms, and features for your situation.',
  },
  {
    n: '03',
    title: 'Approve',
    icon: BadgeCheck,
    body: 'I handle the paperwork and negotiations, then guide your application through to approval.',
  },
  {
    n: '04',
    title: 'Close',
    icon: Home,
    body: 'We coordinate every final detail so you can collect the keys with confidence.',
  },
];

/** Four-step "Talk → Compare → Approve → Close" process. */
export default function ProcessSteps() {
  return (
    <section className="shell py-16 lg:py-20">
      <SectionHeading
        eyebrow="How it works"
        title="A simple, stress-free process"
        intro="My goal is to make the mortgage process as simple and stress-free as possible — guiding you through each step, from pre-approval to closing."
      />
      <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <RevealItem key={s.n} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-border bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-evergreen/[0.08] text-evergreen">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="nums font-display text-2xl font-semibold text-border">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-h3 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
