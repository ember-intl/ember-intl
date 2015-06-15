/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var broccoliCLDR = require('../../lib/locale-writer');
var Blueprint   = require('ember-cli/lib/models/blueprint');
var SilentError = require('ember-cli/lib/errors/silent');

module.exports = {
    description: 'Extract CLDR data as an ES6 module for a given locale',

    normalizeEntityName: function (localeName) {
        entityName = Blueprint.prototype.normalizeEntityName.apply(this, arguments);

        if (!broccoliCLDR.has(localeName)) {
            throw new SilentError('Aborting. `' + localeName + '` is not a know locale');
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
