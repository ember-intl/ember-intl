# Migrating from 2.0 to 3.0

- `baseLocale` was removed from `config/ember-intl.js`

- `format-html-message` was removed in favor of passing `htmlSafe=true` into the `t` & `format-message` API.

```hbs
{{t "app.sale_begins" day=this.day htmlSafe=true}}

{{format-html-message
  "Sale begins {day, date, shortWeekDay}"
  day=this.day
  htmlSafe=true
}}
```

- `ember-intl-dot-notation` is no longer needed. Delete `app/models/ember-intl-translation.js`. Your application should continue to behave the same whether your keys are flat or nested objects.

- `intl.addTranslation` was removed in favor of using `intl.addTranslations`. `addTranslations` takes a locale as the first argument and a object as the second.

Example:

```js
intl.addTranslations('en-us', {
  hero: 'Welcome to ember-intl 3.0'
});
```

- `fallback` was removed in favor of `defaults`. This is for better alignment with ember-i18n's API.

```hbs
{{t "app.sale_begins" day=this.day fallback="Sale begins {day, date, shortWeekDay}"}}
```

becomes

```js
intl.addTranslations('en-us', {
  home: {
    sale_begins: 'Sale begins {day, date, shortWeekDay}'
  }
});
```

```hbs
{{t "app.sale_begins" day=this.day defaults="home.sale_begins"}}
```