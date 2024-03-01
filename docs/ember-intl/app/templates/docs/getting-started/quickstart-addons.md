# Quickstart (Addons)

Addons need to publish a folder called `translations`. Note, `translations` is the name that your apps expect, unless configured otherwise.


## 1. Install ember-intl

### v1 addons

You can use Ember CLI to install `ember-intl`.

```sh
ember install ember-intl
```

This will create a few files:

* `tests/dummy/app/formats.js`
* `tests/dummy/config/ember-intl.js`
* `translations/en-us.yaml`

Note the folder structure. Namely, `addon` and `translations` are siblings.

```sh
my-v1-addon
├── addon
└── translations
```


### v2 addons

You can use your package manager to install `ember-intl` (as a dependency or peer dependency).

```sh
pnpm add ember-intl
```

Then, create the folder `translations` as a sibling to `src`.

```sh
my-v2-addon
├── src
└── translations
```

Lastly, add `translations` to the `files` field in `package.json`.

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
  {{t "hello.message" name="Zoey"}}
</div>
```

```hbs
{{! v2 addons: src/components/hello.hbs }}
<div>
  {{t "hello.message" name="Zoey"}}
</div>
```

Note, the consuming app can override the addon's translations. If the app uses the same key as the addon, then the app's translation always wins.


## 3. Add a language

Follow [the same step for apps](./quickstart#3-add-a-language).


## 4. Configure project

Follow [the same step for apps](./quickstart#4-configure-project). For brevity, only the differences are noted below.


### Set your test app's locale (optional)

If your test app is something more than "just tests," e.g. the app is also a documentation app, then you will want to set the locale in your test app.

- v1 addons: `tests/dummy/app/routes/application.js`
- v2 addons: `app/routes/application.js`


### Glint

Extend `ember-intl`'s template registry.

- v1 addons: `types/global.d.ts`
- v2 addons: `unpublished-development-types/index.d.ts`


### Lint templates

There are no differences.


### Lint translations

There are no differences.
