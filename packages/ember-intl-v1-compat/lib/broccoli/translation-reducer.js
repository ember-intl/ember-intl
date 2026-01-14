const { mkdirSync, statSync, writeFileSync } = require('node:fs');
const { basename, join } = require('node:path');
const CachingWriter = require('broccoli-caching-writer');
const extend = require('extend');
const stringify = require('json-stable-stringify');

const getTranslations = require('../utils/translation-reducer/get-translations');
const namespaceKeys = require('../utils/translation-reducer/namespace-keys');

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

    const filePath = join(this.outputPath, this.options.outputPath);
    const fallbackTranslationObject = translations[this.options.fallbackLocale];

    mkdirSync(filePath, { recursive: true });

    for (const locale in translations) {
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
}

module.exports = TranslationReducer;
