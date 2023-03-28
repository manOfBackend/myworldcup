/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "lib"],
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;