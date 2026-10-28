/**
 * Shared helpers for the form endpoints under /api/.
 * Forms post as application/x-www-form-urlencoded and work without client JS
 * (apart from the Turnstile widget). On success the endpoint redirects (303)
 * to the form's static thank-you page with the reference ID.
 */
export interface Env {
  TURNSTILE_SECRET_KEY: string;
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/** Reference ID such as DR-2026-7KQ2MX. Random, so no database is needed. */
export function referenceId(prefix: string): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const tail = [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join('');
  return `${prefix}-${new Date().getUTCFullYear()}-${tail}`;
}

export async function verifyTurnstile(token: string | null, secret: string, ip: string | null): Promise<boolean> {
  if (!token || !secret) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

export const clean = (v: unknown, max = 2000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

const PERSONAL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'me.com',
  'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'mail.com', 'yandex.com', 'zoho.com',
]);
export const isPersonalEmail = (email: string) => PERSONAL_DOMAINS.has(email.split('@')[1]?.toLowerCase() ?? '');

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Plain error page. The browser's Back button keeps the entered data. */
export function errorPage(status: number, message: string): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Could not submit | Syndex Ventures</title><link rel="stylesheet" href="/form-error.css"></head><body><main><h1>Your form was not sent</h1><p>${escapeHtml(message)}</p><p>Use your browser’s Back button to return to the form. Your answers are kept.</p></main></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

export const redirect = (request: Request, path: string, ref: string) =>
  Response.redirect(new URL(`${path}?ref=${encodeURIComponent(ref)}`, request.url).toString(), 303);
