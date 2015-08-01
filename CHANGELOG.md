### MASTER

See github release notes.  Will aggregate for 2.0-stable.

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
