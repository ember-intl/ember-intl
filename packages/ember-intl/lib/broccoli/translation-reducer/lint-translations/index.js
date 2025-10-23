const extractIcuArguments = require('./extract-icu-arguments');
const findMissingIcuArguments = require('./find-missing-icu-arguments');
const findMissingTranslations = require('./find-missing-translations');
const forEachMessage = require('../utils/for-each-message');

function preprocess(allTranslations) {
  const allIcuArguments = {};
  const allKeys = new Set();
  const localeToIcuArguments = {};
  const localeToKeys = {};

  for (const [locale, translations] of Object.entries(allTranslations)) {
    const keys = new Set();
    localeToIcuArguments[locale] = {};

    forEachMessage(translations, (key, message) => {
      allKeys.add(key);
      keys.add(key);

      const extractedIcuArguments = extractIcuArguments(message);

      localeToIcuArguments[locale][key] = extractedIcuArguments;

      allIcuArguments[key] = allIcuArguments[key] ?? new Set();

      extractedIcuArguments.forEach((icuArgument) => {
        allIcuArguments[key].add(icuArgument);
      });
    });

    localeToKeys[locale] = keys;
  }

  return {
    allIcuArguments,
    allKeys,
    localeToIcuArguments,
    localeToKeys,
  };
}

function lintTranslations(allTranslations) {
  const result = {
    icuMismatch: [],
    missingTranslations: [],
  };

  const { allIcuArguments, allKeys, localeToIcuArguments, localeToKeys } =
    preprocess(allTranslations);

  const allLocales = Object.keys(allTranslations);

  allKeys.forEach((key) => {
    const localesWithMissingTranslations = findMissingTranslations(key, {
      localeToKeys,
    });

    if (localesWithMissingTranslations.length) {
      result.missingTranslations.push([key, localesWithMissingTranslations]);
    }

    const localesToScanMissingICUArguments = allLocales.filter((locale) => {
      return !localesWithMissingTranslations.includes(locale);
    });

    const localesWithIcuMismatch = findMissingIcuArguments(key, {
      allIcuArguments,
      locales: localesToScanMissingICUArguments,
      localeToIcuArguments,
    });

    if (localesWithIcuMismatch.length) {
      result.icuMismatch.push([key, localesWithIcuMismatch]);
    }
  });

  return result;
}

module.exports = lintTranslations;
