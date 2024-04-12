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
