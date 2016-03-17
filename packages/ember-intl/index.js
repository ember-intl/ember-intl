/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

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
var mergeTrees = require('broccoli-merge-trees');
var CldrWriter = require('./lib/broccoli/cldr-writer');
var lowercaseTree = require('./lib/broccoli/lowercase-tree');
var TranslationPreprocessor = require('./lib/broccoli/translation-preprocessor');

module.exports = {
  name: 'ember-intl',
  _intlConfig: null,

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    this._intlConfig = this.intlConfig(app.env);
    this.hasTranslationDir = existsSync(this.project.root + '/' + this._intlConfig.inputPath);
    this.locales = this.knownLocales();

    this.trees = {
      translations: new WatchedDir(this._intlConfig.inputPath),
      intl: new UnwatchedDir(path.dirname(require.resolve('intl')))
    };

    return app;
  },

  treeForApp: function(tree) {
    var trees = [tree];

    if (this.hasTranslationDir && !this._intlConfig.publicOnly) {
      trees.push(new TranslationPreprocessor(this.trees.translations, utils.assign({
        ui: this.ui
      }, this._intlConfig)));
    }

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

    return mergeTrees(trees, { overwrite: true });
  },

  intlConfig: function(environment) {
    var addonConfig = this.app.project.config(environment)['intl'] || {};

    if (addonConfig.defaultLocale) {
      this.ui.writeLine('[ember-intl] DEPRECATION: intl.defaultLocale is deprecated in favor of intl.baseLocale');
      this.ui.writeLine('[ember-intl] Please update config/environment.js');

      addonConfig.baseLocale = addonConfig.defaultLocale;
    }

    var options = utils.assign({
      locales: undefined,
      baseLocale: undefined,
      allowEmpty: true,
      disablePolyfill: false,
      publicOnly: false,
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
  },

  treeForPublic: function() {
    var publicTree = this._super.treeForPublic.apply(this, arguments);

    var trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    if (!this._intlConfig.disablePolyfill) {
      var assetPath = 'assets/intl';
      var appOptions = this.app.options;

      if (appOptions.app && appOptions.app.intl) {
        assetPath = appOptions.app.intl;
      }

      trees.push(new Funnel(this.trees.intl, {
        srcDir: 'dist',
        files: ['Intl.js.map'],
        destDir: assetPath
      }));

      trees.push(lowercaseTree(new Funnel(this.trees.intl, {
        srcDir: 'dist',
        files: ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
        destDir: assetPath
      })));

      var localeFunnel = {
        srcDir: 'locale-data/jsonp',
        destDir: assetPath + '/locales'
      };

      if (this.locales.length) {
        localeFunnel.include = this.locales.map(function(locale) {
          return new RegExp(locale, 'i');
        });
      }

      trees.push(lowercaseTree(new Funnel(this.trees.intl, localeFunnel)));
    }

    if (this.hasTranslationDir && this._intlConfig.publicOnly) {
      trees.push(new TranslationPreprocessor(this.trees.translations, utils.assign({
        ui: this.ui
      }, this._intlConfig)));
    }

    return mergeTrees(trees, { overwrite: true });
  },

  knownLocales: function() {
    var locales = [];

    if (this.hasTranslationDir) {
      locales = walkSync(this.project.root + '/' + this._intlConfig.inputPath).map(function(filename) {
        return path.basename(filename, path.extname(filename));
      }).filter(utils.isSupportedLocale);
    }

    if (this._intlConfig.locales) {
      locales = locales.concat(this._intlConfig.locales);
    }

    return utils.uniqueByString(locales);
  }
};
