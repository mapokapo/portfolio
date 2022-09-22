import Image from "next/image";
import React from "react";

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const getRelativeTime = (d1: Date, d2 = new Date()) => {
  const units: Record<string, number> = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  const elapsed = d1.getTime() - d2.getTime();

  for (const u in units)
    if (Math.abs(elapsed) > units[u] || u === "second") {
      return rtf.format(
        Math.round(elapsed / units[u]),
        u as Intl.RelativeTimeFormatUnit
      );
    }

  return null;
};
const getReadTimeMinutes = (text: string): number => {
  return Math.ceil(text.trim().split(/\s+/).length / 225);
};

type Props = {
  title: string;
  publishedDate: Date;
  imageUrl: string;
  content: string;
};
const DevblogPost: React.FC<Props> = ({
  title,
  publishedDate,
  imageUrl,
  content,
}) => {
  return (
    <li className="flex flex-col items-center justify-center">
      <div className="gap-4 flex w-full">
        <div className="relative aspect-square lg:min-h-[150px] h-full hidden overflow-hidden lg:flex">
          <Image
            alt={"Devblog post titled " + title}
            objectFit="contain"
            src={imageUrl}
            layout="fill"
          />
        </div>
        <div className="flex flex-col w-full justify-center">
          <h4 className="text-3xl xl:text-4xl break-all font-semibold">
            {title}
          </h4>
          <span className="opacity-50 ml-px mt-1">
            Published {getRelativeTime(publishedDate)} •{" "}
            {getReadTimeMinutes(content)} minute read
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="line-clamp-3 text-xl ml-px">{content}</p>
      </div>
    </li>
  );
};

export default DevblogPost;
