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
};
const DevblogPost: React.FC<Props> = ({
  id,
  title,
  publishedDate,
  imageUrl,
  content,
}) => {
  const [relativeTime, setRelativeTime] = useState<null | string>(null);
  useEffect(() => {
    setRelativeTime(getRelativeTime(publishedDate));
  }, [publishedDate]);

  const getReadTimeMinutes = (text: string): number => {
    return Math.ceil(text.trim().split(/\s+/).length / 225);
  };

  return (
    <li>
      <Link
        href={`/blog/${id}`}
        className="flex cursor-pointer flex-col items-center justify-center gap-2">
        <div className="flex w-full gap-4">
          <div className="relative hidden h-20 w-20 overflow-hidden lg:flex xl:h-24 xl:w-24">
            <Image
              alt={"Devblog post titled " + title}
              src={imageUrl}
              className="object-contain p-1"
              fill={true}
              sizes="(min-width: 1280px) 6rem, 5rem"
            />
          </div>
          <div className="flex flex-[3] flex-col justify-center xl:flex-[4]">
            <h4 className="break-normal text-2xl font-semibold xl:text-4xl">
              {title}
            </h4>
            {relativeTime !== null && (
              <span className="ml-px mt-1 text-xs opacity-50 sm:text-base">
                Published {relativeTime} • {getReadTimeMinutes(content)} minute
                read
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="ml-px line-clamp-3 text-base sm:text-xl xl:line-clamp-4">
            {content}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default DevblogPost;
