# Auto-generating keys

By default, `ember-intl` asks developers to create translation keys in `*.json` or `*.yml` files, then to render translations using the `{{t}}` helper.

```json
/* translations/en-us.json */
{
  "hello": {
    "message": "Hello, {name}!"
  }
}
```

```hbs
{{! app/templates/application.hbs }}
<div>
  {{t "hello.message" name="Zoey"}}
</div>
```

Maintaining and extending these keys can be difficult if you have a production project and need to support many locales.

You can install [`ember-formatjs`](https://github.com/mainmatter/ember-formatjs/) to take [the extraction approach from `@formatjs/cli`](https://formatjs.github.io/docs/getting-started/message-extraction/). The addon will transform your `{{format-message}}` helpers to `{{t}}` at build time:

```hbs
{{! What you write in app/templates/application.hbs }}
<div>
  {{format-message "Hello, {name}!" name="Zoey"}}
</div>
```

```hbs
{{! What gets built in app/templates/application.hbs }}
<div>
  {{t "some-hash" name="Zoey"}}
</div>
```

Use `@formatjs/cli` to extract the translation file for the default locale. Then, create translation files for other locales, either manually or with the help of a Translation Management System (TMS).

```json
/* translations/en-us.json */
{
  "some-hash": "Hello, {name}!"
}
```

For more information, please see `ember-format`'s [`README`](https://github.com/mainmatter/ember-formatjs/blob/main/README.md).
