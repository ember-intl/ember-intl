# Testing

With `ember-intl`'s test helpers, you can check translations under various conditions easily.


## setupIntl(hooks, [locale], [translations])

In rendering and unit tests, you must add `setupIntl(hooks)` if they depend on `ember-intl`, e.g. you used the `{{t}}` helper in the template, or injected the `intl` service in the class.

You can also use `setupIntl()` to set the locale and stub translations. This setup runs as a part of the test module's `beforeEach` hook (e.g. before a component is rendered).

In application tests, it's not necessary to call `setupIntl(hooks)`. The only time you might do this is to run a test module with a particular locale.


### setupIntl(hooks)

The syntax helps you check the default case. That is, what does the user see with the default locale and the translations as provided?

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('Hello, Zoey!');
  });
});
```


### setupIntl(hooks, locale)

The syntax helps you check the translations for a specific locale.

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


### setupIntl(hooks, translations)

The syntax helps you stub the translations for the default locale.

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, {
    hello: {
      message: 'What\'s up, {name}?',
    },
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello @name="Zoey" />
    `);

    assert.dom('[data-test-message]').hasText('What\'s up, Zoey?');
  });
});
```


### setupIntl(hooks, locale, translations)

The syntax helps you stub the translations for a specific locale.

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


## setLocale(locale)

Updates the locale as if the user had changed their preferred language.

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

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


## addTranslations([locale], translations)

Updates the translations as if you had somehow added them (e.g. via lazy loading).

The first parameter, `locale`, is optional and defaults to the last currently active locale. For example, if the current locales are `['en-ca', 'en-gb', 'en-us']`, then the translations will be added to `'en-us'` by default.

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | lazy-hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('Lazily loaded translations', async function (assert) {
    await render(hbs`
      <LazyHello @name="Zoey" />
    `);

    assert
      .dom('[data-test-message]')
      .doesNotIncludeText('Hello, Zoey!')
      .hasText('t:lazy-hello.message:("name":"Zoey")');

    await addTranslations({
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


## t(key, [options])

Use this test helper if you don't need to check the actual value of a translation, or you _can't_ get the value because of how your project is set up. It returns what the `intl` service's `t()` method would return.

In most cases, we recommend _not_ using this test helper. In essence, you are writing a tautology (`t()` is equal to `t()`), which may be considered useless.

When possible, pass the actual value to an `.hasText()` or `.includesText()` assertion. This way, you know what your app displayed at a given point of time. If the translation is changed later, you can get immediate feedback from failing assertions. (Was the change correct?)

```ts
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl, t } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

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


## Guarding against errors

You will likely encounter a runtime error when a helper like `{{t}}` is used without the required data. Such error can perhaps more likely happen in tests, because you didn't initialize all inputs (e.g. a component's arguments).

To prevent runtime errors, you can pass the `allowEmpty` option to the helper (i.e. per invocation). Alternatively, you might overwrite the helper (avoid this approach if possible).

```js
// app/helpers/t.js
import THelper from 'ember-intl/helpers/t';

export default class extends THelper {
  allowEmpty = true;
}
```