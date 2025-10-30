# t()

The test helper `t()` returns what the `intl` service's `t()` method returns. You may use it for these cases:

- You don't need to check the actual value of a translation.
- You _can't_ get the value because of your project setup (e.g. lazy loading).


## t(key, [options])

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl, t } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert
      .dom('[data-test-message]')
      .hasText(t('hello.message', { name: 'Zoey' }));
  });
});
```


## Alternative approaches

In general, we recommend _not_ using this test helper. In essence, you are writing a tautology (`t()` is equal to `t()`), which may be considered useless.

When possible, make an `.hasText()` or `.includesText()` assertion. This way, you know what your app displayed at a given point of time. If the translation is changed later, you can get immediate feedback from failing assertions. (Was the change correct?)

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('t:hello.message');
  });
});
```

If you want to check the actual value, consider writing a test helper that lazy-loads the translations.

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { loadTranslations } from '../../helpers';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(async function () {
    await loadTranslations('en-us');
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');
  });
});
```