import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  data: {
    censusDate: Date;
    city: string;
    population: number;
  };
}

module(
  'Integration | Helper | t > data provided as an object',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'de-de', {
      population: {
        description:
          '{city} hat eine Bevölkerung von {population, number, integer} zum {censusDate, date, long}.',
      },
    });
    setupIntl(hooks, 'en-us', {
      population: {
        description:
          '{city} has a population of {population, number, integer} as of {censusDate, date, long}.',
      },
    });

    hooks.beforeEach(function (this: TestContext) {
      this.data = {
        censusDate: new Date('2020-01-01'),
        city: 'Atlanta',
        population: 5475213,
      };
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{t "population.description" this.data}}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta has a population of 5,475,213 as of January 1, 2020.',
        );
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{t "population.description" this.data}}
        </div>
      `);

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2020.',
        );
    });

    test('we can override the data', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{t
            "population.description"
            this.data
            population=300
          }}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText('Atlanta has a population of 300 as of January 1, 2020.');
    });
  },
);
