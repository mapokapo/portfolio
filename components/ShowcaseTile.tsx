import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { MdExpandMore, MdLaunch } from "react-icons/md";
import useMeasure from "react-use-measure";

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
      className={
        isFirefox
          ? "bg-slate-800 cursor-pointer hover:brightness-125 transition-all py-8 px-4 pb-2 relative sm:w-[300px] sm:h-full h-min min-w-[250px] flex shadow-md shadow-slate-800 flex-col"
          : "bg-slate-800 cursor-pointer hover:brightness-125 transition-all py-8 px-4 pb-2 relative sm:w-[300px] sm:h-full h-min min-w-[250px] flex shadow-md shadow-slate-800 flex-col aspect-square"
      }>
      <div className="select-none w-full my-auto">
        {imageUrl !== undefined && (
          <div className="flex justify-center flex-1 items-center mb-auto">
            <Image
              alt={"Image of project called " + title}
              src={imageUrl}
              className="opacity-90"
              layout="fixed"
              width={64}
              height={64}
            />
          </div>
        )}
        <div className="flex flex-col gap-4 flex-1 mt-4">
          <h4 className="text-white mb-auto text-4xl text-center">{title}</h4>
          <p className="text-white sm:flex hidden text-center text-xl">
            {description}
          </p>
        </div>
        <MdExpandMore
          className="text-white mx-auto mt-4"
          size={24}
        />
      </div>
      <animated.div
        style={styles}
        className="bg-slate-800 overflow-hidden w-full">
        <div
          ref={ref}
          className="p-2 flex flex-col text-white gap-1">
          <h5 className="text-2xl text-start">Made with:</h5>
          <ul className="list-inside">
            {madeWith.map((t, i) => (
              <li
                key={i}
                className="text-lg flex items-center gap-2">
                {t.icon}
                {t.label}
              </li>
            ))}
          </ul>
          {isExpanded && linkUrl !== undefined && (
            <a
              onClick={e => {
                e.stopPropagation();
              }}
              href={linkUrl}
              target="_blank"
              className="flex gap-2 justify-center items-center mx-auto mt-4 hover:bg-slate-700 px-4 py-2 rounded-lg"
              rel="noreferrer">
              <MdLaunch />
              <span>Visit project</span>
            </a>
          )}
        </div>
      </animated.div>
    </button>
  );
};

export default ShowcaseTile;
