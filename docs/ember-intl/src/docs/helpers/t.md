# t

Finds the translation message and fills its [arguments](https://formatjs.github.io/docs/core-concepts/icu-syntax/) with the provided data.

::: code-group

<<< @/snippets/helpers/t/example-1/component.gts{9} [app/components/hello.gts]

<<< @/snippets/helpers/t/example-1/de-de.yaml [translations/de-de.yaml]

<<< @/snippets/helpers/t/example-1/en-us.yaml [translations/en-us.yaml]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/t/example-1/component.gts" />
</CodePreview>


## Pass data

We use the [ICU message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax/) to pass data to a translation. Data can also be formatted if you specify their type in the translation.

::: code-group

<<< @/snippets/helpers/t/example-2/component.gts{9} [app/components/hello.gts]

<<< @/snippets/helpers/t/example-2/de-de.yaml [translations/de-de.yaml]

<<< @/snippets/helpers/t/example-2/en-us.yaml [translations/en-us.yaml]

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/t/example-2/component.gts" />
</CodePreview>


### Named vs. positional

:::

You can pass data to the `t` helper using named arguments, the 2nd positional argument, or a combination of named and positional. In the combined case, data passed as named arguments will take precedence.

::: code-group

<<< @/snippets/helpers/t/example-3/component.gts{12,17} [app/components/photo-album.gts]

<<< @/snippets/helpers/t/example-3/de-de.yaml [translations/de-de.yaml]

<<< @/snippets/helpers/t/example-3/en-us.yaml [translations/en-us.yaml]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/t/example-3/component.gts" />
</CodePreview>


## What to avoid

> [!IMPORTANT]
> 
> When a translation's argument is missing its value, `@formatjs/intl` will throw a `FORMAT_ERROR` error. Even when you [ignore this error](../services/intl-part-2#methods-set-on-formatjs-error), `@formatjs/intl` will return the raw message, instead of trying to fill the arguments.

Suppose `<PhotoAlbum>` now allows `numPhotos?: number` and its template remains the same. Your users will see the raw message when `@numPhotos` is `undefined`.

```html {:no-line-numbers}
You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.
```

You'll want to ensure that all arguments are well-defined before calling `t`. Some strategies include:

- Use `if` to assert that all arguments are well-defined.

  ::: code-group

  ```gts [app/components/photo-album.gts]{12-14}
  import type { TOC } from '@ember/component/template-only';
  import { t } from 'ember-intl';
  import { gte } from 'ember-truth-helpers';

  interface PhotoAlbumSignature {
    Args: {
      numPhotos?: number;
    };
  }

  const PhotoAlbum: TOC<PhotoAlbumSignature> = <template>
    {{#if (gte @numPhotos 0)}}
      {{t "photo-album.summary" numPhotos=@numPhotos}}
    {{/if}}
  </template>;
  
  export default PhotoAlbum;
  ```

  :::

- Use a getter to provide a default value.

  ::: code-group

  ```gts [app/components/photo-album.gts]{11-13,16}
  import Component from '@glimmer/component';
  import { t } from 'ember-intl';

  interface PhotoAlbumSignature {
    Args: {
      numPhotos?: number;
    };
  }

  export default class PhotoAlbum extends Component<PhotoAlbumSignature> {
    get numPhotos(): number {
      return this.args.numPhotos ?? 0;
    }
  
    <template>
      {{t "photo-album.summary" numPhotos=this.numPhotos}}
    </template>
  }
  ```

  :::

- Pass a fallback object.

  ::: code-group

  ```gts [app/components/photo-album.gts]{12-14}
  import type { TOC } from '@ember/component/template-only';
  import { hash } from '@ember/helper';
  import { t } from 'ember-intl';

  interface PhotoAlbumSignature {
    Args: {
      numPhotos?: number;
    };
  }

  const PhotoAlbum: TOC<PhotoAlbumSignature> = <template>
    {{#let (hash numPhotos=0) as |fallback|}}
      {{t "photo-album.summary" fallback numPhotos=@numPhotos}}
    {{/let}}
  </template>;

  export default PhotoAlbum;
  ```

  :::


## Options

### htmlSafe {#options-html-safe}

To render an HTML in a translation message, set `htmlSafe` to `true`. The `t` helper returns a `SafeString` (casted as `string` to improve DX).

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
> Do not use triple curly braces, e.g. `{{{t "call-to-action"}}}`. It allows cross-site scripting (XSS).

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


### locale {#options-locale}

You can display the text in another locale (i.e. independently from the user's preferred locale). Pass the name of the locale to `locale`.

::: code-group

<<< @/snippets/helpers/t/example-4/component.gts{10,14} [app/components/hello.gts]

:::

<CodePreview src="/components/locale-switcher.gts">
  <CodePreview src="/snippets/helpers/t/example-4/component.gts" />
</CodePreview>
