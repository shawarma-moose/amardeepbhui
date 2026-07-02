/**
 * Mortgage math. All rates are annual percentages (e.g. 4.05 means 4.05%).
 * Payment formula: M = P·r(1+r)^n / ((1+r)^n − 1)
 */

export function monthlyPayment(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / n;
  const pow = Math.pow(1 + r, n);
  return (principal * r * pow) / (pow - 1);
}

export type Amortization = {
  payment: number;
  /** months actually taken to pay off (≤ scheduled when extra payments are made) */
  months: number;
  scheduledMonths: number;
  totalInterest: number;
  totalPaid: number;
  /** months saved by extra payments */
  monthsSaved: number;
};

/**
 * Amortizes a loan, optionally with a fixed extra payment applied to principal
 * each month. Returns total interest and the (possibly accelerated) payoff length.
 */
export function amortize(
  principal: number,
  annualRatePct: number,
  years: number,
  extraMonthly = 0
): Amortization {
  const scheduledMonths = Math.round(years * 12);
  const payment = monthlyPayment(principal, annualRatePct, years);
  const r = annualRatePct / 100 / 12;

  if (principal <= 0 || scheduledMonths <= 0) {
    return {
      payment: 0,
      months: 0,
      scheduledMonths,
      totalInterest: 0,
      totalPaid: 0,
      monthsSaved: 0,
    };
  }

  let balance = principal;
  let totalInterest = 0;
  let months = 0;
  const perMonth = payment + Math.max(0, extraMonthly);
  // hard cap to avoid runaway loops on pathological inputs
  const cap = scheduledMonths + 1200;

  while (balance > 0.01 && months < cap) {
    const interest = balance * r;
    let principalPaid = perMonth - interest;
    if (principalPaid <= 0) {
      // payment doesn't cover interest — bail to scheduled figures
      totalInterest = payment * scheduledMonths - principal;
      return {
        payment,
        months: scheduledMonths,
        scheduledMonths,
        totalInterest,
        totalPaid: payment * scheduledMonths,
        monthsSaved: 0,
      };
    }
    if (principalPaid > balance) principalPaid = balance;
    balance -= principalPaid;
    totalInterest += interest;
    months += 1;
  }

  const totalPaid = principal + totalInterest;
  return {
    payment,
    months,
    scheduledMonths,
    totalInterest,
    totalPaid,
    monthsSaved: Math.max(0, scheduledMonths - months),
  };
}

/** Returns a payoff date `months` after a starting year/month (month is 0-indexed). */
export function payoffDate(startYear: number, startMonth: number, months: number): Date {
  return new Date(startYear, startMonth + months, 1);
}

/** Back-solve the loan principal that a given monthly payment can support. */
export function principalFromPayment(
  payment: number,
  annualRatePct: number,
  years: number
): number {
  const n = Math.round(years * 12);
  if (payment <= 0 || n <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return payment * n;
  const pow = Math.pow(1 + r, n);
  return (payment * (pow - 1)) / (r * pow);
}

export type AffordabilityInput = {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  annualRatePct: number;
  years: number;
  /** monthly heating allowance used by GDS/TDS — defaults to $150 */
  heatingMonthly?: number;
  /** annual property tax estimated as this fraction of home price — defaults to 1% */
  propertyTaxRate?: number;
};

export type AffordabilityResult = {
  maxPrice: number;
  maxLoan: number;
  maxMonthlyPayment: number;
  /** which ratio is the binding constraint */
  limitedBy: 'GDS' | 'TDS';
  gdsPayment: number;
  tdsPayment: number;
};

const GDS = 0.39;
const TDS = 0.44;

/**
 * Estimates the maximum home price using standard Canadian debt-service ratios.
 * Property tax depends on price, which depends on the payment — so we iterate
 * a handful of times to converge.
 */
export function affordability(input: AffordabilityInput): AffordabilityResult {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    annualRatePct,
    years,
    heatingMonthly = 150,
    propertyTaxRate = 0.01,
  } = input;

  const monthlyIncome = annualIncome / 12;
  let price = downPayment; // seed
  let maxPI = 0;
  let limitedBy: 'GDS' | 'TDS' = 'GDS';
  let gdsPI = 0;
  let tdsPI = 0;

  for (let i = 0; i < 12; i++) {
    const monthlyTax = (price * propertyTaxRate) / 12;
    const fixedHousing = monthlyTax + heatingMonthly;
    gdsPI = GDS * monthlyIncome - fixedHousing;
    tdsPI = TDS * monthlyIncome - monthlyDebts - fixedHousing;
    maxPI = Math.min(gdsPI, tdsPI);
    limitedBy = tdsPI < gdsPI ? 'TDS' : 'GDS';
    if (maxPI <= 0) {
      return {
        maxPrice: Math.max(downPayment, 0),
        maxLoan: 0,
        maxMonthlyPayment: 0,
        limitedBy,
        gdsPayment: Math.max(0, gdsPI),
        tdsPayment: Math.max(0, tdsPI),
      };
    }
    const loan = principalFromPayment(maxPI, annualRatePct, years);
    const nextPrice = loan + downPayment;
    if (Math.abs(nextPrice - price) < 1) {
      price = nextPrice;
      break;
    }
    price = nextPrice;
  }

  const maxLoan = Math.max(0, price - downPayment);
  return {
    maxPrice: price,
    maxLoan,
    maxMonthlyPayment: maxPI,
    limitedBy,
    gdsPayment: Math.max(0, gdsPI),
    tdsPayment: Math.max(0, tdsPI),
  };
}

