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

function generateOptions(app) {
  var addonConfig = app.project.config(app.env)['intl'] || {};

  if (addonConfig.defaultLocale) {
    console.warn('[ember-intl] DEPRECATION: intl.defaultLocale is deprecated in favor of intl.baseLocale');
    console.warn('[ember-intl] Please update config/environment.js')

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
};

module.exports = {
  name: 'ember-intl',

  included: function(app) {
    this._super.included.apply(this, arguments);

    if (!this.app) {
      this.app = app;
    }

    this.opts = generateOptions(app);
    this.hasTranslationDir = existsSync(this.project.root + '/' + this.opts.inputPath);
    this.locales = this.knownLocales(this.opts);

    this.trees = {
      translations: new WatchedDir(this.opts.inputPath),
      intl: new UnwatchedDir(path.dirname(require.resolve('intl')))
    };
  },

  treeForApp: function(tree) {
    var trees = [tree];

    if (this.hasTranslationDir && !this.opts.publicOnly) {
      trees.push(new TranslationPreprocessor(this.trees.translations, this.opts));
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

  treeForPublic: function() {
    var publicTree = this._super.treeForPublic.apply(this, arguments);

    var trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    if (!this.opts.disablePolyfill) {
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

    if (this.hasTranslationDir && this.opts.publicOnly) {
      trees.push(new TranslationPreprocessor(this.trees.translations, this.opts));
    }

    return mergeTrees(trees, { overwrite: true });
  },

  knownLocales: function(options) {
    var locales = [];

    if (this.hasTranslationDir) {
      locales = walkSync(this.project.root + '/' + options.inputPath).map(function(filename) {
        return path.basename(filename, path.extname(filename));
      }).filter(utils.isSupportedLocale);
    }

    if (options.locales) {
      locales = locales.concat(options.locales);
    }

    return utils.uniqueByString(locales);
  }
};
