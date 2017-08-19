/* eslint-env node */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

const { WatchedDir, UnwatchedDir } = require('broccoli-source');
const extract = require('@ember-intl/broccoli-cldr-data');
const stringify = require('json-stable-stringify');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const existsSync = require('exists-sync');
const walkSync = require('walk-sync');
const path = require('path');

const utils = require('./lib/utils');
const TranslationReducer = require('./lib/broccoli/translation-reducer');

module.exports = {
  name: 'ember-intl',
  isLocalizationFramework: true,

  /** @private **/
  addonConfig: null,

  /** @private **/
  _isHost: false,

  /** @private **/
  _translationTree: null,

  /** @private **/
  _pluginsInitialized: false,

  isDevelopingAddon() {
    return true;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    let host = (this.app = this._findHost());
    this._isHost = app === host;

    if (this._isHost) {
      this.addonConfig = this.intlConfig(host.env);
      this._plugins = this.lookupIntlPlugins(this.project.addons);
      this.initializePlugins();
      this._translationTree = this.buildTranslationNode();
    }
  },

  initializePlugins() {
    if (this._pluginsInitialized) {
      return;
    }

    this._pluginsInitialized = true;
    this._plugins.forEach(plugin => utils.tryInvoke(plugin, 'initializePlugin', this.addonConfig));
  },

  lookupIntlPlugins(addons, registry = []) {
    let plugins = addons.filter(addon => addon.intlPlugin);
    let newRegistry = registry.concat(plugins);
    plugins.forEach(addon => this.lookupIntlPlugins(addon.addons, newRegistry));

    return newRegistry;
  },

  /*
   * @method buildTranslationNode
   * @private
   */
  buildTranslationNode() {
    let registry = this.app.registry;
    let addonNodes = [];
    this.processAddons(this.project.addons, addonNodes);

    let nodes = [...addonNodes];
    let hostTranslationPath = path.join(this.app.project.root, this.addonConfig.inputPath);
    /* TODO: support multiple buildTranslationNode extensions */
    let buildExtension = this._plugins.find(plugin => typeof plugin.buildTranslationNode === 'function');

    if (buildExtension) {
      nodes.push(buildExtension.buildTranslationNode(this.app, hostTranslationPath));
    } else if (existsSync(hostTranslationPath)) {
      let projectTranslationTree = this.treeGenerator(hostTranslationPath);
      nodes.push(projectTranslationTree);
    }

    let translationNodes = mergeTrees(nodes, { overwrite: true });
    let preprocessors = registry.registeredForType('intl');

    if (preprocessors.length > 0) {
      preprocessors.forEach(preprocessor => {
        translationNodes = preprocessor.toTree.call(preprocessor, translationNodes);
      });
    }

    return translationNodes;
  },

  /*
   * @method processAddons
   * @param {array} array of addon models
   * @param {array} array of broccoli node
   * @private
   */
  processAddons(addons, nodes) {
    addons.forEach(addon => this.processAddon(addon, nodes));
  },

  /*
  * @method processAddon
  * @param {object} addon model
  * @param {array} array of broccoli node
  * @private
  */
  processAddon(addon, nodes) {
    let addonTranslationPath = path.join(addon.root, this.translationPathForAddon(addon));
    let translationTree;

    if (existsSync(addonTranslationPath)) {
      let MaybeWatchDir = addon.isDevelopingAddon() ? WatchedDir : UnwatchedDir;
      translationTree = new MaybeWatchDir(addonTranslationPath);
    }

    if (addon.treeForTranslations) {
      let addonAdditionalTranslations = addon.treeForTranslations(translationTree);
      if (addonAdditionalTranslations) {
        nodes.push(this.namespaceAddonTree(addonAdditionalTranslations, addon));
      }
    } else if (translationTree) {
      nodes.push(this.namespaceAddonTree(translationTree, addon));
    }

    this.processAddons(addon.addons, nodes);
  },

  namespaceAddonTree(tree, addon) {
    return funnel(tree, {
      destDir: `/addons/${addon.name}`,
      srcDir: '.'
    });
  },

  treeForApp(appTree) {
    if (!this._isHost) {
      return appTree;
    }

    let trees = [];

    if (appTree) {
      trees.push(appTree);

      if (this.addonConfig.locales.length) {
        trees.push(
          extract(appTree, {
            locales: this.addonConfig.locales,
            relativeFields: true,
            destDir: 'cldrs',
            prelude: '/*jslint eqeq: true*/\n',
            moduleType: 'es6'
          })
        );
      }
    }

    if (!this.addonConfig.publicOnly && this._translationTree) {
      trees.push(
        this.processTranslationTree(this._translationTree, {
          filename: key => `${key}.js`,
          wrapEntry: obj => `export default ${stringify(obj)};`
        })
      );
    }

    return mergeTrees(trees, { overwrite: true });
  },

  treeForPublic() {
    if (!this._isHost) {
      return;
    }

    if (this.addonConfig.publicOnly && this._translationTree) {
      return this.processTranslationTree(this._translationTree);
    }
  },

  translationPathForAddon(addon) {
    if (addon.pkg['ember-addon'] && addon.pkg['ember-addon'].translationPath) {
      return addon.pkg['ember-addon'].translationPath;
    }

    return 'translations';
  },

  log(msg, options) {
    if (this.app.options && this.app.options.intl && this.app.options.intl.silent) {
      return;
    }

    if (options && options.warning && this.ui.writeWarnLine) {
      return this.ui.writeWarnLine(`[ember-intl] ${msg}`);
    }

    this.ui.writeLine(`[ember-intl] ${msg}`);
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

    if (existsSync(config)) {
      return require(config)(environment);
    }

    return {};
  },

  intlConfig(env) {
    let addonConfig = Object.assign(
      {
        locales: [],
        baseLocale: null,
        publicOnly: false,
        disablePolyfill: false,
        autoPolyfill: false,
        inputPath: 'translations',
        outputPath: 'translations'
      },
      this.readConfig(env)
    );

    if (!addonConfig.locales) {
      addonConfig.locales = [];
    }

    addonConfig.locales = utils.unique(
      addonConfig.locales.concat(this.discoverLocales(addonConfig.inputPath)).filter(locale => {
        if (utils.isSupportedLocale(locale)) {
          return true;
        }

        this.log(`'${locale}' is not a valid locale name`);

        return false;
      })
    );

    addonConfig.locales = utils
      .castArray(addonConfig.locales)
      .filter(locale => typeof locale === 'string')
      .map(locale => locale.toLocaleLowerCase());

    return addonConfig;
  },

  discoverLocales(inputPath) {
    let projectTranslationPath = path.join(this.app.project.root, inputPath);

    if (existsSync(projectTranslationPath)) {
      return walkSync(projectTranslationPath, {
        directories: false
      }).map(filename => {
        return path.basename(filename, path.extname(filename)).toLowerCase().replace(/_/g, '-');
      });
    }

    return [];
  },

  mergeTranslationTrees(projectTranslations, addonTranslations) {
    let trees = [];
    trees.push(projectTranslations);

    if (addonTranslations && addonTranslations.length) {
      trees = trees.concat(addonTranslations);
    }

    return funnel(mergeTrees(trees), {
      include: ['**/*.yaml', '**/*.yml', '**/*.json']
    });
  },

  processTranslationTree(node, opts = {}) {
    let addon = this;

    return new TranslationReducer(
      node,
      Object.assign({}, this.addonConfig, opts, {
        verbose: !(this.app.options && this.app.options.intl && this.app.options.intl.silent),
        log() {
          return addon.log.apply(addon, arguments);
        }
      })
    );
  }
};
