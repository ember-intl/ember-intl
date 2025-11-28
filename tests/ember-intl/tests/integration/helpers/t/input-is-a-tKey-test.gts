import { render } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { t, tKey } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

type Key = 'smoke-tests.hello.message' | 'smoke-tests.hello.world';

interface HelloSignature {
  Args: {
    name?: string;
  };
}

class Hello extends Component<HelloSignature> {
  get key(): Key {
    return this.args.name
      ? tKey('smoke-tests.hello.message')
      : tKey('smoke-tests.hello.world');
  }

  <template>{{t this.key name=@name}}</template>
}

module('Integration | Helper | t > input is a tKey', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(
      <template>
        <div data-test-output="1">
          <Hello @name={{undefined}} />
        </div>

        <div data-test-output="2">
          <Hello @name="Zoey" />
        </div>
      </template>,
    );

    assert.dom('[data-test-output="1"]').hasText('Hello world!');

    assert.dom('[data-test-output="2"]').hasText('Hello, Zoey!');
  });

  test('it returns a new value when the locale is changed', async function (assert) {
    await render(
      <template>
        <div data-test-output="1">
          <Hello @name={{undefined}} />
        </div>

        <div data-test-output="2">
          <Hello @name="Zoey" />
        </div>
      </template>,
    );

    await setLocale('de-de');

    assert.dom('[data-test-output="1"]').hasText('Hallo Welt!');

    assert.dom('[data-test-output="2"]').hasText('Hallo, Zoey!');
  });
});
