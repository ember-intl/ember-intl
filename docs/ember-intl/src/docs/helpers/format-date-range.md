---
title: \{{format-date-range}}
---

# &#123;&#123;format-date-range&#125;&#125; {#format-date-range}

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange) to format a date range.

::: code-group

<<< @/snippets/helpers/format-date-range/example-1/component.gts{2,12} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date-range__example-1">
    <div data-test-output="format-date-range">
      Range: {{format-date-range this.yesterday this.today}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.format

In `app/ember-intl.{js,ts}`, you can use the `formatDateRange` key to define the formats that you want to reuse for the helper. Pass the name of your format to `format`.

::: code-group

<<< @/snippets/helpers/format-date-range/example-2/component.gts{2,12} [app/components/example.gts]

<<< @/snippets/helpers/format-date-range/example-2/ember-intl.ts{4-9} [app/ember-intl.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date-range__example-2">
    <div data-test-output="format-date-range, format">
      {{format-date-range this.yesterday this.today format="user-friendly"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-date-range/example-3/component.gts{2,13,17} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date-range__example-3">
    <div lang="en-us">
      {{format-date-range this.yesterday this.today locale="en-us"}}
    </div>

    <div data-test-output="format-date-range, locale" lang="de-de">
      {{format-date-range this.yesterday this.today locale="de-de"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## Additional options

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `dateStyle`
- `day`
- `month`
- `timeZone`

::: code-group

<<< @/snippets/helpers/format-date-range/example-4/component.gts{2,12} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date-range__example-4">
    <div>
      {{format-date-range
        this.yesterday
        this.today
        day="numeric"
        month="short"
      }}
    </div>
  </demo.example>
</DocsDemo>
-->
