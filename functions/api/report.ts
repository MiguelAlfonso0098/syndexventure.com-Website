import { type Env, clean, isEmail, verifyTurnstile, referenceId, errorPage, redirect } from '../_lib/forms';
import { send, format, MAILBOX, DeliveryNotConfigured, type Message } from '../_lib/deliver';

/** Handles impersonation reports (/verify/report/) and IP notices (/compliance/intellectual-property/). */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const ok = await verifyTurnstile(clean(form.get('cf-turnstile-response')), env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
  if (!ok) return errorPage(400, 'The security check did not pass. Please try again.');

  const kind = clean(form.get('kind'), 20);
  const email = clean(form.get('email'), 254);

  if (kind === 'ip') {
    const f = {
      rights_holder: clean(form.get('rights_holder'), 200),
      name: clean(form.get('name'), 200),
      email,
      work: clean(form.get('work')),
      urls: clean(form.get('urls'), 5000),
      good_faith: clean(form.get('good_faith'), 3),
      accuracy: clean(form.get('accuracy'), 3),
      signature: clean(form.get('signature'), 200),
    };
    if (!f.rights_holder || !f.name || !f.work || !f.urls || !f.signature) return errorPage(400, 'All fields are required.');
    if (!isEmail(email)) return errorPage(400, 'Enter a valid email address.');
    if (f.good_faith !== 'yes' || f.accuracy !== 'yes') return errorPage(400, 'Both statements must be confirmed.');
    const ref = referenceId('IP');
    try {
      await send(env, [
        { to: MAILBOX.ip, replyTo: email, subject: `IP notice ${ref}: ${f.rights_holder}`, text: format({ reference: ref, ...f }) },
        { to: email, subject: `We received your IP notice (${ref})`, text: `Reference: ${ref}\n\nWe review the listing and remove it if it infringes.` },
      ]);
    } catch (e) {
      if (e instanceof DeliveryNotConfigured) return errorPage(503, `Online notices are not available yet. Email ${MAILBOX.ip} instead.`);
      throw e;
    }
    return redirect(request, '/compliance/intellectual-property/thanks/', ref);
  }

  if (kind === 'impersonation') {
    const f = { what: clean(form.get('what')), sender: clean(form.get('sender'), 300), date: clean(form.get('date'), 20), email };
    if (!f.what || !f.sender) return errorPage(400, 'Describe what you received and who sent it.');
    if (email && !isEmail(email)) return errorPage(400, 'Enter a valid email address, or leave it blank.');
    const ref = referenceId('SR');
    const messages: Message[] = [{ to: MAILBOX.security, replyTo: email || undefined, subject: `Impersonation report ${ref}`, text: format({ reference: ref, ...f }) }];
    if (email) messages.push({ to: email, subject: `We received your report (${ref})`, text: `Reference: ${ref}\n\nDo not reply to, pay or share data with the sender while we review it.` });
    try {
      await send(env, messages);
    } catch (e) {
      if (e instanceof DeliveryNotConfigured) return errorPage(503, `Online reports are not available yet. Email ${MAILBOX.security} instead.`);
      throw e;
    }
    return redirect(request, '/verify/report/thanks/', ref);
  }

  return errorPage(400, 'Unknown report type.');
};
