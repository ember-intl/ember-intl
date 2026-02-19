# t {#t}

> [!CAUTION]
> 
> Do not use this test helper. See [Alternatives](#alternatives) below.

Returns what the `intl` service's `t` returns.

::: code-group

```ts [Signature]
type TParameters = Parameters<IntlService['t']>;

function t(key: TParameters[0], options?: TParameters[1]): string;
```

:::

You might use it for these cases:

- You don't need to check the actual value of a translation.

- You can't load translations because of your project setup (e.g. lazy loading, translations defined in an external package).


## Examples

::: code-group

```gts [tests/integration/components/hello-test.gts]{14-16}
import { render } from '@ember/test-helpers';
import { setupIntl, t } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'de-de');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert
      .dom('[data-test-message]')
      .hasText(t('hello.message', { name: 'Zoey' }));
  });
});
```

:::


## Alternatives

In general, _don't_ use the test helper `t`, because it creates a tautology: `t(...)` is equal to `t(...)` (here, the `t` refers to that from the `intl` service).

An `hasText` or `includesText` assertion, when combined with the test helper `t`, becomes weak: It only guarantees that the translation key is correct, not the rendered message.

> [!NOTE]
> 
> Even when a translation is missing (by accident), the `hasText` or `includesText` assertion will pass, since the test helper `t` can't help you verify the rendered message.

If possible, [load translations in tests](./add-translations#alternatives) and always pass the string that you expect to see to `hasText` and `includesText`. This way, you can easily know what the app displayed at a given time (static code analysis). You can also change translations with more confidence when assertions begin to fail.

::: code-group

```gts [tests/integration/components/hello-test.gts]{8}
module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'de-de');

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('Hallo, Zoey!');
  });
});
```

:::

> [!TIP]
> 
> If assertions fail in multiple test files after changing a translation, then treat this as a sign that your tests didn't separate concerns well (i.e. tests don't trust one another). It's also possible that you need a test helper that hides how assertions are implemented.
> 
> Don't use the possible domino effect as a reason for using the test helper `t`.
