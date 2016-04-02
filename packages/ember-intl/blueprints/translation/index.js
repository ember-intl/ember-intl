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

  normalizeEntityName: function(locale) {
    if (!locale) {
      throw new SilentError('[ember-intl] no locale argument provided. Usage: `ember g translation en-us`');
    }

    return locale.toLowerCase();
  },

  beforeInstall: function(options) {
    var locale = options.entity.name;

    if (!isSupportedLocale(locale.toLowerCase())) {
      this.ui.writeLine('Full list of supported locales: https://github.com/jasonmit/ember-intl/wiki/Supported-Locales');
      throw new SilentError('[ember-intl] Invalid locale: ' + locale);
    }
  },

  fileMapTokens: function() {
    return {
      __name__: function(options) {
        return options.dasherizedModuleName
      }
    }
  }
};
