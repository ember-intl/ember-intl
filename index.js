/* eslint-env node */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

const { WatchedDir, UnwatchedDir } = require('broccoli-source');
const stringify = require('json-stable-stringify');
const mergeTrees = require('broccoli-merge-trees');
const extract = require('broccoli-cldr-data');
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
  _options: null,

  /** @private **/
  _isHost: false,

  /** @private **/
  _translationTree: null,

  /** @private **/
  _hostsLocales: null,

  included(app) {
    this._super.included.apply(this, arguments);

    let host = (this.app = this._findHost());
    this._isHost = app === host;

    if (this._isHost) {
      this._options = this.intlConfig(host.env);
      this._hostsLocales = this.findLocales();
      this._translationTree = this.buildTranslationTree();
    }
  },

  /*
   * @method buildTranslationTree
   * @private
   */
  buildTranslationTree() {
    let registry = this.app.registry;
    let addonNodes = [];
    this.processAddons(this.project.addons, addonNodes);

    let nodes = [...addonNodes];
    let projectTranslationPath = path.join(this.app.project.root, this._options.inputPath);

    if (existsSync(projectTranslationPath)) {
      let projectTranslationTree = this.treeGenerator(projectTranslationPath);
      nodes.push(projectTranslationTree);
    }

    let translationNodes = mergeTrees(nodes, { overwrite: true });
    let plugins = [...registry.registeredForType('intl'), ...registry.registeredForType('i18n')];

    if (plugins.length > 0) {
      plugins.forEach(preprocessor => {
        translationNodes = preprocessor.toTree.call(preprocessor, translationNodes);
      });
    }

    return translationNodes;
  },

  /*
   * @method processAddons
   * @param {array} array of addon models
   * @param {array} array of broccoli node/tree/directories
   * @private
   */
  processAddons(addons, nodes) {
    addons.forEach(addon => this.processAddon(addon, nodes));
  },

  /*
  * @method processAddon
  * @param {object} addon model
  * @param {array} array of broccoli node/tree/directories
  * @private
  */
  processAddon(addon, nodes) {
    let addonTranslationPath = path.join(addon.root, this.translationPathForAddon(addon));
    let translationTree;

    if (existsSync(addonTranslationPath)) {
      let shouldWatch = addon.isDevelopingAddon && addon.isDevelopingAddon();
      let MaybeWatchDir = shouldWatch ? WatchedDir : UnwatchedDir;
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

  outputPaths() {
    let assetPath = 'assets/intl';
    let { options } = this.app;

    if (options.app && options.app.intl) {
      assetPath = options.app.intl;
    }

    return assetPath;
  },

  contentFor(name, config) {
    if (!this._isHost) {
      return;
    }

    if (name === 'head' && !this._options.disablePolyfill && this._options.autoPolyfill) {
      let assetPath = this.outputPaths();
      let locales = this.findLocales();
      let prefix = '';

      if (config.rootURL) {
        prefix += config.rootURL;
      }
      if (assetPath) {
        prefix += assetPath;
      }

      let scripts = locales.map(locale => `<script src="${prefix}/locales/${locale}.js"></script>`);

      return [`<script src="${prefix}/intl.min.js"></script>`].concat(scripts).join('\n');
    }
  },

  treeForApp(appTree) {
    if (!this._isHost) {
      return appTree;
    }

    let trees = [];

    if (appTree) {
      trees.push(appTree);

      if (this._hostsLocales.length) {
        trees.push(
          extract(appTree, {
            locales: this._hostsLocales,
            relativeFields: true,
            destDir: 'cldrs',
            prelude: '/*jslint eqeq: true*/\n',
            moduleType: 'es6'
          })
        );
      }
    }

    if (!this._options.publicOnly && this._translationTree) {
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

    let publicTree = this._super.treeForPublic.apply(this, arguments);
    let trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    if (!this._options.disablePolyfill) {
      let appOptions = this.app.options || {};

      trees.push(
        require('./lib/broccoli/intl-polyfill')({
          locales: this._hostsLocales,
          destDir: (appOptions.app && appOptions.app.intl) || 'assets/intl'
        })
      );
    }

    if (this._options.publicOnly && this._translationTree) {
      trees.push(this.processTranslationTree(this._translationTree));
    }

    return mergeTrees(trees, { overwrite: true });
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

  intlConfig(environment) {
    let deprecatedConfig = this.app.project.config(environment)['intl'];
    let addonConfig = Object.assign(this.readConfig(environment), deprecatedConfig || {});

    if (deprecatedConfig) {
      this.log('DEPRECATION: intl configuration should be moved into config/ember-intl.js');
      this.log('Run `ember g ember-intl-config` to create a default config');
    }

    if (addonConfig.defaultLocale) {
      this.log('DEPRECATION: defaultLocale is deprecated in favor of baseLocale');
      this.log('Please update config/ember-intl.js or config/environment.js');
      addonConfig.baseLocale = addonConfig.defaultLocale;
    }

    addonConfig = Object.assign(
      {
        locales: null,
        baseLocale: null,
        publicOnly: false,
        disablePolyfill: false,
        autoPolyfill: false,
        inputPath: 'translations',
        outputPath: 'translations'
      },
      addonConfig
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
    let projectTranslationPath = path.join(this.app.project.root, this._options.inputPath);

    if (existsSync(projectTranslationPath)) {
      locales = locales.concat(
        walkSync(projectTranslationPath, {
          directories: false
        }).map(filename => {
          return path.basename(filename, path.extname(filename)).toLowerCase().replace(/_/g, '-');
        })
      );
    }

    if (this._options.locales) {
      locales = locales.concat(this._options.locales);
    }

    locales = locales.concat(
      locales.filter(locale => {
        if (utils.isSupportedLocale(locale)) {
          return true;
        }

        this.log(`'${locale}' is not a valid locale name`);

        return false;
      })
    );

    return utils.unique(locales);
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
      Object.assign({}, this._options, opts, {
        verbose: !(this.app.options && this.app.options.intl && this.app.options.intl.silent),
        log() {
          return addon.log.apply(addon, arguments);
        }
      })
    );
  }
};
