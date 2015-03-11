# ember-intl

[![Build Status](https://travis-ci.org/yahoo/ember-intl.svg)](https://travis-ci.org/yahoo/ember-intl)

This library provides Ember Handlebar helpers and a localization service injected into views, routes, models, controllers, and components.  The
service, and helpers, provide a way to format dates, numbers, strings messages, including pluralization.

## Overview
**Ember Intl is part of [FormatJS][], the docs can be found on the website:**

**<http://formatjs.io/ember/>**

## Requirements
* Ember-cli >= 0.1.5
* Ember >= 1.9.x (1.10-beta-* supported)
* HTMLBars and Handlebars supported

## Installation
* `npm install --save ember-intl`
* `ember g ember-intl`
* `ember g locale en`
* If you are targeting a browser that doesn't support the native Intl API, you need to load the shim.  The
[Intl.JS polyfill](https://github.com/andyearnshaw/Intl.js/) is automatically added into your asset distribution folder,
so you need to add the following to your index.html:

```html
<script src="/assets/intl/polyfill/Intl.complete.js"></script>
```

* Add custom messages per locale in their respective ES6 locale module.
Example of app/locales/en.js:

```js
import Locale from 'ember-intl/models/locale';

export default Locale.extend({
	messages: {
		product: {
			info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}',
			html: {
				info: '<strong>{product}</strong> will cost <em>{price, number, EUR}</em> if ordered by {deadline, date, time}'
			}
		}
	}
});
```

* Configure which locale you want to use at runtime:
	* Open app/app.js
	* Add a `ready` hook:

```js
	var App = Ember.Application.extend({
		ready: function () {
			// setup default locale to navigator.language but will fallback to en
			this.intl.set('locales', [navigator.language, 'en']);
		}
	});
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
{{format-message (intl-get 'messages.product.info')
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
{{format-html-message (intl-get 'messages.product.html.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{format-html-message '<strong>{numPhotos}</strong>'
	numPhotos=(format-number num)}}
```

### Intl-Get

Utility helper for accessing and returning the value the properties from the locale's message object via a string namespace.

```hbs
{{format-message (intl-get 'messages.product.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}
```

Will return the message from the current locale, or locale explicitly passed as an argument, message object.

```js
// app/locales/en.js
import Locale from 'ember-intl/models/locale';

export default Locale.extend({
	messages: {
		product: {
			info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}'
		}
	}
});
```

### Helper Options
* All helpers accept an optional:
	* `locales` argument to explicitly pass/override the application locale
	* `format` argument which you pass in a key corresponding to a format configuration in `app/formats.js`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

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
