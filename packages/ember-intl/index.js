/* jshint node: true */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

let stringify = require('json-stable-stringify');
let WatchedDir = require('broccoli-source').WatchedDir;
let extract = require('broccoli-cldr-data');
let Funnel = require('broccoli-funnel');
let existsSync = require('exists-sync');
let walkSync = require('walk-sync');
let path = require('path');

let utils = require('./lib/utils');
let mergeTrees = require('broccoli-merge-trees');
let TranslationReducer = require('./lib/broccoli/translation-reducer');

module.exports = {
  name: 'ember-intl',
  opts: null,
  isLocalizationFramework: true,

  included() {
    this._super.included.apply(this, arguments);

    let app = this.app = this._findParentApp();
    let config = app.project.config(app.env) || {};
    this.addonOptions = config.intl || {};
    this.hasTranslationDir = existsSync(path.join(app.project.root, this.addonOptions.inputPath));

    let addonTranslationTrees = this.discoverEmberIntlAddons().map(function(addon) {
      return new Funnel(addon.path, {
        srcDir: addon.translationPath,
        destDir: '__addon__' + addon.name
      });
    }, this);

    this.translationTree = this.mergeTranslationTrees(new WatchedDir(this.addonOptions.inputPath), addonTranslationTrees);
  },

  _findParentApp() {
    if (typeof this._findHost === 'function') {
      return this._findHost();
    }

    let current = this;
    let app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    return app;
  },

  outputPaths() {
    let assetPath = 'assets/intl';
    let appOptions = this.app.options;

    if (appOptions.app && appOptions.app.intl) {
      assetPath = appOptions.app.intl;
    }

    return assetPath;
  },

  contentFor(name, config) {
    const options = config.intl || {};

    if (name === 'head' && !options.disablePolyfill && options.autoPolyfill) {
      let assetPath = this.outputPaths();
      let locales = config.intl.locales || [];
      let prefix = '';

      if (config.rootURL) {
        prefix += config.rootURL;
      }

      if (assetPath) {
        prefix += assetPath;
      }

      let localeScripts = locales.map(function(locale) {
        return '<script src=\"' + prefix + '/locales/' + locale + '.js\"></script>';
      });

      return ['<script src=\"'  + prefix + '/intl.min.js\"></script>']
        .concat(localeScripts)
        .join('\n');
    }
  },

  treeForApp(tree) {
    let trees = [tree];

    if (this.hasTranslationDir && !this.addonOptions.publicOnly) {
      trees.push(this.reduceTranslations({
        filename(key) {
          return key + '.js';
        },
        wrapEntry(obj) {
          return 'export default ' + stringify(obj) + ';';
        }
      }));
    }

    if (tree && this.addonOptions.locales.length) {
      let cldrTree = extract(tree, {
        locales: this.addonOptions.locales,
        relativeFields: true,
        destDir: 'cldrs',
        prelude: '/*jslint eqeq: true*/\n',
        moduleType: 'es6'
      });

      trees.push(cldrTree);
    }

    return mergeTrees(trees, { overwrite: true });
  },

  treeForPublic() {
    let publicTree = this._super.treeForPublic.apply(this, arguments);
    let trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    if (!this.addonOptions.disablePolyfill) {
      let appOptions = this.app.options || {};

      trees.push(require('./lib/broccoli/intl-polyfill')({
        locales: this.addonOptions.locales,
        destDir: appOptions.app && appOptions.app.intl || 'assets/intl'
      }));
    }

    if (this.hasTranslationDir && this.addonOptions.publicOnly) {
      trees.push(this.reduceTranslations());
    }

    return mergeTrees(trees, { overwrite: true });
  },

  log(msg) {
    if (this.app.options && this.app.options.intl && this.app.options.intl.silent) {
      return;
    }

    this.ui.writeLine('[ember-intl] ' + msg);
  },

  config(env) {
    // NOTE: For ember-cli >= 2.6.0-beta.3, project.configPath() returns absolute path
    // while older ember-cli versions return path relative to project root
    let project = this.app ? this.app.project : this.project;
    let emberIntlConfig = {};
    let configPath = path.join(path.dirname(project.configPath()), 'ember-intl.js');

    if (!path.isAbsolute(configPath)) {
      configPath = path.join(project.root, configPath);
    }

    if (existsSync(configPath)) {
      emberIntlConfig = require(configPath)(env);
    }

    let options = Object.assign({
      locales: [],
      publicOnly: false,
      autoPolyfill: false,
      disablePolyfill: false,
      inputPath: 'translations',
      outputPath: 'translations'
    }, emberIntlConfig);

    if (!options.locales || (options.locales && !options.locales.length)) {
      options.locales = this.findLocales()
    }

    options.locales = options.locales.filter(function(locale) {
      if (utils.isSupportedLocale(locale)) {
        return true;
      }

      this.log('\'' + locale + '\' is not a valid locale name');

      return false;
    }, this).map(function(locale) {
      return locale.toLocaleLowerCase().replace(/_/g, '-');
    });

    return {
      intl: options
    }
  },

  findLocales() {
    let locales = [];

    if (this.hasTranslationDir) {
      locales = locales.concat(walkSync(path.join(this.app.project.root, this.addonOptions.inputPath)).map(function(filename) {
        return path.basename(filename, path.extname(filename));
      }));
    }

    if (this.addonOptions.locales) {
      locales = locales.concat(this.addonOptions.locales);
    }

    return utils.unique(locales).filter(function(locale) {
      return locale !== 'subdirectory'
    });
  },

  discoverEmberIntlAddons() {
    let projectName = this.app.project.name();
    let addons = this.app.project.addons;
    let registered = new Set();

    let find = function(list, addon) {
      // Only handle each addon once
      if (registered.has(addon.name)) {
        return list;
      }

      let translationPath = addon.pkg['ember-addon'].translationPath || 'translations';

      if (projectName !== addon.name && existsSync(path.join(addon.root, translationPath))) {
        list.push({
          name: addon.name,
          translationPath: translationPath,
          path: addon.root
        });

        registered.add(addon.name);
      }

      // Recursively load all child addons
      return addon.addons.reduce(find, list);
    };

    return addons.reduce(find, []);
  },

  mergeTranslationTrees(projectTranslations, addonTranslationTrees) {
    let trees = [];
    trees.push(projectTranslations);

    if (addonTranslationTrees && addonTranslationTrees.length) {
      trees = trees.concat(addonTranslationTrees);
    }

    return mergeTrees(trees);
  },

  reduceTranslations(reduceOptions) {
    let addon = this;

    return new TranslationReducer([this.translationTree], Object.assign({}, this.addonOptions, reduceOptions, {
      log() {
        return addon.log.apply(addon, arguments);
      }
    }));
  }
};
