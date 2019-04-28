# The `t` helper

The `t` helper accepts a translation key and returns a translated string.
To provide values to the dynamic segment of the translation, pass an object hash.

## ICU message syntax

Compiles a [ICU message syntax](https://formatjs.io/guides/message-syntax/) strings with its hash values passed.

{{#docs-demo as |demo|}}
  {{#demo.example name='docs-helpers-format-t-01-template.hbs'}}

    {{t 'photos.banner' numPhotos=count}}

    <button class="btn" {{action "inc" count}}> + Increment photo count </button>
    <button class="btn" {{action "dec" count}}> - Decrement photo count </button>
  {{/demo.example}}

  {{demo.snippet 'docs-helpers-format-t-01-template.hbs'}}
  {{demo.snippet 'docs-helpers-format-t-controller.js'}}
{{/docs-demo}}

```json
# translations/en-us.json
{
  "photos": {
    "banner": "You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}"
  }
}
```

## Format HTML Message

To enable rendering HTML within translations, pass an `htmlSafe` attribute to the `t` helper.

```hbs
{{t 'a.translation' htmlSafe=true}}
```

```yaml
# translations/en-en.yml
a:
  translations: '<em>Hello</em>'
```
It will escape all hash arguments and returns as an htmlSafe String which renders an ElementNode.  

```yaml
# translations/fr-fr.yml
photos:
  banner: Vous {numPhotos, plural, =0 {n'avez aucune photo.} =1 {avez une photo.} other {avez {numPhotos} photos.}}
```


## Service API

```js
export default Component.extend({
  intl: service(),

  banner: computed('intl.locale', 'model.photos.length', function() {
    return this.intl.t('photos.banner', {
      photos: this.get('model.photos.length')
    });
  })
});
```

{{docs-link 'More details here' 'docs.guide.ember-service-api'}}
