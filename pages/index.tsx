import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React, { ReactNode, useEffect, useState } from "react";
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
  SiFlutter,
  SiGithub,
  SiOpenjdk,
  SiLinkedin,
  SiNextdotjs,
  SiNpm,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWebpack,
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
}> = ({
  entries,
  posts,
  sizeBytes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [hasScrolledToLastQuarter, setHasScrolledToLastQuarter] =
    useState(false);
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
    "React Native": <SiReact color="#61DAFB" />,
    Algolia: <SiAlgolia color="#5468FF" />,
    "Java 17": <SiOpenjdk color="#f89820" />,
    Bitdraw: <SiNpm color="#CB3837" />,
    "Spring Boot": <SiSpringboot color="#6DB33F" />,
    Postgres: <SiPostgresql color="#4169E1" />,
    "Socket.IO": <SiSocketdotio color="#010101" />,
    "Vue 3": <SiVuedotjs color="#4FC08D" />,
    Docker: <SiDocker color="#2496ED" />,
    Redis: <SiRedis color="#DC382D" />,
    Tailwind: <SiTailwindcss color="#38BDF8" />,
    React: <SiReact color="#58C4DC" />,
  };

  const LineGraph = dynamic(() => import("../components/LineGraph"), {
    ssr: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage >= 75) {
        setHasScrolledToLastQuarter(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full h-full flex flex-col bg-slate-900">
      <section
        className="bg-gradient-to-tr pt-[10%] gap-2 animate-gradient-move from-blue-600 to-blue-500 w-full min-h-screen flex justify-center items-center flex-col"
        style={{ backgroundSize: "400% 400%" }}>
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
        <span className="text-gray-100 sm:text-2xl text-lg">
          Welcome to my website
        </span>
        <MdExpandMore
          size={36}
          color={"#eee"}
          className="mb-auto animate-bounce"
        />
        <span className="text-opacity-50 sm:mt-16 mb-20 sm:mb-24 text-white sm:text-xl text-lg">
          Learn more about me...
        </span>
      </section>
      <section className="flex flex-col py-4 sm:py-8 relative bg-gradient-to-b from-blue-600 to-slate-900">
        <div className="absolute blur-md bg-gradient-to-b from-[rgb(37,99,235)] to-[rgba(37,99,235,0.99)] w-full -mt-8 sm:-mt-14 sm:h-16 h-8 z-0"></div>
        <section className="flex flex-col justify-center sm:mx-16 pb-16 h-[50vh] p-4 gap-6">
          <h2 className="sm:text-6xl text-4xl z-10 font-bold text-white text-center">
            Queue intro...
          </h2>
          <p className="text-center sm:text-2xl text-lg text-white">
            My name is Leo Petrović. I am a{" "}
            {Math.floor(
              (Date.now() - new Date(2003, 6, 22).getTime()) /
                (1000 * 60 * 60 * 24 * 365)
            )}{" "}
            year old Computer Science student, an experienced programmer, and a
            full-stack web developer.
          </p>
        </section>
        <div className="flex flex-col gap-12 sm:gap-24 w-full">
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
      <section className="bg-slate-900 flex flex-col justify-center items-center mt-24 gap-4">
        <h2 className="text-white text-4xl sm:text-7xl">Showcase</h2>
        <span className="text-white text-opacity-75 px-3 text-lg sm:text-xl text-center">
          Here&apos;s a short list of projects I made so far...
        </span>
        <MdEast className="text-gray-400 text-4xl sm:hidden" />
        <div className="gap-4 px-4 items-stretch overflow-x-auto flex sm:flex-wrap my-2 sm:my-8 md:mx-16 lg:mx-[10%] sm:w-auto w-full sm:justify-center">
          {data.showcaseTiles.map(s => (
            <ShowcaseTile
              key={s.title}
              title={s.title}
              description={s.description}
              meta={{
                imageUrl: s.meta.imageUrl,
                linkUrl: s.meta.linkUrl,
                madeWith: s.meta.madeWith.map(e => ({
                  icon: iconMap[e],
                  label: e,
                })),
              }}
            />
          ))}
        </div>
      </section>
      <section className="bg-slate-900 flex flex-col justify-center items-center mt-20 gap-4">
        <h2 className="text-white text-4xl sm:text-7xl">Tech stack</h2>
        <span className="text-white text-opacity-75 px-3 text-lg sm:text-xl text-center sm:mb-6">
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
      <section className="bg-slate-900 md:mx-8 lg:mx-[7%] flex flex-col justify-center items-center mt-24 gap-4">
        <h2 className="text-white text-4xl sm:text-7xl">Website info</h2>
        <span className="text-white text-opacity-75 px-3 text-lg sm:text-xl text-center">
          I&apos;ll be placing website updates and info here, for those
          interested
        </span>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 w-full mt-4 p-4 lg:p-8">
          <article className="websiteinfo-article col-span-1 row-span-1">
            <h3 className="text-3xl sm:text-5xl">Build size</h3>
            <div className="flex flex-col text-2xl gap-3 justify-center">
              {sizeBytes === null ? (
                <span>Unavailable.</span>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-xl">Javascript</span>
                    <span className="text-xl">
                      {humanFileSize(sizeBytes.javascript)}
                    </span>
                  </div>
                  <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-xl">CSS</span>
                    <span className="text-xl">
                      {humanFileSize(sizeBytes.css)}
                    </span>
                  </div>
                  <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-xl">Images</span>
                    <span className="text-xl">
                      {humanFileSize(sizeBytes.images)}
                    </span>
                  </div>
                  <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="font-bold text-2xl sm:text-4xl">
                      Total
                    </span>
                    <span className="font-bold text-2xl sm:text-4xl">
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
              <span className="sm:text-xl text-md font-semibold ml-2">
                Nothing here yet.
              </span>
            ) : (
              <ul className="flex flex-col gap-8 md:gap-12 xl:gap-16 h-full overflow-y-auto">
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
          <article className="flex flex-col gap-4 bg-slate-800 rounded-lg justify-evenly text-white px-6 md:px-8 lg:px-12 py-6 lg:py-8 col-span-1 row-span-2">
            <h3 className="text-3xl sm:text-5xl">Statistics</h3>
            <span className="text-lg sm:text-xl text-white text-opacity-70 mb-auto">
              Hourly website visits
            </span>
            {hasScrolledToLastQuarter && (
              <LineGraph
                entries={entries.map<PageView>(e => ({
                  ...e,
                  recordStartTimestamp: new Date(e.recordStartTimestamp),
                }))}
              />
            )}
          </article>
          <article className="flex sm:flex-row flex-col sm:flex-wrap gap-x-4 gap-y-4 bg-slate-800 rounded-lg px-6 md:px-8 lg:px-12 py-6 lg:py-8 text-slate-700 col-span-1 md:col-span-2 h-min">
            <h3 className="text-3xl sm:text-5xl sm:text-start text-center text-white">
              Built with:
            </h3>
            <Link
              target={"_blank"}
              href="https://nextjs.org/"
              className="flex gap-2 items-center bg-slate-200 px-4 sm:py-2 py-1 rounded-full"
              rel="noreferrer">
              <SiNextdotjs
                color="#000000"
                size={36}
              />
              <span className="sm:text-3xl text-xl sm:w-auto w-full text-center">
                Next.JS
              </span>
            </Link>
            <Link
              target={"_blank"}
              href="https://www.typescriptlang.org/"
              className="flex gap-2 items-center bg-slate-200 px-5 sm:py-2 py-1 rounded-full"
              rel="noreferrer">
              <SiTypescript
                color="#3178C6"
                size={32}
              />
              <span className="sm:text-3xl text-xl sm:w-auto w-full text-center">
                Typescript
              </span>
            </Link>
            <Link
              target={"_blank"}
              href="https://reactjs.org/"
              className="flex gap-2 items-center bg-slate-200 px-5 sm:py-2 py-1 rounded-full"
              rel="noreferrer">
              <SiReact
                color="#61DAFB"
                size={34}
              />
              <span className="sm:text-3xl text-xl sm:w-auto w-full text-center">
                React
              </span>
            </Link>
            <Link
              target={"_blank"}
              href="https://tailwindcss.com/"
              className="flex gap-2 items-center bg-slate-200 px-5 sm:py-2 py-1 rounded-full"
              rel="noreferrer">
              <SiTailwindcss
                color="#06B6D4"
                size={36}
              />
              <span className="sm:text-3xl text-xl sm:w-auto w-full text-center">
                Tailwind
              </span>
            </Link>
          </article>
        </div>
      </section>
      <section className="bg-slate-900 md:mx-8 flex flex-col justify-center items-center mt-20 gap-4">
        <h2 className="text-white text-4xl sm:text-7xl">Links</h2>
        <span className="text-white text-opacity-75 px-3 text-lg sm:text-xl text-center">
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
      <footer className="flex justify-center items-center my-8 text-white sm:text-base">
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
    },
    revalidate: 60,
  };
};

export default Home;
