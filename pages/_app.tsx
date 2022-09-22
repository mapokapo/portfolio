import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined")
      fetch("/api/pageView", {
        method: "GET",
      });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
