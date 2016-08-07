# ember-intl
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)
[![Ember badge][ember-badge]][embadge]

This library provides Ember Handlebar helpers and a localization service.  The service, and helpers, provide a way to format dates, numbers, strings messages, including pluralization.

## Notable Features
* Addon support (addons can provide translations up to the project application)
* Built on top of native standards ([Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) and ICU message syntax)
* Translations are able to be lazily loaded (not bundled with the app code)
* Formatting for relative time, datetime, and numbers
* Handlebar helpers and service API

## Installation
* `ember install ember-intl`
* Polyfill the Intl.js API (required for Safari/PhantomJS, and legacy browser)
    * Instructions on [loading from assets directory][]
    * Instructions on [conditionally loading the polyfill based on User-Agent][]
    * Instructions on [disabling polyfill][]

[loading from assets directory]: https://github.com/jasonmit/ember-intl/wiki/Intl.js-Polyfill#loading-files-from-assets
[conditionally loading the polyfill based on User-Agent]: https://github.com/jasonmit/ember-intl/wiki/Intl.js-Polyfill#polyfillio
[disabling polyfill]: https://github.com/jasonmit/ember-intl/wiki/Intl.js-Polyfill#disabling

## Translations
Translations are defined in `/translations`, *outside of `app`* in either JSON or YAML format.  Example of `/translations/en-us.yaml`:

```yaml
# en-us
product:
  info: '{product} will cost {price, number, USD} if ordered by {deadline, date, time}'
  title: 'Hello world!'
  html:
    info: '<strong>{product}</strong> will cost <em>{price, number, USD}</em> if ordered by {deadline, date, time}'
```

If you wish, you can organize your translations into subdirectories such as `/translations/login-page/en-us.yaml` and `translations/purchase-page/en-us.yaml`.

Translation keys containing periods, i.e., `foo.bar`, conflicts with internal accessors  -- which assumes nested objects and therefor triggers errors like: `Error: Property set failed: object in path "foo" could not be found or was destroyed`.  However, this is supported as of 2.5.x and to enable run `ember g ember-intl-dot-notation`.


### Translation Compilation

At build time, ember-intl walks all of the translations within the project and attempts to locate missing translations keys.  This is done through the `baseLocale` config property.  If translations keys are found on the base but not on other locales, a warning is written to the console and ember-intl will automatically use the value from the base locale as a filler.

```js
// config/ember-intl.js
module.exports = function(environment) {
  return {
    baseLocale: 'en-us' // default build-time locale
  };
};
```

## Setting runtime locale

Open, or create, `app/routes/application.js` and within `beforeModel` invoke `intl.setLocale`.  Example:

```js
  // app/routes/application.js
  export default Ember.Route.extend({
    intl: Ember.inject.service(),
    beforeModel() {
      // define the app's runtime locale
      // For example, here you would maybe do an API lookup to resolver
      // which locale the user should be targeted and perhaps lazily
      // load translations using XHR and calling intl's `addTranslation`/`addTranslations`
      // method with the results of the XHR request
      return this.get('intl').setLocale('en-us');

      // OR for those that sideload, an array is accepted to handle fallback lookups

      // en-ca is the primary locale, en-us is the fallback.
      // this is optional, and likely unnecessary if you define baseLocale (see below)
      // The primary usecase is if you side load all translations
      //
      // return this.get('intl').setLocale(['en-ca', 'en-us']);
    }
  });
```

## Helper Examples

### Format Number
Formats numbers using [`Intl.NumberFormat`][Intl-NF], and returns the formatted string value.

```hbs
{{format-number num}}
{{format-number num format='EUR'}}
{{format-number num style='currency' currency='USD'}}
{{format-number undefined fallback='nothing'}}
```

Or programmatically convert a number within any Ember Object.

```js
export default Ember.Component.extend({
  intl: Ember.inject.service(),
  computedNumber: Ember.computed('cost', function() {
    return this.get('intl').formatNumber(this.get('cost')/*, optional options hash */);
  })
});
```

