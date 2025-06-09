# &#123;&#123;format-relative-time&#125;&#125;

Uses [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format) to format the time relative to now.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative-time__example-1">
    <div data-test-output="format-relative-time">
      Past: {{format-relative-time -1}}
    </div>

    <div>
      Now: {{format-relative-time 0}}
    </div>

    <div>
      Future: {{format-relative-time 3}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative-time__example-1__example.hbs"
  />
</DocsDemo>


## options.format

In `app/formats.js`, you can define formats that you want to reuse for `{{format-relative-time}}`. Pass a format key to the named argument `format`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative-time__example-2">
    <div data-test-output="format-relative-time, format">
      {{format-relative-time -1 format="compact"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative-time__example-2__example.hbs"
  />

  <demo.snippet
    @label="formats.js"
    @name="docs__helpers__format-relative-time__example-2__app__formats.js"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale).

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative-time__example-3">
    <div lang="en-us">
      {{format-relative-time -1 locale="en-us"}}
    </div>

    <div data-test-output="format-relative-time, locale" lang="de-de">
      {{format-relative-time -1 locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative-time__example-3__example.hbs"
  />
</DocsDemo>


## Additional options

You can use named arguments to pass the [options that `Intl.RelativeTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#options). Some of these options are listed below.

- `numeric`
- `style`
- `unit`

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative-time__example-4">
    <div>
      Past: {{format-relative-time -1 unit="month"}}
    </div>

    <div>
      Now: {{format-relative-time 0 unit="day"}}
    </div>

    <div>
      Future: {{format-relative-time 3 unit="week"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-relative-time__example-4__example.hbs"
  />
</DocsDemo>