/** Currency formatter for CAD whole dollars. */
export const fmtCAD = (n: number, fractionDigits = 0) =>
  n.toLocaleString('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  });

/** Calculator money format — "$ 1,234" (space after the sign). */
export const fmtDollars = (n: number, dp = 0) => {
  if (!Number.isFinite(n)) n = 0;
  const sign = n < 0 ? '-' : '';
  return (
    sign +
    '$ ' +
    Math.abs(n).toLocaleString('en-CA', {
      maximumFractionDigits: dp,
      minimumFractionDigits: dp,
    })
  );
};

export const fmtPct = (frac: number, dp = 1) => `${(frac * 100).toFixed(dp)}%`;

/* ---------------------------------------------------------------- */
/*  Payment frequencies                                              */
/* ---------------------------------------------------------------- */

export type PaymentFrequency =
  | 'monthly'
  | 'semi-monthly'
  | 'bi-weekly'
  | 'weekly'
  | 'accel-bi-weekly'
  | 'accel-weekly';

export const FREQUENCIES: { value: PaymentFrequency; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'semi-monthly', label: 'Semi-Monthly' },
  { value: 'accel-weekly', label: 'Accelerated Weekly' },
  { value: 'accel-bi-weekly', label: 'Accelerated Bi-Weekly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
];

export function periodsPerYear(f: PaymentFrequency): number {
  switch (f) {
    case 'monthly':
      return 12;
    case 'semi-monthly':
      return 24;
    case 'bi-weekly':
    case 'accel-bi-weekly':
      return 26;
    case 'weekly':
    case 'accel-weekly':
      return 52;
  }
}

/** Payment amount for one period at the given frequency. */
export function frequencyPayment(
  principal: number,
  annualRatePct: number,
  years: number,
  f: PaymentFrequency
): number {
  const monthly = monthlyPayment(principal, annualRatePct, years);
  if (f === 'accel-bi-weekly') return monthly / 2;
  if (f === 'accel-weekly') return monthly / 4;
  const ppy = periodsPerYear(f);
  const n = Math.round(ppy * years);
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 100 / ppy;
  if (r === 0) return principal / n;
  const pow = Math.pow(1 + r, n);
  return (principal * r * pow) / (pow - 1);
}

export type FrequencyPlan = {
  payment: number;
  periodsPerYear: number;
  totalInterest: number;
  totalCost: number;
  periods: number;
  years: number;
};

/** Amortize at a given frequency (with optional extra per-period payment). */
export function frequencyPlan(
  principal: number,
  annualRatePct: number,
  years: number,
  f: PaymentFrequency,
  extraPerPeriod = 0
): FrequencyPlan {
  const ppy = periodsPerYear(f);
  const payment = frequencyPayment(principal, annualRatePct, years, f);
  if (principal <= 0) {
    return { payment: 0, periodsPerYear: ppy, totalInterest: 0, totalCost: 0, periods: 0, years: 0 };
  }
  const r = annualRatePct / 100 / ppy;
  let bal = principal;
  let interest = 0;
  let periods = 0;
  const per = payment + Math.max(0, extraPerPeriod);
  const cap = ppy * Math.max(years, 1) + 5000;
  while (bal > 0.01 && periods < cap) {
    const i = bal * r;
    let p = per - i;
    if (p <= 0) {
      const total = payment * ppy * years;
      return {
        payment,
        periodsPerYear: ppy,
        totalInterest: total - principal,
        totalCost: total,
        periods: ppy * years,
        years,
      };
    }
    if (p > bal) p = bal;
    bal -= p;
    interest += i;
    periods += 1;
  }
  return {
    payment,
    periodsPerYear: ppy,
    totalInterest: interest,
    totalCost: principal + interest,
    periods,
    years: periods / ppy,
  };
}

/* ---------------------------------------------------------------- */
/*  CMHC mortgage default insurance                                 */
/* ---------------------------------------------------------------- */

/** Premium is required when the down payment is under 20%. Rates by LTV band. */
export function cmhcPremium(price: number, downPayment: number) {
  const loan = Math.max(0, price - downPayment);
  if (loan <= 0 || price <= 0) return { premium: 0, rate: 0, required: false };
  const ltv = loan / price;
  if (ltv <= 0.8) return { premium: 0, rate: 0, required: false };
  let rate = 0.04;
  if (ltv <= 0.85) rate = 0.028;
  else if (ltv <= 0.9) rate = 0.031;
  else if (ltv <= 0.95) rate = 0.04;
  return { premium: loan * rate, rate, required: true };
}

/* ---------------------------------------------------------------- */
/*  Detailed affordability (GDS / TDS with explicit housing costs)  */
/* ---------------------------------------------------------------- */

export type AffordabilityDetailInput = {
  annualIncome: number;
  coIncome: number;
  downPayment: number;
  years: number;
  ratePct: number;
  monthlyDebts: number;
  heatMonthly: number;
  annualPropertyTax: number;
  condoMonthly: number;
  lifestyleMonthly: number;
  /** debt-service ceilings as fractions, e.g. 0.39 and 0.44 */
  gdsLimit: number;
  tdsLimit: number;
};

export type AffordabilityDetail = {
  maxPrice: number;
  maxPrincipal: number;
  monthlyPayment: number;
  gds: number;
  tds: number;
  limitedBy: 'GDS' | 'TDS';
  grossMonthly: number;
};

/**
 * Maximum home price that keeps GDS/TDS within the chosen ceilings.
 * Housing costs (property tax, heat, 50% condo fees) are explicit inputs, so no
 * iteration is needed. GDS/TDS use the standard Canadian treatment.
 */
/* ---------------------------------------------------------------- */
/*  Payment plan with extra payments (mortgage payment / refinance)  */
/* ---------------------------------------------------------------- */

export type ExtraPaymentType =
  | 'none'
  | 'onetime'
  | 'increase'
  | 'yearly'
  | 'semiannually'
  | 'quarterly';

export const EXTRA_PAYMENT_OPTIONS: { value: ExtraPaymentType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'onetime', label: 'One-time' },
  { value: 'increase', label: 'Increase payments' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'semiannually', label: 'Semi-annually' },
  { value: 'quarterly', label: 'Quarterly' },
];

