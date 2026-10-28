/**
 * Trust & Compliance Center policies.
 * Each policy is pending until its text and effective date are supplied.
 */
export interface Policy {
  slug: string;
  title: string;
  summary: string;
  inventoryId: string;
  inventoryLabel: string;
  /** Set when supplied. */
  effectiveDate?: string;
  version?: string;
  pdf?: string;
  history?: { version: string; date: string; note: string }[];
}

export const POLICIES: Policy[] = [
  {
    slug: 'consumer-protection',
    title: 'Consent, TCPA & Telemarketing',
    summary: 'How consumer consent is captured, recorded and retained before any lead is delivered or call is placed.',
    inventoryId: 'P4',
    inventoryLabel: 'Consent language, consent vendor and record retention period',
  },
  {
    slug: 'payments',
    title: 'Payments, Refunds & Chargebacks',
    summary: 'Refund terms for each operating line, and how disputes and chargebacks are handled.',
    inventoryId: 'P3',
    inventoryLabel: 'Refund and chargeback policy, per line if they differ',
  },
  {
    slug: 'data',
    title: 'Data Protection & Security',
    summary: 'What data each brand collects, where it is stored, who receives it, and how it is protected.',
    inventoryId: 'P5',
    inventoryLabel: 'Data map summary and security practices (P5, P6)',
  },
  {
    slug: 'advertising',
    title: 'Advertising Standards',
    summary: 'Claims our advertising may not make, and how ads are reviewed before they run.',
    inventoryId: 'P7',
    inventoryLabel: 'Prohibited claims and review process',
  },
  {
    slug: 'intellectual-property',
    title: 'IP & Takedown Requests',
    summary: 'Our policy on original and licensed artwork, the DMCA designated agent, and how to report an infringing listing.',
    inventoryId: 'P12',
    inventoryLabel: 'IP & takedown policy, DMCA designated agent and response time',
  },
  {
    slug: 'aml-kyb',
    title: 'AML, KYB & Sanctions',
    summary: 'How partners and counterparties are screened against sanctions lists before we work with them.',
    inventoryId: 'P8',
    inventoryLabel: 'AML and sanctions screening practice',
  },
];
