import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import useMeasure from "react-use-measure";

type Props = {
  icon: React.ReactNode;
  title: string;
  content: string;
};
const SectionPanel: React.FC<Props> = ({ icon, title, content }) => {
  const [sectionElement, setSectionElement] = useState<"button" | "div">("div");
  const [expanded, setExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const styles = useSpring({
    to: {
      height: expanded ? bounds.height : 0,
    },
  });

  function handleMediaQuery(mq: MediaQueryListEvent | boolean) {
    setSectionElement(
      (typeof mq === "boolean" ? mq : mq.matches) ? "button" : "div"
    );
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    handleMediaQuery(mq.matches);
    mq.addEventListener("change", handleMediaQuery);

    return () => {
      mq.removeEventListener("change", handleMediaQuery);
    };
  }, []);

  const SectionElement = sectionElement;
  const ExpandIcon = expanded ? MdExpandLess : MdExpandMore;

  return (
    <article className="z-10">
      <SectionElement
        className="bg-slate-800 z-10 flex shadow-md text-center sm:text-start shadow-slate-800 flex-col p-4 py-8 gap-2 sm:gap-8 sm:p-16 sm:mx-16"
        onClick={
          sectionElement === "button" ? () => setExpanded(!expanded) : undefined
        }>
        <div className="flex gap-4 flex-col sm:flex-row items-center w-full text-white px-4 sm:px-0 sm:mb-0 mb-3">
          <div className="text-5xl -mb-2 sm:text-5xl">{icon}</div>
          <h3 className="text-4xl sm:text-5xl">{title}</h3>
        </div>
        <animated.div
          style={styles}
          className="overflow-hidden sm:hidden">
          <p
            ref={ref}
            className="text-white text-xl sm:text-2xl">
            {content}
          </p>
        </animated.div>
        <p className="text-white hidden sm:flex text-2xl">{content}</p>
        <ExpandIcon className="text-3xl text-white sm:hidden w-full" />
      </SectionElement>
    </article>
  );
};

export default SectionPanel;
