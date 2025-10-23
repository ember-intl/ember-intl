const extractIcuArguments = require('./extract-icu-arguments');
const findMissingIcuArguments = require('./find-missing-icu-arguments');
const findMissingTranslations = require('./find-missing-translations');
const forEachMessage = require('../utils/for-each-message');

function preprocess(allTranslations) {
  const allIcuArguments = {};
  const localeKeys = [];
  const localeToIcuArguments = {};

  for (const [locale, translations] of Object.entries(allTranslations)) {
    const keys = [];
    localeToIcuArguments[locale] = {};

    forEachMessage(translations, (key, message) => {
      keys.push(key);

      const extractedIcuArguments = extractIcuArguments(message);

      localeToIcuArguments[locale][key] = extractedIcuArguments;

      allIcuArguments[key] = allIcuArguments[key] ?? new Set();

      extractedIcuArguments.forEach((icuArgument) => {
        allIcuArguments[key].add(icuArgument);
      });
    });

    localeKeys.push([locale, keys]);
  }

  return {
    allIcuArguments,
    localeKeys,
    localeToIcuArguments,
  };
}

function lintTranslations(allTranslations) {
  const result = {
    icuMismatch: [],
    missingTranslations: [],
  };

  const { allIcuArguments, localeKeys, localeToIcuArguments } =
    preprocess(allTranslations);

  const allLocales = Object.keys(allTranslations);

  const allTranslationKeys = new Set(
    Array.prototype.concat(...localeKeys.map(([, keys]) => keys)),
  );

  allTranslationKeys.forEach((key) => {
    const localesWithMissingTranslations = findMissingTranslations(
      key,
      localeKeys,
    );

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
