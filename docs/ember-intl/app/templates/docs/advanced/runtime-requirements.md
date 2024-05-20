# Runtime requirements

`ember-intl` relies on these `Intl` APIs:

- [Intl.getCanonicalLocales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales): Polyfill: [@formatjs/intl-getcanonicallocales](https://formatjs.io/docs/polyfills/intl-getcanonicallocales).

<a href="https://caniuse.com/#search=getCanonicalLocales">
  <img src={{root-url "images/getcanonicallocales.png"}} />
</a>

- [Intl.Locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale): Polyfill: [@formatjs/intl-locale](https://formatjs.io/docs/polyfills/intl-locale).

<a href="https://caniuse.com/mdn-javascript_builtins_intl_locale_maximize">
  <img src={{root-url "images/locale.png"}} />
</a>

- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat): Available on IE11+. Polyfill: [@formatjs/intl-numberformat](https://formatjs.io/docs/polyfills/intl-numberformat).

<a href="https://caniuse.com/#feat=mdn-javascript_builtins_intl_numberformat">
  <img src={{root-url "images/numberformat.png"}} />
</a>

- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat): Available on IE11+. Polyfill: [@formatjs/intl-datetimeformat](https://formatjs.io/docs/polyfills/intl-datetimeformat).

<a href="https://caniuse.com/#feat=mdn-javascript_builtins_intl_datetimeformat">
  <img src={{root-url "images/datetimeformat.png"}} />
</a>

- [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules): Polyfill: [`@formatjs/intl-pluralrules`](https://formatjs.io/docs/polyfills/intl-pluralrules).

<a href="https://caniuse.com/#feat=intl-pluralrules">
  <img src={{root-url "images/pluralrules.png"}} />
</a>

- [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat): Polyfill: [`@formatjs/intl-relativetimeformat`](https://formatjs.io/docs/polyfills/intl-relativetimeformat).

<a href="https://caniuse.com/#feat=mdn-javascript_builtins_intl_relativetimeformat">
  <img src={{root-url 'images/relativetimeformat.png'}} />
</a>

- [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ListFormat): Polyfill: [`@formatjs/intl-listformat`](https://formatjs.io/docs/polyfills/intl-listformat).


## Basic Polyfilling Strategies

> _Important to note_: polyfilling strategies such as lazy-loading or dynamically injecting the script based on the browser requesting the page _is_ recommended. There are many strategies for doing so and they often vary between projects, so ember-intl avoids trying to solve that story. If you don't yet have a strategy, [polyfill.io](https://polyfill.io/v3/) may be a good option.


### Adding `@formatjs/intl-locale`

`yarn add @formatjs/intl-locale`

```js
// app.js (Ember app entry point)
import '@formatjs/intl-locale/polyfill';
```


### Adding `@formatjs/intl-getcanonicallocales`

`yarn add @formatjs/intl-getcanonicallocales`

```js
// app.js (Ember app entry point)
import '@formatjs/intl-getcanonicallocales/polyfill';
```


### Adding `@formatjs/intl-pluralrules`

Requirements: `Intl.getCanonicalLocales` and `Intl.Locale`.

`yarn add @formatjs/intl-pluralrules`

```js
// app.js (Ember app entry point)
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en'; // Add English data
import '@formatjs/intl-pluralrules/locale-data/fr'; // Add French data
import '@formatjs/intl-pluralrules/locale-data/es'; // Add Spanish data
// etc.
```


### Adding `@formatjs/intl-relativetimeformat`

Requirements: `Intl.getCanonicalLocales`, `Intl.Locale`, and `Intl.PluralRules`.

`yarn add @formatjs/intl-relativetimeformat`

```js
// app.js (Ember app entry point)
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/en'; // Add English data
import '@formatjs/intl-relativetimeformat/locale-data/fr'; // Add French data
import '@formatjs/intl-relativetimeformat/locale-data/es'; // Add Spanish data
// etc.
```
