/* eslint-env node */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

const stringify = require('json-stable-stringify');
const mergeTrees = require('broccoli-merge-trees');
const extract = require('broccoli-cldr-data');
const funnel = require('broccoli-funnel');
const walkSync = require('walk-sync');
const path = require('path');
const fs = require('fs');

const utils = require('./lib/utils');
const TranslationReducer = require('./lib/broccoli/translation-reducer');

module.exports = {
  name: 'ember-intl',
  opts: null,
  isLocalizationFramework: true,

  included() {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();
    this.opts = this.getOptions(this.app.env);
    this.locales = this.findLocales();
    this.translationTree = this._buildTranslationTree();
  },

  _buildTranslationTree() {
    const projectTranslations = path.join(this.project.root, this.opts.inputPath || 'translations');
    const translationTrees = [];

    this._processAddons(this.project.addons, translationTrees);

    if (fs.existsSync(projectTranslations)) {
      translationTrees.push(this.treeGenerator(projectTranslations));
    }

    return funnel(
      mergeTrees(translationTrees, {
        overwrite: true
      }),
      {
        include: ['**/*.yaml', '**/*.yml', '**/*.json']
      }
    );
  },

  _processAddons(addons, translationTrees) {
    addons.forEach(addon => this._processAddon(addon, translationTrees));
  },

  /**
   * NOTE: `_processAddon` was heavily adapted off the work of ember-cli-fastboot implementation.
   */
  _processAddon(addon, translationTrees) {
    const addonTranslationPath = path.join(addon.root, 'translations');
    let addonGeneratedTree;

    if (fs.existsSync(addonTranslationPath)) {
      addonGeneratedTree = this.treeGenerator(addonTranslationPath);
    }

    if (addon.treeForTranslations) {
      let additionalTranslationTree = addon.treeForTranslations(addonGeneratedTree);

      if (additionalTranslationTree) {
        translationTrees.push(funnel(additionalTranslationTree, { destDir: addon.name }));
      }
    } else if (addonGeneratedTree !== undefined) {
      translationTrees.push(funnel(addonGeneratedTree, { destDir: addon.name }));
    }

    this._processAddons(addon.addons, translationTrees);
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
    if (name === 'head' && !this.opts.disablePolyfill && this.opts.autoPolyfill) {
      let assetPath = this.outputPaths();
      let locales = this.findLocales();
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
        this.bundleTranslations({
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
      trees.push(this.bundleTranslations());
    }

    return mergeTrees(trees, { overwrite: true });
  },

  log(msg, options) {
    if (this.app.options && this.app.options.intl && this.app.options.intl.silent) {
      return;
    }

    if (options && options.warning && this.ui.writeWarnLine) {
      this.ui.writeWarnLine(`[ember-intl] ${msg}`);
    } else {
      this.ui.writeLine(`[ember-intl] ${msg}`);
    }
  },

  readConfig(environment) {
    let project = this.app.project;

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

  getOptions(environment) {
    let addonConfig = Object.assign(
      {
        locales: null,
        publicOnly: false,
        disablePolyfill: false,
        autoPolyfill: false,
        inputPath: 'translations',
        outputPath: 'translations'
      },
      this.readConfig(environment)
    );

    if (addonConfig.locales) {
      addonConfig.locales = utils
        .castArray(addonConfig.locales)
        .filter(locale => typeof locale === 'string')
        .map(locale => locale.toLocaleLowerCase());
    }

    return addonConfig;
  },

  findLocales() {
    let locales = [];
    let joinedPath = path.join(this.app.project.root, this.opts.inputPath);

    locales = locales.concat(
      walkSync(joinedPath, { directories: false }).map(function(filename) {
        return path
          .basename(filename, path.extname(filename))
          .toLowerCase()
          .replace(/_/g, '-');
      })
    );

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
  },

  bundleTranslations(opts) {
    let addon = this;

    return new TranslationReducer(
      [this.translationTree],
      Object.assign({}, this.opts, opts, {
        verbose: !(this.app.options && this.app.options.intl && this.app.options.intl.silent),
        log() {
          return addon.log.apply(addon, arguments);
        }
      })
    );
  }
};
