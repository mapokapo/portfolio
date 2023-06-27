import { animated, easings, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import useMeasure from "react-use-measure";
import useVisibility from "../utils/hooks/useVisibility";

type Props = {
  icon: React.ReactNode;
  title: string;
  content: string;
};
const SectionPanel: React.FC<Props> = ({ icon, title, content }) => {
  const [sectionElement, setSectionElement] = useState<"button" | "div">("div");
  const [expanded, setExpanded] = useState(false);
  const [visible, visibilityRef] = useVisibility(-200);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [expandRef, bounds] = useMeasure();
  const expandStyles = useSpring({
    to: {
      height: expanded ? bounds.height : 0,
    },
  });
  const fadeInStyles = useSpring({
    from: {
      opacity: 0,
      left: -200,
    },
    to: {
      opacity: shouldFadeIn ? 1 : 0,
      left: shouldFadeIn ? 0 : -200,
    },
    config: {
      duration: 900,
      easing: easings.easeOutQuint,
    },
  });

  function handleMediaQuery(mq: MediaQueryListEvent | boolean) {
    if (typeof mq === "boolean") {
      setSectionElement(mq ? "button" : "div");
    } else {
      setSectionElement(mq.matches ? "button" : "div");
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    handleMediaQuery(mq.matches);
    mq.addEventListener("change", handleMediaQuery);

    return () => {
      mq.removeEventListener("change", handleMediaQuery);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setShouldFadeIn(true);
    }
  }, [visible, setShouldFadeIn]);

  const SectionElement = sectionElement;
  const ExpandIcon = expanded ? MdExpandLess : MdExpandMore;

  return (
    <animated.article
      ref={visibilityRef}
      style={fadeInStyles}
      className="z-10 relative">
      <SectionElement
        className="bg-slate-800 z-10 flex shadow-md text-start shadow-slate-800 flex-col p-4 py-8 gap-2 sm:gap-8 sm:p-16 sm:mx-16"
        onClick={
          sectionElement === "button" ? () => setExpanded(!expanded) : undefined
        }>
        <div className="flex gap-4 flex-col sm:flex-row items-center w-full text-white px-4 sm:px-0 sm:mb-0 mb-3">
          <div className="text-5xl -mb-2 sm:text-5xl">{icon}</div>
          <h3 className="text-4xl sm:text-start text-center sm:text-5xl">
            {title}
          </h3>
        </div>
        <animated.div
          style={expandStyles}
          className="overflow-hidden sm:hidden">
          <p
            ref={expandRef}
            className="text-white text-xl sm:text-2xl">
            {content}
          </p>
        </animated.div>
        <p className="text-white hidden sm:flex leading-8 text-xl">{content}</p>
        <ExpandIcon className="text-3xl text-white sm:hidden w-full" />
      </SectionElement>
    </animated.article>
  );
};

export default SectionPanel;
