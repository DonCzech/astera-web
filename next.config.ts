import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
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
      {
        source: "/:lang(en|ua)/e-shop",
        destination: "https://shop.asteralight.cz/:lang",
        permanent: true,
      },
      {
        source: "/:lang(en|ua)/shop",
        destination: "https://shop.asteralight.cz/:lang",
        permanent: true,
      },
      {
        source: "/cs/e-shop",
        destination: "https://shop.asteralight.cz",
        permanent: true,
      },
      {
        source: "/cs/shop",
        destination: "https://shop.asteralight.cz",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.asteralight.com",
      },
      {
        protocol: "https",
        hostname: "qmioor33ehuegiuc.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
