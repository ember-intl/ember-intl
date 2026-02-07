---
title: \{{format-date}}
---

# &#123;&#123;format-date&#125;&#125; {#format-date}

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format) to format a date.

::: code-group

<<< @/snippets/helpers/format-date/example-1/component.gts{2,11} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-1">
    <div data-test-output="format-date">
      Today: {{format-date this.today}}
    </div>

    <div>
      Yesterday: {{format-date this.yesterday}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.format

In `app/ember-intl.{js,ts}`, you can use the `formatDate` key to define the formats that you want to reuse for the helper. Pass the name of your format to `format`.

::: code-group

<<< @/snippets/helpers/format-date/example-2/component.gts{2,11} [app/components/example.gts]

<<< @/snippets/helpers/format-date/example-2/ember-intl.ts{4-10} [app/ember-intl.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-2">
    <div data-test-output="format-date, format">
      {{format-date this.today format="user-friendly"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-date/example-3/component.gts{2,12,16} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-date__example-3">
    <div lang="en-us">
      {{format-date this.today locale="en-us"}}
    </div>

    <div data-test-output="format-date, locale" lang="de-de">
      {{format-date this.today locale="de-de"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## Additional options

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `hour12`
- `dateStyle`
- `timeZone`
- `weekday`

::: code-group

<<< @/snippets/helpers/format-date/example-4/component.gts{2,11} [app/components/example.gts]

:::

<!--
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
</DocsDemo>
-->
