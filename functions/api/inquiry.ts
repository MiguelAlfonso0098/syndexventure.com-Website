import { type Env, clean, isEmail, verifyTurnstile, referenceId, errorPage, redirect } from '../_lib/forms';
import { send, format, MAILBOX, DeliveryNotConfigured } from '../_lib/deliver';

const PROGRAMS = new Set(['lead-buyers', 'logistics', 'print', 'networks', 'not-sure']);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const ok = await verifyTurnstile(clean(form.get('cf-turnstile-response')), env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!ok) return errorPage(400, 'The security check did not pass. Please try again.');

  const f = {
    program: clean(form.get('program'), 20),
    company: clean(form.get('company'), 200),
    name: clean(form.get('name'), 200),
    email: clean(form.get('email'), 254),
    phone: clean(form.get('phone'), 40),
    verticals: clean(form.get('verticals'), 300),
    volume: clean(form.get('volume'), 100),
    coverage: clean(form.get('coverage'), 300),
    delivery: clean(form.get('delivery'), 40),
    message: clean(form.get('message')),
  };
  if (!PROGRAMS.has(f.program)) return errorPage(400, 'Select a program.');
  if (!f.company || !f.name) return errorPage(400, 'Company and name are required.');
  if (!isEmail(f.email)) return errorPage(400, 'Enter a valid work email address.');

  const ref = referenceId('PI');
  try {
    await send(env, [
      { to: MAILBOX.partners, replyTo: f.email, subject: `[${f.program}] Partner inquiry ${ref}: ${f.company}`, text: format({ reference: ref, ...f }) },
      { to: f.email, subject: `We received your partnership inquiry (${ref})`, text: `Reference: ${ref}\nProgram: ${f.program}\n\nThank you. We will reply by email.` },
    ]);
  } catch (e) {
    if (e instanceof DeliveryNotConfigured) return errorPage(503, `Online inquiries are not available yet. Email ${MAILBOX.partners} instead.`);
    throw e;
  }
  return redirect(request, '/partners/inquiry/thanks/', ref);
};
