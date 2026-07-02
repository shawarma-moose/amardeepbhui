export type FAQ = { q: string; a: string };
export type FAQGroup = { category: string; items: FAQ[] };

/**
 * Site-wide FAQ accordion. Answers that the client supplied are used verbatim;
 * where only a question was provided, a concise, accurate answer has been added.
 */
export const faqGroups: FAQGroup[] = [
  {
    category: 'Mortgage Basics',
    items: [
      {
        q: 'What is a mortgage, and how does it work?',
        a: 'A mortgage is a loan used to purchase a home or property. You borrow money from a lender, and in return, the property serves as collateral. You repay the loan with interest over a specified period, usually 15, 20, or 30 years.',
      },
      {
        q: 'How much can I afford for a home purchase?',
        a: 'Affordability depends on your income, existing debts, down payment, and the interest rate. Lenders use gross (GDS) and total (TDS) debt-service ratios to set your limit. Our affordability calculator gives you a quick estimate, and a pre-approval confirms an exact figure.',
      },
    ],
  },
  {
    category: 'Mortgage Process',
    items: [
      {
        q: 'What documents do I need to apply for a mortgage?',
        a: 'Typically, you’ll need proof of income, employment records, credit history, bank statements, and identification. We’ll guide you through gathering all required documents for a seamless application process.',
      },
      {
        q: 'How long does the mortgage approval process take?',
        a: 'A pre-approval can often be issued within 24–48 hours. A full approval, once you have an accepted offer and have submitted your documents, usually takes a few business days depending on the lender and the complexity of your file.',
      },
      {
        q: 'Can I still get a mortgage with a low credit score?',
        a: 'Yes. There are mortgage options for individuals with varying credit scores, including alternative and private lenders. We’ll help you explore these options and provide advice on improving your credit if needed.',
      },
    ],
  },
  {
    category: 'Mortgage Rates & Terms',
    items: [
      {
        q: 'What’s the difference between fixed and variable interest rates?',
        a: 'A fixed-rate mortgage has a stable interest rate, meaning your payments remain the same. Variable-rate mortgages fluctuate with market interest rates, which can result in higher or lower payments over time.',
      },
      {
        q: 'How do I choose the best mortgage term?',
        a: 'The right term depends on your plans for the property, your tolerance for rate changes, and current market conditions. Shorter terms can offer flexibility, while longer terms lock in certainty. We’ll walk you through the trade-offs for your situation.',
      },
    ],
  },
  {
    category: 'Mortgage Renewal & Refinancing',
    items: [
      {
        q: 'What is mortgage renewal, and when should I consider it?',
        a: 'Mortgage renewal occurs at the end of your current mortgage term. It’s a chance to renegotiate terms and rates. Renewing early can lock in lower rates, potentially reducing your monthly payments.',
      },
      {
        q: 'How does refinancing work?',
        a: 'Refinancing replaces your existing mortgage with a new one—ideally with better terms. It can lower your rate, change your amortization, or let you access home equity for renovations or debt consolidation. We review your goals to confirm it makes financial sense before proceeding.',
      },
    ],
  },
  {
    category: 'Down Payment & Closing Costs',
    items: [
      {
        q: 'How much down payment is required?',
        a: 'In Canada, a minimum down payment of 5% is required for properties under $500,000. Properties above this amount may require a larger down payment. A higher down payment can help lower your monthly payments and interest.',
      },
      {
        q: 'What are closing costs, and how much should I budget for them?',
        a: 'Closing costs are one-time expenses paid when your purchase finalizes—land transfer tax, legal fees, title insurance, and an appraisal or home inspection. A common guideline is to budget roughly 1.5%–4% of the purchase price.',
      },
    ],
  },
  {
    category: 'Investment & Insurance',
    items: [
      {
        q: 'How can I use my home equity for investments?',
        a: 'Home equity can be accessed through refinancing or a home equity line of credit (HELOC) to fund other investments. Amarpreet can guide you on how to strategically leverage this option.',
      },
      {
        q: 'Do I need mortgage insurance?',
        a: 'If your down payment is less than 20% of the purchase price, mortgage default insurance (e.g., CMHC) is required. It protects the lender and allows you to buy with a smaller down payment. Optional mortgage life and disability insurance is also available to protect your family.',
      },
      {
        q: 'How does a pre-approval benefit me?',
        a: 'A pre-approval tells you exactly how much you can borrow, locks in an interest rate for a set period, and signals to sellers that you’re a serious, qualified buyer—giving you an edge in a competitive market.',
      },
      {
        q: 'How do I start the mortgage application process?',
        a: 'Simply reach out for a free, no-obligation consultation. We’ll discuss your goals, outline the documents you’ll need, and begin your pre-approval right away.',
      },
    ],
  },
];
