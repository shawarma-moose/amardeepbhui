/**
 * Single source of truth for every brand fact.
 * Nothing on the site should hard-code these values — import from here.
 */

export const site = {
  name: 'Amarpreet Bhui',
  role: 'Licensed Mortgage Broker',
  brokerage: 'The Mortgage Alliance Company of Canada',
  brokerageLicence: '10530',
  fsraLicence: 'M09000429',
  affiliation: 'Mortgage Professional Canada',

  // Headline credibility figures (also drive the animated stat ledger)
  stats: {
    experienceYears: 15,
    fundedDollars: 100, // $100M+
    approvals: 1700, // 1,700+
  },

  phoneDisplay: '647 273 0555',
  phoneHref: 'tel:6472730555',
  whatsappHref: 'https://wa.me/16472730555',
  email: 'info@amarpreetbhui.ca',
  emailHref: 'mailto:info@amarpreetbhui.ca',

  // External application portal (Mortgage Boss / Mortgage Alliance). Single source of truth.
  applyUrl: 'https://apply.mortgageboss.ca/MAC/AmarpreetBhui',

  office: {
    line1: '600 Matheson Blvd, Unit 5',
    city: 'Mississauga, ON',
    postal: 'L5R 4C1',
    full: '600 Matheson Blvd, Unit 5, Mississauga, ON, L5R 4C1',
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=600+Matheson+Blvd+Unit+5+Mississauga+ON+L5R+4C1',
    mapEmbed:
      'https://www.google.com/maps?q=600+Matheson+Blvd+Unit+5+Mississauga+ON+L5R+4C1&output=embed',
  },

  social: {
    facebook: 'https://www.facebook.com/bestmortgageadvisor',
    x: 'https://x.com/amarpreet_MA',
    linkedin: 'https://www.linkedin.com/in/amarpreetbhuimortgage',
    instagram: 'https://www.instagram.com/accounts/login/?next=%2Famarpreet.bhui&source=omni_redirect',
  },

  // Required legal line — must render verbatim in the footer.
  legalLine:
    'FSRA Licence number: M09000429 · Licensed by The Mortgage Alliance Company of Canada, Licence number: 10530 · Mortgage Professional Canada',

  url: 'https://www.amarpreetbhui.ca',
  locale: 'en_CA',

  // Real assets supplied by the client.
  portraitSrc: '/images/amarpreet-portrait.png', // clean professional headshot
  logoSrc: '/images/logo.png', // Mortgage Alliance brand logo
  heroSrc: '/images/hero.jpg', // TODO: flip to '/images/hero.jpg' (real licensed lifestyle photo)

  // About-page biography — rendered verbatim.
  bio: [
    'Hello, and welcome to my website. My name is Amarpreet Bhui, and I am a licensed Mortgage Broker with Mortgage Alliance, Lic # 10530, with over 15 years of experience in the industry. During this time, I have helped hundreds of clients secure the funding they need to achieve their dreams of homeownership, investment, and financial stability.',
    'My passion for the mortgage industry began early in my career, where I quickly developed a knack for understanding the nuances of different mortgage products and lenders. As my experience grew, so did my reputation for excellence and dedication to my clients’ success. To date, I have secured over $100 million in funded mortgages, helping clients across a diverse range of backgrounds, budgets, and financial goals.',
    'My approach to mortgage brokerage is grounded in personalized attention and tailored solutions. I understand that every client is unique, with their own set of financial needs and circumstances. That’s why I take the time to listen to my clients, to understand their goals, and to recommend a mortgage solution that works best for them. I pride myself on being approachable, communicative, and responsive, providing clients with the information they need to make informed decisions about their finances.',
    'Throughout my career, I have stayed at the forefront of the mortgage industry, keeping up-to-date with the latest trends, products, and regulations. I have built a vast network of lenders and mortgage providers, allowing me to offer my clients a wide range of options to choose from. Whether you’re a first-time homebuyer, a seasoned investor, or looking to refinance your current mortgage, I am confident that I can help you secure the funding you need to achieve your financial goals.',
    'Thank you for taking the time to learn a little bit more about me and my services. I look forward to the opportunity to work with you and help you achieve your financial dreams. Please don’t hesitate to contact me if you have any questions or would like to schedule a consultation.',
  ],

  tagline: 'Your Local and Reliable Mortgage Broker',
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Mortgage Renewal', href: '/services/mortgage-renewal' },
      { label: 'Commercial Mortgages', href: '/services/commercial-mortgages' },
      { label: 'Self-Employed Mortgages', href: '/services/self-employed-mortgages' },
      { label: 'Refinance', href: '/services/refinance' },
      { label: 'First-Time Homebuyer', href: '/services/first-time-homebuyer' },
      { label: 'Investment Property', href: '/services/investment-property' },
      { label: 'Home Equity Loan', href: '/services/home-equity-loan' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/guides',
    children: [
      { label: 'Mortgage Guides', href: '/resources/guides' },
      { label: 'FAQs', href: '/resources/faqs' },
    ],
  },
  {
    label: 'Calculators',
    href: '/calculators',
    children: [
      { label: 'Affordability', href: '/calculators/affordability' },
      { label: 'Mortgage Payment', href: '/calculators/mortgage-payment' },
      { label: 'Refinance', href: '/calculators/refinance' },
      { label: 'Rent vs. Buy', href: '/calculators/rent-vs-buy' },
      { label: 'Debt Consolidation', href: '/calculators/debt-consolidation' },
      { label: 'Closing Fees', href: '/calculators/closing-fees' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
