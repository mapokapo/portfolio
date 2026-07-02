import { useEffect, useState } from "react";

import type Quote from "@/lib/types/Quote";

import { mapRange, randomChoice } from "@/lib/utils";

interface QuoteViewProps {
  initialQuote: Quote;
  quotes: Quote[];
}

export default function QuoteView({ initialQuote, quotes }: QuoteViewProps) {
  const [quote, setQuote] = useState(initialQuote);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.body.scrollHeight - window.innerHeight;
      setScrollPercentage(
        scrollableHeight <= 0 ? 0 : (window.scrollY / scrollableHeight) * 100
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQuote(randomChoice(quotes));
    }, 60_000);

    return () => { window.clearInterval(interval); };
  }, [quotes]);

  return (
    <blockquote
      className="pointer-events-none fixed top-8 left-1/2 w-2/3 -translate-x-1/2 rounded-lg p-4 text-center text-sm text-white/90 sm:text-base sm:text-white"
      style={{
        opacity: mapRange(scrollPercentage, 0, 10, 1, 0),
      }}>
      &quot;{quote.text}&quot;
      <footer className="text-sm text-white/75">{quote.author}</footer>
    </blockquote>
  );
}
