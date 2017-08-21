
Service API
==============================================================================

ember-intl ships with a service which exposes an API to programmatically
interface with all the known functionality exposed through the declarative
helpers.

## How to inject service

```js
Ember.Object.extend({
  intl: Ember.inject.service()
});
```

Access the service from within the instance via: `this.get('intl')`

## Properties

**locale** _readOnly_

The current locale associated with the application.  To set this property,
use the `setLocale` method.

**locales** _readOnly_

Returns an array of locales that have translations assigned to them.  This works
with both bundled translations and lazy-loaded translations.

```js
intl.get('locales') => ['en-us', 'en-ca', 'fr-fr'];
```

## Methods

**t** _(translationKey:String, optionalOptions:Object, optionalFormats:Object)_

Unlike `formatMessage`, the `t` method accepts a translation key instead of a
translation string.  This method returns a translated string.  To provide
values to the dynamic segment of the translation, pass an object hash.

```yaml
product: '{name} will cost {price, number, USD}'
```

```js
// Formats are typically defined in `app/format.js` and will be used if
// the format object is omitted. However, this example covers the most
// complex use of the method and explicitly passes a formats hash
const formats = {
  number: {
    USD: { style: 'currency', currency: 'USD' },
    currency: {
      style: 'currency',
      minimumFractionDigits: 2
    }
  }
};

this.get('intl').t('product', {
  product: 'watch',
  price: 300
}, formats);
```

Outputs:

> watch will cost $300

By default, ember-intl's `t` method and `formatMessage` will return a String literal.  If your translations contain HTML markup and you want to use the output in a template, you'll want to escape all user input and wrap the output in an `Ember.String.htmlSafe()`.

To mark the ICU message string as html-safe supply the `htmlSafe` attribute to the either the helper or service API.

```hbs
{{t 'title.header' htmlSafe=true}}
```

```js
this.intl.t('title.header', { htmlSafe: true });
```

```js
this.intl.formatMessage('<strong>hello {name}</strong>', {
  name: model.firstName,
  htmlSafe: true
});
```

```hbs
{{format-message '<strong>hello {name}</strong>' htmlSafe=true}}
```

**formatMessage** _(translation:String, optionalOptions:Object, optionalFormats:Object)_

`formatMessage` formats a translation string. Unlike the `t` method, it
accepts a translation string instead of a translation key.

```js
this.get('intl').formatMessage('{name} will cost {price, number, USD}', {
  product: 'watch',
  price: 300
});
```

Outputs:

> watch will cost $300

**formatNumber** _(value:Number, optionalOptions:Object)_

Documentation missing

**formatDate** _(value:Date/Number/String, optionalOptions:Object)_

Documentation missing

**formatTime** _(value:Date/Number/String, optionalOptions:Object)_

Documentation missing

**exists** _(translationKey:String, optionalLocale:String)_

Returns a boolean indicating whether the translation exists. Locale is
optional. If omitted, the current/active locale is used in it's place.
This method always returns a Boolean.

```js
this.get('intl').exists('foo.bar', 'en-us');
// => true
```

**setLocale** _(localeName:String)_

Setter for setting the application's active locale.  Setting this value will
trigger a rerender of all helpers that do not specify a locale as an
attribute.

**addTranslation** _(locale:String, key:String, value:String)_

Documentation missing

**addTranslations** _(locale:String, payload:Object)_

Documentation missing

**findTranslationByKey** _(translationKey:String, optionalLocale:String)_

Given a translation key, will return the translation for either the active
locale, or the locale specified as the second argument.  If not translation
is found, `undefined` is returned.

```js
var title = this.get('intl').findTranslationByKey('shared.confirmMessage');
```
