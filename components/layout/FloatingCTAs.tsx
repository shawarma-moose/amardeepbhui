'use client';

import { Phone } from 'lucide-react';
import { site } from '@/lib/site';

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.18.84 5.71 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.09 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.24-4.3c0-4.46 3.63-8.09 8.09-8.09Zm-2.78 4.34c-.13 0-.34.05-.52.25-.18.2-.69.67-.69 1.64s.71 1.9.81 2.04c.1.13 1.39 2.12 3.37 2.97.47.2.84.32 1.12.42.47.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.12-.94-.05-.08-.18-.13-.38-.23-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.45.1-.13.2-.51.64-.63.77-.12.13-.23.15-.43.05a5.45 5.45 0 0 1-1.6-.99 6.06 6.06 0 0 1-1.11-1.38c-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.44-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01Z" />
    </svg>
  );
}

/** Fixed WhatsApp + click-to-call buttons, bottom-right on every page. */
export default function FloatingCTAs() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:bottom-7 sm:right-6">
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Amarpreet on WhatsApp"
        className="group flex items-center justify-center rounded-full bg-evergreen text-white shadow-hover transition-colors duration-200 hover:bg-[var(--evergreen-deep)]"
        style={{ height: '3.25rem', width: '3.25rem' }}
      >
        <WhatsAppGlyph className="h-6 w-6" />
      </a>
      <a
        href={site.phoneHref}
        aria-label={`Call Amarpreet at ${site.phoneDisplay}`}
        className="group flex items-center justify-center rounded-full border border-border bg-white text-evergreen shadow-hover transition-colors duration-200 hover:border-evergreen"
        style={{ height: '3.25rem', width: '3.25rem' }}
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
