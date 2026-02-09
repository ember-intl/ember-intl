# formatMessage

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

::: code-group

<<< @/snippets/helpers/format-message/example-1/component.gts{2,20,24,28} [app/components/example.gts]

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


## Pass message only

`@formatjs/intl`'s `formatMessage` requires an object called `descriptor`. In the simplest form, `descriptor` has the following type:

```ts {:no-line-numbers}
interface MessageDescriptor {
  defaultMessage?: string;
  description?: string;
  id?: string;
}
```

`ember-intl`'s `formatMessage` allows you to pass just the translation message.

::: code-group

```gts [app/components/example.gts]{5}
import { formatMessage } from 'ember-intl';

<template>
  {{formatMessage
    "<em>{numPhotos, number} photos taken.</em>"
    htmlSafe=true
    numPhotos=3
  }}
</template>
```

:::

For more information, see [Advanced - Auto-generating keys](../advanced/auto-generating-keys).


## Options

### htmlSafe {#options-html-safe}

To render an HTML in a translation message, set `htmlSafe` to `true`.

::: code-group

<<< @/snippets/helpers/format-message/example-2/component.gts{15} [app/components/example.gts]

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
