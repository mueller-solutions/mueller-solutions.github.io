import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      posted: z.date(),
      excerpt: z.string(),
      image: image(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog,
};
