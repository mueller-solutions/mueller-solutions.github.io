import { z, defineCollection } from "astro:content";

const servicesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  services: servicesCollection,
};
