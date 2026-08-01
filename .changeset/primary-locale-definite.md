---
"ember-intl": minor
---

`IntlService.primaryLocale` is now typed as `string` (no longer `string | undefined`) and throws when accessed before `setLocale()` has been called with a valid locale. 
An will be thrown error with a helpful message, instructing to make sure to `setLocale` before accessing any methods. 
```js
"ember-intl: locale is missing. Make sure to call `intl.setLocale(...)` first."
```

