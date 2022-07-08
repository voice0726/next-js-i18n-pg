/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

module.exports = nextTranslate({
  reactStrictMode: true,
  assetPrefix: '/nextjs-internal',
  async rewrites() {
    return {
      fallback: [
        {
          source: '/nextjs-internal/api/:path*',
          destination: '/api/:path*',
        },
      ],
      beforeFiles: [
        {
          source: '/nextjs-internal/_next/:path*',
          destination: '/_next/:path*',
        },
      ],
    };
  },
});
