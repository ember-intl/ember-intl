# Migrating from 4.0 to 5.0

## **Obsolete**

The `locales` configuration option within `config/ember-intl.js` can now be removed

## **Breaking Change**

### **Polyfilling**

This addon longer provides Polyfills.  The reasoning along with the details can be found in the {{docs-link 'Runtime Requirements' 'docs.getting-started.runtime-requirements'}} section.

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
* Any HTML tags within a translation need to be escaped.

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

