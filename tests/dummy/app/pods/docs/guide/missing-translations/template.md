# Missing translations

## At runtime

When a translation key does not resolve to a translation, ember-intl invokes the function from `app/utils/intl/missing-message.js` with a `key`, `locales` and `options` as arguments.

The default implementation is to return `"Missing translation: [key]"`, but can be overridden by exporting a function from `app/utils/intl/missing-message.js`.

The following is a custom implementation that throws an error instead of returning a `String`.

```js
// app/utils/intl/missing-message.js:

export default function missingMessage(key, locales, options) {
  throw new Error(`[ember-intl] Missing translation for key: "${key}" for locales: "${locales}"`);
}
```

The feature, and the documentation, is based entirely off ember-i18n's. The `options` hash is a new addition.

## At build-time

Ember Intl automatically detects missing translations when building the app.

You can control the detection behavior by configuring the `errorOnMissingTranslations` and `requiresTranslation` options in your `config/ember-intl.js`.

### Requiring translations

By setting a `requiresTranslation` function, it's possible to filter what translations are required.
The default implementation requires all keys to be translated in all locales.

The provided function will be called for any translation key that is missing in any locale.
This means it won't be called for any key that exists in all configured locales.

The following missing translations will be logged, If an ember-intl project is configured with the following configuration.

- `page.description` is missing in `it`

```js
// config/ember-intl.js
module.exports = function(/* environment */) {
  return {
    requiresTranslation(key, locale) {
      if (key.startsWith('wip.')) {
        // ignore any missing translations for keys starting with 'wip.'.
        return false;
      }

      if (locale === 'de') {
        // ignore any missing german translations.
        return false;
      }

      return true;
    }
  };
};
```

```yaml
# translations/en.yaml
page:
  title: Page title
  description: Page description
wip:
  title: WIP title

# translations/de.yaml
# nothing to see here

# translations/it.yaml
page:
  title: Titolo della pagina
```

### Throwing a build error on missing, required translation

Setting `errorOnMissingTranslations` to `true` will cause ember-intl to throw a build error if missing, required translations were detected.
This changes the default behavior where missing translations are only logged as build warnings.

Given the following configuration, any missing translation in any locale will cause a build error to be thrown.

```js
// config/ember-intl.js
module.exports = function(/* environment */) {
  return {
    errorOnMissingTranslations: true
  };
};
```
