import { setOwner } from '@ember/application';
import {
  render,
  settled,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import {
  setupRenderingTest,
  User,
} from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  user: User;
}

module('Integration | Component | macros', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.user = new User();

    // Allow injecting the intl service
    setOwner(this.user, this.owner);
  });

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{! @glint-nocheck }}
      <Macros
        @name={{this.user.name}}
      />
    `);

    assert
      .dom('[data-test-output="intl"]')
      .hasText('Apples, Bananas, and Oranges');

    assert.dom('[data-test-output="t"]').hasText('Hello, Zoey!');

    assert.dom('[data-test-output="t-with-raw"]').hasText('Hello, name!');
  });

  test('we can update the arguments', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{! @glint-nocheck }}
      <Macros
        @name={{this.user.name}}
      />
    `);

    this.user.name = 'Tomster';

    await settled();

    assert
      .dom('[data-test-output="intl"]')
      .hasText('Apples, Bananas, and Oranges');

    assert.dom('[data-test-output="t"]').hasText('Hello, Tomster!');

    assert.dom('[data-test-output="t-with-raw"]').hasText('Hello, name!');
  });

  test('we can switch the locale', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{! @glint-nocheck }}
      <Macros
        @name={{this.user.name}}
      />
    `);

    await setLocale('de-de');

    assert
      .dom('[data-test-output="intl"]')
      .hasText('Äpfel, Bananen und Orangen');

    assert.dom('[data-test-output="t"]').hasText('Hallo, Zoey!');

    assert.dom('[data-test-output="t-with-raw"]').hasText('Hallo, name!');
  });
});
