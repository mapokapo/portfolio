import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { MdExpandMore } from "react-icons/md";
import useMeasure from "react-use-measure";

type Props = {
  title: string;
  description: string;
  meta: {
    imageUrl?: string;
    madeWith: { icon: React.ReactNode; label: string }[];
  };
};
const ShowcaseTile: React.FC<Props> = ({
  title,
  description,
  meta: { imageUrl, madeWith },
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const styles = useSpring({
    height: isExpanded ? bounds.height : 0,
  });

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={
        "bg-slate-800 cursor-pointer hover:brightness-125 transition-all py-8 px-4 pb-2 relative w-full sm:w-[300px] h-full flex shadow-md shadow-slate-800 flex-col sm:aspect-square"
      }>
      <div className="select-none">
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
          <p className="text-white text-center text-xl">{description}</p>
        </div>
        <MdExpandMore
          className="text-white mx-auto mt-4"
          size={24}
        />
      </div>
      <animated.div
        style={styles}
        className="bg-slate-800 overflow-hidden">
        <div
          ref={ref}
          className="p-2 flex flex-col text-white gap-1">
          <h5 className="text-2xl">Made with:</h5>
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
        </div>
      </animated.div>
    </button>
  );
};

export default ShowcaseTile;
