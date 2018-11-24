# Migrating from 3.0 to 4.0

* CLDR locale data set has been updated from 28.0.0 to 34.0.0
* Translation blueprint now adds translation relative to config `inputPath` option
* Relative time API now has [`short`](https://github.com/ember-intl/ember-intl/blob/master/docs/format-relative-options.md#format-relative-options) units
* `baseLocale` API has returned as `fallbackLocale`.  Enables merging the fallback locale's translations into all other locales as a build-time fallback strategy.
