/**
 * Due Diligence Room document index (inventory D1 to D13).
 * Availability stays "On request" until a document is approved for public download.
 */
export interface DiligenceDoc {
  id: string;
  name: string;
  description: string;
  availability: 'Public' | 'On request';
  /** Set for Public documents, under /docs/. */
  file?: string;
  /** Part of the standard KYB pack button. */
  kyb?: boolean;
}

export const DOCUMENTS: DiligenceDoc[] = [
  { id: 'D1', name: 'Articles of organization', description: 'Formation filing for Syndex Ventures LLC.', availability: 'On request', kyb: true },
  { id: 'D2', name: 'Operating agreement', description: 'Governing agreement of the LLC.', availability: 'On request', kyb: true },
  { id: 'D3', name: 'IRS EIN confirmation letter', description: 'CP 575 or 147C.', availability: 'On request', kyb: true },
  { id: 'D4', name: 'Certificate of good standing', description: 'Re-pulled roughly every 90 days.', availability: 'On request', kyb: true },
  { id: 'D5', name: 'W-9', description: 'Request for taxpayer identification number.', availability: 'On request', kyb: true },
  { id: 'D6', name: 'Bank reference letter', description: 'Letter from the operating bank.', availability: 'On request', kyb: true },
  { id: 'D7', name: 'Processing statements', description: 'Last 3 to 6 months, per merchant account.', availability: 'On request' },
  { id: 'D8', name: 'Certificate of insurance', description: 'General liability, cyber, and E&O if held.', availability: 'On request' },
  { id: 'D9', name: 'Beneficial ownership form', description: 'Owners of 25% or more, plus a control person.', availability: 'On request', kyb: true },
  { id: 'D10', name: 'Financial controls summary', description: 'Settlement, virtual sub-accounts and class tracking.', availability: 'On request' },
  { id: 'D11', name: 'DBA / assumed-name certificates', description: 'One per brand.', availability: 'On request' },
  { id: 'D12', name: 'Policy pack (PDF)', description: 'All compliance policies with effective dates.', availability: 'On request' },
  { id: 'D13', name: 'Print-on-Demand design provenance log', description: 'With the DMCA designated agent registration.', availability: 'On request' },
];

export const PURPOSES = ['Merchant underwriting', 'Bank KYB', 'Audit', 'Partner onboarding', 'Other'] as const;
