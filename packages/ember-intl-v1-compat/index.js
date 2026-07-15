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
  namespaceKeysByDir: false,
  publicOnly: false,
  translationsDir: 'translations',
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
    const { fallbackLocale, namespaceKeysByDir, translationsDir } =
      this.buildOptions;

    const [translationTree, addonsWithTranslations] = buildTranslationTree(
      this.project,
      translationsDir,
      this.treeGenerator,
    );

    return new TranslationReducer([translationTree], {
      addonsWithTranslations,
      fallbackLocale,
      mergeTranslationFiles,
      namespaceKeysByDir,
      outputPath,
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
    const buildOptions = new Set([
      ...Object.keys(defaultBuildOptions),
      'fallbackLocale',
      'inputPath',
      'publicOnly',
      'wrapTranslationsWithNamespace',
    ]);

    for (const [buildOption, value] of Object.entries(userConfig)) {
      if (!buildOptions.has(buildOption)) {
        throw new Error(
          `ERROR: Unable to read \`config/ember-intl.js\`. (unknown build option: ${buildOption})`,
        );
      }

      switch (buildOption) {
        case 'inputPath': {
          console.log(
            'WARNING: `inputPath` will be replaced by `translationsDir` in @ember-intl/v1-compat@2.0.0. You can rename the key now to ease migration.',
          );

          config['translationsDir'] = value;

          break;
        }

        case 'publicOnly': {
          console.log(
            'WARNING: `publicOnly` will be derived from `namespaceKeysByDir` (currently called `wrapTranslationsWithNamespace`) in @ember-intl/v1-compat@2.0.0. You do not need to take any action.',
          );

          config['publicOnly'] = value;

          break;
        }

        case 'wrapTranslationsWithNamespace': {
          console.log(
            'WARNING: `wrapTranslationsWithNamespace` will be replaced by `namespaceKeysByDir` in @ember-intl/v1-compat@2.0.0. You can rename the key now to ease migration.',
          );

          config['namespaceKeysByDir'] = value;

          break;
        }

        default: {
          config[buildOption] = value;
        }
      }
    }

    return config;
  },
};
