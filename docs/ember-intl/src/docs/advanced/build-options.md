# Build options

`@ember-intl/v1-compat` and `@ember-intl/vite` support a few options for how translations are loaded and merged.

For v1 apps, create `config/ember-intl.js` (CJS). The file default-exports a function, which returns the build options as an object.

```js
module.exports = function (/* environment */) {
  return {
    fallbackLocale: 'en-us',
  };
};
```

For v2 apps, create `ember-intl.config.{js,mjs}` (ESM). The file default-exports an object, which may include `addonPaths`, `buildOptions`, and `lintRules`.

```js
export default {
  buildOptions: {
    fallbackLocale: 'en-us',
  },
};
```

## addonPaths {#config-addon-paths}

For v2 apps, to include an addon's translations, specify the relative path to the addon's root.

```js
export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
};
```

> [!NOTE]
> 
> If multiple addons define the same key, the last appearing addon's translation wins. (This isn't possible with `@ember-intl/v1-compat`.)
> 
> The app's translation always takes precedence over an addon's.


## buildOptions {#config-build-options}

Here are the options' names and default values.

```ts
type ConfigBuildOptions = {
  fallbackLocale: string | undefined;
  inputPath: string;
  publicOnly: boolean;  // Only for `@ember-intl/v1-compat`
  wrapTranslationsWithNamespace: boolean;
};

const defaultBuildOptions: ConfigBuildOptions = {
  fallbackLocale: undefined,
  inputPath: 'translations',
  publicOnly: false,  // Only for `@ember-intl/v1-compat`
  wrapTranslationsWithNamespace: false,
};
```



### fallbackLocale {#config-build-options-fallback-locale}

Copy the fallback locale's translations to all other locales as a fallback strategy.

```js
{
  fallbackLocale: 'en-us',
}
```


### inputPath {#config-build-options-input-path}

Where translations live relative to the project root.

For example, if an app has stored them in `public/assets/translations`:

```js
{
  inputPath: 'public/assets/translations',
}
```

If a v1 addon's `dummy` app provides its own translations (these aren't published):

```js
/* tests/dummy/config/ember-intl.js */
{
  inputPath: 'tests/dummy/translations',
}
```


### publicOnly {#config-build-options-public-only}

Prevents the translations from being bundled with the application code. This enables lazily loading the translations.

```js
{
  publicOnly: true,
}
```

For more information, see [Lazy-loading translations](./lazy-loading-translations).


### wrapTranslationsWithNamespace {#config-build-options-wrap-translations-with-namespace}

Derive the key's namespace from the folder path. This enables storing translations in subfolders whose structure closely resembles that of `app/components` and `app/templates`.

```js
{
  wrapTranslationsWithNamespace: true,
}
```

For more information, see [Organizing translations](./organizing-translations).
