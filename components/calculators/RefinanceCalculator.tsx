'use client';

import { useMemo, useState } from 'react';
import { Plus, X, AlertTriangle } from 'lucide-react';
import {
  paymentPlan,
  fmtDollars,
  fmtPct,
  FREQUENCIES,
  EXTRA_PAYMENT_OPTIONS,
  type PaymentFrequency,
  type ExtraPaymentType,
} from '@/lib/mortgage-math';
import { DEFAULT_RATE, DEFAULT_AMORTIZATION } from '@/lib/rates';
import CalcLayout from './CalcLayout';
import Field from './Field';
import CurrencyInput from './CurrencyInput';
import RateSelect from './RateSelect';
import AmortizationSelect, { selectBase } from './AmortizationSelect';
import ResultCard from './ResultCard';
import CalcActions from './CalcActions';
import AnimatedNumber from './AnimatedNumber';

type Scenario = {
  houseValue: number;
  additionalFunds: number;
  outstanding: number;
  amort: number;
  rate: number;
  freq: PaymentFrequency;
  extraType: ExtraPaymentType;
  extra: number;
};

const makeScenario = (): Scenario => ({
  houseValue: 750000,
  additionalFunds: 40000,
  outstanding: 380000,
  amort: DEFAULT_AMORTIZATION,
  rate: DEFAULT_RATE,
  freq: 'monthly',
  extraType: 'none',
  extra: 0,
});

const MAX_LTV = 0.8;

function compute(s: Scenario) {
  const principal = Math.max(0, s.outstanding + s.additionalFunds);
  const plan = paymentPlan(principal, s.rate, s.amort, s.freq, s.extraType, s.extra);
  const ltv = s.houseValue > 0 ? principal / s.houseValue : 0;
  const freqLabel = FREQUENCIES.find((f) => f.value === s.freq)?.label ?? 'Monthly';
  return { principal, plan, ltv, overLtv: ltv > MAX_LTV, freqLabel };
}

export default function RefinanceCalculator() {
  const [guided, setGuided] = useState(true);
  const [scenarios, setScenarios] = useState<Scenario[]>([makeScenario()]);

  const update = (i: number, patch: Partial<Scenario>) =>
    setScenarios((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const results = useMemo(() => scenarios.map(compute), [scenarios]);
  const multi = scenarios.length > 1;

  const summary = results
    .map(
      (r, i) =>
        `${multi ? `Scenario ${String.fromCharCode(65 + i)} — ` : ''}${r.freqLabel} payment: ${fmtDollars(
          r.plan.payment,
          2
        )}, new balance: ${fmtDollars(r.principal)}, total interest: ${fmtDollars(r.plan.totalInterest)}`
    )
    .join('\n');

  const rows = [
    { label: 'New Loan Amount', values: results.map((r) => fmtDollars(r.principal)) },
    { label: 'Total Cost of Loan', values: results.map((r) => fmtDollars(r.plan.totalCost)) },
    { label: 'Total Interest Paid', values: results.map((r) => fmtDollars(r.plan.totalInterest)) },
    { label: 'Loan-to-Value', values: results.map((r) => fmtPct(r.ltv)) },
  ];

  const ScenarioInputs = (s: Scenario, i: number) => (
    <div key={i} className={multi ? 'rounded-xl border border-border p-5' : ''}>
      {multi && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-caption font-semibold uppercase tracking-[0.14em] text-evergreen">
            Scenario {String.fromCharCode(65 + i)}
          </span>
          {scenarios.length > 1 && (
            <button
              type="button"
              onClick={() => setScenarios((prev) => prev.filter((_, idx) => idx !== i))}
              aria-label={`Remove scenario ${String.fromCharCode(65 + i)}`}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-evergreen/10 hover:text-evergreen"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="House Value" guided={guided} helper="Your home's current market value.">
          <CurrencyInput value={s.houseValue} onChange={(n) => update(i, { houseValue: n })} />
        </Field>
        <Field label="Additional Funds Needed" guided={guided} helper="Extra cash to take out (renovations, debt, etc.).">
          <CurrencyInput value={s.additionalFunds} onChange={(n) => update(i, { additionalFunds: n })} />
        </Field>
        <Field label="Outstanding Balance" guided={guided} helper="What you still owe on your current mortgage.">
          <CurrencyInput value={s.outstanding} onChange={(n) => update(i, { outstanding: n })} />
        </Field>
        <Field label="Amortization" guided={guided} helper="Years to pay off the refinanced mortgage.">
          <AmortizationSelect value={s.amort} onChange={(n) => update(i, { amort: n })} />
        </Field>
        <Field label="Interest Rate" className="sm:col-span-2" guided={guided} helper="Pick a product or type your own rate.">
          <RateSelect rate={s.rate} onRate={(n) => update(i, { rate: n })} />
        </Field>
        <Field label="Payment Frequency" guided={guided} helper="Accelerated options pay off faster.">
          <select
            value={s.freq}
            onChange={(e) => update(i, { freq: e.target.value as PaymentFrequency })}
            className={selectBase}
            aria-label="Payment frequency"
          >
            {FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Additional Payment" guided={guided} helper="Prepay to save interest and time.">
          <select
            value={s.extraType}
            onChange={(e) => update(i, { extraType: e.target.value as ExtraPaymentType })}
            className={selectBase}
            aria-label="Additional payment"
          >
            {EXTRA_PAYMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        {s.extraType !== 'none' && (
          <Field label="Additional Payment Amount" className="sm:col-span-2" guided={guided} helper="Amount for the extra payment above.">
            <CurrencyInput value={s.extra} onChange={(n) => update(i, { extra: n })} />
          </Field>
        )}
      </div>
    </div>
  );

  const left = (
    <>
      <div className="space-y-5">{scenarios.map(ScenarioInputs)}</div>
      {scenarios.length < 2 && (
        <button
          type="button"
          onClick={() => setScenarios((prev) => [...prev, makeScenario()])}
          className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen"
        >
          <Plus className="h-4 w-4" /> Add scenario to compare
        </button>
      )}
      <CalcActions summary={summary} className="mt-2" />
    </>
  );

  const right = (
    <ResultCard title="Your refinanced payment" summary={summary}>
      <p className="text-caption text-muted">
        {results[0].freqLabel} payment{multi ? ' · Scenario A' : ''}
      </p>
      <p className="font-display text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-none text-evergreen">
        <AnimatedNumber value={results[0].plan.payment} format={(n) => fmtDollars(n, 2)} className="nums" />
      </p>

      {results.some((r) => r.overLtv) && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-aubergine/[0.06] px-4 py-3 text-sm text-aubergine">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          This exceeds the typical 80% loan-to-value limit for a refinance — talk to Amarpreet about
          your options.
        </p>
      )}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-[0.95rem]">
          {multi && (
            <thead>
              <tr className="text-caption uppercase tracking-[0.1em] text-muted">
                <th className="pb-2 text-left font-semibold" />
                {results.map((_, i) => (
                  <th key={i} className="pb-2 text-right font-semibold">
                    {String.fromCharCode(65 + i)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-border border-y border-border">
            {multi && (
              <tr>
                <td className="py-3 text-muted">{results[0].freqLabel} Payment</td>
                {results.map((r, i) => (
                  <td key={i} className="nums py-3 text-right font-display font-semibold text-ink">
                    {fmtDollars(r.plan.payment, 2)}
                  </td>
                ))}
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="py-3 text-muted">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="nums py-3 text-right font-display font-semibold text-ink">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResultCard>
  );

  return <CalcLayout guided={guided} onGuided={setGuided} left={left} right={right} />;
}
