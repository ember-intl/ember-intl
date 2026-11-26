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
    dependencies: Partial<
      Record<'t' | 'tKey', { importName: string; importPath: string }[]>
    >;
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

### dependencies

To find the translation keys in use, the linter looks for these imports:

```js
export default {
  lintOptions: {
    dependencies: {
      t: [
        { importName: 't', importPath: 'ember-intl' },
        { importName: 'default', importPath: 'ember-intl/helpers/t' },
      ],
      tKey: [
        { importName: 'tKey', importPath: 'ember-intl' },
        { importName: 'default', importPath: 'ember-intl/helpers/t-key' },
      ],
    },
  },
};
```

If your project wraps `t` or `tKey`, list your own functions. A list replaces the default list for its kind, so copy each default entry that you still import. A kind that you leave out keeps its default.

```js
export default {
  lintOptions: {
    dependencies: {
      t: [
        { importName: 't', importPath: 'ember-intl' },
        { importName: 't', importPath: 'my-app/utils/intl' },
      ],
    },
  },
};
```

Note, `importPath` is compared with the import as written (including the file extension, if any), so prefer the package name or a `#` alias over a relative path. `importName` is a named export or `'default'`.

The option applies to `.gjs`, `.gts`, `.js`, and `.ts` files. In `.hbs` files, the linter looks for `t` and `t-key` only. The key must be the first argument.

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