export type PaymentPlan = {
  payment: number; // base payment per period
  periodsPerYear: number;
  totalInterest: number;
  totalCost: number; // principal + interest
  periods: number;
  years: number;
};

/**
 * Amortize `principal` at a payment frequency, honouring an extra-payment rule.
 * - increase: adds `extraAmount` to every payment
 * - onetime: a single lump added at the first period
 * - yearly / semiannually / quarterly: a recurring lump at that cadence
 */
export function paymentPlan(
  principal: number,
  annualRatePct: number,
  years: number,
  f: PaymentFrequency,
  extraType: ExtraPaymentType = 'none',
  extraAmount = 0
): PaymentPlan {
  const ppy = periodsPerYear(f);
  const basePayment = frequencyPayment(principal, annualRatePct, years, f);
  if (principal <= 0) {
    return { payment: 0, periodsPerYear: ppy, totalInterest: 0, totalCost: 0, periods: 0, years: 0 };
  }
  const r = annualRatePct / 100 / ppy;
  const extra = Math.max(0, extraAmount);
  const perPeriodPay = basePayment + (extraType === 'increase' ? extra : 0);
  const lumpEvery =
    extraType === 'yearly'
      ? ppy
      : extraType === 'semiannually'
        ? Math.max(1, Math.round(ppy / 2))
        : extraType === 'quarterly'
          ? Math.max(1, Math.round(ppy / 4))
          : 0;

  let bal = principal;
  let interest = 0;
  let periods = 0;
  const cap = ppy * Math.max(years, 1) + 10000;

  while (bal > 0.01 && periods < cap) {
    const i = bal * r;
    let principalPaid = perPeriodPay - i;
    if (principalPaid <= 0) {
      const total = basePayment * ppy * years;
      return {
        payment: basePayment,
        periodsPerYear: ppy,
        totalInterest: total - principal,
        totalCost: total,
        periods: ppy * years,
        years,
      };
    }
    let lump = 0;
    if (extraType === 'onetime' && periods === 0) lump = extra;
    if (lumpEvery > 0 && (periods + 1) % lumpEvery === 0) lump = extra;
    principalPaid += lump;
    if (principalPaid > bal) principalPaid = bal;
    bal -= principalPaid;
    interest += i;
    periods += 1;
  }

  return {
    payment: basePayment,
    periodsPerYear: ppy,
    totalInterest: interest,
    totalCost: principal + interest,
    periods,
    years: periods / ppy,
  };
}

