<LocaleSwitcher />

# Format Message

Formats [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax) strings with the provided values passed as arguments to the helper/method.

<DocsDemo as |demo|>
  <demo.example @name="docs__helpers__format-message__example-1">
    <div>
      {{format-message
        this.customMessage
        name="Sonja"
        numPhotos=12
        timestamp=this.yesterday
      }}
    </div>

    <div>
      {{format-message
        this.customMessage
        name="Chris"
        numPhotos=0
        timestamp=this.yesterday
      }}
    </div>

    <div>
      {{format-message
        this.customMessage
        name="Maki"
        numPhotos=1
        timestamp=this.today
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="my-component.hbs"
    @name="docs__helpers__format-message__example-1__my-component.hbs"
  />

  <demo.snippet
    @label="my-component.js"
    @name="docs__helpers__format-message__example-1__my-component.js"
  />
</DocsDemo>


## Format HTML Message

To enable rendering HTML within translations, pass an `htmlSafe` attribute to the `format-message` helper.

```hbs
{{format-message
  "'<em>'{numPhotos, number}'</em>'"
  htmlSafe=true
  numPhotos=@photos.length
}}
```

It will escape all hash arguments and returns as an htmlSafe String which renders an ElementNode.  


## Service API

```js
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MyComponent extends Component {
  @service intl;

  customMessage = 'You took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.';

  get message() {
    const photos = this.args.photos ?? [];

    return this.intl.formatMessage(this.customMessage, {
      numPhotos: photos.length
    });
  }
}
```

Visit the page <DocsLink @route="docs.guide.service-api">Service API</DocsLink> to learn more.