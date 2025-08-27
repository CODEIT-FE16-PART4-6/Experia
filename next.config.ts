import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    config.module?.rules?.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // 이미지 허용 (해당 도메인)

  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
