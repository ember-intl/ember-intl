# &#123;&#123;format-date-range&#125;&#125;

Uses [`Intl.DateTimeFormat#formatRange()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange) to format a date range.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date-range__example-1">
    <div>
      Range: {{format-date-range this.yesterday this.today}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date-range__example-1.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date__example-1__example.ts"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date-range__example-3">
    <div lang="en-us">
      {{format-date-range this.yesterday this.today locale="en-us"}}
    </div>

    <div lang="de-de">
      {{format-date-range this.yesterday this.today locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date-range__example-3__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date-range__example-3__example.ts"
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

  <demo.example @name="docs__helpers__format-date-range__example-4">
    <div>
      {{format-date-range
        this.yesterday
        this.today
        dateStyle="full"
        timeZone="America/New_York"
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-date-range__example-4__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-date-range__example-4__example.ts"
  />
</DocsDemo>
