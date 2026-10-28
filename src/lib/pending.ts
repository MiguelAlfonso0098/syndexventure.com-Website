/**
 * Placeholder markers for company facts not supplied yet.
 *
 * Every fact the site needs has an ID in the LLC information inventory
 * (spec section "LLC information inventory"), for example C2 or P4.
 * Until a fact is supplied, its value is `pending('C2', 'State of formation')`.
 * <Fact> renders a visible marker, and `npm run build` lists every marker
 * left in dist/. `npm run build:strict` fails while any remain, so it can
 * gate the production deploy.
 */
export interface Pending {
  readonly pending: true;
  readonly id: string;
  readonly label: string;
}

export type Maybe<T> = T | Pending;

export const pending = (id: string, label: string): Pending => ({ pending: true, id, label });

export const isPending = (v: unknown): v is Pending =>
  typeof v === 'object' && v !== null && (v as Pending).pending === true;

/** The value, or undefined while pending. Use for metadata and JSON-LD, which must never carry a marker. */
export const known = <T>(v: Maybe<T>): T | undefined => (isPending(v) ? undefined : v);
