/**
 * Official contacts allowlist for /verify/ (inventory V1 to V3).
 * Built into the page at deploy time. Brand domains and support contacts
 * from the registry are added automatically.
 */
export interface OfficialContact {
  kind: 'domain' | 'email' | 'email-pattern' | 'phone';
  value: string;
  role: string;
}

/** The parent domain is the only fact known so far. */
export const OFFICIAL_CONTACTS: OfficialContact[] = [
  { kind: 'domain', value: 'syndexventure.com', role: 'Company website and email domain of Syndex Ventures LLC' },
];

export const VERIFY_PENDING = ['V1', 'V2', 'V3', 'V4'];
