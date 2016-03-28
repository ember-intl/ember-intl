/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var serialize = require('serialize-javascript');
var stringify = require('json-stable-stringify');
var UnwatchedDir = require('broccoli-source').UnwatchedDir;
var WatchedDir = require('broccoli-source').WatchedDir;
var Funnel = require('broccoli-funnel');
var existsSync = require('exists-sync');
var stew = require('broccoli-stew');
var walkSync = require('walk-sync');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

var utils = require('./lib/utils');
var mergeTrees = require('broccoli-merge-trees');
var CldrWriter = require('./lib/broccoli/cldr-writer');
var lowercaseTree = require('./lib/broccoli/lowercase-tree');
var TranslationReducer = require('./lib/broccoli/translation-reducer');

module.exports = {
  name: 'ember-intl',
  _intlConfig: null,

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;
    this._intlConfig = this.intlConfig(this.app.env);

    var translationFolder = this._intlConfig.inputPath;
    this.hasTranslationDir = existsSync(path.join(this.project.root, translationFolder));
    this.projectLocales = this.findLocales();

    this.trees = this.trees || {};
    this.trees.intl = new UnwatchedDir(path.dirname(require.resolve('intl')));
    this.trees.projectTranslations = new WatchedDir(translationFolder);

    this.trees.addonTranslations = this.findIntlAddons().map(function(addon) {
      return new Funnel(addon.path, {
        srcDir: addon.translationPath,
        destDir:  path.join('__addon__', addon.name)
      });
    }, this);

    this.trees.translationTree = this.createTranslationTree();

    return this.app;
  },

  log: function(msg) {
    this.ui.writeLine('[ember-intl] ' + msg);
  },

  readConfig: function(environment) {
    var project = this.app.project;
    var configPath = path.join(project.root, project.configPath(), '..', 'ember-intl.js');

    if (fs.existsSync(configPath)) {
      return require(configPath)(environment);
    }

    return {};
  },

  intlConfig: function(environment) {
    var deprecatedConfig = this.app.project.config(environment)['intl'];
    var addonConfig = _.assign(this.readConfig(), deprecatedConfig || {});

    if (deprecatedConfig) {
      this.log('DEPRECATION: intl configuration should be moved into config/ember-intl.js');
      this.log('Run `ember g ember-intl-config` to create a default config');
    }

    var defaults = {
      locales: null,
      baseLocale: null,
      publicOnly: false,
      disablePolyfill: false,
      inputPath: 'translations',
      outputPath: 'translations'
    };

    if (addonConfig.defaultLocale) {
      this.log('DEPRECATION: defaultLocale is deprecated in favor of baseLocale');
      this.log('Please update config/ember-intl.js or config/environment.js');
      addonConfig.baseLocale = addonConfig.defaultLocale;
    }

    addonConfig = _.assign(defaults, addonConfig);

    if (addonConfig.locales) {
      addonConfig.locales = _.castArray(addonConfig.locales).filter(function(locale) {
        return typeof locale === 'string';
      }).map(function(locale) {
        return locale.toLocaleLowerCase();
      });
    }

    return addonConfig;
  },

  findLocales: function() {
    var locales = [];

    if (this.hasTranslationDir) {
      locales = locales.concat(walkSync(path.join(this.project.root, this._intlConfig.inputPath)).map(function(filename) {
        return path.basename(filename, path.extname(filename));
      }));
    }

    if (this._intlConfig.locales) {
      locales = locales.concat(this._intlConfig.locales);
    }

    locales = locales.concat(locales.filter(function(locale) {
      if (utils.isSupportedLocale(locale)) {
        return true;
      }

      this.log('\'' + locale + '\' is not a valid locale name');

      return false;
    }, this));

    return utils.unique(locales);
  },

  findIntlAddons: function(tree) {
    var addons = this.project.addonPackages;

    return Object.keys(addons).map(function(key) {
      var addon = addons[key];
      var pkg = require(path.join(addon.path, 'package.json'));

      return {
        name: key,
        translationPath: pkg['ember-addon'].translationPath || 'translations',
        path: addon.path
      };
    }).filter(function(addon) {
      return fs.existsSync(path.join(addon.path, addon.translationPath));
    })
  },

  createTranslationTree: function() {
    var trees = [];

    trees.push(this.trees.projectTranslations);

    if (this.trees.addonTranslations) {
      trees = trees.concat(this.trees.addonTranslations);
    }

    return mergeTrees(trees);
  },

  reduceTranslations: function(opts) {
    if (!opts) { opts = {}; }

    return new TranslationReducer(this.trees.translationTree, _.assign({}, this._intlConfig, opts, {
      log: this.log
    }));
  },

  treeForApp: function(tree) {
    var trees = [tree];

    if (this.hasTranslationDir && !this._intlConfig.publicOnly) {
      trees.push(this.reduceTranslations({
        filename: function filename(key) {
          return key + '.js';
        },
        wrapEntry: function wrapEntry(obj) {
          return 'export default ' + stringify(obj) + ';';
        }
      }));
    }

    if (tree && this.projectLocales.length) {
      trees.push(new CldrWriter([tree], {
        path: './cldrs',
        locales: this.projectLocales,
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

    if (!this._intlConfig.disablePolyfill) {
      var assetPath = 'assets/intl';
      var appOptions = this.app.options || {};

      if (_.get(appOptions, 'app.intl')) {
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

      if (this.projectLocales.length) {
        localeFunnel.include = this.projectLocales.map(function(locale) {
          return new RegExp(locale, 'i');
        });
      }

      trees.push(lowercaseTree(new Funnel(this.trees.intl, localeFunnel)));
    }

    if (this.hasTranslationDir && this._intlConfig.publicOnly) {
      trees.push(this.reduceTranslations());
    }

    return mergeTrees(trees, { overwrite: true });
  }
};
