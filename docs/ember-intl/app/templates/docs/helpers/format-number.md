# &#123;&#123;format-number&#125;&#125;

Uses [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) to format a number.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-number__example-1">
    <div data-test-output="format-number">
      {{format-number 12345}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-number__example-1__example.hbs"
  />
</DocsDemo>


## options.format

In `app/ember-intl.{js,ts}`, you can use the `formatNumber` key to define the formats that you want to reuse for the helper. Pass the name of your format to `format`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-number__example-2">
    <div data-test-output="format-number, format">
      {{format-number 12345 format="EUR"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-number__example-2__example.hbs"
  />

  <demo.snippet
    @label="ember-intl.ts"
    @name="docs__helpers__format-number__example-2__app__ember-intl.ts"
  />
</DocsDemo>


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-number__example-3">
    <div lang="en-us">
      {{format-number 12345 locale="en-us"}}
    </div>

    <div data-test-output="format-number, locale" lang="de-de">
      {{format-number 12345 locale="de-de"}}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-number__example-3__example.hbs"
  />
</DocsDemo>


## Additional options

You can use named arguments to pass [options that `Intl.NumberFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options). Some of these options are listed below.

- `currency`
- `maximumFractionDigits`
- `maximumSignificantDigits`
- `style`

<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-number__example-4">
    <div>
      {{format-number
        12345
        currency="EUR"
        maximumFractionDigits=1
        notation="compact"
        roundingMode="ceil"
        style="currency"
      }}
    </div>
  </demo.example>

  <demo.snippet
    @label="components/example.hbs"
    @name="docs__helpers__format-number__example-4__example.hbs"
  />
</DocsDemo>
