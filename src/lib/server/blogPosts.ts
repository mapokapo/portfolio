import "server-only";

import admin from "@/lib/firebase.admin";
import { BlogPost, blogPostSchema } from "@/lib/schemas/blogPost";

export async function getBlogPost(id: string) {
  const doc = await admin.firestore().collection("posts").doc(id).get();
  if (!doc.exists) return null;

  const blogPostResult = blogPostSchema.safeParse({
    ...doc.data(),
    id: doc.id,
  });

  if (!blogPostResult.success) {
    console.error("Invalid blog post data:", doc.id, blogPostResult.error);
    return null;
  }

  let imageUrl: string;
  if (admin.storage().app.options.credential !== undefined)
    imageUrl = `https://storage.googleapis.com/${
      (admin.storage().app.options.credential as never)["projectId"]
    }.appspot.com/posts/${blogPostResult.data.image}`;
  else imageUrl = "/assets/images/logo.png";

  return { ...blogPostResult.data, image: imageUrl };
}

export async function getBlogPosts(limit = 3) {
  const docs = (
    await admin
      .firestore()
      .collection("posts")
      .orderBy("published", "desc")
      .limit(limit)
      .get()
  ).docs;

  const blogPosts: BlogPost[] = await Promise.all(
    docs
      .map(doc => {
        const blogPostResult = blogPostSchema.safeParse({
          ...doc.data(),
          id: doc.id,
        });

        if (!blogPostResult.success) {
          console.error(
            "Invalid blog post data:",
            doc.id,
            blogPostResult.error
          );
          return null;
        }

        let imageUrl: string;
        if (admin.storage().app.options.credential !== undefined)
          imageUrl = `https://storage.googleapis.com/${
            (admin.storage().app.options.credential as never)["projectId"]
          }.appspot.com/posts/${blogPostResult.data.image}`;
        else imageUrl = "/assets/images/logo.png";

        return { ...blogPostResult.data, image: imageUrl };
      })
      .filter((post): post is BlogPost => post !== null)
  );

  return blogPosts;
}
