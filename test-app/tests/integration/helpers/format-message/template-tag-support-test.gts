import { setOwner } from '@ember/application';
import { render } from '@ember/test-helpers';
import { formatMessage } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { Population, setupRenderingTest } from 'test-app/tests/helpers';

module(
  'Integration | Helper | format-message > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const population = new Population();

      setOwner(population, this.owner)

      await render(
        <template>
          <div data-test-output>
            {{formatMessage
              population.description
              censusDate=population.data.censusDate
              city=population.data.city
              population=population.data.population
            }}
          </div>
        </template>
      );

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta has a population of 5,475,213 as of January 1, 2020.',
        );

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2020.',
        );
    });
  },
);
