import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getRelativeTime from "../utils/getRelativeTime";

type Props = {
  id: string;
  title: string;
  publishedDate: Date;
  imageUrl: string;
  content: string;
  hideSmall?: boolean;
};
const DevblogPost: React.FC<Props> = ({
  id,
  title,
  publishedDate,
  imageUrl,
  content,
  hideSmall = false,
}) => {
  const [relativeTime, setRelativeTime] = useState<null | string>(null);
  useEffect(() => {
    setRelativeTime(getRelativeTime(publishedDate));
  }, [publishedDate]);

  const getReadTimeMinutes = (text: string): number => {
    return Math.ceil(text.trim().split(/\s+/).length / 225);
  };

  return (
    <Link href={`/blog/${id}`}>
      <li
        className={
          "flex gap-2 cursor-pointer flex-col items-center justify-center " +
          (hideSmall ? "hidden md:flex" : "")
        }>
        <div className="gap-4 flex w-full">
          <div className="relative w-full hidden flex-1 overflow-hidden lg:flex">
            <Image
              alt={"Devblog post titled " + title}
              objectFit="contain"
              src={imageUrl}
              layout="fill"
            />
          </div>
          <div className="flex flex-col flex-[3] xl:flex-[4] justify-center">
            <h4 className="text-3xl xl:text-4xl break-normal font-semibold">
              {title}
            </h4>
            {relativeTime !== null && (
              <span className="opacity-50 ml-px mt-1">
                Published {relativeTime} • {getReadTimeMinutes(content)} minute
                read
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="line-clamp-3 text-xl ml-px">{content}</p>
        </div>
      </li>
    </Link>
  );
};

export default DevblogPost;
