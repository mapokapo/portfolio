import { getBlogPosts } from "@/lib/server/blogPosts";
import { getBuildSize } from "@/lib/server/buildSize";
import { getPageViews } from "@/lib/server/pageViews";
import { getRelativeTime } from "@/lib/utils";

export type SiteInfo = Awaited<ReturnType<typeof getSiteInfo>>;

export async function getSiteInfo() {
  const [blogPosts, buildSize, pageViews] = await Promise.all([
    getBlogPosts(5),
    getBuildSize(),
    getPageViews(),
  ]);

  return {
    blogPosts: blogPosts.map(post => ({
      ...post,
      published: post.published.toISOString(),
      publishedRelative: getRelativeTime(post.published),
    })),
    buildSize,
    pageViews: pageViews.map(entry => ({
      recordStartTimestamp: entry.recordStartTimestamp.toISOString(),
      totalViews: entry.totalViews,
    })),
  };
}
