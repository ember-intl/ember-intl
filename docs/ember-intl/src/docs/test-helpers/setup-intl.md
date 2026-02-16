# setupIntl {#setup-intl}

You must call `setupIntl` in rendering and unit tests if what they are testing depends on `ember-intl`. For example, you called the `t` helper in a template, injected the `intl` service in a class, or rendered another component that depends on `ember-intl`.

::: code-group

```ts [Signature]
type TranslationKey = string;

type TranslationMessage = string;

type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

function setupIntl(
  hooks: NestedHooks,
  locale: string,
  translations?: TranslationJson,
): void;
```

:::

> [!TIP]
> 
> Calling `setupIntl` is unnecessary in application tests, because you set up `ember-intl` in the `application` route. (The `beforeEach` hook runs automatically.)
> 
> To test the application with a different locale, you can call `setupIntl` inside a test module. An alternative is to call [`setLocale`](./set-locale) in the module's `beforeEach` hook.


## Examples

The default syntax (with 2 arguments) helps you check translations for a given locale.

::: code-group

```gts [tests/integration/components/hello-test.gts]{9,14}
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

:::

> [!TIP]
> 
> To test multiple locales, use nested modules.
>
> ::: code-group
>
> ```gts [tests/integration/components/hello-test.gts]{4-5,14-15}
> module('Integration | Component | hello', function (hooks) {
>   setupRenderingTest(hooks);
>
>   module('de-de', function (nestedHooks) {
>     setupIntl(nestedHooks, 'de-de');
> 
>     test('it renders', async function (assert) {
>       await render(<template><Hello @name="Zoey" /></template>);
> 
>       assert.dom('[data-test-message]').hasText('Hallo, Zoey!');
>     });
>   });
>
>   module('en-us', function (nestedHooks) {
>     setupIntl(nestedHooks, 'en-us');
> 
>     test('it renders', async function (assert) {
>       await render(<template><Hello @name="Zoey" /></template>);
>
>       assert.dom('[data-test-message]').hasText('Hello, Zoey!');
>     });
>   });
> });
> ```

You can pass an `translations` object as the 3rd positional argument, if you want to stub the translations for a specific locale (not recommended).

::: code-group

```gts [tests/integration/components/hello-test.gts]{9-13,18}
import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import Hello from 'my-app/components/hello';
import { module, test } from 'qunit';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'de-de', {
    hello: {
      message: 'Na, {name}?',
    },
  });

  test('it renders', async function (assert) {
    await render(<template><Hello @name="Zoey" /></template>);

    assert.dom('[data-test-message]').hasText('Na, Zoey?');
  });
});
```

:::
