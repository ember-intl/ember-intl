# Configuration

A configuration file is used to handle these cases:

- Account for translations from addons
- Configure build
- Configure lint

To get started, create the file `ember-intl.config.{js,mjs}` in the root directory and default-export an object.

```js
export default {};
```

The object takes the following shape:

```ts
type UserConfig = Partial<{
  addonPaths: string[];
  buildOptions: Partial<{
    fallbackLocale: string | undefined;
    namespaceKeysByDir: boolean;
    translationsDir: string;
  }>;
  lintOptions: Partial<{
    dependencies: {
      importName: string;
      importPath: string;
    }[];
    rules: Partial<Record<LintRule, boolean | LintRuleOptions>>;
  }>;
}>;
```

> [!TIP]
>
> The same file is used for `@ember-intl/lint` and `@ember-intl/vite`. The `Partial`'s in the `UserConfig` mean, you only need to specify the object keys that you need.

> [!TIP]
>
> Create the file `ember-intl.config.{mts,ts}` to get type checks.
>
> ```ts
> import type { UserConfig } from 'ember-intl/config';
>
> export default {
>   // ...
> } satisfies UserConfig;
> ```
>
> `UserConfig` uses `Partial`'s, which can unintentionally allow `undefined`. In `tsconfig.json`, set `compilerOptions.exactOptionalPropertyTypes` to `true` for strict type checks.


## addonPaths

To include an addon's translations, specify the relative path to the addon's root.

```js
export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
};
```

Note, if multiple addons define the same key, the last appearing addon's translation wins. (As always, the app's translation takes precedence over an addon's.)


## buildOptions

Build options change how translations are loaded and merged.

```js
export default {
  buildOptions: {
    fallbackLocale: 'en-us',
  },
};
```

For more information, see the [documentation site](https://ember-intl.github.io/ember-intl/docs/advanced/configuration-file#build-options).


## lintOptions

### rules

To disable a rule, pass `false`.

```js
export default {
  lintOptions: {
    rules: {
      'no-inconsistent-messages': false,
    },
  },
};
```

Lint rules may provide options (always configured as an object). For example, a rule may allow the `ignores` option so that you can ignore translation keys that fail.

```js
export default {
  lintOptions: {
    rules: {
      'no-unused-keys': {
        ignores: ['hello.message', /^backend\.error\./],
      },
    },
  },
};
```

See [docs/lint-rules](./lint-rules) to learn more about each rule and the options that it supports.

### dependencies

This option lets the linter recognize whichever translation function the config names, so it is no longer hard-coupled to ember-intl's own `t`.

```js
export default {
  lintOptions: {
    dependencies: [
      { importName: 't', importPath: 'my-app/utils/intl' },
      { importName: 'default', importPath: 'my-app/utils/translation-key' },
    ],
  },
};
```

`importName` is a named export, or `'default'`. A dependency listed here is treated like ember-intl's `t`. ember-intl's own `t`, `tKey` and the `intl` service stay recognized.

Limitations:

- `importPath` is matched exactly as written in your code, including any file extension.
- The key must be the first argument, as a string, of a direct call (`t('key')`) or a helper in a `<template>` tag (`{{t "key"}}`).
- Classic `.hbs` templates and namespace imports (`import * as intl from '...'`) are not covered.
