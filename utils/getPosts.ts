import admin from "./firebase";

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  published: Date;
}

export default async function getPosts() {
  // Get newest 3 posts
  const docs = (
    await admin
      .firestore()
      .collection("posts")
      .orderBy("published", "desc")
      .limit(3)
      .get()
  ).docs;

  const posts: Post[] = await Promise.all(
    docs
      .map(doc => {
        const docData = doc.data();
        docData["published"] = (
          docData["published"] as admin.firestore.Timestamp
        ).toDate();
        docData["id"] = doc.id;
        return docData as {
          id: string;
          title: string;
          content: string;
          published: Date;
          image: string;
        };
      })
      .map<Promise<Post>>(async post => {
        let url: string;
        if (admin.storage().app.options.credential !== undefined)
          url = `https://storage.googleapis.com/${
            (admin.storage().app.options.credential as never)["projectId"]
          }.appspot.com/posts/${post.image}`;
        else url = "/assets/images/logo.png";

        return {
          id: post.id,
          title: post.title,
          content: post.content,
          published: post.published,
          imageUrl: url,
        };
      })
  );

  return posts;
}
