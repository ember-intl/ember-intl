# Helpers

`ember-intl` provides several locale-aware helpers, so that you can display translations, numbers, dates, etc. All helpers return a string.

Behind the scenes, the helpers make use of the `intl` service (the source of truth). So, just like the service, the `{{format-*}}` helpers return an empty string when you pass `undefined` or `null`. This relaxation helps you avoid runtime errors in templates (i.e. in `*.hbs` files, where it can be hard to make early exits and wait for promises to resolve).

::: code-group

```gts [app/components/example.gts]{1,5}
import { formatDate } from 'ember-intl';

<template>
  {{! Display an empty string while @message is loaded }}
  {{formatDate @message.timestamp}}
</template>
```

:::

The helper that you will most frequently use is `{{t}}` (the "t helper" or "translation helper"). You may want to check the [documentation for `{{t}}`](./t) first.

::: code-group

```gts [app/components/example.gts]{1,4}
import { t } from 'ember-intl';

<template>
  {{t "hello.message" name="Zoey"}}
</template>
```

:::
