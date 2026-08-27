// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/**
 * Astro v7 renders Markdown with Sätteri by default, which has no TeX support.
 * We opt back into the unified (remark/rehype) pipeline so that `$...$` and
 * `$$...$$` are turned into KaTeX markup at build time — no client-side JS.
 */
const markdownProcessor = () =>
  unified({
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: "htmlAndMathml", strict: false }]],
  });

export default defineConfig({
  site: "https://yutaro-sakamoto.github.io",
  trailingSlash: "ignore",
  markdown: {
    processor: markdownProcessor(),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
  integrations: [
    mdx({ processor: markdownProcessor() }),
    sitemap({
      i18n: {
        defaultLocale: "ja",
        locales: { ja: "ja-JP", en: "en-US" },
      },
    }),
  ],
  redirects: {
    // 旧 Hugo サイトの自己紹介ページ
    "/posts/about": "/about",
    // 記事一覧はトップページに統合した
    "/blog": "/",
    "/en/blog": "/en",
  },
});
