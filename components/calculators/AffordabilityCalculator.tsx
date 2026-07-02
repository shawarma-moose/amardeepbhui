'use client';

import { useMemo, useState } from 'react';
import { Info, Plus, Minus } from 'lucide-react';
import { affordabilityDetailed, fmtDollars, fmtPct } from '@/lib/mortgage-math';
import { DEFAULT_RATE, DEFAULT_AMORTIZATION } from '@/lib/rates';
import CalcLayout from './CalcLayout';
import Field from './Field';
import CurrencyInput from './CurrencyInput';
import RateSelect from './RateSelect';
import AmortizationSelect from './AmortizationSelect';
import ResultCard from './ResultCard';
import CalcActions from './CalcActions';
import AnimatedNumber from './AnimatedNumber';

export default function AffordabilityCalculator() {
  const [guided, setGuided] = useState(true);

  const [income, setIncome] = useState(120000);
  const [coIncome, setCoIncome] = useState(0);
  const [down, setDown] = useState(60000);
  const [amort, setAmort] = useState(DEFAULT_AMORTIZATION);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [debts, setDebts] = useState(500);
  const [heat, setHeat] = useState(150);
  const [propertyTax, setPropertyTax] = useState(3600);
  const [condo, setCondo] = useState(0);
  const [lifestyleOpen, setLifestyleOpen] = useState(false);
  const [lifestyle, setLifestyle] = useState(0);
  const [risk, setRisk] = useState(50); // 0 = safer, 100 = riskier

  // Safer ↔ Riskier nudges the GDS/TDS ceilings within a sensible range.
  const gdsLimit = 0.35 + (risk / 100) * (0.42 - 0.35);
  const tdsLimit = 0.4 + (risk / 100) * (0.48 - 0.4);

  const result = useMemo(
    () =>
      affordabilityDetailed({
        annualIncome: income,
        coIncome,
        downPayment: down,
        years: amort,
        ratePct: rate,
        monthlyDebts: debts,
        heatMonthly: heat,
        annualPropertyTax: propertyTax,
        condoMonthly: condo,
        lifestyleMonthly: lifestyleOpen ? lifestyle : 0,
        gdsLimit,
        tdsLimit,
      }),
    [income, coIncome, down, amort, rate, debts, heat, propertyTax, condo, lifestyleOpen, lifestyle, gdsLimit, tdsLimit]
  );

  const message =
    result.maxPrice > down
      ? 'Great news! It looks like a house at this price fits your wallet!'
      : 'Try lowering your monthly debts or increasing your income (or down payment) to see what you can afford.';

  const summary = [
    `Affordability estimate`,
    `Max affordable price: ${fmtDollars(result.maxPrice)}`,
    `Monthly mortgage payment: ${fmtDollars(result.monthlyPayment)}`,
    `GDS: ${fmtPct(result.gds)} · TDS: ${fmtPct(result.tds)}`,
  ].join('\n');

  const left = (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Annual Income" htmlFor="income" guided={guided} helper="Your gross yearly income before taxes.">
          <CurrencyInput id="income" value={income} onChange={setIncome} />
        </Field>
        <Field label="Co-Borrower's Annual Income" htmlFor="coincome" guided={guided} helper="Add a co-applicant's gross income, if any.">
          <CurrencyInput id="coincome" value={coIncome} onChange={setCoIncome} />
        </Field>
        <Field label="Down Payment" htmlFor="down" guided={guided} helper="Cash you'll put toward the purchase.">
          <CurrencyInput id="down" value={down} onChange={setDown} />
        </Field>
        <Field label="Amortization" htmlFor="amort" guided={guided} helper="Years to pay off the mortgage.">
          <AmortizationSelect id="amort" value={amort} onChange={setAmort} />
        </Field>

        <Field
          label="Interest Rate"
          className="sm:col-span-2"
          guided={guided}
          helper="Pick a product or type your own rate. Province is informational."
        >
          <RateSelect rate={rate} onRate={setRate} />
        </Field>

        <Field label="Monthly Debt Payments" htmlFor="debts" guided={guided} helper="Car loans, credit cards, lines of credit, etc.">
          <CurrencyInput id="debts" value={debts} onChange={setDebts} />
        </Field>
        <Field label="Heat & Electricity (monthly)" htmlFor="heat" guided={guided} helper="Estimated monthly utilities for the home.">
          <CurrencyInput id="heat" value={heat} onChange={setHeat} />
        </Field>
        <Field label="Annual Property Taxes" htmlFor="ptax" guided={guided} helper="Yearly property tax for the home.">
          <CurrencyInput id="ptax" value={propertyTax} onChange={setPropertyTax} />
        </Field>
        <Field label="Monthly Condo Fees" htmlFor="condo" guided={guided} helper="Half of condo fees count toward your ratios.">
          <CurrencyInput id="condo" value={condo} onChange={setCondo} />
        </Field>

        {/* Lifestyle expenses */}
        <div className="sm:col-span-2">
          <button
            type="button"
            onClick={() => setLifestyleOpen((v) => !v)}
            aria-expanded={lifestyleOpen}
            className="inline-flex items-center gap-2 text-sm font-semibold text-evergreen"
          >
            {lifestyleOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            Include lifestyle expenses
          </button>
          {lifestyleOpen && (
            <div className="mt-3">
              <Field
                label="Other Monthly Expenses"
                htmlFor="lifestyle"
                guided={guided}
                helper="Extra monthly costs (childcare, savings, subscriptions) to budget more conservatively."
              >
                <CurrencyInput id="lifestyle" value={lifestyle} onChange={setLifestyle} />
              </Field>
            </div>
          )}
        </div>

        {/* Safer ↔ Riskier */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between text-caption font-semibold text-ink">
            <span>Safer</span>
            <span className="text-muted">Comfort level</span>
            <span>Riskier</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={risk}
            onChange={(e) => setRisk(Number(e.target.value))}
            aria-label="Comfort level from safer to riskier"
            className="mt-2 w-full accent-[var(--evergreen)]"
          />
          {guided && (
            <p className="mt-1.5 text-caption text-muted">
              Adjusts the allowed debt-service ratios (GDS {fmtPct(gdsLimit, 0)} / TDS{' '}
              {fmtPct(tdsLimit, 0)}).
            </p>
          )}
        </div>
      </div>

      <CalcActions summary={summary} className="mt-2" />
    </>
  );

  const right = (
    <ResultCard title="Here's what you can afford!" summary={summary}>
      <p className="text-caption text-muted">Maximum affordable price</p>
      <p className="font-display text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-none text-evergreen">
        <AnimatedNumber value={result.maxPrice} format={(n) => fmtDollars(n)} className="nums" />
      </p>
      <p className="mt-1.5 text-caption text-muted">*borrowing limit + your down payment</p>

      <p className="mt-4 rounded-lg bg-evergreen/[0.06] px-4 py-3 text-sm text-ink">{message}</p>

      <dl className="mt-5 divide-y divide-border border-y border-border">
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-[0.95rem] text-muted">Monthly Mortgage Payment</dt>
          <dd className="nums font-display text-xl font-semibold text-ink">
            <AnimatedNumber value={result.monthlyPayment} format={(n) => fmtDollars(n)} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="inline-flex items-center gap-1.5 text-[0.95rem] text-muted">
            GDS Ratio
            <span
              title="Gross Debt Service: housing costs as a share of gross income (ceiling ~39%)."
              aria-label="Gross Debt Service: housing costs as a share of gross income (ceiling ~39%)."
              role="img"
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </dt>
          <dd className="nums font-display text-xl font-semibold text-ink">
            <AnimatedNumber value={result.gds * 100} format={(n) => `${n.toFixed(1)}%`} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="inline-flex items-center gap-1.5 text-[0.95rem] text-muted">
            TDS Ratio
            <span
              title="Total Debt Service: all debts plus housing as a share of gross income (ceiling ~44%)."
              aria-label="Total Debt Service: all debts plus housing as a share of gross income (ceiling ~44%)."
              role="img"
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </dt>
          <dd className="nums font-display text-xl font-semibold text-ink">
            <AnimatedNumber value={result.tds * 100} format={(n) => `${n.toFixed(1)}%`} />
          </dd>
        </div>
      </dl>
    </ResultCard>
  );

  return <CalcLayout guided={guided} onGuided={setGuided} left={left} right={right} />;
}
