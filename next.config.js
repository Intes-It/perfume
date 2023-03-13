/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  rewrites: async () => {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      // },
      // {
      //   source: "/payment/:path*",
      //   destination: `${process.env.NEXT_PUBLIC_API_URL}/payment/:path*`,
      // },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
