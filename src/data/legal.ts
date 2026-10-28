/** Pages under /legal/. Text is pending until supplied. */
export const LEGAL_DOCS = {
  privacy: { title: 'Privacy Policy', id: 'P1', label: 'Privacy policy text and effective date (uses the P5 data map).' },
  terms: { title: 'Terms of Use', id: 'P2', label: 'Terms of use text and effective date.' },
  cookies: { title: 'Cookies', id: 'P1', label: 'Cookie notice. Analytics are cookieless; confirm whether Turnstile sets any cookies before publishing.' },
  accessibility: { title: 'Accessibility', id: 'P10', label: 'Accessibility statement: target standard and the contact for accessibility issues.' },
  security: { title: 'Security', id: 'P6', label: 'Security practices (MFA, encryption, access reviews) and vulnerability disclosure terms.' },
  imprint: { title: 'Imprint', id: 'C6', label: 'Imprint details.' },
} as const;
