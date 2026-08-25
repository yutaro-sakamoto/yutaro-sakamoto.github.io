import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../../data/site";
import { getPosts, postPath } from "../../utils/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts("en");
  return rss({
    title: site.name,
    description: site.description.en,
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
