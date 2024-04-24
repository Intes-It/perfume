/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: [ "en", "vn"],
    defaultLocale: "en",
  },
  output: "standalone",
};

module.exports = nextConfig;
