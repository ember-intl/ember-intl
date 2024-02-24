/* eslint-env node */

'use strict';

const { existsSync } = require('node:fs');
const { dirname, isAbsolute, join } = require('node:path');
const mergeTrees = require('broccoli-merge-trees');
const { BroccoliMergeFiles } = require('broccoli-merge-files');
const stringify = require('json-stable-stringify');
const calculateCacheKeyForTree = require('calculate-cache-key-for-tree');

const buildTranslationTree = require('./lib/broccoli/build-translation-tree');
const TranslationReducer = require('./lib/broccoli/translation-reducer');
const findEngine = require('./lib/utils/find-engine');
const Logger = require('./lib/logger');
const DEFAULT_CONFIG = require('./lib/default-config');

const OBSOLETE_OPTIONS = ['locales', 'disablePolyfill', 'autoPolyfill'];

module.exports = {
  name: 'ember-intl',

  options: {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  },

  logger: null,
  configOptions: null,
  isLocalizationFramework: true,

  included(parent) {
    this._super.included.apply(this, arguments);

    this.app = this._findHost();
    const options = this.app.options.intl || {};

    this.logger = new Logger({
      ui: this.ui,
      silent: options.silent,
    });

    this.package = findEngine(parent) || this.project;
    this.configOptions = this.createOptions(this.app.env, this.app.project);
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
      filename: options.filename,
      outputPath: 'outputPath' in options ? options.outputPath : outputPath,
      addonsWithTranslations,
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
        filename(key) {
          return key;
        },
      });

      const flattenedTranslationTree = new BroccoliMergeFiles(
        [translationTree],
        {
          outputFileName: 'translations.js',
          merge: (entries) => {
            const output = entries.map(([locale, translations]) => {
              return [locale, JSON.parse(translations)];
            });

            return 'export default ' + stringify(output);
          },
        },
      );

      trees.push(flattenedTranslationTree);
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

  readConfig(environment, project) {
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

  createOptions(environment, project) {
    const config = {
      ...DEFAULT_CONFIG,
      ...this.readConfig(environment, project),
    };

    if (typeof config.requiresTranslation !== 'function') {
      this.logger.warn(
        'Configured `requiresTranslation` is not a function. Using default implementation.',
      );
      config.requiresTranslation = DEFAULT_CONFIG.requiresTranslation;
    }

    OBSOLETE_OPTIONS.filter((option) => option in config).forEach((option) => {
      this.logger.warn(
        `\`${option}\` is obsolete and can be removed from config/ember-intl.js.`,
      );
    });

    return config;
  },
};
