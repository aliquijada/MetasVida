/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      net: false,
      tls: false,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig; // ✅ CommonJS (Correcto para next.config.js)
