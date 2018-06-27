
Missing translations
==============================================================================

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
