/* jshint node: true */

'use strict';

module.exports = function(locale) {
  if (!/^[a-zA-Z0-9-]+$/.test(locale)) {
    return false;
  }

  return true;
};
