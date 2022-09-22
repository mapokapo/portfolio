/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ["github.com", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
