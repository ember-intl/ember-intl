import { A as emberArray } from '@ember/array';
import EmberObject, { computed, get, set } from '@ember/object';
import { run, next } from '@ember/runloop';
import { render } from '@ember/test-helpers';
import formatMessageHelper from 'ember-intl/helpers/format-message';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { module, skip, test } from 'qunit';
import { setupIntl, TestContext } from 'ember-intl/test-support';

const DEFAULT_LOCALE_NAME = 'en-us';

module('format-message', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    DEFAULT_LOCALE_NAME,
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
    }
  );

  test('exists', function (this: TestContext, assert) {
    assert.expect(1);
    assert.ok(formatMessageHelper);
  });

  test('invoke formatMessage directly', function (this: TestContext, assert) {
    assert.expect(1);
    assert.equal(this.intl.formatMessage('hello {world}', { world: 'world' }), 'hello world');
  });

  test('formatMessage properly escapes using single quotes', function (this: TestContext, assert) {
    assert.expect(1);
    assert.equal(this.intl.formatMessage(`'{'0'}' '{'1'}' '{'2'}'`), '{0} {1} {2}');
  });

  test('invoke formatMessage directly with formats', function (this: TestContext, assert) {
    assert.expect(1);
    assert.equal(
      this.intl.formatMessage('Sale begins {day, date, shortWeekDay}', {
        day: 1390518044403,
        locale: 'en_us',
      }),
      'Sale begins January 23, 2014'
    );
  });

  test('message is formatted correctly with argument', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-message 'Hello {name}' name='Tom Dale'}}`);
    assert.equal(this.element.textContent, 'Hello Tom Dale');
  });

  skip('should throw if called with out a value', async function (/*assert*/) {
    // assert.expect(1);
    // expectError(
    //   () => render(hbs`{{format-message}}`),
    //   ex => {
    //     assert.ok(
    //       ex.message.match(
    //         /Assertion Failed: \[ember-intl\] translation lookup attempted but no translation key was provided\./
    //       )
    //     );
    //   }
    // );
  });

  test('should return a formatted string', async function (this: TestContext, assert) {
    assert.expect(1);

    this.setProperties({
      translation: 'Hi, my name is {firstName} {lastName}.',
      firstName: 'Tom',
      lastName: 'Dale',
    });

    await render(hbs`{{format-message translation firstName=firstName lastName=lastName}}`);

    assert.equal(this.element.textContent, 'Hi, my name is Tom Dale.');
  });

  test('should return a formatted string with formatted numbers and dates', async function (this: TestContext, assert) {
    assert.expect(1);

    this.setProperties({
      translation: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
      city: 'Atlanta',
      population: 5475213,
      census_date: new Date('1/1/2010').getTime(),
      timeZone: 'UTC',
    });

    await render(
      hbs`{{format-message translation city=city population=population census_date=census_date timeZone=timeZone}}`
    );
    assert.equal(this.element.textContent, 'Atlanta has a population of 5,475,213 as of January 1, 2010.');
  });

  test('should return a formatted string with formatted numbers and dates in a different locale', async function (this: TestContext, assert) {
    assert.expect(1);
    this.intl.setLocale(['de-de']);
    this.setProperties({
      translation: '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
      city: 'Atlanta',
      population: 5475213,
      census_date: new Date('1/1/2010'),
      timeZone: 'UTC',
    });

    await render(
      hbs`{{format-message translation city=city population=population census_date=census_date timeZone=timeZone}}`
    );
    assert.equal(this.element.textContent, 'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.');
  });

  test('should return a formatted string with an `each` block', async function (this: TestContext, assert) {
    assert.expect(1);

    this.setProperties({
      translation: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
      harvests: emberArray([
        { person: 'Allison', count: 10 },
        { person: 'Jeremy', count: 60 },
      ]),
    });

    await render(
      hbs`
      {{#each harvests as |harvest|}}{{format-message translation person=harvest.person count=harvest.count}}{{/each}}
      `
    );

    assert.equal(this.element.textContent!.trim(), 'Allison harvested 10 apples.Jeremy harvested 60 apples.');
  });

  test('able to discover all register translations', function (this: TestContext, assert) {
    assert.expect(1);
    this.intl.addTranslations('es_MX', { foo: 'bar' });
    /* tests that the locale name becomes normalized to es-mx */
    this.intl.exists('test', 'fr-ca');
    assert.deepEqual(get(this.intl, 'locales'), ['en-us', 'es-es', 'fr-fr', 'es-mx']);
  });

  test('should respect format options for date ICU block', async function (this: TestContext & {
    day: number;
  }, assert) {
    assert.expect(1);
    this.day = 1390518044403;
    await render(hbs`{{format-message 'Sale begins {day, date, shortWeekDay}' day=day}}`);
    assert.equal(this.element.textContent, 'Sale begins January 23, 2014');
  });

  test('should support allowEmpty', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-message allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should return 0 instead of nothing', async function (this: TestContext, assert) {
    assert.expect(1);
    this.set('count', 0);
    await render(hbs`{{format-message '{count}' count=count}}`);
    assert.equal(this.element.textContent, '0');
  });

  test('l helper handles bound computed property', async function (this: TestContext & {
    context: EmberObject;
  }, assert) {
    const done = assert.async();
    assert.expect(2);

    const context = EmberObject.extend({
      foo: true,
      translation: computed('foo', {
        get() {
          return get(this, 'foo') ? 'foo foo' : 'bar bar';
        },
      }),
    }).create();

    set(this, 'context', context);
    await render(hbs`{{format-message context.translation}}`);
    assert.equal(this.element.textContent, 'foo foo');

    run(() => {
      context.set('foo', false);
      next(() => {
        assert.equal(this.element.textContent, 'bar bar');
        done();
      });
    });
  });

  test('handles hashtags within `select`', function (this: TestContext, assert) {
    assert.expect(1);
    assert.equal(
      this.intl.formatMessage('{type, select, anime {Rank #{rank}} other {}}', { type: 'anime', rank: 1 }),
      'Rank #1'
    );
  });
});
