import { useEffect, useState } from "react";

export const useScroll = (initialValue = 0) => {
  const [scrollPercentage, setScrollPercentage] = useState(initialValue);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPercentage(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPercentage;
};
