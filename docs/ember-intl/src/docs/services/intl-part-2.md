# intl (Part 2)

In Part 2, we'll examine the API that is used less often. Some of these methods, such as `setLocale` and `addTranslations`, are critical for setting up `ember-intl`.


## Getters

### locales {#getters-locales}

Returns all locales that have translations.

```ts {:no-line-numbers}
console.log(this.intl.locales);
// ['de-de', 'en-us', 'es-es', 'fr-fr']
```

> [!WARNING]
> 
> The values of `locales` have been "normalized," and are meant to be identifiers for the `intl` service. Avoid writing logic based on `locales`.


### primaryLocale {#getters-primary-locale}

Returns the first locale among the locales that are currently active.

```ts {:no-line-numbers}
console.log(this.intl.primaryLocale);
// 'en-us'
```


## Methods

### addTranslations {#methods-add-translations}

Passes translations for a locale to the `intl` service. Used to lazy-load translations.

::: code-group

```ts [app/routes/application.ts]{19}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

const translationModules = {
  'de-de': () => import('virtual:ember-intl/translations/de-de'),
  'en-us': () => import('virtual:ember-intl/translations/en-us'),
} as const;

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel(): Promise<void> {
    await this.setupIntl();
  }

  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const { default: translations } = await translationModules[locale]();

    this.intl.addTranslations(locale, translations);
  }

  private async setupIntl(): Promise<void> {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['en-us']);
  }
}
```

:::


### exists {#methods-exists}

Returns `true` if the key is found in one of the locales that are currently active.

::: code-group

```gts [app/components/example.gts]{8}
export default class Example extends Component<ExampleSignature> {
  @service declare intl: Services['intl'];

  get labels(): string[] {
    const labels: string[] = [];
    let count = 1;

    while (this.intl.exists(`select.option-${count}`)) {
      labels.push(this.intl.t(`select.option-${count}`));
      count++;
    }

    return labels;
  }
}
```

:::

You can also query against a particular locale:

```ts {:no-line-numbers}
if (this.intl.exists('select.option-1', 'de-de')) {
  // Do something
}
```


### getTranslation {#methods-get-translation}

Returns the translation message for a given key and locale.

```ts {:no-line-numbers}
console.log(this.intl.getTranslation('hello.message', 'de-de'));
// 'Hallo, {name}!'
```

This method might be used to create a fallback for the translation message's arguments. To extract the message arguments, you can use [`@formatjs/icu-messageformat-parser`](https://formatjs.github.io/docs/icu-messageformat-parser/).


### setFormats {#methods-set-formats}

Passes reusable formats (defined in `app/ember-intl.{js,ts}`) to the `intl` service.

::: code-group

```ts [app/ember-intl.ts]
import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatTime: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};
```

```ts [app/routes/application.ts]{13}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
import { formats } from 'my-app/ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.setFormats(formats);
    this.intl.setLocale(['de-de']);
  }
}
```

:::

> [!NOTE]
> 
> Since formats are set in the `application` route, your rendering and unit tests will need additional setup if they depend on a particular format.
>
> ::: code-group
>
> ```ts [tests/integration/components/example-test.gts]
> import { setupIntl } from 'ember-intl/test-support';
> import { formats } from 'my-app/ember-intl';
> 
> module('Integration | Component | example', function (hooks) {
>   setupIntl(hooks, 'en-us');
> 
>   hooks.beforeEach(function () {
>     const intl = this.owner.lookup('service:intl');
>     intl.setFormats(formats);
>   });
> });
> ```
> 
> :::



### setLocale {#methods-set-locale}

Specify which locales are active. Used in the `application` route's `beforeModel()` hook, or a component that allows users to set their preferred language.

::: code-group

```ts [app/routes/application.ts]{12}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.setLocale(['de-de']);
  }
}
```

:::

> [!IMPORTANT]
> 
> It's recommended that the value for a locale matches a translation file's name (case-sensitive). For example, if the file `translations/de-de.yaml` exists, then please pass `'de-de'` (not `'de-DE'` or any other variant).
> 
> This restriction is more for v1 apps, where you have less control over how to load translations.

The order of locales defines the lookup order for a translation.

```ts {:no-line-numbers}
// Check 'de-at' (Austria) first, then 'de-de' (Germany), then 'en-us'
this.intl.setLocale(['de-at', 'de-de', 'en-us']);
```

> [!NOTE]
> 
> When you call `setLocale`, `ember-intl` sets the `lang` global attribute to the first locale, also called the primary locale (recall the getter `primaryLocale`).


### setOnFormatjsError {#methods-set-on-formatjs-error}

Specifies what to do when `@formatjs/intl` errors. Your callback function has access to [the `error` object provided by `@formatjs/intl`](https://formatjs.github.io/docs/guides/develop#error-codes).


> [!NOTE]
> 
> By default, `ember-intl` warns `MISSING_DATA` (browser doesn't support an Intl API) and ignores `MISSING_TRANSLATION` (translation message doesn't exist).

Suppose you want to ignore `FORMAT_ERROR` (incorrect or missing argument values) and `MISSING_TRANSLATION`:

::: code-group

```ts [app/routes/application.ts]{14-26}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
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

:::


### setOnMissingTranslation {#methods-set-on-missing-translation}

Specifies what to show users when a translation is missing. Your callback function has access to the translation's `key`, `locales`, and `data`.

::: code-group

```ts [app/routes/application.ts]{14-16}
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.setLocale(['de-de']);

    this.intl.setOnMissingTranslation((key) => {
      return `🐹🐹🐹 Missing: ${key} 🐹🐹🐹`;
    });
  }
}
```

:::
