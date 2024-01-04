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
  parentExpandedOrIsRoot: boolean;
};
const TreeRenderer: React.FC<Props> = ({ item, parentExpandedOrIsRoot }) => {
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
        tabIndex={parentExpandedOrIsRoot ? undefined : -1}
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        className="flex flex-col md:flex-row gap-x-4 gap-y-2 px-3 mb-1 py-2 pb-3 md:items-center hover:backdrop-brightness-200 cursor-pointer overflow-visible">
        <div className="flex sm:items-end">
          {item.items !== undefined && (
            <animated.div style={arrowStyles}>
              <MdChevronRight
                className="sm:text-4xl text-2xl"
                color="#fff"
              />
            </animated.div>
          )}
          <span className="sm:text-3xl text-xl whitespace-nowrap text-white">
            {item.name}
          </span>
        </div>
        <span
          className={
            "sm:text-xl text-md break-words text-start text-white text-opacity-50 " +
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
            style={{
              height: isExpanded ? "auto" : "0",
            }}
            ref={ref}
            className="flex flex-col md:ml-12 sm:ml-6 ml-3">
            {item.items.map(e => (
              <TreeRenderer
                key={e.name}
                item={e}
                parentExpandedOrIsRoot={isExpanded}
              />
            ))}
          </ul>
        </animated.div>
      )}
    </li>
  );
};

export default TreeRenderer;
