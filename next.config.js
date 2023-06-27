/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  swcMinify: false,
  images: {
    domains: [
      "github.com",
      "raw.githubusercontent.com",
      "storage.googleapis.com",
      "localhost",
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
