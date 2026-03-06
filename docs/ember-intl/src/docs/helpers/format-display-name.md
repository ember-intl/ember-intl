# formatDisplayName

Uses [`Intl.DisplayNames`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) to format the name of a currency, language, region, etc.

::: code-group

<<< @/snippets/helpers/format-display-name/example-1/component.gts{9} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-display-name/example-1/component.gts" />
</CodePreview>

> [!IMPORTANT]
> 
> `type` is a required option because `Intl` doesn't specify the default value. The possible values are `"calendar"`, `"currency"`, `"dateTimeField"`, `"language"`, `"region"`, and `"script"`.


## Options

### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-display-name/example-2/component.gts{10,14} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-display-name/example-2/component.gts" />
</CodePreview>


### Intl {#options-intl}

You can use named arguments to pass the [options that `Intl.DisplayNames` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames#options). Some of these options are listed below.

- `languageDisplay` (applicable only for `type="language"`)
- `style`
- `type`

::: code-group

<<< @/snippets/helpers/format-display-name/example-3/component.gts{9} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-display-name/example-3/component.gts" />
</CodePreview>
