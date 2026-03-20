import type { NextConfig } from 'next';

/** GitHub Pages project path segment (…github.io + REPO_PATH + /), must match repo name. */
const REPO_PATH = '/SPM';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? REPO_PATH : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? REPO_PATH : '',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
