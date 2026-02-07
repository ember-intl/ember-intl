---
title: \{{t}}
---

# &#123;&#123;t&#125;&#125; {#t}

The `{{t}}` helper finds the translation message corresponding to a key, then [populates the message with data](https://formatjs.github.io/docs/core-concepts/icu-syntax/). The helper returns the resulting string.

::: code-group

<<< @/snippets/helpers/t/example-1/component.gts{2,9} [app/components/hello.gts]

<<< @/snippets/helpers/t/example-1/de-de.yaml [translations/de-de.yaml]

<<< @/snippets/helpers/t/example-1/en-us.yaml [translations/en-us.yaml]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-1">
    <div data-test-output="t">
      {{t "hello.message"}}
    </div>
  </demo.example>
</DocsDemo>
-->


## Passing data

We use the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/) to pass data to translations. Data can also be formatted when you specify their type.

::: code-group

<<< @/snippets/helpers/t/example-2/component.gts{2,11} [app/components/hello.gts]

<<< @/snippets/helpers/t/example-2/de-de.yaml{2} [translations/de-de.yaml]

<<< @/snippets/helpers/t/example-2/en-us.yaml{2} [translations/en-us.yaml]

:::

To pass data to the `{{t}}` helper, you can use named arguments, a positional argument (2nd position), or a combination of both. In the combined case, data passed as named arguments will take precedence.

::: code-group

<<< @/snippets/helpers/t/example-3/component.gts{2,3,13,16} [app/components/photo-album.gts]

<<< @/snippets/helpers/t/example-3/de-de.yaml{2} [translations/de-de.yaml]

<<< @/snippets/helpers/t/example-3/en-us.yaml{2} [translations/en-us.yaml]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-2">
    <div data-test-output="t, data">
      {{t "photo-album.summary" (hash numPhotos=3)}}
    </div>
  </demo.example>
</DocsDemo>
-->

> [!IMPORTANT]
> 
> When an argument doesn't have a value, `@formatjs/intl` will throw a `FORMAT_ERROR` error. Even when you [ignore this error](../services/intl-part-2#methods-set-on-formatjs-error), `@formatjs/intl` will return the message as is.
>
> ```html {:no-line-numbers}
> <!-- What users see when `numPhotos` is undefined -->
> You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.
> ```
>
> Please check that all arguments are well-defined when using the `{{t}}` helper. You might consider [creating default values](../services/intl-part-2#methods-get-translation).
>
> ```gts {8-10}
> interface PhotoAlbumSignature {
>   Args: {
>     numPhotos?: number;
>   };
> }
>
> const PhotoAlbum: TOC<PhotoAlbumSignature> = <template>
>   {{#let (hash numPhotos=0) as |fallback|}}
>     {{t "photo-album.summary" fallback numPhotos=@numPhotos}}
>   {{/let}}
> </template>
> ```


## options.htmlSafe

To render an HTML in a translation message, set `htmlSafe` to `true`. The `{{t}}` helper returns a `SafeString` (casted as `string` to improve DX).

::: code-group

```gts [app/components/example.gts]
import { t } from 'ember-intl';

<template>
  {{t "visit-homepage" htmlSafe=true}}
</template>
```

```yaml [translations/en-us.yaml]
visit-homepage: Visit <a href="https://www.emberjs.com">Ember.js</a>.
```

:::

> [!CAUTION]
> 
> Do not use triple curly braces (e.g. `{{{t "call-to-action"}}}`), as it can allow XSS (cross-site scripting).

To pass data to an HTML tag, escape the angle brackets:

::: code-group

```gts [app/components/example.gts]
import { t } from 'ember-intl';

<template>
  {{t "visit-legal" htmlSafe=true url="https://emberjs.com/about/legal"}}
</template>
```

```yaml [translations/en-us.yaml]
visit-legal: See our '<'a href="{url}"'>'Terms and Conditions'</a>'.
```

:::


## options.locale

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/t/example-4/component.gts{2,3,12,17} [app/components/example.gts]

:::

<!--
<DocsDemo as |demo|>
  <LocaleSwitcher />

  <demo.example @name="docs__helpers__t__example-3">
    <div lang="en-us">
      {{t
        "photo-album.summary"
        (hash
          numPhotos=3
        )
        locale="en-us"
      }}
    </div>

    <div data-test-output="t, locale" lang="de-de">
      {{t
        "photo-album.summary"
        (hash
          numPhotos=3
        )
        locale="de-de"
      }}
    </div>
  </demo.example>
</DocsDemo>
-->
