# Configuration file

`ember-intl` strives to be "zero config." That is, its defaults should already cover 80% of the use cases. It supports the remaining ones with the help of a configuration file.

For v1 apps, create `config/ember-intl.js` (CJS). The file is to default-export a function, which returns the build options as an object. Only `@ember-intl/v1-compat` uses this file.

::: code-group

```js [config/ember-intl.js]
module.exports = function (/* environment */) {
  return {
    fallbackLocale: 'en-us',
  };
};
```

:::

For v2 apps, create `ember-intl.config.{js,mjs}` (ESM). The file must default-export an object, which may include `addonPaths`, `buildOptions`, and `lintRules`. Only `@ember-intl/lint` and `@ember-intl/vite` make use of this file.

::: code-group

```js [ember-intl.config.mjs]
export default {
  buildOptions: {
    fallbackLocale: 'en-us',
  },
};
```

:::

> [!TIP]
> 
> Only specify the key(s) whose default value you want to override. That is, your configuration file should easily show what's different about your app or addon.

> [!NOTE]
> 
> Any app or addon that uses `@ember-intl/lint` can have `ember-intl.config.{js,mjs}`.
> 
> As a result, v1 apps and v1 addons can have two configuration files with some duplicate code. Once you migrate a v1 app to v2, you can delete `config/ember-intl.js`. For v1 addons, delete `tests/dummy/config/ember-intl.js`.


## addonPaths {#addon-paths}

To include an addon's translations, specify the relative path to the addon's root.

::: code-group

```js [ember-intl.config.mjs]{2}
export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
};
```

:::

> [!TIP]
> 
> If multiple addons define the same key, the last appearing addon's translation wins. (This isn't possible with `@ember-intl/v1-compat`.)
> 
> You can override an addon's translation in the consuming app. If the app uses the same key in its own translation file, the app's translation always wins.


## buildOptions {#build-options}

The `buildOptions` object assumes the following shape and default values.

::: code-group

```ts [Signature]
type BuildOptions = {
  fallbackLocale: string | undefined;
  inputPath: string;
  publicOnly: boolean;  // Only for `@ember-intl/v1-compat`
  wrapTranslationsWithNamespace: boolean;
};
```

```ts [Default values]
const defaultBuildOptions = {
  fallbackLocale: undefined,
  inputPath: 'translations',
  publicOnly: false,  // Only for `@ember-intl/v1-compat`
  wrapTranslationsWithNamespace: false,
};
```

:::


### fallbackLocale {#build-options-fallback-locale}

Copies the fallback locale's translation to all other locales' that are missing a key.

::: code-group

```js [ember-intl.config.mjs]{3}
export default {
  buildOptions: {
    fallbackLocale: 'en-us',
  },
};
```

:::


### inputPath {#build-options-input-path}

Specifies where translations live relative to the project root.

For example, if an app has stored them in `public/assets/translations`:

::: code-group

```js [ember-intl.config.mjs]{3}
export default {
  buildOptions: {
    inputPath: 'public/assets/translations',
  },
};
```

:::

If a v1 addon's `dummy` app provides its own translations (these aren't published):

::: code-group

```js [tests/dummy/config/ember-intl.js]{3}
module.exports = function (/* environment */) {
  return {
    inputPath: 'tests/dummy/translations',
  };
};
```

:::


### publicOnly <Badge text="Only for v1 apps" type="warning" /> {#build-options-public-only}

Prevents the translations from being bundled with the application code. This enables lazily loading the translations.

::: code-group

```js [config/ember-intl.js]{3}
module.exports = function (/* environment */) {
  return {
    publicOnly: true,
  };
};
```

:::

For more information, see [Advanced - Lazy-loading translations](./lazy-loading-translations).


### wrapTranslationsWithNamespace {#build-options-wrap-translations-with-namespace}

Derives the key's namespace from the folder path. Can be used to separate translations by where they are used in the source directory.

::: code-group

```js [ember-intl.config.mjs]{3}
export default {
  buildOptions: {
    wrapTranslationsWithNamespace: true,
  },
};
```

:::

For more information, see [Advanced - Organizing translations](./organizing-translations).


## lintRules <Badge text="Only for @ember-intl/lint" type="warning" /> {#lint-rules}

To disable a rule, pass `false`.

::: code-group

```js [ember-intl.config.mjs]{3}
export default {
  lintRules: {
    'no-inconsistent-messages': false,
  },
};
```

:::

Lint rules may provide options (always configured as an object). For example, a rule may allow the `ignores` option so that you can ignore translation keys that fail. For simplicity, this option only supports exact matches.

::: code-group

```js [ember-intl.config.mjs]{4}
export default {
  lintRules: {
    'no-unused-keys': {
      ignores: ['hello.message'],
    },
  },
};
```

:::

Visit [`@ember-intl/lint`'s `README`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md#lint-rules) to learn more about the available rules.
