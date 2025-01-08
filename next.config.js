const { i18n } = require('./next-i18next.config');

module.exports = {
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false;
    // To avoid issues with google-auth-library (which should be used only on SERVER side!)
    config.resolve.fallback = {
      fs: false,
      child_process: false,
      net: false,
      tls: false,
    };
    return config;
  },

  i18n,
  images: {
    domains: ['34.49.93.68', 'storage.googleapis.com', 'i.ytimg.com', 'googleusercontent.com', 'localhost', 'gateway'], // 34.49.93.68 is the CDN (load balancer) for the Storage Bucket
  },
  output: 'standalone',
};
