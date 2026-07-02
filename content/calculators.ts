import {
  Wallet,
  Calculator,
  TrendingDown,
  Home,
  Layers,
  Receipt,
  type LucideIcon,
} from 'lucide-react';

export type CalcMeta = {
  slug: string;
  title: string;
  question: string;
  blurb: string;
  icon: LucideIcon;
  /** whether the page is built yet */
  live: boolean;
};

export const calculators: CalcMeta[] = [
  {
    slug: 'affordability',
    title: 'Affordability',
    question: 'How much can I afford?',
    blurb: 'Find the maximum home price your income, debts and down payment support.',
    icon: Wallet,
    live: true,
  },
  {
    slug: 'mortgage-payment',
    title: 'Mortgage Payment',
    question: 'What is my mortgage payment?',
    blurb: 'Estimate your payment by amount, rate, amortization and frequency.',
    icon: Calculator,
    live: true,
  },
  {
    slug: 'refinance',
    title: 'Refinance',
    question: 'Should I refinance?',
    blurb: 'See your new payment and interest when you refinance or take equity out.',
    icon: TrendingDown,
    live: true,
  },
  {
    slug: 'rent-vs-buy',
    title: 'Rent vs. Buy',
    question: 'Is it better to rent or buy?',
    blurb: 'Compare the long-term cost of renting against owning a home.',
    icon: Home,
    live: true,
  },
  {
    slug: 'debt-consolidation',
    title: 'Debt Consolidation',
    question: 'Can I consolidate my debt?',
    blurb: 'Roll high-interest debts into your mortgage and see the new payment.',
    icon: Layers,
    live: true,
  },
  {
    slug: 'closing-fees',
    title: 'Closing Fees',
    question: 'What are my closing costs?',
    blurb: 'Estimate land transfer tax, legal fees and other closing costs.',
    icon: Receipt,
    live: true,
  },
];

export const getCalc = (slug: string) => calculators.find((c) => c.slug === slug);
