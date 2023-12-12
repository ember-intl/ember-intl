import { setOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { render } from '@ember/test-helpers';
import { formatMessage, type IntlService } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

class Population {
  @service declare intl: IntlService;

  get data() {
    return {
      censusDate: new Date('2020-01-01'),
      city: 'Atlanta',
      population: 5475213,
    };
  }

  get description(): string {
    switch (this.intl.primaryLocale) {
      case 'de-de': {
        return '{city} hat eine Bevölkerung von {population, number, integer} zum {censusDate, date, long}.';
      }

      case 'en-us': {
        return '{city} has a population of {population, number, integer} as of {censusDate, date, long}.';
      }
    }

    throw new Error('Locale must be de-de or en-us.');
  }
}

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
