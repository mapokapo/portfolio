import { getCollection } from "astro:content";
import { convert as htmlToText } from "html-to-text";

import { getBlogImageUrl } from "@/assets/blog";
import { getReadTimeMinutes } from "@/lib/utils";

export interface BlogPostSummary {
  excerpt: string;
  id: string;
  image: string;
  published: Date;
  readTimeMinutes: number;
  title: string;
}

export async function getBlogPosts(limit = 5): Promise<BlogPostSummary[]> {
  const posts = await getCollection("blog");

  const summaries = await Promise.all(
    posts
      .toSorted((a, b) => b.data.published.getTime() - a.data.published.getTime())
      .slice(0, limit)
      .map(async post => {
        const body = post.body ?? "";
        const content = post.data.description ?? body;
        const excerpt = htmlToText(content, {
          selectors: [{ format: "skip", selector: "img" }],
          wordwrap: false,
        })
          .replaceAll("\n", " ")
          .trim();
        const image =
          (await getBlogImageUrl(post.id, { width: 96 })) ?? "";

        return {
          excerpt,
          id: post.id,
          image,
          published: post.data.published,
          readTimeMinutes: getReadTimeMinutes(body),
          title: post.data.title,
        };
      })
  );

  return summaries;
}
