# formatDateRange

Uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange) to format a date range.

::: code-group

<<< @/snippets/helpers/format-date-range/example-1/component.gts{12} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-date-range/example-1/component.gts" />
</CodePreview>

## Options

### format {#options-format}

In `app/ember-intl.{js,ts}`, use the `formatDateRange` key to define the `format`'s that you want to use in the app.

::: code-group

<<< @/snippets/helpers/format-date-range/example-2/component.gts{12} [app/components/example.gts]

<<< @/snippets/helpers/format-date-range/example-2/ember-intl.ts{5-8} [app/ember-intl.ts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-date-range/example-2/component.gts" />
</CodePreview>

For more information, see [Services - intl (Part 2) - setFormats](../services/intl-part-2#methods-set-formats).


### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-date-range/example-3/component.gts{13,17} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-date-range/example-3/component.gts" />
</CodePreview>

### Intl {#options-intl}

You can use named arguments to pass the [options that `Intl.DateTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options). Some of these options are listed below.

- `dateStyle`
- `day`
- `month`
- `timeZone`

::: code-group

<<< @/snippets/helpers/format-date-range/example-4/component.gts{12} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-date-range/example-4/component.gts" />
</CodePreview>