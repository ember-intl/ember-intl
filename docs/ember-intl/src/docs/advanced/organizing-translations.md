# Organizing translations

Translations are stored in the `translations` folder, either as a `*.json` or `*.{yaml,yml}` file.

```
my-app
├── app
└── translations
```

```
my-v1-addon
├── addon
└── translations
```

```
my-v2-addon
├── src
└── translations
```

As the project grows, you will find the need to organize your translations. Here are a couple of ways to do so.


## Nested folders

You may create subdirectories to organize your translations.

```
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

Each translation file should have a "namespace," an identifier that helps you localize the translations to that file.

::: code-group

<<< @/snippets/advanced/organizing-translations/example-1/components-hello-de-de.yaml [translations/components/hello/de-de.yaml]

<<< @/snippets/advanced/organizing-translations/example-1/routes-application-de-de.yaml [translations/routes/application/de-de.yaml]

:::


## Namespaced keys

In `ember-intl.config.mjs`, set `buildOptions.wrapTranslationsWithNamespace` to `true` to derive the namespace from folder names.

::: code-group

<<< @/snippets/advanced/organizing-translations/example-2/components-hello-de-de.yaml [translations/components/hello/de-de.yaml]

<<< @/snippets/advanced/organizing-translations/example-2/routes-application-de-de.yaml [translations/routes/application/de-de.yaml]

:::

> [!NOTE]
> 
> Spaces in a folder name are converted to underscores.
