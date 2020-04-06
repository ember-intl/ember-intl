function findMissingTranslations(key, localeKeys, requiresTranslation) {
  return localeKeys
    .filter(([locale, translationKeys]) => !translationKeys.includes(key) && requiresTranslation(key, locale))
    .map(([locale]) => locale);
}

module.exports = findMissingTranslations;
