export type Testimonial = {
  /** Short headline used on the dedicated testimonials page */
  title?: string;
  quote: string;
  author: string;
  /** which service the story relates to — drives a small brass tag */
  topic: string;
};

export const testimonials: Testimonial[] = [
  {
    title: 'Made Our First Home Purchase a Breeze',
    quote:
      'As first-time homebuyers, we had a lot of questions and concerns. Amarpreet guided us through the entire mortgage process, patiently explaining every step. He found us a great rate, and the entire experience was smooth and stress-free. We couldn’t be happier with our new home and the service we received!',
    author: 'Sarah & John P.',
    topic: 'First-Time Homebuyer',
  },
  {
    title: 'Refinancing Was a Game-Changer',
    quote:
      'Amarpreet helped us refinance our mortgage and significantly lower our interest rate. We were able to consolidate some debt, freeing up cash flow for our family. His expertise and dedication made all the difference in securing the best terms possible. Highly recommend!',
    author: 'Jessica R.',
    topic: 'Refinance',
  },
  {
    title: 'A Smooth Renewal Process with Better Rates',
    quote:
      'When our mortgage renewal was approaching, we thought we’d just stick with our current lender. Amarpreet showed us other options, and we ended up securing a much better rate than we expected. His knowledge and professionalism made the whole process quick and easy.',
    author: 'Mark S.',
    topic: 'Mortgage Renewal',
  },
  {
    title: 'Unlocking Home Equity Was Easier Than We Thought',
    quote:
      'We needed extra funds for some major home renovations, and Amarpreet helped us access our home’s equity with a line of credit. He explained all our options and guided us step by step, ensuring we chose the right product for our needs. Now, our home is exactly how we’ve always wanted it.',
    author: 'Rachel & Kevin T.',
    topic: 'Home Equity Loan',
  },
  {
    title: 'Perfect Partner for Investment Property Financing',
    quote:
      'Amarpreet was instrumental in helping us secure a mortgage for our first investment property. His advice on the different financing options and his connections with various lenders gave us the confidence to move forward. We are already seeing great returns, thanks to his expertise.',
    author: 'Michael D.',
    topic: 'Investment Property',
  },
  {
    title: 'Understood My Unique Situation as a Self-Employed Individual',
    quote:
      'Being self-employed, I was worried about qualifying for a mortgage, but Amarpreet understood the challenges I faced. He found lenders that considered my income structure and guided me through the process, making it far less complicated than I anticipated. Now I own my dream home!',
    author: 'Priya K.',
    topic: 'Self-Employed Mortgages',
  },
  {
    title: 'Efficient and Professional Commercial Mortgage Services',
    quote:
      'Amarpreet helped us secure a mortgage for a new commercial property for our business. The process was seamless, and his insights into commercial lending were invaluable. He worked tirelessly to get us the best terms, allowing us to expand our operations without financial strain.',
    author: 'Thomas W.',
    topic: 'Commercial Mortgages',
  },
];
