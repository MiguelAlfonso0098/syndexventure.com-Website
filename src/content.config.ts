import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Insights briefs: 400 to 800 words, one chart, author, date and a method note (F9). */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    author: z.string(),
    published: z.coerce.date(),
    modified: z.coerce.date().optional(),
    topic: z.enum(['Commerce', 'Software', 'Lead Generation', 'Operations']),
    method: z.string(),
    /** Partner program the end-of-brief CTA links to. */
    program: z.enum(['lead-buyers', 'logistics', 'print', 'networks']).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
