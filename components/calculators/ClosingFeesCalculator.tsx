'use client';

import { useMemo, useState } from 'react';
import { fmtDollars } from '@/lib/mortgage-math';
import { PROVINCES, DEFAULT_PROVINCE, type Province } from '@/lib/rates';
import { landTransferTax, type City } from '@/lib/land-transfer';
import CalcLayout from './CalcLayout';
import Field from './Field';
import CurrencyInput from './CurrencyInput';
import { selectBase } from './AmortizationSelect';
import ResultCard from './ResultCard';
import CalcActions from './CalcActions';
import AnimatedNumber from './AnimatedNumber';

export default function ClosingFeesCalculator() {
  const [guided, setGuided] = useState(true);

  const [propertyValue, setPropertyValue] = useState(650000);
  const [downPayment, setDownPayment] = useState(130000);
  const [province, setProvince] = useState<Province>(DEFAULT_PROVINCE);
  const [city, setCity] = useState<City>('outside');
  const [firstTimeBuyer, setFirstTimeBuyer] = useState(false);

  const [lawyer, setLawyer] = useState(1500);
  const [titleInsurance, setTitleInsurance] = useState(400);
  const [inspection, setInspection] = useState(500);
  const [appraisal, setAppraisal] = useState(400);

  const ltt = useMemo(
    () => landTransferTax({ province, price: propertyValue, city, firstTimeBuyer }),
    [province, propertyValue, city, firstTimeBuyer]
  );

  const otherFeesTotal = useMemo(
    () => lawyer + titleInsurance + inspection + appraisal,
    [lawyer, titleInsurance, inspection, appraisal]
  );

  const totalClosing = useMemo(() => ltt.total + otherFeesTotal, [ltt.total, otherFeesTotal]);

  const summary = [
    `Closing fees estimate`,
    `Total: ${fmtDollars(totalClosing)}`,
    `Land transfer tax: ${fmtDollars(ltt.total)}`,
    `Other fees: ${fmtDollars(otherFeesTotal)}`,
  ].join('\n');

  const left = (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Property Value" htmlFor="propertyValue" guided={guided} helper="The purchase price of the home.">
          <CurrencyInput id="propertyValue" value={propertyValue} onChange={setPropertyValue} />
        </Field>
        <Field label="Down Payment" htmlFor="downPayment" guided={guided} helper="Cash you'll put toward the purchase.">
          <CurrencyInput id="downPayment" value={downPayment} onChange={setDownPayment} />
        </Field>

        <Field label="Property Province" htmlFor="province" guided={guided} helper="Where the property is located.">
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value as Province)}
            className={selectBase}
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Property City" htmlFor="city" guided={guided} helper="Only affects Ontario municipal tax.">
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value as City)}
            className={selectBase}
          >
            <option value="toronto">Toronto</option>
            <option value="outside">Outside Toronto</option>
          </select>
        </Field>

        <div className="sm:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={firstTimeBuyer}
              onChange={(e) => setFirstTimeBuyer(e.target.checked)}
              className="accent-[var(--evergreen)]"
            />
            I am a first-time home buyer
          </label>
        </div>

        <Field label="Lawyer (Notary) Fees" htmlFor="lawyer" guided={guided} helper="Legal fees to close the purchase.">
          <CurrencyInput id="lawyer" value={lawyer} onChange={setLawyer} />
        </Field>
        <Field label="Title Insurance" htmlFor="titleInsurance" guided={guided} helper="Protects against title defects and fraud.">
          <CurrencyInput id="titleInsurance" value={titleInsurance} onChange={setTitleInsurance} />
        </Field>
        <Field label="Home Inspection Fees" htmlFor="inspection" guided={guided} helper="Cost to inspect the property's condition.">
          <CurrencyInput id="inspection" value={inspection} onChange={setInspection} />
        </Field>
        <Field label="Home Appraisal Fees" htmlFor="appraisal" guided={guided} helper="Lender-required valuation of the home.">
          <CurrencyInput id="appraisal" value={appraisal} onChange={setAppraisal} />
        </Field>
      </div>

      <CalcActions summary={summary} className="mt-2" />
    </>
  );

  const right = (
    <ResultCard title="Closing Fees" summary={summary}>
      <p className="text-caption text-muted">Your closing fees</p>
      <p className="font-display text-[clamp(2.25rem,5vw,3rem)] font-semibold leading-none text-evergreen">
        <AnimatedNumber value={totalClosing} format={(n) => fmtDollars(n)} className="nums" />
      </p>

      <p className="mt-5 text-caption font-semibold text-ink">Land Transfer Tax</p>
      <dl className="mt-2 divide-y divide-border border-y border-border">
        <div className="flex justify-between py-3">
          <dt className="text-muted">Provincial Tax</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(ltt.provincial)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Municipal / Toronto Tax</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(ltt.municipal)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">First-time buyer rebate</dt>
          <dd
            className={`nums font-display font-semibold ${
              ltt.rebate > 0 ? 'text-evergreen' : 'text-ink'
            }`}
          >
            −{fmtDollars(ltt.rebate)}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Land transfer subtotal</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(ltt.total)}</dd>
        </div>
      </dl>

      <p className="mt-5 text-caption font-semibold text-ink">Other Fees</p>
      <dl className="mt-2 divide-y divide-border border-y border-border">
        <div className="flex justify-between py-3">
          <dt className="text-muted">Lawyer (Notary) Fees</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(lawyer)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Title Insurance</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(titleInsurance)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Home Inspection</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(inspection)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Home Appraisal</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(appraisal)}</dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-muted">Other fees subtotal</dt>
          <dd className="nums font-display font-semibold text-ink">{fmtDollars(otherFeesTotal)}</dd>
        </div>
      </dl>
    </ResultCard>
  );

  return <CalcLayout guided={guided} onGuided={setGuided} left={left} right={right} />;
}
