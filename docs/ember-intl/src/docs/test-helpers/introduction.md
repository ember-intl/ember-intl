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