/* ---------------------------------------------------------------- */
/*  Rent vs. Buy                                                     */
/* ---------------------------------------------------------------- */

// Modelling assumptions — TODO: expose as advanced inputs / keep current.
export const RVB_APPRECIATION = 0.03; // home value growth / yr
export const RVB_INVEST_RETURN = 0.05; // investment return / yr
export const RVB_SELLING_COST = 0.05; // of sale price
export const RVB_BUY_CLOSING = 0.015; // of price, one-time
export const RVB_PROPERTY_TAX = 0.01; // of price / yr
export const RVB_MAINTENANCE = 0.01; // of price / yr

export type RentVsBuyInput = {
  monthlyRent: number;
  rentIncreasePct: number; // annual %
  tenantInsuranceAnnual: number;
  otherRentAnnual: number;
  price: number;
  downPayment: number;
  amortYears: number;
  ratePct: number;
};

export type RentVsBuyResult = {
  breakevenYears: number | null;
  benefit: number; // buy net worth − rent net worth at horizon
  horizonYears: number;
  buy: {
    amountInvested: number;
    totalExpenses: number;
    sellingCosts: number;
    totalCost: number;
    propertyValue: number;
    mortgageBalance: number;
    netPropertyValue: number;
    netCost: number;
  };
  rent: {
    amountInvested: number;
    totalExpenses: number;
    investments: number; // contributions
    investmentIncome: number;
    totalInvestmentValue: number;
    totalCost: number;
    netCost: number;
  };
};

