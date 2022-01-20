{{locale-switcher}}
# The `t` Helper

The `t` helper accepts a translation key and returns a translated string.
To provide values to the dynamic segment of the translation, pass an object hash.

## ICU Message Syntax

Compiles a [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax) strings with its hash values passed.

{{t "photos.banner" numPhotos=this.count}}

<button class="btn" {{on "click" this.increment}}> + Increment photo count </button>
<button class="btn" {{on "click" this.decrement}}> - Decrement photo count </button>

```hbs
{{t "photos.banner" numPhotos=this.count}}
```

```json
# translations/en-us.json
{
  "photos": {
    "banner": "You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}"
  }
}
```

## Named and Positional Arguments

Options may be passed to the `t` helper as either named or positional arguments. The following examples are equivalent:

_Named arguments:_
```hbs
{{t 'photos.banner' numPhotos=this.count}}
```

_Positional arguments:_
```hbs
{{t 'photos.banner' (hash numPhotos=this.count)}}
```

When both named and positional arguments are used, they'll be merged together and named arguments will take precedence over the properties of duplicate positional arguments.

## Format HTML Message

To enable rendering HTML within translations, pass an `htmlSafe` attribute to the `t` helper.

```hbs
{{t 'a.translation' htmlSafe=true}}
```

_Do not_ use `{{{triple-curlies}}}`! This would enable XSS for variables passed
to `{{t}}`.

```yaml
# translations/en-en.yml
a:
  translations: "'<em>'Hello'</em>'"
```

It will escape all hash arguments and returns as an `htmlSafe` String which renders an ElementNode.  

```yaml
# translations/fr-fr.yml
photos:
  banner: Vous {numPhotos, plural, =0 {n'avez aucune photo.} =1 {avez une photo.} other {avez {numPhotos} photos.}}
```

If you use placeholders _inside_ of an HTML tag for attributes, escape only the
angle brackets, like so:

```yaml
# translations/en-en.yml
legal:
  accept-terms: Please accept our '<'a href="{url}"'>'terms & conditions'</a>'.
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

{{docs-link 'More details here' 'docs.guide.service-api'}}
