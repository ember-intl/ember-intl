'use strict';

const { existsSync } = require('node:fs');
const { dirname, join } = require('node:path');
const mergeTrees = require('broccoli-merge-trees');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

const buildTranslationTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');
const findEngine = require('./lib/utils/ember-engine');

const defaultBuildOptions = {
  fallbackLocale: undefined,
  inputPath: 'translations',
  publicOnly: false,
  wrapTranslationsWithNamespace: false,
};

module.exports = {
  name: '@ember-intl/v1-compat',
  buildOptions: null,

  included(parent) {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();

    this.package = findEngine(parent) ?? this.project;

    this.buildOptions = {
      ...defaultBuildOptions,
      ...this.getUserBuildOptions(),
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

    if (!this.buildOptions.publicOnly) {
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

    if (this.buildOptions.publicOnly) {
      const translationTree = this.getTranslationTree({
        mergeTranslationFiles: false,
        outputPath: 'translations',
      });

      trees.push(translationTree);
    }

    return mergeTrees(trees, { overwrite: true });
  },

  getTranslationTree({ mergeTranslationFiles, outputPath }) {
    const { fallbackLocale, inputPath, wrapTranslationsWithNamespace } =
      this.buildOptions;

    const [translationTree, addonsWithTranslations] = buildTranslationTree(
      this.project,
      inputPath,
      this.treeGenerator,
    );

    return new TranslationReducer([translationTree], {
      addonsWithTranslations,
      fallbackLocale,
      mergeTranslationFiles,
      outputPath,
      wrapTranslationsWithNamespace,
    });
  },

  getUserBuildOptions() {
    const { env: environment, project } = this.app;

    const configFile = join(dirname(project.configPath()), 'ember-intl.js');
    const config = {};

    if (!existsSync(configFile)) {
      return config;
    }

    const userConfig = require(configFile)(environment);
    const buildOptions = Object.keys(defaultBuildOptions);

    for (const [buildOption, value] of Object.entries(userConfig)) {
      if (!buildOptions.includes(buildOption)) {
        throw new Error(
          `ERROR: Unable to read \`config/ember-intl.js\`. (unknown build option: ${buildOption})`,
        );
      }

      config[buildOption] = value;
    }

    return config;
  },
};
