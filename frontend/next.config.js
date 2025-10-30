/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*',
      },
    ];
  },
  // Add retry mechanism for API requests
  experimental: {
    proxyTimeout: 30000, // 30 seconds
  }
};

module.exports = nextConfig;
