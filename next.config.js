module.exports = {
  webpack: (cfg) => {
    cfg.experiments.topLevelAwait = true
    return cfg
  },
}
