'use client';

import { useMemo, useState } from 'react';
import { rentVsBuy, fmtDollars, fmtPct } from '@/lib/mortgage-math';
import { DEFAULT_RATE, DEFAULT_AMORTIZATION } from '@/lib/rates';
import CalcLayout from './CalcLayout';
import Field from './Field';
import CurrencyInput from './CurrencyInput';
import PercentInput from './PercentInput';
import RateSelect from './RateSelect';
import AmortizationSelect from './AmortizationSelect';
import ResultCard from './ResultCard';
import CalcActions from './CalcActions';
import AnimatedNumber from './AnimatedNumber';

export default function RentVsBuyCalculator() {
  const [guided, setGuided] = useState(true);

  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [rentIncrease, setRentIncrease] = useState(2.5);
  const [tenantInsurance, setTenantInsurance] = useState(300);
  const [otherRent, setOtherRent] = useState(0);
  const [price, setPrice] = useState(650000);
  const [down, setDown] = useState(130000);
  const [amort, setAmort] = useState(DEFAULT_AMORTIZATION);
  const [rate, setRate] = useState(DEFAULT_RATE);

  const result = useMemo(
    () =>
      rentVsBuy({
        monthlyRent,
        rentIncreasePct: rentIncrease,
        tenantInsuranceAnnual: tenantInsurance,
        otherRentAnnual: otherRent,
        price,
        downPayment: down,
        amortYears: amort,
        ratePct: rate,
      }),
    [monthlyRent, rentIncrease, tenantInsurance, otherRent, price, down, amort, rate]
  );

  const summary = [
    `Rent vs. Buy`,
    `Breakeven: ${result.breakevenYears != null ? `${result.breakevenYears} years` : 'renting ahead'}`,
    `Benefit of buying after ${result.horizonYears}y: ${fmtDollars(result.benefit)}`,
  ].join('\n');

  const left = (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Monthly Rent" htmlFor="rent" guided={guided} helper="What you pay in rent each month today.">
          <CurrencyInput id="rent" value={monthlyRent} onChange={setMonthlyRent} />
        </Field>
        <Field
          label="Expected Annual Rent Increase"
          htmlFor="rentinc"
          guided={guided}
          helper="How much your rent rises each year, on average."
        >
          <PercentInput id="rentinc" value={rentIncrease} onChange={setRentIncrease} step={0.1} />
        </Field>
        <Field
          label="Annual Tenant Insurance"
          htmlFor="tenant"
          guided={guided}
          helper="Yearly cost of your renter's insurance."
        >
          <CurrencyInput id="tenant" value={tenantInsurance} onChange={setTenantInsurance} />
        </Field>
        <Field
          label="Other Annual Rent Costs"
          htmlFor="otherrent"
          guided={guided}
          helper="Any other yearly costs tied to renting (parking, storage, etc.)."
        >
          <CurrencyInput id="otherrent" value={otherRent} onChange={setOtherRent} />
        </Field>

        <Field
          label="Property Purchase Price"
          htmlFor="price"
          guided={guided}
          helper="The price of the home you'd buy instead."
        >
          <CurrencyInput id="price" value={price} onChange={setPrice} />
        </Field>
        <Field label="Down Payment" htmlFor="down" guided={guided} helper="Cash you'll put toward the purchase.">
          <CurrencyInput id="down" value={down} onChange={setDown} />
        </Field>
        <Field label="Amortization" htmlFor="amort" guided={guided} helper="Years to pay off the mortgage.">
          <AmortizationSelect id="amort" value={amort} onChange={setAmort} />
        </Field>

        <Field
          label="Interest Rate"
          guided={guided}
          helper="Pick a product or type your own rate. Province is informational."
        >
          <RateSelect rate={rate} onRate={setRate} />
        </Field>
      </div>

      <CalcActions summary={summary} className="mt-2" />
    </>
  );

  const rentBenefit = result.benefit < 0;

  const right = (
    <ResultCard title="Rent vs. Buy" summary={summary}>
      {result.breakevenYears != null ? (
        <p className="text-[0.95rem] text-ink">
          The return on investment of your purchase will be in{' '}
          <span className="font-display text-xl font-semibold text-evergreen">
            <AnimatedNumber value={result.breakevenYears} format={(n) => `${n.toFixed(1)}`} className="nums" />
          </span>{' '}
          years
        </p>
      ) : (
        <p className="text-[0.95rem] text-ink">Within this period, renting comes out ahead.</p>
      )}

      <p className="mt-4 rounded-lg bg-evergreen/[0.06] px-4 py-3 text-sm text-ink">
        After {result.horizonYears} years,{' '}
        {rentBenefit ? 'renting represents a benefit of ' : 'buying represents a benefit of '}
        <span className="nums font-display font-semibold text-evergreen">
          <AnimatedNumber value={Math.abs(result.benefit)} format={(n) => fmtDollars(n)} />
        </span>
      </p>

      <p className="mt-4 text-caption text-muted">The full Buy-vs-Rent breakdown is below.</p>
    </ResultCard>
  );

  const table = (
    <div className="mt-4 rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <p className="eyebrow mb-4">Buy vs. Rent — detailed comparison</p>
      <div className="overflow-x-auto">
        <table className="w-full text-[0.95rem]">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold text-ink"> </th>
              <th className="py-2 px-3 text-right font-semibold text-ink">Buy</th>
              <th className="py-2 pl-3 text-right font-semibold text-ink">Rent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-2 pr-3 text-muted">Amount invested</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.amountInvested)}</td>
              <td className="nums py-2 pl-3 text-right text-ink">{fmtDollars(result.rent.amountInvested)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Total expenses/rent</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.totalExpenses)}</td>
              <td className="nums py-2 pl-3 text-right text-ink">{fmtDollars(result.rent.totalExpenses)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Selling costs</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.sellingCosts)}</td>
              <td className="nums py-2 pl-3 text-right text-muted">—</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Total cost</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.totalCost)}</td>
              <td className="nums py-2 pl-3 text-right text-ink">{fmtDollars(result.rent.totalCost)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Property value</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.propertyValue)}</td>
              <td className="nums py-2 pl-3 text-right text-muted">—</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Mortgage balance</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.mortgageBalance)}</td>
              <td className="nums py-2 pl-3 text-right text-muted">—</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Net property value</td>
              <td className="nums py-2 px-3 text-right text-ink">{fmtDollars(result.buy.netPropertyValue)}</td>
              <td className="nums py-2 pl-3 text-right text-muted">—</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Investments</td>
              <td className="nums py-2 px-3 text-right text-muted">—</td>
              <td className="nums py-2 pl-3 text-right text-ink">{fmtDollars(result.rent.investments)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Investment income</td>
              <td className="nums py-2 px-3 text-right text-muted">—</td>
              <td className="nums py-2 pl-3 text-right text-ink">{fmtDollars(result.rent.investmentIncome)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 text-muted">Total value of investments</td>
              <td className="nums py-2 px-3 text-right text-muted">—</td>
              <td className="nums py-2 pl-3 text-right text-ink">{fmtDollars(result.rent.totalInvestmentValue)}</td>
            </tr>
            <tr>
              <td className="py-2 pr-3 font-semibold text-ink">Net costs</td>
              <td className="nums py-2 px-3 text-right font-semibold text-ink">{fmtDollars(result.buy.netCost)}</td>
              <td className="nums py-2 pl-3 text-right font-semibold text-ink">{fmtDollars(result.rent.netCost)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-caption text-muted">
        Net costs = total costs − net property value (buy) or − net investment value (rent). Assumes home
        appreciation and investment growth over the period.
      </p>
    </div>
  );

  return (
    <>
      <CalcLayout guided={guided} onGuided={setGuided} left={left} right={right} />
      {table}
    </>
  );
}
