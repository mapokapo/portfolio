import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { MdArrowBack, MdSchedule } from "react-icons/md";

import BlogPostView from "@/components/blog-post-view";
import { getBlogPost, getBlogPosts } from "@/lib/server/blogPosts";
import { getReadTimeMinutes, getRelativeTime } from "@/lib/utils";

export default async function Blog({ params }: PageProps<"/blog/[id]">) {
  const postId = (await params).id;
  const post = await getBlogPost(postId);

  if (!post) notFound();

  const recommendedPosts = (await getBlogPosts()).filter(p => p.id !== post.id);
  const now = new Date();

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center gap-4 bg-slate-900 text-white">
      <header className="relative h-[10vw] min-h-[320px] w-full overflow-hidden sm:h-[20vw]">
        <Image
          alt={"Cover image for " + post.title}
          className="scale-125 object-cover blur-3xl brightness-60"
          fill
          priority
          sizes="100vw"
          src={post.image}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-900"></div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col px-4 sm:px-8 lg:px-10">
          <div className="mt-4 flex items-center gap-3 sm:mt-6">
            <Link
              className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-sm backdrop-blur-2xl hover:bg-black/60"
              href="/">
              <MdArrowBack size={18} />
              <span>Back</span>
            </Link>
          </div>

          <div className="mt-auto mb-6 sm:mb-10">
            <h1 className="max-w-4xl text-3xl font-extrabold text-balance sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm opacity-90 sm:text-base">
              <span className="rounded-full bg-white/10 px-3 py-1">
                Published {getRelativeTime(post.published, now)}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                <MdSchedule size={16} /> {getReadTimeMinutes(post.content)} min
                read
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-8 lg:px-10">
        <article className="rounded-xl border border-white/10 bg-slate-800/60 px-5 py-6 shadow-xl backdrop-blur md:px-8 md:py-8">
          <div className="mx-auto mb-6 w-full max-w-2xl">
            <div className="relative mx-auto aspect-video w-full">
              <Image
                alt={"Cover image for " + post.title}
                className="object-contain p-2"
                fill
                priority
                sizes="(min-width: 1024px) 768px, (min-width: 640px) 600px, 100vw"
                src={post.image}
              />
            </div>
          </div>

          <div
            className="prose xl:prose-xl prose-slate dark:prose-invert mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </article>
      </section>

      {recommendedPosts.length > 0 && (
        <section className="mx-auto mt-4 mb-12 w-full max-w-5xl px-4 sm:mt-8 sm:px-8 lg:px-10">
          <h3 className="mb-4 text-2xl font-semibold sm:mb-6 sm:text-3xl">
            Recommended Posts
          </h3>
          <ul className="flex flex-col gap-8 md:gap-10">
            {recommendedPosts.map(p => (
              <BlogPostView
                className="rounded-lg border border-white/10 bg-slate-800/60 p-4 shadow-lg backdrop-blur transition-all hover:brightness-125"
                content={p.content}
                id={p.id}
                imageUrl={p.image}
                key={p.id}
                publishedRelative={getRelativeTime(p.published, now)}
                title={p.title}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata({ params }: PageProps<"/blog/[id]">) {
  const postId = (await params).id;
  const post = await getBlogPost(postId);

  if (!post) {
    return {
      description: "The requested post does not exist.",
      title: "Post Not Found",
    };
  }

  return {
    description: post.content.slice(0, 160),
    keywords: post.title
      .split(" ")
      .concat(["blog", "devlog", "leo petrovic", "portfolio"]),
    openGraph: {
      description: post.content.slice(0, 160),
      images: [
        {
          alt: post.title,
          height: 384,
          url: post.image,
          width: 384,
        },
      ],
      title: post.title,
    },
    title: post.title,
    twitter: {
      card: "summary_large_image",
      description: post.content.slice(0, 160),
      images: [post.image],
      title: post.title,
    },
  } satisfies Metadata;
}
