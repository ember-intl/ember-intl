# ember-intl

> This library is under heavy development.
> API is likely to change and there are likely known issues being worked on.

## Features

* Auto extracts CLDR based on targeted locales
* Automatically loads Intl API shim when browser does not support native API
* Data bound Ember components
* Hot swap locale at runtime

## Installation

* `npm install ember-intl --save-dev`
* `ember g ember-intl`

```js
/* Brocfile.js */
var app = new EmberApp({
	intl: {
		en: {
			// writes files to /locales/en.js and /locales.fr.js
			dest: 'locales',
			locales: ['en', 'fr']
		},
		all: {
			// write a file to locales.js contains /all/ locales
			dest: 'locales.js'
		}
	}
});

module.exports = app.toTree();
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

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`
