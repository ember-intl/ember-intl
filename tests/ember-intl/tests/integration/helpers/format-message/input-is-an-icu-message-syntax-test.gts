import { setOwner } from '@ember/application';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { formatMessage } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import {
  Population,
  setupRenderingTest,
} from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  population: Population;
}

module(
  'Integration | Helper | format-message > input is an ICU message syntax',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.population = new Population();

      setOwner(this.population, this.owner);
    });

    test('it returns a string', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div data-test-output>
            {{formatMessage
              self.population.description
              censusDate=self.population.data.censusDate
              city=self.population.data.city
              population=self.population.data.population
            }}
          </div>
        </template>,
      );

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta has a population of 5,475,213 as of January 1, 2020.',
        );
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div data-test-output>
            {{formatMessage
              self.population.description
              censusDate=self.population.data.censusDate
              city=self.population.data.city
              population=self.population.data.population
            }}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2020.',
        );
    });

    test('we can specify the locale', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output="1">
            {{formatMessage
              "Angebot endet am {day, date, shortWeekDay}"
              day=1390496444000
            }}
          </div>

          <div data-test-output="2">
            {{formatMessage
              "Angebot endet am {day, date, shortWeekDay}"
              day=1390496444000
              locale="de-de"
            }}
          </div>
        </template>,
      );

      assert
        .dom('[data-test-output="1"]')
        .hasText('Angebot endet am 1/23/2014');

      assert
        .dom('[data-test-output="2"]')
        .hasText('Angebot endet am 23.1.2014');
    });

    test('we can use single quotes to escape curly braces', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output="1">
            {{formatMessage
              "Sale ends on {day, date, shortWeekDay}"
              day=1390496444000
            }}
          </div>

          <div data-test-output="2">
            {{formatMessage "Sale ends on '{'day'}'" day=1390496444000}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output="1"]').hasText('Sale ends on 1/23/2014');

      assert.dom('[data-test-output="2"]').hasText('Sale ends on {day}');
    });

    // TODO: Consider a unit test (intl.formatMessage)
    test('we can pass 0', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatMessage "{count}" count=0}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('0');
    });

    // TODO: Consider a unit test (intl.formatMessage)
    test('we can pass # to a select type', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatMessage
              "{type, select, ranked {#{position}} other {Hit}}: {songTitle}"
              position=3
              songTitle="Life Itself"
              type="ranked"
            }}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('#3: Life Itself');
    });
  },
);
