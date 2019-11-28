const withSass = require('@zeit/next-sass');
const ENV = require('dotenv');

ENV.config();

const env = {
  APP_API_URL: process.env.APP_API_URL,
  APP_COULDINARY_PRESET: process.env.APP_COULDINARY_PRESET,
  ENVIRONMENT: process.env.APP_ENVIRONMENT,
  APP_CSP:
    process.env.APP_ENVIRONMENT === 'production'
      ? process.env.APP_CSP
      : process.env.APP_CSP_DEV
};

module.exports = withSass({ env });
