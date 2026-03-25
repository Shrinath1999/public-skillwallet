/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove output: 'export' to enable ISR and API routes
  basePath: process.env.NODE_ENV === 'production' ? '/public-skillwallet' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/public-skillwallet' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1h-prod-static-assets.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      pdfjs: 'pdfjs-dist/legacy/build/pdf',
    };
    return config;
  },
};

module.exports = nextConfig;
