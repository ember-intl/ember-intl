# formatNumber

Uses [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) to format a number.

::: code-group

<<< @/snippets/helpers/format-number/example-1/component.gts{2,9} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-number__example-1">
    <div data-test-output="format-number">
      {{format-number 12345}}
    </div>
  </demo.example>
</DocsDemo>
-->


## Options

### format {#options-format}

In `app/ember-intl.{js,ts}`, use the `formatNumber` key to define the `format`'s that you want to use in the app.

::: code-group

<<< @/snippets/helpers/format-number/example-2/component.gts{9} [app/components/example.gts]

<<< @/snippets/helpers/format-number/example-2/ember-intl.ts{5-8} [app/ember-intl.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-number__example-2">
    <div data-test-output="format-number, format">
      {{format-number 12345 format="EUR"}}
    </div>
  </demo.example>
</DocsDemo>
-->

For more information, see [Services - intl (Part 2) - setFormats](../services/intl-part-2#methods-set-formats).


### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-number/example-3/component.gts{10,14} [app/components/example.gts]

:::

<!--
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
</DocsDemo>
-->


### Intl {#options-intl}

You can use named arguments to pass [options that `Intl.NumberFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options). Some of these options are listed below.

- `currency`
- `maximumFractionDigits`
- `maximumSignificantDigits`
- `signDisplay`
- `style`

::: code-group

<<< @/snippets/helpers/format-number/example-4/component.gts{9-16} [app/components/example.gts]

:::

<!--
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
</DocsDemo>
-->
