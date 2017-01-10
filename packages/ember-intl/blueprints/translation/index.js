'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var SilentError = require('silent-error');
var Blueprint = require('ember-cli/lib/models/blueprint');

var isSupportedLocale = require('../../lib/utils/is-supported-locale');

module.exports = {
  description: 'Adds an empty translation file and locale is supported',

  normalizeEntityName(locale) {
    if (!locale) {
      throw new SilentError('[ember-intl] no locale argument provided. Usage: `ember g translation en-us`');
    }

    return locale.toLowerCase();
  },

  beforeInstall(options) {
    var locale = options.entity.name;

    if (!isSupportedLocale(locale.toLowerCase())) {
      this.ui.writeLine('Full list of supported locales: https://github.com/jasonmit/ember-intl/blob/master/docs/list-of-supported-locales.md');
      throw new SilentError('[ember-intl] Invalid locale: ' + locale);
    }
  },

  fileMapTokens() {
    return {
      __name__(options) {
        return options.dasherizedModuleName
      }
    }
  }
};
