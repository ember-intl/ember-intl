# ember-intl

[![npm Version][npm-badge]][npm]
![Ember Version][ember-version]
![CI](https://github.com/ember-intl/ember-intl/workflows/CI/badge.svg)
[![npm](https://img.shields.io/npm/dm/ember-intl.svg)](https://www.npmjs.com/package/ember-intl)
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)

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

[5.x](https://ember-intl.github.io/ember-intl/versions/master/docs/quickstart)

[4.x (legacy)](https://ember-intl.github.io/ember-intl/versions/v4.4.0/docs/quickstart)

## Migrating from 4.x to 5.x
### Notable Changes

* Improved the internals for loading translations on boot
* Polyfills have been remove and no longer bundle pluralization rules as they're available natively via the `Intl.PluralRules` API

### Breaking Changes

* Node 8 support dropped
* Improved ICU-spec compliance, special characters are now escaped via a single quote `'` instead of a slash `\`
* `Intl.RelativeTime` polyfill has been replaced with the native API which behaves entirely different than the previous older spec implementation (read about in the [Migration Document](https://ember-intl.github.io/ember-intl/docs/guide/migration-4-0-to-5-0))
* `intl.lookup()` API will no longer return missing translation warnings
* Removes `shortNumber` formatting in favor of now supported native implementation using the `"notation"` property i.e.,
```js
this.intl.formatNumber(1000, {
  notation: "compact" ,
  compactDisplay: "short"
}); // -> 1k
```

All of this will result in smaller bundles, faster build times, and less work done on app boot.

When you're ready to upgrade, head over to the [Migration Document](https://ember-intl.github.io/ember-intl/docs/guide/migration-4-0-to-5-0) to read more in detail about what changed.

## Migrating from ember-i18n

There's an [ember-i18n-to-intl-migrator tool](https://github.com/DockYard/ember-i18n-to-intl-migrator) that is used to convert your translations files and application code to ember-intl.

If you have any questions or issues, please open in [ember-i18n-to-intl-migrator/issues](https://github.com/DockYard/ember-i18n-to-intl-migrator/issues)

[npm]: https://www.npmjs.org/package/ember-intl
[npm-badge]: https://img.shields.io/npm/v/ember-intl.svg?style=flat-square
[ember-version]: https://img.shields.io/badge/Ember-2.12%2B-brightgreen.svg
[ICU]: https://formatjs.io/docs/core-concepts/icu-syntax
