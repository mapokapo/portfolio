/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
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
