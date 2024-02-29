function findLocalesMissingTranslation(key, localeKeys) {
  return localeKeys
    .filter(([, translationKeys]) => {
      return !translationKeys.includes(key);
    })
    .map(([locale]) => {
      return locale;
    });
}

module.exports = findLocalesMissingTranslation;
