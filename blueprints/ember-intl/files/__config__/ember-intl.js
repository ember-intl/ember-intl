/*jshint node:true*/

module.exports = function (/* environment */) {
  return {
    /**
     * Merges the fallback locale's translations into all other locales as a
     * build-time fallback strategy.
     *
     * NOTE: a side effect of this option could result in missing translation warnings to be masked.
     *
     * @property fallbackLocale
     * @type {String?}
     * @default "null"
     */
    fallbackLocale: null,

    /**
     * Path where translations are kept.  This is relative to the project root.
     * For example, if your translations are an npm dependency, set this to:
     *`'./node_modules/path/to/translations'`
     *
     * @property inputPath
     * @type {String}
     * @default "'translations'"
     */
    inputPath: 'translations',

    /**
     * Prevents the translations from being bundled with the application code.
     * This enables asynchronously loading the translations for the active locale
     * by fetching them from the asset folder of the build.
     *
     * See: https://ember-intl.github.io/ember-intl/docs/guide/asynchronously-loading-translations
     *
     * @property publicOnly
     * @type {Boolean}
     * @default "false"
     */
    publicOnly: false,

    /**
     * Cause a build error if ICU argument mismatches are detected.
     *
     * @property errorOnNamedArgumentMismatch
     * @type {Boolean}
     * @default "false"
     */
    errorOnNamedArgumentMismatch: false,

    /**
     * Cause a build error if missing translations are detected.
     *
     * See https://ember-intl.github.io/ember-intl/docs/guide/missing-translations#throwing-a-build-error-on-missing-required-translation
     *
     * @property errorOnMissingTranslations
     * @type {Boolean}
     * @default "false"
     */
    errorOnMissingTranslations: false,

    /**
     * removes empty translations from the build output.
     *
     * @property stripEmptyTranslations
     * @type {Boolean}
     * @default false
     */
    stripEmptyTranslations: false,

    /**
     * Add the subdirectories of the translations as a namespace for all keys.
     *
     * @property wrapTranslationsWithNamespace
     * @type {Boolean}
     * @default false
     */
    wrapTranslationsWithNamespace: false,

    /**
     * Filter missing translations to ignore expected missing translations.
     *
     * See https://ember-intl.github.io/ember-intl/docs/guide/missing-translations#requiring-translations
     *
     * @property requiresTranslation
     * @type {Function}
     * @default "function(key,locale){return true}"
     */
    requiresTranslation(/* key, locale */) {
      return true;
    },
  };
};
