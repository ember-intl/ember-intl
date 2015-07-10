/* jshint node: true */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var serialize          = require('serialize-javascript');
var mergeTrees         = require('broccoli-merge-trees');
var stew               = require('broccoli-stew');
var walkSync           = require('walk-sync');
var chalk              = require('chalk');
var path               = require('path');
var fs                 = require('fs');

var LocaleWriter       = require('./lib/locale-writer');
var TranslationBlender = require('./lib/translation-blender');

var intlPath           = path.dirname(require.resolve('intl'));
var find               = stew.find;
var rename             = stew.rename;

function lowercaseTree(tree) {
    return rename(tree, function(filepath) {
        return filepath.toLowerCase();
    });
}

module.exports = {
    name: 'ember-intl',

    setupPreprocessorRegistry: function (type, registry) {
        var config = this.intlConfig();

        registry.add('js', {
            name: 'translations',
            ext:  'js',
            toTree: function (tree) {
                var translations = find(config.inputPath, {
                    allowEmpty: true
                });

                return mergeTrees([
                    tree,
                    TranslationBlender(translations, config)
                ]);
            }
        });
    },

    intlConfig: function () {
        var projectConfig = this.projectConfig();

        return Object.assign({
            disablePolyfill: false,
            defaultLocale  : 'en-us',
            inputPath      : 'translations',
            outputPath     : path.join(projectConfig.modulePrefix, 'translations')
        }, projectConfig.intl);
    },

    projectConfig: function () {
        return this.project.config(process.env.EMBER_ENV);
    },

    treeForApp: function (inputTree) {
        var trees        = [inputTree];
        var config       = this.intlConfig();
        var translations = path.join(this.project.root, config.inputPath);

        if (fs.existsSync(translations)) {
            var locales = walkSync(translations).map(function (filename) {
                return path.basename(filename, path.extname(filename));
            }).filter(function (localeName) {
                var has = LocaleWriter.has(localeName);
                if (!has) {
                    console.error(
                        chalk.red(
                            '[ember-intl] \'' + localeName + '\' does not match a supported locale name.\n' +
                            'List of supported locales: https://github.com/yahoo/formatjs-extract-cldr-data/tree/master/data/main'
                        )
                    );
                }
                return has;
            });

            var localeTree = new LocaleWriter(inputTree, 'cldrs', {
                locales       : locales,
                pluralRules   : true,
                relativeFields: true,
                prelude       : '/*jslint eqeq: true*/\n',
                wrapEntry     : this.wrapLocale
            });

            trees.push(localeTree);
        }

        return mergeTrees(trees, { overwrite: true });
    },

    treeForPublic: function (inputTree) {
        var config = this.intlConfig();

        if (config.disablePolyfill) {
            return inputTree;
        }

        var trees = [];

        if (inputTree) {
            trees.push(inputTree);
        }

        trees.push(lowercaseTree(find(path.join(intlPath, 'dist'), {
            files  : ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
            destDir: path.join('assets', 'intl')
        })));

        // only use these when using Intl.js, should not be used
        // with the native Intl API
        trees.push(lowercaseTree(find(path.join(intlPath, 'locale-data', 'jsonp'), {
            destDir: path.join('assets', 'intl', 'locales')
        })));

        return mergeTrees(trees, { overwrite: true });
    },

    wrapLocale: function (result) {
        return 'export default ' + serialize(result) + ';';
    }
};
