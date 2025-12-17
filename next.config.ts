import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: '?v=2',
      },
      {
        pathname: '/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'og.suzuri.jp',
        pathname: '/materials/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
