import { setOwner } from '@ember/application';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { Population, setupRenderingTest } from 'test-app/tests/helpers';

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
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message
            this.population.description
            censusDate=this.population.data.censusDate
            city=this.population.data.city
            population=this.population.data.population
          }}
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
          {{format-message
            this.population.description
            censusDate=this.population.data.censusDate
            city=this.population.data.city
            population=this.population.data.population
          }}
        </div>
      `);

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2020.',
        );
    });

    test('we can provide data as an object', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message
            this.population.description
            this.population.data
          }}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(
          'Atlanta has a population of 5,475,213 as of January 1, 2020.',
        );
    });

    test('we can specify the locale', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output="1">
          {{format-message
            "Angebot endet am {day, date, shortWeekDay}"
            day=1390496444000
          }}
        </div>

        <div data-test-output="2">
          {{format-message
            "Angebot endet am {day, date, shortWeekDay}"
            day=1390496444000
            locale="de-de"
          }}
        </div>
      `);

      assert
        .dom('[data-test-output="1"]')
        .hasText('Angebot endet am 1/23/2014');

      assert
        .dom('[data-test-output="2"]')
        .hasText('Angebot endet am 23.1.2014');
    });

    test('we can use single quotes to escape curly braces', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output="1">
          {{format-message
            "Sale ends on {day, date, shortWeekDay}"
            day=1390496444000
          }}
        </div>

        <div data-test-output="2">
          {{format-message
            "Sale ends on '{'day'}'"
            day=1390496444000
          }}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText('Sale ends on 1/23/2014');

      assert.dom('[data-test-output="2"]').hasText('Sale ends on {day}');
    });

    // TODO: Consider a unit test (intl.formatMessage)
    test('we can pass 0', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message "{count}" count=0}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('0');
    });

    // TODO: Consider a unit test (intl.formatMessage)
    test('we can pass # to a select type', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message
            "{type, select, ranked {#{position}} other {Hit}}: {songTitle}"
            position=3
            songTitle="Life Itself"
            type="ranked"
          }}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('#3: Life Itself');
    });
  },
);
