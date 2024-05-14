/* eslint-env node */

'use strict';

const { existsSync } = require('node:fs');
const { dirname, isAbsolute, join } = require('node:path');
const mergeTrees = require('broccoli-merge-trees');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

const buildTranslationTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');
const findEngine = require('./lib/utils/find-engine');
const Logger = require('./lib/logger');
const defaultConfig = require('./lib/default-config');

module.exports = {
  name: 'ember-intl',
  logger: null,
  configOptions: null,

  included(parent) {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();
    const options = this.app.options.intl || {};

    this.logger = new Logger({
      ui: this.ui,
      silent: options.silent,
    });

    this.package = findEngine(parent) || this.project;

    this.configOptions = {
      ...defaultConfig,
      ...this.getUserConfig(),
    };
  },

  cacheKeyForTree(treeType) {
    const paths = this.package.paths || this.package.treePaths;

    return calculateCacheKeyForTree(
      treeType,
      this,
      paths ? paths[treeType] : this.package.root,
    );
  },

  generateTranslationTree(options = {}) {
    const {
      outputPath,
      fallbackLocale,
      includeLocales,
      excludeLocales,
      requiresTranslation,
      errorOnMissingTranslations,
      errorOnNamedArgumentMismatch,
      stripEmptyTranslations,
      wrapTranslationsWithNamespace,
    } = this.configOptions;

    const [translationTree, addonsWithTranslations] = buildTranslationTree(
      this.project,
      this.configOptions.inputPath,
      this.treeGenerator,
    );

    return new TranslationReducer([translationTree], {
      fallbackLocale,
      includeLocales,
      excludeLocales,
      requiresTranslation,
      errorOnMissingTranslations,
      errorOnNamedArgumentMismatch,
      stripEmptyTranslations,
      wrapTranslationsWithNamespace,
      verbose: !this.isSilent,
      outputPath: 'outputPath' in options ? options.outputPath : outputPath,
      addonsWithTranslations,
      mergeTranslationFiles: options.mergeTranslationFiles,
      log: (...args) => {
        return this.logger.log(...args);
      },
      warn: (...args) => {
        return this.logger.warn(...args);
      },
    });
  },

  treeForAddon(tree) {
    let trees = [tree];

    if (!this.configOptions.publicOnly) {
      const translationTree = this.generateTranslationTree({
        outputPath: '',
        mergeTranslationFiles: true,
      });

      trees.push(translationTree);
    }

    return this._super.treeForAddon.call(
      this,
      mergeTrees(trees, { overwrite: true }),
    );
  },

  treeForPublic() {
    let trees = [];

    if (this.configOptions.publicOnly) {
      trees.push(this.generateTranslationTree());
    }

    return mergeTrees(trees, { overwrite: true });
  },

  getUserConfig() {
    const { env: environment, project } = this.app;

    // NOTE: For ember-cli >= 2.6.0-beta.3, project.configPath() returns absolute path
    // while older ember-cli versions return path relative to project root
    let configPath = dirname(project.configPath());
    let config = join(configPath, 'ember-intl.js');

    if (!isAbsolute(config)) {
      config = join(project.root, config);
    }

    if (existsSync(config)) {
      return require(config)(environment);
    }

    return {};
  },
};
