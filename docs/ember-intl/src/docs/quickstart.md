# Quickstart (Apps)


## 1. Install ember-intl {#1-install-ember-intl}

### v1 apps {#1-install-ember-intl-v1-apps}

Use your package manager to install `ember-intl` and `@ember-intl/v1-compat`.

```sh
pnpm add -D ember-intl @ember-intl/v1-compat
```

Next, create the folder `translations` as a sibling to `app`.

```
my-app
├── app
└── translations
```

When you run the app, `@ember-intl/v1-compat` will automatically load translations.


### v2 apps {#1-install-ember-intl-v2-apps}

Use your package manager to install `ember-intl` and `@ember-intl/vite`.

```sh
pnpm add -D ember-intl @ember-intl/vite
```

In `vite.config.mjs`, add `loadTranslations` to the list of plugins.

```diff
+ import { loadTranslations } from '@ember-intl/vite';
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
+     loadTranslations(),
  ],
});
```

Next, create the folder `translations` as a sibling to `app`.

```
my-app
├── app
└── translations
```

When you run the app, `@ember-intl/vite` won't automatically load translations. For more information, see [4. Set up ember-intl](#4-set-up-ember-intl) below and the [`README` for `@ember-intl/vite`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-vite/README.md).


## 2. Define translations {#2-define-translations}

Create a translation in `translations/en-us.yaml`.

```yaml
hello:
  message: "Hello, {name}!"
```

In a template, use the `{{t}}` helper to render the translation:

```hbs
{{! app/templates/application.hbs }}
<div>
  {{t "hello.message" name="Zoey"}}
</div>
```

In a [`<template>`-tag component](https://github.com/ember-template-imports/ember-template-imports), use the named import to consume the `{{t}}` helper.

```gts
/* app/components/hello.gts */
import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {
    name: string;
  };
}

const Hello: TOC<HelloSignature> = <template>
  <div>
    {{t "hello.message" name=@name}}
  </div>
</template>;

export default Hello;
```


## 3. Define languages {#3-define-languages}

Create the file `translations/de-de.yaml` to support the `de-de` locale. (Throughout the guide, we use the terms "language" and "locale" interchangeably.)

```yaml
hello:
  message: "Hallo, {name}!"
```

> [!NOTE]
> 
> You may also use `.yml` or `.json` for file extension.


## 4. Set up ember-intl {#4-set-up-ember-intl}

Before your app renders, you need to tell `ember-intl` which locale(s) to use.


### v1 apps {#4-set-up-ember-intl-v1-apps}

Call `setLocale()` in the `application` route's `beforeModel` hook.

```ts
/* app/routes/application.ts */
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


### v2 apps {#4-set-up-ember-intl-v2-apps}

Recall that `@ember-intl/vite` doesn't automatically load translations. Import the translations that you need, then call `addTranslations()`.

```ts
/* app/routes/application.ts */
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


## 5. Configure linters {#5-configure-linters}

### @ember-intl/lint {#5-configure-linters-ember-intl-lint}

[`@ember-intl/lint`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md) is the official linter for `ember-intl`.


### ember-template-lint {#5-configure-linters-ember-template-lint}

[`ember-template-lint`](https://github.com/ember-template-lint/ember-template-lint) provides [`no-bare-strings`](https://github.com/ember-template-lint/ember-template-lint/blob/v7.9.3-ember-template-lint/docs/rule/no-bare-strings.md). This finds hard-coded texts in templates.

```js
/* .template-lintrc.cjs */
'use strict';

module.exports = {
  extends: ['recommended'],
  rules: {
    'no-bare-strings': true,
  },
};
```


### glint {#5-configure-linters-glint}

At the end of September 2025, [`glint`](https://typed-ember.gitbook.io/glint) released a Volar-based v2. Put it simply, you have v1 if your app depends on `@glint/core`, and v2 if on `@glint/ember-tsc`.

- If you use v1 and "loose mode" templates (you have `*.hbs` files or `hbs` tags), then extend `ember-intl`'s template registry.

```ts
/* types/global.d.ts */
import '@glint/environment-ember-loose';

import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberIntlRegistry, /* other addon registries */ {
    // local entries
  }
}
```

- If you use v1 and "strict mode" templates (you don't have `*.hbs` files or `hbs` tags, or don't wish to type-check any remaining ones), then you are good to go.
- If you use v2, then you are good to go.


### Miscellaneous {#5-configure-linters-miscellaneous}

[`prettier`](https://prettier.io/) can format your translation files. To reduce noise in pull requests, consider sorting the translation keys and standardizing their names.
