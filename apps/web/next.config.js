/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hgpt/ui", "@hgpt/styles", "@hgpt/lib", "@hgpt/store"],
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  }
};

if (process.env.DOCKER) {
  nextConfig.output = 'standalone'
}

module.exports = nextConfig;