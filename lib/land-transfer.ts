/**
 * Land transfer tax. Ontario (provincial) + Toronto (municipal) brackets and
 * first-time-buyer rebates are implemented in full.
 *
 * TODO: other provinces currently use a simplified estimate — refine each
 * province's real brackets/rebates (BC, QC, MB, NS, PE, NB, etc.). AB, SK, NL,
 * and the territories have no provincial land transfer tax (small registration
 * fees only), which is reflected below.
 */

import type { Province } from './rates';

export type City = 'toronto' | 'outside';

type Bracket = { upTo: number; rate: number };

// Ontario provincial LTT brackets.
const ON_BRACKETS: Bracket[] = [
  { upTo: 55000, rate: 0.005 },
  { upTo: 250000, rate: 0.01 },
  { upTo: 400000, rate: 0.015 },
  { upTo: 2000000, rate: 0.02 },
  { upTo: Infinity, rate: 0.025 },
];

// Toronto municipal LTT broadly mirrors the provincial brackets.
const TORONTO_BRACKETS: Bracket[] = [
  { upTo: 55000, rate: 0.005 },
  { upTo: 250000, rate: 0.01 },
  { upTo: 400000, rate: 0.015 },
  { upTo: 2000000, rate: 0.02 },
  { upTo: Infinity, rate: 0.025 },
];

const ON_FTB_REBATE_MAX = 4000;
const TORONTO_FTB_REBATE_MAX = 4475;

// Provinces with no provincial land transfer tax.
const NO_LTT: Province[] = ['AB', 'SK', 'NL', 'NT', 'YT', 'NU'];

function tieredTax(price: number, brackets: Bracket[]): number {
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    if (price > lower) {
      const taxable = Math.min(price, b.upTo) - lower;
      tax += taxable * b.rate;
      lower = b.upTo;
    } else break;
  }
  return tax;
}

export type LandTransferResult = {
  provincial: number;
  municipal: number;
  rebate: number;
  total: number;
};

export function landTransferTax({
  province,
  price,
  city,
  firstTimeBuyer,
}: {
  province: Province;
  price: number;
  city: City;
  firstTimeBuyer: boolean;
}): LandTransferResult {
  if (price <= 0) return { provincial: 0, municipal: 0, rebate: 0, total: 0 };

  let provincial: number;
  let municipal = 0;
  let rebate = 0;

  if (province === 'ON') {
    provincial = tieredTax(price, ON_BRACKETS);
    if (city === 'toronto') municipal = tieredTax(price, TORONTO_BRACKETS);
    if (firstTimeBuyer) {
      rebate += Math.min(provincial, ON_FTB_REBATE_MAX);
      if (city === 'toronto') rebate += Math.min(municipal, TORONTO_FTB_REBATE_MAX);
    }
  } else if (NO_LTT.includes(province)) {
    provincial = 0; // no provincial LTT
  } else {
    // Simplified estimate for provinces not yet modelled in detail. TODO: refine.
    provincial = tieredTax(price, ON_BRACKETS);
    if (firstTimeBuyer) rebate += Math.min(provincial, ON_FTB_REBATE_MAX);
  }

  const total = Math.max(0, provincial + municipal - rebate);
  return { provincial, municipal, rebate, total };
}
