import { formatList } from 'ember-intl';

import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  list: string[];
}

module(
  'Integration | Helper | format-list > input is an array of strings',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.list = ['apples', 'bananas', 'oranges'];
    });

    test('it returns a string', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatList self.list}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('apples, bananas, and oranges');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatList self.list}}
      </div>
      </template>);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('apples, bananas und oranges');
    });

    test('we can specify the grouping style', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output="1">
        {{formatList self.list style="long"}}
      </div>

      <div data-test-output="2">
        {{formatList self.list style="narrow"}}
      </div>

      <div data-test-output="3">
        {{formatList self.list style="short"}}
      </div>
      </template>);

      assert
        .dom('[data-test-output="1"]')
        .hasText('apples, bananas, and oranges');

      assert.dom('[data-test-output="2"]').hasText('apples, bananas, oranges');

      assert
        .dom('[data-test-output="3"]')
        .hasText('apples, bananas, & oranges');
    });

    test('we can specify the grouping type', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output="1">
        {{formatList self.list type="conjunction"}}
      </div>

      <div data-test-output="2">
        {{formatList self.list type="disjunction"}}
      </div>

      <div data-test-output="3">
        {{formatList self.list type="unit"}}
      </div>
      </template>);

      assert
        .dom('[data-test-output="1"]')
        .hasText('apples, bananas, and oranges');

      assert
        .dom('[data-test-output="2"]')
        .hasText('apples, bananas, or oranges');

      assert.dom('[data-test-output="3"]').hasText('apples, bananas, oranges');
    });
  },
);
