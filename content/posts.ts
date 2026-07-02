export type PostBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'ul'; items: string[] };

export type Post = {
  slug: string;
  title: string;
  /** ISO date */
  date: string;
  dateDisplay: string;
  comments: string;
  excerpt: string;
  readMinutes: number;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: 'empower-your-financial-journey-with-tailored-mortgage-solutions',
    title:
      'Empower Your Financial Journey with Tailored Mortgage Solutions from Amarpreet Bhui',
    date: '2024-11-25',
    dateDisplay: 'November 25, 2024',
    comments: 'No Comments',
    readMinutes: 4,
    excerpt:
      'In today’s dynamic real estate market, finding the right mortgage solution can be a game-changer. At Amarpreet Bhui, we understand that no two financial situations are the same.',
    body: [
      {
        kind: 'p',
        text: 'In today’s dynamic real estate market, finding the right mortgage solution can be a game-changer. At Amarpreet Bhui, we understand that no two financial situations are the same—which is why a tailored approach matters more than ever. The right mortgage isn’t simply the one with the lowest advertised rate; it’s the one that fits your income, your goals, and the life you’re building.',
      },
      {
        kind: 'h2',
        text: 'Why a Personalized Approach Matters',
      },
      {
        kind: 'p',
        text: 'Banks tend to offer the products on their own shelf. As an independent mortgage broker, Amarpreet Bhui works on your behalf—comparing options across a wide network of lenders to find terms that genuinely suit your circumstances. With over 15 years of experience and more than 1,700 mortgages personally approved, that experience translates into fewer surprises and better outcomes.',
      },
      {
        kind: 'h2',
        text: 'Solutions for Every Stage',
      },
      {
        kind: 'p',
        text: 'Whatever chapter you’re in, there’s a path forward:',
      },
      {
        kind: 'ul',
        items: [
          'First-time buyers: clear guidance from pre-approval to closing, plus help accessing first-time buyer programs.',
          'Renewing homeowners: a fresh look at the market so you don’t default to your lender’s first offer.',
          'Refinancing: lower your rate, consolidate higher-interest debt, or unlock equity for what matters next.',
          'Self-employed and investors: financing structured around real-world income and long-term strategy.',
        ],
      },
      {
        kind: 'h2',
        text: 'A Process Built Around You',
      },
      {
        kind: 'p',
        text: 'From the first conversation, the goal is to make the mortgage process as simple and stress-free as possible. We listen first, explain your options in plain language, and stay available through every step—so you can make confident decisions about one of the biggest investments of your life.',
      },
      {
        kind: 'p',
        text: 'Ready to explore what’s possible? Reach out for a free, no-obligation consultation and take the next step toward owning real estate in Southern Ontario.',
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
