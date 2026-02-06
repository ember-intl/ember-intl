# Polyfills

`ember-intl` relies on the following APIs from `Intl`. The links on the left column provide browser compatibility.

| API | Polyfill |
|--|--|
| [Intl.getCanonicalLocales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales#browser_compatibility) | [@formatjs/intl-getcanonicallocales](https://formatjs.github.io/docs/polyfills/intl-getcanonicallocales/) |
| [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#browser_compatibility) | [@formatjs/intl-datetimeformat](https://formatjs.github.io/docs/polyfills/intl-datetimeformat/) |
| [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ListFormat#browser_compatibility) | [@formatjs/intl-listformat](https://formatjs.github.io/docs/polyfills/intl-listformat/) |
| [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale#browser_compatibility) | [@formatjs/intl-locale](https://formatjs.github.io/docs/polyfills/intl-locale/) |
| [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#browser_compatibility) | [@formatjs/intl-numberformat](https://formatjs.github.io/docs/polyfills/intl-numberformat/) |
| [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules#browser_compatibility) | [@formatjs/intl-pluralrules](https://formatjs.github.io/docs/polyfills/intl-pluralrules/) |
| [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat#browser_compatibility) | [@formatjs/intl-relativetimeformat](https://formatjs.github.io/docs/polyfills/intl-relativetimeformat/) |


## How to Polyfill

> [!TIP]
> 
> A more advanced strategy, such as dynamically importing assets or dynamically injecting a script based on the browser requesting the page, is recommended for production apps.
> 
> Covering such strategies is out of scope for this documentation. For more information, see the individual polyfill links in https://formatjs.github.io/docs/polyfills.


### Intl.getCanonicalLocales() {#how-to-polyfill-get-canonical-locales}

```sh
pnpm add -D @formatjs/intl-getcanonicallocales
```

```ts
// app/app.ts
import '@formatjs/intl-getcanonicallocales/polyfill.js';
```


### Intl.Locale {#how-to-polyfill-intl-locale}

```sh
pnpm add -D @formatjs/intl-locale
```

```ts
// app/app.ts
import '@formatjs/intl-locale/polyfill.js';
```


### Intl.PluralRules {#how-to-polyfill-intl-plural-rules}

Prerequisites: `Intl.getCanonicalLocales()` and `Intl.Locale`.

```sh
pnpm add -D @formatjs/intl-pluralrules
```

```ts
// app/app.ts
import '@formatjs/intl-pluralrules/polyfill.js';
import '@formatjs/intl-pluralrules/locale-data/de.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/es.js';
import '@formatjs/intl-pluralrules/locale-data/fr.js'; // etc.
```


### Intl.RelativeTimeFormat {#how-to-polyfill-intl-relative-time-format}

Prerequisites: `Intl.getCanonicalLocales()`, `Intl.Locale`, and `Intl.PluralRules`.

```sh
pnpm add -D @formatjs/intl-relativetimeformat
```

```ts
// app/app.ts
import '@formatjs/intl-relativetimeformat/polyfill.js';
import '@formatjs/intl-relativetimeformat/locale-data/de.js';
import '@formatjs/intl-relativetimeformat/locale-data/en.js';
import '@formatjs/intl-relativetimeformat/locale-data/es.js';
import '@formatjs/intl-relativetimeformat/locale-data/fr.js'; // etc.
```
