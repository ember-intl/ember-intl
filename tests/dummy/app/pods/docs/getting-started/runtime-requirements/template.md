# Runtime Requirements

**We support IE11 & 2 most recent versions of Edge, Chrome & Firefox.**

ember-intl relies on these `Intl` APIs:

- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat): Available on IE11+
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat): Available on IE11+
- [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules): This can be polyfilled using [this package](https://www.npmjs.com/package/@formatjs/intl-pluralrules).
- [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat): This can be polyfilled using [this package](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat).

### **Polyfills**

If you need to support older browsers, we recommend you do the following:

1. Polyfill `Intl.NumberFormat` with https://github.com/andyearnshaw/Intl.js
2. Polyfill `Intl.DateTimeFormat` with https://github.com/formatjs/date-time-format-timezone
3. If you're supporting browsers that do not have [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) (e.g IE11 & Safari 12-), include this [polyfill](https://www.npmjs.com/package/@formatjs/intl-pluralrules) in your build.

```js
// first run: yarn add @formatjs/intl-pluralrules
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/dist/locale-data/de'; // Add locale data for de
```

4. If you're supporting browsers that do not have [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) (e.g IE11, Edge, Safari 12-), include this [polyfill](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat) in your build along with individual CLDR data for each locale you support.

```js
// first run: yarn add @formatjs/intl-relativetimeformat
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/de'; // Add locale data for de
```

**Important to note,** polyfilling strategies such as lazy-loading or dynamically injecting the script based on whether or not the requesting browser needs it _is_ recommended!  There are many strategies for doing so and they often vary between projects, so ember-intl avoids trying to solve that story.  If you don't yet have a strategy, [polyfill.io](https://polyfill.io/v3/) may be a good option.

### **Browser Support**

We officially support IE11 along with 2 most recent versions of Edge, Chrome & Firefox.
