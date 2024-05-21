# &#123;&#123;t&#125;&#125;

The `{{t}}` helper finds the translation message corresponding to a key, then [populates the message with data](https://formatjs.io/docs/core-concepts/icu-syntax) (optional). The helper returns the resulting string.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-1">
    <div>
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

You can use named arguments, a positional argument (2nd position), or a combination of both to pass data. In the combined case, data passed as named arguments will take precedence.

**Warning: Avoid the combined case.**

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-2">
    <div>
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


## options.htmlSafe

To render an HTML in a translation message, set `htmlSafe` to `true`. The `{{t}}` helper returns a `SafeString` (casted as `string` to improve DX).

**Warning: Do not use triple curly braces (e.g. `{{{t "call-to-action"}}}`), as it can allow XSS (cross-site scripting).**

```hbs
{{! components/example.hbs }}
{{t "ember.visit-homepage" htmlSafe=true}}
```

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

Note, `htmlSafe` isn't considered data, so it's okay to mix named and positional arguments.


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

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

    <div lang="de-de">
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

Again, `locale` isn't considered data, so it's okay to mix named and positional arguments.
