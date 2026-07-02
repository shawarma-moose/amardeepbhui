import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

/** X (Twitter) has no stable lucide glyph — inline it to avoid version drift. */
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const links = [
  { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
  { label: 'X', href: site.social.x, Icon: XMark },
  { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: site.social.instagram, Icon: Instagram },
];

export default function Socials({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={cn('flex items-center gap-1.5', className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${label}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-mist transition-colors duration-200 hover:bg-evergreen/10 hover:text-evergreen"
          >
            <Icon className={cn('h-4 w-4', iconClassName)} />
          </a>
        </li>
      ))}
    </ul>
  );
}
