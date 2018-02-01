import { run } from '@ember/runloop';
import { A as emberArray } from '@ember/array';
import EmberObject, { computed, set, get } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatMessageHelper from 'ember-intl/helpers/format-message';

const DEFAULT_LOCALE_NAME = 'en-us';

module('format-message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');

    this.intl.addTranslations(DEFAULT_LOCALE_NAME, {
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz'
      }
    });

    this.owner.register('formats:main', {
      date: {
        shortWeekDay: {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      }
    });

    this.intl.setLocale(DEFAULT_LOCALE_NAME);
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatMessageHelper);
  });

  test('invoke formatMessage directly', function(assert) {
    assert.expect(1);
    assert.equal(this.intl.formatMessage('hello {world}', { world: 'world' }), 'hello world');
  });

  test('invoke formatMessage directly with formats', function(assert) {
    assert.expect(1);
    assert.equal(
      this.intl.formatMessage('Sale begins {day, date, shortWeekDay}', {
        day: 1390518044403,
        locale: 'en_us'
      }),
      'Sale begins January 23, 2014'
    );
  });

  test('message is formatted correctly with argument', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-message (l 'Hello {name}') name='Jason'}}`);
    assert.equal(this.element.textContent, 'Hello Jason');
  });

  skip('should throw if called with out a value', async function(assert) {
    assert.expect(1);

    expectError(
      () => render(hbs`{{format-message}}`),
      ex => {
        assert.ok(
          ex.message.match(
            /Assertion Failed: \[ember-intl\] translation lookup attempted but no translation key was provided\./
          )
        );
      }
    );
  });

  test('should return a formatted string', async function(assert) {
    assert.expect(1);

    this.setProperties({
      MSG: 'Hi, my name is {firstName} {lastName}.',
      firstName: 'Anthony',
      lastName: 'Pipkin'
    });

    await render(hbs`{{format-message (l MSG) firstName=firstName lastName=lastName}}`);

    assert.equal(this.element.textContent, 'Hi, my name is Anthony Pipkin.');
  });

  test('should return a formatted string with formatted numbers and dates', async function(assert) {
    assert.expect(1);

    this.setProperties({
      POP_MSG: '{city} has a population of {population, number, integer} as of {census_date, date, long}.',
      city: 'Atlanta',
      population: 5475213,
      census_date: new Date('1/1/2010').getTime(),
      timeZone: 'UTC'
    });

    await render(
      hbs`{{format-message (l POP_MSG) city=city population=population census_date=census_date timeZone=timeZone}}`
    );
    assert.equal(this.element.textContent, 'Atlanta has a population of 5,475,213 as of January 1, 2010.');
  });

  test('should return a formatted string with formatted numbers and dates in a different locale', async function(assert) {
    assert.expect(1);
    this.intl.setLocale('de-de');
    this.setProperties({
      POP_MSG: '{city} hat eine Bevölkerung von {population, number, integer} zum {census_date, date, long}.',
      city: 'Atlanta',
      population: 5475213,
      census_date: new Date('1/1/2010'),
      timeZone: 'UTC'
    });

    await render(
      hbs`{{format-message (l POP_MSG) city=city population=population census_date=census_date timeZone=timeZone}}`
    );
    assert.equal(this.element.textContent, 'Atlanta hat eine Bevölkerung von 5.475.213 zum 1. Januar 2010.');
  });

  test('should return a formatted string with an `each` block', async function(assert) {
    assert.expect(1);

    this.setProperties({
      HARVEST_MSG: '{person} harvested {count, plural, one {# apple} other {# apples}}.',
      harvests: emberArray([{ person: 'Allison', count: 10 }, { person: 'Jeremy', count: 60 }])
    });

    await render(
      hbs`
      {{#each harvests as |harvest|}}{{format-message (l HARVEST_MSG) person=harvest.person count=harvest.count}}{{/each}}
      `
    );

    assert.equal(this.element.textContent.trim(), 'Allison harvested 10 apples.Jeremy harvested 60 apples.');
  });

  test('able to discover all register translations', function(assert) {
    assert.expect(2);
    this.intl.addTranslation('es_MX', 'foo', 'bar');
    /* tests that the locale name becomes normalized to es-mx */
    this.intl.exists('test', 'fr-ca');
    assert.equal(this.intl.getLocalesByTranslations().join('; '), 'en-us; es-es; fr-fr; es-mx');
    assert.equal(get(this.intl, 'locales').join('; '), 'en-us; es-es; fr-fr; es-mx');
  });

  test('should respect format options for date ICU block', async function(assert) {
    assert.expect(1);
    this.day = 1390518044403;
    await render(hbs`{{format-message (l 'Sale begins {day, date, shortWeekDay}') day=day}}`);
    assert.equal(this.element.textContent, 'Sale begins January 23, 2014');
  });

  test('should return 0 instead of nothing', async function(assert) {
    assert.expect(1);
    this.set('count', 0);
    await render(hbs`{{format-message (l '{count}') count=count}}`);
    assert.equal(this.element.textContent, '0');
  });

  test('intl-get returns message for key that is a literal string (not an object path)', async function(assert) {
    assert.expect(1);

    const translation = this.owner.lookup('ember-intl@translation:en-us');
    const fn = translation.getValue;

    translation.getValue = function getValue(key) {
      return this[key];
    };

    translation['string.path.works'] = 'yes it does';

    try {
      await render(hbs`{{format-message (intl-get 'string.path.works')}}`);

      assert.equal(this.element.textContent, 'yes it does');
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.error(ex);
    } finally {
      // reset the function back
      translation.getValue = fn;
    }
  });

  test('l helper handles bound computed property', async function(assert) {
    const done = assert.async();
    assert.expect(2);

    const context = EmberObject.extend({
      foo: true,
      cp: computed('foo', {
        get() {
          return get(this, 'foo') ? 'foo foo' : 'bar bar';
        }
      })
    }).create();

    set(this, 'context', context);
    await render(hbs`{{format-message (l context.cp)}}`);
    assert.equal(this.element.textContent, 'foo foo');

    run(() => {
      context.set('foo', false);
      run.next(() => {
        assert.equal(this.element.textContent, 'bar bar');
        done();
      });
    });
  });

  test('intl-get handles bound computed property', async function(assert) {
    assert.expect(3);

    const context = EmberObject.extend({
      foo: true,
      cp: computed('foo', {
        get() {
          return get(this, 'foo') ? 'foo.bar' : 'foo.baz';
        }
      })
    }).create();

    set(this, 'context', context);

    await render(hbs`{{format-message (intl-get context.cp)}}`);

    assert.equal(this.element.textContent, 'foo bar baz');

    run(() => {
      set(this, 'context.foo', false);
    });

    assert.equal(this.element.textContent, 'baz baz baz');

    run(() => {
      context.set('foo', true);
    });

    assert.ok(context, 'Updating binding to view after view is destroyed should not raise exception.');
  });
});
