const extractICUArguments = require('./extract-icu-arguments');
const findLocalesMissingTranslation = require('./find-missing-translations');
const findMissingICUArguments = require('./find-missing-icu-arguments');
const forEachMessage = require('../utils/for-each-message');

module.exports = class Linter {
  constructor(options = {}) {
    this.options = options;
  }

  lint(translations) {
    const locales = Object.keys(translations);
    const result = {
      missingTranslations: [],
      icuMismatch: [],
    };

    // lookup table for language -> translationKey -> icuArguments
    // {de: {foo.bar: ['name']}}
    const icuArguments = {};

    // lookup table for translationKey -> all of its found ICUArguments
    // {foo.bar: ['name']}
    const allIcuArguments = {};

    // list of locales and all of their found translation keys
    // [['de',['foo.bar', 'bar.baz'], ['en',['foo.baz','bar.baz']]
    const localeKeys = locales.map((locale) => {
      const keys = [];
      icuArguments[locale] = icuArguments[locale] || {};

      forEachMessage(translations[locale], (key, value) => {
        keys.push(key);

        const extractedArguments = extractICUArguments(value);
        allIcuArguments[key] = allIcuArguments[key] || new Set();
        extractedArguments.forEach((arg) => allIcuArguments[key].add(arg));
        icuArguments[locale] = icuArguments[locale] || {};
        icuArguments[locale][key] = extractedArguments;
      });

      return [locale, keys];
    });

    // create flattened list of all unique translation keys
    const allTranslationKeys = new Set(
      Array.prototype.concat(...localeKeys.map(([, keys]) => keys)),
    );
    const { requiresTranslation } = this.options;

    allTranslationKeys.forEach((key) => {
      const translationMissingFromLocales = findLocalesMissingTranslation(
        key,
        localeKeys,
      );

      if (translationMissingFromLocales.length) {
        const alertableMissingTranslations =
          translationMissingFromLocales.filter((locale) =>
            requiresTranslation(key, locale),
          );

        if (alertableMissingTranslations.length) {
          result.missingTranslations.push([key, alertableMissingTranslations]);
        }
      }

      const localesToScanMissingICUArguments = locales.filter((locale) => {
        return !translationMissingFromLocales.includes(locale);
      });

      let missingICUArgs = findMissingICUArguments(
        key,
        allIcuArguments,
        localesToScanMissingICUArguments,
        icuArguments,
      );

      if (missingICUArgs.length) {
        result.icuMismatch.push([key, missingICUArgs]);
      }
    });

    return result;
  }
};
