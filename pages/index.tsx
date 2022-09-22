import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.defaults.font.size = 16;
ChartJS.defaults.color = "#ddd";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
import React, { ReactNode } from "react";
import { MdExpandMore, MdHome, MdCode, MdTrendingUp } from "react-icons/md";
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

const Home: NextPage<{ entries: PageView[] }> = ({
  entries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      <section className="flex flex-col gap-4 sm:gap-8 py-4 sm:py-8 relative bg-gradient-to-b from-blue-600 to-slate-900">
        <div className="absolute blur-md bg-gradient-to-b from-blue-600 to-blue-500 w-full -mt-8 sm:-mt-12 sm:h-8 h-8"></div>
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
        <div className="gap-4 flex flex-wrap mx-[10%] md:mx-16 sm:mx-8 my-8 justify-center">
          {data.showcaseTiles.map((s, i) => (
            <ShowcaseTile
              key={i}
              title={s.title}
              description={s.description}
              meta={{
                imageUrl: s.meta.imageUrl,
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
        <span className="text-white text-opacity-75 px-3 text-xl text-center">
          Finally, the part you&apos;ve been waiting for
        </span>
        <ul className="flex flex-col">
          {data.techStack.map((e, i) => (
            <TreeRenderer
              key={i}
              item={e}
            />
          ))}
        </ul>
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
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Javascript</span>
                <span>186.56KB</span>
              </div>
              <hr className="mt-4 mb-2 h-px w-full opacity-50" />
              <div className="flex justify-between">
                <span className="font-semibold">CSS</span>
                <span>15.23KB</span>
              </div>
              <hr className="mt-4 mb-2 h-px w-full opacity-50" />
              <div className="flex justify-between">
                <span className="font-semibold">Images</span>
                <span>3.43MB</span>
              </div>
              <hr className="mt-4 mb-2 h-px w-full opacity-50" />
              <div className="flex justify-between">
                <span className="font-bold text-4xl">Total</span>
                <span className="font-bold text-4xl">3.69MB</span>
              </div>
            </div>
          </article>
          <article className="websiteinfo-article col-span-1 row-span-3">
            <h5 className="text-4xl sm:text-5xl">Latest devblog posts</h5>
            <ul className="flex flex-col gap-12">
              <DevblogPost
                imageUrl="/assets/images/lucky_six_logo.png"
                publishedDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
                title="Website in development"
                content={`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero cupiditate debitis sit iusto voluptatem illo assumenda rem libero eum, animi accusamus fugit nemo suscipit voluptatibus molestiae aspernatur natus expedita rerum magni corporis distinctio earum? Quam quidem deserunt error, voluptas magnam repellat impedit nisi corrupti. Pariatur voluptatem quod maiores perspiciatis aliquam!`}
              />
            </ul>
          </article>
          <article className="flex flex-col gap-4 bg-slate-800 rounded-lg text-white px-6 md:px-8 lg:px-12 py-6 lg:py-8 col-span-1 row-span-2">
            <h5 className="text-4xl sm:text-5xl">Statistics</h5>
            <span className="text-xl text-white text-opacity-70 mb-4">
              Hourly website visits
            </span>
            <Line
              options={{
                responsive: true,
                borderColor: "#ddd",
                elements: {
                  point: {
                    radius: 0,
                  },
                },
                font: {
                  size: 32,
                  family: "Segoe UI",
                },
              }}
              data={{
                datasets: [
                  {
                    data: entries.map(e => e.totalViews),
                    tension: 0.3,
                  },
                ],
                labels: entries.map(
                  entry =>
                    new Date(entry.recordStartTimestamp).getHours() + ":00"
                ),
              }}
            />
          </article>
          <article className="flex sm:flex-row flex-col flex-wrap gap-x-4 gap-y-4 bg-slate-800 rounded-lg px-6 md:px-8 lg:px-12 py-6 lg:py-8 text-slate-700 col-span-1 md:col-span-2 h-min">
            <h5 className="text-4xl sm:text-5xl flex text-white">
              Built with:
            </h5>
            <div className="flex gap-2 items-center bg-slate-200 px-4 py-2 rounded-full">
              <SiNextdotjs
                color="#000000"
                size={36}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                Next.JS
              </span>
            </div>
            <div className="flex gap-2 items-center bg-slate-200 px-5 py-2 rounded-full">
              <SiTypescript
                color="#3178C6"
                size={32}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                Typescript
              </span>
            </div>
            <div className="flex gap-2 items-center bg-slate-200 px-5 py-2 rounded-full">
              <SiReact
                color="#61DAFB"
                size={34}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                React
              </span>
            </div>
            <div className="flex gap-2 items-center bg-slate-200 px-5 py-2 rounded-full">
              <SiTailwindcss
                color="#06B6D4"
                size={36}
              />
              <span className="text-3xl sm:w-auto w-full text-center">
                Tailwind
              </span>
            </div>
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
  entries: PageView[];
}> = async () => {
  // Only get entries for current day
  const entries = (await getEntries()).slice(-(new Date().getHours() + 1));

  return {
    props: {
      entries,
    },
    revalidate: 60,
  };
};

export default Home;
