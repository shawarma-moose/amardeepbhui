'use server';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors?: Record<string, string>;
};

export const initialContactState: ContactState = { status: 'idle', message: '' };

/**
 * Server action stub. Validates input and returns a result. There is no backend
 * wired up yet — replace the "send" section with an email/CRM integration later.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Please enter a valid email.';
  if (message.length < 10) errors.message = 'Please add a little more detail (10+ characters).';

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please correct the highlighted fields.', errors };
  }

  // TODO: integrate email/CRM here. For now we simulate a successful submission.
  void phone;

  return {
    status: 'success',
    message:
      'Thank you — your message has been received. Amarpreet will be in touch shortly. For anything urgent, call 647 273 0555.',
  };
}
