# Quickstart (Addons)

## 1. Install ember-intl {#1-install-ember-intl}

### v1 addons {#1-install-ember-intl-v1-addons}

Use your package manager to install `ember-intl` (as a dependency or peer dependency). Install `@ember-intl/v1-compat` (as a development dependency) if the `dummy` app needs translations for documentation or testing.

```sh {:no-line-numbers}
pnpm add ember-intl
pnpm add -D @ember-intl/v1-compat
```

If your addon provides translations, create the folder `translations` as a sibling to `addon`.

```sh {:no-line-numbers}
my-v1-addon
├── addon
└── translations
```


### v2 addons {#1-install-ember-intl-v2-addons}

Use your package manager to install `ember-intl` (as a dependency or peer dependency).

```sh {:no-line-numbers}
pnpm add ember-intl
```

If your addon provides translations, create the folder `translations` as a sibling to `src`.

```sh {:no-line-numbers}
my-v2-addon
├── src
└── translations
```

Then, add `translations` to the `files` field in `package.json`.

::: code-group

```json [package.json]{7}
{
  "name": "my-v2-addon",
  "files": [
    "addon-main.cjs",
    "declarations",
    "dist",
    "translations"
  ]
}
```

:::


## 2. Define translations {#2-define-translations}

Create a translation in `translations/en-us.yaml`.

::: code-group

```yaml [translations/en-us.yaml]
hello.message: "Hello, {name}!"
```

:::

> [!TIP]
>
> You can override an addon's translation in the consuming app. If the app uses the same key in its own translation file, the app's translation always wins.


### v1 addons {#2-define-translations-v1-addons}

To render the translation, import the `t` helper and call it in a `<template>` tag.

::: code-group

```gts [addon/components/hello.gts]{2,11}
import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {
    name: string;
  };
}

const Hello: TOC<HelloSignature> = <template>
  {{t "hello.message" name=@name}}
</template>;

export default Hello;
```

:::

> [!NOTE]
> 
> V1 addons must list [`ember-template-imports`](https://github.com/ember-cli/ember-template-imports) as a dependency if you use `<template>` tags in components.


### v2 addons {#2-define-translations-v2-addons}

To render the translation, import the `t` helper and call it in a `<template>` tag.

::: code-group

```gts [src/components/hello.gts]{2,11}
import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {
    name: string;
  };
}

const Hello: TOC<HelloSignature> = <template>
  {{t "hello.message" name=@name}}
</template>;

export default Hello;
```

:::

> [!NOTE]
> 
> V2 addons don't need `ember-template-imports`. Instead, you declare how to compile the `*.{gjs,gts}` files in `rollup.config.mjs`.


## 3. Define languages {#3-define-languages}

Follow [Quickstart (Apps) - 3. Define languages](./quickstart#3-define-languages).


## 4. Set up ember-intl {#4-set-up-ember-intl}

If the routes of your test app need translations, follow [Quickstart (Apps) - 4. Set up ember-intl](./quickstart#4-set-up-ember-intl) and update this file.

- v1 addons: `tests/dummy/app/routes/application.ts`
- v2 addons: `app/routes/application.ts`


## 5. Configure linters {#5-configure-linters}

For more information, see [Quickstart (Apps) - 5. Configure linters](./quickstart#5-configure-linters). For brevity, only the differences are noted below.


### @ember-intl/lint {#5-configure-linters-ember-intl-lint}

There are no differences.


### ember-template-lint {#5-configure-linters-ember-template-lint}

There are no differences.


### glint {#5-configure-linters-glint}

If you use `glint` v1 and "loose mode" templates, then update this file.

- v1 addons: `types/global.d.ts`
- v2 addons: `unpublished-development-types/index.d.ts`


### Miscellaneous {#5-configure-linters-miscellaneous}

There are no differences.
