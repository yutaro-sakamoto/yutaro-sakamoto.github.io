import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * 記事は src/data/blog/<lang>/<slug>.md(x) に置く。
 * ディレクトリ名がそのまま言語になる (ja / en)。
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** 数式を含む記事で KaTeX の CSS を読み込む */
    math: z.boolean().default(false),
  }),
});

export const collections = { blog };
