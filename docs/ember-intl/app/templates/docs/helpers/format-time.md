# &#123;&#123;format-time&#125;&#125;

Behaves like the [`{{format-date}}` helper](./format-date), except the possible formats are defined in `time` in `app/formats.js`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-time__example-1">
    <div>
      {{format-time this.today}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-time__example-1__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-time__example-1__example.ts"
  />
</DocsDemo>


## options.format

In `app/formats.js`, you can define formats that you want to reuse for `{{format-time}}`. Pass a format key to the named argument `format`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-time__example-2">
    <div>
      {{format-time this.today format="hhmmss"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-time__example-2__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-time__example-2__example.ts"
  />

  <demo.snippet
    @label="formats.js"
    @name="docs__helpers__format-time__example-2__app__formats.js"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-time__example-3">
    <div lang="en-us">
      {{format-time this.today locale="en-us"}}
    </div>

    <div lang="de-de">
      {{format-time this.today locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-time__example-3__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-time__example-3__example.ts"
  />
</DocsDemo>


## Additional options

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `hour12`
- `timeStyle`
- `timeZone`
- `weekday`

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-time__example-4">
    <div>
      {{format-time
        this.today
        timeStyle="full"
        timeZone="America/New_York"
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-time__example-4__example.hbs"
  />

  <demo.snippet
    @label="components/example.ts"
    @name="docs__helpers__format-time__example-4__example.ts"
  />
</DocsDemo>
