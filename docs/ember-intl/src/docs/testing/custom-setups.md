# Custom setups

In `tests/helpers/index.{js,ts}`, you can customize how all (or most) of your application, rendering, and unit tests should be set up. You do so by wrapping the `setup*` functions from `ember-qunit`, then defining additional code.

::: code-group

```ts [tests/helpers/index.ts]
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
  type SetupTestOptions,
} from 'ember-qunit';

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupApplicationTest(hooks, options);
  // Additional setup for application tests can be done here.
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupRenderingTest(hooks, options);
  // Additional setup for rendering tests can be done here.
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupTest(hooks, options);
  // Additional setup for unit tests can be done here.
}

export { setupApplicationTest, setupRenderingTest, setupTest };
```

:::

Below, you will learn a couple of ways for setting up `ember-intl` in tests.


## Add translations

In v2 apps (and v1 apps with [lazy loading](../advanced/lazy-loading-translations)), we pass translations to the `intl` service in the `application` route. As a result, rendering and unit tests don't know about the translations.

For v2 apps, you can import the translations that you need, then call the `intl` service's [`addTranslations`](../services/intl-part-2#methods-add-translations).

::: code-group

```ts [tests/helpers/ember-intl.ts]{1-2,8-9}
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

export function loadTranslations(hooks: NestedHooks): void {
  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');

    intl.addTranslations('de-de', translationsForDeDe);
    intl.addTranslations('en-us', translationsForEnUs);
  });
}
```

```ts [tests/helpers/index.ts]{1,5,10}
import { loadTranslations } from './ember-intl';

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupRenderingTest(hooks, options);
  loadTranslations(hooks);
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupTest(hooks, options);
  loadTranslations(hooks);
}
```

```diff [tests/integration/components/hello-test.gts]
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
- import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
+ import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

-     assert.dom('[data-test-message]').hasText('t:hello.message');
+     assert.dom('[data-test-message]').hasText('Hello, Zoey!');
  });
});
```

:::

The idea is the same for v1 apps with lazy loading: Add translations just like you did in the `application` route.

::: code-group

```ts [tests/helpers/ember-intl.ts]{8-10,15}
type Locale = 'de-de' | 'en-us';

export function loadTranslations(hooks: NestedHooks): void {
  hooks.beforeEach(async function () {
    const intl = this.owner.lookup('service:intl');

    async function load(locale: Locale): Promise<void> {
      const { default: file } = (await import(
        `/translations/${locale}.json`
      )) as {
        default: string;
      };
      const translations = JSON.parse(file) as Record<string, string>;

      intl.addTranslations(locale, translations);
    }

    await Promise.allSettled([load('de-de'), load('en-us')]);
  });
}
```

:::


## Call setupIntl once {#call-setup-intl-once}

Ideally, you might call `setupIntl` in rendering and unit tests, if and only if, they depend on `ember-intl`.

If, (1) for simplicity, you want to call `setupIntl` in all tests, or if (2) you only need to test the locale that dominates your market (e.g. American English), you can call `setupIntl` once in your custom `setupRenderingTest` and `setupTest`.

::: code-group

```ts [tests/helpers/index.ts]{1,5,10}
import { setupIntl } from 'ember-intl/test-support';

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);
  setupIntl(hooks, 'en-us');
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions): void {
  upstreamSetupTest(hooks, options);
  setupIntl(hooks, 'en-us');
}
```

```diff [tests/integration/components/hello-test.gts]
import { render } from '@ember/test-helpers';
- import { setupIntl } from 'ember-intl/test-support';
- import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
+ import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
-   setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');
  });
});
```

:::
