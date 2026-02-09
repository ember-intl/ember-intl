# addTranslations {#add-translations}

Updates translations as if you had somehow added them (e.g. via lazy loading).

::: code-group

```ts [Signature]
type TranslationKey = string;

type TranslationMessage = string;

type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

function addTranslations(
  locale: string,
  translations: TranslationJson,
): Promise<void>;
```

:::


## Examples

::: code-group

```gts [tests/integration/components/hello-test.gts]{2,16-22}
import { render } from '@ember/test-helpers';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('t:hello.message');

    await addTranslations('en-us', {
      hello: {
        message: 'Hello, {name}!',
      },
    });

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');
  });
});
```

:::


## Alternatives

If you want to load translations in all rendering and unit tests, call the `intl` service's [`addTranslations`](../services/intl-part-2#methods-add-translations) in your custom `setupRenderingTests` and `setupTests`.

::: code-group

```ts [tests/helpers/index.ts]{5-6,15-20}
import {
  setupRenderingTest as upstreamSetupRenderingTest,
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

export { setupRenderingTest };
```

```gts [tests/integration/components/hello-test.gts]{4,8,14}
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import Hello from 'my-app/components/hello';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');
  });
});
```

:::
