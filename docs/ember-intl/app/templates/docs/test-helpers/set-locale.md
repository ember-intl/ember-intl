# setLocale()

Updates the locale as if the user had changed their preferred language.


## setLocale(locale)

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');

    await setLocale('de-de');

    assert.dom('[data-test-message]').hasText('Hallo, Zoey!');
  });
});
```
