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

  treeForApp: function(tree) {
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
    var assetPath = 'assets/intl';
    var appOptions = this.app.options;
    var trees = [];

    if (appOptions.app && appOptions.app.intl) {
      assetPath = appOptions.app.intl;
    }

    if (publicTree) {
      trees.push(publicTree);
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

    return mergeTrees(trees, {
      overwrite: true,
      annotation: 'TreeMerger (Intl.js)'
    });
  },

  _discoverLocales: function() {
    var translations = this.project.root + '/' + this.addonOptions.inputPath;
    var locales = [];

    if (existsSync(translations)) {
      locales = walkSync(translations).map(function(filename) {
        return path.basename(filename, path.extname(filename));
      }).filter(utils.isSupportedLocale);
    }

    if (this.addonOptions.locales) {
      locales = locales.concat(this.addonOptions.locales);
    }

    return utils.uniqueByString(locales);
  }
};
