import type { Metadata } from 'next';
import { Source_Serif_4, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import LenisProvider from '@/components/motion/LenisProvider';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTAs from '@/components/layout/FloatingCTAs';

// Display: Source Serif 4 — a refined, established serif used at modest sizes.
const display = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

// Body: Hanken Grotesk — humanist, warmer than Inter.
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role} in Mississauga, ON`,
    template: `%s · ${site.name}`,
  },
  description:
    'Amarpreet Bhui is a licensed mortgage broker in Mississauga, Ontario with 15+ years of experience, $100M+ funded and 1,700+ mortgages approved. Get independent advice on renewals, refinances, first-time and self-employed mortgages.',
  keywords: [
    'mortgage broker Mississauga',
    'Ontario mortgage broker',
    'mortgage renewal',
    'refinance mortgage',
    'first-time homebuyer',
    'self-employed mortgage',
    'Amarpreet Bhui',
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role} in Mississauga, ON`,
    description:
      '15+ years, $100M+ funded, 1,700+ mortgages approved. Independent mortgage advice in Mississauga and across Ontario.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description:
      'Independent mortgage advice in Mississauga and across Ontario. 15+ years, $100M+ funded.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${display.variable} ${sans.variable}`}>
      <body>
        <LenisProvider>
          <a
            href="#main"
            className="sr-only z-[60] rounded-full bg-evergreen px-5 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingCTAs />
        </LenisProvider>
      </body>
    </html>
  );
}
