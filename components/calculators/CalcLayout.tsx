import type { ReactNode } from 'react';
import GuidedToggle from './GuidedToggle';

const DISCLAIMER =
  'Results are estimates for illustration only — not a mortgage offer or financial advice. Contact Amarpreet Bhui for exact figures.';

/**
 * Shared calculator shell: guided toggle on top, inputs (left) and an animated
 * results panel (right, sticky on desktop; stacks below inputs on mobile).
 */
export default function CalcLayout({
  guided,
  onGuided,
  left,
  right,
  note = DISCLAIMER,
}: {
  guided: boolean;
  onGuided: (v: boolean) => void;
  left: ReactNode;
  right: ReactNode;
  note?: string;
}) {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-5">
        <p className="text-sm text-muted">
          Adjust the inputs — results update automatically.
        </p>
        <GuidedToggle value={guided} onChange={onGuided} />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
        <div className="space-y-6">{left}</div>
        <div className="lg:sticky lg:top-28">{right}</div>
      </div>

      <p className="mt-10 max-w-3xl text-caption leading-relaxed text-muted">{note}</p>
    </div>
  );
}
