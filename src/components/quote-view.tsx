"use client";

import { useEffect, useState } from "react";

import Quote from "@/lib/types/Quote";
import { mapRange } from "@/lib/utils";

export type QuoteViewProps = {
  quote: Quote;
};

const QuoteView: React.FC<QuoteViewProps> = ({ quote }) => {
  const [scrollPercentage, setScrollPercentage] = useState(100);

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

  return (
    <blockquote
      className="text-opacity-90 fixed top-8 left-1/2 w-max max-w-full -translate-x-1/2 rounded-lg p-4 text-center text-white"
      style={{
        opacity: mapRange(scrollPercentage, 0, 10, 1, 0),
      }}>
      &quot;{quote.text}&quot;
      <footer className="text-opacity-50 mr-1 text-end text-sm text-white">
        - {quote.author}
      </footer>
    </blockquote>
  );
};

export default QuoteView;
