# formatRelativeTime

Uses [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format) to format the time relative to now.

::: code-group

<<< @/snippets/helpers/format-relative-time/example-1/component.gts{2,10,14,18} [app/components/example.gts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-relative-time/example-1/component.gts" />


## Options

### format {#options-format}

In `app/ember-intl.{js,ts}`, use the `formatRelativeTime` key to define the `format`'s that you want to use in the app.

::: code-group

<<< @/snippets/helpers/format-relative-time/example-2/component.gts{9} [app/components/example.gts]

<<< @/snippets/helpers/format-relative-time/example-2/ember-intl.ts{5-7} [app/ember-intl.ts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-relative-time/example-2/component.gts" />


### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-relative-time/example-3/component.gts{10,14} [app/components/example.gts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-relative-time/example-3/component.gts" />


### Intl {#options-intl}

You can use named arguments to pass the [options that `Intl.RelativeTimeFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#options). Some of these options are listed below.

- `numeric`
- `style`
- `unit`

::: code-group

<<< @/snippets/helpers/format-relative-time/example-4/component.gts{10,14,18} [app/components/example.gts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-relative-time/example-4/component.gts" />
