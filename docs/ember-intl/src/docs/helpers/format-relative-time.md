# formatRelativeTime

Uses [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format) to format the time relative to now.

::: code-group

<<< @/snippets/helpers/format-relative-time/example-1/component.gts{2,9-11} [app/components/example.gts]

:::

<!--
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
</DocsDemo>
-->


## Options

### format {#options-format}

In `app/ember-intl.{js,ts}`, use the `formatRelativeTime` key to define the `format`'s that you want to use in the app.

::: code-group

<<< @/snippets/helpers/format-relative-time/example-2/component.gts{9} [app/components/example.gts]

<<< @/snippets/helpers/format-relative-time/example-2/ember-intl.ts{5-7} [app/ember-intl.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-relative-time__example-2">
    <div data-test-output="format-relative-time, format">
      {{format-relative-time -1 format="compact"}}
    </div>
  </demo.example>
</DocsDemo>
-->


### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-relative-time/example-3/component.gts{10,14} [app/components/example.gts]

:::

<!--
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
</DocsDemo>
-->


### Intl {#options-intl}

You can use named arguments to pass the [options that `Intl.RelativeTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#options). Some of these options are listed below.

- `numeric`
- `style`
- `unit`

::: code-group

<<< @/snippets/helpers/format-relative-time/example-4/component.gts{9-11} [app/components/example.gts]

:::

<!--
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
</DocsDemo>
-->
