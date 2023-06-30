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

const Linter = require('./linter');
const forEachMessage = require('./utils/for-each-message');
const validateMessage = require('../../message-validator/validate-message');
const stripEmptyTranslations = require('./utils/strip-empty-translations');
const wrapWithNamespaceIfNeeded = require('./utils/wrap-with-namespace-if-needed');
const isKnownLanguage = require('./utils/is-known-language');
const enums = require('../enums');

function readAsObject(filepath) {
  const data = fs.readFileSync(filepath);
  const ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
  }
}

function normalizeLocale(locale) {
  if (typeof locale === 'string') {
    return locale.replace(/_/g, '-').trim().toLowerCase();
  }

  return locale;
}

function filterPatterns(locales) {
  if (Array.isArray(locales)) {
    return locales.map(
      (locale) =>
        new RegExp(`${normalizeLocale(locale)}.(json|yaml|yml)$`, 'i'),
    );
  }

  return null;
}

class TranslationReducer extends CachingWriter {
  constructor(inputNode, options) {
    if (!Array.isArray(inputNode)) {
      inputNode = [inputNode];
    }

    const cacheInclude = filterPatterns(options && options.includeLocales);
    const cacheExclude = filterPatterns(options && options.excludeLocales);

    super(inputNode, {
      annotation: 'Translation Reducer',
      cacheInclude,
      cacheExclude,
    });

    this.options = {
      outputPath: '',
      fallbackLocale: null,
      log() {},
      requiresTranslation(/* key, locale */) {
        return true;
      },
      ...options,
    };

    this.options.fallbackLocale = normalizeLocale(this.options.fallbackLocale);

    this.linter = new Linter({
      requiresTranslation: this.options.requiresTranslation,
    });

    this.supportsUnicode = hasUnicode();
  }

  _logLocale(locale, message, options) {
    let fullMessage = `${locale}: ${message}`;

    if (this.supportsUnicode) {
      let emoji = localeEmoji(
        locale.replace(/-([a-z]{2})$/, (match, it) => `-${it.toUpperCase()}`),
      );

      if (emoji) {
        fullMessage = `${emoji}  ${fullMessage}`;
      }
    }

    this._log(fullMessage, options);
  }

  _log() {
    if (this.options.log) {
      return this.options.log(...arguments);
    }
  }

  mergeTranslations(listFiles) {
    const addonPrefix = `/${enums.addonNamespace}/`;
    const orderedTranslations = listFiles.sort(function (fileA, fileB) {
      // Orders all the addons at the top and the application last.
      // This way the application wins if there is a translation conflict.
      if (fileA.includes(addonPrefix) && !fileB.includes(addonPrefix)) {
        return -1;
      }

      if (!fileA.includes(addonPrefix) && fileB.includes(addonPrefix)) {
        return 1;
      }

      return 0;
    });

    return orderedTranslations.reduce((accum, filepath) => {
      if (fs.statSync(filepath).isDirectory()) {
        return accum;
      }

      let translation = readAsObject(filepath);

      // TODO: make the default in 6.0.0
      if (this.options.stripEmptyTranslations === true) {
        translation = stripEmptyTranslations(translation);
      }

      if (!translation) {
        this._log(`cannot read path "${filepath}"`);

        return accum;
      }

      if (this.options.wrapTranslationsWithNamespace === true) {
        translation = wrapWithNamespaceIfNeeded(
          translation,
          filepath,
          this.inputPaths[0],
          this.options.addonsWithTranslations,
        );
      }

      let filename = path.basename(filepath).split('.')[0];
      let localeName = normalizeLocale(filename);

      return extend(true, accum, {
        [localeName]: translation,
      });
    }, {});
  }

  generateFilename(locale) {
    if (typeof this.options.filename === 'function') {
      return this.options.filename(locale);
    }

    return `${locale}.json`;
  }

  handleLintResult(result) {
    const { icuMismatch, missingTranslations } = result;
    const throwingMessages = [];

    if (icuMismatch.length) {
      const missingICUArguments = icuMismatch.map(([key, notInLocales]) => {
        const missingString = notInLocales
          .map(
            ([locale, missingICUArgs]) =>
              `"${locale}": ${missingICUArgs
                .map((arg) => `"${arg}"`)
                .join(', ')}`,
          )
          .join(', ');

        return `"${key}" ICU argument mismatch: ${missingString}`;
      });

      if (
        this.options.verbose &&
        // log messages if not failing as it's duplicated console output
        !this.options.errorOnNamedArgumentMismatch
      ) {
        missingICUArguments.forEach((message) => this._log(message));
      }

      if (this.options.errorOnNamedArgumentMismatch) {
        throwingMessages.push(
          'ICU arguments mismatch:\n' +
            missingICUArguments.map((text) => `- ${text}`).join('\n'),
        );
      }
    }

    if (missingTranslations.length) {
      const missingTranslationMessages = missingTranslations.map(
        ([key, notInLocales]) =>
          `"${key}" was not found in ${notInLocales
            .map((locale) => `"${locale}"`)
            .join(', ')}`,
      );

      if (
        this.options.verbose &&
        // log messages if not failing as it's duplicated console output
        !this.options.errorOnMissingTranslations
      ) {
        missingTranslationMessages.forEach((message) => this._log(message));
      }

      if (this.options.errorOnMissingTranslations) {
        throwingMessages.push(
          'Missing translations:\n' +
            missingTranslationMessages.map((text) => `- ${text}`).join('\n'),
        );
      }
    }

    if (throwingMessages.length) {
      throw new Error(throwingMessages.join('\n\n'));
    }
  }

  build() {
    const translations = this.mergeTranslations(this.listFiles());
    const lintResults = this.linter.lint(translations);
    this.handleLintResult(lintResults);

    const filepath = path.join(this.outputPath, this.options.outputPath);
    const fallbacks = translations[this.options.fallbackLocale];

    mkdirp.sync(filepath);

    for (const locale in translations) {
      if (this.options.verbose) {
        this.validateMessages(translations[locale], locale);
      }

      if (fallbacks && this.options.fallbackLocale !== locale) {
        translations[locale] = extend(
          true,
          {},
          fallbacks,
          translations[locale],
        );
      }

      fs.writeFileSync(
        `${filepath}/${this.generateFilename(locale)}`,
        stringify(translations[locale]),
        {
          encoding: 'utf8',
        },
      );
    }
  }

  validateMessages(messages, locale) {
    const language = locale.split('-')[0];

    if (!isKnownLanguage(language)) {
      this._logLocale(
        locale,
        `Unable to detect language data for "${language}". Language code is either unknown or invalid.`,
        {
          warning: true,
        },
      );

      return false;
    }

    forEachMessage(messages, (key, message) => {
      try {
        validateMessage(message, locale);
      } catch (error) {
        this._logLocale(
          locale,
          `"${key}" message cannot be parsed: ${error.message}`,
          { warning: true },
        );
      }
    });
  }
}

module.exports = TranslationReducer;
