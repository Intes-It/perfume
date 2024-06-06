/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: ["mldn3w3pos1n.i.optimole.com"],
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
