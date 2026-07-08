import ApplyNowButton from '@/components/ui/ApplyNowButton';
import Button from '@/components/ui/Button';
import SendCopyButton from './SendCopyButton';
import { cn } from '@/lib/cn';

/** The three shared calculator CTAs — used in the results panel and the input rail. */
export default function CalcActions({
  summary,
  className,
}: {
  summary?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <ApplyNowButton size="md" className="w-full justify-center" />
      <Button href="/about#contact" variant="secondary" size="md" className="w-full justify-center">
        Contact Amarpreet Bhui
      </Button>
      <SendCopyButton summary={summary} />
    </div>
  );
}
