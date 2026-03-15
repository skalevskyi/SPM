import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/ADmove',
  assetPrefix: '/ADmove/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
