const path = require("path")

module.exports = {
  webpack: (cfg) => {
    cfg.experiments.topLevelAwait = true
    return cfg
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
}
