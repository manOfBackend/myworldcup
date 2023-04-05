const path = require("path");

const webPath = path.resolve(__dirname, "apps/web");

const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web`,
      web: `pnpm`,
      ci: {
        web: `npx turbo prune --scope=web && cd out && pnpm install --no-frozen-lockfile`,
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