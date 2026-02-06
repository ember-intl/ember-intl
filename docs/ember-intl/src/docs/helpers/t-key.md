---
title: \{{t-key}}
---

# &#123;&#123;t-key&#125;&#125; {#t-key}

In JavaScript files (`*.{gjs,gts,js,ts}`), you can use `tKey()` to mark strings that are actually translation keys. This will help programs (e.g. linters like [`@ember-intl/lint`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md), codemods) check how you use translations.

::: code-group

<<< @/snippets/helpers/t-key/example-1/template.hbs [app/components/select-locale.hbs]

<<< @/snippets/helpers/t-key/example-1/component.ts [app/components/select-locale.ts]

:::

::: code-group

<<< @/snippets/helpers/t-key/example-2/template.hbs [app/components/payment-method.hbs]

<<< @/snippets/helpers/t-key/example-2/component.ts [app/components/payment-method.ts]

<<< @/snippets/helpers/t-key/example-2/util.ts [app/utils/payment.ts]

:::

> [!NOTE]
> 
> `tKey()` is an identity function. The input string and its type (`string` or a string literal) are unchanged.


## What not to do

Don't pass a dynamic expression to `tKey()` and `{{t-key}}`. It's difficult and costly for programs to accurately find all possible values.

```hbs
{{#let
  (array
    (hash labelKey="components.select-locale.option.de-de" value="de-de")
    (hash labelKey="components.select-locale.option.en-us" value="en-us")
  ) as |options|
}}
  {{#each options as |opt|}}
    <option value={{opt.value}}>
      {{! ❌ Path expressions like `opt.labelKey` may be ignored }}
      {{t (t-key opt.labelKey)}}
    </option>
  {{/each}}
{{/let}}
```

```hbs
{{#let (array "de-de" "en-us") as |locales|}}
  {{#each locales as |locale|}}
    <option value={{locale}}>
      {{!-- ❌ Helpers like {{concat}} may be ignored --}}
      {{t (t-key (concat "components.select-locale.option." locale))}}
    </option>
  {{/each}}
{{/let}}
```

Refactor code so that you always pass strings or string literals.
