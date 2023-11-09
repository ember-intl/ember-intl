<LocaleSwitcher />

# The `t` Helper

The `t` helper accepts a translation key and returns a translated string.
To provide values to the dynamic segment of the translation, pass an object hash.


## ICU Message Syntax

Compiles an [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax) strings with its hash values passed.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__t__example-1">
    <div class="toolbar">
      <button
        class="button"
        type="button"
        {{on "click" this.addPhoto}}
      >
        Add photo
      </button>

      <button
        class="button"
        type="button"
        {{on "click" this.deletePhoto}}
      >
        Delete photo
      </button>
    </div>

    <div>
      Message: {{t "photos.banner" numPhotos=this.numPhotos}}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__t__example-1__my-component.hbs"
  />

  <demo.snippet
    @label="my-component.js"
    @name="docs__helpers__t__example-1__my-component.js"
  />

  <demo.snippet
    @label="translations/en-us.yaml"
    @name="docs__helpers__t__example-1__translations__en-us.yaml"
  />
</DocsDemo>


## Named and Positional Arguments

Options may be passed to the `t` helper as either named or positional arguments. The following examples are equivalent:

```hbs
{{!-- With named arguments --}}
{{t "photos.banner" numPhotos=this.numPhotos}}
```

```hbs
{{!-- With positional arguments --}}
{{t "photos.banner" (hash numPhotos=this.numPhotos)}}
```

When both named and positional arguments are used, they'll be merged together and named arguments will take precedence over the properties of duplicate positional arguments.


## Format HTML Message

To enable rendering HTML within translations, pass an `htmlSafe` attribute to the `t` helper.

```hbs
{{t "call-to-action" htmlSafe=true}}
```

```yaml
# translations/en-us.yaml
call-to-action: Visit <a href="https://www.emberjs.com">Ember.js website</a>.
```

It will escape all hash arguments and returns as an `htmlSafe` String which renders an ElementNode.
_Do not_ use `{{{triple-curlies}}}`! This would enable XSS for variables passed
to `{{t}}`.

If you use placeholders _inside_ of an HTML tag for attributes, escape only the
angle brackets, like so:

```yaml
# translations/en-en.yml
legal:
  accept-terms: Please accept our '<'a href="{url}"'>'terms & conditions'</a>'.
```


## Service API

```js
import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class MyController extends Controller {
  @service intl;

  get photosBanner() {
    const numPhotos = this.model.photos.length;

    return this.intl.t('photos.banner', { numPhotos });
  }
}
```

Visit the page <DocsLink @route="docs.guide.service-api">Service API</DocsLink> to learn more.