const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (cfg) => {
    cfg.experiments.topLevelAwait = true
    return cfg
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
}
