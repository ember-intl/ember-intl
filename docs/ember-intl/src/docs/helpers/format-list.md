---
title: \{{format-list}}
---

# &#123;&#123;format-list&#125;&#125; {#format-list}

Uses [`Intl.ListFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/format) to join an array of strings.

::: code-group

<<< @/snippets/helpers/format-list/example-1/component.gts{2,11} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-list__example-1">
    <div data-test-output="format-list">
      {{format-list this.letters}}
    </div>
  </demo.example>
</DocsDemo>
-->


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/format-list/example-2/component.gts{2,12,16} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-list__example-2">
    <div lang="en-us">
      {{format-list this.letters locale="en-us"}}
    </div>

    <div data-test-output="format-list, locale" lang="de-de">
      {{format-list this.letters locale="de-de"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## Additional options

You can use named arguments to pass the [options that `Intl.ListFormat` supports](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat#options). Some of these options are listed below.

- `localeMatcher`
- `style`
- `type`

::: code-group

<<< @/snippets/helpers/format-list/example-3/component.gts{2,11} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-list__example-3">
    <div>
      {{format-list this.letters type="disjunction"}}
    </div>
  </demo.example>
</DocsDemo>
-->
