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


## 4. Configure project

### Set your app's locale

Before your app runs, you need to tell `ember-intl` which locale to use. You can set up the locale in the `application` route's `beforeModel` hook.

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


### Set up glint

If your app uses [`glint`](https://typed-ember.gitbook.io/glint) and is in "loose mode" (has `*.hbs` files or `hbs` tags), extend `ember-intl`'s template registry.

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


### Lint templates

If your app uses [`ember-template-lint`](https://github.com/ember-template-lint/ember-template-lint), you may want to enable [`no-bare-strings`](https://github.com/ember-template-lint/ember-template-lint/blob/v7.9.3-ember-template-lint/docs/rule/no-bare-strings.md). This will help you check if hard-coded texts are present in a template.

```js
/* .template-lintrc.js */
'use strict';

module.exports = {
  extends: ['recommended'],
  rules: {
    'no-bare-strings': true,
  },
};
```


### Lint translations

With [`eslint-plugin-yml`](https://ota-meshi.github.io/eslint-plugin-yml/), you can enable a few rules to keep YAML files consistent.

```js
import eslintPluginYml from 'eslint-plugin-yml';

export default [
  ...eslintPluginYml.configs['flat/standard'],
  {
    rules: {
      'yml/key-name-casing': [
        'error',
        {
          camelCase: false,
          'kebab-case': true,
          PascalCase: false,
          SCREAMING_SNAKE_CASE: false,
          snake_case: false,
          ignores: ['^[a-z0-9\\.-]+$'],
        },
      ],
      'yml/no-empty-document': 'off',
      'yml/no-multiple-empty-lines': 'error',
      'yml/sort-keys': 'error',
    },
  },
];
```

You can also use [`prettier`](https://prettier.io/) to format the translation files and [`ember-intl-analyzer`](https://github.com/mainmatter/ember-intl-analyzer) to find unused translations.
