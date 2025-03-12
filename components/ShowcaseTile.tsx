import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { MdExpandMore, MdLaunch } from "react-icons/md";
import useMeasure from "react-use-measure";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  meta: {
    imageUrl?: string;
    linkUrl?: string;
    madeWith: { icon: React.ReactNode; label: string }[];
  };
};
const ShowcaseTile: React.FC<Props> = ({
  title,
  description,
  meta: { imageUrl, madeWith, linkUrl },
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const styles = useSpring({
    height: isExpanded ? bounds.height : 0,
  });
  // Apparently expanding a box with aspect-ratio=1 doesnt work in firefox
  const [isFirefox, setIsFirefox] = useState(false);
  useEffect(() => {
    setIsFirefox(navigator.userAgent.toLowerCase().indexOf("firefox") > -1);
  }, []);

  return (
    <button
      aria-expanded={isExpanded}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative flex h-min min-w-[250px] cursor-pointer flex-col bg-slate-800 px-4 py-8 pb-2 shadow-md shadow-slate-800 transition-all hover:brightness-125 sm:w-[300px] ${
        isFirefox ? isExpanded ? "aspect-auto" : "aspect-square" : "aspect-square"
      }`}>
      <div className="flex h-full w-full select-none flex-col justify-between pb-4">
        {imageUrl !== undefined && (
          <div className="mx-auto flex h-16 items-center justify-center">
            <Image
              alt={"Image of project called " + title}
              src={imageUrl}
              className="opacity-90"
              width={64}
              height={64}
              quality={100}
            />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <h3 className="mb-auto text-center text-2xl text-white sm:text-4xl">
            {title}
          </h3>
          <p className="flex text-center text-sm text-white sm:text-xl">
            {description}
          </p>
        </div>
        <MdExpandMore
          className="mx-auto text-white"
          size={24}
        />
      </div>
      <animated.div
        style={styles}
        className="w-full overflow-hidden bg-slate-800">
        <div
          ref={ref}
          className="flex flex-col gap-1 p-2 text-white">
          <span className="text-start text-2xl">Made with:</span>
          <ul className="list-inside">
            {madeWith.map(e => (
              <li
                key={e.label}
                className="flex items-center gap-2 text-lg">
                {e.icon}
                {e.label}
              </li>
            ))}
          </ul>
          {isExpanded && linkUrl !== undefined && (
            <Link
              onClick={e => {
                e.stopPropagation();
              }}
              href={linkUrl}
              target="_blank"
              className="mx-auto mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 hover:bg-slate-700"
              rel="noreferrer">
              <MdLaunch />
              <span>Visit project</span>
            </Link>
          )}
        </div>
      </animated.div>
    </button>
  );
};

export default ShowcaseTile;
