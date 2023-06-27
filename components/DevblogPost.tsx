import Image from "next/legacy/image";
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
        className="flex gap-2 cursor-pointer flex-col items-center justify-center">
        <div className="gap-4 flex w-full">
          <div className="relative xl:w-24 xl:h-24 w-20 h-20 hidden overflow-hidden lg:flex">
            <Image
              alt={"Devblog post titled " + title}
              src={imageUrl}
              objectFit="contain"
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
          <p className="line-clamp-3 xl:line-clamp-4 text-xl ml-px">
            {content}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default DevblogPost;
