/**
 * The four operating lines, in the order used across the site.
 * Copy states only what the spec documents. Anything else is pending.
 */
import { pending, type Maybe } from '@/lib/pending';

export interface OperatingLine {
  slug: 'commerce' | 'print-on-demand' | 'software' | 'performance';
  /** Value of the `line` field in the brand registry. */
  registryLine: string;
  title: string;
  short: string;
  summary: string;
  whatWeSell: string;
  customers: Maybe<string>;
  countries: Maybe<string>;
  howPaid: string;
  processors: Maybe<string>;
  settlement: Maybe<string>;
  naics: Maybe<string>;
  metaDescription: string;
}

export const LINES: OperatingLine[] = [
  {
    slug: 'commerce',
    registryLine: 'Commerce',
    title: 'Cross-Border Commerce',
    short: 'E-commerce stores selling to consumers in Latin America.',
    summary:
      'Syndex operates e-commerce stores in Latin America. Each store trades under its own brand, registered as a DBA of Syndex Venture, LLC, and lists its own statement descriptor in the registry.',
    whatWeSell: 'Consumer products sold through branded online stores.',
    customers: 'Consumers in the countries each store serves.',
    countries: 'Mexico, Colombia, Chile, Argentina, Dominican Republic and Guatemala.',
    howPaid:
      'Customers pay at checkout. Payments are processed by regional acquirers, and each store’s statement descriptor matches its DBA.',
    processors: 'Regional acquirers, named per brand in the registry.',
    settlement: pending('D10', 'Settlement cadence for Commerce'),
    naics: pending('C12', 'NAICS code for Cross-Border Commerce'),
    metaDescription:
      'How Syndex Venture, LLC operates e-commerce stores in Latin America: what the stores sell, where, and how payments are received.',
  },
  {
    slug: 'print-on-demand',
    registryLine: 'Print-on-Demand',
    title: 'Print-on-Demand',
    short: 'Original-design products, made and shipped to order by print partners.',
    summary:
      'Syndex sells original designs through its own branded storefronts. Third-party print partners make and ship each item only after the customer has paid. Nothing is printed in advance, so there is no inventory.',
    whatWeSell: 'Original-design apparel, wall art, drinkware and stationery.',
    customers: 'Consumers who buy through our storefronts and marketplace listings.',
    countries: pending('R10', 'Production regions and countries shipped to'),
    howPaid:
      'Storefront orders are paid through Shopify Payments or Stripe under the store’s own statement descriptor. Marketplace sales are paid out by the marketplace to the company’s master account.',
    processors: pending('R9', 'Storefront and marketplace channels in use'),
    settlement: pending('D10', 'Settlement cadence for Print-on-Demand'),
    naics: pending('C12', 'NAICS code for Print-on-Demand'),
    metaDescription:
      'Original-design apparel, wall art and goods, printed and shipped to order by production partners. No inventory, original or licensed artwork only.',
  },
  {
    slug: 'software',
    registryLine: 'Software',
    title: 'Software & Applications',
    short: 'Software subscriptions and micro-apps for local service businesses.',
    summary:
      'Syndex builds and sells software subscriptions, including micro-apps used by operators of local service businesses. Each product trades under its own brand, registered as a DBA of Syndex Venture, LLC.',
    whatWeSell: 'Software subscriptions and applications.',
    customers: 'Businesses, including operators of local service businesses.',
    countries: pending('C13', 'Countries for Software & Applications'),
    howPaid: 'Customers pay recurring subscription fees by card. Each product has its own Stripe Billing account and its own statement descriptor.',
    processors: 'Stripe Billing, with a separate account per product.',
    settlement: pending('D10', 'Settlement cadence for Software'),
    naics: pending('C12', 'NAICS code for Software & Applications'),
    metaDescription:
      'Software subscriptions and applications built and operated by Syndex Venture, LLC, and how subscription revenue is received.',
  },
  {
    slug: 'performance',
    registryLine: 'Lead Generation',
    title: 'Performance Marketing & Lead Generation',
    short: 'Consented insurance and legal leads for licensed buyers.',
    summary:
      'Syndex generates consented insurance and legal leads and delivers them to licensed buyers, such as lead buyers and insurance FMOs, directly or through affiliate networks. Buyers and networks pay Syndex by invoice.',
    whatWeSell: 'Consumer inquiries (leads and calls), each with a record of the consumer’s consent.',
    customers: 'Licensed lead buyers, insurance FMOs and affiliate networks.',
    countries: pending('R2', 'States where leads are generated'),
    howPaid:
      'Lead revenue arrives by invoice from buyers and networks, not through card processing. This line has no statement descriptor.',
    processors: 'Not applicable. Buyers and networks pay by invoice.',
    settlement: pending('R4', 'Invoice terms and payment cadence'),
    naics: pending('C12', 'NAICS code for Performance Marketing & Lead Generation'),
    metaDescription:
      'How Syndex Venture, LLC generates consented insurance and legal leads for licensed buyers, and why this revenue arrives by invoice.',
  },
];

export const lineBySlug = (slug: string) => LINES.find((l) => l.slug === slug);
