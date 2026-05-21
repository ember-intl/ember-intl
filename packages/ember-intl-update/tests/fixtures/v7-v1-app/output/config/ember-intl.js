module.exports = function (/* environment */) {
  return {
   /**
    * Path where translations are stored.  This is relative to the project root.
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
    * Add the subdirectories of the translations as a namespace for all keys.
    *
    * @property wrapTranslationsWithNamespace
    * @type {Boolean}
    * @default "false"
    */
   wrapTranslationsWithNamespace: false
  };
};
