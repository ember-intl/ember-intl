# Configuration

Here are the settings that you can change in `config/ember-intl.js`.


## errorOnMissingTranslations

Cause a build error if translations are missing.

```js
{
  // Default: false
  errorOnMissingTranslations: true,
}
```


## errorOnNamedArgumentMismatch

Cause a build error if ICU arguments don't match across locales for some key.

```js
{
  // Default: false
  errorOnNamedArgumentMismatch: true,
}
```


## excludeLocales, includeLocales

Publish an app multiple times, each with a different locale.

```js
{
  // Default: null
  includeLocales: ['de-de'],
}
```

If you set both `includeLocales` and `excludeLocales` options, the `excludeLocales` wins.


## fallbackLocale

Copy the fallback locale's translations to all other locales as a build-time fallback strategy.

This does **not** prevent missing translation warnings or errors. It's meant as safety net when warnings are enabled. When `errorOnMissingTranslations` is enabled, any fallback attempt will result in an error.

```js
{
  // Default: null
  fallbackLocale: 'en-us',
}
```


## inputPath

Path where translations are stored. This is relative to the project root.

For example, if your translations are stored as a npm/yarn dependency, then this path would look something like `'./node_modules/path/to/translations'`.

```js
{
  // Default: 'translations'
  inputPath: 'my-translations',
}
```


## publicOnly

Prevents the translations from being bundled with the application code. This enables lazily loading the translations.

```js
{
  // Default: false
  publicOnly: true,
}
```


## requiresTranslation

`requiresTranslation` is a function that is called when a translation key, from any locale, is missing at build time.

The default implementation requires all locales to have every key provide a translation message.

```js
{
  // Default: () => true
  requiresTranslation(key, locale) {
    // Allow keys that start with 'legacy.' to have a missing translation
    if (key.startsWith('legacy.')) {
      return false;
    }

    // Allow 'de-de' locale to have keys with a missing translation
    if (locale === 'de-de') {
      return false;
    }

    return true;
  },
}
```


## stripEmptyTranslations

Removes empty translations from the build output.

```js
{
  // Default: false
  stripEmptyTranslations: true,
}
```


## wrapTranslationsWithNamespace

Add the subdirectories of the translations as a namespace for all keys.

```js
{
  // Default: false
  wrapTranslationsWithNamespace: true,
}
```
