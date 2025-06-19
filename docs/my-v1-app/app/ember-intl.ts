export const config = {
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  fallbackLocale: null,
  inputPath: 'translations',
  publicOnly: false,
  requiresTranslation(/* key, locale */) {
    return true;
  },
  stripEmptyTranslations: false,
  wrapTranslationsWithNamespace: false,
};