export function rentVsBuy(inp: RentVsBuyInput): RentVsBuyResult {
  const horizon = Math.max(1, Math.round(inp.amortYears));
  const months = horizon * 12;
  const principal = Math.max(0, inp.price - inp.downPayment);
  const mPay = monthlyPayment(principal, inp.ratePct, inp.amortYears);
  const rMonthly = inp.ratePct / 100 / 12;
  const invMonthly = RVB_INVEST_RETURN / 12;

  const buyClosing = inp.price * RVB_BUY_CLOSING;
  const monthlyTax = (inp.price * RVB_PROPERTY_TAX) / 12;
  const monthlyMaint = (inp.price * RVB_MAINTENANCE) / 12;

  let balance = principal;
  let portfolio = inp.downPayment + buyClosing; // renter invests the buyer's up-front cash
  let contributions = portfolio;
  let currentRent = inp.monthlyRent;
  let totalBuyExpenses = 0;
  let totalRentExpenses = 0;
  let breakevenMonth: number | null = null;

  for (let m = 1; m <= months; m++) {
    if (m > 1 && (m - 1) % 12 === 0) currentRent *= 1 + inp.rentIncreasePct / 100;

    const interest = balance * rMonthly;
    let principalPaid = mPay - interest;
    const paying = balance > 0.01;
    if (principalPaid > balance) principalPaid = balance;
    if (paying) balance -= principalPaid;

    const buyOutlay = (paying ? mPay : 0) + monthlyTax + monthlyMaint;
    const rentOutlay = currentRent + inp.tenantInsuranceAnnual / 12 + inp.otherRentAnnual / 12;
    totalBuyExpenses += buyOutlay;
    totalRentExpenses += rentOutlay;

    const diff = buyOutlay - rentOutlay;
    portfolio = portfolio * (1 + invMonthly) + diff;
    if (diff > 0) contributions += diff;

    const propVal = inp.price * Math.pow(1 + RVB_APPRECIATION, m / 12);
    const netProp = propVal * (1 - RVB_SELLING_COST) - balance;
    if (breakevenMonth === null && netProp >= portfolio) breakevenMonth = m;
  }

  const propertyValue = inp.price * Math.pow(1 + RVB_APPRECIATION, horizon);
  const sellingCosts = propertyValue * RVB_SELLING_COST;
  const netPropertyValue = propertyValue - sellingCosts - balance;

  const buyAmountInvested = inp.downPayment + buyClosing;
  const buyTotalCost = buyAmountInvested + totalBuyExpenses;
  const rentTotalCost = contributions + totalRentExpenses;

  const buyNetCost = buyTotalCost - netPropertyValue;
  const rentNetCost = rentTotalCost - portfolio;

  return {
    breakevenYears: breakevenMonth ? Math.round((breakevenMonth / 12) * 10) / 10 : null,
    benefit: netPropertyValue - portfolio,
    horizonYears: horizon,
    buy: {
      amountInvested: buyAmountInvested,
      totalExpenses: totalBuyExpenses,
      sellingCosts,
      totalCost: buyTotalCost,
      propertyValue,
      mortgageBalance: balance,
      netPropertyValue,
      netCost: buyNetCost,
    },
    rent: {
      amountInvested: contributions,
      totalExpenses: totalRentExpenses,
      investments: contributions,
      investmentIncome: portfolio - contributions,
      totalInvestmentValue: portfolio,
      totalCost: rentTotalCost,
      netCost: rentNetCost,
    },
  };
}

export function affordabilityDetailed(inp: AffordabilityDetailInput): AffordabilityDetail {
  const grossMonthly = (inp.annualIncome + inp.coIncome) / 12;
  const fixedNonPI = inp.annualPropertyTax / 12 + inp.heatMonthly + 0.5 * inp.condoMonthly;

  const gdsPI = inp.gdsLimit * grossMonthly - fixedNonPI;
  const tdsPI = inp.tdsLimit * grossMonthly - fixedNonPI - inp.monthlyDebts - inp.lifestyleMonthly;
  const maxPI = Math.max(0, Math.min(gdsPI, tdsPI));
  const limitedBy: 'GDS' | 'TDS' = tdsPI < gdsPI ? 'TDS' : 'GDS';

  const maxPrincipal = principalFromPayment(maxPI, inp.ratePct, inp.years);
  const maxPrice = maxPrincipal + inp.downPayment;

  const gds = grossMonthly > 0 ? (maxPI + fixedNonPI) / grossMonthly : 0;
  const tds =
    grossMonthly > 0
      ? (maxPI + fixedNonPI + inp.monthlyDebts + inp.lifestyleMonthly) / grossMonthly
      : 0;

  return { maxPrice, maxPrincipal, monthlyPayment: maxPI, gds, tds, limitedBy, grossMonthly };
}
