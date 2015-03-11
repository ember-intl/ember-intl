/* jshint node: true */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var serialize    = require('serialize-javascript');
var Funnel       = require('broccoli-funnel');
var walkSync     = require('walk-sync');
var path         = require('path');
var fs           = require('fs');

var LocaleWriter = require('./lib/broccoli-cldr');

var relativeFormatPath = path.dirname(require.resolve('intl-relativeformat'));
var messageFormatPath  = path.dirname(require.resolve('intl-messageformat'));
var intlPath           = path.dirname(require.resolve('intl'));

module.exports = {
    name: 'ember-intl',

    included: function (app) {
        this.app = app;
        var vendorPath = this.treePaths.vendor;
        app.import(vendorPath + '/messageformat/intl-messageformat.js');
        app.import(vendorPath + '/relativeformat/intl-relativeformat.js');
    },

    treeForApp: function (inputTree) {
        var appPath = this.treePaths.app;
        var localesPath = path.join(this.project.root, appPath, 'locales');
        var trees = [inputTree];

        if (fs.existsSync(localesPath)) {
            var locales = walkSync(localesPath).map(function (filename) {
                return path.basename(filename, path.extname(filename));
            }).filter(LocaleWriter.hasCLDR);

            var localeTree = new LocaleWriter(inputTree, 'cldrs', {
                locales:        locales,
                pluralRules:    true,
                relativeFields: true,
                wrapEntry:      this._transformLocale
            });

            trees.push(localeTree)
        }

        return this.mergeTrees(trees, { overwrite: true });
    },

    treeForVendor: function (inputTree) {
        var trees = [];

        if (inputTree) {
            trees.push(inputTree);
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

    treeForPublic: function (inputTree) {
        var config = this.project.config(this.app.env);
        var trees  = [inputTree];

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
    },

    _transformLocale: function (locale, result) {
        var data = ['/*jslint eqeq: true*/', 'export default {'];

        data.push('  locale: "' + locale + '",');

        if (result.parentLocale) {
            data.push('  parentLocale: "' + result.parentLocale + '",');
        }

        if (result.fields) {
            data.push('  fields: ' + serialize(result.fields) + ',');
        }

        if (result.pluralFn) {
            data.push('  pluralRuleFunction: ' + serialize(result.pluralFn) + ',');
        }

        var lastObject = data[data.length - 1];
        var pos = lastObject.lastIndexOf(',');
        data[data.length - 1] = lastObject.substr(0, pos);
        data.push('};');
        return data.join('\n');
    }
};
