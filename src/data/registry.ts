/**
 * Entity & Brand Registry: one row per brand (inventory B1, B2, ...).
 *
 * This list feeds /portfolio/registry/, /registry.csv, /charge-lookup/ and
 * the /verify/ allowlist. Copy statement descriptors exactly as they print.
 * The spec's example rows (B1 to B4) are not real, so they are not listed here.
 * Merchant IDs never go in this file.
 */
import { pending, type Maybe } from '@/lib/pending';

export interface Brand {
  id: string; // B1, B2, ...
  brand: string;
  line: 'Commerce' | 'Print-on-Demand' | 'Software' | 'Lead Generation';
  operatesUnder: Maybe<string>; // DBA filing state, number and date, or "Operates as the LLC"
  domains: string[];
  /** [] means none (invoiced). Pending until the descriptor is final. */
  descriptors: Maybe<string[]>;
  paymentRoute: string;
  countries: string[];
  productType: string;
  supportEmail: string;
  supportPhone?: string;
  supportUrl: string;
  refundPolicyUrl?: Maybe<string>;
  status: 'Active' | 'Launching' | 'Under review' | 'Retired';
  lastReviewed: Maybe<string>; // ISO date
}

export const BRANDS: Brand[] = [
  {
    id: 'B5',
    brand: 'Guava Haus',
    line: 'Print-on-Demand',
    operatesUnder: pending('B5', 'DBA filing (not filed yet)'),
    domains: ['guavahaus.com'],
    descriptors: pending('B5', 'Statement descriptor (not final)'),
    paymentRoute: 'Shopify Payments (Shopify storefront)',
    countries: ['United States'],
    productType: 'Original-design print-on-demand products',
    supportEmail: 'hello@guavahaus.com',
    supportPhone: '+1 321-415-6682',
    supportUrl: 'mailto:hello@guavahaus.com',
    refundPolicyUrl: pending('B5', 'Refund policy URL'),
    status: 'Launching',
    lastReviewed: pending('B5', 'Last reviewed date'),
  },
];

/** Normalizes statement text the way T4.1 describes: case, `*`, spaces and trailing numbers. */
export const normalizeDescriptor = (s: string) =>
  s.toUpperCase().replace(/[*\s]+/g, '').replace(/\d+$/, '');
