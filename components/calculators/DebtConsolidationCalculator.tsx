'use client';

import { useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { fmtDollars, monthlyPayment } from '@/lib/mortgage-math';
import CalcLayout from './CalcLayout';
import Field from './Field';
import CurrencyInput from './CurrencyInput';
import PercentInput from './PercentInput';
import { selectBase } from './AmortizationSelect';
import ResultCard from './ResultCard';
import CalcActions from './CalcActions';
import AnimatedNumber from './AnimatedNumber';

type Debt = { label: string; balance: number; monthly: number };

const TERMS = [5, 10, 15, 20, 25, 30];

export default function DebtConsolidationCalculator() {
  const [guided, setGuided] = useState(true);

  const [propertyValue, setPropertyValue] = useState(750000);
  const [mortgageBalance, setMortgageBalance] = useState(400000);
  const [currentMortgageMonthly, setCurrentMortgageMonthly] = useState(2200);
  const [debts, setDebts] = useState<Debt[]>([
    { label: 'Credit Card', balance: 12000, monthly: 400 },
    { label: 'Car Loan', balance: 18000, monthly: 350 },
  ]);
  const [desiredRate, setDesiredRate] = useState(4.19);
  const [desiredTerm, setDesiredTerm] = useState(25);

  const updateDebt = (index: number, patch: Partial<Debt>) =>
    setDebts((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  const removeDebt = (index: number) =>
    setDebts((prev) => prev.filter((_, i) => i !== index));
  const addDebt = () =>
    setDebts((prev) => [...prev, { label: '', balance: 0, monthly: 0 }]);

  const {
    equity,
    totalBalanceRemaining,
    currentMonthlyPayment,
    newMonthlyPayment,
    eligible,
    monthlySavings,
  } = useMemo(() => {
    const equity = Math.max(0, propertyValue - mortgageBalance);
    const totalDebtBalance = debts.reduce((sum, d) => sum + d.balance, 0);
    const totalDebtMonthly = debts.reduce((sum, d) => sum + d.monthly, 0);
    const totalBalanceRemaining = mortgageBalance + totalDebtBalance;
    const currentMonthlyPayment = currentMortgageMonthly + totalDebtMonthly;
    const newPrincipal = totalBalanceRemaining;
    const newMonthlyPayment = monthlyPayment(newPrincipal, desiredRate, desiredTerm);
    const eligible = newPrincipal <= 0.8 * propertyValue;
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    return {
      equity,
      totalBalanceRemaining,
      currentMonthlyPayment,
      newMonthlyPayment,
      eligible,
      monthlySavings,
    };
  }, [propertyValue, mortgageBalance, currentMortgageMonthly, debts, desiredRate, desiredTerm]);

  const summary = [
    `Debt consolidation`,
    `Home equity: ${fmtDollars(equity)}`,
    `Consolidated balance: ${fmtDollars(totalBalanceRemaining)}`,
    `Current payment: ${fmtDollars(currentMonthlyPayment)}/mo → New: ${fmtDollars(newMonthlyPayment)}/mo`,
  ].join('\n');

  const left = (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Property Value" htmlFor="propval" guided={guided} helper="Estimated current market value of your home.">
          <CurrencyInput id="propval" value={propertyValue} onChange={setPropertyValue} />
        </Field>
        <Field label="Mortgage Balance" htmlFor="mortbal" guided={guided} helper="How much you still owe on your mortgage.">
          <CurrencyInput id="mortbal" value={mortgageBalance} onChange={setMortgageBalance} />
        </Field>
        <Field
          label="Current Mortgage Monthly Payment"
          htmlFor="mortpay"
          className="sm:col-span-2"
          guided={guided}
          helper="Your existing monthly mortgage payment."
        >
          <CurrencyInput id="mortpay" value={currentMortgageMonthly} onChange={setCurrentMortgageMonthly} />
        </Field>

        {/* Add New Debt repeater */}
        <div className="sm:col-span-2">
          <div className="mb-1.5 flex items-center gap-1.5 text-caption font-semibold text-ink">
            Add New Debt
          </div>
          {guided && (
            <p className="mb-3 text-caption leading-relaxed text-muted">
              List the debts you'd like to roll into your mortgage — credit cards, loans, lines of credit.
            </p>
          )}
          <div className="grid gap-3">
            {debts.map((debt, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] items-start gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
                <input
                  type="text"
                  value={debt.label}
                  onChange={(e) => updateDebt(i, { label: e.target.value })}
                  placeholder="Debt name"
                  aria-label={`Debt ${i + 1} name`}
                  className="col-span-2 w-full rounded-lg border border-border bg-white py-3 pl-4 pr-4 text-ink transition-colors duration-200 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/25 sm:col-span-1"
                />
                <CurrencyInput
                  value={debt.balance}
                  onChange={(n) => updateDebt(i, { balance: n })}
                  ariaLabel={`Debt ${i + 1} balance`}
                />
                <CurrencyInput
                  value={debt.monthly}
                  onChange={(n) => updateDebt(i, { monthly: n })}
                  ariaLabel={`Debt ${i + 1} monthly payment`}
                />
                <button
                  type="button"
                  onClick={() => removeDebt(i)}
                  aria-label={`Remove debt ${i + 1}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted transition-colors duration-200 hover:border-evergreen hover:text-evergreen"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addDebt}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-evergreen"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add debt
          </button>
        </div>

        <Field label="Desired Interest Rate" htmlFor="drate" guided={guided} helper="The rate you expect on the new consolidated mortgage.">
          <PercentInput id="drate" value={desiredRate} onChange={setDesiredRate} />
        </Field>
        <Field label="Desired Loan Term" htmlFor="dterm" guided={guided} helper="Years to pay off the consolidated mortgage.">
          <select
            id="dterm"
            value={desiredTerm}
            onChange={(e) => setDesiredTerm(Number(e.target.value))}
            className={selectBase}
          >
            {TERMS.map((y) => (
              <option key={y} value={y}>
                {y} years
              </option>
            ))}
          </select>
        </Field>
      </div>

      <CalcActions summary={summary} className="mt-2" />
    </>
  );

  const right = (
    <ResultCard title="Debt Consolidation" summary={summary}>
      <p className="text-caption text-muted">Current equity in your home</p>
      <p className="font-display text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-none text-evergreen">
        <AnimatedNumber value={equity} format={(n) => fmtDollars(n)} className="nums" />
      </p>

      {eligible ? (
        <p className="mt-4 rounded-lg bg-evergreen/[0.06] px-4 py-3 text-sm text-ink">
          You may qualify for a debt consolidation through your mortgage!
        </p>
      ) : (
        <p className="mt-4 rounded-lg bg-aubergine/[0.06] px-4 py-3 text-sm text-ink">
          This exceeds ~80% of your home's value — talk to Amarpreet about options.
        </p>
      )}

      <dl className="mt-5 divide-y divide-border border-y border-border">
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-[0.95rem] text-muted">Total Balance Remaining</dt>
          <dd className="nums font-display text-xl font-semibold text-ink">
            <AnimatedNumber value={totalBalanceRemaining} format={(n) => fmtDollars(n)} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-[0.95rem] text-muted">Current Monthly Payment</dt>
          <dd className="nums font-display text-xl font-semibold text-ink">
            <AnimatedNumber value={currentMonthlyPayment} format={(n) => fmtDollars(n)} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-[0.95rem] text-muted">New Monthly Payment</dt>
          <dd className="nums font-display text-xl font-semibold text-ink">
            <AnimatedNumber value={newMonthlyPayment} format={(n) => fmtDollars(n)} />
          </dd>
        </div>
        {monthlySavings > 0 && (
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-[0.95rem] font-semibold text-evergreen">You could save / month</dt>
            <dd className="nums font-display text-xl font-semibold text-evergreen">
              <AnimatedNumber value={monthlySavings} format={(n) => fmtDollars(n)} />
            </dd>
          </div>
        )}
      </dl>
    </ResultCard>
  );

  return <CalcLayout guided={guided} onGuided={setGuided} left={left} right={right} />;
}
