module.exports = {
  webpack: (cfg) => {
    cfg.experiments.topLevelAwait = true
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    })
    return cfg
  },
}
