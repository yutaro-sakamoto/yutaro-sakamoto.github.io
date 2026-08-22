import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLang, type Lang } from "../i18n";

export type Post = CollectionEntry<"blog">;

/** 記事IDは "<lang>/<slug>" 形式。 */
export function postLang(post: Post): Lang {
  return post.id.startsWith("en/") ? "en" : "ja";
}

export function postSlug(post: Post): string {
  return post.id.replace(/^(ja|en)\//, "");
}

export function postPath(post: Post): string {
  const lang = postLang(post);
  const slug = postSlug(post);
  return lang === defaultLang ? `/blog/${slug}` : `/en/blog/${slug}`;
}

/** 指定言語の公開済み記事を新しい順に返す。 */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection("blog", ({ id, data }) => {
    const matches =
      lang === "en" ? id.startsWith("en/") : !id.startsWith("en/");
    return matches && (import.meta.env.DEV || !data.draft);
  });
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** 日本語の文字数と英単語数の両方を考慮したざっくりした読了時間 (分)。 */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const cjk = (body.match(/[぀-ヿ㐀-鿿]/g) ?? []).length;
  const words = body
    .replace(/[぀-ヿ㐀-鿿]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 500 + words / 220));
}
