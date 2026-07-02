import { Mail } from 'lucide-react';
import { site } from '@/lib/site';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * "Send me a copy" — STUB. For now this opens the visitor's mail client addressed
 * to Amarpreet with the results summary prefilled.
 * TODO: wire to a real backend that emails the results to the visitor.
 */
export default function SendCopyButton({
  summary,
  className,
}: {
  summary?: string;
  className?: string;
}) {
  const subject = encodeURIComponent('My mortgage calculator results');
  const body = encodeURIComponent(
    summary ? `${summary}\n\n(Sent from amarpreetbhui.ca calculators)` : ''
  );
  return (
    <a
      href={`${site.emailHref}?subject=${subject}&body=${body}`}
      className={buttonClasses({
        variant: 'ghost',
        size: 'md',
        className: cn('w-full justify-center gap-2', className),
      })}
    >
      <Mail className="h-4 w-4" aria-hidden="true" /> Send me a copy
    </a>
  );
}
