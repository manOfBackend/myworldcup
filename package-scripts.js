const path = require("path");

const webPath = path.resolve(__dirname, "apps/web");

const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web`,
      web: `yarn`,
      ci: {
        web: `npx turbo prune --scope=web && cd out && yarn install --frozen-lockfile`,
      },
    },
    build: {
      default: "npx turbo run build",
      ci: {
        web: "cd out && npm run build",
      },
    },
    dev: "npx turbo run dev",
  },
};