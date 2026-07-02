import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn font-sans font-semibold tracking-tight transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-editorial focus-visible:outline-2 motion-safe:active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-evergreen text-white hover:bg-[var(--evergreen-deep)] hover:shadow-hover motion-safe:hover:-translate-y-0.5',
  secondary:
    'bg-white text-ink border border-border hover:border-evergreen hover:text-evergreen hover:shadow-card motion-safe:hover:-translate-y-0.5',
  ghost: 'bg-transparent text-evergreen hover:text-aubergine',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-6 py-3 text-base',
};

/** Shared class builder so non-<Button> elements (e.g. external links) can match. */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
