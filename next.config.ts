import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

// 번들 분석기 설정
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**', // 경로 패턴, 모든 이미지 허용
      },
    ],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
