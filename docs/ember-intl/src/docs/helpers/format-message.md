---
title: \{{format-message}}
---

# &#123;&#123;format-message&#125;&#125; {#format-message}

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

::: code-group

<<< @/snippets/helpers/format-message/example-1/template.hbs [app/components/example.hbs]

<<< @/snippets/helpers/format-message/example-1/component.ts [app/components/example.ts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__format-message__example-1">
    <div>
      {{format-message
        this.descriptor1
        name="Sonja"
        numPhotos=12
        timestamp=this.yesterday
      }}
    </div>

    <div>
      {{format-message
        this.descriptor1
        name="Chris"
        numPhotos=0
        timestamp=this.yesterday
      }}
    </div>

    <div data-test-output="format-message">
      {{format-message
        this.descriptor1
        name="Maki"
        numPhotos=1
        timestamp=this.today
      }}
    </div>
  </demo.example>
</DocsDemo>
-->


## Passing a string instead of a descriptor

`@formatjs/intl`'s `formatMessage()` requires an object called `descriptor`. In the simplest form, `descriptor` has the following type:

```ts
interface MessageDescriptor {
  defaultMessage?: string;
  description?: string;
  id?: string;
}
```

Currently, `ember-intl` allows you to pass a string instead. If possible, avoid using this feature and favor writing code explicitly.

```hbs
{{format-message
  "<em>{numPhotos, number} photos taken.</em>"
  htmlSafe=true
  numPhotos=3
}}
```


## options.htmlSafe

To render an HTML in a translation message, set `htmlSafe` to `true`.

::: code-group

<<< @/snippets/helpers/format-message/example-2/template.hbs [app/components/example.hbs]

<<< @/snippets/helpers/format-message/example-2/component.ts [app/components/example.ts]

:::

<!--
<DocsDemo as |demo|>
  <demo.example>
    <div>
      {{format-message
        this.descriptor2
        htmlSafe=true
        numPhotos=3
      }}
    </div>
  </demo.example>
</DocsDemo>
-->
