# Missing translations

## **At runtime**

When a translation does not exist, `ember-intl` will import and invoked a function from the location `app/utils/intl/missing-message.js`.  It is provided three argumnets: `key: String` and `locales: String[]` as arguments.

The default implementation is to return `"Missing translation: [key]"`, but can be overridden by exporting a function from `app/utils/intl/missing-message.js`.

Here is how you might implement your own error handler:

```js
// app/utils/intl/missing-message.js
export default function missingMessage(key, locales) {
  throw new Error(`[ember-intl] Missing translation for key: "${key}" for locales: "${locales}"`);
}
```

## **At build-time**

`ember-intl` automatically detects missing translations at build-time.

If you don't like the default behavior, you can control the detection by configuring `errorOnMissingTranslations` and `requiresTranslation` in your `config/ember-intl.js` configuration file.  By default, `ember-intl` will emit warnings to stdout but will not fail the build.

### Throwing a build error on missing (when required) translations

Setting `errorOnMissingTranslations` to `true` will cause ember-intl to throw a build error if missing (and when required) translations were spotted during bundling.

This changes the default behavior where missing translations are only logged as build warnings.

Given the following configuration, any missing translation in any locale, will cause a build error to be thrown.

```js
// config/ember-intl.js
module.exports = function(/* env */) {
  return {
    errorOnMissingTranslations: true
  };
};
```

### Requiring translations

`requiresTranslation` is a function that is called whenever any translation key, from any locale, is missing.

The default implementation requires all keys to be translated by all locales.  For example, if my application supports locales en-US and fr-FR and I create a translation key `"home.hero_title"` then both locales must implement that key or a warning, or optionally an error, will present itself at build-time.

Example configuration:

```js
// config/ember-intl.js
module.exports = function(/* env */) {
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

If an ember-intl project is configured with the following implementation of this method, the following will print to the console:

> `page.description` is missing in `it`
