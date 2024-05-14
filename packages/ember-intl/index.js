/* eslint-env node */

'use strict';

const { existsSync } = require('node:fs');
const { dirname, isAbsolute, join } = require('node:path');
const mergeTrees = require('broccoli-merge-trees');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

const buildTranslationTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');
const findEngine = require('./lib/utils/find-engine');
const defaultConfig = require('./lib/default-config');

module.exports = {
  name: 'ember-intl',
  configOptions: null,

  included(parent) {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();

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
      errorOnMissingTranslations,
      errorOnNamedArgumentMismatch,
      excludeLocales,
      fallbackLocale,
      includeLocales,
      outputPath,
      requiresTranslation,
      stripEmptyTranslations,
      wrapTranslationsWithNamespace,
    } = this.configOptions;

    const [translationTree, addonsWithTranslations] = buildTranslationTree(
      this.project,
      this.configOptions.inputPath,
      this.treeGenerator,
    );

    return new TranslationReducer([translationTree], {
      addonsWithTranslations,
      errorOnMissingTranslations,
      errorOnNamedArgumentMismatch,
      excludeLocales,
      fallbackLocale,
      includeLocales,
      log: (message) => {
        return this.ui.writeLine(`[ember-intl] ${message}`);
      },
      mergeTranslationFiles: options.mergeTranslationFiles,
      outputPath: 'outputPath' in options ? options.outputPath : outputPath,
      requiresTranslation,
      stripEmptyTranslations,
      verbose: !this.isSilent,
      wrapTranslationsWithNamespace,
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
