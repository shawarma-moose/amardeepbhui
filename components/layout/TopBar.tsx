import { Phone, Mail, MapPin } from 'lucide-react';
import { site } from '@/lib/site';
import Socials from './Socials';

/** Slim utility bar above the main nav. Hidden on small screens to save height. */
export default function TopBar() {
  return (
    <div className="hidden border-b border-border bg-surface lg:block">
      <div className="shell flex h-10 items-center justify-between text-caption text-muted">
        <div className="flex items-center gap-6">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-evergreen"
          >
            <Phone className="h-3.5 w-3.5 text-evergreen" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <a
            href={site.emailHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-evergreen"
          >
            <Mail className="h-3.5 w-3.5 text-evergreen" aria-hidden="true" />
            {site.email}
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-evergreen" aria-hidden="true" />
            {site.office.line1}, {site.office.city}
          </span>
        </div>
        <Socials />
      </div>
    </div>
  );
}
