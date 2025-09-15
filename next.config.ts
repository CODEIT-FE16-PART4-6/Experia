import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Next.js 15+ 최적화 설정
  experimental: {
    // React Compiler 비활성화 (안정성을 위해)
    reactCompiler: false,
    // 더 나은 번들링을 위한 설정
    optimizePackageImports: ['@tanstack/react-query', 'zustand', 'clsx'],
    serverActions: {},
  },

  // 캐싱 최적화
  cacheHandler: undefined, // 기본 캐시 핸들러 사용
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
