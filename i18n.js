const config = {
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: false,
  pages: {
    "*": ["common", "game", "languages", "notifications", "zones", "treasureGame"],
  },
}

module.exports = config
