---
title: \{{format-time}}
---

# &#123;&#123;format-time&#125;&#125; {#format-time}

Behaves like the [`{{format-date}}` helper](./format-date), except it focuses on the time.

::: code-group

<<< @/snippets/helpers/format-time/example-1/template.hbs [app/components/example.hbs]

<<< @/snippets/helpers/format-time/example-1/component.ts [app/components/example.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-time__example-1">
    <div>
      {{format-time this.today}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.format

In `app/ember-intl.{js,ts}`, you can use the `formatTime` key to define the formats that you want to reuse for the helper. Pass the name of your format to `format`.

::: code-group

<<< @/snippets/helpers/format-time/example-2/template.hbs [app/components/example.hbs]

<<< @/snippets/helpers/format-time/example-2/component.ts [app/components/example.ts]

<<< @/snippets/helpers/format-time/example-2/ember-intl.ts [app/ember-intl.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-time__example-2">
    <div>
      {{format-time this.today format="hhmmss"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-time/example-3/template.hbs [app/components/example.hbs]

<<< @/snippets/helpers/format-time/example-3/component.ts [app/components/example.ts]

:::

<!--
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
</DocsDemo>
-->


## Additional options

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `hour12`
- `timeStyle`
- `timeZone`
- `weekday`

::: code-group

<<< @/snippets/helpers/format-time/example-4/template.hbs [app/components/example.hbs]

<<< @/snippets/helpers/format-time/example-4/component.ts [app/components/example.ts]

:::

<!--
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
</DocsDemo>
-->
