# Configuration

> [!TIP]
>
> `@ember-intl/lint` "just works" (zero config) when you follow conventions from Ember and `ember-intl`. For example, you explicitly inject the `intl` service, place translation files in `/translations`, and don't have dynamic translation keys.

A configuration file is used to handle these cases:

- Account for translations from addons
- Account for build options
- Disable a rule
- Ignore keys that fail a rule

To get started, create the file `ember-intl.config.{js,mjs}` in the root directory and default-export an object.

```js
/* ember-intl.config.mjs */
export default {};
```

```ts
type UserConfig = Partial<{
  addonPaths: string[];
  buildOptions: {
    inputPath: string;
    wrapTranslationsWithNamespace: boolean;
  };
  lintRules: Record<LintRule, boolean | LintOptions>;
}>;
```


## addonPaths

To include an addon's translations, specify the relative path to the addon's root.

```js
/* ember-intl.config.mjs */
export default {
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
};
```


## buildOptions

Copy-paste the build options that you defined in `config/ember-intl.js`. Only `inputPath` and `wrapTranslationsWithNamespace` are supported.

```js
/* ember-intl.config.mjs */
export default {
  buildOptions: {
    inputPath: 'public/assets/translations',
    wrapTranslationsWithNamespace: false,
  },
};
```


## lintRules

To disable a rule, pass `false`.

```js
/* ember-intl.config.mjs */
export default {
  lintRules: {
    'no-inconsistent-messages': false,
  },
};
```

To ignore keys that fail a rule, pass an object with the `ignores` key. For simplicity, only exact matches are supported.

```js
/* ember-intl.config.mjs */
export default {
  lintRules: {
    'no-unused-keys': {
      ignores: ['hello.message'],
    },
  },
};
```
