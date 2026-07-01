import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { MdEast, MdExpandMore } from "react-icons/md";
import {
  SiGithub,
  SiLinkedin,
} from "react-icons/si";

import AnchorMenu from "@/components/anchor-menu";
import CircularLink from "@/components/circular-link";
import IntroText from "@/components/intro-text";
import QuoteView from "@/components/quote-view";
import ShowcaseCard from "@/components/showcase-card";
import TechStackTree from "@/components/tech-stack-tree";
import WebsiteInfoSection, {
  WebsiteInfoSectionSkeleton,
} from "@/components/website-info-section";
import { getTextData } from "@/lib/server/getTextData";
import { randomChoice } from "@/lib/utils";

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  await connection();
  const textData = await getTextData();

  return (
    <main className="relative flex h-full w-full flex-col bg-slate-900">
      <AnchorMenu
        anchors={[
          { id: "main", label: "Intro" },
          { id: "showcase", label: "Showcase" },
          { id: "tech-stack", label: "Tech stack" },
          { id: "website-info", label: "Website info" },
          { id: "links", label: "Links" },
        ]}
      />
      <section
        className="relative flex min-h-screen w-full scroll-mt-28 flex-col items-center justify-center gap-2 bg-gradient-to-tr from-blue-600 to-blue-500 pt-[10%]"
        id="main"
        style={{ backgroundSize: "400% 400%" }}>
        <QuoteView quote={randomChoice(textData.quotes)} />
        <IntroText />
        <span className="text-lg text-gray-100 sm:text-2xl">
          Welcome to my website
        </span>
        <MdExpandMore
          className="mb-auto animate-bounce"
          color={"#eee"}
          size={36}
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
            . I am a 22 year old computer science student, a software developer,
            and technology enthusiast.
          </p>
        </section>
        <Link
          className="mx-auto flex items-end gap-2 text-white"
          href="/lore">
          <h2 className="z-10 text-center text-xl font-bold underline sm:text-2xl">
            Read more about me
          </h2>
          <MdEast
            className="mb-0.5"
            size={24}
          />
        </Link>
      </section>
      <section
        className="mt-24 flex scroll-mt-28 flex-col items-center justify-center gap-4 bg-slate-900"
        id="showcase">
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
      <section
        className="mt-20 flex scroll-mt-28 flex-col items-center justify-center gap-4 bg-slate-900"
        id="tech-stack">
        <h2 className="text-4xl text-white sm:text-7xl">Tech stack</h2>
        <span className="text-opacity-75 px-3 text-center text-lg text-white sm:mb-6 sm:text-xl">
          The important part
        </span>
        <ul className="flex flex-col">
          {textData.techStack.map(e => (
            <TechStackTree
              item={e}
              key={e.name}
              parentExpandedOrIsRoot={true}
            />
          ))}
        </ul>
      </section>
      <Suspense fallback={<WebsiteInfoSectionSkeleton />}>
        <WebsiteInfoSection />
      </Suspense>
      <section
        className="mt-20 flex scroll-mt-28 flex-col items-center justify-center gap-4 bg-slate-900 md:mx-8"
        id="links">
        <h2 className="text-4xl text-white sm:text-7xl">Links</h2>
        <span className="text-opacity-75 px-3 text-center text-lg text-white sm:text-xl">
          If you want to stay in touch or check out my other projects
        </span>
        <div className="flex justify-between gap-8">
          <CircularLink
            icon={
              <SiGithub
                color="#fff"
                size={32}
              />
            }
            link="https://github.com/mapokapo"
            name="Github link"
          />
          <CircularLink
            icon={
              <SiLinkedin
                color="#fff"
                size={32}
              />
            }
            link="https://www.linkedin.com/in/leo-petrovi%C4%87-7047b1162/"
            name="LinkedIn link"
          />
        </div>
      </section>
      <footer className="my-8 flex items-center justify-center text-white sm:text-base">
        <p>Leo Petrovic • 2022</p>
      </footer>
    </main>
  );
}

function HomeSkeleton() {
  return (
    <main className="relative flex h-full w-full animate-pulse flex-col bg-slate-900">
      <div className="min-h-screen bg-gradient-to-tr from-blue-600 to-blue-500" />
      <div className="mx-auto mt-24 h-12 w-64 rounded-lg bg-slate-800" />
      <div className="mx-auto mt-20 h-64 w-full max-w-5xl rounded-lg bg-slate-800" />
      <WebsiteInfoSectionSkeleton />
    </main>
  );
}
