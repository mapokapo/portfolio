import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import getPosts, { Post } from "../../utils/getPosts";
import getRelativeTime from "../../utils/getRelativeTime";

type Props = {
  post: Post;
};
const Layout: React.FC<PropsWithChildren & { post: Post }> = ({
  post,
  children,
}) => (
  <>
    <Head>
      <title>{post === undefined ? "Loading post..." : post.title}</title>
    </Head>
    {children}
  </>
);

const Devblog: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout post={post}>
        <main className="flex justify-center items-center">
          <span className="text-xl text-white">Loading...</span>
        </main>
      </Layout>
    );
  }

  return (
    <Layout post={post}>
      <main className="items-center sm:items-start px-4 py-6 sm:px-16 md:px-32 lg:px-48 xl:px-64 sm:py-16 flex flex-col w-full h-full min-h-screen bg-slate-900 gap-4 text-white">
        <div className="md:min-h-[300px] min-w-[100px] max-w-[300px] sm:w-auto w-1/2 sm:min-h-[100px] aspect-square relative flex">
          <Image
            alt={"Devblog post titled " + post.title}
            src={post.imageUrl}
            fill={true}
            sizes="(min-width: 768px) 300px, (min-width: 640px) 100px, 300px"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-6xl text-center sm:text-start">
          {post.title}
        </h1>
        <span className="text-opacity-60 text-white text-center sm:text-start sm:text-base text-sm">
          Published {getRelativeTime(new Date(post.published))}
        </span>
        <p className="text-base sm:text-xl mt-4">{post.content}</p>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  post: {
    id: string;
    title: string;
    imageUrl: string;
    published: number;
    content: string;
  };
}> = async context => {
  const posts = (await getPosts()).map<{
    id: string;
    title: string;
    imageUrl: string;
    published: number;
    content: string;
  }>(p => ({
    id: p.id,
    title: p.title,
    imageUrl: p.imageUrl,
    published: p.published.getTime(),
    content: p.content,
  }));

  const post = posts.find(p => p.id === context.params?.id);

  if (post === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map(post => ({
      params: { id: post.id },
    })),
    fallback: true,
  };
};

export default Devblog;
