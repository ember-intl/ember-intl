/* eslint-env node */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const walkSync = require('walk-sync');
const mergeTrees = require('broccoli-merge-trees');
const stringify = require('json-stable-stringify');
const extract = require('@ember-intl/broccoli-cldr-data');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

const buildTranslationTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');
const isValidLocaleFormat = require('./lib/utils/is-valid-locale-format');
const findEngine = require('./lib/utils/find-engine');

const DEFAULT_CONFIG = {
  locales: null,
  publicOnly: false,
  fallbackLocale: null,
  autoPolyfill: false,
  disablePolyfill: false,
  inputPath: 'translations',
  outputPath: 'translations',
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  wrapTranslationsWithNamespace: false,
  requiresTranslation(/* key, locale */) {
    return true;
  }
};

module.exports = {
  name: 'ember-intl',
  opts: null,
  isLocalizationFramework: true,

  options: {
    autoImport: {
      webpack: {
        node: {
          global: true
        }
      }
    }
  },

  cacheKeyForTree(treeType) {
    const paths = this.package.paths || this.package.treePaths;

    return calculateCacheKeyForTree(treeType, this, paths ? paths[treeType] : this.package.root);
  },

  included(parent) {
    this._super.included.apply(this, arguments);

    const engine = findEngine(parent);

    this.app = this._findHost();
    this.package = engine || this.project;
    this.opts = this.createOptions(this.app.env, this.app.project);
    this.isSilent = this.app.options.intl && this.app.options.intl.silent;
    this.locales = this.findAvailableLocales();
  },

  generateTranslationTree(bundlerOptions) {
    const [translationTree, addonsWithTranslations] = buildTranslationTree(
      this.project,
      this.opts.inputPath,
      this.treeGenerator
    );

    const _bundlerOptions = bundlerOptions || {};
    const addon = this;

    if ('throwMissingTranslations' in this.opts) {
      this.log('DEPRECIATION: `throwMissingTranslations` has been renamed to `errorOnMissingTranslations`', {
        warning: true
      });
    }

    return new TranslationReducer([translationTree], {
      verbose: !this.isSilent,
      outputPath: this.opts.outputPath,
      fallbackLocale: this.opts.fallbackLocale,
      filename: _bundlerOptions.filename,
      wrapEntry: _bundlerOptions.wrapEntry,
      requiresTranslation: this.opts.requiresTranslation,
      errorOnMissingTranslations: this.opts.throwMissingTranslations || this.opts.errorOnMissingTranslations,
      errorOnNamedArgumentMismatch: this.opts.errorOnNamedArgumentMismatch,
      stripEmptyTranslations: this.opts.stripEmptyTranslations,
      wrapTranslationsWithNamespace: this.opts.wrapTranslationsWithNamespace,
      addonsWithTranslations: addonsWithTranslations,
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
        numberFields: true,
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
    let config = Object.assign({}, DEFAULT_CONFIG, this.readConfig(environment, project));

    if (typeof config.requiresTranslation !== 'function') {
      this.log('Configured `requiresTranslation` is not a function. Using default implementation.');
      config.requiresTranslation = DEFAULT_CONFIG.requiresTranslation;
    }

    if (config.locales && !Array.isArray(config.locales)) {
      config.locales = [config.locales];
    }

    return config;
  },

  findAvailableLocales() {
    let locales = [];
    let projectInputPath = path.join(this.app.project.root, this.opts.inputPath);

    if (fs.existsSync(projectInputPath)) {
      locales.push(
        ...walkSync(projectInputPath, {
          globs: ['**/*.{yml,yaml,json}'],
          directories: false
        }).map(function(filename) {
          return path.basename(filename, path.extname(filename));
        })
      );
    }

    if (Array.isArray(this.opts.locales)) {
      locales.push(...this.opts.locales);
    }

    let normalizedLocales = locales.map(locale => {
      return locale
        .trim()
        .toLowerCase()
        .replace(/_/g, '-');
    });

    return [...new Set(normalizedLocales).values()].filter(locale => {
      if (isValidLocaleFormat(locale)) {
        return true;
      }

      this.log(`'${locale}' is not a valid locale name`);

      return false;
    });
  }
};
