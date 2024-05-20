# &#123;&#123;format-list&#125;&#125;

Uses [`Intl.ListFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) to join an array of strings.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-list__example-1">
    <div>
      {{format-list this.letters}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-list__example-1__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-list__example-1__example.ts"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-list__example-2">
    <div lang="en-us">
      {{format-list this.letters locale="en-us"}}
    </div>

    <div lang="de-de">
      {{format-list this.letters locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-list__example-2__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-list__example-2__example.ts"
  />
</DocsDemo>


## Additional options

You can use named arguments to pass the [options that `Intl.ListFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat#options). Some of these options are listed below.

- `localeMatcher`
- `style`
- `type`

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-list__example-3">
    <div>
      {{format-list this.letters type="disjunction"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-list__example-3__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-list__example-3__example.ts"
  />
</DocsDemo>
