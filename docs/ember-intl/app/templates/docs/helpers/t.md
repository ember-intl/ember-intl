# &#123;&#123;t&#125;&#125;

The `{{t}}` helper finds the translation message corresponding to a key, then [populates the message with data](https://formatjs.github.io/docs/core-concepts/icu-syntax/). The helper returns the resulting string.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-1">
    <div data-test-output="t">
      {{t "hello.message"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__t__example-1__example.hbs"
  />

  <demo.snippet
    @label="translations/de-de.yaml"
    @name="docs__helpers__t__example-1__translations__de-de.yaml"
  />

  <demo.snippet
    @label="translations/en-us.yaml"
    @name="docs__helpers__t__example-1__translations__en-us.yaml"
  />
</DocsDemo>


## Passing data

We use the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/) to pass data to translations. Data can also be formatted when you specify their type.

```yml
# A simple argument
hello:
  message: Hello, {name}!
```

```yml
# A plural-type argument
photo-album:
  summary: You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.
```

To pass data to the `{{t}}` helper, you can use named arguments, a positional argument (2nd position), or a combination of both. In the combined case, data passed as named arguments will take precedence.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-2">
    <div data-test-output="t, data">
      {{t "photo-album.summary" (hash numPhotos=3)}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__t__example-2__example.hbs"
  />

  <demo.snippet
    @label="translations/de-de.yaml"
    @name="docs__helpers__t__example-2__translations__de-de.yaml"
  />

  <demo.snippet
    @label="translations/en-us.yaml"
    @name="docs__helpers__t__example-2__translations__en-us.yaml"
  />
</DocsDemo>

Note, when an argument doesn't have a value, `@formatjs/intl` will throw a `FORMAT_ERROR` error. Even when you [ignore this error](../services/intl-part-2#setonformatjserror-), `@formatjs/intl` will return the message as is.

```html
<!-- What users see when `numPhotos` is undefined -->
You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.
```

Please check that all arguments are well-defined when using the `{{t}}` helper. You might consider [creating default values](../services/intl-part-2#gettranslation-).

```hbs
{{#let (hash numPhotos=0) as |fallback|}}
  {{t
    "photo-album.summary"
    fallback
    numPhotos=@user.numPhotos
  }}
{{/let}}
```


## options.htmlSafe / options.trustHTML

To render an HTML in a translation message, set `htmlSafe` (or its alias `trustHTML`) to `true`. The `{{t}}` helper returns a `SafeString` (casted as `string` to improve DX).

**Warning: Do not use triple curly braces (e.g. `{{{t "call-to-action"}}}`), as it can allow XSS (cross-site scripting).**

```hbs
{{! components/example.hbs }}
{{t "ember.visit-homepage" trustHTML=true}}
```

> **Note:** `trustHTML` is an alias for `htmlSafe`, introduced to align with [Ember's naming convention](https://github.com/emberjs/ember.js/pull/20939). The name better reflects the behavior: you're marking the HTML content as trusted. Both options work identically.

```yaml
# translations/en-us.yaml
ember:
  visit-homepage: Visit <a href="https://www.emberjs.com">Ember.js</a>.
```

To pass data to an HTML tag, escape the angle brackets:

```hbs
{{! components/example.hbs }}
{{t
  "ember.visit-legal"
  (hash
    url="https://emberjs.com/about/legal"
  )
  htmlSafe=true
}}
```

```yaml
# translations/en-us.yaml
ember:
  visit-legal: See our '<'a href="{url}"'>'Terms and Conditions'</a>'.
```


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-3">
    <div lang="en-us">
      {{t
        "photo-album.summary"
        (hash
          numPhotos=3
        )
        locale="en-us"
      }}
    </div>

    <div data-test-output="t, locale" lang="de-de">
      {{t
        "photo-album.summary"
        (hash
          numPhotos=3
        )
        locale="de-de"
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__t__example-3__example.hbs"
  />
</DocsDemo>
