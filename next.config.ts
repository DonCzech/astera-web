import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/e-shop",
        destination: "https://shop.asteralight.cz",
        permanent: true,
      },
      {
        source: "/shop",
        destination: "https://shop.asteralight.cz",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.asteralight.com",
      },
    ],
  },
};

export default nextConfig;
