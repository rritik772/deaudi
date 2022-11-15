const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  env: {
    NFT_STORAGE_KEY: process.env.NFT_STORAGE_KEY,
    CONTRACTADDRESS: process.env.CONTRACTADDRESS,
    CONTRACTABI: process.env.CONTRACTABI
  }
}

module.exports = nextConfig
