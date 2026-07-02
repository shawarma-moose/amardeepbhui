'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { CheckCircle2, Send } from 'lucide-react';
import { submitContact, initialContactState } from '@/app/contact/actions';
import { services } from '@/content/services';
import { Field, Input, Textarea, Select } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-evergreen px-7 py-3.5 font-sans font-semibold text-cream transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[var(--evergreen-deep)] disabled:opacity-60"
    >
      {pending ? 'Sending…' : 'Send message'}
      <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialContactState);

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-evergreen/30 bg-evergreen/[0.06] p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-evergreen" aria-hidden="true" />
        <h3 className="mt-4 font-display text-h3 font-medium text-ink">Message sent</h3>
        <p className="mx-auto mt-2 max-w-md text-mist">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === 'error' && (
        <p
          role="alert"
          className="rounded-xl border border-aubergine/30 bg-aubergine/[0.06] px-4 py-3 text-caption text-aubergine"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={state.errors?.name}>
          <Input id="name" name="name" autoComplete="name" placeholder="Jane Doe" required />
        </Field>
        <Field label="Email" htmlFor="email" required error={state.errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="647 273 0555"
          />
        </Field>
        <Field label="I’m interested in" htmlFor="service">
          <Select id="service" name="service" defaultValue="">
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="General enquiry">General enquiry</option>
          </Select>
        </Field>
      </div>

      <Field label="How can I help?" htmlFor="message" required error={state.errors?.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me a little about what you’re looking for…"
          required
        />
      </Field>

      <div className={cn('flex items-center gap-4')}>
        <SubmitButton />
        <p className="text-caption text-mist">No obligation. Your details stay private.</p>
      </div>
    </form>
  );
}
