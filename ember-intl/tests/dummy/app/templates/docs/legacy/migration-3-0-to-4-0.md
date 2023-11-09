# Migrating from 3.0 to 4.0

No migration necessary.


## Breaking Change

- CLDR locale data set has been updated from 28.0.0 to 34.0.0
- Legacy instance initializer removed.  Only a breaking change if you reference it in another one of your initializers using `before: 'ember-intl'` or `after: 'ember-intl'`


## Enhancements

- Translation blueprint now adds translation relative to config `inputPath` option
- Relative time API now has [`short`](https://ember-intl.github.io/ember-intl/versions/v4.0.0/docs/helpers/format-relative#format-relative-options) units
- `baseLocale` API has returned as `fallbackLocale`. Enables merging the fallback locale's translations into all other locales as a build-time fallback strategy.