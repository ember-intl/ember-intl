# setupIntl()

In rendering and unit tests, you should add `setupIntl()` if they depend on `ember-intl`, e.g. you used the `{{t}}` helper in the template, or injected the `intl` service in the class.

In application tests, it's not necessary to call `setupIntl()`. The only time you might do this is to run a test module with a particular locale.


## setupIntl(hooks, locale)

The default syntax helps you check the translations for a specific locale.

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'de-de');

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('Hallo, Zoey!');
  });
});
```


## setupIntl(hooks, locale, translations)

You can pass a translation object to stub the translations for a specific locale.

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'de-de', {
    hello: {
      message: 'Na, {name}?',
    },
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('Na, Zoey?');
  });
});
```
