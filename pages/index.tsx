import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import React, { ReactNode, Suspense } from "react";
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
  SiJava,
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
import DevblogPost from "../components/DevblogPost";
import SectionPanel from "../components/SectionPanel";
import ShowcaseTile from "../components/ShowcaseTile";
import TreeRenderer from "../components/TreeRenderer";
import data from "../public/assets/data.json";
import getEntries, { PageView } from "../utils/getEntries";
import LinkCircle from "../components/LinkCircle";
import getPosts from "../utils/getPosts";
import getBuildSize, { SizeBytes } from "../utils/getBuildSize";
import dynamic from "next/dynamic";

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
    "Java 17": <SiJava color="#f89820" />,
    Bitdraw: <SiNpm color="#CB3837" />,
    "Spring Boot": <SiSpringboot color="#6DB33F" />,
    Postgres: <SiPostgresql color="#4169E1" />,
    "Socket.IO": <SiSocketdotio color="#010101" />,
    "Vue 3": <SiVuedotjs color="#4FC08D" />,
    Docker: <SiDocker color="#2496ED" />,
    Redis: <SiRedis color="#DC382D" />,
  };

  const LineGraph = dynamic(() => import("../components/LineGraph"), {
    suspense: true,
  });

  return (
    <main className="w-full h-full flex flex-col bg-slate-900">
      <section
        className="bg-gradient-to-tr gap-2 animate-gradient-move from-blue-600 to-blue-500 w-full min-h-screen flex justify-center items-center flex-col"
        style={{ backgroundSize: "400% 400%" }}>
        <h1
          className="text-transparent font-bold text-7xl sm:text-9xl animate-gradient-move bg-clip-text bg-gradient-to-r from-indigo-300 to-sky-200"
          style={{ backgroundSize: "400% 400%" }}>
          Hello
        </h1>
        <span className="text-gray-100 text-xl">Welcome to my website</span>
        <MdExpandMore
          size={36}
          color={"#eee"}
        />
        <span className="text-opacity-50 absolute bottom-32 text-white text-xl">
          Learn more about me...
        </span>
      </section>
      <section className="flex flex-col gap-3 sm:gap-8 py-4 sm:py-8 relative bg-gradient-to-b from-blue-600 to-slate-900">
        <div className="absolute blur-md bg-gradient-to-b from-blue-600 to-blue-500 w-full -mt-8 sm:-mt-12 sm:h-8 h-8 z-0"></div>
        {data.sections.map((s, i) => (
          <SectionPanel
            key={i}
            title={s.title}
            content={s.content}
            icon={iconMap[s.icon]}
          />
        ))}
      </section>
      <section className="bg-slate-900 flex flex-col justify-center items-center mt-24 gap-4">
        <h2 className="text-white text-5xl sm:text-7xl">Showcase</h2>
        <span className="text-white text-opacity-75 px-3 text-xl text-center">
          Here&apos;s a short list of projects I made so far...
        </span>
        <MdEast className="text-gray-400 text-4xl sm:hidden" />
        <div className="gap-4 px-4 items-stretch overflow-x-auto w-full flex sm:flex-wrap sm:px-[5%] md:mx-16 my-2 sm:my-8 sm:justify-center">
          {data.showcaseTiles.map((s, i) => (
            <ShowcaseTile
              key={i}
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
        <h2 className="text-white text-5xl sm:text-7xl">Tech stack</h2>
        <span className="text-white text-opacity-75 px-3 text-xl text-center sm:mb-6">
          Finally, the part you&apos;ve been waiting for
        </span>
        <div className="flex flex-col">
          {data.techStack.map((e, i) => (
            <TreeRenderer
              root={true}
              key={i}
              item={e}
            />
          ))}
        </div>
      </section>
      <section className="bg-slate-900 md:mx-8 flex flex-col justify-center items-center mt-24 gap-4">
        <h2 className="text-white text-5xl sm:text-7xl">Website info</h2>
        <span className="text-white text-opacity-75 px-3 text-xl text-center">
          I&apos;ll be placing website updates and info here, for those
          interested
        </span>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 w-full mt-4 p-4 lg:p-8">
          <article className="websiteinfo-article col-span-1 row-span-1">
            <h5 className="text-4xl sm:text-5xl">Build size</h5>
            <div className="flex flex-col text-2xl gap-3 justify-center">
              {sizeBytes === null ? (
                <span>Unavailable.</span>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold">Javascript</span>
                    <span>{humanFileSize(sizeBytes.javascript)}</span>
                  </div>
                  <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="font-semibold">CSS</span>
                    <span>{humanFileSize(sizeBytes.css)}</span>
                  </div>
                  <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Images</span>
                    <span>{humanFileSize(sizeBytes.images)}</span>
                  </div>
                  <hr className="mt-4 mb-2 h-px w-full opacity-50" />
                  <div className="flex justify-between">
                    <span className="font-bold text-3xl sm:text-4xl">
                      Total
                    </span>
                    <span className="font-bold text-3xl sm:text-4xl">
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
            <h5 className="text-4xl sm:text-5xl md:mb-4 lg:mb-8">
              Latest devblog posts
            </h5>
            {posts.length === 0 ? (
              <span className="text-xl font-semibold ml-2">
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
            <h5 className="text-4xl sm:text-5xl">Statistics</h5>
            <span className="text-xl text-white text-opacity-70 mb-auto">
              Hourly website visits
            </span>
            <Suspense fallback={<span>Loading...</span>}>
              <LineGraph
                entries={entries.map<PageView>(e => ({
                  ...e,
                  recordStartTimestamp: new Date(e.recordStartTimestamp),
                }))}
              />
            </Suspense>
          </article>
          <article className="flex sm:flex-row flex-col sm:flex-wrap gap-x-4 gap-y-4 bg-slate-800 rounded-lg px-6 md:px-8 lg:px-12 py-6 lg:py-8 text-slate-700 col-span-1 md:col-span-2 h-min">
            <h5 className="text-4xl sm:text-5xl sm:text-start text-center text-white">
              Built with:
            </h5>
            <a
              target={"_blank"}
              href="https://nextjs.org/"
              className="flex gap-2 items-center bg-slate-200 px-4 py-2 rounded-full"
              rel="noreferrer">
              <SiNextdotjs
                color="#000000"
                size={36}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                Next.JS
              </span>
            </a>
            <a
              target={"_blank"}
              href="https://www.typescriptlang.org/"
              className="flex gap-2 items-center bg-slate-200 px-5 py-2 rounded-full"
              rel="noreferrer">
              <SiTypescript
                color="#3178C6"
                size={32}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                Typescript
              </span>
            </a>
            <a
              target={"_blank"}
              href="https://reactjs.org/"
              className="flex gap-2 items-center bg-slate-200 px-5 py-2 rounded-full"
              rel="noreferrer">
              <SiReact
                color="#61DAFB"
                size={34}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                React
              </span>
            </a>
            <a
              target={"_blank"}
              href="https://tailwindcss.com/"
              className="flex gap-2 items-center bg-slate-200 px-5 py-2 rounded-full"
              rel="noreferrer">
              <SiTailwindcss
                color="#06B6D4"
                size={36}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                Tailwind
              </span>
            </a>
          </article>
        </div>
      </section>
      <section className="bg-slate-900 md:mx-8 flex flex-col justify-center items-center mt-20 gap-4">
        <h2 className="text-white text-5xl sm:text-7xl">Links</h2>
        <span className="text-white text-opacity-75 px-3 text-xl text-center">
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
      <footer className="flex justify-center items-center my-8 text-white">
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
  // Only get entries for current day
  const entries = (await getEntries()).slice(-(new Date().getHours() + 1)).map<{
    recordStartTimestamp: number;
    totalViews: number;
  }>(e => ({
    recordStartTimestamp: e.recordStartTimestamp.getTime(),
    totalViews: e.totalViews,
  }));
  // Get newest 3 posts, calculate snippet, and make serializable
  const posts = (await getPosts()).slice(-3).map<{
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
      entries,
      posts,
      sizeBytes,
    },
    revalidate: 60,
  };
};

export default Home;
