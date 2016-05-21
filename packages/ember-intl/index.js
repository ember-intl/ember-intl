/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var serialize = require('serialize-javascript');
var stringify = require('json-stable-stringify');
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
var TranslationReducer = require('./lib/broccoli/translation-reducer');

module.exports = {
  name: 'ember-intl',
  opts: null,
  isLocalizationFramework: true,

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;

    var appConfig = this.project.config(app.env) || {};
    this.addonConfig = appConfig && appConfig.intl || {};
    this.hasTranslationDir = existsSync(path.join(app.project.root, this.addonConfig.inputPath));
    this.projectLocales = this.findLocales();
    this.trees = this.trees || {};

    if (this.hasTranslationDir) {
      this.trees.projectTranslations = new WatchedDir(this.addonConfig.inputPath);
    }

    this.trees.addonTranslations = this.findIntlAddons().map(function(addon) {
      return new Funnel(addon.path, {
        srcDir: addon.translationPath,
        destDir: '__addon__' + addon.name
      });
    }, this);

    this.trees.translationTree = this.createTranslationTree();

    return app;
  },

  outputPaths: function() {
    var assetPath = 'assets/intl';
    var appOptions = this.app.options;

    if (appOptions.app && appOptions.app.intl) {
      assetPath = appOptions.app.intl;
    }

    return assetPath;
  },

  contentFor: function(name) {
    if (name === 'head' && !this.addonConfig.disablePolyfill && this.addonConfig.autoPolyfill) {
      var assetPath = this.outputPaths();
      var locales = this.findLocales();

      var localeScripts = locales.map(function(locale) {
        return '<script src=\"' + assetPath + '/locales/' + locale + '.js\"></script>';
      });

      return ['<script src=\"' + assetPath + '/intl.min.js\"></script>']
        .concat(localeScripts)
        .join('\n');
    }
  },

  wrapDefaults(config) {
    return _.assign({
      locales: null,
      baseLocale: null,
      publicOnly: false,
      disablePolyfill: false,
      autoPolyfill: false,
      inputPath: 'translations',
      outputPath: 'translations'
    }, config);
  },

  config: function(env, baseConfig) {
    var configPath = path.join(this.root, this.project.configPath() + '.js');

    if (existsSync(configPath)) {
      var appConfig = require(configPath)(env, baseConfig);

      if (typeof appConfig.intl === 'object') {
        this.log('DEPRECATION: intl configuration should be moved into config/ember-intl.js');
        this.log('Run `ember g ember-intl-config` to create a default config');

        return {
          intl: wrapDefaults(appConfig.intl)
        };
      }
    }

    var addonConfigPath = path.join(configPath, '..', 'ember-intl.js');
    var config = existsSync(addonConfigPath) ? require(addonConfigPath)(env) : {};

    if (config.defaultLocale) {
      this.log('DEPRECATION: defaultLocale is deprecated in favor of baseLocale');
      this.log('Please update config/ember-intl.js or config/environment.js');
      config.baseLocale = config.defaultLocale;
    }

    if (config.locales) {
      config.locales = _.castArray(config.locales).filter(function(locale) {
        return typeof locale === 'string';
      }).map(function(locale) {
        return locale.toLocaleLowerCase();
      });
    }

    return {
      intl: this.wrapDefaults(config)
    };
  },

  treeForApp: function(tree) {
    var trees = [tree];

    if (this.hasTranslationDir && !this.addonConfig.publicOnly) {
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
      var cldrTree = new CldrWriter([tree], {
        destDir: 'cldrs',
        locales: this.projectLocales,
        prelude: '/*jslint eqeq: true*/\n',
        wrapEntry: function wrapEntry(result) {
          return 'export default ' + serialize(result) + ';';
        }
      });

      trees.push(cldrTree);
    }

    return mergeTrees(trees, { overwrite: true });
  },

  treeForPublic: function() {
    var publicTree = this._super.treeForPublic.apply(this, arguments);
    var trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    if (!this.addonConfig.disablePolyfill) {
      var appOptions = this.app.options || {};

      trees.push(require('./lib/broccoli/intl-polyfill')({
        locales: this.projectLocales,
        destDir: _.get(appOptions, 'app.intl') || 'assets/intl'
      }));
    }

    if (this.hasTranslationDir && this.addonConfig.publicOnly) {
      trees.push(this.reduceTranslations());
    }

    return mergeTrees(trees, { overwrite: true });
  },

  outputPaths: function() {
    var assetPath = 'assets/intl';
    var appOptions = this.app.options;

    if (appOptions.app && appOptions.app.intl) {
      assetPath = appOptions.app.intl;
    }

    return assetPath;
  },

  log: function(msg) {
    this.ui.writeLine('[ember-intl] ' + msg);
  },

  findLocales: function() {
    var locales = [];

    console.log(this.project.root);

    if (this.hasTranslationDir) {
      locales = locales.concat(walkSync(path.join(this.project.root, this.addonConfig.inputPath)).map(function(filename) {
        return path.basename(filename, path.extname(filename));
      }));
    }

    if (this.addonConfig.locales) {
      locales = locales.concat(this.addonConfig.locales);
    }

    locales = locales.concat(locales.filter(function(locale) {
      if (utils.isSupportedLocale(locale)) {
        return true;
      }

      this.log('\'' + locale + '\' is not a valid locale name');

      return false;
    }, this));

    return utils.unique(locales).filter(function(locale) {
      return locale !== 'subdirectory'
    });
  },

  findIntlAddons: function() {
    var addons = this.project.addons;
    var hash = {};
    var find = function (list, addon) {
      // Only handle each addon once
      if (hash[addon.name]) {
        return list;
      }

      var translationPath = addon.pkg['ember-addon'].translationPath || 'translations';

      if (fs.existsSync(path.join(addon.root, translationPath))) {
        list.push({
          name: addon.name,
          translationPath: translationPath,
          path: addon.root
        });
        hash[addon.name] = true;
      }

      // Recursively load all child addons
      return addon.addons.reduce(find, list);
    };

    return addons.reduce(find, []);
  },

  createTranslationTree: function() {
    var trees = [];

    if (this.trees.projectTranslations) {
      trees.push(this.trees.projectTranslations);
    }

    if (this.trees.addonTranslations) {
      trees = trees.concat(this.trees.addonTranslations);
    }

    return mergeTrees(trees);
  },

  reduceTranslations: function(opts) {
    if (!opts) { opts = {}; }

    var addon = this;

    return new TranslationReducer(this.trees.translationTree, _.assign({}, this.addonConfig, opts, {
      log: function() {
        return addon.log.apply(addon, arguments);
      }
    }));
  }
};
