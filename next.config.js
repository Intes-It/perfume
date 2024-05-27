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
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: `http://171.244.64.245:8010/api/:path*/`,
      },
    ];
  },
};

module.exports = nextConfig;
