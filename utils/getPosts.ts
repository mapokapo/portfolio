import admin from "./firebase";

export interface Post {
  title: string;
  content: string;
  imageUrl: string;
  published: Date;
}

export default async function getPosts() {
  const docs = (await admin.firestore().collection("posts").get()).docs;

  const posts: Post[] = await Promise.all(
    docs
      .map(doc => {
        const docData = doc.data();
        docData["published"] = (
          docData["published"] as admin.firestore.Timestamp
        ).toDate();
        return docData as {
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
          title: post.title,
          content: post.content,
          published: post.published,
          imageUrl: url,
        };
      })
  );

  // Sort by ascending time
  if (posts.length > 1)
    posts.sort((a, b) => a.published.getTime() - b.published.getTime());

  return posts;
}
