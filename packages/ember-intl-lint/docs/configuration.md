# Configuration

A configuration file is used to handle these cases:

- Account for translations from addons
- Account for build options
- Configure lint rules

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
    inputPath: string;
    publicOnly: boolean;
    wrapTranslationsWithNamespace: boolean;
  }>;
  lintRules: Partial<Record<LintRule, boolean | LintOptions>>;
}>;
```

> [!TIP]
>
> The same file is used for `@ember-intl/lint` and `@ember-intl/vite`. The `Partial`'s in the `UserConfig` mean, you only need to specify the object keys that you need.


## addonPaths

To include an addon's translations, specify the relative path to the addon's root.

```js
export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
};
```

Note, if multiple addons define the same key, the last appearing addon's translation wins. (As always, the app's translation takes precedence over an addon's.)


## buildOptions

Build options dictate how translations are loaded and merged.

```js
export default {
  buildOptions: {
    fallbackLocale: 'en-us',
  },
};
```

For more information, see the [documentation site](https://ember-intl.github.io/ember-intl/docs/advanced/customizing-loading-of-translations#build-options).


## lintRules

To disable a rule, pass `false`.

```js
export default {
  lintRules: {
    'no-inconsistent-messages': false,
  },
};
```

Lint rules may provide options (always configured as an object). For example, a rule may allow the `ignores` option so that you can ignore translation keys that fail. For simplicity, this option only supports exact matches.

```js
export default {
  lintRules: {
    'no-unused-keys': {
      ignores: ['hello.message'],
    },
  },
};
```

See [docs/lint-rules](./lint-rules) to learn more about each rule and the options that it supports.
