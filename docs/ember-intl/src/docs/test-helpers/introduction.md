# Test helpers

`ember-intl` provides test helpers so that you can test code that depend on a locale. Every test helper has a camel-cased name and can be name-imported from `test-support`.

```gts [tests/integration/components/hello-test.gts]{2,9,14}
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'de-de');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('Hallo, Zoey!');
  });
});
```

The test helper that you will most frequently use is `setupIntl`. You may want to check the [documentation for `setupIntl`](./setup-intl) first.

## Rendering Tests in v2 apps

The application route is not loaded when rendering tests start, you must import the translations you need  and call `addTranslations` to pass them to the `intl` service. It is recommended you do this in the `tests/helpers/index.js` to apply to every rendering test.

::: code-group

```js [tests/helpers/index.js]{6,12-16}
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
  hooks.beforeEach(function () {
    const intl = this.owner.lookup('service:intl');

    intl.addTranslations('en-us', translationsForEnUs);
  });
}

export { setupApplicationTest, setupRenderingTest, setupTest };
```

:::

> [!NOTE]
> 
> File paths prefixed with `virtual:` are called a "virtual module" in Vite. They don't physically exist on disk.