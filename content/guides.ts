import {
  KeyRound,
  Layers,
  TrendingDown,
  Percent,
  ClipboardCheck,
  Calculator,
  CalendarClock,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

export type Guide = {
  title: string;
  icon: LucideIcon;
  body: string;
  /** optional bullet list for guides that enumerate options */
  points?: { term: string; desc: string }[];
  /** optional internal link the guide naturally points to */
  href?: string;
};

export const guidesIntro = {
  heading: 'Welcome to Your Mortgage Guide',
  paragraphs: [
    'Buying a home, refinancing, or investing in property can be a life-changing decision. That’s why we’ve put together this comprehensive mortgage guide to help you navigate each step of the process with ease. From understanding mortgage basics to exploring different loan types, we’re here to make the journey to homeownership smoother and more informed.',
    'Whether you’re a first-time buyer or a seasoned homeowner looking to refinance, our mortgage guides provide in-depth information tailored to your needs. Learn about the mortgage process, discover tips for getting the best rates, and understand how to make smart financial choices for your future.',
  ],
};

export const guides: Guide[] = [
  {
    title: 'First-Time Homebuyer Guide',
    icon: KeyRound,
    body: 'Are you ready to buy your first home? Our first-time homebuyer guide walks you through every step, from pre-approval to closing. Learn how to determine your budget, improve your credit score, and choose the best loan options to fit your unique financial situation.',
    href: '/services/first-time-homebuyer',
  },
  {
    title: 'Types of Mortgages Explained',
    icon: Layers,
    body: 'Every borrower’s needs are different. Discover the range of mortgage options available so you can choose the right mortgage for you.',
    points: [
      { term: 'Fixed-Rate Mortgages', desc: 'Lock in a stable interest rate for the life of your loan.' },
      { term: 'Adjustable-Rate Mortgages (ARMs)', desc: 'Learn how rates adjust over time and how they may benefit you.' },
      { term: 'FHA Loans', desc: 'Designed for first-time buyers or those with lower credit scores.' },
      { term: 'VA Loans', desc: 'Special options for veterans and active military members.' },
      { term: 'Jumbo Loans', desc: 'Financing options for higher-value properties.' },
    ],
  },
  {
    title: 'Refinancing Your Mortgage',
    icon: TrendingDown,
    body: 'Refinancing can be a great way to lower your monthly payment, shorten your loan term, or access home equity. We explain when and why refinancing may be a smart choice, what costs are involved, and how to navigate the refinancing process to make the most of your new loan.',
    href: '/services/refinance',
  },
  {
    title: 'Mortgage Rates: What You Need to Know',
    icon: Percent,
    body: 'Learn about mortgage rates, what influences them, and how to get the best possible rate for your loan. We provide insider tips on rate locks, how credit scores affect rates, and timing your loan to capitalize on favorable market conditions.',
  },
  {
    title: 'Understanding Mortgage Pre-Approval and Approval',
    icon: ClipboardCheck,
    body: 'Getting pre-approved is often the first step in buying a home. Find out how pre-approval differs from final approval, what documents you’ll need, and how to improve your chances of approval. With our tips, you can move confidently through the process.',
  },
  {
    title: 'Mortgage Calculators',
    icon: Calculator,
    body: 'Use our mortgage calculators to determine your affordability, estimate monthly payments, and see how different loan terms impact your budget. These tools are invaluable for comparing loan options and planning your financial future.',
    href: '/calculators/mortgage',
  },
  {
    title: 'Tips for Paying Off Your Mortgage Early',
    icon: CalendarClock,
    body: 'If your goal is to be debt-free, explore our strategies for paying off your mortgage faster. We provide actionable tips, like making extra payments, choosing bi-weekly payment options, and refinancing to a shorter loan term.',
  },
  {
    title: 'Mortgage FAQs',
    icon: HelpCircle,
    body: 'Buying a home is one of life’s biggest financial commitments. Our FAQs cover how much down payment is required, what credit score is needed, whether you can get a mortgage with student loans, how mortgage insurance works, and more—to help you understand the mortgage process inside and out.',
    href: '/resources/faqs',
  },
];
