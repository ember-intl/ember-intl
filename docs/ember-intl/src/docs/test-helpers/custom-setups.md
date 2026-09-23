# Custom Test Setups

Customizing the helpers in `tests/helpers/index.ts` will allow you to customize the setup of every test which calls the helpers such as available translations and the current locale.

## Setup Locale

Instead of calling `setupIntl` in every test, you can call it once and declare a default locale which can be overridden in specific tests if needed.

::: code-group

```js [tests/helpers/index.js]{6,10}
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';
import { setupIntl } from 'ember-intl/test-support';

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);
  setupIntl(hooks, 'en-us');
}

export { setupApplicationTest, setupRenderingTest, setupTest };
```

:::


## Load Translations

If you want to load translations in all rendering and unit tests, call the `intl` service's [`addTranslations`](../services/intl-part-2#methods-add-translations) in your custom `setupRenderingTests` and `setupTests`.

::: code-group

```ts [tests/helpers/index.ts]{6-7,16-21,28-34}
import {
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

function setupRenderingTest(
  hooks: NestedHooks,
  options?: SetupTestOptions,
): void {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');

    intl.addTranslations('de-de', translationsForDeDe);
    intl.addTranslations('en-us', translationsForEnUs);
  });
}

function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');

    intl.addTranslations('en-us', translationsForEnUs);
    intl.addTranslations('es', translationsForEs);
    intl.addTranslations('fr', translationsForFr);
  });
}

export { setupApplicationTest, setupRenderingTest, setupTest };
```

:::