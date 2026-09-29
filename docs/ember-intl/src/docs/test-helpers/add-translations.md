# addTranslations {#add-translations}

Updates translations as if you had somehow added them (e.g. via lazy loading).

::: code-group

```ts [Signature]
type TranslationKey = string;

type TranslationMessage = string;

type TranslationJson = Record<TranslationKey, TranslationMessage>;

function addTranslations(
  locale: string,
  translations: TranslationJson,
): Promise<void>;
```

:::


## Examples

::: code-group

```gts [tests/integration/components/hello-test.gts]{16-22}
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
