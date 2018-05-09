/* eslint-env node */

'use strict';

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

const CachingWriter = require('broccoli-caching-writer');
const stringify = require('json-stable-stringify');
const localeEmoji = require('locale-emoji');
const hasUnicode = require('has-unicode');
const mkdirp = require('mkdirp');
const extend = require('extend');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const propKeys = require('../utils/prop-keys');
const forEachMessage = require('../utils/for-each-message');
const validateMessage = require('../utils/validate-message');

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

    this.options = Object.assign(
      {
        log() {}
      },
      options
    );

    this._supportsUnicode = hasUnicode();
  }

  normalizeLocale(locale) {
    if (typeof locale === 'string') {
      return locale.replace(/_/g, '-').toLowerCase();
    }

    return locale;
  }

  _logLocale(locale, message, options) {
    let fullMessage = `${locale}: ${message}`;
    if (this._supportsUnicode) {
      let emoji = localeEmoji(locale.replace(/-([a-z]{2})$/, (match, it) => `-${it.toUpperCase()}`));
      if (emoji) {
        fullMessage = `${emoji}  ${fullMessage}`;
      }
    }

    this._log(fullMessage, options);
  }

  _log(/*msg, options*/) {
    if (this.options.log) {
      return this.options.log.apply(undefined, arguments);
    }
  }

  findMissingTranslations(translations) {
    const locales = Object.keys(translations);

    // [['de',['foo.bar', 'bar.baz'], ['en',['foo.baz','bar.baz']]
    const localeKeys = locales.map(locale => [locale, propKeys(translations[locale])]);

    // create flattened list of all unique translation keys
    const allTranslationKeys = new Set(Array.prototype.concat(...localeKeys.map(([, keys]) => keys)));

    allTranslationKeys.forEach(key => {
      const notInLocales = localeKeys
        .filter(([, translationKeys]) => !translationKeys.includes(key))
        .map(([locale]) => `"${locale}"`);

      if (notInLocales.length) {
        this._log(`"${key}" was not found in ${notInLocales.join(', ')}`);
      }
    });
  }

  readDirectory(inputPath, listFiles) {
    let plugin = this;

    // sorted so that any translation path starts with `__addon__`
    // move to the head of the array.  this ensures the application's translations
    // take presidence over addon translations.
    let sortedPaths = listFiles.sort(a => {
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
    let translations = this.readDirectory(this.inputPaths[0], this.listFiles());
    let translation;
    mkdirp.sync(outputPath);

    if (this.options.verbose) {
      this.findMissingTranslations(translations);
    }

    for (let locale in translations) {
      if (translations.hasOwnProperty(locale)) {
        translation = translations[locale];

        if (this.options.verbose) {
          this.validateMessages(translation, locale);
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
        this._logLocale(locale, `"${key}" message can not be parsed: ${error.message}`, { warning: true });
      }
    });
  }
}

module.exports = TranslationReducer;
