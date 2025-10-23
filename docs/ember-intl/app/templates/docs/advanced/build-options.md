# Build options

`ember-intl` provides a few options for customizing the build step. Here are the options' names and default values.

```js
const defaultConfig = {
  errorOnMissingTranslations: false,
  errorOnNamedArgumentMismatch: false,
  fallbackLocale: null,
  inputPath: 'translations',
  publicOnly: false,
  wrapTranslationsWithNamespace: false,
};
```

You can create `config/ember-intl.js` to override a value.


## errorOnMissingTranslations

Throw an error if the translation is missing for some locale for some key.

```js
module.exports = function (/* environment */) {
  return {
    errorOnMissingTranslations: true,
  };
};
```


## errorOnNamedArgumentMismatch

Throw an error if the arguments aren't the same for all locales for some key.

```js
module.exports = function (/* environment */) {
  return {
    errorOnNamedArgumentMismatch: true,
  };
};
```


## fallbackLocale

Copy the fallback locale's translations to all other locales as a fallback strategy.

This does **not** prevent missing translation warnings and errors. It's meant to be a safety net for warnings. When `errorOnMissingTranslations` is enabled, a fallback results in an error.

```js
module.exports = function (/* environment */) {
  return {
    fallbackLocale: 'en-us',
  };
};
```


## inputPath

Where translations live relative to the project root.

For example, if an app has stored them in `public/assets/translations`:

```js
module.exports = function (/* environment */) {
  return {
    inputPath: 'public/assets/translations',
  };
};
```

If a v1 addon's `dummy` app provides its own translations (these aren't published):

```js
/* tests/dummy/config/ember-intl.js */
module.exports = function (/* environment */) {
  return {
    inputPath: 'tests/dummy/translations',
  };
};
```


## publicOnly

Prevents the translations from being bundled with the application code. This enables lazily loading the translations.

```js
module.exports = function (/* environment */) {
  return {
    publicOnly: true,
  };
};
```

For more information, see [Lazy-loading translations](./lazy-loading-translations).


## wrapTranslationsWithNamespace

Derive the key's namespace from the folder path. This enables storing translations in subfolders whose structure closely resembles that of `app/components` and `app/templates`.

```js
module.exports = function (/* environment */) {
  return {
    wrapTranslationsWithNamespace: true,
  };
};
```

For more information, see [Organizing translations](./organizing-translations).
