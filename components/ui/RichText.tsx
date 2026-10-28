import { Fragment } from 'react';
import Link from 'next/link';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders a content string, turning `[label](href)` into a link. Internal
 * paths use next/link; absolute URLs open in a new tab.
 */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    const className =
      'font-semibold text-evergreen underline decoration-evergreen/30 underline-offset-4 transition-colors hover:text-aubergine';
    parts.push(
      href.startsWith('/') || href.startsWith('#') ? (
        <Link key={at} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={at} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      ),
    );
    last = at + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}

/** The same string with link markup removed — for meta tags and JSON-LD. */
export function plainText(text: string) {
  return text.replace(LINK, '$1');
}
