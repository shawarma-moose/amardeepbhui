import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Clean white-based system. Evergreen = single accent; aubergine = rare.
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        evergreen: 'var(--evergreen)',
        aubergine: 'var(--aubergine)',
        // Legacy aliases (remapped) so any un-migrated markup stays sensible.
        cream: 'var(--bg)',
        'cream-2': 'var(--surface)',
        mist: 'var(--muted)',
        brass: 'var(--border)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Calm, conventional scale — hero tops out around 52px.
        'display-xl': ['clamp(2.25rem, 1.4rem + 2.6vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.018em' }],
        'display-lg': ['clamp(1.9rem, 1.3rem + 1.8vw, 2.6rem)', { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.6rem, 1.2rem + 1.1vw, 2.1rem)', { lineHeight: '1.18', letterSpacing: '-0.012em' }],
        h3: ['clamp(1.2rem, 1.05rem + 0.5vw, 1.4rem)', { lineHeight: '1.3', letterSpacing: '-0.008em' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        caption: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.005em' }],
      },
      maxWidth: {
        shell: '75rem',
      },
      borderRadius: {
        btn: '0.5rem',
      },
      boxShadow: {
        // soft, single, subtle — used on hover only
        card: '0 1px 2px rgba(26,26,26,0.04)',
        hover: '0 10px 30px -18px rgba(26,26,26,0.25)',
        frame: '0 18px 48px -28px rgba(26,26,26,0.35)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
