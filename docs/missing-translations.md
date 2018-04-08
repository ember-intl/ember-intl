
Missing translations
==============================================================================

When a translation key does not resolve to a translation, ember-intl invokes the function from `app/utils/intl/missing-message.js` with a `key` and `locales` as arguments.

The default implementation is to return `"Missing translation: [key]"`, but you can overridden by exporting a function from `app/utils/intl/missing-message.js`.

The following is a custom implementation that throws an error instead of returns a `String`.

```js
// app/utils/intl/missing-message.js:

import Ember from 'ember';

export default function missingMessage(key, locales) {
  throw new Error(`[ember-intl] Missing translation for key: "${key}" for locales: "${locales}"`);
}
```

The feature, and the documentation, is based entirely off ember-i18n's.
