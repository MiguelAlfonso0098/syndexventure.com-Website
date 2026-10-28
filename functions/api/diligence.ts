import { type Env, clean, isEmail, isPersonalEmail, verifyTurnstile, referenceId, errorPage, redirect } from '../_lib/forms';
import { send, format, MAILBOX, DeliveryNotConfigured } from '../_lib/deliver';

const DOCS = new Set(['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13']);
const PURPOSES = new Set(['Merchant underwriting', 'Bank KYB', 'Audit', 'Partner onboarding', 'Other']);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const ok = await verifyTurnstile(clean(form.get('cf-turnstile-response')), env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!ok) return errorPage(400, 'The security check did not pass. Please try again.');

  const docs = form.getAll('docs').map((d) => clean(d, 4)).filter((d) => DOCS.has(d));
  const f = {
    name: clean(form.get('name'), 200),
    email: clean(form.get('email'), 254),
    organization: clean(form.get('organization'), 200),
    role: clean(form.get('role'), 200),
    purpose: clean(form.get('purpose'), 50),
    notes: clean(form.get('notes')),
  };
  if (docs.length === 0) return errorPage(400, 'Select at least one document.');
  if (!f.name || !f.organization || !f.role) return errorPage(400, 'Name, organization and role are required.');
  if (!isEmail(f.email)) return errorPage(400, 'Enter a valid work email address.');
  if (!PURPOSES.has(f.purpose)) return errorPage(400, 'Select a purpose.');

  const ref = referenceId('DR');
  const flagged = isPersonalEmail(f.email);
  const body = format({ reference: ref, documents: docs.join(', '), ...f, flag: flagged ? 'Personal email domain' : '' });

  try {
    await send(env, [
      { to: MAILBOX.diligence, replyTo: f.email, subject: `${flagged ? '[Flagged] ' : ''}Diligence request ${ref}: ${f.organization}`, text: body },
      { to: f.email, subject: `We received your document request (${ref})`, text: `Reference: ${ref}\nDocuments: ${docs.join(', ')}\n\nWe review every request and reply within one business day. Approved documents are sent by secure link.` },
    ]);
  } catch (e) {
    if (e instanceof DeliveryNotConfigured) return errorPage(503, `Online requests are not available yet. Email ${MAILBOX.diligence} instead.`);
    throw e;
  }
  return redirect(request, '/diligence/request/thanks/', ref);
};
