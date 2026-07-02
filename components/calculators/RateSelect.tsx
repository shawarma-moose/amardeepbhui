'use client';

import { useState } from 'react';
import {
  PROVINCES,
  DEFAULT_PROVINCE,
  RATE_OPTIONS,
  type Province,
} from '@/lib/rates';
import { cn } from '@/lib/cn';
import { selectBase } from './AmortizationSelect';
import PercentInput from './PercentInput';

/**
 * Rate control: province + product presets (single rate table for now — province
 * is informational) with a manual % override. Emits the effective rate number.
 */
export default function RateSelect({
  rate,
  onRate,
  id,
}: {
  rate: number;
  onRate: (n: number) => void;
  id?: string;
}) {
  const [province, setProvince] = useState<Province>(DEFAULT_PROVINCE);
  const [productIdx, setProductIdx] = useState(0);

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        <select
          aria-label="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value as Province)}
          className={cn(selectBase)}
        >
          {PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          aria-label="Rate product"
          value={productIdx}
          onChange={(e) => {
            const idx = Number(e.target.value);
            setProductIdx(idx);
            onRate(RATE_OPTIONS[idx].rate);
          }}
          className={cn(selectBase)}
        >
          {RATE_OPTIONS.map((o, i) => (
            <option key={o.label} value={i}>
              {o.rate.toFixed(2)}% – {o.label}
            </option>
          ))}
        </select>
      </div>
      <PercentInput id={id} value={rate} onChange={onRate} ariaLabel="Interest rate" />
    </div>
  );
}
