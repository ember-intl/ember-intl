[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-intl/ember-intl/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/ember-intl/ember-intl/actions/workflows/ci-cd.yml)
[![npm](https://img.shields.io/npm/dm/ember-intl.svg)](https://www.npmjs.com/package/ember-intl)
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)

# ember-intl


## Installation

```sh
ember install ember-intl
```

<details>

<summary>Use Glint or <code>&lt;template&gt;</code> tag? ✨</summary>

- Update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/environments/ember/using-addons#using-glint-enabled-addons) for more information.

    ```ts
    /* types/index.d.ts */

    import '@glint/environment-ember-loose';

    import type EmberIntlRegistry from 'ember-intl/template-registry';

    declare module '@glint/environment-ember-loose/registry' {
      export default interface Registry extends EmberIntlRegistry, /* other addon registries */ {
        // local entries
      }
    }
    ```

- In [`<template>`-tag components](https://github.com/ember-template-imports/ember-template-imports), use the named import to consume things from `ember-intl`.

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

</details>


## Notable Features

* 🐹 Compatible with Ember apps, v1 addons (including engines), and v2 addons.
* 📚 Built on standards: [ICU message syntax][https://formatjs.io/docs/core-concepts/icu-syntax/] and [Internationalization API](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl).
* 🌐 Support for 150+ languages.
* ⚙️ Locale-aware helpers and `intl` service, to help you display translations, numbers, dates, etc.
* ✅ Test helpers to check locale-dependent templates.


## Documentation

- [6.x](https://ember-intl.github.io/ember-intl/)
- [5.x (legacy)](https://ember-intl.github.io/ember-intl/versions/v5.7.0/)
- [4.x (legacy)](https://ember-intl.github.io/ember-intl/versions/v4.4.0/)


## Compatibility

* Ember.js v3.28 or above
* Node.js v16 or above
