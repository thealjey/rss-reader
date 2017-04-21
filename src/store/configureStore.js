/* @flow */

/* eslint-disable no-process-env */
/* eslint-disable global-require */

if ('production' === process.env.NODE_ENV) {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
