import "server-only";
import { cacheLife, cacheTag } from "next/cache";

import { getFirebaseAdmin } from "@/lib/firebase.admin";
import { BlogPost, blogPostSchema } from "@/lib/schemas/blogPost";
import {
  DYNAMIC_CONTENT_CACHE_TAGS,
  DYNAMIC_CONTENT_REVALIDATE_SECONDS,
} from "@/lib/server/revalidation";

type CachedBlogPost = Omit<BlogPost, "published"> & { published: string };

export async function getBlogPost(
  id: string
): Promise<"not_found" | "unavailable" | BlogPost> {
  "use cache";
  cacheLife({ revalidate: DYNAMIC_CONTENT_REVALIDATE_SECONDS });
  cacheTag(DYNAMIC_CONTENT_CACHE_TAGS.blogPosts, `blog-post-${id}`);

  const result = await fetchBlogPost(id);
  if (result === "not_found" || result === "unavailable") {
    return result;
  }

  return deserializeBlogPost(result);
}

export async function getBlogPostIds(): Promise<string[]> {
  "use cache";
  cacheLife({ revalidate: DYNAMIC_CONTENT_REVALIDATE_SECONDS });
  cacheTag(DYNAMIC_CONTENT_CACHE_TAGS.blogPosts);

  const admin = getFirebaseAdmin();
  if (!admin) {
    return [];
  }

  const docs = (
    await admin
      .firestore()
      .collection("posts")
      .orderBy("published", "desc")
      .get()
  ).docs;

  return docs.map(doc => doc.id);
}

export async function getBlogPosts(
  limit = 3
): Promise<"unavailable" | BlogPost[]> {
  "use cache";
  cacheLife({ revalidate: DYNAMIC_CONTENT_REVALIDATE_SECONDS });
  cacheTag(DYNAMIC_CONTENT_CACHE_TAGS.blogPosts);

  const result = await fetchBlogPosts(limit);
  if (result === "unavailable") {
    return result;
  }

  return result.map(deserializeBlogPost);
}

function deserializeBlogPost(post: CachedBlogPost): BlogPost {
  return {
    ...post,
    published: new Date(post.published),
  };
}

async function fetchBlogPost(
  id: string
): Promise<"not_found" | "unavailable" | CachedBlogPost> {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return "unavailable";
  }

  const doc = await admin.firestore().collection("posts").doc(id).get();
  if (!doc.exists) {
    return "not_found";
  }

  const blogPostResult = blogPostSchema.safeParse({
    ...doc.data(),
    id: doc.id,
  });

  if (!blogPostResult.success) {
    console.error("Invalid blog post data:", doc.id, blogPostResult.error);
    return "not_found";
  }

  return serializeBlogPost({
    ...blogPostResult.data,
    image: getPostImageUrl(admin, blogPostResult.data.image),
  });
}

async function fetchBlogPosts(
  limit: number
): Promise<"unavailable" | CachedBlogPost[]> {
  const admin = getFirebaseAdmin();
  if (!admin) {
    return "unavailable";
  }

  const docs = (
    await admin
      .firestore()
      .collection("posts")
      .orderBy("published", "desc")
      .limit(limit)
      .get()
  ).docs;

  const blogPosts: CachedBlogPost[] = docs
    .map(doc => {
      const blogPostResult = blogPostSchema.safeParse({
        ...doc.data(),
        id: doc.id,
      });

      if (!blogPostResult.success) {
        console.error("Invalid blog post data:", doc.id, blogPostResult.error);
        return null;
      }

      return serializeBlogPost({
        ...blogPostResult.data,
        image: getPostImageUrl(admin, blogPostResult.data.image),
      });
    })
    .filter((post): post is CachedBlogPost => post !== null);

  return blogPosts;
}

function getPostImageUrl(
  admin: NonNullable<ReturnType<typeof getFirebaseAdmin>>,
  image: string
): string {
  if (admin.storage().app.options.credential !== undefined) {
    return `https://storage.googleapis.com/${
      (admin.storage().app.options.credential as never)["projectId"]
    }.appspot.com/posts/${image}`;
  }

  return "/assets/images/logo.png";
}

function serializeBlogPost(post: BlogPost): CachedBlogPost {
  return {
    ...post,
    published: post.published.toISOString(),
  };
}
