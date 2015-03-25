### MASTER
* [BREAKING] Removing support for handlebars in favor of just supporting htmlbars going forward
* [BREAKING] Removed injection of `intl` service into all popular types.  Instead use `Ember.inject.service('intl')` where you need to programmatically interface with the intl service.
* [BREAKING] `intl:main` is now `service:intl` on the container
  * This allows for `Ember.inject.service()` support and easier unit testing
* [ENHANCEMENT] format-relative now accepts a `now` argument
* [DOCUMENTATION] Documented unit testing components which utilize format-* helpers

```hbs
{{format-relative 2000 now=0}} -> in 2 seconds
```

### 1.2.0

* [ENHANCEMENT] Switching CLDR library from `node-cldr` to https://github.com/yahoo/formatjs-extract-cldr-data
* [ENHANCEMENT] `findTranslation` is now promise-based to permit lazily loading of translations
* [BUGFIX] format-message will never read from the context of the helper, instead depends on values being explicitly passed into the helper.  This is to future proof the helper to behave more like a web component.
* [BUGFIX] intl-get helper now returns an IntlGetResult object so that the locale in which the translation was found on is threaded through to the format methods.  If a translation was discovered on anything other than the current locale, then the pluralization rule and fields would have been that of the current locale and not the locale where the translation was derived.

### 1.1.3

* [BUGFIX] intl-get was not properly updating when bindings changed

### 1.1.2

* [BUGFIX] Error when retrieving locale object fixed

### 1.1.1

* [BUGFIX] Allow for a locale with any number of dashes in the locale code to be used (if available)
* [BUGFIX] Switch helper logic to use streams instead of forcing rerenders

### 1.0.0

* Initial release
