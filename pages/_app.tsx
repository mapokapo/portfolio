import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined")
      fetch("/api/pageView", {
        method: "GET",
      });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Leo Petrovic | My Portfolio</title>
        <meta
          name="google-site-verification"
          content="9_qEiY98Q8uHDB5H293-c3ixYEp9bDIEwqcfjvEJbPU"
        />
        <meta
          name="description"
          content="Leo's personal portfolio website"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          property="og:title"
          content="Leo Petrovic"
        />
        <meta
          property="og:type"
          content="profile"
        />
        <meta
          property="og:url"
          content="https://leopetrovic.vercel.app"
        />
        <meta
          property="og:image"
          content="/assets/images/image.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/assets/images/icons/icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/assets/images/icons/icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/assets/images/icons/icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/images/icons/icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/assets/images/icons/icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/images/icons/icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/images/icons/icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/images/icons/icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/icons/icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/images/icons/icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/images/icons/icon-96x96.png"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon.ico"
        />
        <link
          rel="shortcut icon"
          href="favicon.ico"
          type="image/x-icon"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <meta
          name="theme-color"
          content="#2563eb"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
