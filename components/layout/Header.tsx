'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { cn } from '@/lib/cn';
import Button from '@/components/ui/Button';
import ApplyNowButton from '@/components/ui/ApplyNowButton';
import NavDropdown from './NavDropdown';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  // Once past the hero band the capsule tightens and gains a stronger shadow + blur.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      <div className={cn('shell transition-all duration-300', scrolled ? 'pt-2' : 'pt-3 lg:pt-4')}>
        {/* Floating capsule */}
        <div
          className={cn(
            'mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-border pl-5 pr-2 transition-all duration-300',
            scrolled
              ? 'h-[3.25rem] bg-white/85 shadow-hover backdrop-blur-md'
              : 'h-[3.75rem] bg-white shadow-card'
          )}
        >
          {/* Logo lockup */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <Image
              src={site.logoSrc}
              alt="Mortgage Alliance"
              width={44}
              height={44}
              className="h-9 w-auto"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="whitespace-nowrap font-display text-[1.05rem] font-semibold tracking-tight text-ink">
                {site.name}
              </span>
              <span className="mt-0.5 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
                {site.role} <span className="text-evergreen/80">|</span> <strong className="font-bold text-[0.7rem] text-ink">Lic #{site.brokerageLicence}</strong>
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {nav.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} active={isActive(item.href)} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-2.5 py-1.5 text-[0.88rem] font-medium transition-colors duration-200',
                    isActive(item.href)
                      ? 'bg-evergreen/[0.08] text-evergreen'
                      : 'text-ink hover:bg-evergreen/[0.06] hover:text-evergreen'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <ApplyNowButton size="md" className="hidden !rounded-full sm:inline-flex" />

            {/* Mobile toggle */}
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-evergreen/10 xl:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet — a floating rounded panel matching the capsule */}
      <div
        className={cn(
          'fixed inset-x-3 top-20 z-30 origin-top overflow-y-auto rounded-2xl border border-border bg-white shadow-hover transition-[opacity,transform] duration-300 xl:hidden',
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        )}
        style={{ maxHeight: 'calc(100dvh - 6rem)' }}
      >
        <nav className="flex flex-col p-4" aria-label="Mobile">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="border-b border-border">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3.5 text-left text-lg font-medium text-ink"
                  aria-expanded={openGroup === item.label}
                  onClick={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-muted transition-transform',
                      openGroup === item.label && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300',
                    openGroup === item.label ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'
                  )}
                >
                  <ul className="overflow-hidden">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-2.5 pl-4 text-base text-muted transition-colors hover:text-evergreen"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'border-b border-border py-3.5 text-lg font-medium transition-colors',
                  isActive(item.href) ? 'text-evergreen' : 'text-ink hover:text-evergreen'
                )}
              >
                {item.label}
              </Link>
            )
          )}
          <div className="mt-5 flex flex-col gap-3">
            <ApplyNowButton size="lg" className="w-full" />
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Phone className="h-4 w-4" /> {site.phoneDisplay}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
