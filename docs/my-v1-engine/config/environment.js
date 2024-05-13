'use strict';

module.exports = function (environment) {
  return {
    environment,
    modulePrefix: require('../package').name,
  };
};
