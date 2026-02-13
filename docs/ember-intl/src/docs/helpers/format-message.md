# formatMessage

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

::: code-group

<<< @/snippets/helpers/format-message/example-1/component.gts{2,20,24,28} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-message/example-1/component.gts" />
</CodePreview>


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

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-message/example-2/component.gts" />
</CodePreview>
