# ember-intl

[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![npm](https://img.shields.io/npm/dm/ember-intl.svg)](https://www.npmjs.com/package/ember-intl)
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)

## Notable Features

* 💵 Locale-aware numbers. Formatting of currencies, decimals, and percentages.
* 📅 Locale-aware dates and times formatting
* 🕑 Locale-aware display of relative time. I.e, `"now"`, `"yesterday"`, `"2 mo. ago"`
* 💬 ICU Message Syntax. Pluralization and formatted segments (numbers, datetime, etc.).
* 🌐 Support for 150+ languages.
* 📜 Built largely on standards. [ICU message syntax][ICU] & [Native Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
* ⚡ Extensive Ember Service API and template helpers for formatting and translating.
* 🎉 [Advanced addon support](https://github.com/ember-intl/ember-intl/blob/master/docs/addon-support.md) to provide translations to the host app

## Installation

`ember i ember-intl`

## Documentation

[3.0 (current)](https://github.com/ember-intl/ember-intl/tree/master/docs)

[2.0 docs](https://github.com/ember-intl/ember-intl/tree/2.x/docs)

## Migrating from 2.0?

[Here is a light touch migration guide to help you get started](https://github.com/ember-intl/ember-intl/blob/master/docs/migration-2.0-to-3.0.md).  If you uncover any gaps, submit a PR to update the migration doc or open an issue.

## Documentation

Documentation is hosted in the repository within the [`/docs`](https://github.com/ember-intl/ember-intl/tree/2.x/docs) folder.

## Translations
Translations are defined in [ICU message syntax][ICU] and store in `<project_root>/translations` in either JSON and/or YAML format.  Nested directories are supported along with nested objects within your translation files.

Example basic translation file `/translations/homepage/en-us.yaml`:

```yaml
homepage:
  banner: '<strong>{product}</strong> will cost <em>{price, number, USD}</em> if ordered by {deadline, date, time}'
```

## Setting Locale

This is can be done at any point within your app boots.  This is typically done within your Application route's `beforeModel` hook by calling `intl.setLocale('en-us')` [Read more about the Service API](https://github.com/ember-intl/ember-intl/blob/2.x/docs/ember-service-api.md).

```js
  // app/routes/application.js
  export default Route.extend({
    intl: service(),
    beforeModel() {
      /* NOTE: if you lazily load translations, here is also where you would load them via `intl.addTranslations` */
      return this.intl.setLocale(['fr-fr', 'en-us']); /* array optional */
    }
  });
```

## Helper Examples

### Format Message

Compiles a [ICU message syntax][ICU] strings with its hash values passed.

```
# en-us.yml
photos:
  banner: "You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}"
```

**Template Helper**

```hbs
{{t 'photos.banner' numPhotos=model.photos.length}}
```

**Service API**

```js
export default Component.extend({
  intl: service(),

  banner: computed('intl.locale', 'model.photos.length', function() {
    return this.intl.t('photos.banner', {
      photos: this.get('model.photos.length')
    });
  })
});
```

### Format Number
Formats numbers using [`Intl.NumberFormat`][Intl-NF], and returns the formatted string value.

```hbs
{{format-number num}}
{{format-number num format='EUR'}}
{{format-number num style='currency' currency='USD'}}
```

Or programmatically convert a number within any Ember Object.

```js
export default Component.extend({
  intl: service(),
  computedNumber: computed('intl.locale', 'cost', function() {
    return this.intl.formatNumber(this.cost/*, optional options hash */);
  })
});
```

#### Format Number Options

[List of supported format number options](https://github.com/ember-intl/ember-intl/blob/2.x/docs/format-number-options.md)

### Format Date

Formats dates using [`Intl.DateTimeFormat`][Intl-DTF], and returns the formatted string value.

```hbs
{{format-date now weekday='long' timeZone='UTC'}}
{{format-date now hour='numeric' minute='numeric' hour12=false}}
```

Or programmatically convert a date within any Ember Object.

```js
export default Component.extend({
  intl: service(),
  computedNow: computed('intl.locale', function() {
    return this.intl.formatDate(new Date()/*, optional options hash */);
  })
});
```

#### Format Date Options

[List of supported format date options](https://github.com/ember-intl/ember-intl/blob/2.x/docs/format-date-time-options.md)

### Format Time

This is just like the `{{format-date}}` helper, except it will reference any string-named `format` from [`formats.time`](#dataintlformats).

```hbs
{{format-time now format='hhmmss'}}
{{format-time now hour='numeric' minute='numeric' hour12=false}}
```

Or programmatically convert a time within any Ember Object.

```js
// example
export default Component.extend({
  intl: service(),
  computedNow: computed('intl.locale', function() {
    return this.intl.formatTime(new Date()/*, optional options hash */);
  })
});
```

#### Format Time Options
[List of supported format date options](https://github.com/ember-intl/ember-intl/blob/2.x/docs/format-date-time-options.md)

### Format Relative

Formats dates relative to "now" using [`IntlRelativeFormat`][Intl-RF], and returns the formatted string value.

```js
export default Component.extend({
  timestamp: computed(function() {
    let date = new Date();
    date.setDate(date.getDate() - 3);
    return date;
  })
});
```

```hbs
{{format-relative timestamp}} -> 3 days ago
```

Or programmatically convert a relative time within any Ember Object.

```js
export default Component.extend({
  intl: service(),
  yesterday: computed('intl.locale', function() {
    let date = new Date();
    return this.intl.formatRelative(date.setDate(date.getDate() - 1)/*, optional options hash */);
  })
});
```

#### Live Relative Timestamp

Recompute the relative timestamp on an interval by passing an `interval` argument (in milliseconds).

```hbs
{{format-relative now interval=1000}} -> now, 1 second ago, 2 seconds ago, etc. (will recompute every 1s)
```

#### Format Relative Options

[List of supported format date options](https://github.com/ember-intl/ember-intl/blob/2.x/docs/format-relative-options.md)

#### Formatting a string literal ICU messages

**Template Helper**

```hbs
{{format-message "{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}"
  name=user.username
  numPhotos=num
  timestamp=yesterday
}}
```

**Service API**

```js
export default Component.extend({
  intl: service(),
  count: 0,
  label: computed('intl.locale', 'model.photos.length', function() {
    return this.intl.formatMessage(`
      You took {numPhotos, plural,
        =0 {no photos}
        =1 {one photo}
        other {# photos}
      }
    `,
    {
      numPhotos: this.get('model.photos.length')
    });
  }).readOnly()
});
```

### Format HTML Message

Escapes all hash arguments and returns as an htmlSafe String which renders an ElementNode.  To enable rendering HTML within translations, pass an `htmlSafe` attribute to the `t` helper.

```hbs
{{t 'a.translation' htmlSafe=true}}
{{format-message '<em>{photos, number}</em>' photos=models.photos.length htmlSafe=true}}
```

## Named Formats

Specifying format options (e.g.: style="currency" currency="USD") in every use of format helper can become a problem in large code bases, and isn't DRY. Instead, you can provide named formats through the use of exporting a POJO from `app/formats`. All helpers accept a `format` property which accepts a key that maps to the format option under its respected type (time, date, number, relative).

For example:


```js
// app/formats.js
export default {
  date: {
    hhmmss: {
      hour:   'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
  }
};
```

```hbs
{{format-date 'Thu Jan 23 2014 13:00:44' format='hhmmss'}}
```

```js
this.intl.formatDate('Thu Jan 23 2014 13:00:44', {
  format: 'hhmmss'
})
```

Output of both the helper and the programmatic example:

> 1:00:44 PM

## Helper Options

* All helpers accept optional arguments:
  * `locale` argument to explicitly pass/override the application locale
  * `format` argument which you pass in a key corresponding to a format configuration in `app/formats.js`

## Writing Unit Tests

Phantom does support the Intl API, so in order for ember-intl to work in a browser which does not support the Intl API, it needs to be polyfilled.

To resolve this, add the following above all script tags in `tests/index.html`:
```html
<script src="{{rootURL}}assets/intl/intl.complete.js"></script>
```

## Asynchronously loading translations

Asynchronously loading translations instead of bundling translations within `app.js` are fully-supported as of 2.x.
https://github.com/ember-intl/ember-intl/blob/2.x/docs/asynchronously-loading-translations.md

### Testing with ember-intl

* [Unit testing](https://github.com/ember-intl/ember-intl/blob/2.x/docs/unit-testing.md)
* [Integration testing](https://github.com/ember-intl/ember-intl/blob/2.x/docs/integration-testing.md)

## Common Errors

> `date value is not finite in DateTimeFormat.format()`

Browser vendors implement date/time parsing differently.  For example, the following will parse correctly in Chrome but fail in Firefox: `new Intl.DateTimeFormat().format('2015-04-21 20:47:31 GMT');`

The solution is the ensure that the value you are passing in is in a format which is valid for the `Date` constructor.  This library currently does not try and normalize date strings outside of what the browser already implements.

## Migrating from ember-i18n

* Simple migration tool to convert your translations files and application code to this addon.  Feel free to report any issues with the migration tool [here](https://github.com/DockYard/ember-i18n-to-intl-migrator/issues).
- https://github.com/DockYard/ember-i18n-to-intl-migrator

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

[npm]: https://www.npmjs.org/package/ember-intl
[npm-badge]: https://img.shields.io/npm/v/ember-intl.svg?style=flat-square
[travis]: https://travis-ci.org/ember-intl/ember-intl
[travis-badge]: https://travis-ci.org/ember-intl/ember-intl.svg?branch=master
[Intl-RF]: https://github.com/yahoo/intl-relativeformat
[Intl-MF]: https://github.com/yahoo/intl-messageformat
[Intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[Intl-NF]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
[Intl-DTF]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[ICU]: https://formatjs.io/guides/message-syntax/
[CLDR]: http://cldr.unicode.org/
[Intl.js]: https://github.com/andyearnshaw/Intl.js
[LICENSE]: https://github.com/yahoo/yahoo-intl/blob/master/LICENSE
[FormatJS]: http://formatjs.io/
