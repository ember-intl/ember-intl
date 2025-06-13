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

The steps below describe how [keys can be created automatically](https://formatjs.github.io/docs/getting-started/message-extraction/).


## 1. Use `{{format-message}}`

In templates, use the `{{format-message}}` helper and pass the translation that you want for the default locale.

```hbs
{{! app/templates/application.hbs }}
<div>
  {{format-message "Hello, {name}!" name="Zoey"}}
</div>
```

In classes, you would use the `intl` service's `formatMessage()` method instead.

```ts
// app/controller/application.ts
export default class ApplicationController extends Controller {
  get helloMessage(): string {
    return this.intl.formatMessage('Hello, {name}!', {
      name: 'Zoey',
    });
  }
}
```


## 2. Extract translations

Install `@formatjs/cli` as a development dependency, then add the following script:

```json
/* package.json */
{
  "scripts": {
    "intl:extract": "formatjs extract \"app/**/*.{gjs,gts,hbs,js,ts}\" --format simple --ignore \"**/*.d.ts\" > translations/en-us.json"
  },
  "devDependencies": {
    "@formatjs/cli": "..."
  }  
}
```

Run the script to get the translation file for the default locale.

```json
/* translations/en-us.json */
{
  "tBFOH1": "Hello, {name}!"
}
```

Now that you have a translation file with unique keys, you can create translation files for your other locales in one of two ways:

- Manual: Duplicate the default locale file, then update translations.
- Use a Translation Management System (TMS).


## 3. Convert `{{format-message}}` to `{{t}}`

Finally, we need to change `{{format-message}}` and `formatMessage()` to `{{t}}` and `t()`, so that your app displays the correct translations to your users.

Install [`ember-formatjs`](https://github.com/mainmatter/ember-formatjs/blob/main/README.md) as a development dependency. The addon will transform your code at build time.

```json
/* package.json */
{
  "devDependencies": {
    "ember-formatjs": "..."
  }  
}
```

```hbs
{{! What gets built for app/templates/application.hbs }}
<div>
  {{t "tBFOH1" name="Zoey"}}
</div>
```
