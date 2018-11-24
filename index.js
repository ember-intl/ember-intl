/* eslint-env node */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const walkSync = require('walk-sync');
const extract = require('@ember-intl/broccoli-cldr-data');
const mergeTrees = require('broccoli-merge-trees');
const stringify = require('json-stable-stringify');

const utils = require('./lib/utils');
const buildTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');

const defaultConfig = {
  locales: null,
  publicOnly: false,
  disablePolyfill: false,
  autoPolyfill: false,
  inputPath: 'translations',
  outputPath: 'translations',
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  requiresTranslation: (/* key, locale */) => true
};

module.exports = {
  name: 'ember-intl',
  opts: null,
  isLocalizationFramework: true,

  included() {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();
    this.opts = this.createOptions(this.app.env, this.app.project);
    this.isSilent = this.app.options.intl && this.app.options.intl.silent;
    this.locales = this.findAvailableLocales();
  },

  generateTranslationTree(bundlerOptions) {
    const translationTree = buildTree(this.project, this.opts.inputPath, this.treeGenerator);
    const _bundlerOptions = bundlerOptions || {};
    const addon = this;

    if ('throwMissingTranslations' in this.opts) {
      this.log('DEPRECIATION: `throwMissingTranslations` has been renamed to `errorOnMissingTranslations`', {
        warning: true
      });
    }

    return new TranslationReducer(translationTree, {
      verbose: !this.isSilent,
      outputPath: this.opts.outputPath,
      filename: _bundlerOptions.filename,
      wrapEntry: _bundlerOptions.wrapEntry,
      requiresTranslation: this.opts.requiresTranslation,
      errorOnMissingTranslations: this.opts.throwMissingTranslations || this.opts.errorOnMissingTranslations,
      errorOnNamedArgumentMismatch: this.opts.errorOnNamedArgumentMismatch,
      stripEmptyTranslations: this.opts.stripEmptyTranslations,
      log() {
        return addon.log.apply(addon, arguments);
      }
    });
  },

  findAssetPath(appOptions) {
    if (appOptions.app && appOptions.app.intl) {
      return appOptions.app.intl;
    }

    return 'assets/intl';
  },

  contentFor(name, config) {
    if (name === 'head' && !this.opts.disablePolyfill && this.opts.autoPolyfill) {
      let assetPath = this.findAssetPath(this.app.options);
      let locales = this.locales;
      let prefix = '';

      if (config.rootURL) {
        prefix += config.rootURL;
      }
      if (assetPath) {
        prefix += assetPath;
      }

      let localeScripts = locales.map(function(locale) {
        return `<script src="${prefix}/locales/${locale}.js"></script>`;
      });

      return [`<script src="${prefix}/intl.min.js"></script>`].concat(localeScripts).join('\n');
    }
  },

  treeForApp(tree) {
    let trees = [tree];

    if (!this.opts.publicOnly) {
      trees.push(
        this.generateTranslationTree({
          outputPath: 'translations',
          filename(key) {
            return `${key}.js`;
          },
          wrapEntry(obj) {
            return `export default ${stringify(obj)};`;
          }
        })
      );
    }

    if (tree && this.locales.length) {
      let cldrTree = extract(tree, {
        locales: this.locales,
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
    let trees = [];

    if (!this.opts.disablePolyfill) {
      let appOptions = this.app.options || {};

      trees.push(
        require('./lib/broccoli/intl-polyfill')({
          locales: this.locales,
          destDir: (appOptions.app && appOptions.app.intl) || 'assets/intl'
        })
      );
    }

    if (this.opts.publicOnly) {
      trees.push(this.generateTranslationTree());
    }

    return mergeTrees(trees, { overwrite: true });
  },

  log(msg, options) {
    if (this.isSilent) {
      return;
    }

    if (options && options.warning && this.ui.writeWarnLine) {
      this.ui.writeWarnLine(`[ember-intl] ${msg}`);
    } else {
      this.ui.writeLine(`[ember-intl] ${msg}`);
    }
  },

  readConfig(environment, project) {
    // NOTE: For ember-cli >= 2.6.0-beta.3, project.configPath() returns absolute path
    // while older ember-cli versions return path relative to project root
    let configPath = path.dirname(project.configPath());
    let config = path.join(configPath, 'ember-intl.js');

    if (!path.isAbsolute(config)) {
      config = path.join(project.root, config);
    }

    if (fs.existsSync(config)) {
      return require(config)(environment);
    }

    return {};
  },

  createOptions(environment, project) {
    let addonConfig = Object.assign({}, defaultConfig, this.readConfig(environment, project));

    if (typeof addonConfig.requiresTranslation !== 'function') {
      this.log('Configured `requiresTranslation` is not a function. Using default implementation.');
      addonConfig.requiresTranslation = defaultConfig.requiresTranslation;
    }

    if (addonConfig.locales) {
      addonConfig.locales = utils
        .castArray(addonConfig.locales)
        .filter(locale => typeof locale === 'string')
        .map(locale => locale.toLocaleLowerCase());
    }

    return addonConfig;
  },

  findAvailableLocales() {
    let locales = [];
    let joinedPath = path.join(this.app.project.root, this.opts.inputPath);

    if (fs.existsSync(joinedPath)) {
      locales = locales.concat(
        walkSync(joinedPath, { directories: false })
          .filter(utils.validLocaleFile)
          .map(function(filename) {
            return path
              .basename(filename, path.extname(filename))
              .toLowerCase()
              .replace(/_/g, '-');
          })
      );
    }

    if (this.opts.locales) {
      locales = locales.concat(this.opts.locales);
    }

    locales = locales.concat(
      locales.filter(function(locale) {
        if (utils.isSupportedLocale(locale)) {
          return true;
        }

        this.log(`'${locale}' is not a valid locale name`);

        return false;
      }, this)
    );

    return utils.unique(locales);
  }
};
