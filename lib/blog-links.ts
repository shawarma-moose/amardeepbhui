import { site } from '@/lib/site';
import { services } from '@/content/services';

/**
 * Posts in Uplift were first published on miigrowth.com, so their bodies (and
 * JSON-LD) link to that domain and give a miigrowth.com email. Rewrite those
 * references to this site at render time so every in-post link stays here.
 */
const LEGACY_ORIGIN = /https?:\/\/(?:www\.)?miigrowth\.com/gi;
const LEGACY_EMAIL = /[a-z0-9._-]+@miigrowth\.com/gi;
const LEGACY_BRAND = />\s*MiiGrowth\s*</g;
const SITE = site.url.replace(/\./g, '\\.');
const BLOG_HREF = new RegExp(`href="${SITE}/blog/([a-z0-9-]+)"`, 'g');
const HOME_HREF = new RegExp(`href="${SITE}/?"`, 'g');

/** Old miigrowth.com slugs that never existed here → the closest live post. */
const SLUG_ALIASES: Record<string, string> = {
  'residential-home-loan-rates': 'best-mortgage-rates-southern-ontario-compare-offers-total',
};

/** Where a linked blog slug should point on this site. */
function resolveBlogHref(slug: string, liveSlugs: Set<string>): string {
  if (liveSlugs.has(slug)) return `/blog/${slug}`;
  const alias = SLUG_ALIASES[slug];
  if (alias && liveSlugs.has(alias)) return `/blog/${alias}`;
  // e.g. "first-time-homebuyer-mortgage-steps" → the First-Time Homebuyer service page
  const service = services.find((s) => slug.includes(s.slug));
  if (service) return `/services/${service.slug}`;
  return '/blog';
}

export function localizeBlogContent(html: string, liveSlugs: Set<string>): string {
  return html
    .replace(LEGACY_EMAIL, site.email)
    .replace(LEGACY_ORIGIN, site.url)
    .replace(LEGACY_BRAND, '>amarpreetbhui.ca<')
    .replace(BLOG_HREF, (_, slug: string) => `href="${resolveBlogHref(slug, liveSlugs)}"`)
    .replace(HOME_HREF, 'href="/"');
}
