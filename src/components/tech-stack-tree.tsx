"use client";

import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import useMeasure from "react-use-measure";

interface Item {
  name: string;
  description: string;
  items?: Item[];
}

export type TechStackTreeProps = {
  item: Item;
  parentExpandedOrIsRoot: boolean;
};

const TechStackTree: React.FC<TechStackTreeProps> = ({
  item,
  parentExpandedOrIsRoot,
}) => {
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
        className="mb-1 flex cursor-pointer flex-col gap-x-4 gap-y-2 overflow-visible px-3 py-2 pb-3 hover:backdrop-brightness-200 md:flex-row md:items-center">
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
          style={itemsStyles}
          id={item.name}>
          <ul
            style={{
              height: isExpanded ? "auto" : "0",
            }}
            ref={ref}
            className="ml-3 flex flex-col sm:ml-6 md:ml-12">
            {item.items.map(e => (
              <TechStackTree
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

export default TechStackTree;
