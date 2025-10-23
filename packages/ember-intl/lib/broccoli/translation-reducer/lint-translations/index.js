const extractICUArguments = require('./extract-icu-arguments');
const findMissingICUArguments = require('./find-missing-icu-arguments');
const findMissingTranslations = require('./find-missing-translations');
const forEachMessage = require('../utils/for-each-message');

function lintTranslations(translations) {
  const locales = Object.keys(translations);

  const result = {
    icuMismatch: [],
    missingTranslations: [],
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

  allTranslationKeys.forEach((key) => {
    const translationMissingFromLocales = findMissingTranslations(
      key,
      localeKeys,
    );

    if (translationMissingFromLocales.length) {
      result.missingTranslations.push([key, translationMissingFromLocales]);
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

module.exports = lintTranslations;
