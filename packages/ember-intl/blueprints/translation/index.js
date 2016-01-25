/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var isSupportedLocale = require('../../lib/utils/is-supported-locale');
var Blueprint = require('ember-cli/lib/models/blueprint');
var SilentError = require('silent-error');

module.exports = {
  description: 'Adds an empty translation file and locale is supported',

  normalizeEntityName: function (localeName) {
    entityName = Blueprint.prototype.normalizeEntityName.apply(this, arguments);

    if (!isSupportedLocale(localeName)) {
      throw new SilentError('Aborting. `' + localeName + '` is an unknown locale code');
    }

    return localeName;
  },

  locals: function (options) {
    var localeName = options.args[1];

    return {
      locale: localeName
    }
  }
};