#### Format Number Options
[List of supported format number options](https://github.com/jasonmit/ember-intl/wiki/Format-Number-Options)

### Format Date
Formats dates using [`Intl.DateTimeFormat`][Intl-DTF], and returns the formatted string value.

```hbs
{{format-date now weekday='long' timeZone='UTC'}}
{{format-date now hour='numeric' minute='numeric' hour12=false}}
{{format-date undefined fallback='nothing'}
```

Or programmatically convert a date within any Ember Object.

```js
export default Ember.Component.extend({
  intl: Ember.inject.service(),
  computedNow: Ember.computed(function() {
    return this.get('intl').formatDate(new Date()/*, optional options hash */);
  })
});
```

#### Format Date Options
[List of supported format date options](https://github.com/jasonmit/ember-intl/wiki/Format-Date-&-Time-Options)

### Format Time
This is just like the `{{format-date}}` helper, except it will reference any string-named `format` from [`formats.time`](#dataintlformats).

```hbs
{{format-time now format='hhmmss'}}
{{format-time now hour='numeric' minute='numeric' hour12=false}}
{{format-time undefined fallback='nothing'}}
```

Or programmatically convert a time within any Ember Object.

```js
// example
export default Ember.Component.extend({
  intl: Ember.inject.service(),
  computedNow: Ember.computed(function() {
    return this.get('intl').formatTime(new Date()/*, optional options hash */);
  })
});
```

#### Format Time Options
[List of supported format date options](https://github.com/jasonmit/ember-intl/wiki/Format-Date-&-Time-Options)

### Format Relative
Formats dates relative to "now" using [`IntlRelativeFormat`][Intl-RF], and returns the formatted string value.

```js
export default Ember.Component.extend({
  timestamp: Ember.computed(function() {
    var date = new Date();
    date.setDate(date.getDate() - 3);
    return date;
  })
});
```

```hbs
{{format-relative timestamp}} -> 3 days ago
{{format-relative undefined fallback='unknown'}} -> unknown
```

Or programmatically convert a relative time within any Ember Object.

```js
export default Ember.Component.extend({
  intl: Ember.inject.service(),
  yesterday: Ember.computed(function() {
    var date = new Date();
    return this.get('intl').formatRelative(date.setDate(date.getDate() - 1)/*, optional options hash */);
  })
});
```

#### Live Relative Timestamp

Recompute the relative timestamp on an interval by passing an `interval` argument (in milliseconds).

```hbs
{{format-relative now interval=1000}} -> now, 1 second ago, 2 seconds ago, etc. (will recompute every 1s)
```

#### Format Relative Options
[List of supported format date options](https://github.com/jasonmit/ember-intl/wiki/Format-Relative-Options)

### Format Message
Formats [ICU Message][ICU] strings with the given values supplied as the hash arguments.  A short-hand form of the `{{format-message}}` is `{{t}}`.

```
You have {numPhotos, plural,
  =0 {no photos.}
  =1 {one photo.}
  other {# photos.}}
```

```hbs
{{t 'product.info'
  product='Apple watch'
  price=200
  deadline=yesterday}}

{{t boundProperty
  name='Jason'
  numPhotos=num
  takenDate=yesterday}}
```
Or programmatically convert a message within any Ember Object.

```js
export default Ember.Component.extend({
  intl: Ember.inject.service(),
  yesterday: Ember.computed(function() {
    return this.get('intl').formatMessage('Hello {name}', { name: 'Jason' });
  })
});
```

#### Passing a string literal to Format Message

This is done by using the `{{l}}` (lowercase L) helper as a subexpression.  This is useful for computed properties where you are programmatically constructing a translation string.

```hbs
{{t (l '{name} took {numPhotos, plural,\n  =0 {no photos}\n  =1 {one photo}\n  other {# photos}\n} on {takenDate, date, long}')
    name='Jason'
    numPhotos=num
    takenDate=yesterday}}
```

### Format HTML Message
This delegates to the `{{t}}` helper, but will first HTML-escape all of the hash argument values. This allows the `message` string to contain HTML and it will be considered safe since it's part of the template and not user-supplied data.

```hbs
{{format-html-message 'product.html.info'
  product='Apple watch'
  price=200
  deadline=yesterday}}

{{format-html-message (l '<strong>{numPhotos}</strong>')
  numPhotos=(format-number num)}}
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
this.get('intl').formatDate('Thu Jan 23 2014 13:00:44', {
  format: 'hhmmss'
})
```

Output of both the helper and the programmatic example:

> 1:00:44 PM

## Polyfill

There are two options on how to load the Intl.js polyfill, either through the polyfill which ships with ember-intl or through polyfill.io.  Both of which are documented: https://github.com/jasonmit/ember-intl/wiki/Intl.js-Polyfill

## Helper Options
* All helpers accept optional arguments:
  * `locale` argument to explicitly pass/override the application locale
  * `format` argument which you pass in a key corresponding to a format configuration in `app/formats.js`

## Writing Unit Tests

Phantom does support the Intl API, so in order for for you ember-intl to work in a browser which does not support the Intl API, it needs to be polyfilled.

To resolve this, add the following above all script tags in `tests/index.html`:
```html
<script src="{{rootURL}}assets/intl/intl.complete.js"></script>
```

## Asynchronously loading translations

Asynchronously loading translations instead of bundling translations within `app.js` are fully-supported as of 2.x.  
https://github.com/jasonmit/ember-intl/wiki/Asynchronously-loading-translations

### Testing with ember-intl
* [Unit testing](https://github.com/jasonmit/ember-intl/wiki/Testing---Unit)
* [Integration testing](https://github.com/jasonmit/ember-intl/wiki/Testing---Integration)

## Common Errors

> `date value is not finite in DateTimeFormat.format()`

Browser vendors implement date/time parsing differently.  For example, the following will parse correctly in Chrome but fail in Firefox: `new Intl.DateTimeFormat().format('2015-04-21 20:47:31 GMT');`

The solution is the ensure that the value you are passing in is in a format which is valid for the `Date` constructor.  This library currently does not try and normalize date strings outside of what the browser already implements.

## Running
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests
* `ember test`
* `ember test --server`

[npm]: https://www.npmjs.org/package/ember-intl
[npm-badge]: https://img.shields.io/npm/v/ember-intl.svg?style=flat-square
[travis]: https://travis-ci.org/jasonmit/ember-intl
[travis-badge]: https://img.shields.io/travis/jasonmit/ember-intl/master.svg?style=flat-square
[embadge]: http://embadge.io/
[ember-badge]: http://embadge.io/v1/badge.svg?start=1.13.0
[Intl-RF]: https://github.com/yahoo/intl-relativeformat
[Intl-MF]: https://github.com/yahoo/intl-messageformat
[Intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[Intl-NF]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
[Intl-DTF]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[ICU]: http://userguide.icu-project.org/formatparse/messages
[CLDR]: http://cldr.unicode.org/
[Intl.js]: https://github.com/andyearnshaw/Intl.js
[LICENSE]: https://github.com/yahoo/yahoo-intl/blob/master/LICENSE
[FormatJS]: http://formatjs.io/
