import type { APIRoute } from 'astro';
import { BRANDS } from '@/data/registry';
import { COMPANY } from '@/config/site';

const cols = ['id', 'brand', 'line', 'operatesUnder', 'domains', 'descriptors', 'paymentRoute', 'countries', 'supportEmail', 'supportPhone', 'refundPolicyUrl', 'status', 'lastReviewed'] as const;
const esc = (v: unknown) => {
  const s = Array.isArray(v) ? v.join('; ') : String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const GET: APIRoute = () => {
  const rows = [
    `# Entity & Brand Registry of ${COMPANY.legalName}`,
    cols.join(','),
    ...BRANDS.map((b) => cols.map((c) => esc(b[c])).join(',')),
  ];
  return new Response(rows.join('\n') + '\n', { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
};
