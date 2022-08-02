/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SAVE_KEY: process.env.SAVE_KEY,
  },
}

const nextTranslate = require("next-translate")

module.exports = nextTranslate(nextConfig)
// module.exports = nextConfig
