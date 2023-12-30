/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.experiments.topLevelAwait = true
    return cfg
  },
}
