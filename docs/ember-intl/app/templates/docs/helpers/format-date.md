# &#123;&#123;format-date&#125;&#125;

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) to format a date.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-1">
    <div>
      Today: {{format-date this.today}}
    </div>

    <div>
      Yesterday: {{format-date this.yesterday}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date__example-1__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date__example-1__example.ts"
  />
</DocsDemo>


## options.format

A consuming app can define custom formats for `{{format-date}}` in `app/formats.js`. Pass a format key to the named argument `format`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-2">
    <div>
      {{format-date this.today format="user-friendly"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date__example-2__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date__example-2__example.ts"
  />

  <demo.snippet
    @label="format.js"
    @name="docs__helpers__format-date__example-2__app__format.js"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-3">
    <div lang="en-us">
      {{format-date this.today locale="en-us"}}
    </div>

    <div lang="de-de">
      {{format-date this.today locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date__example-3__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date__example-3__example.ts"
  />
</DocsDemo>


## Additional options

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `hour12`
- `dateStyle`
- `timeZone`
- `weekday`

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-4">
    <div>
      {{format-date
        this.today
        dateStyle="full"
        timeZone="America/New_York"
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date__example-4__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date__example-4__example.ts"
  />
</DocsDemo>
