module.exports = {
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  excludeLocales: null,
  fallbackLocale: null,
  includeLocales: null,
  inputPath: 'translations',
  outputPath: 'translations',
  publicOnly: false,
  requiresTranslation(/* key, locale */) {
    return true;
  },
  stripEmptyTranslations: false,
  wrapTranslationsWithNamespace: false,
};
