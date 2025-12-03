# Quickstart (Addons)


## 1. Install ember-intl

### v1 addons

Use your package manager to install `ember-intl` (as a dependency or peer dependency). Install `@ember-intl/v1-compat` (as a development dependency) if the `dummy` app needs translations for documentation or testing.

```sh
pnpm add ember-intl
pnpm add -D @ember-intl/v1-compat
```

If your addon provides translations, create the folder `translations` as a sibling to `addon`.

```
my-v1-addon
├── addon
└── translations
```


### v2 addons

Use your package manager to install `ember-intl` (as a dependency or peer dependency).

```sh
pnpm add ember-intl
```

If your addon provides translations, create the folder `translations` as a sibling to `src`.

```
my-v2-addon
├── src
└── translations
```

Then, add `translations` to the `files` field in `package.json`.

```json
/* package.json */
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


## 2. Add a translation

Create a translation in `translations/en-us.yaml`.

```yaml
hello:
  message: "Hello, {name}!"
```

In a template, use the `{{t}}` helper to render the translation.

```hbs
{{! v1 addons: addon/components/hello.hbs }}
<div>
  {{t "hello.message" name=@name}}
</div>
```

```hbs
{{! v2 addons: src/components/hello.hbs }}
<div>
  {{t "hello.message" name=@name}}
</div>
```

Just like [in apps](./quickstart#2-add-a-translation), you can import the `{{t}}` helper in a `<template>`-tag component.

Note, the consuming app can override the addon's translations. If the app uses the same key as the addon, then the app's translation always wins.


## 3. Add a language

Follow [step 3 for apps](./quickstart#3-add-a-language).


## 4. Set test app's locale

Call `setLocale()` if your test app needs translations for documentation.

- v1 addons: `tests/dummy/app/routes/application.ts`
- v2 addons: `app/routes/application.ts`


## 5. Configure linters

Follow [step 5 for apps](./quickstart#5-configure-linters). For brevity, only the differences are noted below.


### @ember-intl/lint

There are no differences.


### ember-template-lint

There are no differences.


### glint

If you use `glint` v1 and "loose mode" templates, then extend `ember-intl`'s template registry.

- v1 addons: `types/global.d.ts`
- v2 addons: `unpublished-development-types/index.d.ts`


### Miscellaneous

There are no differences.
