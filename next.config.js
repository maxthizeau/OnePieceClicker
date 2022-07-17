/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const nextTranslate = require("next-translate")

module.exports = nextTranslate(nextConfig)
// module.exports = nextConfig
