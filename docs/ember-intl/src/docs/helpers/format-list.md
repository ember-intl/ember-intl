# formatList

Uses [`Intl.ListFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format) to join an array of strings.

::: code-group

<<< @/snippets/helpers/format-list/example-1/component.gts{2,11} [app/components/example.gts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-list/example-1/component.gts" />


## Options

### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-list/example-2/component.gts{12,16} [app/components/example.gts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-list/example-2/component.gts" />


### Intl {#options-intl}

You can use named arguments to pass the [options that `Intl.ListFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat#options). Some of these options are listed below.

- `localeMatcher`
- `style`
- `type`

::: code-group

<<< @/snippets/helpers/format-list/example-3/component.gts{11} [app/components/example.gts]

:::

<!-- <LocaleSwitcher /> -->
<CodePreview src="/snippets/helpers/format-list/example-3/component.gts" />
