/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

let CachingWriter = require('broccoli-caching-writer');
let stringify = require('json-stable-stringify');
let mkdirp = require('mkdirp');
let extend = require('extend');
let yaml = require('js-yaml');
let path = require('path');
let fs = require('fs');

let propKeys = require('../utils/prop-keys');
let forEachMessage = require('../utils/for-each-message');
let validateMessage = require('../utils/validate-message');

function readAsObject(filepath) {
  let data = fs.readFileSync(filepath);
  let ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data, 'utf8');
  }
}

class TranslationReducer extends CachingWriter {
  constructor(inputNode, options) {
    if (!Array.isArray(inputNode)) {
      inputNode = [inputNode];
    }

    super(inputNode, {
      annotation: 'Translation Reducer'
    });

    this.options = Object.assign({
      log() {}
    }, options);
  }

  normalizeLocale(locale) {
    if (typeof locale === 'string') {
      return locale.replace(/_/g, '-').toLowerCase();
    }

    return locale;
  }

  _log(msg, options) {
    if (this.options.log) {
      return this.options.log.apply(undefined, arguments);
    }
  }

  findMissingKeys(target, defaultTranslationKeys, locale) {
    let targetProps = propKeys(target);

    defaultTranslationKeys.forEach(property => {
      if (targetProps.indexOf(property) === -1) {
        this._log(`${locale}: "${property}" message is missing`);
      }
    });
  }

  readDirectory(inputPath, listFiles) {
    let plugin = this;

    // sorted so that any translation path starts with `__addon__`
    // move to the head of the array.  this ensures the application's translations
    // take presidence over addon translations.
    let sortedPaths = listFiles.sort((a, b) => {
      if (path.relative(inputPath, a).indexOf('__addon__') === 0) {
        return -1;
      }

      return 1;
    });

    return sortedPaths.reduce((translations, translationPath) => {
      if (fs.statSync(translationPath).isDirectory()) {
        return translations;
      }

      let translation = readAsObject(translationPath);

      if (!translation) {
        plugin._log(`cannot read path "${translationPath}"`);
        return translations;
      }

      let basename = path.basename(translationPath).split('.')[0];
      let keyedTranslation = {};
      keyedTranslation[plugin.normalizeLocale(basename)] = translation;

      return extend(true, translations, keyedTranslation);
    }, {});
  }

  filename(key) {
    if (typeof this.options.filename === 'function') {
      return this.options.filename(key);
    }

    return `${key}.json`;
  }

  wrapEntry(obj) {
    if (typeof this.options.wrapEntry === 'function') {
      return this.options.wrapEntry(obj);
    }

    return stringify(obj);
  }

  build() {
    let outputPath = `${this.outputPath}/${this.options.outputPath}`;
    let baseLocale = this.options.baseLocale;
    let translations = this.readDirectory(this.inputPaths[0], this.listFiles().filter(file => file.endsWith('.yaml') || file.endsWith('.json')));
    let defaultTranslationKeys, defaultTranslation, translation;
    mkdirp.sync(outputPath);

    if (baseLocale) {
      defaultTranslation = translations[this.normalizeLocale(baseLocale)];

      if (this.options.verbose) {
        defaultTranslationKeys = propKeys(defaultTranslation);
      }
    }

    for (let locale in translations) {
      if (translations.hasOwnProperty(locale)) {
        translation = translations[locale];

        if (this.options.verbose && baseLocale && defaultTranslationKeys) {
          this.findMissingKeys(translation, defaultTranslationKeys, locale);
        }

        if (this.options.verbose) {
          this.validateMessages(translation, locale);
        }

        if (defaultTranslation) {
          translation = extend(true, {}, defaultTranslation, translation);
        }

        fs.writeFileSync(`${outputPath}/${this.filename(locale)}`, this.wrapEntry(translation), { encoding: 'utf8' });
      }
    }
  }

  validateMessages(messages, locale) {
    forEachMessage(messages, (key, message) => {
      try {
        validateMessage(message, locale);
      } catch (error) {
        this._log(`${locale}: "${key}" message can not be parsed: ${error.message}`, { warning: true });
      }
    });
  }
}

module.exports = TranslationReducer;
