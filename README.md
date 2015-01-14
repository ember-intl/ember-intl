# ember-intl

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

### Handlebars

```hbs
<h3>Format Date</h3>
{{format-date '12/29/1984'}}

<h3>Format Time</h3>
{{format-time today "hhmm"}}

<h3>Format Number</h3>
{{format-number 10 style="currency" currency="USD"}}

{{#x-intl locales="fr-FR"}}
	<p>
		<b>{{format-date today day="numeric" month="long"}}</b>
		<i>("fr-FR" locale)</i>
	</p>
{{/x-intl}}

{{format-message (intl-get "messages.photos")
	name="Jason"
	numPhotos=photosTaken
	takenDate=today}}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`
