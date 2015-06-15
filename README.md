# ember-intl

[![Join the chat at https://gitter.im/yahoo/ember-intl](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yahoo/ember-intl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Ember Observer Score](http://emberobserver.com/badges/ember-intl.svg)](http://emberobserver.com/addons/ember-intl)

This library provides Ember Handlebar helpers and a localization service injected into views, routes, models, controllers, and components.  The
service, and helpers, provide a way to format dates, numbers, strings messages, including pluralization.

## Overview
**Ember Intl is part of [FormatJS][], the docs can be found on the website:**

**<http://formatjs.io/ember/>**

## Requirements
* Ember-cli >= 0.2.0
* Ember >= 1.10.x
* HTMLBars

## Ember-Intl 2.0

This README is targetting and explaining the 2.0 API which differs from previous versions.  If you are looking for the 1.3.0 documentation, please check [here](https://github.com/yahoo/ember-intl/blob/1.3.0/README.md).


## Installation
* `ember install ember-intl` (or `ember install:addon ember-intl` for ember-cli < v0.2.3)
* If you are targeting a browser that doesn't support the native Intl API (such as Safari or PhantomJS), you need to load the shim.  The [Intl.JS polyfill](https://github.com/andyearnshaw/Intl.js/) is automatically added into your asset distribution folder, so you need to add the following to your index.html:

```html
<script src="/assets/intl/polyfill/Intl.complete.js"></script>
```

Translations are defined in `/translations`, *outside of `app`* in either JSON or YAML format.  Example of `/translations/en-us.yaml`:

```yaml
product:
  info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}'
  title: 'Hello world!'
  html:
    info: '<strong>{product}</strong> will cost <em>{price, number, EUR}</em> if ordered by {deadline, date, time}'
```

* Configure which locale you want to use at runtime:
	* Open (or create) app/routes/application.js

```js
  // app/routes/application.js
  export default Ember.Route.extend({
    intl: Ember.inject.service(),

    beforeModel: function() {
      // define the app's runtime locale
      // For example, here you would maybe do an API lookup to resolver
      // which locale the user should be targeted and perhaps lazily
      // load translations using XHR and calling intl's `addMessage`/`addMessages`
      // method with the results of the XHR request
      this.get('intl').set('locale', 'en-US');
    }
  });
```

* **A default locale is required**.  This is used as the "source of truth" to determine if any translations are missing a translation at build time.  It will offer warnings displaying with locale's are missing translations for a particular key.  The default locale is configurable within `config/environment.js`.

```js
// config/environment.js
ENV: {
  ...
  intl: {
      defaultLocale: 'en' /* default value */
  }
}
```

## Examples

### Format Number

Formats numbers using [`Intl.NumberFormat`][Intl-NF], and returns the formatted string value.

```hbs
{{format-number num}}
{{format-number num format='EUR'}}
{{format-number num style='currency' currency='USD'}}
```

### Format Date

Formats dates using [`Intl.DateTimeFormat`][Intl-DTF], and returns the formatted string value.

```hbs
{{format-date now weekday='long' timeZone='UTC'}}
{{format-date now hour='numeric' minute='numeric' hour12=false}}
```

### Format Time

This is just like the `{{format-date}}` helper, except it will reference any string-named `format` from [`formats.time`](#dataintlformats).

```hbs
{{format-time now format='hhmmss'}}
{{format-time now hour='numeric' minute='numeric' hour12=false}}
```

### Format Relative

Formats dates relative to "now" using [`IntlRelativeFormat`][Intl-RF], and returns the formatted string value.

```hbs
{{format-relative yesterday}}
```

### Format Message

Formats [ICU Message][ICU] strings with the given values supplied as the hash arguments.

```
You have {numPhotos, plural,
	=0 {no photos.}
	=1 {one photo.}
	other {# photos.}}
```

```hbs
{{format-message (intl-get 'product.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{format-message boundProperty
	name='Jason'
	numPhotos=num
	takenDate=yesterday}}
```

### Format HTML Message

This delegates to the `{{format-message}}` helper, but will first HTML-escape all of the hash argument values. This allows the `message` string to contain HTML and it will be considered safe since it's part of the template and not user-supplied data.

```hbs
{{format-html-message (intl-get 'product.html.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{format-html-message '<strong>{numPhotos}</strong>'
	numPhotos=(format-number num)}}
```

### Intl-Get

Utility helper for returning the value, or eventual value, based on a translation key.  *Should only ever be used as a subexpression, never as a standalone helper.*

```hbs
{{format-message (intl-get 'product.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}
```

Will return the message from the current locale, or locale explicitly passed as an argument, message object.

```yaml
product:
  info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}'
```

### Helper Options
* All helpers accept optional arguments:
	* `locale` argument to explicitly pass/override the application locale
	* `format` argument which you pass in a key corresponding to a format configuration in `app/formats.js`

## Writing Unit Tests

If using the intl helpers within a components or views that is unit tested, `needs` the service, helper, and formatter into the unit test.

In the setup hook of `moduleFor`/`moduleForComponent` you'll want to also invoke `registerIntl(container);` -- which is a utility function to setup the injection logic on the unit test container.

**NOTE**: Add the following above all script tags in `tests/index.html`

`<script src="assets/intl/polyfill/Intl.complete.js"></script>`

This is to shim your test runner if running within phantomjs, or any browser which does not natiely support the Intl API.

=======
### Example unit test

```javascript
/**
 * unit test for testing index view which contains the helpers: `format-message` and `intl-get`
 *
 * unit/views/index-test.js
 */
import Ember from 'ember';

import { registerIntl } from '../../../initializers/ember-intl';

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('view:index', 'IndexView', {
  needs: [
    'template:index',
    'adapter:-intl-adapter',
    'service:intl',
    'helper:intl-get',
    'ember-intl@formatter:format-message',
    'translation:en',
    'translation:es'
  ],
  setup: function () {
    // depending on your test library, container will be hanging off `this`
    // or otherwise passed in as the first argument
    var container = this.container || arguments[0];
    // injects the service on to all logical factory types
    registerIntl(container);

    // set the initial intl service locale to `en-us`
    var intl = container.lookup('service:intl');
    intl.set('locale', 'en');
  }
});

test('index renders', function () {
  expect(2);

  var view = this.subject({
    context: Ember.Object.create({
      firstName: 'Tom'
    })
  });

  var intl = view.get('intl');

  // render view
  Ember.run(view, 'appendTo', '#qunit-fixture');

  equal(view.$().text().trim(), "hello Tom");

  Ember.run(function () {
    intl.set('locale', 'es');
  });

  equal(view.$().text().trim(), "hola Tom");

  // destroy view
  Ember.run(view, 'destroy');
});
```
## Known Gotchas

> `date value is not finite in DateTimeFormat.format()`

Browser vendors implement datetime parsing differently.  For example, the following will parse correctly in Chrome but fail in Firefox: `new Intl.DateTimeFormat().format('2015-04-21 20:47:31 GMT');`

The solution is the ensure that the value you are passing in is in a format which is valid for the `Date` constructor.  This library currently does not try and normalize date strings outside of what the browser already implements.

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

[npm]: https://www.npmjs.org/package/ember-intl
[npm-badge]: https://img.shields.io/npm/v/ember-intl.svg?style=flat-square
[travis]: https://travis-ci.org/yahoo/ember-intl
[travis-badge]: https://img.shields.io/travis/yahoo/ember-intl/master.svg?style=flat-square
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
