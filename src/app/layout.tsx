import { Metadata, Viewport } from "next";

import "./globals.css";
import { ReportView } from "@/components/report-view";

export const viewport: Viewport = {
  initialScale: 1,
  themeColor: "#2563eb",
  width: "device-width",
};

export const metadata: Metadata = {
  description: "Leo's personal portfolio website",
  icons: {
    apple: [
      { sizes: "57x57", url: "/assets/images/icons/icon-57x57.png" },
      { sizes: "60x60", url: "/assets/images/icons/icon-60x60.png" },
      { sizes: "72x72", url: "/assets/images/icons/icon-72x72.png" },
      { sizes: "76x76", url: "/assets/images/icons/icon-76x76.png" },
      { sizes: "114x114", url: "/assets/images/icons/icon-114x114.png" },
      { sizes: "120x120", url: "/assets/images/icons/icon-120x120.png" },
      { sizes: "144x144", url: "/assets/images/icons/icon-144x144.png" },
      { sizes: "152x152", url: "/assets/images/icons/icon-152x152.png" },
      { sizes: "180x180", url: "/assets/images/icons/icon-180x180.png" },
    ],
    icon: [
      { sizes: "16x16", type: "image/x-icon", url: "/favicon.ico" },
      {
        sizes: "96x96",
        type: "image/png",
        url: "/assets/images/icons/icon-96x96.png",
      },
      {
        sizes: "192x192",
        type: "image/png",
        url: "/assets/images/icons/icon-192x192.png",
      },
    ],
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://leopetrovic.vercel.app"),
  openGraph: {
    images: [
      {
        alt: "Leo's Portfolio",
        height: 600,
        type: "image/png",
        url: "/assets/images/image.png",
        width: 800,
      },
      {
        alt: "Leo's Portfolio",
        height: 512,
        type: "image/png",
        url: "/assets/images/logo.png",
        width: 512,
      },
    ],
    title: "Leo's Portfolio",
    type: "website",
    url: "https://leopetrovic.vercel.app",
  },
  title: {
    default: "Home | Leo's Portfolio",
    template: "%s | Leo's Portfolio",
  },
  verification: {
    google: "9_qEiY98Q8uHDB5H293-c3ixYEp9bDIEwqcfjvEJbPU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <ReportView />
    </html>
  );
}
