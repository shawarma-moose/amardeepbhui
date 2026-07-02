import { Award, History, Sparkles } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

const features = [
  {
    icon: Award,
    title: 'Considered a Canadian mortgage thought leader',
    body: 'Get personalized answers to your questions, pre-approval information and quotes for exclusive low rates you won’t find elsewhere.',
  },
  {
    icon: History,
    title: 'Over 15 years of experience with 1,700+ mortgages personally approved',
    body: 'Get personalized answers to your questions, pre-approval information and quotes for exclusive low rates you won’t find elsewhere.',
  },
  {
    icon: Sparkles,
    title: 'Determined to lower your rate and make your approval a breeze',
    body: 'My goal is to make the mortgage process as simple and stress-free as possible for my clients. I’ll guide you through each step of the process, from pre-approval to closing, and I’ll be available to answer any questions you have along the way.',
  },
];

/** Three credibility columns on cream, separated by brass rules. */
export default function FeatureTrio() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="shell py-16 lg:py-20">
        <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <RevealItem key={f.title}>
                <div className="flex h-full flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-evergreen/[0.08] text-evergreen">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="rule mt-6" />
                  <h3 className="mt-6 font-display text-h3 font-semibold leading-snug text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mist">{f.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
