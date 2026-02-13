# formatTime

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format) to format the time part of a `Date` object.

::: code-group

<<< @/snippets/helpers/format-time/example-1/component.gts{2,11} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-time/example-1/component.gts" />
</CodePreview>


## Options

### format {#options-format}

In `app/ember-intl.{js,ts}`, use the `formatTime` key to define the `format`'s that you want to use in the app.

::: code-group

<<< @/snippets/helpers/format-time/example-2/component.gts{11} [app/components/example.gts]

<<< @/snippets/helpers/format-time/example-2/ember-intl.ts{5-9} [app/ember-intl.ts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-time/example-2/component.gts" />
</CodePreview>


### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-time/example-3/component.gts{12,16} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-time/example-3/component.gts" />
</CodePreview>


### Intl {#options-intl}

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `hour12`
- `timeStyle`
- `timeZone`
- `weekday`

::: code-group

<<< @/snippets/helpers/format-time/example-4/component.gts{11} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-time/example-4/component.gts" />
</CodePreview>
