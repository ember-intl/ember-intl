# tKey

Use `tKey` to mark strings that you know are actually translation keys. This helps programs (e.g. [`@ember-intl/lint`](https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/README.md)) check how you use translations.

> [!NOTE]
> 
> `tKey` is an identity function. The output string and its type (`string` or a string literal) are the same as the input.

::: code-group

<<< @/snippets/helpers/t-key/example-1/component.gts{17,21} [app/components/select-locale.gts]

:::

Here is another example, where translation keys appear in a utility file (a normal `*.{js,ts}` file).

::: code-group

<<< @/snippets/helpers/t-key/example-2/component.gts [app/components/payment-method.gts]

<<< @/snippets/helpers/t-key/example-2/utility.ts{11-13} [app/utils/payment.ts]

:::


## What to avoid

Don't pass a dynamic expression (code that can easily be determined only at runtime) to `tKey`. It's difficult and costly for programs to accurately find all possible values.

Refactor code so that you always pass strings or string literals to `tKey`.

::: code-group

```gts [Counterexample 1]{10}
import { concat } from '@ember/helper';
import { t, tKey } from 'ember-intl';

const locales = ['de-de', 'en-us'] as const;

<template>
  {{#each locales as |locale|}}
    <option value={{locale}}>
      {{! ❌ Helpers like `concat` will be ignored }}
      {{t (tKey (concat "select-language." locale))}}
    </option>
  {{/each}}
</template>
```

```gts [Counterexample 1 (Fixed)]{7-8}
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

```gts [Counterexample 2]{15}
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
        {{! ❌ Path expressions like `opt.labelKey` will be ignored }}
        {{t (tKey opt.labelKey)}}
      </option>
    {{/each}}
  {{/let}}
</template>
```

```gts [Counterexample 2 (Fixed)]{7-8}
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
