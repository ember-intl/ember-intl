---
title: \{{t-key}}
---

# &#123;&#123;t-key&#125;&#125; {#t-key}

In JavaScript files (`*.{gjs,gts,js,ts}`), you can use `tKey()` to mark strings that are actually translation keys. This will help programs (e.g. linters like [`@ember-intl/lint`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md), codemods) check how you use translations.

::: code-group

<<< @/snippets/helpers/t-key/example-1/component.gts{2,17,21,30} [app/components/select-locale.gts]

:::

::: code-group

<<< @/snippets/helpers/t-key/example-2/component.gts{22,25} [app/components/payment-method.gts]

<<< @/snippets/helpers/t-key/example-2/utility.ts{1,11-13} [app/utils/payment.ts]

:::

> [!NOTE]
> 
> `tKey()` is an identity function. The input string and its type (`string` or a string literal) are unchanged.


## What not to do

Don't pass a dynamic expression to `tKey()`. It's difficult and costly for programs to accurately find all possible values.

Refactor code so that you always pass strings or string literals to `tKey()`.

::: code-group

```gts [app/components/counterexample.gts]{10}
import { concat } from '@ember/helper';
import { t, tKey } from 'ember-intl';

const locales = ['de-de', 'en-us'] as const;

<template>
  {{#each locales as |locale|}}
    <option value={{locale}}>
      {{! ❌ Helpers like `concat` may be ignored }}
      {{t (tKey (concat "select-language." locale))}}
    </option>
  {{/each}}
</template>
```

```gts [app/components/counterexample.gts (fixed)]{7-8,14}
import { get } from '@ember/helper';
import { t, tKey } from 'ember-intl';

const locales = ['de-de', 'en-us'] as const;

const localeToKey = {
  'de-de': tKey('select-language.de-de'),
  'en-us': tKey('select-language.en-us'),
} as const;

<template>
  {{#each locales as |locale|}}
    <option value={{locale}}>
      {{t (get localeToKey locale)}}
    </option>
  {{/each}}
</template>
```

:::

::: code-group

```gts [app/components/counterexample.gts]{15}
import { array, hash } from '@ember/helper';
import { t, tKey } from 'ember-intl';

<template>
  {{#let
    (array
      (hash labelKey="select-language.de-de" value="de-de")
      (hash labelKey="select-language.en-us" value="en-us")
    )
    as |options|
  }}
    {{#each options as |opt|}}
      <option value={{opt.value}}>
        {{! ❌ Path expressions like `opt.labelKey` may be ignored }}
        {{t (tKey opt.labelKey)}}
      </option>
    {{/each}}
  {{/let}}
</template>
```

```gts [app/components/counterexample.gts (fixed)]{7-8}
import { array, hash } from '@ember/helper';
import { t, tKey } from 'ember-intl';

<template>
  {{#let
    (array
      (hash labelKey=(tKey "select-language.de-de") value="de-de")
      (hash labelKey=(tKey "select-language.en-us") value="en-us")
    )
    as |options|
  }}
    {{#each options as |opt|}}
      <option value={{opt.value}}>
        {{t opt.labelKey}}
      </option>
    {{/each}}
  {{/let}}
</template>
```

:::
