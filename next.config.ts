import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Removed proxy to Render so that the local Neon database is used!
};

export default nextConfig;
