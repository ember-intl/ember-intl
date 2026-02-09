# Helpers #

`ember-intl` provides several locale-aware helpers, so that you can display translations, numbers, dates, etc.

> [!IMPORTANT]
> 
> Every helper from `ember-intl` always returns a string.

> [!TIP]
> 
> The helpers are simply a shortcut for calling an `intl` service's method in a template.
>
> Just like the service, the `format*` helpers return an empty string when the input is `undefined` or `null`. This relaxation helps you avoid runtime errors in templates, where it can be hard to make early exits or wait for promises to resolve.
> 
> ::: code-group
> 
> ```gts [app/components/example.gts]
> import { formatDate } from 'ember-intl';
> 
> <template>
>   {{! Display an empty string while @message is loaded }}
>   {{formatDate @message.timestamp}}
> </template>
> ```
> 
> :::

The helper that you will most frequently use is `t` (the "t helper" or "translation helper"). You may want to check [Helpers - t](./t) first.
