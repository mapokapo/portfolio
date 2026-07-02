import { getCollection } from "astro:content";

import { getBlogImageUrl } from "@/assets/blog";
import { getReadTimeMinutes } from "@/lib/utils";

export interface BlogPostSummary {
  content: string;
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
        const image =
          (await getBlogImageUrl(post.id, { width: 96 })) ?? "";

        return {
          content,
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
