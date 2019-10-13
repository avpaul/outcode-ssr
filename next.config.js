const withSass = require('@zeit/next-sass');
const ENV = require('dotenv');

ENV.config();

const withENV = () => {
  const serverRuntimeConfig = {};
  const publicRuntimeConfig = {
    API_URL: process.env.APP_API_URL,
    COULDINARY_PRESET: process.env.APP_COULDINARY_PRESET,
    ENVIRONMENT: process.env.APP_ENVIRONMENT,
    APP_CSP:
      process.env.APP_ENVIRONMENT === 'production'
        ? process.env.APP_CSP
        : process.env.APP_CSP_DEV
  };
  return { serverRuntimeConfig, publicRuntimeConfig };
};

module.exports = withSass(withENV());
