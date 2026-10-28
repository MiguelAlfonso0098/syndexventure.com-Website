/**
 * Email delivery for form submissions.
 *
 * NOT WIRED YET. The spec says submissions go to a shared inbox with no
 * database, but does not name a mail provider. Until one is chosen, every
 * form returns a clear 503 error instead of dropping submissions silently.
 *
 * To wire it, implement `send` with the chosen provider and add its
 * credentials as Pages secrets.
 */
export interface Message {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export class DeliveryNotConfigured extends Error {}

export async function send(_env: unknown, _messages: Message[]): Promise<void> {
  throw new DeliveryNotConfigured('Mail delivery provider not configured');
}

/** Mailboxes (inventory V6). Keep in sync with src/config/site.ts. */
export const MAILBOX = {
  diligence: 'diligence@syndexventure.com',
  partners: 'partners@syndexventure.com',
  security: 'security@syndexventure.com',
  ip: 'ip@syndexventure.com',
} as const;

export const format = (fields: Record<string, string>) =>
  Object.entries(fields)
    .map(([k, v]) => `${k}: ${v || '-'}`)
    .join('\n');
