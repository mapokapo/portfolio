import fs from "fs/promises";
import path from "path";

export interface Post {
  title: string;
  content: string;
  imageUrl: string;
  published: number;
}

export const POSTS_FILE_PATH = path.join(process.cwd(), "data", "posts.json");

export default async function getPosts() {
  const file = await fs.readFile(POSTS_FILE_PATH, "utf-8");
  const posts = (JSON.parse(file) as Record<string, unknown>[]).map<
    Post & { snippet: string }
  >(e => ({
    title: e["title"] as string,
    content: e["content"] as string,
    // Get the first 5 sentences
    snippet: (e["content"] as string).slice(0, 200),
    imageUrl: e["imageUrl"] as string,
    published: e["published"] as number,
  }));

  // Sort by ascending time
  if (posts.length > 1) posts.sort((a, b) => a.published - b.published);

  return posts;
}
