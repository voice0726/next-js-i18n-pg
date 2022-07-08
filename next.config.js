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
  basePath: '/app',
  assetPrefix: '/app',
});
