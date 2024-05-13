const CachingWriter = require('broccoli-caching-writer');
const stringify = require('json-stable-stringify');
const yaml = require('js-yaml');
const { basename, extname, join } = require('node:path');
const { mkdirSync, readFileSync, statSync, writeFileSync } = require('node:fs');

const Linter = require('./linter');
const forEachMessage = require('./utils/for-each-message');
const validateMessage = require('../../message-validator/validate-message');
const stripEmptyTranslations = require('./utils/strip-empty-translations');
const wrapWithNamespaceIfNeeded = require('./utils/wrap-with-namespace-if-needed');
const isKnownLanguage = require('./utils/is-known-language');
const enums = require('../enums');

function filterPatterns(locales) {
  if (Array.isArray(locales)) {
    return locales.map(
      (locale) =>
        new RegExp(`${normalizeLocale(locale)}.(json|yaml|yml)$`, 'i'),
    );
  }

  return null;
}

function isApp(filePath) {
  return !filePath.includes(`/${enums.addonNamespace}/`);
}

function normalizeLocale(locale) {
  if (typeof locale === 'string') {
    return locale.replace(/_/g, '-').trim().toLowerCase();
  }

  return locale;
}

function readAsObject(filePath) {
  const data = readFileSync(filePath);
  const ext = extname(filePath);

  switch (ext) {
    case '.json': {
      return JSON.parse(data);
    }

    case '.yaml':
    case '.yml': {
      return yaml.load(data);
    }
  }
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
      mergeTranslationFiles: false,
      ...options,
    };

    this.options.fallbackLocale = normalizeLocale(this.options.fallbackLocale);

    this.linter = new Linter({
      requiresTranslation: this.options.requiresTranslation,
    });
  }

  _log() {
    if (this.options.log) {
      return this.options.log(...arguments);
    }
  }

  mergeTranslations(filePaths) {
    const orderedFilePaths = filePaths.sort(function (filePath1, filePath2) {
      const isApp1 = isApp(filePath1);
      const isApp2 = isApp(filePath2);

      if (isApp1 && !isApp2) {
        return 1;
      }

      if (isApp2 && !isApp1) {
        return -1;
      }

      return 0;
    });

    // Map locale to a translation object
    const translations = {};

    orderedFilePaths.forEach((filePath) => {
      if (statSync(filePath).isDirectory()) {
        return;
      }

      let translationObject = readAsObject(filePath);

      if (this.options.stripEmptyTranslations === true) {
        translationObject = stripEmptyTranslations(translationObject);
      }

      if (!translationObject) {
        this._log(`cannot read path "${filePath}"`);

        return;
      }

      if (this.options.wrapTranslationsWithNamespace === true) {
        translationObject = wrapWithNamespaceIfNeeded(
          translationObject,
          filePath,
          this.inputPaths[0],
          this.options.addonsWithTranslations,
        );
      }

      const fileName = basename(filePath).split('.')[0];
      const locale = normalizeLocale(fileName);

      const oldValue = translations[locale] ?? {};
      const newValue = Object.assign({}, oldValue, translationObject);

      translations[locale] = newValue;
    });

    return translations;
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
    // Call listFiles() from broccoli-caching-writer
    const translationFilePaths = this.listFiles();

    const translations = this.mergeTranslations(translationFilePaths);
    const lintResults = this.linter.lint(translations);
    this.handleLintResult(lintResults);

    const filePath = join(this.outputPath, this.options.outputPath);
    const fallbackTranslationObject = translations[this.options.fallbackLocale];

    mkdirSync(filePath, { recursive: true });

    for (const locale in translations) {
      if (this.options.verbose) {
        this.validateMessages(translations[locale], locale);
      }

      if (fallbackTranslationObject && this.options.fallbackLocale !== locale) {
        const oldValue = translations[locale];
        const newValue = Object.assign({}, fallbackTranslationObject, oldValue);

        translations[locale] = newValue;
      }

      writeFileSync(
        join(filePath, `${locale}.json`),
        stringify(translations[locale]),
        {
          encoding: 'utf8',
        },
      );
    }

    if (this.options.mergeTranslationFiles) {
      const restructuredTranslations = [];

      for (const [locale, hash] of Object.entries(translations)) {
        restructuredTranslations.push([locale, hash]);
      }

      writeFileSync(
        join(filePath, 'translations.js'),
        'export default ' + stringify(restructuredTranslations),
        {
          encoding: 'utf8',
        },
      );
    }
  }

  validateMessages(messages, locale) {
    const language = locale.split('-')[0];

    if (!isKnownLanguage(language)) {
      const message = `${locale}: Unable to detect language data for "${language}". Language code is either unknown or invalid.`;

      this._log(message, {
        warning: true,
      });

      return false;
    }

    forEachMessage(messages, (key, message) => {
      try {
        validateMessage(message, locale);
      } catch (error) {
        const message = `${locale}: "${key}" message cannot be parsed: ${error.message}`;

        this._log(message, {
          warning: true,
        });
      }
    });
  }
}

module.exports = TranslationReducer;
