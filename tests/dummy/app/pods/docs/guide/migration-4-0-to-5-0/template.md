# Migrating from 4.0 to 5.0

## **Obsolete**

The `locales`, `disablePolyfill`, and `autoPolyfill` configuration options in `config/ember-intl.js` are no longer used and can be safely removed.

## **Breaking Changes**

### **Node runtime**

We now support down to Node 10, dropping support for Node 8.

### **Polyfilling**

This addon no longer provides polyfills "out of the box."  The reasoning, along with the current browser requirements, can be found in the {{docs-link 'Runtime Requirements' 'docs.getting-started.runtime-requirements'}} section.

I highly encourage you read through all the browser support matrices within the {{docs-link 'Runtime Requirements' 'docs.getting-started.runtime-requirements'}} to ensure it aligns with your projects runtime targets.

### **`Intl.RelativeTimeFormat`**

When we introduced FormatRelative, the spec for [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) was still under development. It has now reached stage 3 and multiple browsers have implemented it. However, the API is quite different from the spec we had implemented so we've had to adjust the API to match the spec which means it's not backwards compatible.

Changes:

* `units` is now `unit`
* `style` becomes `numeric` (the default)
* Type of `value` is no longer a `Date` instance but rather delta in the specified `unit`
* `interval` was removed from the format-relative helper
* `now` was removed from the format-relative helper

### **Translations**

* Escaping in translations is now done via a single quote, `'`, instead of the previous slash `\`.  This was done to ensure compliance with the ICU spec.
* Additionally, all HTML tags now need to be escaped.

`<strong>{name}</strong>`

becomes

`'<strong>'{name}'</strong>'`

### **Compact Number Formatter**

In 4.x, we introduced a shortNumber formatter.  This is no longer necessary as we can rely on the native Intl.NumberFormat to compact numbers into their abbreviated form.

`{numCustomers, shortNumber}`

becomes

`{numCustomers, number, compact}`

or

`{{format-number numCustomers notation="compact"}}`

