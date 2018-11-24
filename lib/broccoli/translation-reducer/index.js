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

const forEachMessage = require('./utils/for-each-message');
const validateMessage = require('./utils/validate-message');
const stripNestedNulls = require('./utils/strip-nested-nulls');
const extractICUArguments = require('./utils/extract-icu-arguments');
const findMissingTranslations = require('./utils/find-missing-translations');
const findMissingICUArguments = require('./utils/find-missing-icu-arguments');

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
        outputPath: '',
        fallbackLocale: null,
        log() {},
        requiresTranslation(/* key, locale */) {
          return true;
        }
      },
      options
    );

    this.options.fallbackLocale = this.normalizeLocale(this.options.fallbackLocale);
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

  lintTranslations(translations) {
    const locales = Object.keys(translations);
    const result = {
      missingTranslations: [],
      icuMismatch: []
    };

    // lookup table for language -> translationKey -> icuArguments
    // {de: {foo.bar: ['name']}}
    const icuArguments = {};

    // lookup table for translationKey -> all of its found ICUArguments
    // {foo.bar: ['name']}
    const allIcuArguments = {};

    // list of locales and all of their found translation keys
    // [['de',['foo.bar', 'bar.baz'], ['en',['foo.baz','bar.baz']]
    const localeKeys = locales.map(locale => {
      const keys = [];
      icuArguments[locale] = icuArguments[locale] || {};

      forEachMessage(translations[locale], (key, value) => {
        keys.push(key);

        const extractedArguments = extractICUArguments(value);

        allIcuArguments[key] = allIcuArguments[key] || new Set();
        extractedArguments.forEach(arg => allIcuArguments[key].add(arg));
        icuArguments[locale] = icuArguments[locale] || {};
        icuArguments[locale][key] = extractedArguments;
      });

      return [locale, keys];
    });

    // create flattened list of all unique translation keys
    const allTranslationKeys = new Set(Array.prototype.concat(...localeKeys.map(([, keys]) => keys)));

    allTranslationKeys.forEach(key => {
      const notInLocales = findMissingTranslations(key, localeKeys, this.options.requiresTranslation);

      if (notInLocales.length) {
        result.missingTranslations.push([key, notInLocales]);
      }

      const missingICUArgs = findMissingICUArguments(key, allIcuArguments, locales, icuArguments);

      if (missingICUArgs.length) {
        result.icuMismatch.push([key, missingICUArgs]);
      }
    });

    return result;
  }

  reduce(listFiles) {
    return listFiles.reduce((accum, filepath) => {
      if (fs.statSync(filepath).isDirectory()) {
        return accum;
      }

      let translation = readAsObject(filepath);

      if (this.options.stripEmptyTranslations === true) {
        translation = stripNestedNulls(translation);
      }

      if (!translation) {
        this._log(`cannot read path "${filepath}"`);

        return accum;
      }

      let filename = path.basename(filepath).split('.')[0];
      let localeName = this.normalizeLocale(filename);

      return extend(true, accum, {
        [localeName]: translation
      });
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

  handleLintResult(result) {
    const { icuMismatch, missingTranslations } = result;
    const throwingMessages = [];

    if (icuMismatch.length) {
      const missingICUArguments = icuMismatch.map(([key, notInLocales]) => {
        const missingString = notInLocales
          .map(([locale, missingICUArgs]) => `"${locale}": ${missingICUArgs.map(arg => `"${arg}"`).join(', ')}`)
          .join(', ');

        return `"${key}" ICU argument missing: ${missingString}`;
      });

      if (
        this.options.verbose &&
        // log messages if not failing as it's duplicated console output
        !this.options.errorOnNamedArgumentMismatch
      ) {
        missingICUArguments.forEach(message => this._log(message));
      }

      if (this.options.errorOnNamedArgumentMismatch) {
        throwingMessages.push('ICU arguments mismatch:\n' + missingICUArguments.map(text => `- ${text}`).join('\n'));
      }
    }

    if (missingTranslations.length) {
      const missingTranslationMessages = missingTranslations.map(
        ([key, notInLocales]) => `"${key}" was not found in ${notInLocales.map(locale => `"${locale}"`).join(', ')}`
      );

      if (
        this.options.verbose &&
        // log messages if not failing as it's duplicated console output
        !this.options.errorOnMissingTranslations
      ) {
        missingTranslationMessages.forEach(message => this._log(message));
      }

      if (this.options.errorOnMissingTranslations) {
        throwingMessages.push(
          'Missing translations:\n' + missingTranslationMessages.map(text => `- ${text}`).join('\n')
        );
      }
    }

    if (throwingMessages.length) {
      throw new Error(throwingMessages.join('\n\n'));
    }
  }

  build() {
    let translations = this.reduce(this.listFiles());
    let fallbacks = translations[this.options.fallbackLocale];
    let filepath = path.join(this.outputPath, this.options.outputPath);

    this.handleLintResult(this.lintTranslations(translations));
    mkdirp.sync(filepath);

    for (let locale in translations) {
      if (this.options.verbose) {
        this.validateMessages(translations[locale], locale);
      }

      if (fallbacks && this.options.fallbackLocale !== locale) {
        translations[locale] = extend(true, {}, fallbacks, translations[locale]);
      }

      fs.writeFileSync(`${filepath}/${this.filename(locale)}`, this.wrapEntry(translations[locale]), {
        encoding: 'utf8'
      });
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
