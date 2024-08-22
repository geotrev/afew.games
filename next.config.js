/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (cfg) => {
    cfg.experiments.topLevelAwait = true
    return cfg
  },
}
