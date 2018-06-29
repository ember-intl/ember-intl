
Integration Testing
==============================================================================

ember-intl provides some convenience test helpers for easy mocking of
translations and running assertions against translated strings.

### `setupIntl(hooks, [locale], [translations])`

This helper does two main things:

- It makes the `intl` service available as `this.intl` in your current test
  context for easier access.
- It registers a custom `missing-message` util, that deterministically
  serializes all not explicitly defined translations. This allows you to focus
  on the actual logic in your tests and not on providing / mocking translations.

It can be invoked in four different ways.

#### `setupIntl(hooks)`

Just injects `intl` into the context and enables deterministic serialization of
missing translations. Also take a look at the [`t` helper](#tkey-options)
further down, that makes asserting against these translations a breeze.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('setupIntl demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it serializes missing translations and injects the `intl` service', async function(assert) {
    await render(hbs`{{t "some.translation" someVariable="Hello"}}`);
    assert.dom().hasText('t:some.translation:("someVariable":"Hello")');

    assert.strictEqual(this.intl, this.owner.resolve('service:intl'));
  });
});
```

#### `setupIntl(hooks, locale)`

Does what `setupIntl(hooks)` does and also sets the locale. You can also use
[`setLocale(locale)`](#setlocalelocale) for that.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('setupIntl demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it sets the locale', async function(assert) {
    assert.deepEqual(get(this.intl, 'locale'), ['en-us']);
  });
});
```

#### `setupIntl(hooks, translations)`

Does what `setupIntl(hooks)` does and adds translations to the active locale.
You can also use [`addTranslations([locale], translations)`](#addtranslationslocale-translations)
for that.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('setupIntl demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, {
    some: {
      mocked: {
        translations: 'Hello {thing}'
      }
    }
  });

  test('it renders', async function(assert) {
    await render(hbs`{{t "some.mocked.translation" thing="world"}}`);
    assert.dom().hasText('Hello world');

    // stuff that is not explicitly mocked uses fallback serialization
    await render(hbs`{{t "some.translation" someVariable="Hello"}}`);
    assert.dom().hasText('t:some.translation:("someVariable":"Hello")');

    assert.strictEqual(this.intl, this.owner.resolve('service:intl'));
  });
});
```

#### `setupIntl(hooks, locale, translations)`

Combination of the previous two. Sets the locale and also adds the translations.
You can also use [`setLocale(locale)`](#setlocalelocale) and
[`addTranslations([locale], translations)`](#addtranslationslocale-translations)
for that.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl } from 'ember-intl/test-support';

module('setupIntl demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us', {
    some: {
      mocked: {
        translations: 'Hello {thing}'
      }
    }
  });

  test('it sets the locale and mocks the translations', async function(assert) {
    assert.deepEqual(get(this.intl, 'locale'), ['en-us']);

    await render(hbs`{{t "some.mocked.translation" thing="world"}}`);
    assert.dom().hasText('Hello world');

    // stuff that is not explicitly mocked uses fallback serialization
    await render(hbs`{{t "some.translation" someVariable="Hello"}}`);
    assert.dom().hasText('t:some.translation:("someVariable":"Hello")');

    assert.strictEqual(this.intl, this.owner.resolve('service:intl'));
  });
});
```

### `setLocale(locale)`

Baheaves as if you called `setLocale(locale)` on the `intl` service.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl, setLocale } from 'ember-intl/test-support';

module('setLocale demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it sets the locale', async function(assert) {
    setLocale('en-us');
    assert.deepEqual(get(this.intl, 'locale'), ['en-us']);

    setLocale('de-de');
    assert.deepEqual(get(this.intl, 'locale'), ['de-de']);
  });
});
```

### `addTranslations([locale], translations)`

Baheaves as if you called `addTranslations(locale, translations)` on the `intl`
service. For your convenience you can omit the `locale` parameter and it will
default to the last currently active locale, meaning that if your current
locales were `['en-ca', 'en-gb', 'en-us']`, the translations would be added to
`'en-us'`.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl, setLocale } from 'ember-intl/test-support';

module('addTranslations demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it adds the translations', async function(assert) {
    setLocale(['en-ca', 'en-gb', 'en-us'];

    addTranslations({
      translation: {
        on: {
          enUs: "'murica"
        }
      }
    });

    addTranslations('en-ca', {
      translation: {
        on: {
          enCa: 'Sorry'
        }
      }
    });

    assert.ok(this.intl.exists('en-us', 'translation.on.enUs'));
    assert.ok(this.intl.exists('en-ca', 'translation.on.enCa'));
  });
});
```

### `t(key, [options])`

The `t` helper is a shortcut for accessing the `t` method on the `intl` service.
In combination with the fallback serialization behavior of `setupIntl(hooks)`,
it becomes especially useful, because you now don't need to worry about how to
provide translations or mock them for tests.

Your case can now focus on testing what you actually want to test: that the
correct translation is rendered with the corect variables. And not that the
translation messages are there and correctly interpolated by ember-intl.

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupIntl, t } from 'ember-intl/test-support';

module('t demo', function(hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it is a shortcut for accessing translations', async function(assert) {
    await render(hbs`{{t "some.translation" someVariable="Hello"}}`);
    assert.dom().hasText(t('some.translation', { someVariable: 'Hello' }));
  });
});
```
