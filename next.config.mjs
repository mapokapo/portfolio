import NextBundleAnalyzer from "@next/bundle-analyzer";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    qualities: [50, 75, 100],
    remotePatterns: [
      {
        hostname: "storage.googleapis.com",
        pathname: "/**/*",
        port: "",
        protocol: "https",
      },
    ],
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
