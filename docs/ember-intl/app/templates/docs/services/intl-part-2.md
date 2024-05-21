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
/* routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['en-us']);
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


### setLocale()

Specify which locales are currently active. Used in the `application` route's `beforeModel()` hook, or in a component that allows users to set their preferred language.

```ts
/* routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel() {
    this.intl.setLocale(['de-de']);
  }
}
```


### setOnFormatjsError()

Specify what to do when `@formatjs/intl` errors. Used to override `ember-intl`'s default implementation.

```ts
/* routes/application.ts */
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

Your callback function has access to `error`, [one that is provided by `@formatjs/intl`](https://formatjs.io/docs/guides/develop#error-codes).


### setOnMissingTranslation()

Specify what to display when a translation is missing. Used to override `ember-intl`'s default implementation.

```ts
/* routes/application.ts */
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

Your callback function has access to `key`, `locales`, and `options` (data).
