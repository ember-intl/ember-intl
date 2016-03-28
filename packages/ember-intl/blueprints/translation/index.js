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

  beforeInstall: function(options) {
    var locale = options.args[1];

    if (!isSupportedLocale(locale)) {
      throw new Error(locale + ' is not a valid locale name.');
    }
  },

  locals: function (options) {
    var locale = options.args[1];

    return {
      locale: locale
    }
  }
};
