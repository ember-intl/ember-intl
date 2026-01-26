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
    wrapTranslationsWithNamespace: boolean;
  }>;
  lintRules: Partial<Record<LintRule, boolean | LintOptions>>;
}>;
```

> [!TIP]
>
> The same file is used for `@ember-intl/lint` and `@ember-intl/vite`. The `Partial`'s in `UserConfig` above mean, you only need to specify the object keys that you need.


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

For more information, see the [documentation site](https://ember-intl.github.io/ember-intl/docs/advanced/build-options#buildoptions).


## lintRules

`@ember-intl/vite` doesn't use `lintRules`. See [`@ember-intl/lint`](../../ember-intl-lint/docs/configuration.md#lintrules).
