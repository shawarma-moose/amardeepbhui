/**
 * Shared rate table + provinces — single source of truth for all calculators.
 *
 * NOTE: these are PLACEHOLDER rates for illustration. They must be reviewed and
 * kept up to date (ideally fed from a live source). They are not an offer.
 */

export const PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'ON', 'PE', 'QC', 'SK', 'YT', 'NU',
] as const;
export type Province = (typeof PROVINCES)[number];
export const DEFAULT_PROVINCE: Province = 'ON';

export type RateOption = { label: string; rate: number };

/** Product rate options. `rate` is the annual percentage (e.g. 4.54 = 4.54%). */
export const RATE_OPTIONS: RateOption[] = [
  { label: '1yr closed fixed', rate: 4.54 },
  { label: '2yr closed fixed', rate: 3.94 },
  { label: '3yr closed fixed', rate: 3.99 },
  { label: '4yr closed fixed', rate: 4.14 },
  { label: '5yr closed fixed', rate: 4.19 },
  { label: '7yr closed fixed', rate: 4.9 },
  { label: '10yr closed fixed', rate: 5.3 },
  { label: '1yr open fixed', rate: 4.95 },
  { label: '5yr variable', rate: 3.55 },
];

/** Default selection: 4.54% – 1yr closed fixed. */
export const DEFAULT_RATE = RATE_OPTIONS[0].rate;

/** Amortization choices (years). */
export const AMORTIZATIONS = [1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30] as const;
export const DEFAULT_AMORTIZATION = 25;
