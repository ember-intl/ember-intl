'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

const SilentError = require('silent-error');
const isSupportedLocale = require('../../lib/utils/is-supported-locale');

module.exports = {
  description: 'Adds an empty translation file and locale is supported',

  normalizeEntityName(locale) {
    if (!locale) {
      throw new SilentError('[ember-intl] no locale provided. Usage: `ember g translation en-us`');
    }

    return locale.toLowerCase();
  },

  beforeInstall(options) {
    var locale = options.entity.name;

    if (!isSupportedLocale(locale.toLowerCase())) {
      this.ui.writeLine(
        'Full list of supported locales: https://github.com/ember-intl/ember-intl/blob/master/docs/list-of-supported-locales.md'
      );
      throw new SilentError(`[ember-intl] Invalid locale: ${locale}`);
    }
  },

  fileMapTokens() {
    return {
      __name__(options) {
        return options.dasherizedModuleName;
      }
    };
  }
};
