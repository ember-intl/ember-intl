module.exports = {
  publicOnly: false,
  fallbackLocale: null,
  includeLocales: null,
  excludeLocales: null,
  inputPath: 'translations',
  outputPath: 'translations',
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  wrapTranslationsWithNamespace: false,
  requiresTranslation(/* key, locale */) {
    return true;
  },
};
