# Quickstart (Apps)

## 1. Install ember-intl {#1-install-ember-intl}

### v1 apps {#1-install-ember-intl-v1-apps}

Use your package manager to install `ember-intl` and `@ember-intl/v1-compat`.

```sh {:no-line-numbers}
pnpm add -D ember-intl @ember-intl/v1-compat
```

Next, create the folder `translations` as a sibling to `app`.

```sh {:no-line-numbers}
my-app
├── app
└── translations
```

When you run the app, `@ember-intl/v1-compat` will automatically load the translation files.


### v2 apps {#1-install-ember-intl-v2-apps}

Use your package manager to install `ember-intl` and `@ember-intl/vite`.

```sh {:no-line-numbers}
pnpm add -D ember-intl @ember-intl/vite
```

In `vite.config.mjs`, add `loadTranslations` to the list of plugins.

::: code-group

```js [vite.config.mjs]{1,14}
import { loadTranslations } from '@ember-intl/vite';
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    loadTranslations(),
  ],
});
```

:::

Next, create the folder `translations` as a sibling to `app`.

```sh {:no-line-numbers}
my-app
├── app
└── translations
```

When you run the app, `@ember-intl/vite` won't automatically load the translation files. You will manually load them in [4. Set up ember-intl - v2 apps](#4-set-up-ember-intl-v2-apps).


## 2. Define translations {#2-define-translations}

Create a translation in `translations/en-us.yaml`.

::: code-group

```yaml [translations/en-us.yaml]
hello.message: "Hello, {name}!"
```

:::

To render the translation in a component's or route's template, import the `t` helper and call it inside a `<template>` tag.

::: code-group

```gts [app/templates/application.gts]{1,4}
import { t } from 'ember-intl';

<template>
  {{t "hello.message" name="Zoey"}}
</template>
```

:::

> [!IMPORTANT]
> 
> This guide will show examples of templates only in "strict mode." Strict means, the template lives inside a `<template>` tag in a `*.{gjs,gts}` file, and you use `import` to get what you need from `ember-intl`.
>
> In older projects, you can still use `ember-intl`'s helpers in "loose mode," i.e. in an `*.hbs` file or an `<hbs>` tag in rendering tests. To do so, you skip the import and dasherize a helper's name (e.g. `formatDate` in strict mode becomes `format-date` in loose, while `t` is the same by chance).
> 
> ::: code-group
> 
> ```hbs [app/templates/application.hbs]
> {{t "hello.message" name="Zoey"}}
> ```
> 
> :::
> 
> For more information, see [Helpers - `<template>` tag](./helpers/template-tag).



## 3. Define languages {#3-define-languages}

Create the file `translations/de-de.yaml` to support the `de-de` locale. (Throughout the guide, we use the terms "language" and "locale" interchangeably.)

::: code-group

```yaml [translations/de-de.yaml]
hello.message: "Hallo, {name}!"
```

:::

> [!NOTE]
> 
> You can also use `.yml` or `.json`. Here is the JSON equivalent of the YAML code above.
> 
> ::: code-group
> 
> ```json [translations/de-de.json]
> {
>   "hello.message": "Hallo, {name}!"
> }
> 
> :::


## 4. Set up ember-intl {#4-set-up-ember-intl}

Before your app renders, you need to tell `ember-intl` which locale(s) to use. Since timing is a factor, we set up `ember-intl` in the `application` route's `beforeModel` hook.


### v1 apps {#4-set-up-ember-intl-v1-apps}

Recall that `@ember-intl/v1-compat` automatically loads translations. What remains for you is to call `setLocale` to specify which language(s) the app should use initially.

::: code-group

```ts [app/routes/application.ts]{8,12}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.setLocale(['en-us']);
  }
}
```

:::


### v2 apps {#4-set-up-ember-intl-v2-apps}

`@ember-intl/vite` doesn't automatically load translations. Import the files that you need, then call `addTranslations` to pass the translations to the `intl` service.

Finally, call `setLocale` to specify which language(s) the app should use initially.

::: code-group

```ts [app/routes/application.ts]{3-4,10,14-15,17}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.addTranslations('de-de', translationsForDeDe);
    this.intl.addTranslations('en-us', translationsForEnUs);

    this.intl.setLocale(['en-us']);
  }
}
```

:::

> [!NOTE]
> 
> File paths prefixed with `virtual:` are called a "virtual module" in Vite. They don't physically exist on disk.


## 5. Configure linters {#5-configure-linters}

### @ember-intl/lint {#5-configure-linters-ember-intl-lint}

[`@ember-intl/lint`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md) is the official linter for `ember-intl`.


### ember-template-lint {#5-configure-linters-ember-template-lint}

[`ember-template-lint`](https://github.com/ember-template-lint/ember-template-lint) provides [`no-bare-strings`](https://github.com/ember-template-lint/ember-template-lint/blob/v7.9.3-ember-template-lint/docs/rule/no-bare-strings.md). This finds hard-coded texts in templates.

::: code-group

```js [.template-lintrc.cjs]
'use strict';

module.exports = {
  extends: ['recommended'],
  rules: {
    'no-bare-strings': true,
  },
};
```

:::


### glint {#5-configure-linters-glint}

At the end of September 2025, [`glint`](https://typed-ember.gitbook.io/glint) released a Volar-based v2. Put it simply, you have v1 if your app depends on `@glint/core`, and v2 if on `@glint/ember-tsc`.

- If you use v1 and "loose mode" templates (you have `*.hbs` files or `hbs` tags), then extend `ember-intl`'s template registry.

    ::: code-group

    ```ts [types/global.d.ts]
    import '@glint/environment-ember-loose';

    import type EmberIntlRegistry from 'ember-intl/template-registry';

    declare module '@glint/environment-ember-loose/registry' {
      export default interface Registry extends EmberIntlRegistry, /* other addon registries */ {
        // local entries
      }
    }
    ```

    :::

- If you use v1 and "strict mode" templates (you don't have `*.hbs` files or `hbs` tags, or don't wish to type-check any remaining ones), then you are good to go.

- If you use v2, then you are good to go.


### Miscellaneous {#5-configure-linters-miscellaneous}

[`prettier`](https://prettier.io/) can format your translation files. To reduce noise in pull requests, consider sorting the translation keys and standardizing their names.
