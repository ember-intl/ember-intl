/* eslint-env node */

'use strict';

module.exports = {
  publicOnly: false,
  fallbackLocale: null,
  inputPath: 'translations',
  outputPath: 'translations',
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  wrapTranslationsWithNamespace: false,
  requiresTranslation(/* key, locale */) {
    return true;
  },
};
