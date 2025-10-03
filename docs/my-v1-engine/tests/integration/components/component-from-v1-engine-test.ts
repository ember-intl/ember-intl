import { render } from '@ember/test-helpers';
import {
  type RenderingTestContext,
  setupRenderingTest,
} from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

interface TestContext extends RenderingTestContext {}

module('Integration | Component | component-from-v1-engine', function (hooks) {
  setupRenderingTest(hooks);

  module('de-de', function (nestedHooks) {
    setupIntl(nestedHooks, 'de-de');

    test('it renders', async function (this: TestContext, assert) {
      await render(
        hbs`
          <ComponentFromV1Engine />
        `,
        // @ts-expect-error: Property 'visit' is missing in type 'EngineInstance' but required in type 'Owner'
        { owner: this.engine },
      );

      assert
        .dom('[data-test-output="Engine"]')
        .hasText('Dies ist eine Komponente aus einer Engine.');
    });
  });

  module('en-us', function (nestedHooks) {
    setupIntl(nestedHooks, 'en-us');

    test('it renders', async function (this: TestContext, assert) {
      await render(
        hbs`
          <ComponentFromV1Engine />
        `,
        // @ts-expect-error: Property 'visit' is missing in type 'EngineInstance' but required in type 'Owner'
        { owner: this.engine },
      );

      assert
        .dom('[data-test-output="Engine"]')
        .hasText('This is a component from an engine.');
    });
  });
});
