import {
  RefreshCw,
  Building2,
  Briefcase,
  TrendingDown,
  KeyRound,
  LineChart,
  PiggyBank,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

/** A definition-style list item: optional bold lead-in + description. */
export type DefItem = { term?: string; desc: string };

export type ServiceBlock =
  | { kind: 'prose'; heading?: string; paragraphs: string[] }
  | {
      kind: 'list';
      heading: string;
      intro?: string;
      items: DefItem[];
      ordered?: boolean;
    };

export type ServiceFAQ = { q: string; a: string };

export type Service = {
  slug: string;
  /** Short title for nav, cards, breadcrumbs */
  title: string;
  /** One-line card teaser (from the home services grid) */
  summary: string;
  icon: LucideIcon;
  /** Optional hero image override. Defaults to /images/services/{slug}.jpg */
  image?: string;
  /** Full headline on the detail page */
  headline: string;
  /** Opening paragraph(s) */
  intro: string[];
  blocks: ServiceBlock[];
  faqs?: ServiceFAQ[];
  closing: { heading: string; body: string };
};

export const services: Service[] = [
  {
    slug: 'mortgage-renewal',
    title: 'Mortgage Renewal',
    summary:
      'When a mortgage term comes to an end, your lender will usually offer you a renewal.',
    icon: RefreshCw,
    headline: 'Mortgage Renewals — Maximize Your Mortgage Benefits',
    intro: [
      'When your mortgage term ends, it’s an opportunity to evaluate your options and ensure you’re getting the best possible deal. At Amarpreet Bhui, we specialize in helping you navigate the mortgage renewal process, offering expert advice and guidance to secure the most favorable terms. Don’t settle for a standard renewal—let us help you take advantage of better rates and features that suit your evolving financial needs.',
    ],
    blocks: [
      {
        kind: 'list',
        heading: 'Why Consider a Mortgage Renewal?',
        intro:
          'When a mortgage term comes to an end, your lender will usually offer you a renewal. While it may be tempting to accept the offer without shopping around, you could be missing out on substantial savings. Mortgage renewal is a chance to:',
        items: [
          {
            term: 'Negotiate a Better Interest Rate',
            desc: 'Interest rates fluctuate, and if rates have dropped since you last secured a mortgage, renewing at a lower rate could save you thousands of dollars over time.',
          },
          {
            term: 'Switch to a Different Lender',
            desc: 'Your current lender isn’t the only option. We can help you explore other lenders who may offer better terms and conditions.',
          },
          {
            term: 'Revisit Your Payment Schedule',
            desc: 'Adjusting your payment schedule (monthly, bi-weekly, etc.) to better suit your financial situation can help you pay off your mortgage faster or reduce monthly payments.',
          },
          {
            term: 'Access Home Equity',
            desc: 'If you’ve built up significant equity, renewing your mortgage is a good time to consider refinancing to access those funds for renovations, debt consolidation, or other needs.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Our Mortgage Renewal Process',
        intro:
          'Amarpreet Bhui provides a hassle-free, step-by-step approach to mortgage renewals:',
        ordered: true,
        items: [
          {
            term: 'Assessment of Your Current Mortgage',
            desc: 'We review your existing mortgage terms and financial goals to understand your specific needs.',
          },
          {
            term: 'Rate Comparison',
            desc: 'We research and compare rates across various lenders to find the best options for your renewal.',
          },
          {
            term: 'Customized Solutions',
            desc: 'Whether you’re looking to lower your payments, access equity, or find more flexible terms, we tailor a solution that fits your situation.',
          },
          {
            term: 'Seamless Transition',
            desc: 'We handle the paperwork and negotiations with lenders, ensuring a smooth renewal process with no hidden fees or surprises.',
          },
          {
            term: 'Ongoing Support',
            desc: 'We continue to monitor market trends and interest rates, providing guidance on future renewals to help you stay ahead.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Choose Amarpreet Bhui for Your Mortgage Renewal?',
        items: [
          {
            term: 'Extensive Lender Network',
            desc: 'Our access to a variety of lenders ensures that you have a wide range of competitive options to choose from.',
          },
          {
            term: 'Expert Advice',
            desc: 'With years of experience in the mortgage industry, we understand the nuances of renewal terms and work to secure the best possible deal.',
          },
          {
            term: 'Tailored Solutions',
            desc: 'Every client’s situation is unique. We create customized renewal strategies based on your financial goals.',
          },
          {
            term: 'No Obligation Consultation',
            desc: 'We offer a free consultation to discuss your mortgage renewal needs, providing clarity and guidance at no cost.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'When should I start the renewal process?',
        a: 'It’s recommended to start looking at renewal options about 120 days (4 months) before your current mortgage term ends. This gives you enough time to explore other lenders and negotiate better rates.',
      },
      {
        q: 'Can I switch lenders when renewing my mortgage?',
        a: 'Yes. At renewal your mortgage balance can be transferred to a new lender, often at little or no cost. We compare your current lender’s offer against the wider market and handle the switch for you if a better rate or feature is available.',
      },
      {
        q: 'What if I don’t qualify for a renewal?',
        a: 'If your situation has changed, there are still options. We work with a broad network of lenders—including alternative and private lenders—to find a renewal solution that fits your current circumstances and a plan to move back to traditional financing over time.',
      },
      {
        q: 'Are there fees involved in switching lenders?',
        a: 'A straight switch at renewal is frequently covered by the new lender, with minimal or no fees. Where small costs such as discharge or appraisal fees apply, we’ll lay them out up front so you can weigh them against your savings before deciding.',
      },
    ],
    closing: {
      heading: 'Get in Touch for Your Mortgage Renewal Today',
      body: 'Don’t leave your mortgage renewal to chance. Contact Amarpreet Bhui today for a free consultation, and let us help you secure the best terms for your renewed mortgage. We’re here to make sure you get the most value out of your mortgage renewal.',
    },
  },

  {
    slug: 'commercial-mortgages',
    title: 'Commercial Mortgages',
    summary:
      'A commercial mortgage is a loan specifically designed for purchasing commercial real estate.',
    icon: Building2,
    headline: 'Commercial Mortgages — Financing Solutions for Your Business',
    intro: [
      'Expanding your business or investing in commercial property requires careful financial planning and the right financing partner. At Amarpreet Bhui, Mortgage Broker, we specialize in securing commercial mortgages that cater to various business needs. Whether you’re purchasing a new office space, retail store, warehouse, or other commercial properties, Amarpreet provides expert guidance and tailored mortgage solutions to help you achieve your business goals.',
    ],
    blocks: [
      {
        kind: 'prose',
        heading: 'What Is a Commercial Mortgage?',
        paragraphs: [
          'A commercial mortgage is a loan specifically designed for purchasing or refinancing commercial real estate. It can be used for various types of properties, including retail spaces, office buildings, industrial facilities, or multi-unit residential buildings used for business purposes. Unlike residential mortgages, commercial loans typically have different lending criteria, terms, and requirements, which is why expert guidance is essential.',
        ],
      },
      {
        kind: 'list',
        heading: 'Our Commercial Mortgage Services',
        items: [
          {
            term: 'Office Spaces',
            desc: 'Purchasing or expanding your office space can be a major step toward growing your business. We help you find competitive commercial mortgage rates and terms to secure the office environment you need for productivity and growth.',
          },
          {
            term: 'Retail Properties',
            desc: 'If you’re looking to buy or refinance retail space for your business, Amarpreet can connect you with the best lenders and financing options. We understand the unique challenges retail businesses face and offer customized solutions to meet your needs.',
          },
          {
            term: 'Industrial Properties',
            desc: 'Industrial spaces, such as warehouses, manufacturing plants, and distribution centers, often require specific financing arrangements. We have the expertise to navigate complex commercial mortgage requirements, ensuring you get the best terms for your industrial property investment.',
          },
          {
            term: 'Multi-Unit Residential Properties',
            desc: 'Investing in multi-unit residential properties, such as apartment buildings or mixed-use developments, can be a profitable venture. We assist investors in securing mortgages with favorable terms, helping you maximize returns while managing risks.',
          },
          {
            term: 'Specialty Properties',
            desc: 'Some properties, such as hotels, restaurants, or healthcare facilities, may come with unique financing requirements. Amarpreet Bhui has experience in dealing with specialty commercial properties and can guide you through the process of finding the right mortgage solution for your business.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Choose Amarpreet Bhui for Your Commercial Mortgage?',
        items: [
          {
            term: 'Customized Solutions',
            desc: 'We understand that each business has unique needs. That’s why we tailor our commercial mortgage services to match your specific financial situation and goals.',
          },
          {
            term: 'Extensive Lender Network',
            desc: 'With access to a wide range of commercial lenders, we can secure competitive rates and terms that fit your business requirements.',
          },
          {
            term: 'Expert Guidance',
            desc: 'Navigating the complexities of commercial mortgages can be overwhelming. Amarpreet’s expertise in the industry ensures that you receive the right advice and support throughout the entire process.',
          },
          {
            term: 'Fast and Efficient Process',
            desc: 'We know time is of the essence when it comes to business investments. Our streamlined process helps you secure financing quickly, so you can focus on growing your business.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Our Process — How We Help You Secure the Right Commercial Mortgage',
        ordered: true,
        items: [
          {
            term: 'Consultation and Assessment',
            desc: 'We start by understanding your business, financial situation, and goals. This initial consultation helps us identify the best commercial mortgage solutions for your needs.',
          },
          {
            term: 'Lender Matching and Application',
            desc: 'We connect you with suitable lenders from our extensive network and assist in preparing the necessary documentation to ensure a strong application.',
          },
          {
            term: 'Negotiation and Approval',
            desc: 'With our negotiation expertise, we work to secure favorable rates and terms that align with your business objectives. Once approved, we guide you through the closing process.',
          },
          {
            term: 'Ongoing Support',
            desc: 'Even after securing your commercial mortgage, we remain available to assist with any questions or refinancing needs in the future.',
          },
        ],
      },
    ],
    closing: {
      heading: 'Get Started with Your Commercial Mortgage Today',
      body: 'Investing in commercial property is a significant decision, but you don’t have to do it alone. With Amarpreet Bhui as your mortgage broker, you can be confident that you’re getting the best financing solutions for your business. Contact us today for a consultation and take the first step towards expanding your business or securing your next investment property.',
    },
  },

  {
    slug: 'self-employed-mortgages',
    title: 'Self-Employed Mortgages',
    summary:
      'Being your own boss comes with many rewards, but securing a mortgage can be challenging.',
    icon: Briefcase,
    headline: 'Self-Employed Mortgages — Flexible Financing for Entrepreneurs',
    intro: [
      'Being your own boss comes with many rewards, but securing a mortgage as a self-employed individual can be challenging. Traditional lenders may have stricter requirements or not fully understand the nature of variable income. At Amarpreet Bhui, we specialize in self-employed mortgages, offering flexible solutions tailored to your unique financial situation.',
    ],
    blocks: [
      {
        kind: 'prose',
        heading: 'Why Choose a Self-Employed Mortgage?',
        paragraphs: [
          'Whether you’re a freelancer, contractor, or small business owner, your income may not fit the conventional mold. Unlike standard mortgage products that heavily rely on steady paychecks and employer verification, self-employed mortgages offer options that take into account your business earnings, tax strategies, and deductions. We help you find a mortgage that works for you, so you can focus on growing your business and owning your dream home.',
        ],
      },
      {
        kind: 'list',
        heading: 'Our Self-Employed Mortgage Solutions',
        items: [
          {
            term: 'Income Verification Made Simple',
            desc: 'We understand that business income can fluctuate, making traditional income verification a hurdle. We offer flexible approaches to qualify you for a mortgage, including using business bank statements to verify income, incorporating additional income sources such as rental income, and considering gross revenue or declared income for qualifying purposes.',
          },
          {
            term: 'Customized Mortgage Solutions',
            desc: 'Self-employed mortgages are not one-size-fits-all. We’ll work closely with you to assess your financial situation and recommend a mortgage plan that aligns with your needs. From variable and fixed-rate options to flexible payment schedules, we offer customized solutions that make homeownership accessible.',
          },
          {
            term: 'Competitive Rates and Terms',
            desc: 'We have access to a wide network of lenders who specialize in self-employed mortgages. This allows us to find competitive rates and favorable terms, ensuring that you get the best deal without compromising on quality.',
          },
          {
            term: 'Streamlined Application Process',
            desc: 'Our streamlined application process is designed to make securing a mortgage as hassle-free as possible. We assist you every step of the way—from gathering the necessary documentation to negotiating terms—ensuring you get approved quickly and efficiently.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Overcoming Common Challenges for Self-Employed Borrowers',
        items: [
          {
            term: 'Low Reported Income on Tax Returns',
            desc: 'Many self-employed individuals reduce their taxable income through deductions, which can make it seem like they earn less. We work with lenders who understand this and consider the true picture of your finances.',
          },
          {
            term: 'Lack of Traditional Employment Verification',
            desc: 'Without an employer’s verification, it can be harder to prove consistent income. We’ll help you prepare alternate documentation, such as business financials or accountant-prepared statements, to strengthen your application.',
          },
          {
            term: 'Variable Cash Flow',
            desc: 'If your income fluctuates throughout the year, we’ll work to find flexible mortgage solutions that accommodate variable cash flow, ensuring you can keep up with payments during both peak and slow seasons.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Work with Amarpreet Bhui?',
        items: [
          {
            term: 'Specialized Expertise',
            desc: 'With extensive experience in self-employed mortgage solutions, we know what lenders are looking for and how to present your financial situation in the best light.',
          },
          {
            term: 'Access to Diverse Lenders',
            desc: 'Our network includes lenders who specialize in self-employed mortgages, giving you more options to choose from.',
          },
          {
            term: 'Personalized Service',
            desc: 'We take the time to understand your unique circumstances, offering tailored advice and support throughout the mortgage process.',
          },
          {
            term: 'Hassle-Free Process',
            desc: 'From application to approval, we handle all the details, making the process seamless and stress-free.',
          },
        ],
      },
    ],
    closing: {
      heading: 'Get Started Today',
      body: 'Owning a home as a self-employed professional is more attainable than you might think. Contact Amarpreet Bhui today for a consultation, and let’s explore the self-employed mortgage options available to you. We’re here to help you achieve your homeownership goals with financing that works for your lifestyle.',
    },
  },

  {
    slug: 'refinance',
    title: 'Refinance',
    summary: 'Unlock better rates, lower payments, and financial flexibility.',
    icon: TrendingDown,
    headline: 'Refinancing Mortgages — Unlock Better Rates and Flexibility',
    intro: [
      'Refinancing your mortgage can be a smart financial move, allowing you to take advantage of lower interest rates, reduce your monthly payments, or access cash for other needs. As a trusted mortgage broker, Amarpreet Bhui offers personalized refinancing solutions to help you maximize the benefits of your mortgage.',
    ],
    blocks: [
      {
        kind: 'list',
        heading: 'What is Mortgage Refinancing?',
        intro:
          'Mortgage refinancing involves replacing your current mortgage with a new one, ideally with better terms and conditions. This process can be beneficial if:',
        items: [
          { desc: 'Interest rates have dropped since you took out your original mortgage.' },
          { desc: 'You want to reduce your monthly payments by extending your loan term.' },
          {
            desc: 'You need to access home equity for renovations, debt consolidation, or other expenses.',
          },
          {
            desc: 'You prefer switching from a variable-rate to a fixed-rate mortgage (or vice versa) to better manage your budget.',
          },
          { desc: 'You wish to consolidate high-interest debt under a lower interest rate.' },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Refinance with Amarpreet Bhui?',
        intro:
          'Refinancing a mortgage is more than just securing a lower rate; it’s about choosing the right strategy that aligns with your financial goals. Amarpreet Bhui offers expert guidance throughout the refinancing process, helping you understand your options and select the best refinancing approach. Here’s what sets us apart:',
        items: [
          {
            term: 'Access to Competitive Rates',
            desc: 'With a broad network of lenders, we provide access to competitive interest rates that could save you thousands over the life of your mortgage.',
          },
          {
            term: 'Tailored Solutions',
            desc: 'We understand that every homeowner’s financial situation is unique. That’s why we offer customized refinancing strategies that fit your individual needs.',
          },
          {
            term: 'Streamlined Process',
            desc: 'We handle all the paperwork, negotiations, and details, making the refinancing process as seamless as possible.',
          },
          {
            term: 'Expert Advice',
            desc: 'With years of experience in the mortgage industry, Amarpreet Bhui provides insights that help you make informed decisions, ensuring you get the best refinancing terms available.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Types of Refinancing Options Available',
        items: [
          {
            term: 'Rate-and-Term Refinancing',
            desc: 'This type of refinancing allows you to replace your existing mortgage with a new one at a lower interest rate or with a different term. It’s an ideal option if your goal is to reduce your monthly payments or shorten your mortgage term to pay off your home faster.',
          },
          {
            term: 'Cash-Out Refinancing',
            desc: 'If you’ve built up significant equity in your home, cash-out refinancing enables you to access a portion of that equity in the form of cash. This can be used for home improvements, paying off high-interest debts, or other financial needs. You’ll still benefit from a new mortgage with potentially better terms.',
          },
          {
            term: 'Debt Consolidation Refinancing',
            desc: 'Consolidating high-interest debt, such as credit cards or personal loans, into your mortgage can help reduce your overall interest costs and simplify your finances. We can guide you through refinancing your mortgage to pay off these debts and lower your total monthly payments.',
          },
          {
            term: 'Adjustable-Rate to Fixed-Rate Refinancing (and Vice Versa)',
            desc: 'Switching from an adjustable-rate mortgage (ARM) to a fixed-rate mortgage (FRM) provides stability in your monthly payments, while moving from an FRM to an ARM can be beneficial if you want to take advantage of lower initial rates.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Is Refinancing Right for You?',
        intro:
          'While refinancing can offer significant benefits, it’s not the right choice for everyone. Amarpreet Bhui will conduct a thorough review of your current mortgage, financial situation, and goals to determine if refinancing is the right strategy. Factors to consider include:',
        items: [
          { desc: 'The current mortgage interest rate compared to your existing rate.' },
          { desc: 'Closing costs and fees associated with refinancing.' },
          { desc: 'How long you plan to stay in your home.' },
          {
            desc: 'Your financial objectives, such as paying off debt or reducing monthly expenses.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'The Refinancing Process',
        ordered: true,
        items: [
          {
            term: 'Consultation',
            desc: 'We start with a comprehensive discussion about your goals and current mortgage terms.',
          },
          {
            term: 'Review Options',
            desc: 'We’ll present refinancing options tailored to your needs, explaining the benefits and costs.',
          },
          {
            term: 'Application',
            desc: 'We’ll assist you in gathering the required documentation and submitting the refinancing application.',
          },
          {
            term: 'Approval',
            desc: 'Once approved, we’ll coordinate the closing process to finalize your new mortgage.',
          },
          {
            term: 'Enjoy the Benefits',
            desc: 'Start benefiting from lower payments, extra cash, or better loan terms!',
          },
        ],
      },
    ],
    closing: {
      heading: 'Contact Amarpreet Bhui Today!',
      body: 'Ready to explore refinancing your mortgage? Contact Amarpreet Bhui for a free consultation. We’re here to help you make the most of your mortgage, with refinancing options that suit your financial needs.',
    },
  },

  {
    slug: 'first-time-homebuyer',
    title: 'First-Time Homebuyer',
    summary: 'Buying your first home is an exciting milestone, but navigating it can be complex.',
    icon: KeyRound,
    headline: 'First-Time Homebuyer Mortgages — Guiding You to Your Dream Home',
    intro: [
      'Buying your first home is an exciting milestone, but navigating the mortgage process can be overwhelming. Amarpreet Bhui, a trusted mortgage broker, is here to make your first-time homebuying experience as seamless as possible. With personalized advice and tailored mortgage solutions, we help you take this important step with confidence.',
    ],
    blocks: [
      {
        kind: 'list',
        heading: 'Why Choose Amarpreet Bhui for Your First Home?',
        intro:
          'Buying your first home is more than just securing a loan; it’s about finding a mortgage that fits your lifestyle and long-term financial goals. Here’s how we can help:',
        items: [
          {
            term: 'Expert Guidance',
            desc: 'We simplify the mortgage process, providing clear explanations and expert advice every step of the way. From understanding mortgage terms to choosing the right lender, we ensure you make informed decisions.',
          },
          {
            term: 'Flexible Mortgage Options',
            desc: 'With access to a wide network of lenders, we offer a variety of mortgage options to suit your needs, whether it’s a fixed-rate mortgage, variable-rate mortgage, or other first-time buyer programs.',
          },
          {
            term: 'Personalized Solutions',
            desc: 'Your financial situation and homeownership goals are unique. We take the time to understand your needs and recommend mortgage products that align with your budget and future plans.',
          },
          {
            term: 'Pre-Approval Assistance',
            desc: 'Getting pre-approved for a mortgage can give you an advantage in the housing market. We’ll help you get pre-approved quickly, so you know exactly how much you can afford and can make an offer with confidence.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'What to Expect When Buying Your First Home',
        intro:
          'Understanding the mortgage process can make all the difference in your homebuying journey. Here’s what you can expect when you work with Amarpreet Bhui:',
        ordered: true,
        items: [
          {
            term: 'Initial Consultation',
            desc: 'We start by discussing your financial situation, homeownership goals, and any questions you may have. This helps us recommend the best mortgage solutions tailored to your needs.',
          },
          {
            term: 'Mortgage Pre-Approval',
            desc: 'We assist with securing a mortgage pre-approval, so you know your budget range and can make an offer with confidence. This step also helps you lock in an interest rate for a specified period.',
          },
          {
            term: 'Exploring First-Time Buyer Programs',
            desc: 'As a first-time homebuyer, you may be eligible for various government incentives and grants. We’ll walk you through these programs, such as the First-Time Home Buyer Incentive and the Home Buyers’ Plan, to see how they can benefit you.',
          },
          {
            term: 'Choosing the Right Mortgage Product',
            desc: 'We’ll present a variety of mortgage options and explain the pros and cons of each, helping you choose a plan that aligns with your financial goals—whether it’s a fixed-rate mortgage, variable-rate mortgage, or hybrid option.',
          },
          {
            term: 'Application Process and Approval',
            desc: 'Once you’ve found the right mortgage, we’ll guide you through the application process, ensuring all paperwork is completed accurately and efficiently. We stay in touch with the lender to make sure everything proceeds smoothly.',
          },
          {
            term: 'Closing the Deal',
            desc: 'We’re with you through to the closing date, ensuring all final details are handled. Our goal is to make sure your mortgage is approved, your documents are in order, and you’re fully prepared to take ownership of your new home.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'First-Time Homebuyer Programs You Should Know About',
        items: [
          {
            term: 'First-Time Home Buyer Incentive',
            desc: 'This program offers shared equity mortgages to help reduce monthly mortgage payments without increasing your down payment.',
          },
          {
            term: 'Home Buyers’ Plan (HBP)',
            desc: 'Allows first-time buyers to withdraw up to $35,000 from their Registered Retirement Savings Plan (RRSP) to put toward their home purchase.',
          },
          {
            term: 'Land Transfer Tax Rebates',
            desc: 'As a first-time buyer, you may qualify for land transfer tax rebates in some provinces.',
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the minimum down payment required for a first-time homebuyer?',
        a: 'Typically, you need at least 5% of the home’s purchase price for a down payment, but there are programs that may reduce this requirement.',
      },
      {
        q: 'Can I buy a home if I have a lower credit score?',
        a: 'Yes, there are mortgage options for individuals with varying credit scores. We’ll help you explore these options and provide advice on improving your credit if needed.',
      },
      {
        q: 'Should I choose a fixed-rate or variable-rate mortgage?',
        a: 'This depends on your financial goals and risk tolerance. We can help you weigh the pros and cons of each to make an informed decision.',
      },
    ],
    closing: {
      heading: 'Ready to Take the First Step?',
      body: 'If you’re ready to start your journey to homeownership, contact Amarpreet Bhui today for a free consultation. We’re here to provide the guidance and support you need to secure the best mortgage for your first home.',
    },
  },

  {
    slug: 'investment-property',
    title: 'Investment Property',
    summary: 'Investing in real estate is a proven strategy for building long-term wealth.',
    icon: LineChart,
    headline: 'Investment Property Mortgages — Grow Your Wealth with Smart Real Estate',
    intro: [
      'Investing in real estate is a proven strategy for building long-term wealth. Whether you’re looking to buy your first rental property, expand your portfolio, or venture into multi-unit buildings, Amarpreet Bhui, Mortgage Broker, can help you secure the right financing to maximize your returns. With extensive experience in investment property mortgages, Amarpreet offers expert guidance and access to competitive mortgage options, making your investment journey smoother and more profitable.',
    ],
    blocks: [
      {
        kind: 'list',
        heading: 'Why Choose an Investment Property Mortgage?',
        intro:
          'Real estate investments offer multiple financial benefits, such as passive income, tax advantages, and property appreciation. An investment property mortgage can help you:',
        items: [
          {
            term: 'Generate Rental Income',
            desc: 'Earn consistent cash flow by renting out your property.',
          },
          {
            term: 'Build Equity',
            desc: 'Pay down the mortgage while the property’s value appreciates, growing your equity.',
          },
          {
            term: 'Diversify Your Portfolio',
            desc: 'Add a tangible, appreciating asset to your investment portfolio.',
          },
          {
            term: 'Leverage Your Finances',
            desc: 'Use the mortgage to acquire more properties or make improvements to increase rental income.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'How We Help You Succeed',
        intro:
          'Amarpreet Bhui understands that no two investors are alike, and your investment strategy should reflect your individual financial goals. Here’s how we can help:',
        items: [
          {
            term: 'Tailored Financing Solutions',
            desc: 'We offer a variety of mortgage products for different types of investment properties, including single-family rentals, duplexes, multi-unit residential buildings, and mixed-use properties. Whether you’re a first-time investor or a seasoned real estate professional, we’ll customize a financing solution that aligns with your investment objectives.',
          },
          {
            term: 'Access to a Wide Network of Lenders',
            desc: 'With access to an extensive network of lenders, Amarpreet Bhui can help you find competitive rates and flexible terms. We shop the market to ensure you get the most favorable loan conditions, maximizing your investment potential.',
          },
          {
            term: 'Expert Guidance Throughout the Process',
            desc: 'Navigating the world of investment property mortgages can be complex. Amarpreet provides clear and comprehensive advice at every stage, from assessing your eligibility to finalizing the deal. We break down the jargon and handle the details so that you can focus on growing your investment portfolio.',
          },
          {
            term: 'Pre-Approval Assistance',
            desc: 'Get pre-approved for an investment property mortgage to give you an edge when making an offer. Pre-approval not only speeds up the buying process but also positions you as a serious buyer in a competitive market. Amarpreet will guide you through the pre-approval process, ensuring your documentation is complete and accurate.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Types of Investment Property Mortgages We Offer',
        items: [
          {
            term: 'Residential Investment Properties',
            desc: 'Ideal for those looking to invest in single-family homes, townhouses, or small multi-unit buildings. We help you find the right mortgage product to match your investment strategy and budget.',
          },
          {
            term: 'Multi-Unit Residential Mortgages',
            desc: 'For investors looking to finance larger properties with multiple rental units, we offer specialized mortgage products that cater to these unique requirements. Whether you’re purchasing a triplex, fourplex, or an apartment building, we can help secure the financing you need.',
          },
          {
            term: 'Mixed-Use Property Mortgages',
            desc: 'Investing in properties that combine residential and commercial spaces can be rewarding. We’ll help you navigate the unique considerations associated with mixed-use mortgages and find suitable financing solutions.',
          },
          {
            term: 'Commercial Investment Properties',
            desc: 'If your investment plans extend to retail spaces, offices, or industrial buildings, we provide commercial mortgage options with favorable terms for long-term profitability.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Choose Amarpreet Bhui for Your Investment Property Mortgage?',
        items: [
          {
            term: 'Experienced Advisor',
            desc: 'With a wealth of experience in mortgage brokering and a deep understanding of the investment market, Amarpreet provides insights that go beyond basic mortgage advice.',
          },
          {
            term: 'Customized Solutions',
            desc: 'We recognize that every investor’s needs are different. We tailor our services to ensure you get the best financing options to achieve your goals.',
          },
          {
            term: 'Hassle-Free Process',
            desc: 'From the initial consultation to securing the loan, we handle all the paperwork and negotiations, streamlining the mortgage process for you.',
          },
          {
            term: 'Ongoing Support',
            desc: 'Our relationship doesn’t end when you close your mortgage. We provide continuous support, advice, and refinancing options as your investment portfolio grows.',
          },
        ],
      },
    ],
    closing: {
      heading: 'Ready to Invest in Real Estate?',
      body: 'Partner with Amarpreet Bhui to secure the right mortgage for your investment property. Contact us today to schedule a consultation and explore your financing options. Take the first step toward building your wealth through smart real estate investments.',
    },
  },

  {
    slug: 'home-equity-loan',
    title: 'Home Equity Loan',
    summary: 'Your home is more than just a place to live—it’s a valuable financial asset.',
    icon: PiggyBank,
    headline: 'Home Equity Loans and Lines of Credit — Unlock the Value in Your Home',
    intro: [
      'Your home is more than just a place to live—it’s a valuable financial asset. With a home equity loan or line of credit, you can tap into your home’s value to access funds for various needs, from renovations and debt consolidation to educational expenses and emergency costs. As your trusted mortgage broker, Amarpreet Bhui can guide you through the process, ensuring you get the most out of your home’s equity.',
    ],
    blocks: [
      {
        kind: 'list',
        heading: 'What Are Home Equity Loans and Lines of Credit?',
        items: [
          {
            term: 'Home Equity Loan',
            desc: 'A home equity loan allows you to borrow a lump sum of money against the equity you’ve built in your home. It typically comes with a fixed interest rate and regular monthly payments, making it a stable choice for financing significant expenses such as home improvements or large purchases.',
          },
          {
            term: 'Home Equity Line of Credit (HELOC)',
            desc: 'A HELOC gives you access to a revolving line of credit based on your home’s equity. With a variable interest rate, it offers flexibility to borrow as needed and repay on your own schedule. It’s ideal for ongoing expenses or situations where you need quick access to funds.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Choose a Home Equity Loan or Line of Credit?',
        items: [
          {
            term: 'Home Renovations',
            desc: 'Finance upgrades that increase your property’s value.',
          },
          {
            term: 'Debt Consolidation',
            desc: 'Combine high-interest debts into one manageable payment with a lower interest rate.',
          },
          {
            term: 'Emergency Expenses',
            desc: 'Access funds quickly when unforeseen expenses arise.',
          },
          {
            term: 'Educational Costs',
            desc: 'Cover tuition fees or other educational expenses for yourself or your family.',
          },
          {
            term: 'Investment Opportunities',
            desc: 'Use your home’s equity to invest in other assets or properties.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'How Amarpreet Bhui Can Help',
        intro:
          'Navigating the world of home equity financing can be overwhelming, but Amarpreet Bhui is here to simplify the process. With years of experience and a client-focused approach, Amarpreet ensures you find the best solution for your unique financial needs.',
        items: [
          {
            term: 'Personalized Assessment',
            desc: 'We’ll start with a thorough assessment of your financial situation, understanding your goals and reviewing your home’s current value. This helps us determine the best loan or line of credit option for you.',
          },
          {
            term: 'Competitive Rates and Terms',
            desc: 'As an experienced mortgage broker, Amarpreet has access to a wide range of lenders. This enables us to find competitive interest rates and flexible repayment terms, tailored to your requirements.',
          },
          {
            term: 'Expert Guidance Throughout the Process',
            desc: 'From gathering documents to completing the paperwork, we’ll walk you through every step. Amarpreet ensures a seamless experience, addressing any questions or concerns you may have along the way.',
          },
          {
            term: 'Ongoing Support',
            desc: 'Our relationship doesn’t end when your loan is approved. We continue to support you, providing advice on managing your payments or exploring refinancing options if needed in the future.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'Understanding Your Home’s Equity',
        paragraphs: [
          'To qualify for a home equity loan or line of credit, you’ll need to have built up a substantial amount of equity in your property. This is calculated by subtracting your outstanding mortgage balance from your home’s current market value. The more equity you have, the more borrowing power you possess.',
        ],
      },
      {
        kind: 'list',
        heading: 'Why Work with Amarpreet Bhui?',
        items: [
          {
            term: 'Extensive Lender Network',
            desc: 'Gain access to top lenders with favorable rates and terms.',
          },
          {
            term: 'Client-Centered Approach',
            desc: 'We take the time to understand your goals and provide personalized advice.',
          },
          {
            term: 'Transparent Process',
            desc: 'No surprises, just clear and honest guidance every step of the way.',
          },
          {
            term: 'Trusted Expertise',
            desc: 'Benefit from years of experience in mortgage services and financial planning.',
          },
        ],
      },
    ],
    closing: {
      heading: 'Ready to Tap Into Your Home’s Equity?',
      body: 'Contact Amarpreet Bhui today to discuss your options for a home equity loan or line of credit. We’ll help you unlock the value in your home and put it to work for you.',
    },
  },

  {
    slug: 'risk-management',
    title: 'Risk Management',
    summary:
      'Protect your team and your business with comprehensive employee benefits and insurance solutions.',
    icon: ShieldCheck,
    image: '/images/services/risk-management.jpg',
    headline: 'Risk Management — Comprehensive Employee Benefits & Insurance',
    intro: [
      'Protecting what matters most goes beyond your mortgage. Amarpreet Bhui helps individuals, families, and businesses put the right insurance and employee benefits in place—so an unexpected illness, injury, or loss never derails your financial plans. We take the time to understand your needs and design coverage that delivers real security and peace of mind.',
    ],
    blocks: [
      {
        kind: 'list',
        heading: 'Comprehensive Employee Benefits',
        intro:
          'A well-designed benefits program helps you attract and retain talent while safeguarding your employees and their families. We offer a full range of group and individual insurance solutions:',
        items: [
          {
            term: 'Group Health Insurance',
            desc: 'Comprehensive medical coverage for employees and their families.',
          },
          {
            term: 'Life & AD&D Insurance',
            desc: 'Financial security for employees and their loved ones.',
          },
          {
            term: 'Dental & Vision Plans',
            desc: 'Affordable care solutions for essential health needs.',
          },
          {
            term: 'Long-Term Care Insurance',
            desc: 'Coverage for extended medical and caregiving needs.',
          },
          {
            term: 'Disability Insurance',
            desc: 'Income protection in case of illness or injury.',
          },
          {
            term: 'Group Accident & Hospital Insurance',
            desc: 'Financial protection against unexpected medical expenses.',
          },
        ],
      },
      {
        kind: 'list',
        heading: 'Why Choose Amarpreet Bhui for Risk Management?',
        items: [
          {
            term: 'Tailored Coverage',
            desc: 'We assess your unique situation and recommend plans that fit your people, your budget, and your goals.',
          },
          {
            term: 'Wide Range of Providers',
            desc: 'Access to a broad network of insurers means competitive rates and flexible plan designs.',
          },
          {
            term: 'End-to-End Support',
            desc: 'From plan setup to claims and renewals, we handle the details so you can focus on your business.',
          },
          {
            term: 'Integrated Financial Advice',
            desc: 'Coordinate your insurance and benefits with your broader mortgage and financial strategy under one trusted advisor.',
          },
        ],
      },
    ],
    closing: {
      heading: 'Protect Your Team and Your Future',
      body: 'Contact Amarpreet Bhui today for a free consultation on employee benefits and insurance solutions. We’ll help you build coverage that protects what matters most.',
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
