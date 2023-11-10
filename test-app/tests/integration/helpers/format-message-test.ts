import {
  findAll,
  render,
  rerender,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { hbs } from 'ember-cli-htmlbars';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  census_date?: number;
  city?: string;
  harvests?: { count: number; person: string }[];
  instance?: SomeClass;
  intl: IntlService;
  population?: number;
  timeZone?: string;
  translation?: string;
}

class SomeClass {
  @tracked someCondition = true;

  get translation() {
    return this.someCondition ? 'foo' : 'bar';
  }
}

module('Integration | Helper | format-message', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    'en-us',
    {
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz',
      },
    },
    {
      formats: {
        date: {
          shortWeekDay: {
            timeZone: 'UTC',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          },
        },
      },
    },
  );

  test('invoke formatMessage directly', function (this: TestContext, assert) {
    const output = this.intl.formatMessage('hello {world}', { world: 'world' });

    assert.strictEqual(output, 'hello world');
  });

  test('formatMessage properly escapes using single quotes', function (this: TestContext, assert) {
    const output = this.intl.formatMessage(`'{'0'}' '{'1'}' '{'2'}'`);

    assert.strictEqual(output, '{0} {1} {2}');
  });

  test('invoke formatMessage directly with formats', function (this: TestContext, assert) {
    const output = this.intl.formatMessage(
      'Sale begins {day, date, shortWeekDay}',
      {
        day: 1390518044403,
        locale: 'en_us',
      },
    );

    assert.strictEqual(output, 'Sale begins January 23, 2014');
  });

  test('should return a formatted string', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-message
        "Hi, my name is {firstName} {lastName}."
        firstName="Tom"
        lastName="Dale"
      }}
    `);

    assert.dom().hasText('Hi, my name is Tom Dale.');
  });

  test('should return a formatted string with formatted numbers and dates', async function (this: TestContext, assert) {
    this.setProperties({
      census_date: new Date('1/1/2010').getTime(),
      city: 'Atlanta',
      population: 5475213,
      timeZone: 'UTC',
      translation:
        '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
    });

    await render<TestContext>(hbs`
      {{format-message
        this.translation
        city=this.city
        population=this.population
        census_date=this.census_date
        timeZone=this.timeZone
      }}
    `);

    assert
      .dom()
      .hasText('Atlanta has a population of 5,475,213 as of January 1, 2010.');
  });

  test('should return a formatted string with formatted numbers and dates in a different locale', async function (this: TestContext, assert) {
    this.intl.setLocale(['de-de']);

    this.setProperties({
      census_date: new Date('1/1/2010').getTime(),
      city: 'Atlanta',
      population: 5475213,
      timeZone: 'UTC',
      translation:
        '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
    });

    await render<TestContext>(hbs`
      {{format-message
        this.translation
        city=this.city
        population=this.population
        census_date=this.census_date
        timeZone=this.timeZone
      }}
    `);

    assert
      .dom()
      .hasText(
        'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.',
      );
  });

  test('should return a formatted string with an `each` block', async function (this: TestContext, assert) {
    this.setProperties({
      harvests: [
        { person: 'Allison', count: 10 },
        { person: 'Jeremy', count: 60 },
      ],
      translation:
        '{person} harvested {count, plural, one {# apple} other {# apples}}.',
    });

    await render<TestContext>(hbs`
      {{#each this.harvests as |harvest|}}
        <div data-test-output>
          {{format-message this.translation person=harvest.person count=harvest.count}}
        </div>
      {{/each}}
    `);

    const outputs = findAll('[data-test-output]');

    assert.strictEqual(outputs.length, 2);

    assert.dom(outputs[0]).hasText('Allison harvested 10 apples.');

    assert.dom(outputs[1]).hasText('Jeremy harvested 60 apples.');
  });

  test('able to discover all register translations', function (this: TestContext, assert) {
    this.intl.addTranslations('es_MX', { foo: 'bar' });

    /* tests that the locale name becomes normalized to es-mx */
    this.intl.exists('test', 'fr-ca');

    assert.deepEqual(this.intl.locales, ['en-us', 'de-de', 'es-mx']);
  });

  test('should respect format options for date ICU block', async function (assert) {
    await render(hbs`
      {{format-message 'Sale begins {day, date, shortWeekDay}' day=1390518044403}}
    `);

    assert.dom().hasText('Sale begins January 23, 2014');
  });

  test('should support allowEmpty', async function (assert) {
    await render(hbs`
      {{format-message allowEmpty=true}}
    `);

    assert.dom().hasText('');
  });

  test('should return 0 instead of nothing', async function (assert) {
    await render(hbs`
      {{format-message '{count}' count=0}}
    `);

    assert.dom().hasText('0');
  });

  test('l helper handles bound computed property', async function (this: TestContext & {
    instance: SomeClass;
  }, assert) {
    this.instance = new SomeClass();

    await render<TestContext>(hbs`
      {{format-message this.instance.translation}}
    `);

    assert.dom().hasText('foo');

    this.instance.someCondition = false;
    await rerender();

    assert.dom().hasText('bar');
  });

  test('handles hashtags within `select`', function (this: TestContext, assert) {
    const output = this.intl.formatMessage(
      '{type, select, anime {Rank #{rank}} other {}}',
      {
        type: 'anime',
        rank: 1,
      },
    );

    assert.strictEqual(output, 'Rank #1');
  });
});
