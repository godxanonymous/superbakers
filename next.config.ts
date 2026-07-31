import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'dist',
  serverExternalPackages: ['firebase-admin'],
};

export default nextConfig;
