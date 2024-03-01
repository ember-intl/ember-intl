# Quickstart (Apps)


## 1. Install ember-intl

You can use Ember CLI to install `ember-intl`.

```sh
ember install ember-intl
```

This will create a few files:

* `app/formats.js`
* `config/ember-intl.js`
* `translations/en-us.yaml`


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

const HelloComponent: TOC<HelloSignature> =
  <template>
    <div>
      {{t "hello.message" name=@name}}
    </div>
  </template>

export default HelloComponent;
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

When your application boots, you need to tell `ember-intl` which locale to use. The recommended approach is to do this in the `application` route's `beforeModel` hook.

```js
/* app/routes/application.js */
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;

  beforeModel() {
    this.intl.setLocale(['en-us']);
  }
}
```


### Glint

Update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/environments/ember/using-addons#using-glint-enabled-addons) for more information.

```ts
/* types/my-app/index.d.ts */

import '@glint/environment-ember-loose';

import type EmberIntlRegistry from 'ember-intl/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberIntlRegistry, /* other addon registries */ {
    // local entries
  }
}
```


### Lint templates

With [`ember-template-lint`](https://github.com/ember-template-lint/ember-template-lint), you can enable the [`no-bare-strings`](https://github.com/ember-template-lint/ember-template-lint/blob/v5.13.0/docs/rule/no-bare-strings.md) rule. This will help you check if hard-coded texts are present in a template.

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

You can also use [`ember-template-lint-plugin-prettier`](https://github.com/ember-template-lint/ember-template-lint-plugin-prettier) to format the template.


### Lint translations

With [`eslint-plugin-yml`](https://ota-meshi.github.io/eslint-plugin-yml/), you can enable a few rules to keep YAML files consistent.


```js
/* .eslintrc.js */
'use strict';

module.exports = {
  extends: ['plugin:yml/standard'],
  rules: {
    'yml/file-extension': 'error',
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
    'yml/no-multiple-empty-lines': 'error',
    'yml/sort-keys': 'error',
  },
};
```

You can also use [`prettier`](https://prettier.io/) to format the translation files.
