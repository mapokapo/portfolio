"use client";

import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdExpandMore, MdLaunch } from "react-icons/md";
import useMeasure from "react-use-measure";

import iconMap from "@/lib/const/iconMap";
import Showcase from "@/lib/types/Showcase";

export type ShowcaseCardProps = {
  showcase: Showcase;
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ showcase }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const styles = useSpring({
    height: isExpanded ? bounds.height : 0,
  });

  return (
    <button
      aria-expanded={isExpanded}
      className={`relative flex h-min w-full cursor-pointer flex-col bg-slate-800 px-4 py-8 pb-2 shadow-md shadow-slate-800 transition-all hover:brightness-125 sm:w-min ${isExpanded ? "min-w-screen sm:min-w-[600px]" : "min-w-[300px] sm:min-w-[400px]"}`}
      onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex h-full w-full flex-col justify-between pb-4 select-none">
        <div className="mx-auto mb-2 flex h-16 items-center justify-center">
          <Image
            alt={"Image of project called " + showcase.title}
            className="opacity-90"
            height={64}
            quality={100}
            src={showcase.meta.imageUrl}
            width={64}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="mb-auto text-center text-2xl text-white sm:text-4xl">
            {showcase.title}
          </h3>
          <p className="mx-auto flex text-center text-sm text-white sm:text-xl">
            {showcase.description}
          </p>
        </div>
        <MdExpandMore
          className="mx-auto mt-2 text-white"
          size={24}
        />
      </div>
      <animated.div
        className="w-full overflow-hidden bg-slate-800"
        style={styles}>
        <div
          className="flex flex-col gap-1 p-2 text-white"
          ref={ref}>
          <p className="space mx-2 mb-4 text-left text-sm text-gray-300">
            {showcase.content}
          </p>
          <span className="mb-2 text-2xl">Made with</span>
          <ul className="flex list-inside flex-wrap justify-center gap-4">
            {showcase.meta.madeWith.map(label => (
              <li
                className="flex items-center gap-2 rounded-lg border border-gray-700 px-2 text-sm whitespace-nowrap sm:text-lg"
                key={label}>
                {iconMap[label]}
                {label}
              </li>
            ))}
          </ul>
          {isExpanded &&
            showcase.meta.links !== undefined &&
            showcase.meta.links.length > 0 &&
            showcase.meta.links.map((link, i) => (
              <Link
                className={`mx-auto flex items-center justify-center gap-2 rounded-lg px-4 py-2 hover:bg-slate-700 ${i === 0 ? "mt-4" : "mt-1"}`}
                href={link.url}
                key={link.label}
                onClick={e => {
                  e.stopPropagation();
                }}
                rel="noreferrer"
                target="_blank">
                <MdLaunch />
                <span>{link.label}</span>
              </Link>
            ))}
        </div>
      </animated.div>
    </button>
  );
};

export default ShowcaseCard;
