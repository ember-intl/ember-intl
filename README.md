# ember-intl

> This library is under heavy development.
> API is likely to change and there are likely known issues being worked on.


## Installation

* Ensure your application is running ember-cli >= 0.1.5
* `npm install ember-intl --save-dev`
* `ember g ember-intl`
* `ember g locale en`

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

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`
