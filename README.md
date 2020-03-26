# ember-intl

[![npm Version][npm-badge]][npm]
![Ember Version][ember-version]
[![Build Status][travis-badge]][travis]
[![npm](https://img.shields.io/npm/dm/ember-intl.svg)](https://www.npmjs.com/package/ember-intl)
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)

## Notable Features

* 💵 Locale-aware numbers. Formatting of currencies, decimals, and percentages
* 📅 Locale-aware dates and times formatting
* 🕑 Locale-aware display of relative time. I.e, `"now"`, `"yesterday"`, `"2 mo. ago"`
* 💬 ICU Message Syntax. Pluralization and formatted segments (numbers, datetime, etc.)
* 🌐 Support for 150+ languages
* 📜 Built largely on standards. [ICU message syntax][ICU] & [Native Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
* ⚡ Extensive Ember Service API and template helpers for formatting and translating
* 🎉 [Advanced addon support](https://ember-intl.github.io/ember-intl/docs/advanced/addon-support) to provide translations to the host app

## Documentation

[5.x (master)](https://ember-intl.github.io/ember-intl/docs)

[4.x (current stable)](https://ember-intl.github.io/ember-intl/versions/v4.0.0/docs)

## Migrating from ember-i18n

There's an [ember-i18n-to-intl-migrator tool](https://github.com/DockYard/ember-i18n-to-intl-migrator) that is used to convert your translations files and application code to ember-intl.

If you have any questions or issues, please open in [ember-i18n-to-intl-migrator/issues](https://github.com/DockYard/ember-i18n-to-intl-migrator/issues)

## Editor integration

You can get autocomplete and additional information inside [Visual Studio Code](https://code.visualstudio.com/) by installing [els-intl-addon](https://github.com/lifeart/els-intl-addon) addon for [Unstable Ember Language Server](https://marketplace.visualstudio.com/items?itemName=lifeart.vscode-ember-unstable).


[npm]: https://www.npmjs.org/package/ember-intl
[npm-badge]: https://img.shields.io/npm/v/ember-intl.svg?style=flat-square
[travis]: https://travis-ci.com/ember-intl/ember-intl
[travis-badge]: https://travis-ci.com/ember-intl/ember-intl.svg?branch=master
[ember-version]: https://img.shields.io/badge/Ember-2.12%2B-brightgreen.svg
