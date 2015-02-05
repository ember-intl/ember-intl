/* jshint node: true */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var Filter      = require('broccoli-filter');
var serialize   = require('serialize-javascript');
var path        = require('path');
var extractor   = require('./lib/extract');
var SilentError = require('ember-cli/lib/errors/silent');

var messageFormatPath  = path.dirname(require.resolve('intl-messageformat'));
var relativeFormatPath = path.dirname(require.resolve('intl-relativeformat'));
var intlPath           = path.dirname(require.resolve('intl'));

function normalize (localeName) {
    return localeName.toLowerCase().replace('-', '_');
}

function extract (locale, settings) {
    var data = { locale: locale };

    if (settings.plurals) {
        var pluralRuleFunction = extractor.pluralRuleFunction(normalize(locale));

        if (pluralRuleFunction) {
            data.pluralRuleFunction = pluralRuleFunction;
        } else {
            return null;
        }
    }

    if (settings.fields) {
        var fields = extractor.fields(normalize(locale), settings.fields);
        if (fields && Object.keys(fields).length) {
            data.fields = fields;
        } else {
            return null;
        }
    }

    return data;
}

function LocaleProcessor (inputTree) {
    if (!(this instanceof LocaleProcessor)) {
        return new LocaleProcessor(inputTree);
    }

    Filter.call(this, inputTree);
    this.extensions = ['js'];
}

LocaleProcessor.prototype = Object.create(Filter.prototype);
LocaleProcessor.prototype.constructor = LocaleProcessor;

LocaleProcessor.prototype.transform = function (localeName, fields, pluralFn) {
    return ['export default {',
    '    locale: "' + localeName + '",',
    '    fields: ' + serialize(fields) + ',',
    '    pluralRuleFunction: ' + serialize(pluralFn),
    '};'].join('\n');
}

LocaleProcessor.prototype.processString = function (inputString, filename) {
    var localeName = path.basename(filename, path.extname(filename));

    if (!isValidLocale(localeName)) {
        throw new SilentError('Aborting. `' + localeName + '` is not a know locale code');
    }

    var cldr = extract(localeName, {
        plurals: true,
        fields:  ['year', 'month', 'day', 'hour', 'minute', 'second']
    });

    return this.transform(localeName, cldr.fields, cldr.pluralRuleFunction);
}

module.exports = {
    name: 'ember-intl',

    included: function (app) {
        this.app = app;
        app.import('vendor/messageformat/intl-messageformat.js');
        app.import('vendor/relativeformat/intl-relativeformat.js');
    },

    treeForApp: function (tree) {
        var workingTree = tree;

        var localeTree = new this.Funnel('app/locales', {
            destDir: 'cldrs'
        });

        return this.mergeTrees([new LocaleProcessor(localeTree), workingTree], { overwrite: true });
    },

    treeForVendor: function (tree) {
        var trees = [];

        if (tree) {
            trees.push(tree);
        }

        trees.push(this.pickFiles(this.treeGenerator(messageFormatPath), {
            srcDir:  '/dist',
            destDir: 'messageformat'
        }));

        trees.push(this.pickFiles(this.treeGenerator(relativeFormatPath), {
            srcDir:  '/dist',
            destDir: 'relativeformat'
        }));

        return this.mergeTrees(trees);
    },

    treeForPublic: function (tree) {
        var app    = this.app;
        var config = this.project.config(app.env);
        var trees  = [tree];

        trees.push(this.pickFiles(intlPath, {
            srcDir:  '/',
            files:   ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
            destDir: '/assets/intl/polyfill/'
        }));

        // only use these when using Intl.js, should not be used
        // with the native Intl API
        trees.push(this.pickFiles(intlPath + '/locale-data/jsonp', {
            srcDir:  '/',
            files:   ['*.js'],
            destDir: '/assets/intl/polyfill/locales/'
        }));

        return this.mergeTrees(trees, { overwrite: true });
    }
};
