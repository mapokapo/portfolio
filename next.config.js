/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: false,
  images: {
    domains: ["github.com", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
