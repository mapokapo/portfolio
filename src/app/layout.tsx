import { Metadata, Viewport } from "next";
import "./globals.css";
import { ReportView } from "@/components/report-view";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Leo's Portfolio",
    default: "Home | Leo's Portfolio",
  },
  description: "Leo's personal portfolio website",
  metadataBase: new URL("https://leopetrovic.vercel.app"),
  verification: {
    google: "9_qEiY98Q8uHDB5H293-c3ixYEp9bDIEwqcfjvEJbPU",
  },
  openGraph: {
    title: "Leo's Portfolio",
    type: "website",
    url: "https://leopetrovic.vercel.app",
    images: [
      {
        url: "/assets/images/image.png",
        width: 800,
        height: 600,
        alt: "Leo's Portfolio",
        type: "image/png",
      },
      {
        url: "/assets/images/logo.png",
        width: 512,
        height: 512,
        alt: "Leo's Portfolio",
        type: "image/png",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16" },
      {
        url: "/assets/images/icons/icon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/assets/images/icons/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: [
      { url: "/assets/images/icons/icon-57x57.png", sizes: "57x57" },
      { url: "/assets/images/icons/icon-60x60.png", sizes: "60x60" },
      { url: "/assets/images/icons/icon-72x72.png", sizes: "72x72" },
      { url: "/assets/images/icons/icon-76x76.png", sizes: "76x76" },
      { url: "/assets/images/icons/icon-114x114.png", sizes: "114x114" },
      { url: "/assets/images/icons/icon-120x120.png", sizes: "120x120" },
      { url: "/assets/images/icons/icon-144x144.png", sizes: "144x144" },
      { url: "/assets/images/icons/icon-152x152.png", sizes: "152x152" },
      { url: "/assets/images/icons/icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
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
