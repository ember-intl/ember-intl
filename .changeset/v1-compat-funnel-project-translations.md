---
"@ember-intl/v1-compat": minor
---

Filter the project's `translations/` folder through the same funnel (`*.{json,yaml,yml}`) that is already applied to addon translation trees. Previously, non-translation files such as a `.gitkeep` placeholder used to keep an empty `translations/` folder in git would reach the translation reducer, which derived an empty locale from the filename and inserted a `["", {}]` entry in the inlined `translations.js`. At runtime, the `load-translations` initializer then called `intl.addTranslations("", {})`, which made `@formatjs/intl` throw `INVALID_CONFIG`. See [#2153](https://github.com/ember-intl/ember-intl/issues/2153).
