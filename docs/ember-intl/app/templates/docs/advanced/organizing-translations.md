# Organizing translations

Translations are stored in the `translations` folder, either as a `*.json` or `*.{yaml,yml}` file.

```sh
my-app
├── app
└── translations
```

```sh
my-v1-addon
├── addon
└── translations
```

```sh
my-v2-addon
├── src
└── translations
```

As the project grows, you will find the need to organize your translations. Here are a couple of ways to do so.


### Nested folders

You may create subdirectories to organize your translations.

```sh
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

<DocsDemo as |demo|>
  <demo.snippet
    @label="translations/components/hello/de-de.yaml"
    @name="docs__advanced__organizing-translations__example-1__components-hello-de-de.yaml"
  />

  <demo.snippet
    @label="translations/routes/application/de-de.yaml"
    @name="docs__advanced__organizing-translations__example-1__routes-application-de-de.yaml"
  />
</DocsDemo>


### Namespace from folders

In `config/ember-intl.js`, set `wrapTranslationsWithNamespace` to `true` to derive the namespace from folder names.

<DocsDemo as |demo|>
  <demo.snippet
    @label="translations/components/hello/de-de.yaml"
    @name="docs__advanced__organizing-translations__example-2__components-hello-de-de.yaml"
  />

  <demo.snippet
    @label="translations/routes/application/de-de.yaml"
    @name="docs__advanced__organizing-translations__example-2__routes-application-de-de.yaml"
  />
</DocsDemo>

Note, spaces in a folder name will be converted to underscores.
