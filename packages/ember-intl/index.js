'use strict';

const { existsSync } = require('node:fs');
const { dirname, join } = require('node:path');
const mergeTrees = require('broccoli-merge-trees');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

const buildTranslationTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');
const findEngine = require('./lib/utils/find-engine');

const defaultConfig = {
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  fallbackLocale: null,
  inputPath: 'translations',
  outputPath: 'translations',
  publicOnly: false,
  requiresTranslation(/* key, locale */) {
    return true;
  },
  stripEmptyTranslations: false,
  verbose: false,
  wrapTranslationsWithNamespace: false,
};

const allowedConfigOptions = [
  'errorOnMissingTranslations',
  'errorOnNamedArgumentMismatch',
  'fallbackLocale',
  'inputPath',
  'publicOnly',
  'wrapTranslationsWithNamespace',
];

module.exports = {
  name: 'ember-intl',
  configOptions: null,

  included(parent) {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();

    this.package = findEngine(parent) ?? this.project;

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

  treeForAddon(tree) {
    let trees = [tree];

    if (!this.configOptions.publicOnly) {
      const translationTree = this.getTranslationTree({
        mergeTranslationFiles: true,
        outputPath: '',
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
      trees.push(this.getTranslationTree());
    }

    return mergeTrees(trees, { overwrite: true });
  },

  getTranslationTree(options = {}) {
    const {
      errorOnMissingTranslations,
      errorOnNamedArgumentMismatch,
      fallbackLocale,
      outputPath,
      requiresTranslation,
      stripEmptyTranslations,
      verbose,
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
      fallbackLocale,
      log: (message) => {
        return this.ui.writeLine(`[ember-intl] ${message}`);
      },
      mergeTranslationFiles: options.mergeTranslationFiles,
      outputPath: options.outputPath ?? outputPath,
      requiresTranslation,
      stripEmptyTranslations,
      verbose,
      wrapTranslationsWithNamespace,
    });
  },

  getUserConfig() {
    const { env: environment, project } = this.app;

    const configFile = join(dirname(project.configPath()), 'ember-intl.js');
    const config = {};

    if (existsSync(configFile)) {
      const userConfig = require(configFile)(environment);

      allowedConfigOptions.forEach((option) => {
        if (option in userConfig) {
          config[option] = userConfig[option];
        }
      });
    }

    return config;
  },
};
