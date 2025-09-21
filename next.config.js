/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['media.elrond.com', 'gateway.elrond.com'],
  },
  env: {
    NEXT_PUBLIC_MULTIVERSX_API: process.env.NEXT_PUBLIC_MULTIVERSX_API || 'https://api.multiversx.com',
    NEXT_PUBLIC_MULTIVERSX_GATEWAY: process.env.NEXT_PUBLIC_MULTIVERSX_GATEWAY || 'https://gateway.multiversx.com',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
