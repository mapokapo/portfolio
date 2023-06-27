import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import useMeasure from "react-use-measure";

interface Item {
  name: string;
  description: string;
  items?: Item[];
}

type Props = {
  item: Item;
};
const TreeRenderer: React.FC<Props> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const itemsStyles = useSpring({
    height: isExpanded ? bounds.height : 0,
    opacity: isExpanded ? 1 : 0,
    config: {
      duration: 100,
    },
  });
  const arrowStyles = useSpring({
    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
  });
  // An end node (item without children) shouldn't be a button for a11y purposes
  const LabelContainer = item.items === undefined ? "div" : "button";

  return (
    <li
      className={
        "flex flex-col overflow-hidden " +
        (item.items !== undefined ? "" : "ml-8")
      }>
      <LabelContainer
        aria-expanded={isExpanded}
        aria-controls={item.name}
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="flex flex-col md:flex-row gap-x-4 gap-y-2 px-3 mb-1 py-2 pb-3 md:items-center hover:backdrop-brightness-200 cursor-pointer overflow-visible">
        <div className="flex items-end">
          {item.items !== undefined && (
            <animated.div style={arrowStyles}>
              <MdChevronRight
                className="sm:text-4xl text-3xl"
                color="#fff"
              />
            </animated.div>
          )}
          <span className="sm:text-3xl text-2xl whitespace-nowrap text-white">
            {item.name}
          </span>
        </div>
        <span
          className={
            "sm:text-xl text-lg break-words text-start text-white text-opacity-50 " +
            (item.items !== undefined ? "sm:ml-2 ml-4" : "")
          }>
          {item.description}
        </span>
      </LabelContainer>
      {item.items !== undefined && (
        <animated.div
          style={itemsStyles}
          id={item.name}>
          <ul
            style={{ display: isExpanded ? "flex" : "none" }}
            ref={ref}
            className={"flex flex-col md:ml-12 sm:ml-6 ml-3"}>
            {item.items.map(e => (
              <TreeRenderer
                key={e.name}
                item={e}
              />
            ))}
          </ul>
        </animated.div>
      )}
    </li>
  );
};

export default TreeRenderer;
