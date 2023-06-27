import { useState, useRef, useEffect, RefObject } from "react";
/**
 * Check if an element is in viewport
 * @param offset - Number of pixels up to the observable element from the top
 */
export default function useVisibility<T extends HTMLElement>(
  offset = 0
): [boolean, RefObject<T>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef<T>(null);

  const onScroll = () => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const top = currentElement.current.getBoundingClientRect().top;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  });

  return [isVisible, currentElement];
}
