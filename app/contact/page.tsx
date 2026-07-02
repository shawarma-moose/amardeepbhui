import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { site } from '@/lib/site';
import PageHero from '@/components/layout/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import Socials from '@/components/layout/Socials';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Amarpreet Bhui, mortgage broker in Mississauga. Call 647 273 0555, email info@amarpreetbhui.ca, or send a message for a free, no-obligation consultation.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start your mortgage journey"
        intro="Ready to take the next step toward owning real estate in Southern Ontario? Send a message or call directly — I’ll get back to you promptly."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="shell py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <h2 className="font-display text-h3 font-medium text-ink">Send a message</h2>
            <p className="mt-2 text-mist">
              Tell me a little about what you’re looking for and I’ll be in touch.
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </Reveal>

          {/* Details + map */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-brass/20 bg-cream-2/40 p-7">
              <h2 className="font-display text-h3 font-medium text-ink">Contact details</h2>
              <ul className="mt-5 space-y-4 text-mist">
                <li>
                  <a href={site.phoneHref} className="group flex items-start gap-3 transition-colors hover:text-evergreen">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                    <span>
                      <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Phone</span>
                      <span className="font-semibold text-ink group-hover:text-evergreen">{site.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={site.emailHref} className="group flex items-start gap-3 transition-colors hover:text-evergreen">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                    <span>
                      <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Email</span>
                      <span className="font-semibold text-ink group-hover:text-evergreen">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 transition-colors hover:text-evergreen"
                  >
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                    <span>
                      <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">WhatsApp</span>
                      <span className="font-semibold text-ink group-hover:text-evergreen">Message on WhatsApp</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.office.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 transition-colors hover:text-evergreen"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                    <span>
                      <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Office</span>
                      <span className="font-semibold text-ink group-hover:text-evergreen">
                        {site.office.line1}, {site.office.city} {site.office.postal}
                      </span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-evergreen" aria-hidden="true" />
                  <span>
                    <span className="block text-caption uppercase tracking-[0.14em] text-mist/80">Hours</span>
                    <span className="font-semibold text-ink">Mon–Sat, by appointment</span>
                  </span>
                </li>
              </ul>

              <div className="mt-6 border-t border-brass/15 pt-5">
                <span className="text-caption uppercase tracking-[0.14em] text-mist/80">Follow</span>
                <Socials className="mt-2" />
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-brass/20">
              <iframe
                title={`Map to ${site.name}'s office`}
                src={site.office.mapEmbed}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
