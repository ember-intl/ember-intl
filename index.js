/* eslint-env node */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

const WatchedDir = require('broccoli-source').WatchedDir;
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
  addonOptions: null,
  isLocalizationFramework: true,

  included() {
    this._super.included.apply(this, arguments);

    let app = (this.app = this._findHost());
    this.addonOptions = this.intlConfig(app.env);

    let inputPath = this.addonOptions.inputPath || 'translations';
    this.hasTranslationDir = existsSync(path.join(app.project.root, inputPath));
    this.projectLocales = this.findLocales();

    let projectTranslations = new WatchedDir(inputPath);

    let addonTranslations = this.findIntlAddons().map(function(addon) {
      return funnel(addon.path, {
        srcDir: addon.translationPath,
        destDir: `__addon__${addon.name}`
      });
    }, this);

    this.translationTree = this.mergeTranslationTrees(projectTranslations, addonTranslations);
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
    if (name === 'head' && !this.addonOptions.disablePolyfill && this.addonOptions.autoPolyfill) {
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

    if (this.hasTranslationDir && !this.addonOptions.publicOnly) {
      trees.push(
        this.reduceTranslations({
          filename(key) {
            return `${key}.js`;
          },
          wrapEntry(obj) {
            return `export default ${stringify(obj)};`;
          }
        })
      );
    }

    if (tree && this.projectLocales.length) {
      let cldrTree = extract(tree, {
        locales: this.projectLocales,
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
    let publicTree = this._super.treeForPublic.apply(this, arguments);
    let trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    if (!this.addonOptions.disablePolyfill) {
      let appOptions = this.app.options || {};

      trees.push(
        require('./lib/broccoli/intl-polyfill')({
          locales: this.projectLocales,
          destDir: (appOptions.app && appOptions.app.intl) || 'assets/intl'
        })
      );
    }

    if (this.hasTranslationDir && this.addonOptions.publicOnly) {
      trees.push(this.reduceTranslations());
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
        .filter(function(locale) {
          return typeof locale === 'string';
        })
        .map(function(locale) {
          return locale.toLocaleLowerCase();
        });
    }

    return addonConfig;
  },

  findLocales() {
    let locales = [];

    if (this.hasTranslationDir) {
      locales = locales.concat(
        walkSync(path.join(this.app.project.root, this.addonOptions.inputPath), {
          directories: false
        }).map(function(filename) {
          return path.basename(filename, path.extname(filename)).toLowerCase().replace(/_/g, '-');
        })
      );
    }

    if (this.addonOptions.locales) {
      locales = locales.concat(this.addonOptions.locales);
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

  findIntlAddons() {
    let projectName = this.app.project.name();
    let addons = this.app.project.addons;
    let registered = new Set();

    let find = function(list, addon) {
      // Only handle each addon once
      if (registered.has(addon.name)) {
        return list;
      }

      let translationPath = addon.pkg['ember-addon'].translationPath || 'translations';

      if (projectName !== addon.name && existsSync(path.join(addon.root, translationPath))) {
        list.push({
          name: addon.name,
          translationPath: translationPath,
          path: addon.root
        });

        registered.add(addon.name);
      }

      // Recursively load all child addons
      return addon.addons.reduce(find, list);
    };

    return addons.reduce(find, []);
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

  reduceTranslations(opts) {
    if (!opts) {
      opts = {};
    }
    let addon = this;

    return new TranslationReducer(
      [this.translationTree],
      Object.assign({}, this.addonOptions, opts, {
        verbose: !(this.app.options && this.app.options.intl && this.app.options.intl.silent),
        log() {
          return addon.log.apply(addon, arguments);
        }
      })
    );
  }
};
