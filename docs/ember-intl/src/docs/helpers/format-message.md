# formatMessage

Formats a string with the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/).

::: code-group

<<< @/snippets/helpers/format-message/example-1/component.gts{20,24,28} [app/components/example.gts]

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

To render an HTML in a translation message, set `htmlSafe` to `true`. The `formatMessage` helper returns a `SafeString`, casted as `string` to improve DX.

::: code-group

<<< @/snippets/helpers/format-message/example-2/component.gts{15} [app/components/example.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/format-message/example-2/component.gts" />
</CodePreview>

> [!TIP]
>
> If the version of your `ember-source` is `6.7` or above, use Ember's `trustHTML` instead.
>
> ::: code-group
>
> ```gts [app/components/example.gts]
> import { trustHTML } from '@ember/template';
> import { formatMessage } from 'ember-intl';
> 
> const descriptor = {
>   defaultMessage: '<em>{numPhotos, number} photos taken.</em>',
>   description: 'A short summary of the photoshoot from this week',
>   id: 'photoshoot-short-summary',
> };
>
> <template>
>   {{trustHTML (formatMessage descriptor numPhotos=3)}}
> </template>
> ```
>
> :::
