/** @type {import('next').NextConfig} */

const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  env: {
    NFT_STORAGE_KEY: process.env.NFT_STORAGE_KEY,
    TRACKSCONTRACTADDRESS: process.env.TRACKSCONTRACTADDRESS,
    PROFILECONTRACTADDRESS: process.env.PROFILECONTRACTADDRESS,
  }
}

module.exports = nextConfig
