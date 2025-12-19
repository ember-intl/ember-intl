# &#123;&#123;format-message&#125;&#125;

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-message__example-1">
    <div>
      {{format-message
        this.descriptor1
        name="Sonja"
        numPhotos=12
        timestamp=this.yesterday
      }}
    </div>

    <div>
      {{format-message
        this.descriptor1
        name="Chris"
        numPhotos=0
        timestamp=this.yesterday
      }}
    </div>

    <div data-test-output="format-message">
      {{format-message
        this.descriptor1
        name="Maki"
        numPhotos=1
        timestamp=this.today
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-message__example-1__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-message__example-1__example.ts"
  />
</DocsDemo>


## Passing a string instead of a descriptor

`@formatjs/intl`'s `formatMessage()` requires an object called `descriptor`. In the simplest form, `descriptor` has the following type:

```ts
interface MessageDescriptor {
  defaultMessage?: string;
  description?: string;
  id?: string;
}
```

Currently, `ember-intl` allows you to pass a string instead. If possible, avoid using this feature and favor writing code explicitly.

```hbs
{{format-message
  "<em>{numPhotos, number} photos taken.</em>"
  trustHTML=true
  numPhotos=3
}}
```


## options.htmlSafe / options.trustHTML

To render an HTML in a translation message, set `htmlSafe` (or its alias `trustHTML`) to `true`.

> **Note:** `trustHTML` is an alias for `htmlSafe`, introduced to align with [Ember's naming convention](https://github.com/emberjs/ember.js/pull/20939). The name better reflects the behavior: you're marking the HTML content as trusted. Both options work identically.

<DocsDemo as |demo|>
  <demo.example>
    <div>
      {{format-message
        this.descriptor2
        htmlSafe=true
        numPhotos=3
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-message__example-2__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-message__example-2__example.ts"
  />
</DocsDemo>
