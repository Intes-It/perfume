/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naturefeerique.fr",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/**",
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["en", "vn"],
    defaultLocale: "en",
  },
  output: "standalone",
};

module.exports = nextConfig;
