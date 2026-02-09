# setLocale {#set-locale}

Updates the locale as if the user had changed their preferred language.

::: code-group

```ts [Signature]
function setLocale(locale: string): Promise<void>;
```

:::


## Examples

::: code-group

```gts [tests/integration/components/hello-test.gts]{2,16-18}
import { render } from '@ember/test-helpers';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');

    await setLocale('de-de');

    assert.dom('[data-test-message]').hasText('Hallo, Zoey!');
  });
});
```

:::
