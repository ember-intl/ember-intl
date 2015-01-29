# ember-intl

[![Build Status](https://travis-ci.org/yahoo/ember-intl.svg)](https://travis-ci.org/yahoo/ember-intl)

This library provides Ember Handlebar helpers and a localization service injected into views, routes, models, controllers, and components.  The
service, and helpers, provide a way to format dates, numbers, strings messages, including pluralization.


## Requirements
* Ember-cli >= 0.1.5
* HTMLBars and Handlebars supported

## Installation
* `npm install ember-intl --save-dev`
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
export default {
	locale: "en",
	...
	messages: {
		product: {
			info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}',
			html: {
				info: '<strong>{product}</strong> will cost <em>{price, number, EUR}</em> if ordered by {deadline, date, time}'
			}
		}
	}
}
```

* Configure which locale you want to use at runtime:
	* Open app/app.js
	* Add a `ready` hook:

```js
	var App = Ember.Application.extend({
		ready: function () {
			// setup default locale to fr but will fallback to en
			this.intl.setProperties({
				locales: ['fr-FR'],
				defaultLocales: ['en']
			});
		}
	});
```

## Examples

### Format Number
```hbs
{{format-number num}}
{{format-number num format='EUR'}}
{{format-number num style='currency' currency='USD'}}
```

### Format Time
```hbs
{{format-time now format='hhmmss'}}
{{format-time now hour='numeric' minute='numeric' hour12=false}}
```

### Format Relative
```hbs
{{format-relative yesterday}}
```

### Format Message

```hbs
{{format-message (intl-get 'product.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{format-message messages.photos
	name='Jason'
	numPhotos=num
	takenDate=yesterday}}
```

### Format HTML Message

```hbs
{{format-html-message (intl-get 'product.html.info')
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{format-html-message '<strong>{numPhotos}</strong>'
	numPhotos=(formatNumber num)}}
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
