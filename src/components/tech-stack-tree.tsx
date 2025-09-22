"use client";

import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import useMeasure from "react-use-measure";

export type TechStackTreeProps = {
  item: Item;
  parentExpandedOrIsRoot: boolean;
};

interface Item {
  description: string;
  items?: Item[];
  name: string;
}

const TechStackTree: React.FC<TechStackTreeProps> = ({
  item,
  parentExpandedOrIsRoot,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, bounds] = useMeasure();
  const itemsStyles = useSpring({
    config: {
      duration: 100,
    },
    height: isExpanded ? bounds.height : 0,
    opacity: isExpanded ? 1 : 0,
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
        className="mb-1 flex cursor-pointer flex-col gap-x-4 gap-y-2 overflow-visible px-3 py-2 pb-3 hover:backdrop-brightness-200 md:flex-row md:items-center"
        onClick={e => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
        tabIndex={parentExpandedOrIsRoot ? undefined : -1}>
        <div className="flex sm:items-end">
          {item.items !== undefined && (
            <animated.div style={arrowStyles}>
              <MdChevronRight
                className="text-2xl sm:text-4xl"
                color="#fff"
              />
            </animated.div>
          )}
          <span className="text-xl whitespace-nowrap text-white sm:text-3xl">
            {item.name}
          </span>
        </div>
        <span
          className={
            "text-md text-opacity-50 text-start break-words text-white sm:text-xl " +
            (item.items !== undefined ? "ml-4 sm:ml-2" : "")
          }>
          {item.description}
        </span>
      </LabelContainer>
      {item.items !== undefined && (
        <animated.div
          id={item.name}
          style={itemsStyles}>
          <ul
            className="ml-3 flex flex-col sm:ml-6 md:ml-12"
            ref={ref}
            style={{
              height: isExpanded ? "auto" : "0",
            }}>
            {item.items.map(e => (
              <TechStackTree
                item={e}
                key={e.name}
                parentExpandedOrIsRoot={isExpanded}
              />
            ))}
          </ul>
        </animated.div>
      )}
    </li>
  );
};

export default TechStackTree;
