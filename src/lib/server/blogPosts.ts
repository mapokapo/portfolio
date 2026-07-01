import "server-only";

import { getFirebaseAdmin } from "@/lib/firebase.admin";
import { BlogPost, blogPostSchema } from "@/lib/schemas/blogPost";

export async function getBlogPost(
  id: string
): Promise<"not_found" | "unavailable" | BlogPost> {
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

  return {
    ...blogPostResult.data,
    image: getPostImageUrl(admin, blogPostResult.data.image),
  };
}

export async function getBlogPosts(
  limit = 3
): Promise<"unavailable" | BlogPost[]> {
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

  const blogPosts: BlogPost[] = docs
    .map(doc => {
      const blogPostResult = blogPostSchema.safeParse({
        ...doc.data(),
        id: doc.id,
      });

      if (!blogPostResult.success) {
        console.error("Invalid blog post data:", doc.id, blogPostResult.error);
        return "not_found";
      }

      return {
        ...blogPostResult.data,
        image: getPostImageUrl(admin, blogPostResult.data.image),
      };
    })
    .filter((post): post is BlogPost => post !== null);

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
