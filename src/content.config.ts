import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/articles",
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    category: z.enum([
      "memes",
      "viral",
      "slang",
      "explained",
    ]),

    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),

    image: z.string().optional(),
    imageAlt: z.string().optional(),

    trending: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  articles,
};