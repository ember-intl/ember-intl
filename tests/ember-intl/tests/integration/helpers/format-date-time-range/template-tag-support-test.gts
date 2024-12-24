import { render } from '@ember/test-helpers';
import { formatDateTimeRange } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-date-time-range > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const from = new Date('2014-01-23T18:00:44');
      const to = new Date('2014-01-26T19:30:34');

      await render(
        <template>
          <div data-test-output>
            {{formatDateTimeRange from to}}
          </div>
        </template>,
      );

      assert
        .dom('[data-test-output]')
        .hasText(/1\/23\/2014\s–\s1\/26\/2014/)
        .hasText('1/23/2014 – 1/26/2014');

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(/23\.–26\.01\.2014/)
        .hasText('23.–26.01.2014');
    });
  },
);
