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
	locales: {
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
{{format-number value=photosTaken}}
{{format-number value=photosTaken format='EUR'}}
{{format-number value=photosTaken style='currency' currency='USD'}}
```

### Format Time
```hbs
{{format-time value=now format='hhmmss'}}
{{format-time value=now hour='numeric' minute='numeric' second='numeric' hour12=false}}
```

### Format Relative
```hbs
{{format-relative value=yesterday}}
```

### Format Message

```hbs
{{format-message
	messageKey='product.info'
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{format-message
	message=messages.photos
	name='Jason'
	numPhotos=photosTaken
	takenDate=yesterday}}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`
