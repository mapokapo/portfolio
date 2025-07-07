import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  MdExpandMore,
  MdHome,
  MdCode,
  MdTrendingUp,
  MdEast,
} from "react-icons/md";
import {
  SiAlgolia,
  SiDocker,
  SiFirebase,
  SiSupabase,
  SiFlutter,
  SiGithub,
  SiOpenjdk,
  SiLinkedin,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWebpack,
  SiExpo,
  SiMariadb,
  SiNestjs,
  SiSqlite,
  SiNuxtdotjs,
  SiBun,
  SiHono,
} from "react-icons/si";
import SectionPanel from "../components/SectionPanel";
import ShowcaseTile from "../components/ShowcaseTile";
import TreeRenderer from "../components/TreeRenderer";
import DevblogPost from "../components/DevblogPost";
import data from "../public/assets/data.json";
import getEntries, { PageView } from "../utils/getEntries";
import LinkCircle from "../components/LinkCircle";
import getPosts from "../utils/getPosts";
import getBuildSize, { SizeBytes } from "../utils/getBuildSize";
import dynamic from "next/dynamic";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { randomChoice } from "../utils/random";
import { mapRange } from "../utils/mapRange";

const Home: NextPage<{
  entries: { recordStartTimestamp: number; totalViews: number }[];
  posts: {
    id: string;
    title: string;
    imageUrl: string;
    published: number;
    snippet: string;
  }[];
  sizeBytes: SizeBytes;
  quote: {
    quote: string;
    author: string;
  };
}> = ({
  entries,
  posts,
  sizeBytes,
  quote,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const humanFileSize = (bytes: number) => {
    const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(1024));
    return (
      parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  };
  const iconMap: Record<string, ReactNode> = {
    // Sections
    Home: <MdHome color="#d35400" />,
    Code: <MdCode color="#3498db" />,
    TrendingUp: <MdTrendingUp color="#2ecc71" />,
    // Showcase
    Typescript: <SiTypescript color="#3178C6" />,
    Webpack: <SiWebpack color="#8DD6F9" />,
    Flutter: <SiFlutter color="#2FB8F6" />,
    Firebase: <SiFirebase color="#FFCC30" />,
    Supabase: <SiSupabase color="#3CCE8D" />,
    "React Native": <SiReact color="#61DAFB" />,
    Algolia: <SiAlgolia color="#5468FF" />,
    Java: <SiOpenjdk color="#f89820" />,
    "Spring Boot": <SiSpringboot color="#6DB33F" />,
    Postgres: <SiPostgresql color="#4169E1" />,
    "Socket.IO": <SiSocketdotio color="#010101" />,
    "Vue 3": <SiVuedotjs color="#4FC08D" />,
    Docker: <SiDocker color="#2496ED" />,
    Redis: <SiRedis color="#DC382D" />,
    Tailwind: <SiTailwindcss color="#38BDF8" />,
    React: <SiReact color="#58C4DC" />,
    Expo: <SiExpo color="#000020" />,
    MariaDB: <SiMariadb color="#008bb2" />,
    NestJS: <SiNestjs color="#E0234E" />,
    SQLite: <SiSqlite color="#429CD5" />,
    Nuxt: <SiNuxtdotjs color="#00DC82" />,
    Bun: <SiBun color="#FFCC00" />,
    Hono: <SiHono color="#FF4C00" />,
  };

  const LineGraph = dynamic(() => import("../components/LineGraph"), {
    ssr: false,
  });

  const lineGraph = useMemo(
    () => (
      <LineGraph
        entries={entries.map<PageView>(e => ({
          ...e,
          recordStartTimestamp: new Date(e.recordStartTimestamp),
        }))}
      />
    ),
    [entries]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollPercentage(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex h-full w-full flex-col bg-slate-900">
      <section
        className="relative flex min-h-screen w-full animate-gradient-move flex-col items-center justify-center gap-2 bg-gradient-to-tr from-blue-600 to-blue-500 pt-[10%]"
        style={{ backgroundSize: "400% 400%" }}>
        <blockquote
          className="fixed left-1/2 top-8 w-max max-w-full -translate-x-1/2 rounded-lg p-4 text-center text-white text-opacity-90"
          style={{
            opacity: mapRange(scrollPercentage, 0, 10, 1, 0),
          }}>
          "{quote.quote}"
          <footer className="mr-1 text-end text-sm text-white text-opacity-50">
            - {quote.author}
          </footer>
        </blockquote>
        <TypewriterComponent
          options={{
            loop: true,
          }}
          onInit={typewriter => {
            typewriter
              .changeDelay(100)
              .changeDeleteSpeed(60)
              .typeString("Hello")
              .pauseFor(2000)
              .deleteAll()
              .pauseFor(500)
              .typeString("My name is Leo")
              .pauseFor(2000)
              .deleteAll()
              .pauseFor(350)
              .start();
          }}
          component={"h1"}
        />
        <span className="text-lg text-gray-100 sm:text-2xl">
          Welcome to my website
        </span>
        <MdExpandMore
          size={36}
          color={"#eee"}
          className="mb-auto animate-bounce"
        />
        <span className="mb-20 text-lg text-white text-opacity-50 sm:mb-24 sm:mt-16 sm:text-xl">
          Learn more about me...
        </span>
      </section>
      <section className="relative flex flex-col bg-gradient-to-b from-blue-600 to-slate-900 py-4 sm:py-8">
        <div className="absolute z-0 -mt-8 h-8 w-full bg-gradient-to-b from-[rgb(37,99,235)] to-[rgba(37,99,235,0.99)] blur-md sm:-mt-14 sm:h-16"></div>
        <section className="flex h-[50vh] flex-col justify-center gap-6 p-4 pb-16 sm:mx-16">
          <h2 className="z-10 text-center text-4xl font-bold text-white sm:text-6xl">
            Queue intro...
          </h2>
          <p className="text-center text-lg text-white sm:text-2xl">
            My name is Leo Petrović. I am a{" "}
            {Math.floor(
              (Date.now() - new Date(2003, 6, 22).getTime()) /
                (1000 * 60 * 60 * 24 * 365)
            )}{" "}
            year old Computer Science student, an experienced programmer, and a
            full-stack web developer.
          </p>
        </section>
        <div className="flex w-full flex-col gap-12 sm:gap-24">
          {data.sections.map(s => (
            <SectionPanel
              key={s.title}
              title={s.title}
              content={s.content}
              icon={iconMap[s.icon]}
            />
          ))}
        </div>
      </section>
      <section className="mt-24 flex flex-col items-center justify-center gap-4 bg-slate-900">
        <h2 className="text-4xl text-white sm:text-7xl">Showcase</h2>
        <span className="px-3 text-center text-lg text-white text-opacity-75 sm:text-xl">
          Here&apos;s a short list of projects I made so far...
        </span>
        <MdEast className="text-4xl text-gray-400 sm:hidden" />
        <div className="my-2 flex w-full items-stretch gap-4 overflow-x-auto px-4 sm:my-8 sm:w-auto sm:flex-wrap sm:justify-center md:mx-16 lg:mx-[10%]">
          {data.showcaseTiles.map(s => (
            <ShowcaseTile
              key={s.title}
              title={s.title}
              description={s.description}
              meta={{
                imageUrl: s.meta.imageUrl,
                links: s.meta.links,
                madeWith: s.meta.madeWith.map(e => ({
                  icon: iconMap[e],
                  label: e,
                })),
              }}
            />
          ))}
        </div>
      </section>
      <section className="mt-20 flex flex-col items-center justify-center gap-4 bg-slate-900">
        <h2 className="text-4xl text-white sm:text-7xl">Tech stack</h2>
        <span className="px-3 text-center text-lg text-white text-opacity-75 sm:mb-6 sm:text-xl">
          Finally, the part you&apos;ve been waiting for
        </span>
        <ul className="flex flex-col">
          {data.techStack.map(e => (
            <TreeRenderer
              key={e.name}
              item={e}
              parentExpandedOrIsRoot={true}
            />
          ))}
        </ul>
      </section>
      <section className="mt-24 flex flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8 lg:mx-[7%]">
        <h2 className="text-4xl text-white sm:text-7xl">Website info</h2>
        <span className="px-3 text-center text-lg text-white text-opacity-75 sm:text-xl">
          I&apos;ll be placing website updates and info here, for those
          interested
        </span>
        <div className="mt-4 grid w-full grid-flow-row grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:gap-8 lg:p-8">
          <article className="websiteinfo-article col-span-1 row-span-1">
            <h3 className="text-3xl sm:text-5xl">Build size</h3>
            <div className="flex flex-col justify-center gap-3 text-2xl">
              {sizeBytes === null ? (
                <span>Unavailable.</span>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xl font-semibold">Javascript</span>
                    <span className="text-xl">
                      {humanFileSize(sizeBytes.javascript)}
                    </span>
                  </div>
                  <hr className="mb-2 mt-4 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="text-xl font-semibold">CSS</span>
                    <span className="text-xl">
                      {humanFileSize(sizeBytes.css)}
                    </span>
                  </div>
                  <hr className="mb-2 mt-4 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="text-xl font-semibold">Images</span>
                    <span className="text-xl">
                      {humanFileSize(sizeBytes.images)}
                    </span>
                  </div>
                  <hr className="mb-2 mt-4 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold sm:text-4xl">
                      Total
                    </span>
                    <span className="text-2xl font-bold sm:text-4xl">
                      {humanFileSize(
                        sizeBytes.javascript + sizeBytes.css + sizeBytes.images
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </article>
          <article className="websiteinfo-article col-span-1 row-span-3">
            <h3 className="text-3xl sm:text-5xl md:mb-4 lg:mb-8">
              Latest devblog posts
            </h3>
            {posts.length === 0 ? (
              <span className="text-md ml-2 font-semibold sm:text-xl">
                Nothing here yet.
              </span>
            ) : (
              <ul className="flex h-full flex-col gap-8 overflow-y-auto md:gap-12 xl:gap-16">
                {posts.map(p => (
                  <DevblogPost
                    key={p.id}
                    id={p.id}
                    imageUrl={p.imageUrl}
                    publishedDate={new Date(p.published)}
                    title={p.title}
                    content={p.snippet}
                  />
                ))}
              </ul>
            )}
          </article>
          <article className="col-span-1 row-span-2 flex flex-col justify-evenly gap-4 rounded-lg bg-slate-800 px-6 py-6 text-white md:px-8 lg:px-12 lg:py-8">
            <h3 className="text-3xl sm:text-5xl">Statistics</h3>
            <span className="mb-auto text-lg text-white text-opacity-70 sm:text-xl">
              Hourly website visits
            </span>
            {lineGraph}
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
        <span className="px-3 text-center text-lg text-white text-opacity-75 sm:text-xl">
          If you want to stay in touch or check out my other projects
        </span>
        <div className="flex justify-between gap-8">
          <LinkCircle
            name="Github link"
            link="https://github.com/mapokapo"
            icon={
              <SiGithub
                size={32}
                color="#fff"
              />
            }
          />
          <LinkCircle
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
};

export const getStaticProps: GetStaticProps<{
  entries: { recordStartTimestamp: number; totalViews: number }[];
  posts: {
    id: string;
    title: string;
    imageUrl: string;
    published: number;
    snippet: string;
  }[];
  sizeBytes: SizeBytes;
  quote: {
    quote: string;
    author: string;
  };
}> = async () => {
  // Only get entries for last day in 1 hour intervals
  // If a 1 hour interval has no entries, it will be counted as 0 views
  const entries = (await getEntries()).map<{
    recordStartTimestamp: number;
    totalViews: number;
  }>(e => ({
    recordStartTimestamp: e.recordStartTimestamp.getTime(),
    totalViews: e.totalViews,
  }));
  const normalizedEntries: {
    recordStartTimestamp: number;
    totalViews: number;
  }[] = [];

  const timespan = 24 * 60 * 60 * 1000; // 1 day
  const currentTimestamp = Date.now() + 3600000; // adjust for timezone
  const startTimestamp = currentTimestamp - timespan;
  for (let i = startTimestamp; i < currentTimestamp; i += 3600000) {
    // adjust for timezone
    const hourStart = new Date(i);
    const matchingEntry = entries.find(entry => {
      return (
        entry.recordStartTimestamp <= hourStart.getTime() &&
        entry.recordStartTimestamp + 3600000 > hourStart.getTime()
      );
    });

    if (matchingEntry) {
      normalizedEntries.push(matchingEntry);
    } else {
      normalizedEntries.push({
        recordStartTimestamp: hourStart.getTime(),
        totalViews: 0,
      });
    }
  }

  // Calculate snippet and make serializable
  const posts = (await getPosts()).map<{
    id: string;
    title: string;
    imageUrl: string;
    published: number;
    snippet: string;
  }>(p => ({
    id: p.id,
    title: p.title,
    imageUrl: p.imageUrl,
    published: p.published.getTime(),
    snippet: p.content.slice(0, 300),
  }));
  // Get size of bundled files
  const sizeBytes = await getBuildSize();

  return {
    props: {
      entries: normalizedEntries,
      posts,
      sizeBytes,
      quote: randomChoice(data.quotes),
    },
    revalidate: 60,
  };
};

export default Home;
