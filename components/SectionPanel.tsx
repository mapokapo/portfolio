import { animated, easings, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import useMeasure from "react-use-measure";
import useVisibility from "../utils/hooks/useVisibility";
import useMounted from "../utils/hooks/useMounted";

type Props = {
  icon: React.ReactNode;
  title: string;
  content: string;
};
const SectionPanel: React.FC<Props> = ({ icon, title, content }) => {
  const mounted = useMounted();
  const [sectionType, setSectionType] = useState<"button" | "div">("div");
  const [expanded, setExpanded] = useState(false);
  const [visible, visibilityRef] = useVisibility(-200);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [expandRef, bounds] = useMeasure();

  // Expand the section (mobile-only)
  const expandStyles = useSpring({
    to: {
      height: expanded ? bounds.height : 0,
    },
  });
  // Incrase the section width when expanded (mobile-only)
  const fullWidthStyles = useSpring({
    to:
      sectionType === "div"
        ? undefined
        : {
            marginRight: expanded ? "0" : "10%",
            marginLeft: expanded ? "0" : "10%",
          },
  });
  // Decrease the title size when expanded (mobile-only)
  const expandedTitleStyles = useSpring({
    to: {
      fontSize: expanded ? "1.5rem" : "2rem",
    },
  });

  // Fade in the section when scrolling
  const fadeInStyles = useSpring({
    from: {
      opacity: mounted ? 0 : 1,
      left: mounted ? -200 : 0,
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
      setSectionType(mq ? "button" : "div");
    } else {
      setSectionType(mq.matches ? "button" : "div");
    }
  }

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
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

  const ExpandIcon = expanded ? MdExpandLess : MdExpandMore;

  return (
    <animated.article
      ref={visibilityRef}
      style={fadeInStyles}
      className="relative z-10 w-full">
      {sectionType === "button" ? (
        <animated.button
          className="z-10 flex flex-col gap-2 bg-slate-800 p-2 py-8 text-start shadow-md shadow-slate-800 sm:gap-8 sm:p-16 xs:p-8 xs-max:!m-0"
          style={fullWidthStyles}
          onClick={() => setExpanded(!expanded)}>
          <div className="mb-3 flex w-full flex-col items-center gap-4 px-4 text-white sm:mb-0 sm:flex-row sm:px-0">
            <div className="-mb-2 text-5xl sm:text-5xl">{icon}</div>
            <animated.h3
              style={expandedTitleStyles}
              className="text-center sm:text-start">
              {title}
            </animated.h3>
          </div>
          <animated.div
            style={expandStyles}
            className="overflow-hidden sm:hidden">
            <p
              ref={expandRef}
              className="text-md text-white sm:py-8 sm:text-2xl"
              dangerouslySetInnerHTML={{ __html: content }}></p>
          </animated.div>
          <ExpandIcon className="w-full text-3xl text-white sm:hidden" />
        </animated.button>
      ) : (
        <animated.div
          className="z-10 mx-[5%] flex flex-col gap-2 bg-slate-800 p-4 py-8 text-start shadow-md shadow-slate-800 sm:mx-16 sm:gap-8 sm:p-16 lg:mx-[15%]"
          style={fullWidthStyles}>
          <div className="mb-3 flex w-full flex-col items-center gap-4 px-4 text-white sm:mb-0 sm:flex-row sm:px-0">
            <div className="-mb-2 text-5xl sm:text-5xl">{icon}</div>
            <h3 className="text-center text-4xl sm:text-start sm:text-5xl">
              {title}
            </h3>
          </div>
          <p
            className="hidden text-xl leading-8 text-white sm:flex"
            dangerouslySetInnerHTML={{ __html: content }}></p>
          <ExpandIcon className="w-full text-3xl text-white sm:hidden" />
        </animated.div>
      )}
    </animated.article>
  );
};

export default SectionPanel;
