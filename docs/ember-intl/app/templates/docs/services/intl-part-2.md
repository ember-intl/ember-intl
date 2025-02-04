# intl (Part 2)

We continue from [Part 1](./intl-part-1) and will examine parts of the API that are used less often. Some of these methods, such as `setLocale()` and `addTranslations()`, are critical for setting up `ember-intl`.


## Getters

### locales

Returns all locales that have translations.

**WARNING: The values of `locales` have been "normalized," and are meant to be identifiers for the `intl` service. Avoid writing logic based on `locales`.**

```ts
console.log(this.intl.locales);
// ['de-de', 'en-us', 'es-es', 'fr-fr']
```


### primaryLocale

Returns the first locale among the locales that are currently active.

```ts
console.log(this.intl.primaryLocale);
// 'en-us'
```


## Methods

### addTranslations()

Register translations for a particular locale. Used to lazy-load translations.

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['de-de', 'en-us']);
  }

  private async loadTranslations(locale: 'de-de' | 'en-us') {
    const response = await fetch(`/translations/${locale}.json`);
    const translations = await response.json();

    this.intl.addTranslations(locale, translations);
  }
}
```


### exists()

Returns `true` if a translation key exists in one of the locales that are currently active.

```ts
get options(): string[] {
  const options: string[] = [];
  let count = 1;

  while (this.intl.exists(`components.example.option-${count}`)) {
    options.push(this.intl.t(`components.example.option-${count}`));
    count++;
  }

  return options;
}
```

You may query against a particular locale:

```ts
if (this.intl.exists('components.example.option-1', 'de-de')) {
  // Do something
}
```


### getTranslation()

Returns the translation message for a given key and locale.

```ts
console.log(this.intl.getTranslation('hello.message', 'de-de'));
// 'Hallo, {name}!'
```

This method could be used to create default values for arguments, so that users don't see the raw message when an argument doesn't have a value. To extract the message arguments, you can use [`@formatjs/icu-messageformat-parser`](https://formatjs.github.io/docs/icu-messageformat-parser/).


### setLocale()

Specify which locales are active. Used in the `application` route's `beforeModel()` hook, or in a component that allows users to set their preferred language.

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    this.intl.setLocale(['de-de']);
  }
}
```

The order in which you list the locales in `setLocale()` decides the order in which translations are looked up.

```ts
// Given a translation key, check 'de-at' (Austria) first, then 'de-de' (Germany), then 'en-us'
this.intl.setLocale(['de-at', 'de-de', 'en-us']);
```

When you call `setLocale()`, `ember-intl` sets the `lang` global attribute to the first locale, also called the primary locale (recall the getter `primaryLocale`). We recommend providing Unicode locale identifiers to set the `lang` attribute correctly.

```ts
// Recommended
this.intl.setLocale(['de-AT', 'de-DE', 'en-US']);
```


### setOnFormatjsError()

Specify what to do when `@formatjs/intl` errors. Your callback function has access to `error`, [one that is provided by `@formatjs/intl`](https://formatjs.github.io/docs/guides/develop#error-codes).

The following example ignores `FORMAT_ERROR` (incorrect or missing argument values), in addition to `MISSING_TRANSLATION` (default implementation of `ember-intl`).

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    this.intl.setLocale(['de-de']);

    this.intl.setOnFormatjsError((error) => {
      switch (error.code) {
        case 'FORMAT_ERROR':
        case 'MISSING_TRANSLATION': {
          // Do nothing
          break;
        }

        default: {
          throw error;
        }
      }
    });
  }
}
```


### setOnMissingTranslation()

Specify what to display when a translation is missing. Your callback function has access to `key`, `locales`, and `options` (data).

```ts
/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    this.intl.setLocale(['de-de']);

    this.intl.setOnMissingTranslation((key) => {
      return `🐹🐹🐹 Missing: ${key} 🐹🐹🐹`;
    });
  }
}
```
