/*jshint node:true*/

module.exports = function(/* environment */) {
  return {
    /**
     * The locales that the application needs to support.
     *
     * NOTE: this is optional and is automatically set *if* you store translations
     * within the `inputPath` defined below.
     *
     * If you side load translations, you must then explicitly
     * list out the locales. i.e: ['en-us', 'en-gb', 'fr-fr']
     *
     * @property locales
     * @type {Array?}
     * @default "null"
     */
    locales: null,

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
     * Automatically inject the Intl.JS polyfill into index.html
     *
     * @property autoPolyfill
     * @type {Boolean}
     * @default "false"
     */
    autoPolyfill: false,

    /**
     * Prevents the polyfill from being bundled in the asset folder of the build
     *
     * @property disablePolyfill
     * @type {Boolean}
     * @default "false"
     */
    disablePolyfill: false,

    /**
     * Prevents the translations from being bundled with the application code.
     * This enables asynchronously loading the translations for the active locale
     * by fetching them from the asset folder of the build.
     *
     * See: https://github.com/ember-intl/ember-intl/blob/master/docs/asynchronously-loading-translations.md
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
     * See https://github.com/ember-intl/ember-intl/blob/master/docs/missing-translations.md#throwing-a-build-error-on-missing-required-translation
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
     * Filter missing translations to ignore expected missing translations.
     *
     * See https://github.com/ember-intl/ember-intl/blob/master/docs/missing-translations.md#requiring-translations
     *
     * @property requiresTranslation
     * @type {Function}
     * @default "function(key,locale){return true}"
     */
    requiresTranslation(/* key, locale */) {
      return true;
    }
  };
};
