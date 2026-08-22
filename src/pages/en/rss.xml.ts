import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { ui } from "../../i18n";
import { getPosts, postPath } from "../../utils/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts("en");
  return rss({
    title: ui.en["site.title"],
    description: ui.en["site.description"],
    site: context.site!,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postPath(post),
      categories: post.data.tags,
    })),
    customData: "<language>en</language>",
  });
}
