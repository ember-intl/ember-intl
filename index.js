/* jshint node: true */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var serialize = require('serialize-javascript');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var stew = require('broccoli-stew');
var walkSync = require('walk-sync');
var path = require('path');
var fs = require('fs');
var utils = require('./lib/utils');
var LocaleWriter = require('./lib/locale-writer');
var TranslationPreprocessor = require('./lib/translation-preprocessor');

function intlOptions(instance) {
    var projectConfig = instance.project.config(process.env.EMBER_ENV);

    var options = utils.assign({
        locales: undefined,
        disablePolyfill: false,
        defaultLocale: 'en-us',
        inputPath: 'translations',
        outputPath: path.join(projectConfig.modulePrefix, 'translations')
    }, projectConfig.intl);

    if (options.locales) {
        options.locales = utils.makeArray(options.locales).filter(function(locale) {
            return typeof locale === 'string';
        }).map(function(locale) {
            return locale.toLocaleLowerCase();
        });
    }

    return options;
};

function localesByTranslations(instance) {
    var translations = path.join(instance.project.root, instance.intlOptions.inputPath);
    var locales = [];

    if (fs.existsSync(translations)) {
        locales = walkSync(translations).map(function(filename) {
            return path.basename(filename, path.extname(filename));
        }).filter(function(locale) {
            return LocaleWriter.has(locale);
        });
    }

    if (instance.intlOptions.locales) {
        locales = locales.concat(instance.intlOptions.locales);
    }

    return utils.uniqueByString(locales);
};

module.exports = {
    name: 'ember-intl',

    included: function() {
        this._super.included.apply(this, arguments);

        this.intlOptions = intlOptions(this);
        this.locales = localesByTranslations(this);
    },

    setupPreprocessorRegistry: function(type, registry) {
        var options = intlOptions(this);

        registry.add('js', {
            name: 'translations',
            ext: 'js',
            toTree: function(tree) {
                var translations = new Funnel(options.inputPath, {
                    allowEmpty: true
                });

                return mergeTrees([
                    tree,
                    TranslationPreprocessor(translations, options)
                ]);
            }
        });
    },

    treeForAddon: function(tree) {
        if (utils.isModern(this)) {
            tree = stew.rm(tree, path.join('helpers', 'intl-get-legacy.js'), path.join('helpers', '-base-legacy.js'));
        } else {
            tree = stew.rm(tree, path.join('initializers', 'ember-intl.js'), path.join('helpers', 'intl-get.js'), path.join('helpers', '-base.js'));
            [
                [path.join('initializers', 'ember-intl-legacy.js'), path.join('initializers', 'ember-intl.js')],
                [path.join('helpers', 'intl-get-legacy.js'), path.join('helpers', 'intl-get.js')],
                [path.join('helpers', '-base-legacy.js'), path.join('helpers', '-base.js')]
            ].forEach(function(move) {
                tree = stew.mv(tree, move[0], move[1]);
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

        var trees = [tree];

        if (this.locales.length) {
            trees.push(new LocaleWriter(tree, 'cldrs', {
                locales: this.locales,
                pluralRules: true,
                relativeFields: true,
                prelude: '/*jslint eqeq: true*/\n',
                wrapEntry: function wrapEntry(result) {
                    return 'export default ' + serialize(result) + ';';
                }
            }));
        }

        return mergeTrees(trees);
    },

    treeForPublic: function() {
        var tree = this._super.treeForPublic.apply(this, arguments);

        if (this.intlOptions.disablePolyfill) {
            return tree;
        }

        var intlPath = path.dirname(require.resolve('intl'));
        var appOptions = this.app.options;
        var assetPath = path.join('assets', 'intl');
        var trees = [];
        var include;

        if (appOptions.app && appOptions.app.intl) {
            assetPath = appOptions.app.intl;
        }

        if (tree) {
            trees.push(tree);
        }

        trees.push(utils.lowercaseTree(new Funnel(path.join(intlPath, 'dist'), {
            files: ['Intl.complete.js', 'Intl.js', 'Intl.js.map', 'Intl.min.js'],
            destDir: path.join(assetPath)
        })));

        if (this.locales.length) {
            include = this.locales.map(function(locale) {
                return new RegExp(locale, 'i');
            });
        }

        // only use these when using Intl.js, should not be used
        // with the native Intl API
        trees.push(utils.lowercaseTree(new Funnel(path.join(intlPath, 'locale-data', 'jsonp'), {
            destDir: path.join(assetPath, 'locales'),
            include: include
        })));

        return mergeTrees(trees);
    }
};
