import Link from "next/link";
import { connection } from "next/server";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import BlogPostView from "@/components/blog-post-view";
import StatisticsGraph from "@/components/statistics-graph";
import { PageView } from "@/lib/schemas/pageView";
import { getBlogPosts } from "@/lib/server/blogPosts";
import { getBuildSize } from "@/lib/server/buildSize";
import { getPageViews } from "@/lib/server/pageViews";
import { getRelativeTime, humanFileSize } from "@/lib/utils";

export default async function WebsiteInfoSection() {
  await connection();

  const [pageViewEntries, blogPostsResult, buildSizeResult] = await Promise.all([
    getPageViews(),
    getBlogPosts(5),
    getBuildSize(),
  ]);

  return (
    <section
      className="mt-24 flex scroll-mt-28 flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8 lg:mx-[7%]"
      id="website-info">
      <h2 className="text-4xl text-white sm:text-7xl">Website info</h2>
      <span className="text-opacity-75 px-3 text-center text-lg text-white sm:text-xl">
        I&apos;ll be placing website updates and info here, for those interested
      </span>
      <div className="mt-4 grid w-full grid-flow-row grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:gap-8 lg:p-8">
        <article className="col-span-1 row-span-1 flex flex-col gap-8 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
          <h3 className="text-3xl sm:text-5xl">Build size</h3>
          <div className="flex flex-col justify-center gap-3 text-2xl">
            {buildSizeResult === "unavailable" ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-semibold">Javascript</span>
                  <span className="text-xl">Unavailable</span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">CSS</span>
                  <span className="text-xl">Unavailable</span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Media</span>
                  <span className="text-xl">Unavailable</span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-2xl font-bold sm:text-4xl">Total</span>
                  <span className="text-2xl font-bold sm:text-4xl">
                    Unavailable
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-semibold">Javascript</span>
                  <span className="text-xl">
                    {humanFileSize(buildSizeResult.js)}
                  </span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">CSS</span>
                  <span className="text-xl">
                    {humanFileSize(buildSizeResult.css)}
                  </span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Media</span>
                  <span className="text-xl">
                    {humanFileSize(buildSizeResult.media)}
                  </span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-2xl font-bold sm:text-4xl">Total</span>
                  <span className="text-2xl font-bold sm:text-4xl">
                    {humanFileSize(
                      buildSizeResult.js +
                        buildSizeResult.css +
                        buildSizeResult.media
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </article>
        <article className="col-span-1 row-span-3 flex h-full flex-col gap-8 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
          <h3 className="text-3xl sm:text-5xl md:mb-4 lg:mb-8">
            Latest devblog posts
          </h3>
          {blogPostsResult === "unavailable" ? (
            <span className="text-md ml-2 font-semibold sm:text-xl">
              Blog posts unavailable
            </span>
          ) : blogPostsResult.length === 0 ? (
            <span className="text-md ml-2 font-semibold sm:text-xl">
              Nothing here yet.
            </span>
          ) : (
            <ul className="mt-auto flex h-full max-h-[300px] flex-col gap-8 overflow-y-auto md:max-h-[500px] lg:max-h-[600px] xl:max-h-[800px]">
              {blogPostsResult.map(p => (
                <BlogPostView
                  content={p.content}
                  id={p.id}
                  imageUrl={p.image}
                  key={p.id}
                  publishedRelative={getRelativeTime(p.published, new Date())}
                  title={p.title}
                />
              ))}
            </ul>
          )}
        </article>
        <article className="col-span-1 row-span-2 flex flex-col justify-evenly gap-4 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
          <h3 className="text-3xl sm:text-5xl">Statistics</h3>
          <span className="text-opacity-70 mb-auto text-lg text-white sm:text-xl">
            Hourly website visits
          </span>
          <StatisticsGraph
            entries={pageViewEntries.map<PageView>(e => ({
              ...e,
              recordStartTimestamp: new Date(e.recordStartTimestamp),
            }))}
          />
        </article>
        <article className="col-span-1 flex h-min flex-col gap-x-4 gap-y-4 rounded-lg bg-slate-800 px-6 py-6 text-slate-700 sm:flex-row sm:flex-wrap md:col-span-2 md:px-8 lg:px-12 lg:py-8">
          <h3 className="text-center text-3xl text-white sm:text-start sm:text-5xl">
            Built with:
          </h3>
          <Link
            className="flex items-center gap-2 rounded-full bg-slate-200 px-4 py-1 sm:py-2"
            href="https://nextjs.org/"
            rel="noreferrer"
            target={"_blank"}>
            <SiNextdotjs
              color="#000000"
              size={36}
            />
            <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
              Next.JS
            </span>
          </Link>
          <Link
            className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
            href="https://www.typescriptlang.org/"
            rel="noreferrer"
            target={"_blank"}>
            <SiTypescript
              color="#3178C6"
              size={32}
            />
            <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
              Typescript
            </span>
          </Link>
          <Link
            className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
            href="https://reactjs.org/"
            rel="noreferrer"
            target={"_blank"}>
            <SiReact
              color="#61DAFB"
              size={34}
            />
            <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
              React
            </span>
          </Link>
          <Link
            className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
            href="https://tailwindcss.com/"
            rel="noreferrer"
            target={"_blank"}>
            <SiTailwindcss
              color="#06B6D4"
              size={36}
            />
            <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
              Tailwind
            </span>
          </Link>
        </article>
      </div>
    </section>
  );
}

export function WebsiteInfoSectionSkeleton() {
  return (
    <section
      className="mt-24 flex scroll-mt-28 flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8 lg:mx-[7%]"
      id="website-info">
      <h2 className="text-4xl text-white sm:text-7xl">Website info</h2>
      <span className="text-opacity-75 px-3 text-center text-lg text-white sm:text-xl">
        I&apos;ll be placing website updates and info here, for those interested
      </span>
      <div className="mt-4 grid w-full grid-flow-row grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:gap-8 lg:p-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            className="col-span-1 animate-pulse rounded-lg bg-slate-800 px-6 py-6 md:px-8 lg:px-12 lg:py-8"
            key={index}
            style={{ minHeight: index === 1 ? "20rem" : "12rem" }}
          />
        ))}
      </div>
    </section>
  );
}
