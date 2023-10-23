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
    domains: process.env.AN_APP_CONFIG_IMAGES_ALLOWEDDOMAINS
      ? process.env.AN_APP_CONFIG_IMAGES_ALLOWEDDOMAINS.split(',').map(p => {
        console.log("NUEVOOGER");
        console.log(p);
        console.log(process.env);
        return p;
      })
      : [],
  },
  output: 'standalone',
};
