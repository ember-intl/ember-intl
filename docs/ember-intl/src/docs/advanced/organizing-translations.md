# Organizing translations

Translations are stored in `/translations`, either as a `*.json` or `*.{yaml,yml}` file.

```sh {:no-line-numbers}
my-app
├── app
└── translations
    ├── de-de.yaml
    └── en-us.yaml
```

As the project grows, you will find the need to organize your translations. Here are a couple of ways to do so.


## Nested keys

You can nest translation keys to depict relations.

::: code-group

```yaml [translations/de-de.yaml]
components:
  hello:
    message: "Hallo, {name}!"

routes:
  application:
    title: Willkommen bei ember-intl
```

:::

> [!NOTE]
> 
> `@ember-intl/v1-compat` and `@ember-intl/vite` will flatten all keys. As a result, you can always write `{{t "hello.message"}}` in a template, whether keys are flat or nested in translation files.


## Nested folders

You can create subfolders to split one locale file into multiple files.

```sh {:no-line-numbers}
my-app
├── app
└── translations
    ├── components
    │   └── hello
    │       ├── de-de.yaml
    │       └── en-us.yaml
    └── routes
        └── application
            ├── de-de.yaml
            └── en-us.yaml
```

Each file should have a "namespace," an identifier that helps the translation keys, which are now separated, be still unique.

::: code-group

```yaml [translations/components/hello/de-de.yaml]
components.hello:
  message: Hallo, {name}!
```

```yaml [translations/routes/application/de-de.yaml]
routes.application:
  title: Willkommen bei ember-intl
```

:::


### Auto-namespace keys {#nested-folders-auto-namespace-keys}

In your [configuration file](./configuration-file), you can set `wrapTranslationsWithNamespace` to `true` to derive the namespace from the folder path.

::: code-group

```js [ember-intl.config.mjs]{3}
export default {
  buildOptions: {
    wrapTranslationsWithNamespace: true,
  },
};
```

```yaml [translations/components/hello/de-de.yaml]
message: Hallo, {name}!
```

```yaml [translations/routes/application/de-de.yaml]
title: Willkommen bei ember-intl
```

:::

> [!NOTE]
> 
> Spaces in a folder name are converted to underscores.
