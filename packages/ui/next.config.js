/** @type {import('next').NextConfig} */
const nextConfig = {
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
