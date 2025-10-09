import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dnd5eapi.co',
      },
    ],
  },
};

export default nextConfig;
