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


## 4. Configure project

Follow [step 4 for apps](./quickstart#4-configure-project). For brevity, only the differences are noted below.


### Set your test app's locale

If your test app uses the `app` folder to provide documentation, you will want to set the locale.

- v1 addons: `tests/dummy/app/routes/application.ts`
- v2 addons: `app/routes/application.ts`


### Set up glint

If your addon uses [`glint`](https://typed-ember.gitbook.io/glint) and is in "loose mode" (has `*.hbs` files or `hbs` tags), extend `ember-intl`'s template registry.

- v1 addons: `types/global.d.ts`
- v2 addons: `unpublished-development-types/index.d.ts`


### Lint templates

There are no differences.


### Lint translations

There are no differences.
