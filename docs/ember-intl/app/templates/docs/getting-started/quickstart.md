# Quickstart (Apps)


## 1. Install ember-intl

Use your package manager to install `ember-intl` and `@ember-intl/v1-compat`. The latter is used to load translations in the same way as in `ember-intl@v7`.

```sh
pnpm add -D ember-intl @ember-intl/v1-compat
```

If your app provides translations, create the folder `translations` as a sibling to `app`.

```
my-app
├── app
└── translations
```


## 2. Add a translation

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

```ts
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


## 3. Add a language

Create the file `translations/de-de.yaml`.

```yaml
hello:
  message: "Hallo, {name}!"
```

Note, you may also use `.yml` or `.json` for file extension.


## 4. Set app locale

Before your app runs, you need to tell `ember-intl` which locale(s) to use. Call `setLocale()` in the `application` route's `beforeModel` hook.

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel() {
    this.intl.setLocale(['en-us']);
  }
}
```


## 5. Configure linters

### @ember-intl/lint

[`@ember-intl/lint`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md) is the official linter for `ember-intl`. It removes the need for [`ember-intl-analyzer`](https://github.com/mainmatter/ember-intl-analyzer), separates linting and building translations, and strives to be "zero config."

1\. Install `@ember-intl/lint` as a development dependency.

```sh
pnpm add -D @ember-intl/lint
```

2\. In `package.json`, add the scripts `lint:intl` and `lint:intl:fix`. They will run as a part of `lint` and `lint:fix`.

```diff
/* package.json */
{
  "scripts": {
    "lint": "concurrently \"pnpm:lint:*(!fix)\" --names \"lint:\"",
    "lint:fix": "concurrently \"pnpm:lint:*:fix\" --names \"fix:\" && pnpm format",
+     "lint:intl": "ember-intl-lint",
+     "lint:intl:fix": "ember-intl-lint --fix"
  },
  "devDependencies": {
    "@ember-intl/lint": "...",
    "concurrently": "...",
  }
}
```


### ember-template-lint

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


### glint

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


### Miscellaneous

[`prettier`](https://prettier.io/) can format your translation files. To reduce noise in pull requests, consider sorting the translation keys and standardizing their names.
