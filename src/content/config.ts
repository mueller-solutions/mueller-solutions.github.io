import { z, defineCollection } from "astro:content";

const servicesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    icon: z.string(),
    order: z.number().optional().default(1000),
  }),
});

export const collections = {
  services: servicesCollection,
};
