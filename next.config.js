const { i18n } = require('./next-i18next.config');

module.exports = {
  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false;
    return config;
  },
  i18n,
  images: {
    domains: (process.env.AN_FRONT_CONFIG_IMAGES_ALLOWEDDOMAINS ? process.env.AN_FRONT_CONFIG_IMAGES_ALLOWEDDOMAINS.split(',') : []),
  },
  output: 'standalone',
};
