/**
 * Entity & Brand Registry: one row per brand (inventory B1, B2, ...).
 *
 * This list feeds /portfolio/registry/, /registry.csv, /charge-lookup/ and
 * the /verify/ allowlist. Copy statement descriptors exactly as they print.
 * The rows in the spec are examples only, so none are listed here.
 * Merchant IDs never go in this file.
 */
export interface Brand {
  id: string; // B1, B2, ...
  brand: string;
  line: 'Commerce' | 'Print-on-Demand' | 'Software' | 'Lead Generation';
  operatesUnder: string; // DBA filing state, number and date, or "Operates as the LLC"
  domains: string[];
  descriptors: string[];
  paymentRoute: string;
  countries: string[];
  productType: string;
  supportEmail: string;
  supportPhone?: string;
  supportUrl: string;
  refundPolicyUrl?: string;
  status: 'Active' | 'Under review' | 'Retired';
  lastReviewed: string; // ISO date
}

export const BRANDS: Brand[] = [];

/** Normalizes statement text the way T4.1 describes: case, `*`, spaces and trailing numbers. */
export const normalizeDescriptor = (s: string) =>
  s.toUpperCase().replace(/[*\s]+/g, '').replace(/\d+$/, '');
