/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments.topLevelAwait = true

    // Needed to parse tina markdown fields in api routes
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source",
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
      },
    ],
  },
}

export default nextConfig
