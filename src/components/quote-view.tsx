"use client";

import { useScroll } from "@/lib/hooks/useScroll";
import Quote from "@/lib/types/Quote";
import { mapRange } from "@/lib/utils";

export type QuoteViewProps = {
  quote: Quote;
};

const QuoteView: React.FC<QuoteViewProps> = ({ quote }) => {
  const scrollPercentage = useScroll(100);

  return (
    <blockquote
      className="text-opacity-90 fixed top-8 left-1/2 w-2/3 -translate-x-1/2 rounded-lg p-4 text-center text-sm text-white/90 sm:text-base sm:text-white"
      style={{
        opacity: mapRange(scrollPercentage, 0, 10, 1, 0),
      }}>
      &quot;{quote.text}&quot;
      <footer className="text-sm text-white/75">{quote.author}</footer>
    </blockquote>
  );
};

export default QuoteView;
