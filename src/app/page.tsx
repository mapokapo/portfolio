import BlogPostView from "@/components/blog-post-view";
import CircularLink from "@/components/circular-link";
import IntroText from "@/components/intro-text";
import QuoteView from "@/components/quote-view";
import ShowcaseCard from "@/components/showcase-card";
import StatisticsGraph from "@/components/statistics-graph";
import TechStackTree from "@/components/tech-stack-tree";
import { PageView } from "@/lib/schemas/pageView";
import { getBlogPosts } from "@/lib/server/blogPosts";
import { getBuildSize } from "@/lib/server/buildSize";
import { getTextData } from "@/lib/server/getTextData";
import { getPageViews } from "@/lib/server/pageViews";
import { getRelativeTime, humanFileSize, randomChoice } from "@/lib/utils";
import Link from "next/link";
import { MdEast, MdExpandMore } from "react-icons/md";
import {
  SiGithub,
  SiLinkedin,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export default async function Home() {
  const textData = await getTextData();
  const pageViewEntries = await getPageViews();
  const blogPosts = await getBlogPosts(5);
  const buildSize = await getBuildSize();

  return (
    <main className="flex h-full w-full flex-col bg-slate-900">
      <section
        className="relative flex min-h-screen w-full flex-col items-center justify-center gap-2 bg-gradient-to-tr from-blue-600 to-blue-500 pt-[10%]"
        style={{ backgroundSize: "400% 400%" }}>
        <QuoteView quote={randomChoice(textData.quotes)} />
        <IntroText />
        <span className="text-lg text-gray-100 sm:text-2xl">
          Welcome to my website
        </span>
        <MdExpandMore
          size={36}
          color={"#eee"}
          className="mb-auto animate-bounce"
        />
        <span className="text-opacity-50 mb-20 text-lg text-white sm:mt-16 sm:mb-24 sm:text-xl">
          Learn more about me...
        </span>
      </section>
      <section className="relative flex flex-col bg-gradient-to-b from-blue-600 to-slate-900 pt-8 pb-16 sm:pb-32">
        <div className="absolute z-0 -mt-8 h-8 w-full bg-gradient-to-b from-[rgb(37,99,235)] to-[#235EDD] blur-md sm:-mt-14 sm:h-16"></div>
        <section className="flex h-[25vw] min-h-[300px] flex-col justify-center gap-6 p-4 pb-16 sm:mx-16">
          <h2 className="z-10 text-center text-4xl font-bold text-white sm:text-6xl">
            Intro
          </h2>
          <p className="text-center text-lg text-white sm:text-2xl">
            My name is{" "}
            <span
              className="cursor-default border-b border-dotted border-white"
              title="Pronunciation: Leh-oh Peh-troh-vich">
              Leo Petrović
            </span>
            . I am a{" "}
            {Math.floor(
              (Date.now() - new Date(2003, 6, 22).getTime()) /
                (1000 * 60 * 60 * 24 * 365)
            )}{" "}
            year old computer science student, a software developer, and
            technology enthusiast.
          </p>
        </section>
        <Link
          href="/lore"
          className="mx-auto flex items-end gap-2 text-white">
          <h2 className="z-10 text-center text-xl font-bold underline sm:text-2xl">
            Read more about me
          </h2>
          <MdEast
            size={24}
            className="mb-0.5"
          />
        </Link>
      </section>
      <section className="mt-24 flex flex-col items-center justify-center gap-4 bg-slate-900">
        <h2 className="text-4xl text-white sm:text-7xl">Showcase</h2>
        <span className="text-opacity-75 px-3 text-center text-lg text-white sm:text-xl">
          Here&apos;s a short list of projects I made so far...
        </span>
        <MdEast className="text-4xl text-gray-400 sm:hidden" />
        <div className="my-2 flex w-full items-stretch gap-4 overflow-x-auto px-4 sm:my-8 sm:w-auto sm:flex-wrap sm:justify-center md:mx-16 lg:mx-[10%]">
          {textData.showcase.map(s => (
            <ShowcaseCard
              key={s.title}
              showcase={s}
            />
          ))}
        </div>
      </section>
      <section className="mt-20 flex flex-col items-center justify-center gap-4 bg-slate-900">
        <h2 className="text-4xl text-white sm:text-7xl">Tech stack</h2>
        <span className="text-opacity-75 px-3 text-center text-lg text-white sm:mb-6 sm:text-xl">
          The important part
        </span>
        <ul className="flex flex-col">
          {textData.techStack.map(e => (
            <TechStackTree
              key={e.name}
              item={e}
              parentExpandedOrIsRoot={true}
            />
          ))}
        </ul>
      </section>
      <section className="mt-24 flex flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8 lg:mx-[7%]">
        <h2 className="text-4xl text-white sm:text-7xl">Website info</h2>
        <span className="text-opacity-75 px-3 text-center text-lg text-white sm:text-xl">
          I&apos;ll be placing website updates and info here, for those
          interested
        </span>
        <div className="mt-4 grid w-full grid-flow-row grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:gap-8 lg:p-8">
          <article className="col-span-1 row-span-1 flex flex-col gap-8 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
            <h3 className="text-3xl sm:text-5xl">Build size</h3>
            <div className="flex flex-col justify-center gap-3 text-2xl">
              <>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xl font-semibold">Javascript</span>
                  <span className="text-xl">{humanFileSize(buildSize.js)}</span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">CSS</span>
                  <span className="text-xl">
                    {humanFileSize(buildSize.css)}
                  </span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Media</span>
                  <span className="text-xl">
                    {humanFileSize(buildSize.media)}
                  </span>
                </div>
                <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                <div className="flex justify-between">
                  <span className="text-2xl font-bold sm:text-4xl">Total</span>
                  <span className="text-2xl font-bold sm:text-4xl">
                    {humanFileSize(
                      buildSize.js + buildSize.css + buildSize.media
                    )}
                  </span>
                </div>
              </>
            </div>
          </article>
          <article className="col-span-1 row-span-3 flex h-full flex-col gap-8 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
            <h3 className="text-3xl sm:text-5xl md:mb-4 lg:mb-8">
              Latest devblog posts
            </h3>
            {blogPosts.length === 0 ? (
              <span className="text-md ml-2 font-semibold sm:text-xl">
                Nothing here yet.
              </span>
            ) : (
              <ul className="mt-auto flex h-full max-h-[300px] flex-col gap-8 overflow-y-auto md:max-h-[500px] lg:max-h-[600px] xl:max-h-[800px]">
                {blogPosts.map(p => (
                  <BlogPostView
                    key={p.id}
                    id={p.id}
                    imageUrl={p.image}
                    publishedRelative={getRelativeTime(p.published, new Date())}
                    title={p.title}
                    content={p.content}
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
              target={"_blank"}
              href="https://nextjs.org/"
              className="flex items-center gap-2 rounded-full bg-slate-200 px-4 py-1 sm:py-2"
              rel="noreferrer">
              <SiNextdotjs
                color="#000000"
                size={36}
              />
              <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
                Next.JS
              </span>
            </Link>
            <Link
              target={"_blank"}
              href="https://www.typescriptlang.org/"
              className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
              rel="noreferrer">
              <SiTypescript
                color="#3178C6"
                size={32}
              />
              <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
                Typescript
              </span>
            </Link>
            <Link
              target={"_blank"}
              href="https://reactjs.org/"
              className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
              rel="noreferrer">
              <SiReact
                color="#61DAFB"
                size={34}
              />
              <span className="w-full text-center text-xl sm:w-auto sm:text-3xl">
                React
              </span>
            </Link>
            <Link
              target={"_blank"}
              href="https://tailwindcss.com/"
              className="flex items-center gap-2 rounded-full bg-slate-200 px-5 py-1 sm:py-2"
              rel="noreferrer">
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
      <section className="mt-20 flex flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8">
        <h2 className="text-4xl text-white sm:text-7xl">Links</h2>
        <span className="text-opacity-75 px-3 text-center text-lg text-white sm:text-xl">
          If you want to stay in touch or check out my other projects
        </span>
        <div className="flex justify-between gap-8">
          <CircularLink
            name="Github link"
            link="https://github.com/mapokapo"
            icon={
              <SiGithub
                size={32}
                color="#fff"
              />
            }
          />
          <CircularLink
            name="LinkedIn link"
            link="https://www.linkedin.com/in/leo-petrovi%C4%87-7047b1162/"
            icon={
              <SiLinkedin
                size={32}
                color="#fff"
              />
            }
          />
        </div>
      </section>
      <footer className="my-8 flex items-center justify-center text-white sm:text-base">
        <p>Leo Petrovic • 2022</p>
      </footer>
    </main>
  );
}
