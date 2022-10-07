import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import useMeasure from "react-use-measure";

type Props = {
  icon: React.ReactNode;
  title: string;
  content: string;
};
const SectionPanel: React.FC<Props> = ({ icon, title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const styles = useSpring({
    to: {
      height: expanded ? bounds.height : 0,
    },
  });
  return (
    <article>
      <button
        className="bg-slate-800 z-10 flex shadow-md text-center sm:text-start shadow-slate-800 flex-col p-8 gap-4 sm:gap-8 sm:p-16 mx-4 sm:mx-16"
        onClick={() => setExpanded(!expanded)}>
        <div className="flex gap-4 flex-col sm:flex-row items-center w-full text-white">
          <div className="text-7xl -mb-2 sm:text-5xl">{icon}</div>
          <h3 className="text-5xl">{title}</h3>
        </div>
        <animated.div
          style={styles}
          className="overflow-hidden sm:hidden">
          <p
            ref={ref}
            className="text-white text-2xl">
            {content}
          </p>
        </animated.div>
        <p className="text-white hidden sm:flex text-2xl">{content}</p>
        <MdExpandMore className="text-3xl text-white sm:hidden w-full" />
      </button>
    </article>
  );
};

export default SectionPanel;
