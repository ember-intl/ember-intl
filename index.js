/* jshint node: true */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var serialize = require('serialize-javascript');
var Funnel = require('broccoli-funnel');
var WatchedDir = require('broccoli-source').WatchedDir;
var UnwatchedDir = require('broccoli-source').UnwatchedDir;
var existsSync = require('exists-sync');
var stew = require('broccoli-stew');
var walkSync = require('walk-sync');
var path = require('path');
var fs = require('fs');

var utils = require('./lib/utils');
var mergeTrees = require('./lib/broccoli/merge-trees');
var CldrWriter = require('./lib/broccoli/cldr-writer');
var lowercaseTree = require('./lib/broccoli/lowercase-tree');
var TranslationPreprocessor = require('./lib/broccoli/translation-preprocessor');

function generateOptions(app) {
    var addonConfig = app.project.config(app.env)['intl'] || {};

    var options = utils.assign({
        locales: undefined,
        disablePolyfill: false,
        defaultLocale: 'en-us',
        allowEmpty: true,
        inputPath: 'translations',
        outputPath: 'translations'
    }, addonConfig);

    if (options.locales) {
        options.locales = utils.makeArray(options.locales).filter(function(locale) {
            return typeof locale === 'string';
        }).map(function(locale) {
            return locale.toLocaleLowerCase();
        });
    }

    return options;
};

module.exports = {
    name: 'ember-intl',

    included: function(app) {
        this._super.included.apply(this, arguments);

        if (!this.app) {
            this.app = app;
        }

        this.addonOptions = generateOptions(app);
        this.locales = this._discoverLocales();

        this.trees = {
            translations: new WatchedDir(this.addonOptions.inputPath),
            intl: new UnwatchedDir(path.dirname(require.resolve('intl')))
        };
    },

    treeForAddon: function(tree) {
        if (utils.isModern(this)) {
            tree = stew.rm(tree, path.join('helpers', 'intl-get-legacy.js'), path.join('helpers', '-base-legacy.js'));
        } else {
            tree = stew.rm(tree, path.join('initializers', 'ember-intl.js'), path.join('helpers', 'intl-get.js'), path.join('helpers', '-base.js'));
            [
                { from: path.join('initializers', 'ember-intl-legacy.js'), to: path.join('initializers', 'ember-intl.js') },
                { from: path.join('helpers', 'intl-get-legacy.js'), to: path.join('helpers', 'intl-get.js') },
                { from: path.join('helpers', '-base-legacy.js'), to: path.join('helpers', '-base.js') }
            ].forEach(function(move) {
                tree = stew.mv(tree, move.from, move.to);
            });
        }

        return this._super.treeForAddon.call(this, tree);
    },

    treeForApp: function(tree) {
        if (utils.isModern(this)) {
            tree = stew.rm(tree, path.join('initializers', 'ember-intl-legacy.js'));
        } else {
            tree = stew.rm(tree, path.join('initializers', 'ember-intl.js'));
            tree = stew.mv(tree, path.join('initializers', 'ember-intl-legacy.js'), path.join('initializers', 'ember-intl.js'));
        }

        var trees = [tree, new TranslationPreprocessor(this.trees.translations, this.addonOptions)];

        if (tree && this.locales.length) {
            trees.push(new CldrWriter([tree], {
                path: './cldrs',
                locales: this.locales,
                pluralRules: true,
                relativeFields: true,
                prelude: '/*jslint eqeq: true*/\n',
                wrapEntry: function wrapEntry(result) {
                    return 'export default ' + serialize(result) + ';';
                }
            }));
        }

        return mergeTrees(trees, {
            overwrite: true,
            annotation: 'TreeMerger (CLDR)'
        });
    },

    treeForPublic: function() {
        var publicTree = this._super.treeForPublic.apply(this, arguments);

        if (this.addonOptions.disablePolyfill) {
            return publicTree;
        }

        var intlPath = path.dirname(require.resolve('intl'));
        var assetPath = path.join('assets', 'intl');
        var appOptions = this.app.options;
        var trees = [];

        if (appOptions.app && appOptions.app.intl) {
            assetPath = appOptions.app.intl;
        }

        if (publicTree) {
            trees.push(publicTree);
        }

        trees.push(lowercaseTree(new Funnel(this.trees.intl, {
            srcDir: 'dist',
            files: ['Intl.complete.js', 'Intl.js', 'Intl.js.map', 'Intl.min.js'],
            destDir: path.join(assetPath)
        })));

        var localeFunnel = {
            srcDir: path.join('locale-data', 'jsonp'),
            destDir: path.join(assetPath, 'locales')
        };

        if (this.locales.length) {
            localeFunnel.include = this.locales.map(function(locale) {
                return new RegExp(locale, 'i');
            });
        }

        trees.push(lowercaseTree(new Funnel(this.trees.intl, localeFunnel)));

        return mergeTrees(trees, {
            overwrite: true,
            annotation: 'TreeMerger (Intl.js)'
        });
    },

    _discoverLocales: function() {
        var translations = path.join(this.project.root, this.addonOptions.inputPath);
        var locales = [];

        if (existsSync(translations)) {
            locales = walkSync(translations).map(function(filename) {
                return path.basename(filename, path.extname(filename));
            }).filter(function(locale) {
                return CldrWriter.has(locale);
            });
        }

        if (this.addonOptions.locales) {
            locales = locales.concat(this.addonOptions.locales);
        }

        return utils.uniqueByString(locales);
    }
};
