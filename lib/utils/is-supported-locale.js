/* eslint-env node */

'use strict';

function isSupportedLocale(locale) {
  if (!/^[a-zA-Z0-9-]+$/.test(locale)) {
    return false;
  }

  return true;
}

module.exports = isSupportedLocale;
