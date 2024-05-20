# addTranslations()

Updates translations as if you had somehow added them (e.g. via lazy loading).


## addTranslations(locale, translations)

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | lazy-hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('Lazily loaded translations', async function (assert) {
    await render(hbs`
      <LazyHello @name="Zoey" />
    `);

    assert
      .dom('[data-test-message]')
      .doesNotIncludeText('Hello, Zoey!')
      .hasText('t:lazy-hello.message:("name":"Zoey")');

    await addTranslations('en-us', {
      'lazy-hello': {
        message: 'Hello, {name}!',
      },
    });

    assert
      .dom('[data-test-message]')
      .hasText('Hello, Zoey!')
      .doesNotIncludeText('t:lazy-hello.message:("name":"Zoey")');
  });
});
```
