import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    description: z.string().optional(),
    published: z.date(),
    title: z.string().min(1),
  }),
});

export const collections = { blog };
