# Addon Configs

## Input Path

Path where translations are stored. This is relative to the project root.

For example, if your translations are stored as a npm/yarn dependency, then this path would look something like `'./node_modules/path/to/translations'`.

```js
// config/ember-intl.js
{
  inputPath: 'translations',
  ...
}
```


## Public Only

Prevents the translations from being bundled with the application code. This enables asynchronously loading the translations for the active locale by fetching them from the asset folder of the build.

```js
// config/ember-intl.js
{
  publicOnly: false,
  ...
}
```


## Wrap Translations with Namespace

Add the subdirectories of the translations as a namespace for all keys.

```js
// config/ember-intl.js
{
  wrapTranslationsWithNamespace: false,
  ...
}
```


## Error on Named Argument Mismatch

Cause a build error if ICU argument mismatches are detected between translations with the same key across all locales.

```js
// config/ember-intl.js
{
  errorOnNamedArgumentMismatch: false,
  ...
}
```


## Error on Missing Translations

Cause a build error if missing translations are detected.

```js
// config/ember-intl.js
{
  errorOnMissingTranslations: false,
  ...
}
```


## Strip Empty Translations

Removes empty translations from the build output.

```js
// config/ember-intl.js
{
  stripEmptyTranslations: false,
  ...
}
```


## Requires Translation

`requiresTranslation` is a function that is called whenever any translation key, from any locale, is missing at build time.

The default implementation requires all keys to be translated by all locales. For example, if my application supports locales en-US and fr-FR and I create a translation key "home.hero_title" then both locales must implement that key or a warning, or optionally an error, will present itself at build-time.

Example configuration:

```js
// config/ember-intl.js
{
  requiresTranslation(key, locale) {
    if (key.startsWith('wip.')) {
      // ignore any missing translations for keys starting with 'wip.'.
      return false;
    }

    if (locale === 'de') {
      // ignore any missing german translations.
      return false;
    }

    return true;
  }
  ...
}
```


## Fallback Locale

Merges the fallback locale's translations into all other locales as a build-time fallback strategy.

This will **not** prevent missing translation warnings or errors from occurring. It's meant as safety net when warnings are enabled. When enabled along with `errorOnMissingTranslations` any fallback attempts will result in an error.

```js
// config/ember-intl.js
{
  fallbackLocale: 'en-us',
  ...
}
```


## Filter Locales

If you need to distribute applications separately in different languages, now we can use `includeLocales` or `excludeLocales` configuration options.

```js
// config/ember-intl.js
{
  includeLocales: ['en-us', 'zh-cn'],
  ...
}
```

*Note, If you set both `includeLocales` and `excludeLocales` options, the `excludeLocales` wins!*