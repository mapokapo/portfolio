import { convert as html2text } from "html-to-text";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type BlogPostViewProps = {
  className?: string;
  content: string;
  id: string;
  imageUrl: string;
  publishedRelative: string;
  title: string;
};

const BlogPostView: React.FC<BlogPostViewProps> = ({
  className,
  content,
  id,
  imageUrl,
  publishedRelative,
  title,
}) => {
  const getReadTimeMinutes = (text: string): number => {
    return Math.ceil(text.trim().split(/\s+/).length / 225);
  };

  return (
    <li className={className}>
      <Link
        className="flex cursor-pointer flex-col items-center justify-center gap-2"
        href={`/blog/${id}`}>
        <div className="flex w-full gap-4">
          <div className="relative hidden h-20 w-20 overflow-hidden lg:flex xl:h-24 xl:w-24">
            <Image
              alt={"Devblog post titled " + title}
              className="object-contain p-1"
              fill={true}
              sizes="(min-width: 1280px) 6rem, 5rem"
              src={imageUrl}
            />
          </div>
          <div className="flex flex-[3] flex-col justify-center xl:flex-[4]">
            <h4 className="text-2xl font-semibold break-normal xl:text-4xl">
              {title}
            </h4>
            <span className="mt-1 ml-px text-xs opacity-50 sm:text-base">
              Published {publishedRelative} • {getReadTimeMinutes(content)}{" "}
              minute read
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="line-clamp-3">{html2text(content).slice(0, 200)}</p>
        </div>
      </Link>
    </li>
  );
};

export default BlogPostView;
