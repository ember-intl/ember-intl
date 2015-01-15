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
	i18n: {
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
{{intl-number value=photosTaken}}
{{intl-number value=photosTaken format='EUR'}}
{{intl-number value=photosTaken style='currency' currency='USD'}}
```

### Format Time
```hbs
{{intl-time value=now format='hhmmss'}}
{{intl-time value=now hour='numeric' minute='numeric' hour12=false}}
```

### Format Relative
```hbs
{{intl-relative value=yesterday}}
```

### Format Message

```hbs
{{intl-message
	messageKey='product.info'
	product='Apple watch'
	price=200
	deadline=yesterday}}

{{intl-message
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
