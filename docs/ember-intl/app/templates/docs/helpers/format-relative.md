# &#123;&#123;format-relative&#125;&#125;

Uses [`Intl.RelativeTimeFormat#format()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format) to format the time relative to now.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative__example-1">
    <div>
      Past: {{format-relative -1}}
    </div>

    <div>
      Now: {{format-relative 0}}
    </div>

    <div>
      Future: {{format-relative 3}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative__example-1__example.hbs"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative__example-2">
    <div lang="en-us">
      {{format-relative -1 locale="en-us"}}
    </div>

    <div lang="de-de">
      {{format-relative -1 locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative__example-2__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-relative__example-2__example.ts"
  />
</DocsDemo>


## Additional options

You can use named arguments to pass the [options that `Intl.RelativeTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#options). Some of these options are listed below.

- `numeric`
- `style`
- `unit`

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative__example-3">
    <div>
      Past: {{format-relative -1 unit="month"}}
    </div>

    <div>
      Now: {{format-relative 0 unit="day"}}
    </div>

    <div>
      Future: {{format-relative 3 unit="week"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative__example-3__example.hbs"
  />
</DocsDemo>
