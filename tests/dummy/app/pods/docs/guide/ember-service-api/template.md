# Service API

ember-intl ships with a service which exposes an API to programmatically
interface with all the known functionality exposed through the declarative
helpers.

## How to inject service

```js
Ember.Object.extend({
  intl: Ember.inject.service()
});
```

Access the service from within the instance via: `this.get('intl')` or just `this.intl`, if you have [ES5 getters enabled](https://www.emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_es5-getters-for-computed-properties-2-of-4).

## Properties

### locale

Set/get the current locale for your application. The value you set it to can either be a string or an array of strings. When providing an array, the `t` helper and `t` method will attempt to try all the locales in order when resolving a translation key. This is useful if you want to always fallback to another locale when a translation may be missing.

When you get this property, it will always return an array of strings, even if you have set it to be just one single locale. If you are only interested in retrieving the single (or first) locale, use **`primaryLocale`**.

### primaryLocale _readOnly_

Returns the first locale of the currently active locales, i.e. the first object of the `locale` property.

```js
intl.get('primaryLocale') => 'en-us'
```

### locales _readOnly_

Returns an array of locales that have translations assigned to them. This works
with both bundled translations and lazy-loaded translations.

```js
intl.get('locales') => ['en-us', 'en-ca', 'fr-fr'];
```

## Methods

### t _(translationKey:String, optionalOptions:Object)_: String | SafeString

Unlike `formatMessage`, the `t` method accepts a translation key instead of a
translation string. This method returns a translated string. To provide
values to the dynamic segment of the translation, pass an object hash.

```yaml
product: '{name} will cost {price, number, USD}'
```

```js
// app/formats.js
export default {
  number: {
    USD: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }
  }
};
```

```js
this.intl.t('product', {
  name: 'watch',
  price: 300
});
```

Outputs:

> watch will cost \$300

By default, ember-intl's `t` method and `formatMessage` will return a String literal. If your translations contain HTML markup and you want to use render HTML from your translations to the document then pass `htmlSafe=true` to either `t` & `format-message` helpers or `{ htmlSafe: true }` to `intl.t()` or `intl.formatMessage()`.

```js
this.intl.t('title.header', { htmlSafe: true });
```

```hbs
{{t 'title.header' htmlSafe=true}}
```

### formatMessage _(translation:String, optionalOptions:Object)_: String

`formatMessage` formats a translation string. Unlike the `t` method, it
accepts a translation string instead of a translation key.

```js
this.intl.formatMessage('{name} will cost {price, number, USD}', {
  name: 'watch',
  price: 300
});
```

Outputs:

> watch will cost \$300

### formatMessage (html) _(value:String, optionalOptions:Object)_: SafeString

`formatMessage`, when provided the `htmlSafe` options, formats a translation string and returns an
`Handlebars.SafeString`. This is useful for rendering translations containing
HTML markup. Since options can contain unsafe markup, all attribute hash
values are escaped.

```js
this.intl.formatMessage('<strong>{firstName}</strong> {lastName}', {
  firstName: 'John',
  lastName: '<em>Doe</em>',
  htmlSafe: true
});
```

Outputs:

> **John** \<em\>Doe\</em\>

Note, the Doe is escaped and does not return markup.

### formatNumber _(value:Number, optionalOptions:Object)_: String

Documentation missing

### formatDate _(value:Date/Number/String, optionalOptions:Object)_: String

Documentation missing

### formatTime _(value:Date/Number/String, optionalOptions:Object)_: String

Documentation missing

### exists _(translationKey:String, optionalLocale:String)_: Boolean

Returns a boolean indicating whether the translation exists. Locale is
optional. If omitted, the current/active locale is used in it's place.
This method always returns a Boolean.

```js
this.get('intl').exists('foo.bar', 'en-us');
// => true
```

### addTranslations _(locale:String, payload:Object)_: void

Adds a translations to a given locale. Useful for registering translations at runtime.

### lookup _(translationKey:String, optionalLocale:String | Array{String}, optionalOptions:Object)_: String | undefined

Given a translation key, will return the translation for either the active
locale, or the locale specified as the second argument.

```js
this.intl.lookup('shared.confirmMessage', 'en-us', {
  resilient: true
});
```

Returns `undefined` if you pass `{ resilient: true }`. If ommitted, will return a missing translation message.

### setLocale _(locale:String | Array{String})_: void

Documentation missing

### addLocaleData _(data:Object)_: void

Documentation missing

### translationsFor _(localeName:String)_: Object

Documentation missing

