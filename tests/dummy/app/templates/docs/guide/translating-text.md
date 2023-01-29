# Translating Text

## Translations

Translations are defined in [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax) and stored in
`<root>/translations` in JSON or YAML format. Nested objects are supported within your translation files.


### Nested translations

Translations can be organized in nested directories:

```
/translations
  en-us.yaml
  en-gb.yaml
  /blog
    en-us.yaml
    en-gb.yaml
  /reports
    en-us.yaml
    en-gb.yaml
  /commerce
    en-us.yaml
    en-gb.yaml
    /cart
      en-us.yaml
      en-gb.yaml
```


### The `wrapTranslationsWithNamespace` option

By default, the keys of the translations are not changed when nested directories are created. With the option
`wrapTranslationsWithNamespace` activated, ember-intl will wrap the keys of the translations with the names of
the subdirectories.

When `wrapTranslationsWithNamespace` is `true`, a translation under `<root>/translations/commerce/cart`
with the key `title` will be accessed using the key `commerce.cart.title`, instead the key `title`.

> White spaces can be used in the names of the subdirectories.
> They will be converted to underscores when used as namespaces of the keys.
> `<root>/translations/foo bar` will be converted to `foo_bar`.


## Translate

```hbs
<h1>
  {{t "my_route.page_title"}}
</h1>
```


### HTML Element Attributes

```hbs
<input
  placeholder={{t "fields.email.placeholder"}}
  type="email"
  value={{this.email}}
>
```


### Helper/Component Attributes

```hbs
<Input
  @placeholder={{t "fields.email.placeholder"}}
  @type="email"
  @value={{this.email}}
/>
```


### Fallback Translation

The `t` helper supports a fallback lookup if the intended translation key is missing.

In the below example, if the translation for `"a_key_that_is_missing"` was missing then the translation key `"errors.graceful_missing_translation"` would be looked up and used in its place.

```hbs
{{t "a_key_that_is_missing" default="errors.graceful_missing_translation"}}
```

```js
this.intl.t('a_key_that_is_missing', {
  /* Note: default can also be a string[], they'll be tried in order */
  default: [
    'errors.graceful_missing_translation_one',
    'errors.graceful_missing_translation_two'
  ]
});
```


## Computed Property Macros

### t

`t` is a computed property macro that makes it easy to define translated
computed properties. For example:

```js
import Component from '@ember/component';
import { t } from 'ember-intl';

export default Component.extend({
  followersCount: 1,

  // A simple translation.
  title: t('user.edit.title'),

  // A translation with interpolations. This computed property
  // depends on `count` and will send `{ count: this.followersCount }`
  // in to the translation.
  followersTitle: t('user.followers.title', {
    count: 'followersCount'
  })
});
```

The first argument is the translation key. The second is a hash where the keys
are interpolations in the translation and the values are paths to the values
relative to this.

If you want to pass static values instead of paths to dynamic value, you can use
the `raw` function like in
[`ember-macro-helpers`](https://github.com/kellyselden/ember-macro-helpers#raw).

```js
import Component from '@ember/component';
import { raw, t } from 'ember-intl';

export default Component.extend({
  userName: 'Tom',

  // A translation with dynamic and static values
  title: t('user.edit.title', {
    brand: raw('Ember'),
    name: 'userName'
  })
});
```

Note: Even though `raw` is _named_ the same as in `ember-awesome-macros` /
`ember-macro-helpers`, they _are not_ the same. Be sure to always use the
correct `raw` with `ember-intl` and `ember-awesome-macros` / `ember-macro-helpers`.


### intl

`intl` is the underlying computed property macro for `t` and you can use it
directly to access other methods from the `intl` service. It looks like this:

```js
import Component from '@ember/component';
import { intl } from 'ember-intl';

export default Component.extend({
  dateFormat: 'hhmmss',
  now: new Date(),

  nowFormatted: intl('now', 'dateFormat', function(intl/*, propertyKey, instance */) {
    return intl.formatDate(this.now, {
      format: this.dateFormat
    });
  })
});
```

`intl` expects a list of dependent keys, which may be empty, and the computed
property getter method as the last argument. The getter method receives three
arguments:

- `intl`: The `intl` service.
- `propertyKey`: The name of the computed property. In the above example it
  would be `nowFormatted`.
- `instance`: The class instance the computed property is installed on. This is
  equivalent to `this` in the above example. The reason `instance` is also
  passed to the getter method is to allow terser arrow function syntax instead
  of the `function` keyword:

  ```js
  intl('now', (intl, key, instance) => intl.formatDate(instance.now, { format: 'hhmmss' }));
  ```
