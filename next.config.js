/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["fr", "en", "vn", "ae"],
    defaultLocale: "fr",
  },
  output: "standalone",
};

module.exports = nextConfig;
