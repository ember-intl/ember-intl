const { mkdirSync, statSync, writeFileSync } = require('node:fs');
const { basename, join } = require('node:path');
const CachingWriter = require('broccoli-caching-writer');
const extend = require('extend');
const stringify = require('json-stable-stringify');

const lintTranslations = require('./lint-translations');
const forEachMessage = require('./utils/for-each-message');
const getTranslations = require('./utils/get-translations');
const isKnownLanguage = require('./utils/is-known-language');
const namespaceKeys = require('./utils/namespace-keys');
const validateMessage = require('../../message-validator/validate-message');

function isApp(filePath) {
  return !filePath.includes('/__ember-intl-addon__/');
}

function normalizeLocale(locale) {
  if (typeof locale === 'string') {
    return locale.replace(/_/g, '-').trim().toLowerCase();
  }

  return locale;
}

class TranslationReducer extends CachingWriter {
  constructor(inputNode, options) {
    if (!Array.isArray(inputNode)) {
      inputNode = [inputNode];
    }

    super(inputNode, {
      annotation: 'Translation Reducer',
    });

    this.options = {
      fallbackLocale: undefined,
      log() {},
      mergeTranslationFiles: false,
      outputPath: '',
      ...options,
    };

    this.options.fallbackLocale = normalizeLocale(this.options.fallbackLocale);
  }

  build() {
    // Call listFiles() from broccoli-caching-writer
    const translationFilePaths = this.listFiles();
    const translations = this.mergeTranslations(translationFilePaths);

    this.checkTranslations(translations);

    const filePath = join(this.outputPath, this.options.outputPath);
    const fallbackTranslationObject = translations[this.options.fallbackLocale];

    mkdirSync(filePath, { recursive: true });

    for (const locale in translations) {
      this.validateMessages(translations[locale], locale);

      if (fallbackTranslationObject && this.options.fallbackLocale !== locale) {
        translations[locale] = extend(
          true,
          {},
          fallbackTranslationObject,
          translations[locale],
        );
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

  checkTranslations(translations) {
    const { icuMismatch, missingTranslations } = lintTranslations(translations);
    const messages = [];

    if (this.options.errorOnNamedArgumentMismatch && icuMismatch.length) {
      const messageItems = icuMismatch.map(([key, notInLocales]) => {
        const list = notInLocales
          .map(([locale, missingICUArgs]) => {
            const sublist = missingICUArgs.map((arg) => `"${arg}"`).join(', ');

            return `"${locale}": ${sublist}`;
          })
          .join(', ');

        return `- "${key}" ICU argument mismatch: ${list}`;
      });

      messages.push(['ICU arguments mismatch:', ...messageItems].join('\n'));
    }

    if (this.options.errorOnMissingTranslations && missingTranslations.length) {
      const messageItems = missingTranslations.map(([key, notInLocales]) => {
        const list = notInLocales.map((locale) => `"${locale}"`).join(', ');

        return `- "${key}" was not found in ${list}`;
      });

      messages.push(['Missing translations:', ...messageItems].join('\n'));
    }

    if (messages.length === 0) {
      return;
    }

    throw new Error(messages.join('\n\n'));
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

    const translations = orderedFilePaths.reduce((accumulator, filePath) => {
      if (statSync(filePath).isDirectory()) {
        return accumulator;
      }

      let translationObject = getTranslations(filePath);

      if (!translationObject) {
        this.options.log(`cannot read path "${filePath}"`);

        return accumulator;
      }

      if (this.options.wrapTranslationsWithNamespace === true) {
        translationObject = namespaceKeys(translationObject, {
          addonNames: this.options.addonsWithTranslations,
          filePath,
          inputPath: this.inputPaths[0],
        });
      }

      const fileName = basename(filePath).split('.')[0];
      const locale = normalizeLocale(fileName);

      return extend(true, accumulator, {
        [locale]: translationObject,
      });
    }, {});

    return translations;
  }

  validateMessages(messages, locale) {
    const language = locale.split('-')[0];

    if (!isKnownLanguage(language)) {
      const message = `${locale}: Unable to detect language data for "${language}". Language code is either unknown or invalid.`;

      this.options.log(message);

      return false;
    }

    forEachMessage(messages, (key, message) => {
      try {
        validateMessage(message, locale);
      } catch (error) {
        const message = `${locale}: "${key}" message cannot be parsed: ${error.message}`;

        this.options.log(message);
      }
    });
  }
}

module.exports = TranslationReducer;
