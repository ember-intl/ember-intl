[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-intl/ember-intl/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/ember-intl/ember-intl/actions/workflows/ci-cd.yml)
[![npm](https://img.shields.io/npm/dm/ember-intl.svg)](https://www.npmjs.com/package/ember-intl)
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)

# ember-intl


## Installation

```sh
ember install ember-intl
```

<details>
<summary>Use Glint? ✨</summary>

- Update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) for more information.

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

  If you are on `ember-intl@v5`, use the types provided by [@gavant/glint-template-types](https://github.com/Gavant/glint-template-types/tree/v0.3.4/types/ember-intl/helpers).

</details>


## Notable Features

* 💵 Locale-aware numbers. Formatting of currencies, decimals, and percentages
* 📅 Locale-aware dates and times formatting
* 🕑 Locale-aware display of relative time. i.e, `"in 1 day"`, `"2 years ago"`, etc.
* 💬 ICU Message Syntax. Pluralization and formatted segments (numbers, datetime, etc.)
* 🌐 Support for 150+ languages
* 🕵🏻 Translation linting (detects missing translations & translation argument mismatches)
* 📜 Built largely on standards. [ICU message syntax][ICU] & [Native Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
* ⚡ Extensive Ember Service API and template helpers for formatting and translating
* 🎉 [Advanced addon support](https://ember-intl.github.io/ember-intl/docs/advanced/addon-support) to provide translations to the host app


## Documentation

- [6.x](https://ember-intl.github.io/ember-intl/)
- [5.x (legacy)](https://ember-intl.github.io/ember-intl/versions/v5.7.0/)
- [4.x (legacy)](https://ember-intl.github.io/ember-intl/versions/v4.4.0/)


## Migrating from ember-i18n

There's an [ember-i18n-to-intl-migrator tool](https://github.com/DockYard/ember-i18n-to-intl-migrator) that is used to convert your translations files and application code to ember-intl.

If you have any questions or issues, please open in [ember-i18n-to-intl-migrator/issues](https://github.com/DockYard/ember-i18n-to-intl-migrator/issues)

[npm]: https://www.npmjs.org/package/ember-intl
[npm-badge]: https://img.shields.io/npm/v/ember-intl.svg?style=flat-square
[ember-version]: https://img.shields.io/badge/Ember-2.12%2B-brightgreen.svg
[ICU]: https://formatjs.io/docs/core-concepts/icu-syntax
