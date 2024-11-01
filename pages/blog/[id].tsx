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
        <main className="flex items-center justify-center">
          <span className="text-xl text-white">Loading...</span>
        </main>
      </Layout>
    );
  }

  return (
    <Layout post={post}>
      <main className="flex h-full min-h-screen w-full flex-col items-center gap-4 bg-slate-900 px-4 py-6 text-white sm:items-start sm:px-16 sm:py-16 md:px-32 lg:px-48 xl:px-64">
        <div className="relative flex aspect-square w-1/2 min-w-[100px] max-w-[300px] sm:min-h-[100px] sm:w-auto md:min-h-[300px]">
          <Image
            alt={"Devblog post titled " + post.title}
            src={post.imageUrl}
            fill={true}
            sizes="(min-width: 768px) 300px, (min-width: 640px) 100px, 300px"
            priority
          />
        </div>
        <h1 className="text-center text-4xl sm:text-start sm:text-6xl">
          {post.title}
        </h1>
        <span className="text-center text-sm text-white text-opacity-60 sm:text-start sm:text-base">
          Published {getRelativeTime(new Date(post.published))}
        </span>
        <p className="mt-4 text-base sm:text-xl">{post.content}</p>
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
