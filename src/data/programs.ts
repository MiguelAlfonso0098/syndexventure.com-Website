/** Partner programs. Program details are pending until supplied (R1 to R11). */
export interface Program {
  slug: 'lead-buyers' | 'logistics' | 'print' | 'networks';
  title: string;
  forWhom: string;
  intro: string;
  sections: { heading: string; id: string; label: string }[];
  relatedLine: string;
}

export const PROGRAMS: Program[] = [
  {
    slug: 'lead-buyers',
    title: 'Lead Buyers & FMOs',
    forWhom: 'Licensed lead buyers and insurance FMOs buying consented leads or calls.',
    intro: 'We deliver consented insurance and legal leads to licensed buyers. Every lead carries a record of the consumer’s consent.',
    sections: [
      { heading: 'Verticals', id: 'R1', label: 'Lead verticals offered (for example legal, Medicare, final expense).' },
      { heading: 'Consent proof', id: 'P4', label: 'Consent method, certificate vendor per lead, and record retention period.' },
      { heading: 'Delivery methods', id: 'R3', label: 'Delivery methods (ping/post, live transfer, posted leads).' },
      { heading: 'Coverage', id: 'R2', label: 'States where leads are generated.' },
      { heading: 'Returns and credits', id: 'R4', label: 'Return and credit policy for leads.' },
      { heading: 'Onboarding', id: 'R5', label: 'Minimum volumes and onboarding steps.' },
    ],
    relatedLine: 'performance',
  },
  {
    slug: 'logistics',
    title: 'Fulfillment & Logistics (LATAM)',
    forWhom: 'Fulfillment, last-mile and logistics providers in Latin America.',
    intro: 'Our Cross-Border Commerce stores ship to consumers in Latin America. We work with fulfillment and logistics providers in the countries we serve.',
    sections: [
      { heading: 'Countries and volume', id: 'R6', label: 'Countries served and monthly order range.' },
      { heading: 'Current carriers and marketplaces', id: 'R6', label: 'Current carriers or marketplaces.' },
    ],
    relatedLine: 'commerce',
  },
  {
    slug: 'print',
    title: 'Print & Production Partners',
    forWhom: 'Print-on-demand fulfillment providers and production facilities.',
    intro: 'Our Print-on-Demand stores send each paid order to a print partner, who makes and ships it. We choose partners per product and region for cost and shipping time.',
    sections: [
      { heading: 'Partners and regions today', id: 'R10', label: 'Print partners used, production regions, and typical production and shipping times.' },
      { heading: 'What we look for', id: 'R11', label: 'Product range, regions, white-label packaging and API requirements for new partners.' },
    ],
    relatedLine: 'print-on-demand',
  },
  {
    slug: 'networks',
    title: 'Affiliate & Media Networks',
    forWhom: 'Affiliate networks and media partners that buy or supply performance traffic.',
    intro: 'We work with affiliate and media networks under written compliance terms.',
    sections: [
      { heading: 'Traffic sources', id: 'R7', label: 'Traffic sources used and prohibited.' },
      { heading: 'Compliance terms', id: 'R7', label: 'Compliance terms partners must accept.' },
    ],
    relatedLine: 'performance',
  },
];
