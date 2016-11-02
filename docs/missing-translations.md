
Missing translations
==============================================================================

When a translation lookup is called with a nonexistent key, it returns the
result of calling `util:intl/missing-message` with the `key` and the `locale`
as arguments. The default behavior is to return
`"Missing translation: [key]"`, but you can customize this by exporting a
function from `app/utils/intl/missing-message.js`.

The default implementation:

```js
// app/utils/intl/missing-message.js:

import Ember from 'ember';

const { Logger:logger } = Ember;

export default function missingMessage(key, locales) {
  logger.warn(`translation: '${key}' on locale: '${locales.join(', ')}' was not found.`);

  return `Missing translation: ${key}`;
}
```

The feature, and the documentation, is based entirely off ember-i18n's.
